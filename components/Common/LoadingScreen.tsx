"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({
  onComplete,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }

        const increment = Math.floor(Math.random() * 4) + 1;
        return Math.min(prev + increment, 100);
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress !== 100) return;

    const tl = gsap.timeline();

    tl.to(".loader-logo", {
      scale: 1.15,
      duration: 0.5,
      ease: "power3.out",
    })
      .to(".loader-logo", {
        scale: 0.9,
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut",
      })
      .to(
        ".loader-content",
        {
          y: -30,
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        },
        "-=0.3"
      )
   .to(".loading-screen", {
  yPercent: -100,
  duration: 1.2,
  ease: "power4.inOut",
  onComplete: () => {
    window.dispatchEvent(new Event("loaderComplete"));
    setFinished(true);
  },
});

    return () => {
      tl.kill();
    };
  }, [progress, onComplete]);

  if (finished) return null;

  return (
    <div className="loading-screen fixed inset-0 z-[99999] flex items-center justify-center bg-background text-white">
      <div className="loader-content flex w-full max-w-xl flex-col items-center px-10">

        <div className="loader-logo mb-8 text-center">
       <Image src="/logo/logo.webp" alt="KG Car Care Logo"  width={200} height={200}  className="w-[200px]"/>
        </div>

        <div className="mb-3 flex w-full items-center justify-between text-xs tracking-widest text-white/50">
          <span>LOADING</span>
          <span>{progress}%</span>
        </div>

        <div className="h-[2px] w-full  overflow-hidden bg-white/10">
          <div
            className="h-full origin-left bg-primary"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <p className="mt-5 text-[10px] tracking-[0.35em] text-white/30">
          PREMIUM CAR CARE
        </p>
      </div>
    </div>
  );
}