"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { MilkBag3D } from "./MilkBag3D";
import {
  ArrowDown,
  ShieldCheck,
  Award,
  Store,
  Truck,
  Building2,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import { siteConfig } from "@/config/site";

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const scrollToProducts = () => {
    const el = document.getElementById("productos");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-[85vh] lg:min-h-screen pt-20 sm:pt-28 pb-10 sm:pb-16 flex flex-col justify-center overflow-hidden bg-[#FAF9F5]"
    >
      {/* Cinematic Dairy Video Backdrop */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-80 lg:opacity-90">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/videos/hero-poster.webp"
          className="w-full h-full object-cover object-center filter saturate-110 brightness-100"
        >
          <source src="/videos/hero-dairy.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Directional Readability Wash */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b lg:bg-gradient-to-r from-[#FAF9F5]/80 via-[#FAF9F5]/60 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#FAF9F5] to-transparent pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#FAF9F5] to-transparent pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-center">
          
          {/* Main Info Column */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left z-20">
            {/* Streamlined Mobile Badge / Rich Desktop Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-900 text-[10px] sm:text-xs font-black uppercase tracking-wider mb-2.5 sm:mb-4 shadow-xs">
              <Store className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
              <span className="hidden sm:inline">Venta Mayorista e Institucional • Supermercados & Distribuidores</span>
              <span className="sm:hidden">Distribución Mayorista B2B</span>
            </div>

            {/* Impact Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1] mb-2 sm:mb-4">
              LO QUE NOS UNE <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-700">
                ES LA PUREZA.
              </span>
            </h1>

            {/* Subtitle: Short and punchy on mobile, comprehensive on desktop */}
            <p className="text-xs sm:text-base lg:text-lg text-slate-700 max-w-lg leading-relaxed mb-3 sm:mb-6 font-normal">
              <span className="sm:hidden">
                Suministro directo de fábrica en <strong className="text-emerald-950 font-bold">leche en polvo entera, azucarada y derivados</strong>.
              </span>
              <span className="hidden sm:inline">
                Suministro directo de fábrica en <strong className="text-emerald-950 font-bold">leche en polvo entera, azucarada y derivados</strong>. 
                Garantizamos alta rotación para <span className="text-emerald-800 font-semibold">tiendas y supermercados</span>, 
                así como sacos Kraft de 25kg con certificación <strong className="text-emerald-950 font-bold">ISO 9001:2015</strong> y Registro INVIMA.
              </span>
            </p>

            {/* Mobile-First Streamlined CTAs: Two clean, compact action buttons side by side */}
            <div className="lg:hidden flex items-center justify-center gap-2.5 w-full max-w-xs mb-3">
              <Link
                href="/contacto"
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-emerald-700/20 transition-all cursor-pointer"
              >
                <span>Contáctanos</span>
                <ChevronRight className="w-3.5 h-3.5 text-emerald-200" />
              </Link>
              <button
                onClick={scrollToProducts}
                className="py-2.5 px-4 rounded-xl bg-white/90 hover:bg-white border border-emerald-300 text-emerald-900 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1 shadow-xs transition-all cursor-pointer"
              >
                <span>Ver Catálogo</span>
              </button>
            </div>

            {/* Mobile Guarantee Micro-pill */}
            <div className="lg:hidden flex items-center justify-center gap-3 text-[10px] font-semibold text-slate-600 mb-1">
              <span className="flex items-center gap-1 text-emerald-800">
                <Truck className="w-3 h-3 text-emerald-600" /> Despachos Cartagena
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-800">
                <Building2 className="w-3 h-3 text-emerald-600" /> Precios B2B
              </span>
            </div>

            {/* Desktop Rich Card with B2B framing */}
            <div className="hidden lg:block w-full max-w-lg mb-4">
              <div className="p-1 rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 shadow-xl shadow-emerald-700/20 group hover:shadow-2xl transition-all">
                <div className="p-3 bg-white rounded-[22px] flex items-center justify-between gap-4">
                  <div className="text-left pl-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 block">
                      ¿Precios Directos de Fábrica?
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Atención comercial y despachos a todo el país
                    </span>
                  </div>

                  <Link
                    href="/contacto"
                    className="px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:scale-105 transition-all text-center flex-shrink-0 cursor-pointer"
                  >
                    <span>Contáctanos Ahora</span>
                    <ChevronRight className="w-4 h-4 text-emerald-200" />
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-3 text-[11px] font-semibold text-slate-500 px-1">
                <span className="flex items-center gap-1 text-emerald-800">
                  <Truck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  Despachos desde Cartagena
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-800">
                  <Building2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  Escala por volumen B2B
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Milk Pouch (IMMEDIATELY VISIBLE ON MOBILE!) */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center mt-1 lg:mt-0">
            {/* Background circular dairy ring */}
            <div className="absolute w-[220px] h-[220px] sm:w-[360px] sm:h-[360px] lg:w-[460px] lg:h-[460px] rounded-full border border-emerald-200/60 bg-gradient-to-tr from-white/90 via-emerald-50/70 to-white/90 shadow-2xl pointer-events-none" />

            {/* Floating Quality Stamps around bag (Desktop) */}
            <div className="absolute -top-4 right-6 sm:right-12 z-20 hidden lg:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-emerald-200 shadow-md">
              <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0" />
              <div className="text-left">
                <p className="text-[10px] uppercase font-black text-slate-400 leading-none">Certificación</p>
                <p className="text-xs font-bold text-slate-900">ISO 9001:2015</p>
              </div>
            </div>

            <div className="absolute bottom-6 left-4 sm:left-10 z-20 hidden lg:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-emerald-200 shadow-md">
              <Award className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <div className="text-left">
                <p className="text-[10px] uppercase font-black text-slate-400 leading-none">Garantía Sanitaria</p>
                <p className="text-xs font-bold text-slate-900">Registro INVIMA</p>
              </div>
            </div>

            {/* 3D WebGL Canvas with Pouch - Prominent and visible on both mobile & desktop */}
            <MilkBag3D className="w-full relative z-10" />
          </div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div className="relative z-10 mt-3 sm:mt-6 flex flex-col items-center justify-center text-center">
        <button
          onClick={scrollToProducts}
          className="flex flex-col items-center gap-1 text-slate-500 hover:text-emerald-700 transition-colors group focus:outline-none cursor-pointer"
          aria-label="Scroll down"
        >
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-emerald-800">
            Conoce nuestras marcas
          </span>
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-slate-300 group-hover:border-emerald-600 flex items-center justify-center transition-all animate-bounce">
            <ArrowDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-600 group-hover:text-emerald-700" />
          </div>
        </button>
      </div>
    </section>
  );
};
