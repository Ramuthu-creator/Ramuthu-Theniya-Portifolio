"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useGSAP(
    () => {
      // Don't re-animate if it already has
      if (hasAnimated) return;

      const animateHero = () => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        
        if (prefersReducedMotion) {
          gsap.set(".hero-element", { opacity: 1, y: 0 });
          return;
        }

        gsap.to(".hero-element", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        });
        
        setHasAnimated(true);
      };

      // Listen for the custom event from the Loading Screen
      const handleLoadingComplete = () => {
        animateHero();
      };

      window.addEventListener("loadingComplete", handleLoadingComplete);

      // Fallback in case loading screen is skipped or already done
      const timeout = setTimeout(() => {
        if (!hasAnimated) {
          animateHero();
        }
      }, 3000); // Max wait time for loading screen

      return () => {
        window.removeEventListener("loadingComplete", handleLoadingComplete);
        clearTimeout(timeout);
      };
    },
    { scope: containerRef }
  );

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 pb-12 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative z-10">
      <div ref={containerRef} className="relative w-full">
        <p className="hero-element opacity-0 translate-y-10 text-brand-400 font-mono mb-4 md:mb-6 tracking-[0.2em] uppercase text-sm font-semibold flex items-center gap-3">
          <span className="w-12 h-[2px] bg-brand-400 inline-block"></span>
          Hi, my name is
        </p>
        
        <h1 className="hero-element opacity-0 translate-y-10 text-5xl md:text-7xl lg:text-8xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-slate-100 via-slate-300 to-slate-500 mb-2 md:mb-4 tracking-tight pb-2">
          Ramuthu Theniya.
        </h1>

        <h2 className="hero-element opacity-0 translate-y-10 text-4xl md:text-6xl lg:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400 mb-8 md:mb-10 tracking-tight pb-2">
          I build digital experiences.
        </h2>

        <p className="hero-element opacity-0 translate-y-10 text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed font-light">
          Building digital experiences that combine{" "}
          <span className="text-slate-200 font-medium">beautiful design</span> with{" "}
          <span className="text-slate-200 font-medium">robust engineering</span>. Let's create something extraordinary together.
        </p>

        <div className="hero-element opacity-0 translate-y-10 flex flex-wrap gap-6 items-center">
          <a
            href="#projects"
            className="group relative px-8 py-4 bg-brand-500 text-white font-semibold rounded-full transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-brand-400 to-brand-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center gap-2">
              Check out my work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          <a
            href="https://github.com/Ramuthu-creator"
            target="_blank"
            rel="noreferrer"
            className="group px-8 py-4 bg-white/5 border border-white/10 hover:border-brand-400/50 hover:bg-white/10 text-slate-300 font-medium rounded-full transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
          >
            <FaGithub className="w-5 h-5 group-hover:text-brand-400 transition-colors" />
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
