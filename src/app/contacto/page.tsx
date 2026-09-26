"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { submitLead, LeadData } from "@/services/crm";
import { siteConfig } from "@/config/site";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Loader2,
  MessageSquare,
  Clock,
  ShieldCheck,
  Building2,
  Truck,
  Sparkles,
  HelpCircle
} from "lucide-react";
import confetti from "canvas-confetti";

const contactSchema = z.object({
  fullName: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  company: z.string().min(2, "Por favor indica tu empresa o negocio"),
  email: z.string().email("Ingresa un correo electrónico válido"),
  phone: z.string().min(7, "Ingresa un número telefónico de contacto"),
  inquiryType: z.enum(["wholesale", "industrial", "retail", "general"]),
  message: z.string().min(10, "Cuéntanos brevemente sobre tu requerimiento (mínimo 10 caracteres)")
});

type ContactFormData = z.infer<typeof contactSchema>;

function ContactFormInner() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const initialProduct = searchParams.get("producto") || "";

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      inquiryType: initialProduct.toLowerCase().includes("kraft") || initialProduct.toLowerCase().includes("bulto")
        ? "industrial"
        : "wholesale",
      fullName: "",
      company: "",
      email: "",
      phone: "",
      message: initialProduct
        ? `Hola, me interesa recibir cotización formal para el producto: ${initialProduct}.`
        : ""
    }
  });

  useEffect(() => {
    if (initialProduct) {
      setValue("message", `Hola, me interesa recibir cotización formal para el producto: ${initialProduct}.`);
    }
  }, [initialProduct, setValue]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await submitLead(data as LeadData);
      if (response.success) {
        setIsSuccess(true);
        reset();
        try {
          confetti({
            particleCount: 70,
            spread: 80,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore confetti if not loaded
        }
      } else {
        setErrorMessage(response.message || "Ocurrió un error al enviar el formulario.");
      }
    } catch {
      setErrorMessage("No pudimos conectar con el servidor comercial. Intenta nuevamente o contáctanos por WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-xl relative">
      {initialProduct && (
        <div className="mb-6 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs font-bold text-emerald-900">
          <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Producto seleccionado: <strong>{initialProduct}</strong></span>
        </div>
      )}

      {isSuccess ? (
        <div className="py-12 px-4 text-center space-y-4 animate-in fade-in zoom-in-95 duration-500">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">
            {t("formSuccessTitle")}
          </h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            {t("formSuccessDesc")}
          </p>
          <button
            type="button"
            onClick={() => setIsSuccess(false)}
            className="mt-6 px-6 py-2.5 rounded-full bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-emerald-700 transition-colors cursor-pointer"
          >
            Enviar otra consulta
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          {errorMessage && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                {t("formName")} *
              </label>
              <input
                type="text"
                {...register("fullName")}
                placeholder="Ej. Carlos Mendoza"
                className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
                  errors.fullName ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-emerald-600"
                }`}
              />
              {errors.fullName && (
                <span className="text-[11px] text-red-500 font-medium mt-1 block">
                  {errors.fullName.message}
                </span>
              )}
            </div>

            {/* Company */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                {t("formCompany")} *
              </label>
              <input
                type="text"
                {...register("company")}
                placeholder="Ej. Distribuidora El Caribe S.A.S"
                className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
                  errors.company ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-emerald-600"
                }`}
              />
              {errors.company && (
                <span className="text-[11px] text-red-500 font-medium mt-1 block">
                  {errors.company.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                {t("formEmail")} *
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="correo@empresa.com"
                className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
                  errors.email ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-emerald-600"
                }`}
              />
              {errors.email && (
                <span className="text-[11px] text-red-500 font-medium mt-1 block">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                {t("formPhone")} *
              </label>
              <input
                type="tel"
                {...register("phone")}
                placeholder="+57 300 000 0000"
                className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
                  errors.phone ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-emerald-600"
                }`}
              />
              {errors.phone && (
                <span className="text-[11px] text-red-500 font-medium mt-1 block">
                  {errors.phone.message}
                </span>
              )}
            </div>
          </div>

          {/* Inquiry Type */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
              {t("formType")}
            </label>
            <select
              {...register("inquiryType")}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50/50 focus:bg-white focus:border-emerald-600 focus:outline-none transition-all"
            >
              <option value="wholesale">{t("formTypeWholesale")}</option>
              <option value="industrial">{t("formTypeIndustrial")}</option>
              <option value="retail">{t("formTypeRetail")}</option>
              <option value="general">{t("formTypeGeneral")}</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
              {t("formMessage")} *
            </label>
            <textarea
              id="form-message"
              rows={4}
              {...register("message")}
              placeholder="Escribe el volumen estimado, ciudad de destino o productos de tu interés..."
              className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none transition-all resize-none ${
                errors.message ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-emerald-600"
              }`}
            />
            {errors.message && (
              <span className="text-[11px] text-red-500 font-medium mt-1 block">
                {errors.message.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{t("formSubmitting")}</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>{t("formSubmit")}</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-slate-900 flex flex-col justify-between">
      {/* Navbar */}
      <Navbar />

      <main className="flex-grow pt-28 sm:pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Title Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black uppercase tracking-wider mb-4 border border-emerald-300 shadow-xs">
              <MessageSquare className="w-4 h-4 text-emerald-700" />
              <span>Canal Institucional & Ventas Corporativas</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              Solicitud de Cotización y <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-700">
                Atención Comercial Directa
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mt-4 leading-relaxed">
              Atención prioritaria para distribuidores, supermercados e industrias de alimentos. Cotizaciones con escala por volumen y despacho nacional desde Cartagena.
            </p>

            {/* SLA Response Guarantee */}
            <div className="inline-flex items-center gap-2 mt-4 px-3.5 py-1 rounded-full bg-white border border-emerald-200 text-xs font-bold text-emerald-800 shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tiempo promedio de respuesta: Menos de 2 horas hábiles</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            {/* Left Column: Direct Commercial Contact & Plant Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-4">
                {/* WhatsApp Direct Connect */}
                <a
                  href={`https://wa.me/${siteConfig.company.contact.whatsapp}?text=Hola,%20quisiera%20cotizar%20productos%20Mundilacteos`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-white border border-emerald-100 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-slate-400">Línea Directa / WhatsApp</h4>
                    <p className="text-base font-bold text-slate-900">{siteConfig.company.contact.phoneMain}</p>
                    <p className="text-xs text-emerald-700 font-medium">Respuesta inmediata en horario comercial</p>
                  </div>
                </a>

                {/* Email Direct */}
                <a
                  href={`mailto:${siteConfig.company.contact.email}`}
                  className="p-5 rounded-2xl bg-white border border-emerald-100 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-slate-400">Correo Corporativo</h4>
                    <p className="text-base font-bold text-slate-900">{siteConfig.company.contact.email}</p>
                    <p className="text-xs text-slate-500 font-medium">Cotizaciones y licitaciones formales</p>
                  </div>
                </a>

                {/* Plant Location */}
                <div className="p-5 rounded-2xl bg-white border border-emerald-100 shadow-xs flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-slate-400">Planta Principal & Bodega</h4>
                    <p className="text-sm font-semibold text-slate-800 leading-snug">
                      {siteConfig.company.address.full}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">Cartagena, Colombia</p>
                  </div>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="p-6 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-emerald-950 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Condiciones Comerciales Mundilácteos</span>
                </h4>
                <ul className="space-y-2 text-xs text-emerald-900">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Facturación electrónica DIAN inmediata</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Certificado de análisis bromatológico por lote</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Despacho consolidado con stretch film y tarimas</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Dynamic Form wrapped in Suspense for searchParams */}
            <div className="lg:col-span-7">
              <Suspense fallback={<div className="p-12 text-center text-slate-400">Cargando formulario comercial...</div>}>
                <ContactFormInner />
              </Suspense>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
