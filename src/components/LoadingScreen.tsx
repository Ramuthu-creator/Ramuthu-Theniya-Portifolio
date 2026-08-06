"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Animate the counter from 0 to 100
      const counter = { value: 0 };
      
      const tl = gsap.timeline({
        onComplete: () => {
          // 3. Fade out and slide up the whole overlay when done
          gsap.to(containerRef.current, {
            y: "-100%",
            opacity: 0,
            duration: 0.8,
            ease: "power3.inOut",
            delay: 0.2,
            onComplete: () => {
              setIsLoading(false);
              window.dispatchEvent(new Event("loadingComplete"));
            }
          });
        }
      });

      tl.to(counter, {
        value: 100,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
          setProgress(Math.round(counter.value));
        }
      }, 0);

      // 2. Animate the loading bar width
      tl.to(barRef.current, {
        width: "100%",
        duration: 1.5,
        ease: "power2.inOut",
      }, 0);

    },
    { scope: containerRef }
  );

  if (!isLoading) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a]"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <span 
            ref={textRef}
            className="text-6xl md:text-8xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400"
          >
            {progress}%
          </span>
        </div>
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            ref={barRef}
            className="h-full bg-gradient-to-r from-brand-400 to-brand-600 w-0"
          />
        </div>
      </div>
    </div>
  );
}
