
"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import { Button } from "../ui/Button";

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// STATS
// ==========================================

const stats = [
  { value: "12+", label: "Years Experience" },
  { value: "5K+", label: "Cars Serviced" },
  { value: "4.5★", label: "Customer Rating" },
];

// ==========================================
// HERO
// ==========================================

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    // ==========================================
    // REDUCED MOTION CHECK
    // ==========================================

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // ==========================================
    // GSAP CONTEXT
    // ==========================================

    const ctx = gsap.context(() => {
      // ==========================================
      // ELEMENTS
      // ==========================================

      const items = gsap.utils.toArray<HTMLElement>(
        "[data-hero]",
      );

      const words = gsap.utils.toArray<HTMLElement>(
        "[data-hero-word]",
      );

      const label = section.querySelector<HTMLElement>(
        "[data-hero-label]",
      );

      const image = section.querySelector<HTMLElement>(
        "[data-hero-image]",
      );

      // ==========================================
      // REDUCED MOTION
      // ==========================================

      if (reducedMotion) {
        gsap.set(
          [...items, ...words, label].filter(
            Boolean,
          ),
          {
            opacity: 1,
            y: 0,
            yPercent: 0,
          },
        );

        if (image) {
          gsap.set(image, {
            scale: 1,
            yPercent: 0,
          });
        }

        return;
      }

      // ==========================================
      // INITIAL STATE
      // ==========================================

      if (label) {
        gsap.set(label, {
          opacity: 0,
          y: 16,
        });
      }

      gsap.set(words, {
        yPercent: 110,
        opacity: 0,
      });

      gsap.set(items, {
        opacity: 0,
        y: 24,
      });

      if (image) {
        gsap.set(image, {
          scale: 1.18,
          yPercent: 0,
        });
      }

      // ==========================================
      // HERO ANIMATION
      // ==========================================

      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      // Label

      if (label) {
        tl.to(label, {
          opacity: 1,
          y: 0,
          duration: 0.6,
        });
      }

      // Words

      tl.to(
        words,
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.09,
        },
        label ? "-=0.25" : 0,
      );

      // Content items

      tl.to(
        items,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.09,
        },
        "-=0.5",
      );

      // ==========================================
      // BACKGROUND IMAGE ZOOM
      // ==========================================

      if (image) {
        gsap.to(image, {
          scale: 1,
          duration: 2.4,
          ease: "power2.out",
        });

        // ========================================
        // IMAGE PARALLAX
        // ========================================

        gsap.to(image, {
          yPercent: 15,

          ease: "none",

          scrollTrigger: {
            trigger: section,

            start: "top top",

            end: "bottom top",

            scrub: true,

            invalidateOnRefresh: true,
          },
        });
      }
         gsap.to(".hero-content", {
        y: -80,
        opacity: 0.7,
        ease: "none",

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      
    }, section);

    // ==========================================
    // CLEANUP
    // ==========================================

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden px-10"
    >
      {/* ======================================
          BACKGROUND
      ====================================== */}

      <div className="absolute inset-0 -z-20 overflow-hidden">
        <Image
          data-hero-image
          src="/home/home.webp"
          alt="A luxury car raised on a lift inside a dark detailing workshop"
          width={1920}
          height={1280}
          priority
          className="size-full object-cover object-[60%] md:object-center"
        />
      </div>

      {/* ======================================
          OVERLAY
      ====================================== */}

      {/* <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/60 to-black/40" /> */}
{/* <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071522]/95 via-[#071522]/65 to-[#071522]/35" /> */}
{/* <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1a0808] via-[#1a0808]/60 to-[#1a0808]/40" /> */}
{/* <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0d1420] via-[#0d1420]/60 to-[#0d1420]/40" /> */}
<div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1c1c1c] via-[#1c1c1c]/60 to-[#1c1c1c]/40" />
      {/* ======================================
          CONTENT
      ====================================== */}

      <div className="hero-content w-full pt-32 pb-14 lg:ml-20 lg:pb-20">
        <p
          data-hero-label
          className="label-mono text-sm text-primary"
        >
          Premium Auto Care
        </p>

        {/* ====================================
            HEADING
        ==================================== */}

        <h1 className="mt-6 font-heading text-[clamp(5rem,11vw,9rem)] font-bold leading-[0.86]">
          <span className="block overflow-hidden">
            <span
              data-hero-word
              className="block"
            >
              YOUR CAR.
            </span>
          </span>

          <span className="block overflow-hidden">
            <span
              data-hero-word
              className="block text-primary"
            >
              OUR CRAFT.
            </span>
          </span>
        </h1>

        {/* ====================================
            BOTTOM CONTENT
        ==================================== */}

        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          {/* Left */}

          <div className="max-w-md">
            <p
              data-hero
              className="text-base leading-relaxed text-muted-foreground"
            >
              From precision detailing to complete body restoration, we bring
              professional care, craftsmanship, and attention to every vehicle
              that enters our garage.
            </p>

            <div
              data-hero
              className="mt-8 flex flex-row flex-wrap gap-8"
            >
              <Button
                title="Explore Services"
                href="/services"
                variant="primary"
               
              />

              <Button
                title="Enquiry"
                href="/contact"
                variant="outline"
                
              />
            </div>
          </div>

          {/* Stats */}

          <dl
            data-hero
            className="grid grid-cols-3 gap-2 lg:gap-10"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="border-l border-border pl-4"
              >
                <dt className="sr-only">
                  {s.label}
                </dt>

                <dd className="font-condensed text-4xl leading-none font-bold sm:text-5xl">
                  {s.value}
                </dd>

                <p className="label-mono mt-2 text-[10px] text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

