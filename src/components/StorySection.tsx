"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/config/site";
import { MapPin, History, Store, Truck, Droplets, Sparkles } from "lucide-react";

export const StorySection: React.FC = () => {
  const { t } = useLanguage();

  const timelineSteps = [
    {
      year: "2012",
      title: "El Origen en Cartagena",
      desc: "Nace Mundilácteos por iniciativa familiar para abastecer con leche en polvo de alta pureza y precio accesible al comercio del Caribe."
    },
    {
      year: "2016",
      title: "Consolidación en Tiendas & Retail",
      desc: "The Cántaro y La Becerrita se convierten en marcas de alta rotación en miles de tiendas de barrio y supermercados."
    },
    {
      year: "2019",
      title: "Sede Parque Industrial Europark",
      desc: "Construcción de la moderna planta de almacenamiento, empaque automatizado y atmósfera modificada de CO2 en Cartagena."
    },
    {
      year: "2024+",
      title: "Expansión Nacional & Certificación ISO",
      desc: "Más de 869,000 clientes satisfechos y alianzas estratégicas de suministro con grandes superficies de toda Colombia."
    }
  ];

  return (
    <section id="nosotros" className="py-14 sm:py-24 bg-gradient-to-b from-[#FAF9F5] via-[#F4EFE6]/60 to-[#FAF9F5] relative overflow-hidden border-t border-b border-emerald-100/60">
      {/* Background Dairy Elements & Milk Splash Contours */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle Organic Milk Blob Top Left */}
        <svg
          className="absolute -top-32 -left-32 w-[650px] h-[650px] text-white/80"
          viewBox="0 0 200 200"
          fill="currentColor"
        >
          <path
            d="M48.1,-63.3C61.8,-57.1,72.1,-43.3,76.5,-28C80.8,-12.7,79.2,4.1,74.3,19.9C69.4,35.7,61.1,50.6,48.7,61C36.3,71.4,19.8,77.3,3.1,76.2C-13.6,75.1,-30.5,67,-44.6,56.1C-58.7,45.2,-70,31.5,-75.1,15.6C-80.2,-0.3,-79.1,-18.4,-71.4,-33.4C-63.7,-48.4,-49.4,-60.3,-34.5,-66.2C-19.6,-72.1,-4.1,-72,9.3,-68.8C22.7,-65.6,34.4,-69.5,48.1,-63.3Z"
            transform="translate(100 100)"
          />
        </svg>

        {/* Lactic Wave Ribbon at Bottom Right */}
        <svg
          className="absolute -bottom-28 -right-28 w-[600px] h-[600px] text-emerald-100/30"
          viewBox="0 0 200 200"
          fill="currentColor"
        >
          <path
            d="M38.1,-52.3C49.9,-44.1,60.4,-33.7,65.8,-20.9C71.2,-8.1,71.5,7.1,66.8,20.8C62.1,34.5,52.4,46.7,40.1,55.1C27.8,63.5,12.9,68.1,-2.7,71.8C-18.3,75.5,-34.6,78.3,-46.7,70.9C-58.8,63.5,-66.7,45.9,-70.7,28.8C-74.7,11.7,-74.8,-4.9,-69.8,-19.9C-64.8,-34.9,-54.7,-48.3,-41.8,-56.3C-28.9,-64.3,-13.2,-66.9,1,-68.3C15.2,-69.7,26.3,-60.5,38.1,-52.3Z"
            transform="translate(100 100)"
          />
        </svg>

        {/* Floating Milk Droplets */}
        <div className="absolute top-1/4 right-20 w-7 h-7 rounded-full bg-white shadow-md border border-emerald-100/80 animate-pulse" />
        <div className="absolute bottom-1/3 left-24 w-5 h-5 rounded-full bg-white shadow-xs border border-emerald-100/80" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-emerald-200 text-emerald-800 text-[10px] sm:text-xs font-black uppercase tracking-wider mb-2.5 sm:mb-3 shadow-xs">
            <History className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t("storyBadge")}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            De un sueño familiar en Cartagena, <br className="hidden sm:inline" />
            <span className="text-emerald-800">a la mesa y comercio de toda Colombia</span>
          </h2>
        </div>

        {/* Story Grid: Narrative + Real Plant Photos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center mb-10 sm:mb-16">
          {/* Narrative Column */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/90 backdrop-blur-sm border border-emerald-100 shadow-md space-y-3 sm:space-y-4">
              <p className="text-sm sm:text-lg text-slate-700 leading-relaxed font-normal">
                {t("storyP1")}
              </p>
              <p className="text-sm sm:text-lg text-slate-700 leading-relaxed font-normal">
                {t("storyP2")}
              </p>
            </div>

            {/* B2B Commercial Distribution Badge */}
            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-emerald-200 shadow-xs flex items-start gap-3 sm:gap-4">
              <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-700 text-white flex-shrink-0">
                <Store className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Enfoque en Tiendas, Supermercados y Mayoristas
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-snug">
                  Mundilácteos formula productos pensados para generar alta recompra en el consumidor final y márgenes sostenibles para el comerciante.
                </p>
              </div>
            </div>

            {/* Corporate Location Details Card */}
            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-start gap-3 sm:gap-4">
              <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-800 text-white flex-shrink-0">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-emerald-950 uppercase tracking-wide">
                  Sede Operativa y Planta Principal
                </h4>
                <p className="text-xs sm:text-sm text-emerald-900/90 mt-1 font-medium">
                  {siteConfig.company.address.full}, {siteConfig.company.address.city}, {siteConfig.company.address.country}
                </p>
                <span className="inline-block mt-2 text-[10px] sm:text-[11px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded-md border border-emerald-200 shadow-2xs">
                  Despachos a los 32 departamentos
                </span>
              </div>
            </div>
          </div>

          {/* Photo Collage Column with Milk Ripple Styling */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="relative h-48 sm:h-72 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 border-white group">
              <Image
                src="/images/foto-planta.jpg"
                alt="Planta de producción y empaque Mundilácteos"
                fill
                sizes="(max-width: 768px) 50vw, 300px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3 sm:p-4">
                <span className="text-white text-[10px] sm:text-xs font-bold">Planta Cartagena Europark</span>
              </div>
            </div>

            <div className="relative h-48 sm:h-72 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 border-white group mt-3 sm:mt-6">
              <Image
                src="/images/foto-equipo.jpg"
                alt="Equipo humano de Mundilácteos"
                fill
                sizes="(max-width: 768px) 50vw, 300px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3 sm:p-4">
                <span className="text-white text-[10px] sm:text-xs font-bold">Compromiso y Calidad Humana</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Timeline Stepper: Horizontal snap on mobile, 4-col on desktop */}
        <div className="pt-6 sm:pt-10 border-t border-emerald-200/60">
          <div className="flex items-center justify-between mb-4 sm:mb-8">
            <h3 className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-slate-500">
              12 Años de Crecimiento y Confianza Comercial
            </h3>
            <span className="sm:hidden text-[10px] text-emerald-700 font-bold">Desliza →</span>
          </div>

          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 no-scrollbar snap-x">
            {timelineSteps.map((step) => (
              <div
                key={step.year}
                className="flex-shrink-0 w-[240px] sm:w-auto snap-start relative p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/90 backdrop-blur-sm border border-emerald-100 shadow-sm hover:border-emerald-300 transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] sm:text-xs font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-mono">
                    {step.year}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">{step.title}</h4>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
