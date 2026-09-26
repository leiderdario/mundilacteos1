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
      id="brand-preloader"
      style={{ colorScheme: "only light", forcedColorAdjust: "none" }}
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#FAF9F5] transition-all duration-700 ease-out select-none px-4 ${
        isFadingOut ? "opacity-0 scale-105 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background subtle radial dairy glow */}
      <div className="absolute w-[320px] sm:w-[450px] h-[320px] sm:h-[450px] rounded-full bg-emerald-100/40 blur-3xl pointer-events-none" />

      <div className="relative flex flex-col items-center z-10 max-w-xs sm:max-w-sm w-full">
        {/* Minimalist Glass Milk Bottle Container */}
        <div className="relative w-24 h-48 sm:w-32 sm:h-64 flex items-center justify-center">
          {/* Falling milk droplets from top */}
          {fillPercent < 96 && (
            <div className="absolute -top-5 sm:-top-6 left-1/2 -translate-x-1/2 w-2 h-3.5 sm:w-2.5 sm:h-4 bg-white border border-emerald-300 rounded-full animate-bounce shadow-sm" />
          )}

          <svg
            className="w-full h-full drop-shadow-xl"
            viewBox="0 0 100 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ colorScheme: "only light", forcedColorAdjust: "none" }}
          >
            <defs>
              {/* Bottle Clip Path for liquid fill */}
              <clipPath id="bottle-inner-shape">
                <path d="M36 12 C36 10, 38 8, 41 8 L59 8 C62 8, 64 10, 64 12 L64 16 C64 18, 62 20, 60 20 L58 20 L58 45 C58 58, 76 68, 78 85 L78 180 C78 190, 72 194, 50 194 C28 194, 22 190, 22 180 L22 85 C24 68, 42 58, 42 45 L42 20 L40 20 C38 20, 36 18, 36 16 Z" />
              </clipPath>

              {/* Milk Liquid Pure White Gradient with subtle creamy depth */}
              <linearGradient id="milk-pure-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="100%" stopColor="#F4FAF6" stopOpacity="1" />
              </linearGradient>

              {/* Milk Foam/Cream Top Line */}
              <linearGradient id="cream-surface-line" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E2F2E6" stopOpacity="1" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="100%" stopColor="#E2F2E6" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* Glass Bottle Body Background / Translucent */}
            <path
              className="preloader-bottle-glass transition-colors duration-300"
              d="M36 12 C36 10, 38 8, 41 8 L59 8 C62 8, 64 10, 64 12 L64 16 C64 18, 62 20, 60 20 L58 20 L58 45 C58 58, 76 68, 78 85 L78 180 C78 190, 72 194, 50 194 C28 194, 22 190, 22 180 L22 85 C24 68, 42 58, 42 45 L42 20 L40 20 C38 20, 36 18, 36 16 Z"
              fill="rgba(255, 255, 255, 0.55)"
              stroke="rgba(16, 185, 129, 0.45)"
              strokeWidth="2.5"
            />

            {/* Rising Milk Liquid: GUARANTEED 100% PURE WHITE MILK in Dark and Light mode */}
            <g clipPath="url(#bottle-inner-shape)">
              {/* Solid White Base to prevent color inversion */}
              <rect
                x="15"
                y={194 - (186 * liquidHeight) / 100}
                width="70"
                height={(186 * liquidHeight) / 100 + 10}
                fill="#FFFFFF"
                style={{ fill: "#FFFFFF", filter: "none" }}
              />

              {/* Creamy Milk Shading Layer */}
              <rect
                x="15"
                y={194 - (186 * liquidHeight) / 100}
                width="70"
                height={(186 * liquidHeight) / 100 + 10}
                fill="url(#milk-pure-gradient)"
                style={{ filter: "none" }}
              />

              {/* Cream Surface / Wavy Ripple Line */}
              {liquidHeight > 1 && (
                <ellipse
                  cx="50"
                  cy={194 - (186 * liquidHeight) / 100}
                  rx="30"
                  ry="3.5"
                  fill="url(#cream-surface-line)"
                  stroke="#E8F5EB"
                  strokeWidth="0.5"
                  style={{ filter: "none" }}
                />
              )}
            </g>

            {/* Glass Bottle Specular Reflection Highlights (Front Glass) */}
            <path
              d="M27 90 L27 175"
              stroke="rgba(255, 255, 255, 0.9)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M31 95 L31 150"
              stroke="rgba(255, 255, 255, 0.6)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path
              d="M45 24 L45 42"
              stroke="rgba(255, 255, 255, 0.75)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Measurement Marks on Glass */}
            <line x1="68" y1="110" x2="74" y2="110" stroke="rgba(4, 120, 87, 0.45)" strokeWidth="1.5" />
            <line x1="70" y1="130" x2="74" y2="130" stroke="rgba(4, 120, 87, 0.45)" strokeWidth="1.5" />
            <line x1="68" y1="150" x2="74" y2="150" stroke="rgba(4, 120, 87, 0.45)" strokeWidth="1.5" />
            <line x1="70" y1="170" x2="74" y2="170" stroke="rgba(4, 120, 87, 0.45)" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Progress Percentage Badge */}
        <div className="mt-3 sm:mt-4 flex flex-col items-center">
          <span className="preloader-percent font-mono text-xs sm:text-sm font-black text-emerald-800 tracking-wider">
            {Math.round(fillPercent)}%
          </span>
          <span className="preloader-text-sub text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.25em] text-emerald-950/70 mt-1 text-center">
            Envasando Pureza Láctea
          </span>
        </div>

        {/* Brand Reveal Name with Official Logo Mark */}
        <div className="mt-4 sm:mt-5 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 relative flex items-center justify-center">
              <img
                src="/images/logo-mundilacteos-icon.png"
                alt="Vaca MundiLácteos"
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="preloader-text-title text-xl sm:text-2xl font-black text-emerald-950 tracking-tight leading-none">
              MUNDI<span className="text-emerald-600 font-light">LÁCTEOS</span>
            </h2>
          </div>
          <p className="preloader-text-sub text-[9px] sm:text-[10px] tracking-widest text-emerald-800/80 font-bold uppercase">
            Canal Institucional • Distribuidores & Supermercados
          </p>
        </div>
      </div>
    </div>
  );
};
