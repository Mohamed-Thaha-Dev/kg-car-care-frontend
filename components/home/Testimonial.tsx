"use client";

import { Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import ReviewMarquee from "../ui/ReviewMarquee";
import { reviews } from "@/lib/data/Reviews";

gsap.registerPlugin(ScrollTrigger);

export default function KGCarTestimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(".testimonial-label", {
        y: 25,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".testimonial-title", {
        y: 45,
        opacity: 0,
        duration: 1,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".testimonial-description", {
        y: 25,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".testimonial-rating", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.25,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
      bg-sub-background
        
        py-20
      "
    >
      {/* -------------------------------------------
          Heading
      -------------------------------------------- */}

      <div
        className="
          
          mb-14
          lg:px-20
          px-5
        "
      >
        <div
          className="
            flex
            flex-col
            items-start
            justify-between
            gap-8
            lg:flex-row
            lg:items-end
          "
        >
          {/* Left */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />

              <span className="text-xs  uppercase font-semibold tracking-[0.3em] text-muted/50">
                Customer Reviews
              </span>
            </div>

            <h2
              className="
                testimonial-title
                max-w-3xl
                text-4xl
                uppercase
                font-heading
                font-semibold
                leading-[1.05]
                md:text-7xl
                text-muted
                lg:text-8xl
              "
            >
              Trusted by car owner
              <span className="block text-primary">who expect more.</span>
            </h2>

            <p
              className="
                testimonial-description
                mt-5
                max-w-xl
                text-sm
                leading-6
                text-muted/70
                md:text-base
              "
            >
              Real experiences from customers who trusted KG Car with their
              vehicles.
            </p>
          </div>

          {/* ---------------------------------------
              Rating
          ---------------------------------------- */}

          <div
            className="
    testimonial-rating
    flex
    w-fit
    items-center
    md:mx-auto
    sm:gap-5
    gap-2
    rounded-2xl
    border
    border-white/10
    bg-background
    px-5
    py-3
    backdrop-blur-md
    transition-all
    duration-300
    hover:border-white/20
  "
          >
            {/* Google Icon */}
            <div className="flex sm:h-9 h-6 w-9 items-center justify-center rounded-full bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="h-5 w-5"
              >
                <path
                  fill="#FFC107"
                  d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917Z"
                />
                <path
                  fill="#FF3D00"
                  d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4c-7.682 0-14.344 4.337-17.694 10.691Z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44Z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917Z"
                />
              </svg>
            </div>

            {/* Rating */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="sm:text-xl text-sm font-semibold text-white">5.0</span>

                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="
              sm:h-3.5
              h-2.5
              w-3.5
              fill-current
              text-[#f5b400]
            "
                    />
                  ))}
                </div>
              </div>

              <span className="mt-0.5 sm:text-[11px] text-[9px] text-foreground/70">
                160+ Google Reviews
              </span>
            </div>

            {/* Divider */}
            <div className="h-9 w-px bg-white/10 sm:block" />

            {/* CTA */}
            <a
              href="https://www.google.co.in/search?sca_esv=00b1959cab87582d&cs=1&output=search&q=KG+CAR+CARE&ludocid=13607929341182218812&lsig=AB86z5V3rYSXwkOyzmKj8S7Pj4ii&kgs=1168cda303c6c839&shndl=-1&shem=lcsnc,lsp&source=sh/x/loc/act/m1/2"
              target="_blank"
              className="
      
      text-xs
      font-medium
      uppercase
      tracking-[0.12em]
      text-foreground/60
      transition-colors
      hover:text-white
     
    "
            >
              write a Reviews
            </a>
          </div>
        </div>
      </div>

      {/* -------------------------------------------
          Review Marquees
      -------------------------------------------- */}

      <div className="relative space-y-5">
        {/* First Row → */}
        <ReviewMarquee reviews={reviews.slice(0, 4)} />

        {/* Second Row ← */}
        <ReviewMarquee reviews={reviews.slice(4, 8)} reverse />
      </div>
    </section>
  );
}
