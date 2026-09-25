"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLanguage } from "@/context/LanguageContext";
import { submitLead, LeadData } from "@/services/crm";
import { siteConfig } from "@/config/site";
import { Send, CheckCircle2, AlertCircle, Phone, Mail, MapPin, Loader2, MessageSquare } from "lucide-react";
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

export const ContactCRM: React.FC = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      inquiryType: "wholesale",
      fullName: "",
      company: "",
      email: "",
      phone: "",
      message: ""
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await submitLead(data as LeadData);
      if (response.success) {
        setIsSuccess(true);
        reset();
        // Fire celebration confetti
        try {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.7 }
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
    <section id="contacto" className="py-24 bg-[#FAF9F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Commercial Contact & Plant Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>Atención Comercial y Cotizaciones</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {t("contactTitle")}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                {t("contactSubtitle")}
              </p>
            </div>

            {/* Direct Cards */}
            <div className="space-y-4">
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
                  <p className="text-xs text-emerald-700 font-medium">Respuesta inmediata en horario hábil</p>
                </div>
              </a>

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

              <div className="p-5 rounded-2xl bg-white border border-emerald-100 shadow-xs flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-400">Planta Principal</h4>
                  <p className="text-sm font-semibold text-slate-800 leading-snug">
                    {siteConfig.company.address.full}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Cartagena, Colombia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Form with React Hook Form + Zod */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-xl relative">
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
                  className="mt-6 px-6 py-2.5 rounded-full bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-emerald-700 transition-colors"
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
                    placeholder="Escribe el volumen requerido, ciudad de entrega o marcas de tu interés..."
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
                  className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
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
        </div>
      </div>
    </section>
  );
};
