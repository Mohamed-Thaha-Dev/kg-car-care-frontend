"use client";

import gsap from "gsap";
import { BadgeCheck, Car } from "lucide-react";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutWhyWeBuilt() {
  const sectionRef = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".story-image",
        {
          clipPath: "inset(0 100% 0 0)",
        },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.3,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );

      gsap.fromTo(
        ".story-content",
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  return (
    <section
      className="story-section py-24 md:py-20 bg-sub-background"
      ref={sectionRef}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:px-8">
        {/* Image */}

        <div className="story-image relative hidden lg:block">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-zinc-200">
            <Image
              src="/images/about-img.webp"
              alt="KG Car Service technicians at work"
              fill
              className="object-cover"
            />
          </div>

          {/* Experience Card */}

          <div className="absolute bottom-0 -left-2 rounded-t-2xl  bg-sub-background p-6 text-white ">
            <div className="text-4xl text-center  font-bold text-red-500">
              12+
            </div>

            <div className="mt-1 text-center text-sm text-zinc-400">
              Years of Automotive
              <br />
              Experience
            </div>
          </div>
        </div>

        {/* Content */}

        <div className="story-content">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-[1px] w-10 bg-primary" />

            <span className="text-xs font-bold tracking-[0.25em] text-muted/50">
              OUR STORY
            </span>
          </div>

          <h2 className="max-w-xl font-heading text-5xl font-bold text-muted lg:text-8xl">
            Why We Built
            <span className="block text-primary">KG Car Service</span>
          </h2>

          <p className="mt-7 max-w-xl leading-8 text-zinc-600">
            At KG Car Service, we believe every car owner deserves honest
            service, skilled workmanship, and complete peace of mind.
          </p>

          <p className="mt-5 max-w-xl leading-8 text-zinc-600">
            We understand the challenges customers often face when servicing
            their vehicles — unexpected costs, unclear explanations, delayed
            repairs, and uncertainty about the quality of work.
          </p>
          <p className="mt-3 max-w-xl leading-8 text-zinc-600">
            That's why we created{" "}
            <span className="text-primary font-bold">KG Car Service</span> a
            place where professional expertise meets transparent and reliable
            car care.
          </p>
          <p className="mt-3 max-w-xl leading-8 text-zinc-600">
            From routine servicing to complex repairs, electrical work, AC
            maintenance, tyres, batteries, and insurance claim assistance, our
            experienced team is committed to keeping your vehicle performing at
            its best.
          </p>
          <p className="mt-3 max-w-xl uppercase leading-8 text-zinc-600">
            Our mission is simple —{" "}
            <span className="text-primary font-bold">
              deliver quality car care you can trust, every time you visit us.
            </span>
          </p>

          {/* Small Features */}

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Car className="h-5 w-5" />
              </div>

              <div>
                <h4 className="font-semibold text-primary">Complete Car Care</h4>

                <p className="mt-1 text-sm leading-6 text-zinc-500">
                  Everything your car needs in one place.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <BadgeCheck className="h-5 w-5" />
              </div>

              <div>
                <h4 className="font-semibold text-primary">Trusted Service</h4>

                <p className="mt-1 text-sm leading-6 text-zinc-500">
                  Honest advice and reliable workmanship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
