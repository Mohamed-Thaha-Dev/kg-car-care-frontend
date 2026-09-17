"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import gsap from "gsap";
import {
  Search,
  Phone,
  Mail,
  MessageSquare,
  Loader2,
  AlertCircle,
  Users,
  Clock,
  User,
  Delete,
  Trash2,
} from "lucide-react";
import api from "@/lib/API/Api";
import toast from "react-hot-toast";
type EnquiryStatus = "new" | "read" | "contacted";

interface Enquiry {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
}

export default function EnquiriesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // ==========================================
  // Fetch Enquiries
  // ==========================================

  const getEnquiries = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/enquiries`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = response.data.data;

      setEnquiries(data);

      // Automatically select first enquiry
      if (data.length > 0) {
        setSelectedEnquiry(data[0]);
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to load enquiries",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEnquiries();
  }, []);

  const updateEnquiryStatus = async (id: string, status: EnquiryStatus) => {
    try {
      const token = localStorage.getItem("token");

      await api.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/enquiries/${id}/status`,
        { status },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Selected enquiry update
      setSelectedEnquiry((prev) =>
        prev && prev._id === id ? { ...prev, status } : prev,
      );

      // Left side enquiry list update
      setEnquiries((prevEnquiries) =>
        prevEnquiries.map((enquiry) =>
          enquiry._id === id ? { ...enquiry, status } : enquiry,
        ),
      );
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || "Failed to Fecth");
    }
  };

  const handleDelete = async () => {
    if (!selectedEnquiry?._id) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await api.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/enquiries/delete/${selectedEnquiry._id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        // Delete successful

        toast.success(response.data.message);

        // Modal close / selected enquiry clear
        setSelectedEnquiry(null);

        // If you have enquiry list state
        setEnquiries((prev) =>
          prev.filter((enquiry) => enquiry._id !== selectedEnquiry._id),
        );
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data);
        toast.error(error.response.data.message);
      } else if (error.request) {
        setError("Server is currently unavailable. Please try again later.");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // GSAP Animation
  // ==========================================

  useEffect(() => {
    if (!loading && enquiries.length > 0) {
      gsap.fromTo(
        ".enquiry-item",
        {
          opacity: 0,
          x: -20,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "power3.out",
        },
      );
    }
  }, [loading]);

  // ==========================================
  // Filter Enquiries
  // ==========================================

  const filteredEnquiries = enquiries.filter((enquiry) => {
    const searchText = search.toLowerCase();

    return (
      enquiry.name.toLowerCase().includes(searchText) ||
      enquiry.phone.includes(searchText) ||
      enquiry.email?.toLowerCase().includes(searchText) ||
      enquiry.message.toLowerCase().includes(searchText)
    );
  });

  // ==========================================
  // Status Style
  // ==========================================

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-50 text-blue-600 border-blue-200";

      case "read":
        return "bg-yellow-50 text-yellow-600 border-yellow-200";

      case "contacted":
        return "bg-green-50 text-green-600 border-green-200";

      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />

          <p className="text-sm text-gray-500">Loading customer enquiries...</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // Error
  // ==========================================

  if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="max-w-sm rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <AlertCircle className="mx-auto h-10 w-10 text-red-500" />

          <h2 className="mt-4 font-semibold text-red-600">
            Failed to load enquiries
          </h2>

          <p className="mt-2 text-sm text-red-500">{error}</p>

          <button
            onClick={getEnquiries}
            className="mt-5 rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gray-50 px-3 pb-6pt-24 sm:px-5 sm:pt-28 lg:px-8 pt-30"
    >
      {/* ================================================= */}
      {/* PAGE HEADER */}
      {/* ================================================= */}

      <div className="mb-5 flex flex-col gap-4 sm:mb-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-primary sm:text-xs">
                Customer Management
              </p>

              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
                Customer Enquiries
              </h1>
            </div>
          </div>

          <p className="mt-2 pl-1 text-xs text-gray-500 sm:text-sm">
            View and manage messages from your customers.
          </p>
        </div>

        {/* Total Enquiries */}
        <div className="flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm sm:w-auto sm:min-w-[160px] sm:px-5">
          <p className="text-[10px] font-semibold text-gray-500 sm:text-xs">
            TOTAL ENQUIRIES
          </p>

          <p className="text-xl font-bold text-gray-900 sm:ml-5 sm:text-2xl">
            {enquiries.length}
          </p>
        </div>
      </div>

      {/* ================================================= */}
      {/* MOBILE / DESKTOP CONTENT */}
      {/* ================================================= */}

      <div className="enquiry-item overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="min-h-[600px] lg:grid lg:grid-cols-[360px_1fr]">
          {/* ================================================= */}
          {/* LEFT - ENQUIRY LIST */}
          {/* ================================================= */}

          <div
            className={`border-gray-200 lg:border-r ${
              selectedEnquiry ? "hidden lg:block" : "block"
            }`}
          >
            {/* Search Header */}
            <div className="border-b border-gray-200 p-3 sm:p-4">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  placeholder="Search enquiries..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 text-muted bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:bg-white"
                />
              </div>
            </div>

            {/* Enquiry List */}
            <div className="max-h-[calc(100vh-260px)] overflow-y-auto">
              {filteredEnquiries.length > 0 ? (
                filteredEnquiries.map((enquiry) => {
                  const isSelected = selectedEnquiry?._id === enquiry._id;

                  return (
                    <button
                      key={enquiry._id}
                      onClick={() => setSelectedEnquiry(enquiry)}
                      className={`w-full border-b border-gray-100 p-4 text-left transition active:bg-primary/5 ${
                        isSelected ? "bg-primary/10" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Avatar */}
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                            isSelected
                              ? "bg-primary text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {enquiry.name.charAt(0).toUpperCase()}
                        </div>

                        {/* Content */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="truncate text-sm font-semibold text-gray-900 sm:text-base">
                              {enquiry.name}
                            </h3>

                            <span className="shrink-0 text-[10px] text-gray-400 sm:text-xs">
                              {new Date(enquiry.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          <p className="mt-1 truncate text-xs text-gray-500 sm:text-sm">
                            {enquiry.message}
                          </p>

                          <div className="mt-2">
                            <span
                              className={`rounded-full border px-2 py-1 text-[9px] font-semibold uppercase ${getStatusStyle(
                                enquiry.status,
                              )}`}
                            >
                              {enquiry.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="p-10 text-center">
                  <MessageSquare className="mx-auto h-10 w-10 text-gray-300" />

                  <p className="mt-3 text-sm text-gray-500">
                    No enquiries found
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ================================================= */}
          {/* RIGHT - ENQUIRY DETAILS */}
          {/* ================================================= */}

          <div
            className={`flex min-w-0 flex-col ${
              selectedEnquiry ? "flex" : "hidden lg:flex"
            }`}
          >
            {selectedEnquiry ? (
              <>
                {/* ================================================= */}
                {/* MOBILE BACK BUTTON */}
                {/* ================================================= */}

                <div className="border-b border-gray-200 px-4 py-5 lg:hidden">
                  <button
                    onClick={() => setSelectedEnquiry(null)}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-600"
                  >
                    <span className="text-xl leading-none">←</span>
                    Back to enquiries
                  </button>
                </div>

                {/* ================================================= */}
                {/* CUSTOMER HEADER */}
                {/* ================================================= */}

                <div className="border-b border-gray-200 p-4 sm:p-5 md:p-7 flex ">
                  <div className="flex flex-col gap-4">
                    {/* Customer Info */}
                    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 sm:h-14 sm:w-14 sm:rounded-2xl">
                        <User className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
                      </div>

                      <div className="min-w-0">
                        <h2 className="truncate text-lg font-bold text-gray-900 sm:text-xl">
                          {selectedEnquiry.name}
                        </h2>

                        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                          Customer Enquiry
                        </p>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex">
                      <div className="relative inline-block">
                        <select
                          value={selectedEnquiry.status}
                          onChange={(e) =>
                            updateEnquiryStatus(
                              selectedEnquiry._id,
                              e.target.value as EnquiryStatus,
                            )
                          }
                          className={`w-full cursor-pointer appearance-none rounded-full border px-4 py-2.5 pr-10 text-xs font-bold uppercase tracking-wide outline-none transition-all sm:w-auto ${getStatusStyle(
                            selectedEnquiry.status,
                          )}`}
                        >
                          <option value="new">New</option>

                          <option value="read">Read</option>

                          <option value="contacted">Contacted</option>
                        </select>

                        <svg
                          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m6 9 6 6 6-6"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <button
                      type="button"
                      onClick={handleDelete}
                      disabled={loading}
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-500 transition-all hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* ================================================= */}
                {/* CUSTOMER CONTACT */}
                {/* ================================================= */}

                <div className="grid gap-3 border-b border-gray-200 p-4 sm:grid-cols-2 sm:gap-4 sm:p-5 md:p-7">
                  {/* Phone */}
                  <a
                    href={`tel:${selectedEnquiry.phone}`}
                    className="group flex min-w-0 items-center gap-3 rounded-xl border border-gray-200 p-3.5 transition hover:border-primary hover:bg-primary/5 sm:p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50">
                      <Phone className="h-5 w-5 text-green-600" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] text-gray-400">PHONE NUMBER</p>

                      <p className="mt-1 truncate text-sm font-medium text-gray-800 group-hover:text-primary sm:text-base">
                        {selectedEnquiry.phone}
                      </p>
                    </div>
                  </a>

                  {/* Email */}
                  {selectedEnquiry.email && (
                    <a
                      href={`mailto:${selectedEnquiry.email}`}
                      className="group flex min-w-0 items-center gap-3 rounded-xl border border-gray-200 p-3.5 transition hover:border-primary hover:bg-primary/5 sm:p-4"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                        <Mail className="h-5 w-5 text-blue-600" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] text-gray-400">
                          EMAIL ADDRESS
                        </p>

                        <p className="mt-1 truncate text-sm font-medium text-gray-800 group-hover:text-primary sm:text-base">
                          {selectedEnquiry.email}
                        </p>
                      </div>
                    </a>
                  )}
                </div>

                {/* ================================================= */}
                {/* FULL MESSAGE */}
                {/* ================================================= */}

                <div className="flex-1 p-4 sm:p-5 md:p-7">
                  <div className="mb-4 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 shrink-0 text-primary" />

                    <h3 className="text-sm font-semibold text-gray-900 sm:text-base">
                      Customer Message
                    </h3>
                  </div>

                  <div className="min-h-[180px] rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:min-h-[220px] sm:p-5">
                    <p className="whitespace-pre-wrap break-words text-sm leading-7 text-gray-700">
                      {selectedEnquiry.message}
                    </p>
                  </div>
                </div>

                {/* ================================================= */}
                {/* FOOTER */}
                {/* ================================================= */}

                <div className="border-t border-gray-200 p-4 sm:p-5 md:px-7">
                  <div className="flex items-start gap-2 text-xs text-gray-400 sm:text-sm">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0" />

                    <span>
                      Received on{" "}
                      {new Date(selectedEnquiry.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              /* ================================================= */
              /* DESKTOP EMPTY STATE */
              /* ================================================= */

              <div className="flex flex-1 flex-col items-center justify-center p-10 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                  <MessageSquare className="h-9 w-9 text-gray-400" />
                </div>

                <h2 className="mt-5 text-lg font-semibold text-gray-800">
                  Select an enquiry
                </h2>

                <p className="mt-2 max-w-sm text-sm text-gray-500">
                  Select a customer enquiry from the list to view the complete
                  message.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
