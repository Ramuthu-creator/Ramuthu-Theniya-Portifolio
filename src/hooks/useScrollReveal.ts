"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger exactly once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(useGSAP);
}

/**
 * A reusable hook for fading and sliding up an element when it scrolls into view.
 * Usage:
 * const containerRef = useScrollReveal();
 * <div ref={containerRef} className="opacity-0 translate-y-10">...</div>
 */
export function useScrollReveal(options?: {
  yOffset?: number;
  duration?: number;
  delay?: number;
  triggerStart?: string;
  markers?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const {
    yOffset = 40,
    duration = 0.8,
    delay = 0,
    triggerStart = "top 85%",
    markers = false,
  } = options || {};

  useGSAP(
    () => {
      if (!ref.current) return;

      // Respect prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set(ref.current, { opacity: 1, y: 0 });
        return;
      }

      // Initial state is set in CSS usually, but we can enforce it here
      gsap.set(ref.current, { opacity: 0, y: yOffset });

      gsap.to(ref.current, {
        scrollTrigger: {
          trigger: ref.current,
          start: triggerStart,
          toggleActions: "play none none reverse", // animates on enter, reverses on leave back
          markers,
        },
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: "power3.out",
      });
    },
    { scope: ref }
  );

  return ref;
}

/**
 * A reusable hook for staggered reveals of children elements.
 * Usage:
 * const containerRef = useStaggerReveal(".card");
 * <div ref={containerRef}>
 *   <div className="card opacity-0 translate-y-10">1</div>
 *   <div className="card opacity-0 translate-y-10">2</div>
 * </div>
 */
export function useStaggerReveal(
  childSelector: string,
  options?: {
    yOffset?: number;
    duration?: number;
    stagger?: number;
    triggerStart?: string;
  }
) {
  const ref = useRef<HTMLDivElement>(null);
  const {
    yOffset = 40,
    duration = 0.8,
    stagger = 0.15,
    triggerStart = "top 80%",
  } = options || {};

  useGSAP(
    () => {
      if (!ref.current) return;

      const children = gsap.utils.toArray(childSelector, ref.current);
      if (!children.length) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set(children, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(children, { opacity: 0, y: yOffset });

      gsap.to(children, {
        scrollTrigger: {
          trigger: ref.current,
          start: triggerStart,
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: "power3.out",
      });
    },
    { scope: ref }
  );

  return ref;
}
