"use client";

import React, { useEffect, useState, useRef } from "react";

export const CustomCursor: React.FC = () => {
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "active">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch devices or small screens
    const checkTouch = () => {
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0 || window.innerWidth < 1024;
      setIsTouchDevice(hasTouch);
    };

    checkTouch();
    window.addEventListener("resize", checkTouch);

    if (isTouchDevice) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Detect contextual data-cursor
      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest("[data-cursor]") as HTMLElement | null;

      if (cursorTarget) {
        const text = cursorTarget.getAttribute("data-cursor") || "";
        setCursorText(text);
        setCursorVariant("hover");
      } else if (target?.closest("button, a, input, select, textarea")) {
        setCursorText("");
        setCursorVariant("hover");
      } else {
        setCursorText("");
        setCursorVariant("default");
      }
    };

    const onMouseDown = () => setCursorVariant("active");
    const onMouseUp = () => setCursorVariant("default");

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Smooth lerp loop for the trailing ring
    const render = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", checkTouch);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isTouchDevice, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Central pointer dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-emerald-600 rounded-full pointer-events-none z-[9999] transition-opacity duration-200"
        style={{ willChange: "transform" }}
      />

      {/* Trailing contextual ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center rounded-full transition-all duration-300 ${
          cursorVariant === "hover"
            ? cursorText
              ? "w-20 h-20 -ml-10 -mt-10 bg-emerald-900/90 text-white text-[11px] font-bold tracking-widest backdrop-blur-sm border border-emerald-400/40 shadow-xl"
              : "w-10 h-10 -ml-5 -mt-5 bg-emerald-500/20 border border-emerald-600/60 scale-125"
            : cursorVariant === "active"
            ? "w-8 h-8 -ml-4 -mt-4 bg-emerald-600/30 border border-emerald-700"
            : "w-7 h-7 -ml-3.5 -mt-3.5 border border-emerald-600/50 bg-white/30 backdrop-blur-[1px]"
        }`}
        style={{ willChange: "transform" }}
      >
        {cursorText && (
          <span className="uppercase text-center leading-none tracking-wider font-mono">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
};
