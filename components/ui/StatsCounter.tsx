"use client";
import { stats } from "@/lib/data/AboutPageDatas";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StatsCounter() {
  const sectionRef = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const counters = gsap.utils.toArray<HTMLElement>(".stat-number");

      counters.forEach((counter) => {
        const target = Number(counter.getAttribute("data-value") || 0);

        const counterObject = {
          value: 0,
        };

        gsap.to(counterObject, {
          value: target,
          duration: 2,
          ease: "power2.out",

          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },

          onUpdate: () => {
            counter.textContent = Math.floor(
              counterObject.value,
            ).toLocaleString();
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  return (
    <section className="stats-section relative overflow-hidden bg-primary py-20 text-white md:py-24" ref={sectionRef}>
      {/* Background Pattern */}

      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full border-[60px] border-white" />

        <div className="absolute -bottom-40 -right-20 h-[500px] w-[500px] rounded-full border-[80px] border-white" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="flex items-end justify-center">
              <span
                className="stat-number text-5xl font-bold tracking-tight md:text-6xl"
                data-value={stat.value}
              >
                0
              </span>

              <span className="ml-1 text-3xl font-bold">{stat.suffix}</span>
            </div>

            <p className="mt-3 text-sm font-medium text-white/80">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
