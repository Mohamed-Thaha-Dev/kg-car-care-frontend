"use client"


import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/lib/data/process";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger)
export default function Process() {
  const root = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);

  useLayoutEffect(() => {
    const el = root.current;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-progress]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: "[data-steps]", start: "top center", end: "bottom 75%", scrub: true },
        },
      );
      gsap.utils.toArray<HTMLElement>("[data-step]").forEach((s, i) => {
        ScrollTrigger.create({
          trigger: s,
          start: "top 60%",
          end: "bottom 60%",
          onEnter: () => setStep(i),
          onEnterBack: () => setStep(i),
        });
      });
    }, );
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="py-20 lg:px-20 px-10 bg-sub-background">
        <div className="mb-16">

            <div className=" mb-8 flex items-center gap-3">

              <span className="h-[1px] w-10 bg-primary" />

              <span className="text-xs uppercase tracking-[0.25em] text-muted/80">
                Our Process
              </span>

            </div>
        
          

          <h2 className="text-5xl font-bold text-muted uppercase lg:text-8xl md:7xl font-heading">
            How We <span className="text-primary">Work</span> 
          </h2>
           <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
    From inspection to handover, every step is driven by precision, expertise, and care.
  </p>
        </div>
      <div className="grid  lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-6" data-steps>
          <div className="absolute left-10 top-0 h-full w-[2px] bg-muted/50">
            <div data-progress className="h-full w-[2px] origin-top bg-primary" />
          </div>
          {processSteps.map((s, i) => (
            <div key={s.number} data-step className="py-10 pl-25 lg:py-10">
              <span className={` transition-colors ${step === i ? "text-primary" : "text-muted/20"}`}>
                {s.number}
              </span>
              <h3
                className={
                  ` mt-3 text-5xl transition-colors duration-500 lg:text-6xl font-heading
                  ${step === i ? "text-primary" : "text-muted/20"}`
                }
              >
                {s.title}
              </h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted/70">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="lg:col-span-6 hidden lg:block">
          <div className="sticky top-30 aspect-[4/3] overflow-hidden bg-surface">
            {processSteps.map((s, i) => (
              <Image
                key={s.number}
                src={s.image}
                alt={s.title}
                width={1400}
                height={1000}
                
                className={ `absolute rounded-xl inset-0 h-full w-full object-cover transition-opacity duration-700 ${ step === i ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
