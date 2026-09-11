"use client"
import { features } from "@/lib/data/AboutPageDatas";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";


export default function AboutWhyChooseUUs(){
    const sectionRef = useRef<HTMLElement>(null)
    useLayoutEffect(()=>{
        const ctx = gsap.context(()=>{
             gsap.fromTo(
        ".feature-card",
        {
          y: 80,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger:sectionRef.current,
            start: "top 80%",
          },
        },
      );
        },sectionRef)
        return(()=>ctx.revert())
    },[])
    return(
         <section className="bg-background py-24 text-white md:py-20" ref={sectionRef}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Heading */}

          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[1px] w-10 bg-primary" />

              <span className="text-xs font-bold tracking-[0.25em] text-white/50">
                WHY CHOOSE US
              </span>
            </div>

            <h2 className="text-5xl font-bold font-heading md:text-7xl lg:text-8xl">
              Built Around
              <span className="lg:ml-2 block lg:inline text-primary">Better Car Care.</span>
            </h2>
          </div>

          {/* Cards */}

          <div className="features-grid mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.number}
                  className="feature-card group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition duration-500 hover:-translate-y-2 hover:border-red-500/50 hover:bg-white/[0.06]"
                >
                  {/* Number */}

                  <span className="absolute right-6 top-5 text-sm font-bold text-zinc-700">
                    {feature.number}
                  </span>

                  {/* Icon */}

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white transition duration-500 group-hover:rotate-6 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-8 text-xl font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-zinc-400">
                    {feature.description}
                  </p>

                  {/* Bottom Line */}

                  <div className="mt-8 h-[1px] w-0 bg-red-500 transition-all duration-500 group-hover:w-full" />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    )
}