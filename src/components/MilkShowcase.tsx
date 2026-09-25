"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { CheckCircle2, Droplets, Sparkles, Wind, ShieldCheck, ThermometerSnowflake, Store, Package } from "lucide-react";

export const MilkShowcase: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<number>(0);

  const pillars = [
    {
      id: 0,
      title: t("milkBenefit1Title"),
      desc: t("milkBenefit1Desc"),
      icon: Droplets,
      metric: "100%",
      metricLabel: "Solubilidad Inmediata"
    },
    {
      id: 1,
      title: t("milkBenefit2Title"),
      desc: t("milkBenefit2Desc"),
      icon: Wind,
      metric: "12 Meses",
      metricLabel: "Vida Útil Garantizada"
    },
    {
      id: 2,
      title: t("milkBenefit3Title"),
      desc: t("milkBenefit3Desc"),
      icon: ThermometerSnowflake,
      metric: "0-4°C",
      metricLabel: "Control de Cadena de Frío"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#FAF9F5] via-[#F5F2EB] to-[#FAF9F5] border-t border-b border-emerald-100/60">
      {/* Dairy Splash & Milk Wave Background SVGs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large creamy milk wave ripple 1 */}
        <svg
          className="absolute -top-10 -right-20 w-[600px] h-[600px] text-white/70"
          viewBox="0 0 200 200"
          fill="currentColor"
        >
          <path
            d="M45.7,-64.9C58.3,-56.3,67.1,-43.3,72.8,-29C78.5,-14.7,81.1,0.9,78.2,16.2C75.3,31.5,66.9,46.5,54.7,56.7C42.5,66.9,26.5,72.3,10.2,73.5C-6.1,74.7,-22.8,71.7,-37.6,63.8C-52.4,55.9,-65.4,43.1,-72.6,27.5C-79.8,11.9,-81.2,-6.5,-76.3,-22.9C-71.4,-39.3,-60.2,-53.7,-46,-61.9C-31.8,-70.1,-15.9,-72.1,-0.3,-71.7C15.3,-71.3,33.1,-73.5,45.7,-64.9Z"
            transform="translate(100 100)"
          />
        </svg>

        {/* Milk Ripple 2 Bottom Left */}
        <svg
          className="absolute -bottom-24 -left-20 w-[550px] h-[550px] text-emerald-50/50"
          viewBox="0 0 200 200"
          fill="currentColor"
        >
          <path
            d="M39.9,-54.6C51.6,-47.4,61,-35.8,66.3,-22.3C71.6,-8.8,72.8,6.7,68.9,21.1C65,35.5,56,48.8,43.6,57.4C31.2,66,15.6,69.9,-0.3,70.3C-16.2,70.7,-32.4,67.6,-45.5,58.8C-58.6,50,-68.6,35.5,-73.4,19.2C-78.2,2.9,-77.8,-15.2,-70.7,-29.6C-63.6,-44,-49.8,-54.7,-35.8,-60.8C-21.8,-66.9,-7.6,-68.4,4.7,-74.9C17,-81.4,28.2,-61.8,39.9,-54.6Z"
            transform="translate(100 100)"
          />
        </svg>

        {/* Decorative Floating Milk Droplets Pattern */}
        <div className="absolute top-1/3 left-12 w-6 h-6 rounded-full bg-white shadow-md border border-emerald-100 opacity-80 animate-pulse" />
        <div className="absolute top-1/4 right-1/3 w-4 h-4 rounded-full bg-white shadow-xs border border-emerald-100 opacity-60" />
        <div className="absolute bottom-1/4 right-16 w-8 h-8 rounded-full bg-white shadow-md border border-emerald-100 opacity-75 animate-bounce-slow" />
        <div className="absolute bottom-12 left-1/3 w-3 h-3 rounded-full bg-white shadow-xs opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Dairy Decor */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-emerald-200 text-emerald-800 text-xs font-black uppercase tracking-wider mb-4 shadow-xs">
            <Droplets className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
            <span>Materia Prima Seleccionada • Grado Alimenticio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            El Protagonista: <span className="text-emerald-800">La Leche</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            Cada gramo de nuestra leche en polvo entera condensa la riqueza del campo ganadero y la más rigurosa tecnología de evaporación y secado por aspersión.
          </p>
        </div>

        {/* Big Milk Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Interactive Feature Pillars */}
          <div className="lg:col-span-6 space-y-4">
            {pillars.map((p) => {
              const Icon = p.icon;
              const isSelected = activeTab === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setActiveTab(p.id)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isSelected
                      ? "bg-white border-emerald-400 shadow-xl translate-x-2 ring-2 ring-emerald-500/10"
                      : "bg-white/80 backdrop-blur-sm border-slate-200/80 hover:border-emerald-300 hover:bg-white"
                  }`}
                  data-cursor="DETALLE"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-xl transition-colors ${
                        isSelected ? "bg-emerald-700 text-white shadow-sm" : "bg-emerald-50 text-emerald-800"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
                        <span
                          className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                            isSelected ? "bg-emerald-700 text-white" : "bg-emerald-50 text-emerald-800"
                          }`}
                        >
                          {p.metric}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* B2B Commercial Badges Strip */}
            <div className="p-4 rounded-2xl bg-white border border-emerald-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-slate-800">
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Excelente margen para tiendas y canal detallista</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Formatos individuales desde 27g hasta 1kg</span>
              </div>
            </div>
          </div>

          {/* Right: Large Heroic Product Imagery on Milk Splash Stage */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            <div className="relative w-full max-w-md h-[480px] flex items-center justify-center">
              {/* Milk Splash Graphic Backdrop */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white via-[#F4F1E8] to-white border-2 border-white shadow-2xl p-6 flex items-center justify-center overflow-hidden">
                {/* Concentric Milk Splash Rings */}
                <div className="absolute w-80 h-80 rounded-full border-4 border-white/80 animate-ping opacity-20 pointer-events-none" />
                <div className="absolute w-96 h-96 rounded-full bg-radial from-white via-emerald-50/40 to-transparent pointer-events-none" />

                {/* Milk Droplets Decor in Stage */}
                <div className="absolute top-4 left-6 px-3 py-1 rounded-full bg-white/95 text-[11px] font-bold text-emerald-800 border border-emerald-100 shadow-xs flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Atmósfera Pura CO2</span>
                </div>

                {/* Product Image Stage */}
                <div className="relative w-72 h-84 sm:w-80 sm:h-96 transition-transform duration-500 hover:scale-105 z-10">
                  <Image
                    src={
                      activeTab === 0
                        ? "/images/the-cantaro-doble.png"
                        : activeTab === 1
                        ? "/images/the-cantaro-3.png"
                        : "/images/the-cantaro-2.png"
                    }
                    alt="The Cántaro Presentación Láctea"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-contain drop-shadow-2xl"
                  />
                </div>

                {/* Floating Metric Bubble */}
                <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-emerald-100 text-center z-20">
                  <span className="text-xl font-black text-emerald-800 block leading-none">
                    {pillars[activeTab].metric}
                  </span>
                  <span className="text-[10px] uppercase font-black text-slate-500 tracking-wider">
                    {pillars[activeTab].metricLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
