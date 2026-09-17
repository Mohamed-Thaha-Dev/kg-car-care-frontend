"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function Banner() {
  const sectionRef = useRef<HTMLElement>(null);
  const message = "Hi, I’m interested in your services. I’d like to know more about your offerings and pricing. Please share the details."
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-content > *", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#090b0f] px-5 py-15 sm:px-8 lg:px-16"
    >
      {/* Background Image */}
      <Image
        src="/images/banner-img.jpeg"
        alt="Car Care"
        fill
        sizes="100vw"
        className="object-cover opacity-30"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="cta-content relative z-10 mx-auto max-w-5xl text-center">
        <h2 className="text-4xl font-black uppercase font-heading leading-[0.95]  text-white sm:text-6xl lg:text-8xl">
          Ready To Give Your Car
    
          <span className="block text-primary">The Care It Deserves?</span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
          Professional car care, expert technicians, and quality service you
          can always trust.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Button title="Book A Service" href="/contact" size="lg" arrow={true}/>

          <a
            href={`https://wa.me/919751003567?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-4 border border-white/20 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black"
          >
            WhatsApp Us
            <ArrowUpRight
              size={17}
              className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}