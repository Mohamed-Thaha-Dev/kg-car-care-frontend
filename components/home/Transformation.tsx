"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BeforeAfter from "../ui/BeforeAfter";
import { transformations } from "@/lib/data/Transformation";

gsap.registerPlugin(ScrollTrigger);

export default function TransformationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".transform-heading", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".transform-intro", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(".transform-card", {
        opacity: 0,
        y: 80,
        duration: 1,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".transform-list",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-sub-background px-6  text-white sm:px-8 lg:px-20 py-20"
    >
      {/* BACKGROUND DETAIL */}

      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#c9a13b]/[0.035] blur-[130px]" />

      <div className="relative ">
        {/* ------------------------------------------------
            INTRO
        ------------------------------------------------ */}

        <div className="grid gap-10">
          {/* LEFT */}

          <div className="transform-heading ">
            {/* SMALL LABEL */}

            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />

              <span className="text-xs uppercase font-semibold tracking-[0.3em] text-muted">
                Real Results
              </span>
            </div>

            {/* HEADING */}

            <h2 className="max-w-[500px] text-4xl text-muted font-black uppercase  font-heading  sm:text-6xl md:text-7xl lg:text-8xl">
              EVERY
              <span className="text-primary mx-2 ">DETAIL</span>
              MATTERS.
            </h2>

            {/* DESCRIPTION */}

            <p className="transform-intro mt-7 max-w-[530px] text-sm leading-7 text-muted/50 sm:text-base">
              See what professional detailing can do. Compare the condition
              before and after our specialists bring the vehicle back to life.
            </p>
          </div>

          {/* ------------------------------------------------
              RIGHT SIDE
          ------------------------------------------------ */}

          <div className="transform-list space-y-10 grid lg:grid-cols-3  grid-cols-1 lg:gap-10 ">
            {transformations.map((item) => (
              <article key={item.id} className="transform-card ">
                {/* TOP INFORMATION */}

                <div className="mb-5 flex items-end justify-between gap-5">
                  <div className="flex items-start gap-4 sm:gap-6">
                    {/* NUMBER */}

                    <span className="pt-1 text-xs font-semibold tracking-[0.15em] text-primary">
                      / {item.number}
                    </span>

                    <div>
                      {/* CAR */}

                      <h3 className="text-xl font-bold text-muted/90 uppercase tracking-tight sm:text-2xl">
                        {item.car}
                      </h3>

                      {/* SERVICE */}

                      <p className="mt-1 text-[10px] text-muted/50 font-medium tracking-[0.22em]">
                        {item.service}
                      </p>
                    </div>
                  </div>
                </div>

                {/* IMAGE */}

                <BeforeAfter
                  before={item.before}
                  after={item.after}
                  car={item.car}
                />

                {/* DESCRIPTION */}

                <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <p className="max-w-[550px] text-xs leading-6 text-muted/50 sm:text-sm">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
