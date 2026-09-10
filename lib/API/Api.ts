"use client";

import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Don't try to refresh repeatedly
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/refresh-token")
    ) {
      originalRequest._retry = true;

      try {
        // Refresh token cookie automatically அனுப்பப்படும்
        const refreshResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-token`,
          {},
          {
            withCredentials: true,
          },
        );

        const newAccessToken = refreshResponse.data.accessToken;
        console.log("This is new Token",newAccessToken)
        // Save new access token
        localStorage.setItem("token", newAccessToken);

        // Retry previous request
        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError:any) {
        // Refresh token expired
        localStorage.removeItem("token");
        localStorage.removeItem("admin");

        window.location.href = "/admin/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;