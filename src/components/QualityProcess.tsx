"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/config/site";
import { ShieldCheck, Award, Snowflake, Layers, CheckCircle2 } from "lucide-react";

export const QualityProcess: React.FC = () => {
  const { t } = useLanguage();

  const standards = [
    {
      code: "ISO 9001:2015",
      title: "Sistema de Gestión de la Calidad",
      desc: "Procesos estandarizados en acopio, control bromatológico, deshidratación, empaque y distribución final."
    },
    {
      code: "REGISTRO INVIMA",
      title: "Conformidad Sanitaria Total",
      desc: "Vigilancia y registro sanitario oficial para la producción y comercialización de leche en polvo y derivados en Colombia."
    },
    {
      code: "BARRERA CO2",
      title: "Atmósfera Modificada en Empaque",
      desc: "Laminación de 3 películas (polipropileno mate + BOPP metalizado) que previene la oxidación y mantiene 12 meses de vida útil."
    }
  ];

  return (
    <section id="calidad" className="py-24 bg-[#FAF9F5] border-t border-b border-emerald-100/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Certificaciones y Estándares</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Compromiso con la Calidad Inocua
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Solo utilizamos afirmaciones respaldadas por nuestros procesos reales de planta y certificaciones oficiales colombianas.
          </p>
        </div>

        {/* Quality Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {standards.map((s, idx) => (
            <div
              key={s.code}
              className="p-8 rounded-3xl bg-white border border-emerald-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 mb-6">
                  {s.code}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verificado en Planta Cartagena</span>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Packaging Matrix Table (Section from mundilacteos.com) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {t("matrixTitle")}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {t("matrixSubtitle")}
              </p>
            </div>
            <span className="self-start md:self-auto px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              Vida Útil: 12 Meses en Toda la Línea
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700 border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500 font-bold">
                  <th className="py-3 px-4 rounded-l-lg">{t("weightCol")}</th>
                  <th className="py-3 px-4">{t("unitsCol")}</th>
                  <th className="py-3 px-4 rounded-r-lg">{t("targetCol")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {siteConfig.packingMatrix.map((item, idx) => (
                  <tr key={idx} className="hover:bg-emerald-50/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{item.weight}</td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-emerald-700">
                      {item.unitsPerPack} unidades
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{item.target}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
