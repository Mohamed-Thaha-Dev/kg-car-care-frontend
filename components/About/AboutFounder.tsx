"use client";
import gsap from "gsap";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export default function AboutFounder() {
  const sectionRef = useRef<HTMLElement>(null);
 useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        once: true,
      },
    });

    tl.fromTo(
      ".founder-eyebrow",
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
      },
    )
      .fromTo(
        ".founder-title",
        {
          y: 35,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.15",
      )
      .fromTo(
        ".founder-details",
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",
        },
        "-=0.2",
      )
      .fromTo(
        ".branch-card",
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.2",
      )
      .fromTo(
        ".founder-image",
        {
          scale: 1.04,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.5",
      )
      .fromTo(
        ".founder-card",
        {
          y: 25,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",
        },
        "-=0.35",
      );
  }, sectionRef);

  return () => ctx.revert();
}, []);
  return (
    <section className="py-20 bg-sub-background" ref={sectionRef}>
      <div className="lg:ml-20 ml-5 ">
    <div className=" founder-eyebrow  mb-6 flex items-center gap-3">
            <span className="h-[1px] w-10 bg-primary" />

            <span className="text-xs font-bold tracking-[0.25em] text-muted/50">
              MEET OUR FOUNDER
            </span>
          </div>

          <h2 className=" founder-title text-5xl text-muted font-heading font-bold tracking-tight md:text-7xl lg:text-8xl">
            Built on Passion.
            <span className="block text-primary">Driven by Trust.</span>
          </h2>
      </div>
      
      <div className="mx-auto grid max-w-7xl order-2 items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
        {/* Left - Founder Details */}
        <div className="order-2">
      
          <div className="founder-details">
            <div className="lg:mt-8">
              <h3 className="text-2xl font-bold text-zinc-900">K.Manikandan</h3>

              <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-red-600">
                Founder & Managing Director
              </p>
            </div>

            <p className="mt-7 max-w-xl leading-8 text-zinc-600">
              With a passion for automobiles and a commitment to honest service,
              KG Car Service was built with one simple vision — to provide every
              customer with reliable, professional, and quality car care.
            </p>

            <p className="mt-4 max-w-xl leading-8 text-zinc-600">
              Today, KG Car Service proudly serves customers through two
              branches, continuing the same commitment to quality, transparency,
              and customer satisfaction.
            </p>
          </div>

          {/* Branch Details */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className=" branch-card rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <p className="text-xs font-bold tracking-widest text-red-600">
                BRANCH (Main Branch)
              </p>

              <h4 className="mt-2 text-[12px] font-bold text-zinc-900">
                WATER TANK STOP,Thudiyalur-Saravanampatti Rd,Fathima
                Nagar,Coimbatore,Tamil Nadu 641029
              </h4>

              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Full-service car repair and maintenance.
              </p>
            </div>

            <div className="branch-card rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <p className="text-xs font-bold tracking-widest text-red-600">
                BRANCH 02
              </p>

              <h4 className="mt-2 text-[12px] font-bold text-zinc-900">
                1433, Sathy Rd, Ganapathy Housing Unit, Bharathi Nagar,
                Gopalakrishnapuram, Ganapathy, Coimbatore. Tamilnadu-641006
              </h4>

              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Professional automotive care and servicing.
              </p>
            </div>
          </div>
        </div>

        {/* Right - Founder Image */}
        <div className="relative order-1 lg:order-2">
          <div className="founder-image mt-5 relative aspect-square overflow-hidden rounded-3xl bg-zinc-200">
            <Image
              src="/home/founder.webp"
              alt="KG Car Service Founder"
              fill
              className="object-cover object-top"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>

          {/* Floating Card */}
          <div className="founder-card hidden md:block absolute -bottom-10 left-6 right-6 rounded-2xl border border-white/10 bg-black/70 p-6 backdrop-blur-xl">
            <Sparkles className="h-6 w-6 text-red-500" />

            <p className="mt-4 text-lg font-semibold text-white">
              Growing With Trust.
            </p>

            <p className="mt-2 text-sm leading-6 text-zinc-300">
              From one vision to two branches, our journey continues with a
              commitment to quality service and customer satisfaction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
