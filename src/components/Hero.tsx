"use client";

import React, { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { MilkBag3D } from "./MilkBag3D";
import { MagneticButton } from "./MagneticButton";
import {
  ArrowDown,
  Sparkles,
  ShieldCheck,
  Award,
  Store,
  Truck,
  Building2,
  ChevronRight,
  Play,
  Volume2,
  VolumeX
} from "lucide-react";
import { siteConfig } from "@/config/site";

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted in some browsers until interaction
      });
    }
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById("contacto");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToProducts = () => {
    const el = document.getElementById("productos");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center overflow-hidden bg-[#FAF9F5]"
    >
      {/* Cinematic Dairy Video Backdrop (Inspired by DFA Milk) - High Clarity */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-85 lg:opacity-90">
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

      {/* Directional Readability Wash: Solid on the text side, completely open on center/right */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#FAF9F5]/95 via-[#FAF9F5]/80 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#FAF9F5] to-transparent pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FAF9F5] to-transparent pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: B2B Value Proposition & Centered Decorated Conversion CTA */}
          <div className="lg:col-span-6 flex flex-col items-start text-left z-20">
            {/* B2B Segment Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-black uppercase tracking-wider mb-5 shadow-xs backdrop-blur-xs">
              <Store className="w-3.5 h-3.5 text-emerald-700" />
              <span>Venta Mayorista e Institucional • Tiendas & Supermercados</span>
            </div>

            {/* Impact Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08] mb-5">
              LO QUE NOS UNE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-700">
                ES LA PUREZA.
              </span>
            </h1>

            {/* B2B Focused Subtitle */}
            <p className="text-base sm:text-lg text-slate-700 max-w-xl leading-relaxed mb-8 font-normal">
              Suministro directo de fábrica en <strong className="text-emerald-950 font-bold">leche en polvo entera, azucarada y derivados</strong>. 
              Garantizamos alta rotación para <span className="text-emerald-800 font-semibold">tiendas, autoservicios y supermercados</span>, 
              así como sacos industriales Kraft de 25kg para la industria de alimentos con certificación <strong className="text-emerald-950 font-bold">ISO 9001:2015</strong> y Registro INVIMA.
            </p>

            {/* Centered High-Conversion CTA with Dairy Decor (Removed "Explorar la experiencia") */}
            <div className="w-full max-w-lg mb-10">
              <div className="relative p-1 rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 shadow-xl shadow-emerald-700/20 group hover:shadow-2xl hover:shadow-emerald-600/30 transition-all">
                {/* Decorative lactic glow border */}
                <div className="p-3 bg-white rounded-[22px] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-left pl-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 block">
                      ¿Interesado en Precios de Fábrica?
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Atención prioritaria para compras y distribución
                    </span>
                  </div>

                  <MagneticButton
                    onClick={scrollToContact}
                    data-cursor="CONTACTAR"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:scale-105 transition-all text-center flex-shrink-0 cursor-pointer"
                  >
                    <span>Contáctanos Ahora</span>
                    <ChevronRight className="w-4 h-4 text-emerald-200" />
                  </MagneticButton>
                </div>
              </div>

              {/* Trust micro-guarantees beneath CTA */}
              <div className="flex flex-wrap items-center gap-4 mt-3 text-[11px] font-semibold text-slate-500 px-2">
                <span className="flex items-center gap-1 text-emerald-800">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  Despachos diarios desde Cartagena
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-800">
                  <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                  Escala de precios por volumen
                </span>
              </div>
            </div>

            {/* Trust Proof Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-emerald-200/60 w-full max-w-lg">
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-black text-emerald-950 leading-none">
                  {siteConfig.company.yearsInMarket}+
                </span>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                  Años en el Mercado
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-black text-emerald-950 leading-none">
                  {siteConfig.company.satisfiedClients}
                </span>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                  Clientes y Negocios
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-black text-emerald-950 leading-none">
                  ISO 9001
                </span>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                  Calidad Certificada
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Milk Pouch Centerpiece */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Background circular dairy ring */}
            <div className="absolute w-[360px] h-[360px] sm:w-[460px] sm:h-[460px] rounded-full border border-emerald-200/60 bg-gradient-to-tr from-white/90 via-emerald-50/70 to-white/90 shadow-2xl pointer-events-none" />

            {/* Floating Quality Stamps around bag */}
            <div className="absolute -top-4 right-6 sm:right-12 z-20 hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-emerald-200 shadow-md">
              <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0" />
              <div className="text-left">
                <p className="text-[10px] uppercase font-black text-slate-400 leading-none">Certificación</p>
                <p className="text-xs font-bold text-slate-900">ISO 9001:2015</p>
              </div>
            </div>

            <div className="absolute bottom-6 left-4 sm:left-10 z-20 hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-emerald-200 shadow-md">
              <Award className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <div className="text-left">
                <p className="text-[10px] uppercase font-black text-slate-400 leading-none">Garantía Sanitaria</p>
                <p className="text-xs font-bold text-slate-900">Registro INVIMA</p>
              </div>
            </div>

            {/* 3D WebGL Canvas with Pouch */}
            <MilkBag3D className="w-full relative z-10" />
          </div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div className="relative z-10 mt-8 flex flex-col items-center justify-center text-center">
        <button
          onClick={scrollToProducts}
          className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-emerald-700 transition-colors group focus:outline-none cursor-pointer"
          aria-label="Scroll down"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-emerald-800">
            Conoce nuestras marcas y presentaciones
          </span>
          <div className="w-8 h-8 rounded-full border border-slate-300 group-hover:border-emerald-600 flex items-center justify-center transition-all animate-bounce">
            <ArrowDown className="w-4 h-4 text-slate-600 group-hover:text-emerald-700" />
          </div>
        </button>
      </div>
    </section>
  );
};
