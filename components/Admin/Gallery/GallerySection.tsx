"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import {
  Search,
  Plus,
  Image as ImageIcon,
  Pencil,
  Trash2,
  Calendar,
  X,
  Eye,
  Loader2,
} from "lucide-react";
import axios from "axios";
import Image from "next/image";
import api from "@/lib/API/Api";
import toast from "react-hot-toast";

interface GalleryItem {
  _id: string;
  title: string;
  image: string;
  createdAt: string;
}

// const galleryData: GalleryItem[] = [
//   {
//     id: 1,
//     title: "BMW Ceramic Coating",
//     image:
//       "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80",
//     createdAt: "01 Sep 2026",
//   },
//   {
//     id: 2,
//     title: "Premium Car Detailing",
//     image:
//       "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80",
//     createdAt: "30 Aug 2026",
//   },
//   {
//     id: 3,
//     title: "Interior Cleaning",
//     image:
//       "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80",
//     createdAt: "28 Aug 2026",
//   },
//   {
//     id: 4,
//     title: "Car Polish Service",
//     image:
//       "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
//     createdAt: "25 Aug 2026",
//   },
//   {
//     id: 5,
//     title: "Exterior Detailing",
//     image:
//       "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80",
//     createdAt: "22 Aug 2026",
//   },
//   {
//     id: 6,
//     title: "Complete Car Wash",
//     image:
//       "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=800&q=80",
//     createdAt: "20 Aug 2026",
//   },
// ];

export default function GallerySection() {
  const router = useRouter();

  const containerRef = useRef<HTMLDivElement>(null);
  const [galleryData, setGalleryData] = useState<GalleryItem[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  // GSAP Animation
  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(".gallery-card");

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 25,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
      },
    );
  }, []);
  useEffect(() => {
    const getAllGalleryImages = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/gallery/allimages`,
        );
        setGalleryData(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllGalleryImages();
  }, []);

  const handleDelete = async (id: string) => {
    console.log(id);
    try {
      setDeletingId(id)
      const token = localStorage.getItem("token");
      const response = await api.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/gallery/${id}`,
        {
          withCredentials:true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(response.data.message)
      setGalleryData((prev) => prev.filter((item) => item._id !== id));
    } catch (err: any) {
      console.log("this is Err", err.response.data);
    }
    finally{
      setDeletingId(null)
    }
  };

  const currentMonthImages = galleryData.filter((item) => {
    const uploadDate = new Date(item.createdAt);
    const currentDate = new Date();

    return (
      uploadDate.getMonth() === currentDate.getMonth() &&
      uploadDate.getFullYear() === currentDate.getFullYear()
    );
  });

  // Search Filter
  const filteredGallery = galleryData.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div ref={containerRef} className="min-h-screen bg-[#f7f7f7] p-5 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}

        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Gallery Management
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage all your completed car service work photos.
            </p>
          </div>

          <button
            onClick={() => router.push("/admin/gallery/upload")}
            className="flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-gray-800 active:scale-[0.98]"
          >
            <Plus className="h-5 w-5" />
            Upload New Image
          </button>
        </div>

        {/* Stats */}

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Images</p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  {galleryData.length}
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                <ImageIcon className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">This Month</p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              {currentMonthImages.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">Latest Upload</p>

            <h2 className="mt-2 text-lg font-bold text-gray-900">Today</h2>
          </div>
        </div>

        {/* Search */}

        <div className="mb-7 flex items-center gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search gallery..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-xl border placeholder:text-black  border-gray-200 text-muted bg-gray-200 py-3 pl-12 pr-4 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/5"
            />
          </div>

          <p className="hidden text-sm text-gray-500 sm:block">
            {filteredGallery.length} images found
          </p>
        </div>

        {/* Gallery Grid */}

        {filteredGallery.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredGallery.map((item) => (
              <div
                key={item._id}
                className="gallery-card group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image */}

                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                  {/* Overlay */}

                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                    <button
                      onClick={() => setSelectedImage(item)}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition hover:scale-110"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Content */}

                <div className="p-4">
                  <h3 className="truncate font-semibold text-gray-900">
                    {item.title}
                  </h3>

                  <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="h-4 w-4" />

                    {item.createdAt}
                  </div>

                  {/* Actions */}

                  <div className="mt-4 flex gap-2">
                    <button className="flex flex-1 items-center cursor-pointer hover:bg-primary hover:text-foreground  justify-center gap-2 rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-700 transition"
                    onClick={() => handleDelete(item._id)}>
                      {
                        deletingId === item._id ? (
                          <>
                          <Loader2 className="h-5 w-5 animate-spin"/>
                           Deleting...
                          </>
                        ):(
                          <>
                          <Trash2 className="h-4 w-4" />
                           Delete
                          </>
                        )
                      }
                      
                    </button>

       
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
              <ImageIcon className="h-7 w-7 text-gray-400" />
            </div>

            <h3 className="mt-5 font-semibold text-gray-900">
              No images found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try another search or upload a new image.
            </p>
          </div>
        )}
      </div>

      {/* Image Preview Modal */}

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl bg-white"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Close */}

            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black"
            >
              <X className="h-5 w-5" />
            </button>

            <Image
              src={selectedImage.image}
              alt={selectedImage.title}
              width={1000}
              height={1000}
              className="max-h-[75vh] w-full object-contain"
            />

            <div className="p-5">
              <h2 className="text-xl text-primary font-bold">{selectedImage.title}</h2>

              <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                Uploaded on {selectedImage.createdAt}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
