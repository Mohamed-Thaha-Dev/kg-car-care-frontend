"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
        // Mobile / Tablet → Native browser scroll
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (isMobile) {
      return;
    }
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      syncTouch: true,
      autoRaf: false,
    });

     // Lenis → ScrollTrigger
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });


    // GSAP → Lenis
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);

    // Prevent GSAP ticker lag
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
