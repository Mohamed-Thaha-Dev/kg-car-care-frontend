"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import ArrowButton, { Button } from "../ui/Button";
import { Experience } from "@/lib/data/Experience";
import Cards from "../ui/Cards";
import CircularText from "../ui/CircularText";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    number: "10+",
    label: "Years of Experience",
  },
  {
    number: "5K+",
    label: "Cars Serviced",
  },
  {
    number: "100%",
    label: "Quality Commitment",
  },
];

export default function AboutSection() {
  // ==========================================
  // SECTION
  // ==========================================

  const sectionRef = useRef<HTMLElement>(null);

  // ==========================================
  // MAIN ELEMENT REFS
  // ==========================================

  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  // ==========================================
  // GSAP
  // ==========================================

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // ========================================
      // HEADING ANIMATION
      // ========================================

      if (headingRef.current) {
        const headingLines = Array.from(
          headingRef.current.children
        );

        gsap.fromTo(
          headingLines,
          {
            y: 120,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.12,
            ease: "power4.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // ========================================
      // IMAGE REVEAL
      // ========================================

      if (imageRef.current && imageWrapperRef.current) {
        gsap.fromTo(
          imageRef.current,
          {
            
            x: 80,
            opacity: 0,
          },
          {
            scale: 1,
            x: 0,
            opacity: 1,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageWrapperRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // ======================================
        // IMAGE PARALLAX
        // ======================================

        gsap.to(imageRef.current, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: imageWrapperRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // ========================================
      // REVEAL ELEMENTS
      // ========================================

      const revealElements = gsap.utils.toArray<HTMLElement>(
        ".about-reveal"
      );

      if (revealElements.length) {
        gsap.fromTo(
          revealElements,
          {
            y: 40,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // ========================================
      // CARDS
      // ========================================

    

      // ========================================
      // GOLD LINE
      // ========================================

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          {
            scaleX: 0,
          },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // ========================================
      // ROTATING STAR
      // ========================================

      if (starRef.current) {
        gsap.to(starRef.current, {
          rotation: 360,
          duration: 8,
          repeat: -1,
          ease: "none",
        });
      }
    }, sectionRef);

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
      className="relative overflow-hidden bg-sub-background px-5 py-15 text-white sm:px-8 md:py-20 lg:px-20 lg:py-25"
    >
      <div className="mx-auto max-w-[1500px]">

        {/* =====================================
            TOP BAR
        ====================================== */}

        <div className="about-reveal mb-10 flex items-center justify-between md:mb-15">

          <div className="flex items-center gap-3">
            <span
              ref={starRef}
              className="text-xl text-primary"
            >
              ✱
            </span>

            <span className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-400">
              About KG Car Care
            </span>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <span className="h-px w-10 bg-neutral-700" />

            <span className="text-xs tracking-[0.2em] text-neutral-500">
              EST. 2014
            </span>
          </div>

        </div>

        {/* =====================================
            MAIN GRID
        ====================================== */}

        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">

          {/* ===================================
              LEFT CONTENT
          ==================================== */}

          <div className="lg:col-span-7">

            {/* Small Label */}

            <div className="about-reveal mb-8 flex items-center gap-3">

              <span className="h-[1px] w-10 bg-primary" />

              <span className="text-xs uppercase tracking-[0.25em] text-muted/80">
                Who We Are
              </span>

            </div>

            {/* Heading */}

            <div className="overflow-hidden">

              <h2
                ref={headingRef}
                className="text-[clamp(5rem,10vw,9.5rem)] text-muted font-bold leading-[0.82]  font-heading"
              >

                <span className="mr-3">
                  WE TAKE
                </span>

                <span className="mr-3">
                  CARE OF
                </span>

                <span className="text-primary">
                  THE DETAILS.
                </span>

              </h2>

            </div>

            {/* Description */}

            <div className="about-content mt-12 max-w-[650px] md:mt-16">

             
    <p className="about-reveal text-lg leading-relaxed text-muted/50 sm:text-xl">
      KG Car Care is a trusted automotive service destination in
      Coimbatore, built around one simple idea — your car deserves
      professional care at every stage.
    </p>

    <p className="about-reveal mt-6 text-sm leading-7 text-muted sm:text-base">
      From regular maintenance and mechanical repairs to washing,
      detailing, denting, painting and AC care, our team handles your
      vehicle with the attention it deserves.
    </p>

    <p className="about-reveal mt-6 text-sm leading-7 text-muted sm:text-base">
      We combine skilled workmanship, proper equipment and a commitment
      to quality to keep your car performing smoothly, looking its best
      and ready for the road.
    </p>

              {/* CTA */}

              <div className="about-reveal mt-10">
                <ArrowButton title="Explore Our Services" href="/service"/>

              </div>

            </div>

          </div>

          {/* ===================================
              RIGHT IMAGE
          ==================================== */}

          <div className="lg:col-span-5">

  <div
    ref={imageWrapperRef}
    className="
      group
      relative
      mx-auto
      aspect-[4/5]
      w-full
      max-w-[520px]
      overflow-visible
    "
  >

    {/* ─────────────────────────
        OUTER GOLD FRAME
    ───────────────────────── */}

    <div
      className="
        absolute
        -right-5
        -top-5
        h-full
        w-full
        border
        border-primary/40
        transition-all
        duration-700
        group-hover:-right-7
        group-hover:-top-7
      "
    />

    {/* Secondary Gold Line */}

    <div
      className="
        absolute
        -bottom-3
        -left-3
        z-0
        h-full
        w-full
        border
        border-primary/15
      "
    />

    {/* ─────────────────────────
        IMAGE
    ───────────────────────── */}

    <div
      ref={imageRef}
      className="
        relative
        z-10
        h-full
        w-full
        overflow-hidden
        bg-neutral-950
        shadow-[0_30px_80px_rgba(0,0,0,0.45)]
      "
    >

      <Image
        src="/home/about_img.webp"
        alt="KG Car Care"
        fill
        loading="lazy"
        className="
          object-cover
          transition-transform
          duration-1000
          ease-out
          group-hover:scale-105
        "
        sizes="(max-width: 1084px) 90vw, 40vw"
      />

      {/* Cinematic Overlay */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/80
          via-black/10
          to-black/20
        "
      />

      {/* Subtle Gold Light */}

      <div
        className="
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-700
          group-hover:opacity-100
          bg-[radial-gradient(circle_at_70%_30%,rgba(245,184,62,0.15),transparent_45%)]
        "
      />

      {/* Bottom Location */}

      <div
        className="
          absolute
          bottom-6
          right-5
          text-[10px]
          uppercase
          tracking-[0.3em]
          text-white/50
        "
      >
        Coimbatore · Tamil Nadu
      </div>

    </div>


    {/* ─────────────────────────
        FLOATING BADGE
    ───────────────────────── */}

   <div
  className="
    absolute
    -bottom-4
    lg:-left-4
    -left-2
    z-30
    flex
    aspect-square
    w-[clamp(100px,28vw,145px)]
    items-center
    justify-center
    rounded-full
   lg:border
    border-primary
    lg:bg-[#0a0a0a]
  "
>
  <CircularText
    text="KG CAR CARE ★ PREMIUM SERVICE ★ "
    spinDuration={20}
    onHover="speedUp"
    size={55}
    
   
  />

  <div className="absolute flex h-[32%] w-[32%] items-center justify-center rounded-full bg-primary">
    <span className="text-[clamp(8px,2vw,12px)] font-bold text-black">
      KG
    </span>
  </div>
</div>

  </div>

</div>

        </div>

        {/* =====================================
            DIVIDER
        ====================================== */}

        <div
          ref={lineRef}
          className="about-line mt-10 h-px origin-left bg-primary md:mt-15"
        />

        

      

        {/* =====================================
            BOTTOM STATEMENT
        ====================================== */}

        <div className="about-reveal  flex flex-col justify-between gap-10  pt-10  md:flex-row md:items-end">

          <div>

            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-neutral-600">
              Our Philosophy
            </p>

            <h3 className="max-w-[700px] font-heading  font-medium  text-muted/70 text-4xl md:text-6xl">
              YOUR CAR DESERVES
              <span className="text-primary ">
                {" "}BETTER.
              </span>
            </h3>

          </div>

          {/* <Link
            href="#contact"
            className="group flex w-fit shrink-0 items-center gap-4 rounded-full bg-white px-6 py-4 text-sm font-medium text-black transition-all duration-300 hover:bg-[#f5b83e]"
          >
            BOOK A SERVICE

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <ArrowUpRight size={18} />
            </span>

          </Link> */}
          <div className="mb-5">

<Button title="BOOK A SERVICE" href="/services"/>
          </div>
        </div>

      </div>
    </section>
  );
}