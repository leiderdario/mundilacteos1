"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/config/site";
import {
  Building2,
  Star,
  Quote,
  CheckCircle2,
  TrendingUp,
  Truck,
  ShieldCheck,
  ChevronRight,
  Handshake,
  Award,
  Sparkles,
  MapPin,
  ExternalLink
} from "lucide-react";

export default function PartnersPage() {
  const { t } = useLanguage();
  const [selectedPartnerIndex, setSelectedPartnerIndex] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<"all" | "retail" | "foodservice" | "wholesale">("all");

  const partnersDetail = [
    {
      name: "Supertiendas Olímpica",
      logo: "/images/cliente-olimpica.jpg",
      category: "retail",
      categoryLabel: "Retail & Gran Superficie Nacional",
      years: "10+ Años de Alianza",
      coverage: "Costa Caribe e Interior de Colombia",
      productsSupplied: "The Cántaro Entera (380g, 400g, 900g), La Becerrita",
      fulfillmentRate: "99.8%",
      highlight: "Abastecimiento masivo y constante en góndolas con alta rotación de inventario."
    },
    {
      name: "Megatiendas Supermercados",
      logo: "/images/cliente-megatiendas.jpg",
      category: "retail",
      categoryLabel: "Cadena de Supermercados",
      years: "8+ Años de Alianza",
      coverage: "Bolívar, Atlántico y Magdalena",
      productsSupplied: "The Cántaro Entera y Azucarada, Formatos Económicos",
      fulfillmentRate: "100%",
      highlight: "Excelente rendimiento comercial en el canal de autoservicios y compras familiares."
    },
    {
      name: "Mr. Bono",
      logo: "/images/cliente-mrbono.jpg",
      category: "foodservice",
      categoryLabel: "Cadena Gastronómica y Panadería Especializada",
      years: "6+ Años de Alianza",
      coverage: "Nivel Nacional",
      productsSupplied: "Línea Bultos Kraft 25kg & Fórmulas Lácteas para Horneado",
      fulfillmentRate: "99.9%",
      highlight: "Leche en polvo con estabilidad organoléptica y solubilidad para fórmulas horneadas."
    },
    {
      name: "GA Rosa",
      logo: "/images/cliente-garosa.jpg",
      category: "wholesale",
      categoryLabel: "Industria de Alimentos & Distribución Mayorista",
      years: "9+ Años de Alianza",
      coverage: "Región Caribe y Santanderes",
      productsSupplied: "Bultos Industriales Kraft (5kg a 25kg)",
      fulfillmentRate: "99.7%",
      highlight: "Suministro directo de materias primas lácteas para procesos de transformación industrial."
    },
    {
      name: "Rapimercar",
      logo: "/images/cliente-rapimercar.jpg",
      category: "retail",
      categoryLabel: "Supermercados y Autoservicios Regionales",
      years: "7+ Años de Alianza",
      coverage: "Santa Marta, Barranquilla y Cartagena",
      productsSupplied: "Presentaciones individuales de 27g a 1000g",
      fulfillmentRate: "99.9%",
      highlight: "Alta preferencia del consumidor de barrio y formato de cercanía en el Caribe."
    }
  ];

  const filteredPartners = activeFilter === "all"
    ? partnersDetail
    : partnersDetail.filter((p) => p.category === activeFilter);

  const currentPartner = partnersDetail[selectedPartnerIndex];

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-slate-900 flex flex-col justify-between">
      {/* Navbar */}
      <Navbar />

      <main className="flex-grow pt-28 sm:pt-32 pb-20">
        {/* Header Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black uppercase tracking-wider mb-4 border border-emerald-300 shadow-xs">
            <Handshake className="w-4 h-4 text-emerald-700" />
            <span>Red Comercial de Confianza • Supermercados, Cadenas e Industria</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
            Marcas Líderes que Confían en la <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-700">
              Calidad y Cumplimiento de Mundilácteos
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mt-4 leading-relaxed">
            Más de 12 años construyendo alianzas comerciales sólidas con las principales cadenas de retail, distribuidores mayoristas y empresas de alimentos en Colombia.
          </p>
        </section>

        {/* 1. The 5 Color Logos Grid with Enhanced Interactive Cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          {/* Filter Pills */}
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 justify-start sm:justify-center no-scrollbar">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === "all"
                  ? "bg-emerald-700 text-white shadow-md"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              Todos los Aliados ({partnersDetail.length})
            </button>
            <button
              onClick={() => setActiveFilter("retail")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === "retail"
                  ? "bg-emerald-700 text-white shadow-md"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              Supermercados & Retail
            </button>
            <button
              onClick={() => setActiveFilter("foodservice")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === "foodservice"
                  ? "bg-emerald-700 text-white shadow-md"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              Cadenas Gastronómicas
            </button>
            <button
              onClick={() => setActiveFilter("wholesale")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === "wholesale"
                  ? "bg-emerald-700 text-white shadow-md"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              Distribuidores Mayoristas
            </button>
          </div>

          {/* Cards Grid: 100% Color Logos with Rich Hover States */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
            {filteredPartners.map((partner, index) => {
              const isSelected = selectedPartnerIndex === index;
              return (
                <div
                  key={partner.name}
                  onClick={() => setSelectedPartnerIndex(index)}
                  className={`p-6 rounded-3xl bg-white border cursor-pointer transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 shadow-md ${
                    isSelected
                      ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-xl"
                      : "border-slate-200 hover:border-emerald-300 hover:shadow-lg"
                  }`}
                >
                  <div>
                    {/* Full Color Logo Container (No grayscale!) */}
                    <div className="relative w-full h-20 mb-4 bg-slate-50/90 rounded-2xl p-3 flex items-center justify-center border border-slate-100 group-hover:bg-white transition-colors">
                      <div className="relative w-full h-12 transition-transform duration-300 group-hover:scale-105">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 200px"
                          className="object-contain"
                        />
                      </div>
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 mb-2 inline-block">
                      {partner.years}
                    </span>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                      {partner.name}
                    </h3>

                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      {partner.categoryLabel}
                    </p>
                  </div>

                  {/* Micro Fulfillment Metric */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium text-[11px]">Cumplimiento:</span>
                    <span className="font-mono font-bold text-emerald-700">{partner.fulfillmentRate}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Selected Partner Deep-Dive Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left border-b lg:border-b-0 lg:border-r border-slate-100 pb-6 lg:pb-0 lg:pr-8">
              <div className="relative w-48 h-20 mb-4 bg-slate-50 rounded-2xl p-3 flex items-center justify-center border border-slate-200">
                <Image
                  src={currentPartner.logo}
                  alt={currentPartner.name}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{currentPartner.name}</h3>
              <p className="text-xs font-semibold text-emerald-700 mt-0.5">{currentPartner.categoryLabel}</p>
              <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>{currentPartner.coverage}</span>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Detalles de Suministro y SLA
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {currentPartner.years}
                </span>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {currentPartner.highlight}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100 text-xs">
                <div>
                  <span className="font-bold text-slate-700 block mb-0.5">Productos en Rotación:</span>
                  <span className="text-slate-600">{currentPartner.productsSupplied}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700 block mb-0.5">Índice de Entregas a Tiempo:</span>
                  <span className="font-mono font-bold text-emerald-700">{currentPartner.fulfillmentRate} conforme</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Redesigned Featured Spotlight: Review of Ismael Sarmiento */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-emerald-800/80">
            {/* Background Decorative Quote Watermark */}
            <div className="absolute top-0 right-0 p-8 sm:p-12 opacity-10 pointer-events-none">
              <Quote className="w-48 h-48 text-emerald-300" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/90 text-emerald-200 text-xs font-bold uppercase tracking-wider border border-emerald-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Testimonio Comercial Verificado</span>
                </div>

                {/* 5 Stars Rating */}
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400" />
                  ))}
                  <span className="ml-2 font-mono text-sm font-bold text-white">5.0 / 5.0</span>
                </div>
              </div>

              {/* The Key Quote */}
              <blockquote className="text-xl sm:text-2xl md:text-3xl font-medium italic leading-relaxed text-emerald-50 mb-8">
                &ldquo;Mundilácteos es una empresa con una trayectoria intachable de más de 12 años. Tenemos años trabajando de la mano con ellos y reconocemos su calidad constante, cumplimiento en entregas y servicio ejemplar.&rdquo;
              </blockquote>

              {/* Author & Relationship Information */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-emerald-800/80 pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-700 to-teal-500 flex items-center justify-center font-black text-xl text-white shadow-lg ring-2 ring-emerald-400/40">
                    IS
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white flex items-center gap-2">
                      <span>Ismael Sarmiento</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </h4>
                    <p className="text-xs text-emerald-300 font-medium">
                      Aliado Comercial • Distribuidor Regional Mayorista
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Red de Abastecimiento Costa Caribe
                    </p>
                  </div>
                </div>

                {/* Micro metrics from the partnership */}
                <div className="grid grid-cols-2 gap-4 text-center sm:text-right border-t sm:border-t-0 border-emerald-900 pt-4 sm:pt-0">
                  <div>
                    <span className="text-xl sm:text-2xl font-black text-emerald-300 block">12+ Años</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Relación Comercial</span>
                  </div>
                  <div>
                    <span className="text-xl sm:text-2xl font-black text-emerald-300 block">0 Fugas</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Empaque Hermético</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. National Coverage Map Summary */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Logística de Despachos
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Abastecimiento Diario desde Parque Industrial Europark
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Nuestras bodegas estratégicas en Cartagena cuentan con muelles de carga directa para tractomulas y camiones de distribución, conectando con las principales troncales nacionales hacia Bogotá, Medellín, Cali, Bucaramanga y toda la región costera.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-800 block">Costa Caribe</span>
                  <span className="text-slate-500">Cartagena, B/quilla, Santa Marta, Valledupar, Montería, Sincelejo</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-800 block">Interior del País</span>
                  <span className="text-slate-500">Bogotá D.C., Antioquia, Eje Cafetero, Santanderes, Valle</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-emerald-50/70 rounded-2xl p-6 border border-emerald-200 flex flex-col justify-between space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-950">Garantía de Nivel de Servicio (SLA)</h4>
                  <p className="text-xs text-emerald-800">Despachos programados sin roturas de stock</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Embalaje paletizado y stretch film de alta resistencia</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Facturación electrónica DIAN inmediata con certificados de lote</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Precios escalonados por volumen mensual acordado</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Conversion CTA Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-3xl p-8 sm:p-12 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-200">
                Programa de Distribuidores Oficiales
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold mt-1">
                ¿Deseas comercializar Mundilácteos en tu departamento o cadena?
              </h3>
              <p className="text-sm text-emerald-100 mt-2 max-w-xl">
                Contáctanos para recibir lista de precios mayorista, material POP de apoyo y condiciones de distribución preferencial.
              </p>
            </div>

            <Link
              href="/contacto"
              className="px-8 py-4 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 font-black text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer"
            >
              <span>Vincular mi Empresa</span>
              <ChevronRight className="w-4 h-4 text-emerald-700" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
