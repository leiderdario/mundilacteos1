"use client";

import React from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import { CustomCursor } from "@/components/CustomCursor";
import { Preloader } from "@/components/Preloader";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MilkShowcase } from "@/components/MilkShowcase";
import { HorizontalProducts } from "@/components/HorizontalProducts";
import { StorySection } from "@/components/StorySection";
import { QualityProcess } from "@/components/QualityProcess";
import { ClientsTrust } from "@/components/ClientsTrust";
import { ContactCRM } from "@/components/ContactCRM";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-[#FAF9F5] text-slate-900 overflow-x-hidden">
        {/* Custom Contextual Cursor for Desktop */}
        <CustomCursor />

        {/* Brand Cinematic Preloader */}
        <Preloader />

        {/* Floating Glass Navbar */}
        <Navbar />

        {/* Main Sections */}
        <main>
          {/* Section 11 & 12: Hero with 3D Milk Pouch */}
          <Hero />

          {/* Section 17: Protagonismo de la Leche */}
          <MilkShowcase />

          {/* Section 14 & 15: Experiencia Horizontal de Productos */}
          <HorizontalProducts />

          {/* Section 18: Historia y Storytelling Visual */}
          <StorySection />

          {/* Section 19: Calidad ISO 9001 & Matriz de Embalaje */}
          <QualityProcess />

          {/* Section 20: Clientes y Aliados de Confianza */}
          <ClientsTrust />

          {/* Section 24, 25 & 26: Formulario Comercial y CRM */}
          <ContactCRM />
        </main>

        {/* Section 27: Footer Corporativo */}
        <Footer />
      </div>
    </LanguageProvider>
  );
}
