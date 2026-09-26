"use client";

import React from "react";
import { Preloader } from "@/components/Preloader";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MilkShowcase } from "@/components/MilkShowcase";
import { HorizontalProducts } from "@/components/HorizontalProducts";
import { StorySection } from "@/components/StorySection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#FAF9F5] text-slate-900 overflow-x-hidden">
      {/* Brand Cinematic Preloader (with pure white milk fill in light & dark mode) */}
      <Preloader />

      {/* Floating Glass Navbar with cross-page navigation */}
      <Navbar />

      {/* Main Home Sections: Inicio, Nosotros y Productos */}
      <main>
        {/* Inicio: Hero with 3D Milk Pouch & Direct Commercial CTA */}
        <Hero />

        {/* Nosotros: Storytelling, 12 years of history & Cartagena Europark plant */}
        <StorySection />

        {/* Protagonismo de la Leche & Pureza */}
        <MilkShowcase />

        {/* Productos: Interactive 3D Product Catalog with fully visible quote buttons */}
        <HorizontalProducts />
      </main>

      {/* Corporate Footer */}
      <Footer />
    </div>
  );
}
