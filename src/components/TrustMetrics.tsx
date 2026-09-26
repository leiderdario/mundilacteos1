"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import { Award, ShieldCheck, Users, Building } from "lucide-react";

export const TrustMetrics: React.FC = () => {
  const metrics = [
    {
      icon: Building,
      value: `${siteConfig.company.yearsInMarket}+ Años`,
      label: "Trayectoria en el Mercado",
      detail: "Desde 2012 en Cartagena"
    },
    {
      icon: Users,
      value: siteConfig.company.satisfiedClients,
      label: "Clientes Satisfechos",
      detail: "Hogares y Comercios B2B"
    },
    {
      icon: ShieldCheck,
      value: "ISO 9001:2015",
      label: "Calidad Certificada",
      detail: "Inocuidad & Trazabilidad"
    },
    {
      icon: Award,
      value: "INVIMA",
      label: "Registro Sanitario",
      detail: "Normativa Nacional Vigente"
    }
  ];

  return (
    <section className="relative z-20 -mt-6 sm:-mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-emerald-100 shadow-xl shadow-slate-900/5 p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 divide-y-0">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex flex-col items-center sm:items-start text-center sm:text-left ${
                  idx > 0 ? "sm:border-l sm:border-slate-100 sm:pl-6" : ""
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                  <div className="p-1.5 sm:p-2 rounded-xl bg-emerald-50 text-emerald-700">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-none">
                    {item.value}
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800">
                  {item.label}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-500 font-medium hidden sm:inline">
                  {item.detail}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
