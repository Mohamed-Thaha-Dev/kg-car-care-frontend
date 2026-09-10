"use client";

import { Check } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  "Experienced Technicians",
  "Advanced Diagnostics",
  "Quality Parts",
  "Transparent Pricing",
];

export default function ServicesIntro() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".intro-content",
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-sub-background py-24 md:py-32"
    >
      <div className="intro-content mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-red-600" />

            <span className="text-xs font-semibold tracking-[0.25em] text-red-500">
              EXPERT AUTO CARE
            </span>
          </div>

          <h2 className="text-4xl font-heading font-semibold t text-muted/90 md:text-5xl lg:text-7xl">
            Everything Your Car Needs,
            <span className="block text-primary">
              All in One Place.
            </span>
          </h2>
        </div>

        <div className="flex flex-col justify-end">
          <p className="max-w-xl text-base leading-8 text-muted/80 md:text-lg">
            Whether it&apos;s routine maintenance, diagnostics, repairs,
            or detailing, our experienced technicians use the right tools
            and expertise to give your vehicle the care it deserves.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 border-b border-white/10 pb-4"
              >
                <div className="flex h-7 w-7 items-center justify-center bg-red-600">
                  <Check size={15} />
                </div>

                <span className="text-sm font-medium text-primary">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}