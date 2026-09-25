"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/config/site";
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

    // Only apply pin & horizontal scroll on desktop screens >= 1024px
    const ctx = gsap.matchMedia();

    ctx.add("(min-width: 1024px)", () => {
      if (!sectionRef.current || !trackRef.current) return;

      const track = trackRef.current;
      const totalScroll = track.scrollWidth - window.innerWidth + 120;

      gsap.to(track, {
        x: () => -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalScroll * 1.2}`,
          invalidateOnRefresh: true
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const handleManualScroll = (direction: "left" | "right") => {
    if (!trackRef.current) return;
    const amount = direction === "left" ? -400 : 400;
    trackRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  const scrollToContactWithProduct = (productName: string) => {
    const contactSection = document.getElementById("contacto");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      const messageField = document.getElementById("form-message") as HTMLTextAreaElement | null;
      if (messageField) {
        messageField.value = `Hola, me interesa recibir cotización formal para el producto: ${productName}.`;
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="productos"
      className="relative py-20 lg:py-24 bg-[#F8FAF7] overflow-hidden border-t border-b border-emerald-100/60"
    >
      {/* Background radial soft light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              <PackageCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Portafolio Oficial Mundilácteos</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              {t("productsTitle")}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl">
              {t("productsSubtitle")}
            </p>
          </div>

          {/* Nav Controls for Horizontal Scroll on smaller screens */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => handleManualScroll("left")}
              className="p-3 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 shadow-xs transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleManualScroll("right")}
              className="p-3 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 shadow-xs transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Cards Strip */}
      <div
        ref={trackRef}
        className="flex gap-6 lg:gap-8 px-4 sm:px-6 lg:px-12 overflow-x-auto lg:overflow-visible no-scrollbar pb-6 pt-2"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {siteConfig.products.map((product, idx) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-[300px] sm:w-[380px] md:w-[420px] bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
            style={{ scrollSnapAlign: "start" }}
            data-cursor="PRODUCTO"
          >
            <div>
              {/* Product Badge & Index */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {product.badge}
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">
                  0{idx + 1} / 0{siteConfig.products.length}
                </span>
              </div>

              {/* Product Image Stage */}
              <div className="relative w-full h-56 sm:h-64 mb-6 flex items-center justify-center bg-gradient-to-b from-[#FAFBF9] to-white rounded-2xl p-4 overflow-hidden border border-slate-100">
                <div className="relative w-48 h-56 transition-transform duration-500 group-hover:scale-110">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 350px"
                    className="object-contain drop-shadow-lg"
                  />
                </div>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                {product.name}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-emerald-800/90 mt-1 mb-3">
                {product.tagline}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 line-clamp-3">
                {product.description[language] || product.description.es}
              </p>

              {/* Specs Pills */}
              <div className="space-y-2 mb-6 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span className="font-semibold text-slate-700">Presentaciones:</span>
                  <span className="text-slate-600 truncate">{product.presentations.join(", ")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span className="font-semibold text-slate-700">Vida Útil:</span>
                  <span className="text-slate-600">{product.shelfLife}</span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={() => scrollToContactWithProduct(product.name)}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <span>{t("quoteProductBtn")}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
