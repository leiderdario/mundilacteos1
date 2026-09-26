"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/config/site";
import { Globe, MapPin, Phone, Mail, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info with Official Company Logo */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center">
              <div className="relative w-48 sm:w-56 h-12 bg-white/95 rounded-2xl px-3 py-1 flex items-center shadow-md">
                <Image
                  src="/images/logo-mundilacteos-full.png"
                  alt="MundiLácteos"
                  fill
                  className="object-contain p-1.5"
                />
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {siteConfig.company.slogan[language] || siteConfig.company.slogan.es}
            </p>

            {/* Social Media */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.company.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:bg-slate-700 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={siteConfig.company.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:bg-slate-700 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.889C10.667 0 9 1.667 9 4.667V8z" />
                </svg>
              </a>
              <a
                href={siteConfig.company.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:bg-slate-700 transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Dedicated Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Navegación</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/" className="hover:text-emerald-400 transition-colors">{t("navHome")}</Link></li>
              <li><Link href="/#nosotros" className="hover:text-emerald-400 transition-colors">{t("navAbout")}</Link></li>
              <li><Link href="/#productos" className="hover:text-emerald-400 transition-colors">{t("navProducts")}</Link></li>
              <li><Link href="/calidad-y-proceso" className="hover:text-emerald-400 transition-colors">Calidad y Proceso</Link></li>
              <li><Link href="/aliados" className="hover:text-emerald-400 transition-colors">Aliados Comerciales</Link></li>
              <li><Link href="/contacto" className="hover:text-emerald-400 transition-colors">Contacto Comercial</Link></li>
            </ul>
          </div>

          {/* Product Lines */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Líneas de Producción</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>The Cántaro — Leche Entera en Polvo</li>
              <li>The Cántaro — Leche en Polvo Azucarada</li>
              <li>La Becerrita — Leche en Polvo Entera</li>
              <li>Bultos Industriales Kraft (5kg, 12.5kg, 25kg)</li>
              <li>Presentaciones individuales (27g a 1000g)</li>
            </ul>
          </div>

          {/* Plant & Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Contacto Directo</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{siteConfig.company.address.full}, Cartagena, Colombia</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{siteConfig.company.contact.phoneMain}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{siteConfig.company.contact.email}</span>
              </div>
            </div>

            {/* Language switch quick link */}
            <div className="pt-3 flex items-center gap-2 text-xs text-slate-400">
              <Globe className="w-3.5 h-3.5 text-emerald-500" />
              <span>Idioma:</span>
              <button
                type="button"
                onClick={() => setLanguage("es")}
                className={`hover:text-white cursor-pointer ${language === "es" ? "text-emerald-400 font-bold" : ""}`}
              >
                Español
              </button>
              <span>/</span>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`hover:text-white cursor-pointer ${language === "en" ? "text-emerald-400 font-bold" : ""}`}
              >
                English
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} {siteConfig.company.legalName}. {t("footerRights")}.</p>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Certificado ISO 9001:2015 & Registro INVIMA Colombia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
