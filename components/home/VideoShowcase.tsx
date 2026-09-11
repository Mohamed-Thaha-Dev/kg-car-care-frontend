"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import YouTubeVideo from "../ui/YoutubeVideo";

gsap.registerPlugin(ScrollTrigger);

export default function VideoShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // =========================
      // HEADING ANIMATION
      // =========================

      const headingTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          
          toggleActions: "play none none none",
        },
      });

      headingTl
        .from(".video-eyebrow", {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: "power3.out",
        })
        .from(
          ".video-title",
          {
            opacity: 0,
            y: 60,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.35"
        )
        .from(
          ".video-description",
          {
            opacity: 0,
            y: 25,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.55"
        );

      // =========================
      // VIDEO CARDS ANIMATION
      // =========================

      gsap.from(".video-card", {
        opacity: 0,
        y: 100,
        scale: 0.94,
        duration: 1,
        stagger: 0.18,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".video-grid",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // =========================
      // VIDEO IMAGE / FRAME REVEAL
      // =========================

      gsap.from(".video-frame", {
        clipPath: "inset(0 0 100% 0)",
        duration: 1.2,
        stagger: 0.18,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: ".video-grid",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className=" px-5 py-20 text-white md:px-10 lg:px-20"
    >
      <div className="mx-auto max-w-[1400px]">

        {/* =========================
            HEADING
        ========================= */}

        <div className="mb-12 text-center">

          <div className="video-eyebrow mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-primary" />

            <span className="text-[10px] font-semibold tracking-[0.3em] text-foreground">
              KG CAR CARE
            </span>

            <span className="h-px w-8 bg-primary" />
          </div>

          <h2 className="video-title font-heading text-5xl md:7xl font-bold uppercase lg:text-8xl">
            OUR{" "}
            <span className="text-primary">
              WORK
            </span>
          </h2>

          <p className="video-description mx-auto mt-5 max-w-xl text-sm leading-7 text-foreground/50 md:text-base">
            Watch our detailing process and see the difference
            precision makes.
          </p>

        </div>

        {/* =========================
            VIDEOS
        ========================= */}

        <div className="video-grid grid gap-10 lg:grid-cols-3 md:grid-cols-2">

          {/* VIDEO 01 */}

          <div className="video-card group">

            <div className="video-frame relative aspect-video overflow-hidden rounded-2xl bg-black">

              {/* <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/7FNLhsn8X8o?si=xdBUJqQHInaKo4Jw"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              /> */}
              <YouTubeVideo id="7FNLhsn8X8o"/>

            </div>

          </div>


          {/* VIDEO 02 */}

          <div className="video-card group">

            <div className="video-frame relative aspect-video overflow-hidden rounded-2xl bg-black">

              {/* <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/cpXFKRMY9TQ?si=jUARd8aq_6lWbiqc"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              /> */}
              <YouTubeVideo id="cpXFKRMY9TQ"/>

            </div>

          </div>


          {/* VIDEO 03 */}

          <div className="video-card group">

            <div className="video-frame relative aspect-video overflow-hidden rounded-2xl bg-black">

              {/* <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/MqvILduy4co?si=do5KHdhSDYa7ruhN"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              /> */}
              <YouTubeVideo id="MqvILduy4co"/>

            </div>


          </div>


          {/* VIDEO 04 */}

    
        </div>

      </div>
    </section>
  );
}