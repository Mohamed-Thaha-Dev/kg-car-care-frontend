"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
ArrowUpRight,
Mail,
MapPin,
Phone,
Send,
Clock,
} from "lucide-react";
import ContactForm from "../Common/ContactForm";

export default function ContactHero() {
const pageRef = useRef<HTMLDivElement>(null);
const heroRef = useRef<HTMLDivElement>(null);
const formRef = useRef<HTMLDivElement>(null);
const infoRef = useRef<HTMLDivElement>(null);

const [isSubmitting, setIsSubmitting] = useState(false);

useLayoutEffect(() => {
const ctx = gsap.context(() => {
// HERO ANIMATION
const heroTl = gsap.timeline();


  heroTl
    .from(".contact-label", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    })
    .from(
      ".contact-title",
      {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
      },
      "-=0.3"
    )
    .from(
      ".contact-description",
      {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      },
      "-=0.5"
    );

  // CONTACT SECTION SCROLL ANIMATION
  gsap.from(infoRef.current, {
    scrollTrigger: {
      trigger: infoRef.current,
      start: "top 80%",
    },
    x: -80,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from(formRef.current, {
    scrollTrigger: {
      trigger: formRef.current,
      start: "top 80%",
    },
    x: 80,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });
}, pageRef);

return () => ctx.revert();

}, []);

const handleSubmit = async (
e: React.FormEvent<HTMLFormElement>
) => {
e.preventDefault();

setIsSubmitting(true);

// உங்கள் API / Email service இங்கே connect பண்ணலாம்
await new Promise((resolve) => setTimeout(resolve, 1500));

setIsSubmitting(false);
alert("Message sent successfully!");


};

return ( <main
   ref={pageRef}
   className="min-h-screen overflow-hidden text-white"
 >




  {/* ================= CONTACT CONTENT ================= */}

  <section className="border-t border-white/10 px-6 py-24 lg:px-16 lg:py-32">
    <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:gap-24">
      {/* ================= LEFT SIDE ================= */}

      <div ref={infoRef}>
        <span className="text-sm font-semibold tracking-[0.2em] text-red-500">
          CONTACT INFORMATION
        </span>

        <h2 className="mt-6 font-heading text-4xl font-bold leading-tight sm:text-5xl">
          We&apos;re Here
          <br />

          <span className="text-zinc-500">
            When You Need Us.
          </span>
        </h2>

        <p className="mt-6 max-w-md leading-8 text-zinc-400">
          Reach out to us anytime for enquiries, bookings, emergency
          assistance, or general information about our services.
        </p>

        {/* Contact Details */}

        <div className="mt-12 space-y-5">
          {/* Phone */}

          <a
            href="tel:+919876543210"
            className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-red-500/50 hover:bg-white/[0.04]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600/10 text-red-500">
              <Phone size={20} />
            </div>

            <div>
              <p className="text-xs tracking-wider text-zinc-500">
                CALL US
              </p>

              <p className="mt-1 font-medium text-white">
                +91 98765 43210
              </p>
            </div>

            <ArrowUpRight
              size={20}
              className="ml-auto text-zinc-600 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
            />
          </a>

          {/* Email */}

          <a
            href="mailto:hello@kgcarcare.com"
            className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-red-500/50 hover:bg-white/[0.04]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600/10 text-red-500">
              <Mail size={20} />
            </div>

            <div>
              <p className="text-xs tracking-wider text-zinc-500">
                EMAIL US
              </p>

              <p className="mt-1 font-medium text-white">
                hello@kgcarcare.com
              </p>
            </div>

            <ArrowUpRight
              size={20}
              className="ml-auto text-zinc-600 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
            />
          </a>

          {/* Location */}

          <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600/10 text-red-500">
              <MapPin size={20} />
            </div>

            <div>
              <p className="text-xs tracking-wider text-zinc-500">
                VISIT US
              </p>

              <p className="mt-1 font-medium leading-6 text-white">
                Your Business Address Here
              </p>
            </div>
          </div>

          {/* Working Hours */}

          <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600/10 text-red-500">
              <Clock size={20} />
            </div>

            <div>
              <p className="text-xs tracking-wider text-zinc-500">
                WORKING HOURS
              </p>

              <p className="mt-1 font-medium text-white">
                Mon – Sat: 9:00 AM – 7:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= RIGHT SIDE FORM ================= */}

      <div ref={formRef}>

        <ContactForm/>
      </div>
    </div>
  </section>

  {/* ================= BOTTOM CTA ================= */}

  <section className="border-t border-white/10 px-6 py-24 lg:px-16">
    <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 md:flex-row md:items-end">
      <div>
        <p className="text-sm tracking-[0.25em] text-red-500">
          NEED IMMEDIATE HELP?
        </p>

        <h2 className="mt-5 font-heading text-4xl font-bold sm:text-5xl">
          Your Car Deserves
          <br />

          <span className="text-zinc-500">
            The Best Care.
          </span>
        </h2>
      </div>

      <a
        href="tel:+919876543210"
        className="group flex items-center gap-4 text-lg font-semibold"
      >
        CALL US NOW

        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 transition-all duration-300 group-hover:border-red-500 group-hover:bg-red-600">
          <ArrowUpRight
            size={22}
            className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </span>
      </a>
    </div>
  </section>
</main>


);
}
