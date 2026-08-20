"use client";

import { useState, useEffect } from "react";

export default function Starfield() {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    // Generate random stars on client side to avoid hydration mismatch
    const generatedStars = Array.from({ length: 75 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      size: Math.random() * 2 + 1, // 1px to 3px
      delay: Math.random() * 5, // 0 to 5s delay
      duration: Math.random() * 3 + 2, // 2s to 5s duration
    }));
    
    // Use requestAnimationFrame to avoid synchronous setState inside effect lint warning
    requestAnimationFrame(() => setStars(generatedStars));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
