"use client";

import React, { useEffect, useState } from "react";

export const Preloader: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [fillPercent, setFillPercent] = useState<number>(0);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  useEffect(() => {
    // Check if user already saw intro in current session
    const seen = sessionStorage.getItem("mundilacteos_milk_bottle_seen");
    if (seen) {
      setIsDone(true);
      if (onComplete) onComplete();
      return;
    }

    // Smooth filling progress loop
    const duration = 2000; // 2 seconds
    const intervalTime = 25;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setFillPercent((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
              setIsDone(true);
              sessionStorage.setItem("mundilacteos_milk_bottle_seen", "true");
              if (onComplete) onComplete();
            }, 600);
          }, 350);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (isDone) return null;

  // Wave motion calculation based on fillPercent
  const liquidHeight = Math.min(100, Math.max(0, fillPercent));

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#FAF9F5] transition-all duration-700 ease-out select-none ${
        isFadingOut ? "opacity-0 scale-105 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background subtle radial dairy glow */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-emerald-100/30 blur-3xl pointer-events-none" />

      <div className="relative flex flex-col items-center z-10">
        {/* Minimalist Glass Milk Bottle Container */}
        <div className="relative w-28 h-56 sm:w-32 sm:h-64 flex items-center justify-center">
          {/* Falling milk droplets from top */}
          {fillPercent < 96 && (
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-2 h-4 bg-white border border-emerald-200/60 rounded-full animate-bounce shadow-xs" />
          )}

          <svg
            className="w-full h-full drop-shadow-xl"
            viewBox="0 0 100 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Bottle Clip Path for liquid fill */}
              <clipPath id="bottle-inner-shape">
                {/* Silhouette: Rim, Neck, Shoulders, Body, Rounded Bottom */}
                <path d="M36 12 C36 10, 38 8, 41 8 L59 8 C62 8, 64 10, 64 12 L64 16 C64 18, 62 20, 60 20 L58 20 L58 45 C58 58, 76 68, 78 85 L78 180 C78 190, 72 194, 50 194 C28 194, 22 190, 22 180 L22 85 C24 68, 42 58, 42 45 L42 20 L40 20 C38 20, 36 18, 36 16 Z" />
              </clipPath>

              {/* Milk Liquid Gradient */}
              <linearGradient id="milk-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#F9FAF7" />
                <stop offset="100%" stopColor="#EFF6F0" />
              </linearGradient>

              {/* Milk Foam/Cream Top Line Gradient */}
              <linearGradient id="cream-line" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E2F0E5" />
                <stop offset="50%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#E2F0E5" />
              </linearGradient>
            </defs>

            {/* Glass Bottle Body Background / Translucent */}
            <path
              d="M36 12 C36 10, 38 8, 41 8 L59 8 C62 8, 64 10, 64 12 L64 16 C64 18, 62 20, 60 20 L58 20 L58 45 C58 58, 76 68, 78 85 L78 180 C78 190, 72 194, 50 194 C28 194, 22 190, 22 180 L22 85 C24 68, 42 58, 42 45 L42 20 L40 20 C38 20, 36 18, 36 16 Z"
              fill="rgba(255, 255, 255, 0.45)"
              stroke="rgba(16, 185, 129, 0.3)"
              strokeWidth="2.5"
            />

            {/* Rising Milk Liquid with dynamic wave top */}
            <g clipPath="url(#bottle-inner-shape)">
              {/* Milk Fill Body */}
              <rect
                x="15"
                y={194 - (186 * liquidHeight) / 100}
                width="70"
                height={(186 * liquidHeight) / 100 + 10}
                fill="url(#milk-gradient)"
              />

              {/* Cream Surface / Wavy Ripple Line */}
              {liquidHeight > 1 && (
                <ellipse
                  cx="50"
                  cy={194 - (186 * liquidHeight) / 100}
                  rx="30"
                  ry="3.5"
                  fill="url(#cream-line)"
                />
              )}
            </g>

            {/* Glass Bottle Specular Reflection Highlights (Front Glass) */}
            <path
              d="M27 90 L27 175"
              stroke="rgba(255, 255, 255, 0.85)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M31 95 L31 150"
              stroke="rgba(255, 255, 255, 0.5)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Neck reflection */}
            <path
              d="M45 24 L45 42"
              stroke="rgba(255, 255, 255, 0.7)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Measurement Marks on Glass (Vintage Milk Bottle Detail) */}
            <line x1="68" y1="110" x2="74" y2="110" stroke="rgba(4, 120, 87, 0.35)" strokeWidth="1.5" />
            <line x1="70" y1="130" x2="74" y2="130" stroke="rgba(4, 120, 87, 0.35)" strokeWidth="1.5" />
            <line x1="68" y1="150" x2="74" y2="150" stroke="rgba(4, 120, 87, 0.35)" strokeWidth="1.5" />
            <line x1="70" y1="170" x2="74" y2="170" stroke="rgba(4, 120, 87, 0.35)" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Progress Percentage Badge */}
        <div className="mt-4 flex flex-col items-center">
          <span className="font-mono text-xs font-black text-emerald-800 tracking-wider">
            {Math.round(fillPercent)}%
          </span>
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-emerald-950/70 mt-1">
            Envasando Pureza Láctea
          </span>
        </div>

        {/* Brand Reveal Name */}
        <div className="mt-6 flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-black text-emerald-950 tracking-tight leading-none">
            MUNDI<span className="text-emerald-600 font-light">LÁCTEOS</span>
          </h2>
          <p className="text-[10px] tracking-widest text-emerald-800/80 font-bold uppercase mt-1">
            Canal Institucional • Distribuidores & Supermercados
          </p>
        </div>
      </div>
    </div>
  );
};
