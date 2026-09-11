"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/lib/data/Services";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 107;

// Initial load
const INITIAL_PRELOAD = 8;

// Current frame சுற்றி preload
const PRELOAD_RADIUS = 4;

const getFrameSrc = (index: number) =>
  `/frames/img_${String(index + 1).padStart(5, "0")}.webp`;

const getActiveService = (currentFrame: number) => {
  let active = services[0];

  for (const service of services) {
    if (currentFrame >= service.frame) {
      active = service;
    }
  }

  return active;
};

export default function Service() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    Array(FRAME_COUNT).fill(null),
  );

  const loadedRef = useRef<boolean[]>(Array(FRAME_COUNT).fill(false));

  const loadingRef = useRef<boolean[]>(Array(FRAME_COUNT).fill(false));

  const currentFrameRef = useRef(0);

  const [activeService, setActiveService] = useState(services[0]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;

    if (!section || !canvas) return;

    let resizeObserver: ResizeObserver;
    let onWindowResize: () => void;
    let refreshTimers: ReturnType<typeof setTimeout>[] = [];

    const gsapContext = gsap.context(() => {
      const ctx = canvas.getContext("2d");

      if (!ctx) return;
      let isMounted = true;

      // ==========================================
      // CANVAS SIZE
      // ==========================================

      const resizeCanvas = () => {
        const rect = canvas.getBoundingClientRect();

        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        renderFrame(currentFrameRef.current);
      };

      // ==========================================
      // DRAW FRAME
      // ==========================================

      const renderFrame = (index: number) => {
        const img = imagesRef.current[index];

        if (!img || !loadedRef.current[index]) return;

        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        if (!width || !height) return;

        ctx.clearRect(0, 0, width, height);

        const imageRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = width / height;

        let drawWidth;
        let drawHeight;
        let offsetX;
        let offsetY;

        if (imageRatio > canvasRatio) {
          drawHeight = height;
          drawWidth = height * imageRatio;

          offsetX = (width - drawWidth) / 2;
          offsetY = 0;
        } else {
          drawWidth = width;
          drawHeight = width / imageRatio;

          offsetX = 0;
          offsetY = (height - drawHeight) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      };

      // ==========================================
      // LOAD SINGLE FRAME
      // ==========================================

      const loadFrame = (index: number) => {
        if (index < 0 || index >= FRAME_COUNT) return;

        // Already loaded
        if (loadedRef.current[index]) return;

        // Already loading
        if (loadingRef.current[index]) return;

        loadingRef.current[index] = true;

        const img = new Image();

        img.decoding = "async";

        img.onload = () => {
          if (!isMounted) return;
          imagesRef.current[index] = img;
          loadedRef.current[index] = true;
          loadingRef.current[index] = false;

          // If this is the current frame, draw it
          if (currentFrameRef.current === index) {
            renderFrame(index);
          }
        };

        img.onerror = () => {
          loadingRef.current[index] = false;
        };

        img.src = getFrameSrc(index);
      };

      // ==========================================
      // PRELOAD AROUND CURRENT FRAME
      // ==========================================

      const preloadAround = (current: number) => {
        // Current frame first
        loadFrame(current);

        // Nearby frames
        for (let i = 1; i <= PRELOAD_RADIUS; i++) {
          loadFrame(current + i);
          loadFrame(current - i);
        }
      };

      // ==========================================
      // INITIAL LOAD
      // ==========================================

      for (let i = 0; i < INITIAL_PRELOAD; i++) {
        loadFrame(i);
      }

      // ==========================================
      // GSAP
      // ==========================================

      const frameObject = {
        frame: 0,
      };

      const animation = gsap.to(frameObject, {
        frame: FRAME_COUNT - 1,

        ease: "none",

        snap: {
          frame: 1,
        },

        onUpdate: () => {
          if (!isMounted) return;
          const currentFrame = Math.round(frameObject.frame);
          console.log("onUpdate fired, frame:", currentFrame); // 👈 temp debug

          currentFrameRef.current = currentFrame;

          // Load current + nearby frames
          preloadAround(currentFrame);

          // Draw current frame if available
          renderFrame(currentFrame);

          // Update service
          const service = getActiveService(currentFrame);

          setActiveService((previous) => {
            if (previous.frame === service.frame) {
              return previous;
            }

            return service;
          });
        },

        scrollTrigger: {
          trigger: section,

          start: "top top",

          end: "+=6000",

          scrub: 0.3,

          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      const scrollTrigger = animation.scrollTrigger;

      // ==========================================
      // RESIZE
      // ==========================================

      resizeCanvas();

      resizeObserver = new ResizeObserver(() => {
        resizeCanvas();
        ScrollTrigger.refresh();
      });
      resizeObserver.observe(canvas);

      // 👇 Full page layout resize ku um listen pannunga, canvas mattum illa
      onWindowResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onWindowResize);

      window.scrollTo(0, 0);

      // 👇 Late layout shifts (images below/above section load aagும்bodhu)
      // catch panna multiple staggered refresh
      const refreshTimers = [100, 400, 1000, 2000].map((delay) =>
        setTimeout(() => ScrollTrigger.refresh(), delay),
      );
    }, section);

    // ==========================================
    // CLEANUP
    // ==========================================
    return () => {
      gsapContext.revert();
      resizeObserver.disconnect();
      window.removeEventListener("resize", onWindowResize);
      refreshTimers.forEach(clearTimeout);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Canvas */}

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Dark overlay */}

      <div className="absolute inset-0 bg-black/15" />

      {/* Left gradient */}

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent"/>

      {/* Content */}

      <div className="relative z-10 flex h-full items-center">
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-xl text-white">
            {/* Number */}

            <div className="mb-6 flex items-center gap-4">
              <span className="text-sm tracking-[0.3em] text-white/50">
                {activeService.number}
              </span>

              <div className="h-px w-16 bg-white/30" />

              <span className="text-xs uppercase tracking-[0.3em] text-white/50">
                Our Services
              </span>
            </div>

            {/* Title */}

            <h2
              key={activeService.number}
              className="font-heading text-5xl font-bold uppercase text-primary md:text-7xl lg:text-8xl"
            >
              {activeService.title}
            </h2>

            {/* Description */}

            <p
              key={`description-${activeService.number}`}
              className="mt-6 max-w-md text-base leading-7 text-white/70 md:text-lg"
            >
              {activeService.description}
            </p>

            {/* Progress */}

            <div className="mt-10 flex items-center gap-4">
              <span className="text-xs text-white/50">
                {activeService.number}
              </span>

              <div className="h-px w-32 bg-white/20">
                <div className="h-full w-1/2 bg-white" />
              </div>

              <span className="text-xs text-white/50">10</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
