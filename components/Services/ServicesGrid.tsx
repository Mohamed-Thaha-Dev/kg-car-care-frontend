"use client";

import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/data/ServicesPage";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const pin = pinRef.current;

      if (!track || !pin) return;

      const getScrollDistance = () => {
        const lastCard = track.lastElementChild as HTMLElement;

        if (!lastCard) return 0;

        // Last card center position
        const lastCardCenter =
          lastCard.offsetLeft + lastCard.offsetWidth / 2;

        // Screen center position
        const screenCenter = window.innerWidth / 2;

        // Last card center screen center-ku varum distance
        return Math.max(0, lastCardCenter - screenCenter);
      };

      const animation = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",

        scrollTrigger: {
          trigger: pin,
          start: "top top",

          end: () => `+=${getScrollDistance()}`,

          pin: true,
          scrub: 1,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,

          // markers: true,
        },
      });

      ScrollTrigger.refresh();

      return () => {
        animation.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef}>
      
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-red-600" />

              <span className="text-xs font-semibold tracking-[0.25em] text-foreground/50">
                WHAT WE OFFER
              </span>
            </div>

            <h2 className="text-4xl font-heading font-bold text-white md:text-6xl lg:text-7xl">
              Professional Services.

              <span className="block text-primary">
                Exceptional Care.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-zinc-400">
            Comprehensive automotive solutions designed around your
            vehicle&apos;s performance, safety, and reliability.
          </p>
        </div>
      </div>

      {/* ================= PINNED AREA ================= */}

      <div
        ref={pinRef}
        className="relative flex h-screen items-center overflow-hidden"
      >
        {/* ================= HORIZONTAL TRACK ================= */}

        <div
          ref={trackRef}
          className="
            flex
            w-max
            gap-10
            pl-[15vw]
            pr-[50vw]
            lg:pl-[10vw]
          "
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="
                group
                relative
                h-[520px]
                lg:w-[380px]
                w-[350px]
                shrink-0
                mt-12
                overflow-hidden
                rounded-2xl
                bg-black
                md:w-[450px]
              "
            >
              {/* IMAGE */}

              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-110
                "
              />

              {/* OVERLAY */}

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              {/* NUMBER */}

              <span className="absolute left-8 top-8 text-sm text-white/60">
                {service.number}
              </span>

              {/* CONTENT */}

              <div className="absolute bottom-0 left-0 w-full p-8 md:p-10">
                <div className="mb-5 h-px w-12 bg-red-500 transition-all duration-500 group-hover:w-24" />

                <h3 className="text-3xl font-semibold text-white">
                  {service.title}
                </h3>

                <p className="mt-4 leading-7 text-zinc-300">
                  {service.description}
                </p>

         
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}