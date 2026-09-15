"use client";

import { useEffect, useState } from "react";
import {
  Images,
  MessageSquare,
  Mail,
  Eye,
  PhoneCall,
  Loader2,
  ArrowUpRight,

} from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/lib/API/Api";
import toast from "react-hot-toast";

interface DashboardStats {
  totalGalleryImages: number;
  totalEnquiries: number;
  newEnquiries: number;
  readEnquiries: number;
  contactedEnquiries: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalGalleryImages: 0,
    totalEnquiries: 0,
    newEnquiries: 0,
    readEnquiries: 0,
    contactedEnquiries: 0,
  });

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
const getDashboardStats = async (isRefresh = false) => {
  try {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    const response = await api.get("/api/dashboard");

    setStats(response.data.data);
  } catch (error: any) {
    toast.error(
      error.response?.data?.message || error.message,
    );
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
};

useEffect(() => {
  const token = localStorage.getItem("token");
  const storedAdmin = localStorage.getItem("admin");

  if (!token || !storedAdmin) {
    router.replace("/admin/login");
    return;
  }
  getDashboardStats();
}, []);



  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <Loader2 className="h-9 w-9 animate-spin text-gray-900" />
      </div>
    );
  }

  const responseRate =
    stats.totalEnquiries > 0
      ? Math.round((stats.contactedEnquiries / stats.totalEnquiries) * 100)
      : 0;

  return (
    <main className="min-h-screen bg-[#f6f6f4] p-5 md:p-8 pt-30 pb-10">

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
            KG Car Services
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Dashboard Overview
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Monitor your enquiries and gallery activity.
          </p>
        </div>
      </div>

      {/* ================= BENTO GRID ================= */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {/* ================= TOTAL ENQUIRIES ================= */}

        <div className="relative overflow-hidden rounded-3xl bg-gray-900 p-7 text-white md:col-span-2 lg:row-span-2">
          {/* Background Decoration */}

          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/5" />

          <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-white/5" />

          <div className="relative flex h-full flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                <MessageSquare className="h-7 w-7" />
              </div>

              <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-semibold text-green-400">
                ● LIVE
              </span>
            </div>

            <div className="mt-16">
              <p className="text-sm font-medium text-gray-400">
                Total Enquiries
              </p>

              <h2 className="mt-3 text-7xl font-bold tracking-tight">
                {stats.totalEnquiries}
              </h2>

              <p className="mt-4 max-w-xs text-sm leading-6 text-gray-400">
                Customer enquiries received through your website.
              </p>
            </div>

            <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-5">
              <span className="text-sm text-gray-400">Customer Activity</span>

              <ArrowUpRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* ================= GALLERY ================= */}

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/[0.04]">
          <div className="flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
              <Images className="h-6 w-6" />
            </div>

            <ArrowUpRight className="h-5 w-5 text-gray-300" />
          </div>

          <div className="mt-10">
            <p className="text-sm font-medium text-gray-500">Gallery Images</p>

            <h2 className="mt-2 text-5xl font-bold tracking-tight text-gray-900">
              {stats.totalGalleryImages}
            </h2>
          </div>
        </div>

        {/* ================= NEW ================= */}

        <div className="rounded-3xl bg-blue-600 p-6 text-white shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <Mail className="h-6 w-6" />
            </div>

            <span className="text-xs font-semibold text-blue-100">NEW</span>
          </div>

          <div className="mt-10">
            <h2 className="text-5xl font-bold">{stats.newEnquiries}</h2>

            <p className="mt-2 text-sm text-blue-100">New enquiries</p>
          </div>
        </div>

        {/* ================= READ ================= */}

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/[0.04]">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-600">
              <Eye className="h-6 w-6" />
            </div>

            <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-bold text-yellow-600">
              READ
            </span>
          </div>

          <div className="mt-10">
            <h2 className="text-5xl font-bold tracking-tight text-gray-900">
              {stats.readEnquiries}
            </h2>

            <p className="mt-2 text-sm text-gray-500">Enquiries viewed</p>
          </div>
        </div>

        {/* ================= CONTACTED ================= */}

        <div className="rounded-3xl bg-green-600 p-6 text-white shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <PhoneCall className="h-6 w-6" />
            </div>

            <span className="text-xs font-semibold text-green-100">
              CONTACTED
            </span>
          </div>

          <div className="mt-10">
            <h2 className="text-5xl font-bold">{stats.contactedEnquiries}</h2>

            <p className="mt-2 text-sm text-green-100">Customers contacted</p>
          </div>
        </div>

        {/* ================= RESPONSE RATE ================= */}

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/[0.04] lg:col-span-2">
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Response Performance
                </p>

                <h2 className="mt-1 text-xl font-bold text-gray-900">
                  Customer Response Rate
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-gray-900">
                <span className="text-sm font-bold text-gray-900">
                  {responseRate}%
                </span>
              </div>
            </div>

            <div className="mt-10">
              <div className="mb-3 flex justify-between text-sm">
                <span className="text-gray-500">Contacted Customers</span>

                <span className="font-bold text-gray-900">
                  {stats.contactedEnquiries} / {stats.totalEnquiries}
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-gray-900 transition-all duration-500"
                  style={{
                    width: `${responseRate}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
