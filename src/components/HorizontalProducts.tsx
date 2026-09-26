"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/config/site";
import { Product3DCanvas } from "./Product3DCanvas";
import { ArrowRight, ChevronLeft, ChevronRight, PackageCheck, Layers, Clock } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const HorizontalProducts: React.FC = () => {
  const { language, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    // Apply pin & horizontal scroll on screens >= 1024px
    const ctx = gsap.matchMedia();

    ctx.add("(min-width: 1024px)", () => {
      if (!sectionRef.current || !trackRef.current) return;

      const track = trackRef.current;
      const totalScroll = track.scrollWidth - window.innerWidth + 140;

      gsap.to(track, {
        x: () => -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 0.8,
          start: "top top",
          end: () => `+=${totalScroll * 1.05}`,
          invalidateOnRefresh: true
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const handleManualScroll = (direction: "left" | "right") => {
    if (!trackRef.current) return;
    const amount = direction === "left" ? -380 : 380;
    trackRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="productos"
      className="relative py-12 lg:py-8 lg:min-h-screen lg:max-h-screen lg:flex lg:flex-col lg:justify-between bg-[#F8FAF7] overflow-hidden border-t border-b border-emerald-100/60"
    >
      {/* Background radial soft light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* Header Container - Compact to leave full room for cards & CTA button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2">
              <PackageCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>Portafolio Oficial Mundilácteos</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t("productsTitle")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Interactúa con los empaques 3D y descubre las especificaciones de cada línea.
            </p>
          </div>

          {/* Nav Controls for Horizontal Scroll on smaller screens */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => handleManualScroll("left")}
              className="p-2 sm:p-2.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 shadow-xs transition-all cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => handleManualScroll("right")}
              className="p-2 sm:p-2.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 shadow-xs transition-all cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Cards Strip - Carefully proportioned so "Cotizar este producto" is 100% visible */}
      <div
        ref={trackRef}
        className="flex gap-5 lg:gap-6 px-4 sm:px-6 lg:px-10 overflow-x-auto lg:overflow-visible no-scrollbar pb-4 pt-1 w-full"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {siteConfig.products.map((product, idx) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-[290px] sm:w-[350px] md:w-[380px] bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-emerald-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            style={{ scrollSnapAlign: "start" }}
          >
            <div>
              {/* Product Badge & Index */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {product.badge}
                </span>
                <span className="text-[11px] font-mono font-bold text-slate-400">
                  0{idx + 1} / 0{siteConfig.products.length}
                </span>
              </div>

              {/* Real 3D Product Interactive Stage */}
              <div className="relative w-full h-44 sm:h-48 md:h-52 mb-4 flex items-center justify-center bg-gradient-to-b from-[#FAFBF9] to-white rounded-xl sm:rounded-2xl overflow-hidden border border-slate-100">
                <Product3DCanvas
                  image={product.image}
                  name={product.name}
                  category={product.category}
                />
              </div>

              {/* Title & Tagline */}
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-tight">
                {product.name}
              </h3>
              <p className="text-[11px] sm:text-xs font-medium text-emerald-800/90 mt-1 mb-2">
                {product.tagline}
              </p>

              {/* Description */}
              <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed mb-3 line-clamp-2">
                {product.description[language] || product.description.es}
              </p>

              {/* Specs Pills */}
              <div className="space-y-1.5 mb-4 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <div className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span className="font-semibold text-slate-700">Presentaciones:</span>
                  <span className="text-slate-600 truncate">{product.presentations.slice(0, 5).join(", ")}{product.presentations.length > 5 ? "..." : ""}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span className="font-semibold text-slate-700">Vida Útil:</span>
                  <span className="text-slate-600">{product.shelfLife}</span>
                </div>
              </div>
            </div>

            {/* Action CTA - Always visible and comfortably positioned */}
            <Link
              href={`/contacto?producto=${encodeURIComponent(product.name)}`}
              className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <span>{t("quoteProductBtn")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>

      {/* Bottom helper footnote on desktop */}
      <div className="hidden lg:flex items-center justify-center text-center py-2 text-[11px] text-slate-400 font-medium">
        <span>Gira y explora los empaques 3D • Desliza el scroll para continuar</span>
      </div>
    </section>
  );
};
