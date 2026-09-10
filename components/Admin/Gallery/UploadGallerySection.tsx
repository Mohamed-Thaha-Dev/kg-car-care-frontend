"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import {
  Upload,
  Image as ImageIcon,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import axios from "axios";
import api from "@/lib/API/Api";
import toast from "react-hot-toast";

export default function AdminGallerySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  // Handle image selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("this is ", file);

    if (!file) return;

    // Allowed image formats
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload JPG, JPEG, PNG or WEBP image")
      return;
    }

    // Maximum 5MB
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB")
      return;
    }

    setSelectedImage(file);
    console.log(selectedImage);

    const imagePreview = URL.createObjectURL(file);
    setPreview(imagePreview);
    console.log("this is img", imagePreview);
  };

  // Remove selected image
  const removeImage = () => {
    setSelectedImage(null);

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Upload image
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter a title")
      return;
    }

    if (!selectedImage) {
      toast.error("Please select an image")
      return;
    }
   

    try {
      setLoading(true)
      // Get JWT Token
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You are not authorized. Please login again.")
        setLoading(false);
        return;
      }
      const formData = new FormData();

      formData.append("title", title);
      formData.append("image", selectedImage);

      const response = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/gallery`,
        formData,
        {
          withCredentials:true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("this is response", response.data);
      toast.success(response.data?.message || "Gallery image uploaded successfully!")
      setTitle("");
      removeImage();
    } catch (error: any) {
      toast.error(error.response?.data?.message ||error.message||"Uploaded Failed" )
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-3xl">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Gallery Management
          </h1>

          <p className="mt-2 text-gray-500">
            Upload your latest completed car service work.
          </p>
        </div>

        {/* Upload Card */}

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <form onSubmit={handleSubmit}>
            {/* Title */}

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Work Title
              </label>

              <input
                type="text"
                placeholder="Example: BMW Ceramic Coating"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="w-full rounded-xl border text-muted border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
              />
            </div>

            {/* Upload Section */}

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Upload Image
              </label>

              {!preview ? (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex min-h-[250px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-black hover:bg-gray-100"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                    <Upload className="h-6 w-6 text-gray-700" />
                  </div>

                  <p className="font-semibold text-gray-800">
                    Click to upload image
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    JPG, PNG or WEBP • Maximum 5MB
                  </p>
                </button>
              ) : (
                <div className="relative overflow-hidden rounded-2xl border border-gray-200">
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-[350px] w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-105"
                  >
                    <X className="h-5 w-5 text-red-500" />
                  </button>

                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4">
                    <p className="flex items-center gap-2 text-sm text-white">
                      <ImageIcon className="h-4 w-4" />

                      {selectedImage?.name}
                    </p>
                  </div>
                </div>
              )}

              {/* Hidden Input */}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Message */}

            {message && (
              <div
                className={`mb-6 flex items-center gap-3 rounded-xl p-4 ${
                  messageType === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {messageType === "success" ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <AlertCircle className="h-5 w-5" />
                )}

                <p className="text-sm font-medium">{message}</p>
              </div>
            )}

            {/* Submit Button */}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-black px-5 py-4 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5" />
                  Upload Gallery Image
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
