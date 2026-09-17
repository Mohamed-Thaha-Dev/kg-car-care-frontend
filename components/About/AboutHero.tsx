"use client";

import Image from "next/image";
import { Button } from "../ui/Button";
import { ArrowDown } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutHero() {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* =========================
         HERO CONTENT ANIMATION
      ========================= */

      const heroTl = gsap.timeline();

      heroTl
        .fromTo(
          ".hero-eyebrow",
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
          },
        )
        .fromTo(
          ".hero-title-line",
          {
            y: 120,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power4.out",
          },
          "-=0.3",
        )
        .fromTo(
          ".hero-description",
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .fromTo(
          ".hero-buttons",
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5",
        );

      /* =========================
         BACKGROUND PARALLAX
      ========================= */

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 15,
          ease: "none",

          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }

      /* =========================
         OPTIONAL CONTENT PARALLAX
      ========================= */

      gsap.to(".hero-content", {
        y: -80,
        opacity: 0.7,
        ease: "none",

        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-background"
    >
      {/* =========================
          BACKGROUND IMAGE
      ========================= */}

      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={imageRef}
          className="absolute inset-0 h-full w-full md:-inset-[10%] md:h-[120%] md:w-[120%]"
        >
          <Image
            src="/home/about-hero.webp"
            alt="KG Car Service Workshop"
            fill
            sizes="100vw"
            priority
            className="object-cover object-[70%] md:object-[80%] opacity-90"
          />
        </div>

        {/* Left Dark Overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" /> */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c1c1c] via-[#1c1c1c]/60 to-[#1c1c1c]/40" />
        {/* <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1a0808] via-[#1a0808]/60 to-[#1a0808]/40" /> */}

        {/* Bottom Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1c]/60 via-transparent to-[#1c1c1c]/40" />

        {/* Overall subtle dark layer */}
        {/* <div className="absolute inset-0 bg-black/10" /> */}
      </div>

      {/* =========================
          HERO CONTENT
      ========================= */}

      <div className="hero-content relative mx-auto w-full max-w-7xl px-6 pt-24 lg:px-8">
        <div className="max-w-4xl">
          {/* Eyebrow */}

          <div className="hero-eyebrow mb-8 flex items-center gap-3">
            <span className="h-[1px] w-10 bg-primary" />

            <span className="text-xs font-bold tracking-[0.3em] text-white/50">
              ABOUT KG CAR SERVICE
            </span>
          </div>

          {/* Title */}

          <h1 className="mb-8 font-heading text-5xl font-bold leading-[0.95] text-white sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="hero-title-line block">Driven by Passion.</span>

            <span className="hero-title-line mr-2 text-zinc-400">
              Powered by
            </span>

            <span className="hero-title-line text-primary">Precision.</span>
          </h1>

          {/* Description */}

          <p className="hero-description max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
            Your car deserves more than just a service. At KG Car Service, we
            combine experience, technology, and passion to deliver automotive
            care you can trust.
          </p>

          {/* Buttons */}

          <div className="hero-buttons mt-10 flex gap-4">
            <Button title="Book a Service" href="/contact" variant="primary" />

            <Button
              title="Explore Services"
              href="/services"
              variant="outline"
            />
          </div>
        </div>
      </div>

      {/* =========================
          SCROLL INDICATOR
      ========================= */}

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="text-[10px] font-semibold tracking-[0.3em] text-zinc-400">
          SCROLL TO EXPLORE
        </span>

        <ArrowDown className="h-5 w-5 animate-bounce text-white" />
      </div>
    </section>
  );
}
