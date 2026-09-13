"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, MapPin, Clock3 } from "lucide-react";
import ContactForm from "../Common/ContactForm";

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // LEFT CONTENT
      gsap.from(".enquiry-info", {
        y: 70,
        opacity: 0,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // RIGHT FORM
      gsap.from(".enquiry-panel", {
        y: 70,
        opacity: 0,
        duration: 1.1,
        delay: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // CONTACT DETAILS
      gsap.from(".contact-meta", {
        y: 25,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        delay: 0.25,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        contact-section
        relative
        overflow-hidden
        py-30
        sm:py-28
        lg:py-35
      "
    >
      {/* BACKGROUND */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute
               top-[-20%]
            left-[-10%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-foreground/20
            blur-[140px]
          "
        />

        <div
          className="
            absolute
            bottom-[-20%]
            right-[-10%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-primary/90
            blur-[140px]
          "
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* TOP LABEL */}

        <div className="mb-1 flex items-center gap-4">
          <span className="h-px w-12 bg-primary" />

          <span
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.35em]
              text-foreground/50
            "
          >
            Start Your Journey
          </span>
        </div>

        {/* MAIN GRID */}

        <div
          className="
            grid
            grid-cols-1
            gap-14
            lg:grid-cols-[0.85fr_1.15fr]
            lg:items-center
            lg:gap-20
          "
        >
          {/* =====================================
              LEFT CONTENT
          ===================================== */}

          <div className="enquiry-info">
            <h2
              className="
                max-w-xl
                text-5xl
                font-bold               
                leading-[0.95]
                font-heading
                
                text-foreground
                md:text-6xl
                lg:text-8xl
              "
            >
              Let's take
              <br />
              <span className="text-foreground/40">care of</span>
              <br />
              <span className="text-primary">your car.</span>
            </h2>

            <p
              className="
                mt-8
                max-w-md
                text-sm
                leading-7
                text-foreground/50
                sm:text-base
              "
            >
              Whether it needs a deep detail, premium protection, paint
              correction or a complete transformation — tell us what you have in
              mind.
            </p>

            {/* CONTACT META */}

            <div className="mt-12 space-y-0 grid grid-cols-2 gap-5">
              {/* PHONE */}

              <a
                href="tel:+919751003567"
                className="
                  contact-meta
                  group
                  flex
                  items-center
                  gap-5
                  border-t
                  border-white/10
                  py-5
                "
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    text-foreground/80
                    transition
                  group-hover:border-primary/80
                    group-hover:text-primary
                  "
                >
                  <Phone className="h-4 w-4" />
                </div>

                <div>
                  <p
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.25em]
                      text-white/30
                    "
                  >
                    Call
                  </p>

                  <p className="mt-1 text-sm text-white">+91 9751003567</p>
                </div>
              </a>
              <a
                href="tel:+919751003050"
                className="
                  contact-meta
                  group
                  flex
                  items-center
                  gap-5
                  border-t
                  border-white/10
                  py-5
                "
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    text-white/60
                    transition
                    group-hover:border-primary/80
                    group-hover:text-primary
                  "
                >
                  <Phone className="h-4 w-4" />
                </div>

                <div>
                  <p
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.25em]
                      text-white/30
                    "
                  >
                    Call
                  </p>

                  <p className="mt-1 text-sm text-white">+91 9751003050</p>
                </div>
              </a>

              {/* LOCATION */}

              <div
                className="
                  contact-meta
                  flex
                  items-center
                  gap-5
                  border-t
                  border-white/10
                  py-5
                "
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    text-white/60
                  "
                >
                  <MapPin className="h-4 w-4" />
                </div>

                <div>
                  <p
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.25em]
                      text-white/30
                    "
                  >
                    Branch 1
                  </p>

                  <p className="mt-1 text-sm text-white">
                    Coimbatore, Tamil Nadu
                  </p>
                </div>
              </div>
              <div
                className="
                  contact-meta
                  flex
                  items-center
                  gap-5
                  border-t
                  border-white/10
                  py-5
                "
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    text-white/60
                  "
                >
                  <MapPin className="h-4 w-4" />
                </div>

                <div>
                  <p
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.25em]
                      text-white/30
                    "
                  >
                    Branch 2
                  </p>

                  <p className="mt-1 text-sm text-white">
                    Coimbatore, Tamil Nadu
                  </p>
                </div>
              </div>

              {/* HOURS */}

              <div
                className="
                  contact-meta
                  flex
                  items-center
                  gap-5
                  border-t
                  border-white/10
                  py-5
                "
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    text-white/60
                  "
                >
                  <Clock3 className="h-4 w-4" />
                </div>

                <div>
                  <p
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.25em]
                      text-white/30
                    "
                  >
                    Opening Hours
                  </p>

                  <p className="mt-1 text-sm text-white">
                    Mon – Sat · 9:00 AM – 7:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =====================================
              RIGHT FORM
          ===================================== */}
          <div className="enquiry-panel">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
