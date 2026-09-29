"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/config/site";
import { MapPin, History, Store } from "lucide-react";

type Chapter = {
  period: string;
  title: string;
  desc: string;
  media:
    | { kind: "photo"; src: string; alt: string; caption: string }
    | { kind: "products" }
    | { kind: "stats" };
};

export const StorySection: React.FC = () => {
  const { t } = useLanguage();

  const chapters: Chapter[] = [
    {
      period: "2012 — 2015",
      title: "El Origen en Cartagena",
      desc: "Nace Mundilácteos por iniciativa familiar para abastecer con leche en polvo de alta pureza y precio accesible al comercio del Caribe.",
      media: { kind: "photo", src: "/images/foto-equipo.jpg", alt: "Equipo humano de Mundilácteos", caption: "Compromiso y Calidad Humana" }
    },
    {
      period: "2016 — 2018",
      title: "Consolidación en Tiendas & Retail",
      desc: "The Cántaro y La Becerrita se convierten en marcas de alta rotación en miles de tiendas de barrio y supermercados. Productos pensados para generar alta recompra en el consumidor final y márgenes sostenibles para el comerciante.",
      media: { kind: "products" }
    },
    {
      period: "2019 — 2023",
      title: "Sede Parque Industrial Europark",
      desc: "Construcción de la moderna planta de almacenamiento, empaque automatizado y atmósfera modificada de CO2 en Cartagena.",
      media: { kind: "photo", src: "/images/foto-planta.jpg", alt: "Planta de producción y empaque Mundilácteos", caption: "Planta Cartagena Europark" }
    },
    {
      period: "2024 — Hoy",
      title: "Expansión Nacional & Certificación ISO",
      desc: "Más de 869,000 clientes satisfechos y alianzas estratégicas de suministro con grandes superficies de toda Colombia.",
      media: { kind: "stats" }
    }
  ];

  const renderMedia = (media: Chapter["media"]) => {
    if (media.kind === "photo") {
      return (
        <div className="relative aspect-[3/2] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 border-white group">
          <Image
            src={media.src}
            alt={media.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 600px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4 sm:p-5">
            <span className="text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider">{media.caption}</span>
          </div>
        </div>
      );
    }

    if (media.kind === "products") {
      return (
        <div className="relative aspect-[3/2] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 border-white bg-gradient-to-br from-white via-emerald-50 to-[#F4EFE6] flex items-center justify-center gap-2 sm:gap-6 p-6">
          <div className="relative w-1/2 h-full">
            <Image src="/images/the-cantaro-doble.png" alt="The Cántaro" fill sizes="300px" className="object-contain drop-shadow-xl" />
          </div>
          <div className="relative w-1/2 h-full">
            <Image src="/images/la-becerrita.png" alt="La Becerrita" fill sizes="300px" className="object-contain drop-shadow-xl" />
          </div>
        </div>
      );
    }

    return (
      <div className="relative aspect-[3/2] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800 text-white p-6 sm:p-10 flex flex-col justify-center">
        <div className="grid grid-cols-3 gap-3 sm:gap-6 text-center">
          <div>
            <p className="text-xl sm:text-4xl font-black tracking-tight">869K+</p>
            <p className="text-[9px] sm:text-[11px] uppercase tracking-widest text-emerald-100 mt-1">Clientes</p>
          </div>
          <div className="border-x border-white/20">
            <p className="text-xl sm:text-4xl font-black tracking-tight">32</p>
            <p className="text-[9px] sm:text-[11px] uppercase tracking-widest text-emerald-100 mt-1">Departamentos</p>
          </div>
          <div>
            <p className="text-xl sm:text-4xl font-black tracking-tight">ISO</p>
            <p className="text-[9px] sm:text-[11px] uppercase tracking-widest text-emerald-100 mt-1">9001:2015</p>
          </div>
        </div>
        <div className="mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-white/20 flex items-start gap-2.5 text-left">
          <MapPin className="w-4 h-4 text-emerald-200 flex-shrink-0 mt-0.5" />
          <p className="text-[11px] sm:text-sm text-emerald-50 leading-snug">
            {siteConfig.company.address.full}, {siteConfig.company.address.city}, {siteConfig.company.address.country}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section id="nosotros" className="py-16 sm:py-28 bg-gradient-to-b from-[#FAF9F5] via-[#F4EFE6]/60 to-[#FAF9F5] relative overflow-hidden border-t border-b border-emerald-100/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Encabezado centrado */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-emerald-200 text-emerald-800 text-[10px] sm:text-xs font-black uppercase tracking-wider mb-4 sm:mb-6 shadow-xs">
            <History className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t("storyBadge")}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            De un sueño familiar en Cartagena, <br className="hidden sm:inline" />
            <span className="text-emerald-800">a la mesa y comercio de toda Colombia</span>
          </h2>
          <div className="w-12 h-px bg-emerald-600 mx-auto my-6 sm:my-8" />
          <p className="max-w-3xl mx-auto text-sm sm:text-lg text-slate-700 leading-relaxed">
            {t("storyP1")}
          </p>
        </div>

        {/* Capítulos alternados imagen / texto */}
        <div className="mt-14 sm:mt-24 space-y-14 sm:space-y-24">
          {chapters.map((chapter, i) => {
            const reversed = i % 2 === 1;
            return (
              <article
                key={chapter.period}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16 items-center"
              >
                <div className={`lg:col-span-7 ${reversed ? "lg:order-2" : ""}`}>
                  {renderMedia(chapter.media)}
                </div>
                <div className={`lg:col-span-5 ${reversed ? "lg:order-1 lg:text-right" : ""}`}>
                  <p className={`flex items-center gap-3 text-[11px] sm:text-xs font-black uppercase tracking-[0.2em] text-emerald-700 mb-3 sm:mb-4 ${reversed ? "lg:justify-end" : ""}`}>
                    <span className="w-8 h-px bg-emerald-600" />
                    {chapter.period}
                  </p>
                  <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3 sm:mb-4">
                    {chapter.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {chapter.desc}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Cierre */}
        <div className="max-w-3xl mx-auto text-center mt-16 sm:mt-28 pt-10 sm:pt-14 border-t border-emerald-200/60">
          <p className="text-base sm:text-xl text-slate-800 leading-relaxed font-medium">
            {t("storyP2")}
          </p>
          <div className="inline-flex items-center gap-2 mt-6 sm:mt-8 px-4 py-2 rounded-full bg-white border border-emerald-200 text-emerald-900 text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-xs">
            <Store className="w-3.5 h-3.5 text-emerald-700" />
            <span>Tiendas · Supermercados · Mayoristas</span>
          </div>
        </div>
      </div>
    </section>
  );
};
