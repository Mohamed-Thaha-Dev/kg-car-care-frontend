"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Cards from "../ui/Cards";
import { Experience } from "@/lib/data/Experience";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    number: "01",
    title: "Expert Technicians",
    description:
      "Our skilled technicians bring hands-on experience and professional knowledge to every vehicle.",
  },
  {
    number: "02",
    title: "Quality Workmanship",
    description:
      "Every service is handled with precision, attention to detail and a commitment to quality.",
  },
  {
    number: "03",
    title: "Premium Products",
    description:
      "We use trusted tools, professional-grade products and quality materials for better results.",
  },
  {
    number: "04",
    title: "Customer First",
    description:
      "From inspection to delivery, we focus on transparent communication and complete customer satisfaction.",
  },
];

const stats = [
  {
    value: "500+",
    label: "Vehicles Serviced",
  },
  {
    value: "98%",
    label: "Customer Satisfaction",
  },
  {
    value: "10+",
    label: "Years Experience",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });

      /* =========================
         HEADER
      ========================= */
      const cards = gsap.utils.toArray<HTMLElement>(".about-card");

      if (cards.length) {
        gsap.fromTo(
          cards,
          {
            y: 60,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".about-cards",
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
      tl.from(".why-label", {
        opacity: 0,
        y: 20,
       
        ease: "power3.out",
      })

        .from(
          ".why-heading-line",
          {
            opacity: 0,
            y: 80,
           
            ease: "power4.out",
          },
          "-=0.3",
        )

        .from(
          ".why-description",
          {
            opacity: 0,
            y: 30,
            
            ease: "power3.out",
          },
          "-=0.5",
        )

        /* =========================
           FOUNDER IMAGE
        ========================= */

        .from(
          ".founder-image",
          {
            opacity: 0,
            y: 50,
          
            ease: "power3.out",
          },
          "-=0.3",
        )

        /* =========================
           REASONS
        ========================= */

        .from(
          ".why-reason",
          {
            opacity: 0,
            x: 50,
            stagger: 0.12,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.5",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden text-white py-20"
    >
      {/* Background Glow */}

      <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-foreground/15 blur-[140px]" />

      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-16 grid gap-8 lg:grid-cols-12 lg:items-end">
          {/* Heading */}

          <div className="lg:col-span-7">
            <div className="why-label mb-6 flex items-center gap-3">
              <span className="h-[1px] w-10 bg-primary" />

              <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/50">
                Why Choose Us
              </span>
            </div>

            <h2 className="max-w-4xl overflow-hidden font-heading text-5xl font-black uppercase leading-[0.9]  sm:text-6xl md:text-7xl lg:text-[88px]">
              <span className="why-heading-line block">
                Built On <span className="text-primary">Trust.</span>
              </span>

              <span className="why-heading-line block">
                Driven By <span className="text-white/40">Quality.</span>
              </span>
            </h2>
          </div>

          {/* Description */}

          <div className="lg:col-span-5 lg:pb-2">
            <p className="why-description max-w-xl text-sm leading-7 text-white/50 md:text-base">
              At KG Car Service, we combine skilled workmanship, quality
              products and attention to detail to keep your vehicle performing
              and looking its best.
            </p>
          </div>
        </div>

        {/* =====================================================
            FOUNDER + REASONS
        ===================================================== */}

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* =================================================
              FOUNDER
          ================================================= */}

          <div className="lg:col-span-5">
            <div className="relative">
              {/* Gold Frame */}

              {/* <div className="founder-frame absolute -right-3 -top-3 z-0 h-full w-full border border-[#f5b83e]/30 md:-right-4 md:-top-4" /> */}

              {/* Founder Image */}

              <div className="founder-image relative aspect-[4/5] overflow-hidden bg-[#111]">
                <Image
                  src="/home/founder.webp"
                  alt="Founder of KG Car Service"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-top"
                />

                {/* Image Overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                <div className="absolute bottom-4 left-3 border-l border-[#f5b83e] pl-5">
                  <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-[#f5b83e]">
                    Founder & Director
                  </p>

                  <h3 className="text-2xl font-bold uppercase tracking-tight md:text-3xl">
                    K.Manikandan
                  </h3>

                  <p className="mt-2 text-sm text-white/40">
                    Automotive Professional
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              WHY CHOOSE US REASONS
          ================================================= */}

          <div className="lg:col-span-7">
            <div className="divide-y divide-white/10 border-y border-white/10">
              {reasons.map((reason) => (
                <div
                  key={reason.number}
                  className="why-reason group relative py-7 md:py-8"
                >
                  {/* Hover Background */}

                  <div className="absolute inset-0 -mx-5 scale-x-0 bg-white/[0.025] transition-transform duration-500 group-hover:scale-x-100" />

                  <div className="relative flex gap-5">
                    {/* Number */}

                    <div className="shrink-0">
                      <span className="text-sm font-medium text-primary">
                        {reason.number}
                      </span>
                    </div>

                    {/* Content */}

                    <div className="flex-1">
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-xl font-bold uppercase tracking-tight md:text-2xl">
                          {reason.title}
                        </h3>

                        <span className="text-xl text-white/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary">
                          ↗
                        </span>
                      </div>

                      <p className="max-w-lg text-sm leading-6 text-white/40 transition-colors duration-300 group-hover:text-white/60">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =====================================================
            STATS
        ===================================================== */}

        {/* <div className="mt-20 border-t border-white/10 pt-10 md:mt-28">

          <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">

            {stats.map((stat) => (

              <div
                key={stat.label}
                className="why-stat py-6 sm:px-8 sm:py-0 first:sm:pl-0 last:sm:pr-0"
              >

                <div className="flex items-end justify-between sm:block">

                  <span className="text-4xl font-black tracking-tight md:text-5xl">
                    {stat.value}
                  </span>

                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 sm:mt-3 sm:block">
                    {stat.label}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div> */}
        <div className="about-cards  mt-15 grid gap-4 md:grid-cols-3">
          {Experience.map((card, index) => (
            <Cards key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
