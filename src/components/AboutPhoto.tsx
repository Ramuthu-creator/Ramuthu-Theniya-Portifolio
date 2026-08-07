"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AboutPhoto() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const yParallax = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div ref={containerRef} className="relative flex justify-center w-full max-w-md mx-auto min-h-[400px]">
      
      {/* Ambient Glow */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.4, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-4 bg-gradient-to-tr from-[#7c8cff] to-[#38bdf8] rounded-full blur-[80px] z-0"
      />

      {/* Parallax Container */}
      <motion.div 
        style={{ y: yParallax }}
        className="relative z-10 w-full h-full aspect-[4/5] sm:aspect-square flex justify-center items-center"
      >
        {/* Floating Animation Wrapper */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="relative w-full h-full"
        >
          {/* Scroll Reveal Animation */}
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(20% at 50% 50%)", scale: 0.95 }}
            whileInView={{ opacity: 1, clipPath: "circle(150% at 50% 50%)", scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full relative"
          >
            {/* The Photo with Edge Masking */}
            <div 
              className="w-full h-full relative"
              style={{
                WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)",
                maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)"
              }}
            >
              <Image 
                src="/assets/Profile Photo-Photoroom.png" 
                alt="My Photo"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 500px"
                priority
              />
            </div>
          </motion.div>

          {/* Decorative Elements */}
          
          {/* Top Right Code Glyph */}
          <motion.div 
            initial={{ opacity: 0, rotate: -45, x: -20, y: 20 }}
            whileInView={{ opacity: 0.8, rotate: 15, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute -top-4 -right-2 text-[#7c8cff] font-mono text-xl md:text-2xl font-bold drop-shadow-[0_0_12px_rgba(124,140,255,0.6)] z-20 pointer-events-none"
          >
            {"</>"}
          </motion.div>

          {/* Bottom Left Circle Outline */}
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.7, duration: 0.8, type: "spring" }}
            className="absolute -bottom-8 -left-4 w-20 h-20 rounded-full border-2 border-brand-400/30 bg-transparent z-0 hidden md:block pointer-events-none"
          />

          {/* Dotted line accent */}
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            whileInView={{ opacity: 0.5, height: "120px" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute top-1/4 -right-8 w-[1px] border-l-[2px] border-dotted border-[#7c8cff]/50 hidden lg:block z-0 pointer-events-none"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
