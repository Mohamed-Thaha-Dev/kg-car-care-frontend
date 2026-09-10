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
} from "lucide-react";
import api from "@/lib/API/Api";
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

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/enquiries`,
        {
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
      console.log("Enquiry Error:", error.response?.data || error.message);

      setError(error.response?.data?.message || "Failed to load enquiries");
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
          withCredentials:true,
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
      console.error(error.response?.data?.message || error.message);
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
      className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8"
    >
      {/* ========================================== */}
      {/* Header */}
      {/* ========================================== */}

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Customer Management
              </p>

              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Customer Enquiries
              </h1>
            </div>
          </div>

          <p className="mt-3 text-sm text-gray-500">
            View and manage messages from your customers.
          </p>
        </div>

        {/* Total Enquiries */}

        <div className="rounded-2xl border border-gray-200 bg-white px-5 py-3 shadow-sm">
          <p className="text-xs text-gray-500">TOTAL ENQUIRIES</p>

          <p className="mt-1 text-2xl font-bold text-gray-900">
            {enquiries.length}
          </p>
        </div>
      </div>

      {/* ========================================== */}
      {/* Main Inbox */}
      {/* ========================================== */}

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="grid min-h-[650px] lg:grid-cols-[380px_1fr]">
          {/* ========================================== */}
          {/* LEFT SIDE - Enquiry List */}
          {/* ========================================== */}

          <div className="border-b border-gray-200 lg:border-b-0 lg:border-r">
            {/* Search */}

            <div className="border-b border-gray-200 p-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  placeholder="Search enquiries..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:bg-white"
                />
              </div>
            </div>

            {/* Enquiry List */}

            <div className="max-h-[520px] overflow-y-auto">
              {filteredEnquiries.length > 0 ? (
                filteredEnquiries.map((enquiry) => {
                  const isSelected = selectedEnquiry?._id === enquiry._id;

                  return (
                    <button
                      key={enquiry._id}
                      onClick={() => setSelectedEnquiry(enquiry)}
                      className={`enquiry-item w-full border-b border-gray-100 p-4 text-left transition ${
                        isSelected ? "bg-primary/10" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Avatar */}

                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-semibold ${
                            isSelected
                              ? "bg-primary text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {enquiry.name.charAt(0).toUpperCase()}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <h3 className="truncate font-semibold text-gray-900">
                              {enquiry.name}
                            </h3>

                            <span className="whitespace-nowrap text-xs text-gray-400">
                              {new Date(enquiry.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          {/* Message Preview */}

                          <p className="mt-1 truncate text-sm text-gray-500">
                            {enquiry.message}
                          </p>

                          <div className="mt-2">
                            <span
                              className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase ${getStatusStyle(
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

          {/* ========================================== */}
          {/* RIGHT SIDE - Full Message */}
          {/* ========================================== */}

          <div className="flex flex-col">
            {selectedEnquiry ? (
              <>
                {/* Customer Header */}

                <div className="border-b border-gray-200 p-5 md:p-7">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                        <User className="h-7 w-7 text-primary" />
                      </div>

                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          {selectedEnquiry.name}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                          Customer Enquiry
                        </p>
                      </div>
                    </div>

                 <div className="relative inline-block">
  <select
    value={selectedEnquiry.status}
    onChange={(e) =>
      updateEnquiryStatus(
        selectedEnquiry._id,
        e.target.value as EnquiryStatus
      )
    }
    className={`cursor-pointer appearance-none rounded-full border px-4 py-2 pr-10 text-xs font-bold uppercase tracking-wide outline-none transition-all ${getStatusStyle(
      selectedEnquiry.status
    )}`}
  >
    <option value="new">New</option>
    <option value="read">Read</option>
    <option value="contacted">Contacted</option>
  </select>

  {/* Arrow */}
  <svg
    className="pointer-events-none absolute text-primary right-3 top-1/2 h-4 w-4 -translate-y-1/2"
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

                {/* Customer Contact */}

                <div className="grid gap-4 border-b border-gray-200 p-5 sm:grid-cols-2 md:p-7">
                  <a
                    href={`tel:${selectedEnquiry.phone}`}
                    className="group flex items-center gap-3 rounded-xl border border-gray-200 p-4 transition hover:border-primary hover:bg-primary/5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                      <Phone className="h-5 w-5 text-green-600" />
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">PHONE NUMBER</p>

                      <p className="mt-1 font-medium text-gray-800 group-hover:text-primary">
                        {selectedEnquiry.phone}
                      </p>
                    </div>
                  </a>

                  {selectedEnquiry.email && (
                    <a
                      href={`mailto:${selectedEnquiry.email}`}
                      className="group flex items-center gap-3 rounded-xl border border-gray-200 p-4 transition hover:border-primary hover:bg-primary/5"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                        <Mail className="h-5 w-5 text-blue-600" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs text-gray-400">EMAIL ADDRESS</p>

                        <p className="mt-1 truncate font-medium text-gray-800 group-hover:text-primary">
                          {selectedEnquiry.email}
                        </p>
                      </div>
                    </a>
                  )}
                </div>

                {/* Full Message */}

                <div className="flex-1 p-5 md:p-7">
                  <div className="mb-4 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />

                    <h3 className="font-semibold text-gray-900">
                      Customer Message
                    </h3>
                  </div>

                  <div className="min-h-[220px] rounded-2xl border border-gray-200 bg-gray-50 p-5">
                    <p className="whitespace-pre-wrap text-sm leading-7 text-gray-700">
                      {selectedEnquiry.message}
                    </p>
                  </div>
                </div>

                {/* Footer */}

                <div className="border-t border-gray-200 p-5 md:px-7">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock className="h-4 w-4" />
                    Received on{" "}
                    {new Date(selectedEnquiry.createdAt).toLocaleString()}
                  </div>
                </div>
              </>
            ) : (
              /* Empty State */

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
