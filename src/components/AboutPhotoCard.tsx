"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPhotoCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;
    
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);
    
    // Max tilt 8-10 degrees
    setTilt({ x: x * 10, y: -(y * 10) });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isTouchDevice) {
      setTilt({ x: 0, y: 0 });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative flex justify-center items-center w-full max-w-md mx-auto h-full"
    >
      {/* Soft ambient glow behind the card */}
      <div 
        className={`absolute inset-10 bg-gradient-to-tr from-[#7c8cff] to-[#38bdf8] rounded-full blur-[80px] transition-all duration-700 ease-out z-0 ${
          isHovered ? 'opacity-50 scale-110' : 'opacity-30'
        }`}
      />

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        className="relative z-10 w-full aspect-[4/5] sm:aspect-square rounded-[24px] transition-transform duration-300 ease-out"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transformStyle: "preserve-3d"
        }}
      >
        {/* Animated Gradient Border Wrap */}
        <div className="absolute inset-0 rounded-[24px] overflow-hidden border border-white/5">
          <div 
            className={`absolute inset-[-50%] w-[200%] h-[200%] origin-center transition-all duration-300 ${
              isHovered ? 'animate-[spin_2s_linear_infinite]' : 'animate-[spin_6s_linear_infinite]'
            }`} 
            style={{ 
              background: 'conic-gradient(from 0deg, transparent 0%, transparent 25%, #7c8cff 40%, #38bdf8 60%, transparent 75%, transparent 100%)' 
            }}
          />
        </div>

        {/* Glassmorphism Frame Inner Content */}
        <div 
          className="absolute inset-[1px] rounded-[23px] overflow-hidden bg-[#0a0a0a]/70 backdrop-blur-xl flex flex-col p-2"
          style={{ transform: "translateZ(30px)" }} // Inner content pops out slightly during parallax
        >
          <div className="relative w-full h-full rounded-[16px] overflow-hidden bg-[#121212] shadow-2xl border border-white/5">
            <Image 
              src="/assets/DP.png" 
              alt="Ramuthu Theniya"
              fill
              className="object-cover object-top transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 500px"
              priority
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
