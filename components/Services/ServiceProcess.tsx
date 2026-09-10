"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Book Your Service",
    description:
      "Choose the service you need and schedule your visit with us.",
  },
  {
    number: "02",
    title: "Vehicle Inspection",
    description:
      "Our experts carefully inspect your vehicle and identify the issue.",
  },
  {
    number: "03",
    title: "Expert Service",
    description:
      "Our technicians perform the required maintenance or repairs.",
  },
  {
    number: "04",
    title: "Ready To Drive",
    description:
      "Your vehicle is checked, prepared, and ready for the road.",
  },
];

export default function ServiceProcess() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".process-step",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-sub-background py-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="text-xs font-semibold tracking-[0.3em] text-red-500">
            HOW IT WORKS
          </span>

          <h2 className="mt-6 text-5xl font-heading font-semibold text-muted/90 md:text-6xl lg:text-7xl">
            Simple. Transparent.
            <span className="block text-primary">
              Reliable.
            </span>
          </h2>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="process-step border-t border-primary pt-8"
            >
              <span className="text-sm text-primary">
                {step.number}
              </span>

              <h3 className="mt-6 text-xl font-semibold text-primary">
                {step.title}
              </h3>

              <p className="mt-4 leading-7 text-muted/60">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}