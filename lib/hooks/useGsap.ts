"use client"
import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
export function useGsapSetup() {
  if (typeof window !== "undefined" && !registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Runs a GSAP setup callback inside a gsap.context() scoped to `scope`,
 * with automatic cleanup (revert) on unmount.
 */
export function useGsapContext(
  setup: (ctx: { self: gsap.Context; reduced: boolean }) => void,
  deps: unknown[] = [],
): RefObject<HTMLDivElement | null> {
  const scope = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const reduced = prefersReducedMotion();
    const ctx = gsap.context((self) => setup({ self, reduced }), scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scope;
}

/** Reveals `[data-reveal]` children on scroll inside the returned scope. */
export function useRevealOnScroll(selector = "[data-reveal]") {
  return useGsapContext(({ reduced }) => {
    const items = gsap.utils.toArray<HTMLElement>(selector);
    if (!items.length) return;
    if (reduced) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }
    items.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        },
      );
    });
  }, [selector]);
}
