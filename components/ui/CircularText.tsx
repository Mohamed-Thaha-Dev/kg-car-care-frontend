"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: "slowDown" | "speedUp" | "pause" | "goBonkers";
  className?: string;
  size?:number;
  fontSize?:number
}

const CircularText: React.FC<CircularTextProps> = ({
  text,
  spinDuration = 20,
  onHover = "speedUp",
  className = "",
  size,
  fontSize 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  const letters = Array.from(text);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    // Initial rotation
    rotationRef.current = 0;

   

    /*
      Simpler continuous GSAP rotation
    */
    animationRef.current = gsap.to(container, {
      rotation: 360,
      duration: spinDuration,
      ease: "none",
      repeat: -1,
    });

    return () => {
      animationRef.current?.kill();
    };
  }, [spinDuration]);

  const handleMouseEnter = () => {
    if (!animationRef.current || !containerRef.current) return;

    switch (onHover) {
      case "slowDown":
        animationRef.current.timeScale(0.5);
        break;

      case "speedUp":
        animationRef.current.timeScale(4);
        break;

      case "pause":
        animationRef.current.pause();
        break;

      case "goBonkers":
        animationRef.current.timeScale(20);

        gsap.to(containerRef.current, {
          scale: 0.8,
          duration: 0.3,
          ease: "power2.out",
        });
        break;

      default:
        animationRef.current.timeScale(1);
    }
  };

  const handleMouseLeave = () => {
    if (!animationRef.current || !containerRef.current) return;

    animationRef.current.timeScale(1);

    if (onHover === "pause") {
      animationRef.current.resume();
    }

    if (onHover === "goBonkers") {
      gsap.to(containerRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        relative
        mx-auto
        flex
        h-full
       w-full
        cursor-pointer
        items-center
        justify-center
        rounded-full
        text-center
        font-black
        text-white
        origin-center
        ${className}
      `}
    >
      {letters.map((letter, index) => {
        const rotationDeg = (360 / letters.length) * index;

        return (
          <span
            key={`${letter}-${index}`}
            className={`
              absolute
              inset-0
              flex
              items-center
              justify-center
              font-black    
              lg:text-sm
              text-[12px]

            `}
            style={{
                
    transform: `rotate(${rotationDeg}deg) translateY(-${size}px)`,
             
            }}
          >
            {letter}
          </span>
        );
      })}
    </div>
  );
};

export default CircularText;