"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollPortraitVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Cached positions
  const boundsRef = useRef({ startScroll: 0, endScroll: 1, scrollRange: 1 });

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    
    // Avoid synchronous setState in effect to satisfy lint rules
    setTimeout(() => {
      setPrefersReducedMotion(motionQuery.matches);
      setIsMobile(mobileQuery.matches);
    }, 0);

    const updateMotion = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    const updateMobile = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    motionQuery.addEventListener("change", updateMotion);
    mobileQuery.addEventListener("change", updateMobile);

    return () => {
      motionQuery.removeEventListener("change", updateMotion);
      mobileQuery.removeEventListener("change", updateMobile);
    };
  }, []);

  const calculateBounds = () => {
    const heroSection = document.getElementById("home");
    const aboutSection = document.getElementById("about");
    if (!heroSection || !aboutSection) return;

    const startScroll = heroSection.offsetTop;
    const endScroll = aboutSection.offsetTop + aboutSection.offsetHeight - window.innerHeight;
    const scrollRange = Math.max(1, endScroll - startScroll);
    
    boundsRef.current = { startScroll, endScroll, scrollRange };
  };

  useEffect(() => {
    if (prefersReducedMotion || isMobile) {
      // Dispatch event to show fallback
      window.dispatchEvent(new CustomEvent("video-portrait-status", { detail: { active: false } }));
      return;
    }

    calculateBounds();
    window.addEventListener("resize", calculateBounds);
    window.addEventListener("orientationchange", calculateBounds);

    let rafId: number;
    let ticking = false;

    const handleScroll = () => {
      if (!videoRef.current || !containerRef.current) return;

      const currentScrollY = window.scrollY;
      const { startScroll, endScroll, scrollRange } = boundsRef.current;
      const scrolled = currentScrollY - startScroll;
      
      const progress = Math.max(0, Math.min(1, scrolled / scrollRange));
      
      if (Number.isFinite(videoRef.current.duration)) {
        const duration = videoRef.current.duration || 8;
        const targetTime = progress * duration;
        const frameDuration = 1 / 24;
        
        if (Math.abs(videoRef.current.currentTime - targetTime) >= frameDuration) {
          videoRef.current.currentTime = targetTime;
        }
      }

      let opacity = 1;
      if (progress >= 1 || currentScrollY > endScroll) {
        opacity = 0;
      } else if (progress > 0.95) {
        opacity = 1 - (progress - 0.95) / 0.05;
      }
      
      containerRef.current.style.opacity = opacity.toString();
      containerRef.current.style.visibility = opacity === 0 ? "hidden" : "visible";
    };

    const onScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", calculateBounds);
      window.removeEventListener("orientationchange", calculateBounds);
      cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion, isMobile, isVideoLoaded]);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
    calculateBounds();
  };

  const handleError = () => {
    // Handle error if needed
  };

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-[60] bg-[#0a0a0a]"
      style={{
        opacity: isVideoLoaded && !isMobile && !prefersReducedMotion ? 1 : 0,
        visibility: isVideoLoaded && !isMobile && !prefersReducedMotion ? "visible" : "hidden",
        pointerEvents: "none",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        contain: "layout paint",
        overflow: "hidden"
      }}
    >
      <video
        ref={videoRef}
        src="/videos/portrait-transition-scrub.mp4"
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={handleVideoLoad}
        onError={handleError}
        className="absolute inset-0 w-full h-full object-cover object-center"
        aria-hidden="true"
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]/20"></div>
    </div>
  );
}
