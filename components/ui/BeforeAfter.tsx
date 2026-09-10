"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function BeforeAfter({
  before,
  after,
  car,
}: {
  before: string;
  after: string;
  car: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    const percentage =
      ((clientX - rect.left) / rect.width) * 100;

    const next = Math.min(100, Math.max(0, percentage));

    setPosition(next);
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!dragging) return;

    updatePosition(event.clientX);
  };

  const handleTouchMove = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    updatePosition(event.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      className="relative h-[320px] w-full overflow-hidden rounded-[22px] bg-neutral-900 sm:h-[390px] lg:h-[300px]"
      onMouseMove={handleMouseMove}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => setDragging(false)}
    >
      {/* AFTER */}
      <Image
        src={after}
        alt={`${car} after detailing`}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="pointer-events-none select-none object-cover object-center"
        draggable={false}
      />

      {/* AFTER LABEL */}
      <div className="absolute right-5 top-5 z-20">
        <span className="rounded-full bg-white/90 px-4 py-2 text-[9px] font-bold tracking-[0.2em] text-black backdrop-blur-md">
          AFTER
        </span>
      </div>

      {/* BEFORE */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          clipPath: `inset(0 ${100 - position}% 0 0)`,
        }}
      >
        <Image
          src={before}
          alt={`${car} before detailing`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="select-none object-cover object-center"
          draggable={false}
        />
      </div>

      {/* BEFORE LABEL */}
      <div className="absolute left-5 top-5 z-20">
        <span className="rounded-full bg-black/80 px-4 py-2 text-[9px] font-bold tracking-[0.2em] text-white backdrop-blur-md">
          BEFORE
        </span>
      </div>

      {/* DARK GRADIENT */}
      <div className="pointer-events-none absolute inset-0 z-[15] bg-gradient-to-t from-black/50 via-transparent to-black/10" />

      {/* DIVIDER */}
      <div
        className="pointer-events-none absolute top-0 z-30 h-full w-px bg-white/80"
        style={{
          left: `${position}%`,
        }}
      />

      {/* HANDLE */}
      <button
        type="button"
        aria-label={`Compare before and after ${car}`}
        onMouseDown={() => setDragging(true)}
        onTouchStart={() => setDragging(true)}
        className="absolute top-1/2 z-40 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-white/30 bg-white shadow-2xl transition-transform duration-200 hover:scale-110"
        style={{
          left: `${position}%`,
        }}
      >
        <div className="flex items-center gap-1 text-black">
          <span className="text-[18px]">‹</span>
          <span className="h-4 w-px bg-black/30" />
          <span className="text-[18px]">›</span>
        </div>
      </button>

      {/* BOTTOM CAR NAME */}
      <div className="absolute bottom-5 left-5 z-30">
        <p className="text-[10px] font-medium tracking-[0.25em] text-white/60">
          VEHICLE
        </p>

        <p className="mt-1 text-sm font-bold tracking-[0.12em] text-white">
          {car}
        </p>
      </div>
    </div>
  );
}