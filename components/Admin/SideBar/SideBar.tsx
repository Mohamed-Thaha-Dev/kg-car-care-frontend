"use client";

import api from "@/lib/API/Api";
import {
  Images,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  X,
} from "lucide-react";
import Image from "next/image";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Logout
  const handleLogout = async () => {
    try {
      const response = await api.post("/api/auth/logout");
      toast.success(response.data?.message);
      localStorage.removeItem("token");
      localStorage.removeItem("admin");

      router.replace("/admin/login");
    } catch (err: any) {
      toast.error(err.response.message);
      console.log(err);
    }
  };
  // Navigation function
  const handleNavigation = (path: string) => {
    router.push(path);
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}

      <header className="flex items-center inset-x-0 justify-between border-b fixed z-50 bg-white p-4 lg:hidden">
        {/* <h1 className="font-bold">
          KG Car Services
        </h1> */}

        <Image
          src="/logo/logo.webp"
          alt="KG Car Care Logo"
          width={100}
          priority
          height={100}
        />

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-primary"
        >
          {sidebarOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* Sidebar */}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-background p-6 text-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}

        <div className="mb-12 flex flex-col items-center justify-center">
          {/* <h1 className="text-2xl font-bold">
            KG Car Services
          </h1> */}
          <Image
            src="/logo/logo.webp"
            alt="KG Car Care Logo"
            width={200}
            height={100}
          />

          <p className="my-1 text-sm text-gray-400">Admin Dashboard</p>
          <div className="w-full h-[1px] bg-primary" />
        </div>

        {/* Navigation */}
        <nav className="space-y-3">
          {/* Dashboard */}

          <button
            onClick={() => handleNavigation("/admin/dashboard")}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left cursor-pointer transition ${
              pathname === "/admin/dashboard"
                ? "bg-white/10 text-white"
                : "text-gray-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </button>

          {/* Gallery */}

          <button
            onClick={() => handleNavigation("/admin/gallery")}
            className={`flex w-full items-center gap-3 cursor-pointer rounded-xl px-4 py-3 text-left transition ${
              pathname === "/admin/gallery"
                ? "bg-white/10 text-white"
                : "text-gray-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Images className="h-5 w-5" />
            Gallery
          </button>
          <button
            onClick={() => handleNavigation("/admin/enquiries")}
            className={`flex w-full items-center gap-3 cursor-pointer rounded-xl px-4 py-3 text-left transition ${
              pathname === "/admin/enquiries"
                ? "bg-white/10 text-white"
                : "text-gray-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <MessageSquare className="h-5 w-5" />
            Enquiries
          </button>
        </nav>

        {/* Logout */}

        <button
          onClick={handleLogout}
          className="absolute bottom-6 left-6 right-6 flex items-center gap-3 rounded-xl bg-red-500/10 px-4 py-3 text-red-400 transition hover:bg-red-500/20"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </aside>

      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}
    </>
  );
}
