"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "../ui/Button";

export default function ServicesHero() {
  const heroRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".services-hero-label",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
      )
        .fromTo(
          ".services-hero-title",
          {
            opacity: 0,
            y: 80,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power4.out",
          },
          "-=0.2",
        )
        .fromTo(
          ".services-hero-text",
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .fromTo(
          ".services-hero-btn",
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3",
        );

      if (imgRef.current) {
        gsap.to(imgRef.current, {
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
      className="relative flex min-h-screen items-end overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div ref={imgRef}   
          className="absolute inset-0 h-full w-full md:-inset-[10%] md:h-[120%] md:w-[120%]"
        
        >
          <Image
            src="/home/service-hero.webp"
            alt="KG Car Care Services"
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-70"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-black/60  to-transparent " />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/40 to-black/20" />
      </div>

      {/* Content */}
      <div className="hero-content relative z-10 mx-auto w-full max-w-7xl px-6 pb-30 lg:px-8 lg:pb-24">
        <div className="max-w-4xl">
          <div className="services-hero-label mb-6 flex items-center gap-3">
            <span className="h-px w-12 bg-red-600" />

            <span className="text-xs font-semibold tracking-[0.3em] text-foreground/50">
              OUR SERVICES
            </span>
          </div>

          <h1 className="mb-8 text-5xl font-bold font-heading leading-[0.95]  text-white sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="services-hero-title block">Complete Care</span>

            <span className="services-hero-title block text-primary">
              For Every Drive.
            </span>
          </h1>

          <p className="services-hero-text max-w-xl text-base leading-7 text-zinc-300 md:text-lg">
            From routine maintenance to advanced repairs, KG Car Care provides
            professional automotive solutions designed to keep your vehicle
            performing at its best.
          </p>

          <div className="services-hero-btn mt-10 flex flex-wrap gap-4">
            <Button title="BOOK A SERVICE" href="/contact" arrow={true} />
          </div>
        </div>
      </div>
    </section>
  );
}
