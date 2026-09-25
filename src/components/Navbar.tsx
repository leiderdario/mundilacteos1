"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { MagneticButton } from "./MagneticButton";
import { Menu, X, Globe, PhoneCall, ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#inicio", label: t("navHome") },
    { href: "#nosotros", label: t("navAbout") },
    { href: "#productos", label: t("navProducts") },
    { href: "#calidad", label: t("navQuality") },
    { href: "#aliados", label: t("navClients") },
    { href: "#contacto", label: t("navContact") }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-2.5 bg-white/90 backdrop-blur-md shadow-sm border-b border-emerald-100/60" : "py-4 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name */}
          <a
            href="#inicio"
            className="flex items-center gap-3 group focus:outline-none"
            data-cursor="MUNDILÁCTEOS"
          >
            <div className="relative w-11 h-11 flex-shrink-0 bg-white rounded-xl shadow-xs border border-emerald-100 p-1 flex items-center justify-center transition-transform group-hover:scale-105">
              <Image
                src="/images/logo.png"
                alt="Logo Mundilácteos"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-emerald-950 leading-none">
                MUNDI<span className="text-emerald-600 font-light">LÁCTEOS</span>
              </span>
              <span className="text-[9px] tracking-widest text-emerald-800/80 font-bold uppercase mt-0.5">
                Cartagena • Colombia
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/70 px-4 py-1.5 rounded-full border border-emerald-100/80 shadow-xs backdrop-blur-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/70 rounded-full transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Cluster: Language Switcher + CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Switcher Button (ES / EN) */}
            <div className="flex items-center bg-emerald-50/80 border border-emerald-200/80 rounded-full p-0.5 text-xs font-bold text-slate-700">
              <button
                type="button"
                onClick={() => setLanguage("es")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all ${
                  language === "es"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-emerald-900 hover:text-emerald-700"
                }`}
                title="Cambiar a Español"
              >
                <Globe className="w-3 h-3" />
                <span>ES</span>
              </button>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all ${
                  language === "en"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-emerald-900 hover:text-emerald-700"
                }`}
                title="Switch to English"
              >
                <span>EN</span>
              </button>
            </div>

            {/* Magnetic CTA Quote Button */}
            <MagneticButton
              onClick={() => {
                const el = document.getElementById("contacto");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              data-cursor="COTIZAR"
              className="px-4 py-2 text-xs font-bold tracking-wide uppercase bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30 transition-all flex items-center gap-2"
            >
              <span>{t("navQuoteCTA")}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </MagneticButton>
          </div>

          {/* Mobile menu hamburger button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className="p-1.5 rounded-full border border-emerald-200 text-xs font-bold text-emerald-800 bg-white"
            >
              {language.toUpperCase()}
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-3 p-4 bg-white/95 backdrop-blur-lg rounded-2xl border border-emerald-100 shadow-xl space-y-2 animate-in fade-in slide-in-from-top-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a
                href={`tel:${siteConfig.company.contact.phoneMain.replace(/\s+/g, "")}`}
                className="flex items-center gap-2 text-xs font-medium text-emerald-800 px-3 py-1"
              >
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <span>{siteConfig.company.contact.phoneMain}</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full py-2.5 text-center text-xs font-bold uppercase bg-emerald-600 text-white rounded-xl shadow-md"
              >
                {t("navQuoteCTA")}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
