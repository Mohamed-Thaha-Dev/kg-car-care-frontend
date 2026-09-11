"use client";

import Image from "next/image";
import { Button } from "../ui/Button";
import { ArrowDown } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function AboutHero() {
  const heroRef = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
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
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden bg-background"
      ref={heroRef}
    >
      {/* Background Image */}

      <div className="absolute inset-0">
        <Image
          src="/home/about-hero.webp"
          alt="KG Car Service Workshop"
          fill
          priority
          className="object-cover opacity-70"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black  to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10" />
      </div>

      {/* Decorative Gradient */}

      {/* <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-red-600/20 blur-[150px]" /> */}

      <div className="relative mx-auto w-full max-w-7xl px-6 pt-24 lg:px-8">
        <div className="max-w-4xl">
          {/* Eyebrow */}

          <div className="hero-eyebrow mb-8 flex items-center gap-3">
            <span className="h-[1px] w-10 bg-primary" />

            <span className="text-xs font-bold tracking-[0.3em] text-white/50">
              ABOUT KG CAR SERVICE
            </span>
          </div>

          {/* Title */}

          <h1 className="mb-8 text-5xl font-heading font-bold leading-[0.95]  text-white sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="hero-title-line block">Driven by Passion.</span>

            <span className="hero-title-line text-zinc-400 mr-2">
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

          <div className="hero-buttons mt-10 flex   gap-4">
            <Button title="Book a Service" href="/contact" variant="primary" />

            <Button
              title="Explore Services"
              href="/services"
              variant="outline"
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="text-[10px] font-semibold tracking-[0.3em] text-zinc-400">
          SCROLL TO EXPLORE
        </span>

        <ArrowDown className="h-5 w-5 animate-bounce text-white" />
      </div>
    </section>
  );
}
