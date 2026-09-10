"use client"

import { useEffect, useRef } from "react";
import ReviewCard, { Review } from "./ReviewCard";
import gsap from "gsap"

export default function ReviewMarquee({
  reviews,
  reverse = false,
}: {
  reviews: Review[];
  reverse?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    const firstGroup = track.querySelector(
      "[data-review-group]"
    ) as HTMLElement | null;

    if (!firstGroup) return;

    const ctx = gsap.context(() => {
      const distance = firstGroup.offsetWidth;

      gsap.set(track, {
        x: reverse ? -distance : 0,
      });

      animationRef.current = gsap.to(track, {
        x: reverse ? 0 : -distance,
        duration: reverse ? 32 : 30,
        ease: "none",
        repeat: -1,
      });
    }, track);

    return () => {
      animationRef.current?.kill();
      ctx.revert();
    };
  }, [reverse, reviews]);

  const repeatedReviews = [...reviews, ...reviews];

  return (
    <div
      className="w-full py-2 overflow-hidden"
      onMouseEnter={() => {
        animationRef.current?.pause();
      }}
      onMouseLeave={() => {
        animationRef.current?.resume();
      }}
    >
      <div
        ref={trackRef}
        className="flex w-max gap-5"
      >
        {/* Group 1 */}
        <div
          data-review-group
          className="flex shrink-0 gap-5"
        >
          {repeatedReviews.map((review, index) => (
            <ReviewCard
              key={`first-${review.id}-${index}`}
              review={review}
            />
          ))}
        </div>

        {/* Group 2 */}
        <div
          className="flex shrink-0 gap-5"
        >
          {repeatedReviews.map((review, index) => (
            <ReviewCard
              key={`second-${review.id}-${index}`}
              review={review}
            />
          ))}
        </div>
      </div>
    </div>
  );
}