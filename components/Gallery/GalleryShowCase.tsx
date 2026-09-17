"use client";
import axios from "axios";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import toast from "react-hot-toast";

gsap.registerPlugin(ScrollTrigger);

const IMAGES_PER_LOAD = 10;
export default function GalleryShowCase() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  useEffect(() => {
    const getAllImages = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/gallery/allimages`,
        );
        setGalleryItems(response.data.data);
        
      } catch (err:any) {
        toast.error(err.message)
      } finally {
        setIsLoading(false);
      }
    };
    getAllImages();
  }, []);

  const [visibleCount, setVisibleCount] = useState(IMAGES_PER_LOAD);

  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const visibleImages = galleryItems.slice(0, visibleCount);

  const hasMoreImages = visibleCount < galleryItems.length;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".gallery-card");

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 85%",
          },
        },
      );
    }, galleryRef);

    return () => ctx.revert();
  }, [visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + IMAGES_PER_LOAD);

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  };

  const handleNext = () => {
    if (selectedImage === null) return;

    setSelectedImage((prev) => {
      if (prev === null) return null;

      return prev === visibleImages.length - 1 ? 0 : prev + 1;
    });
  };

  const handlePrevious = () => {
    if (selectedImage === null) return;

    setSelectedImage((prev) => {
      if (prev === null) return null;

      return prev === 0 ? visibleImages.length - 1 : prev - 1;
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedImage === null) return;

      if (event.key === "Escape") {
        setSelectedImage(null);
      }

      if (event.key === "ArrowRight") {
        handleNext();
      }

      if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, visibleImages.length]);

  return (
    <section
      ref={galleryRef}
      className="px-5 bg-background sm:px-8 lg:px-16 py-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}

        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="sm:text-sm text-[10px] uppercase tracking-[0.3em] text-foreground/50">
              Our Collection
            </p>

            <h2 className="mt-3 text-5xl text-primary font-heading font-bold uppercase lg:text-7xl">
              Gallery
            </h2>
          </div>

          <p className="sm:text-sm text-[12px] text-white/40">
            Showing {visibleImages.length} of {galleryItems.length}
          </p>
        </div>

        {/* Gallery Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className={`animate-pulse overflow-hidden rounded-2xl bg-gray-200 ${
                  index === 0
                    ? "col-span-full aspect-[16/7] sm:aspect-[16/6]"
                    : "aspect-[4/3]"
                }`}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleImages.map((item, index) => (
              <button
                key={item.id || index}
                onClick={() => setSelectedImage(index)}
                className={`gallery-card group relative cursor-pointer  overflow-hidden rounded-2xl text-left ${
                  index === 0 ? "col-span-full" : ""
                }`}
              >
                {/* Image */}

                <div
                  className={`relative overflow-hidden  ${
                    index === 0
                      ? "aspect-[16/7] sm:aspect-[16/6]"
                      : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes={
                      index === 0
                        ? "100vw"
                        : `
                (max-width: 640px) 100vw,
                (max-width: 1024px) 50vw,
                33vw
              `
                    }
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                </div>

                {/* Content */}

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-8">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="mb-2 text-xs uppercase tracking-[0.25em] text-red-400">
                        KG Car Care
                      </p>

                      <h3
                        className={`font-semibold ${
                          index === 0
                            ? "text-2xl sm:text-3xl"
                            : "text-lg sm:text-xl"
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>

                    {/* Arrow */}

                    <div
                      className={`flex shrink-0 items-center justify-center rounded-full bg-white text-black transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 ${
                        index === 0 ? "h-14 w-14" : "h-11 w-11"
                      }`}
                    >
                      <ArrowUpRight size={index === 0 ? 24 : 20} />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* ================= SEE MORE ================= */}

        {hasMoreImages && (
          <div className="mt-14 flex flex-col items-center justify-center">
            <button
              onClick={handleLoadMore}
              className="group flex items-center gap-3 rounded-full border border-white/20 px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] transition-all duration-300 hover:border-red-500 hover:bg-red-500"
            >
              See More Images
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </button>

            <p className="mt-4 text-xs text-white/40">
              {galleryItems.length - visibleImages.length} more images available
            </p>
          </div>
        )}

        {/* ALL IMAGES SHOWN */}

        {!hasMoreImages && galleryItems.length > IMAGES_PER_LOAD && (
          <div className="mt-14 text-center">
            <p className="text-sm text-white/40">
              You have viewed all our gallery images.
            </p>
          </div>
        )}
      </div>

      {/* ================= LIGHTBOX ================= */}

      {selectedImage !== null && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 px-4 py-6 backdrop-blur-md">
          {/* Close */}

          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 transition hover:bg-white hover:text-black sm:right-8 sm:top-8"
          >
            <X size={22} />
          </button>

          {/* Previous */}

          <button
            onClick={handlePrevious}
            className="absolute left-3 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 transition hover:bg-white hover:text-black sm:left-8"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Next */}

          <button
            onClick={handleNext}
            className="absolute right-3 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 transition hover:bg-white hover:text-black sm:right-8"
          >
            <ChevronRight size={24} />
          </button>

          {/* Image */}

          <div className="relative h-[70vh] w-full max-w-6xl sm:h-[80vh]">
            <Image
              src={visibleImages[selectedImage].image}
              alt={visibleImages[selectedImage].title}
              fill
              sizes="100vw"
              priority
              className="object-contain"
            />
          </div>

          {/* Image Info */}

          <div className="absolute bottom-6 left-1/2 w-full max-w-xl -translate-x-1/2 px-5 text-center">
            <h3 className="mt-2 text-lg font-semibold sm:text-2xl">
              {visibleImages[selectedImage].title}
            </h3>
          </div>
        </div>
      )}
    </section>
  );
}
