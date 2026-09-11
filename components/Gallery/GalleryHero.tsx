"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import { ArrowDown } from "lucide-react";

export default function GalleryHero() {
  const pageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline();

      timeline
        .from(".gallery-label", {
          y: 25,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        })
        .from(
          ".gallery-title",
          {
            y: 80,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.3",
        )
        .from(
          ".gallery-description",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5",
        );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="overflow-hidden bg-[#080808] ">
      <section className="relative min-h-[75vh] overflow-hidden bg-sub-background px-5 pb-16 pt-32 sm:px-8 sm:pt-40 lg:min-h-[85vh] lg:px-16">
        {/* Background Glow */}

        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-red-500/10 blur-[150px]" />

        {/* Large Background Text */}

        <div className="pointer-events-none absolute left-0 top-1/2 w-full -translate-y-1/2 select-none overflow-hidden">
          <span className="block whitespace-nowrap text-center text-[22vw] font-black uppercase  leading-none tracking-tighter text-primary/3.5">
            GALLERY
          </span>
        </div>

        {/* Top Accent */}

        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[60vh] w-full max-w-7xl flex-col justify-center">
          {/* Small Top Section */}

          <div className="mb-7 flex items-center justify-between gap-4">
            <div className="gallery-label flex items-center gap-3">
              <span className="h-[1px] w-12 bg-primary" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-muted/50 sm:text-xs">
                KG Car Care Gallery
              </span>
            </div>

            {/* Gallery Count */}

            <div className="hidden items-center gap-3 sm:flex">
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />

              <span className="text-xs uppercase tracking-[0.2em] text-muted">
                Our Work
              </span>
            </div>
          </div>

          {/* Main Heading */}

          <h1 className="gallery-title font-heading text-muted/90 max-w-6xl text-7xl font-bold uppercase leading-[0.88]  sm:text-7xl  lg:text-[9rem]">
            Our Work
            <span className="block text-primary">In Pictures</span>
          </h1>

          {/* Bottom Content */}

          <div className="gallery-description mt-10 flex flex-col gap-8 border-t border-white/10 pt-7 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-lg text-sm leading-relaxed text-muted sm:text-base">
              Explore the work we do at KG Car Care. From professional repairs
              and maintenance to complete car care solutions.
            </p>

            {/* Scroll Down */}

            <span className="group flex w-fit items-center gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary transition-colors hover:text-red-700">
              Explore Gallery
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-muted transition-all duration-300 group-hover:border-red-500 group-hover:bg-red-500 group-hover:text-white ">
                <ArrowDown className="h-5 w-5" />
              </span>
            </span>
          </div>
        </div>

        {/* Bottom Decorative Line */}

        <div className="absolute bottom-0 left-0 h-px w-full bg-primary" />
      </section>
    </main>
  );
}
