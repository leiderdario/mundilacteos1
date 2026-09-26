"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X, Globe, PhoneCall, ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("navHome") },
    { href: "/#nosotros", label: t("navAbout") },
    { href: "/#productos", label: t("navProducts") },
    { href: "/calidad-y-proceso", label: "Calidad y Proceso" },
    { href: "/aliados", label: "Aliados" },
    { href: "/contacto", label: "Contacto Comercial" }
  ];

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname === href) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-2 sm:py-2.5 bg-white/95 backdrop-blur-md shadow-sm border-b border-emerald-100/70"
          : "py-3 sm:py-4 bg-white/80 sm:bg-transparent backdrop-blur-xs sm:backdrop-blur-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Full Official Logo Image */}
          <Link
            href="/"
            className="flex items-center focus:outline-none transition-transform hover:scale-105"
          >
            <div className="relative w-40 sm:w-48 md:w-52 h-9 sm:h-11 md:h-12 flex items-center">
              <Image
                src="/images/logo-mundilacteos-full.png"
                alt="MundiLácteos"
                fill
                sizes="(max-width: 768px) 160px, 210px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/85 px-4 py-1.5 rounded-full border border-emerald-100 shadow-xs backdrop-blur-md">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all ${
                  isActive(link.href)
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-slate-700 hover:text-emerald-700 hover:bg-emerald-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Cluster: Language Switcher + CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Switcher Button (ES / EN) */}
            <div className="flex items-center bg-emerald-50/90 border border-emerald-200/80 rounded-full p-0.5 text-xs font-bold text-slate-700">
              <button
                type="button"
                onClick={() => setLanguage("es")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all cursor-pointer ${
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
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  language === "en"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-emerald-900 hover:text-emerald-700"
                }`}
                title="Switch to English"
              >
                <span>EN</span>
              </button>
            </div>

            {/* Link to Contacto Comercial */}
            <Link
              href="/contacto"
              className="px-4 py-2 text-xs font-bold tracking-wide uppercase bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-full shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{t("navQuoteCTA")}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile menu hamburger button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className="p-1 px-2 rounded-full border border-emerald-200 text-[11px] font-bold text-emerald-800 bg-white"
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
          <div className="lg:hidden mt-3 p-4 bg-white/95 backdrop-blur-lg rounded-2xl border border-emerald-100 shadow-xl space-y-2 animate-in fade-in slide-in-from-top-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 text-sm font-semibold rounded-xl ${
                  isActive(link.href)
                    ? "bg-emerald-600 text-white"
                    : "text-slate-700 hover:text-emerald-700 hover:bg-emerald-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a
                href={`tel:${siteConfig.company.contact.phoneMain.replace(/\s+/g, "")}`}
                className="flex items-center gap-2 text-xs font-medium text-emerald-800 px-3 py-1"
              >
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <span>{siteConfig.company.contact.phoneMain}</span>
              </a>
              <Link
                href="/contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-xs font-bold uppercase bg-emerald-600 text-white rounded-xl shadow-md"
              >
                {t("navQuoteCTA")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
