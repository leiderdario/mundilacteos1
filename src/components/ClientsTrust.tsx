"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/config/site";
import { Star, Building2, Quote } from "lucide-react";

export const ClientsTrust: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="aliados" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Red de Confianza Comercial</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t("partnersTitle")}
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            {t("partnersSubtitle")}
          </p>
        </div>

        {/* Partners Logos Carousel / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center justify-items-center mb-16">
          {siteConfig.partners.map((partner) => (
            <div
              key={partner.name}
              className="w-full h-24 p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 hover:shadow-md hover:bg-white"
            >
              <div className="relative w-full h-12">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 200px"
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Real Customer Quote Card */}
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-emerald-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Quote className="w-32 h-32" />
          </div>

          <div className="flex gap-1 text-amber-400 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
          </div>

          <p className="text-base sm:text-lg italic leading-relaxed text-emerald-100 mb-6 relative z-10">
            &ldquo;Mundilácteos es una empresa con una trayectoria intachable de más de 12 años. Tenemos años trabajando de la mano con ellos y reconocemos su calidad constante, cumplimiento en entregas y servicio ejemplar.&rdquo;
          </p>

          <div className="flex items-center gap-3 relative z-10 border-t border-emerald-800/80 pt-4">
            <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-sm text-white">
              IS
            </div>
            <div>
              <p className="text-sm font-bold text-white">Ismael Sarmiento</p>
              <p className="text-xs text-emerald-300 font-medium">Aliado Comercial • Distribuidor Regional</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
