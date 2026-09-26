"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/config/site";
import {
  ShieldCheck,
  Award,
  Layers,
  CheckCircle2,
  Wind,
  Thermometer,
  Microscope,
  FileCheck,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Sliders,
  Package,
  Activity,
  Boxes,
  Check
} from "lucide-react";

export default function QualityProcessPage() {
  const { language, t } = useLanguage();

  // State for 3D Layer Exploder Simulation
  const [explodedLayer, setExplodedLayer] = useState<number>(0);
  const [activeStage, setActiveStage] = useState<number>(0);

  // State for Interactive Quality Parameters Simulator
  const [simTemp, setSimTemp] = useState<number>(4);
  const [simCO2, setSimCO2] = useState<number>(98);
  const [simHumidity, setSimHumidity] = useState<number>(3.1);

  // State for Batch Verification
  const [selectedBatch, setSelectedBatch] = useState<string>("ML-2026-092");

  // State for Packing Calculator
  const [calcPresentation, setCalcPresentation] = useState<string>("400g");
  const [calcUnits, setCalcUnits] = useState<number>(1200);

  const packagingLayers = [
    {
      id: 0,
      name: "Capa Exterior: BOPP Cristal + Impresión HD",
      thickness: "20 Micras",
      barrier: "Barrera UV & Resistencia Mecánica",
      color: "from-emerald-600 to-teal-700",
      description:
        "Película de polipropileno biorientado de alta densidad con acabado brillo. Protege la bolsa contra roces en transporte y bloquea la degradación por radiación ultravioleta."
    },
    {
      id: 1,
      name: "Capa Media: Lámina Metalizada de Alta Barrera",
      thickness: "12 Micras",
      barrier: "Impermeabilidad Total a Oxígeno y Luz",
      color: "from-slate-400 to-slate-600",
      description:
        "Matriz metalizada al vacío con tasa de transmisión de oxígeno < 0.5 cm³/m²·día. Impide la oxidación de las grasas lácteas y garantiza sabor fresco por 12 meses."
    },
    {
      id: 2,
      name: "Capa Interior: Polietileno Virgen + Atmósfera CO2",
      thickness: "45 Micras",
      barrier: "Grado Alimentario e Inyección de Gas Inerte",
      color: "from-emerald-400 to-emerald-200",
      description:
        "Polietileno de baja densidad aprobado por FDA e INVIMA. Termosellado hermético dosificado con microatmósfera de CO2 que desaloja el 98% del oxígeno residual."
    }
  ];

  const processStages = [
    {
      id: 0,
      tag: "Fase 01",
      title: "Acopio y Crioscopia en Origen",
      subtitle: "Inspección rigurosa de leche fresca pura de vaca",
      icon: Thermometer,
      stats: [
        { label: "Acidez", val: "15° - 17° Dornic" },
        { label: "Densidad", val: "1.029 - 1.032 g/ml" },
        { label: "Temperatura Acopio", val: "< 4.0 °C" }
      ],
      description:
        "La leche proviene de ganaderías seleccionadas del Caribe colombiano. En cada camión cisterna refrigerado se analizan parámetros de acidez, ausencia de antibióticos y pureza bacteriológica antes del descargue."
    },
    {
      id: 1,
      tag: "Fase 02",
      title: "Pasteurización y Evaporación",
      subtitle: "Tratamiento térmico HTST con retención de nutrientes",
      icon: Activity,
      stats: [
        { label: "Pasteurización", val: "72°C x 15 seg" },
        { label: "Sólidos Totales", val: "Concentración a 48%" },
        { label: "Retención Proteica", val: "99.2%" }
      ],
      description:
        "Eliminación total de microorganismos patógenos mientras se salvaguardan intactas las proteínas de suero, el calcio biológico y las vitaminas naturales mediante evaporadores al vacío de múltiple efecto."
    },
    {
      id: 2,
      tag: "Fase 03",
      title: "Secado por Aspersión (Spray Dryer)",
      subtitle: "Atomización instantánea en cámara de aire caliente",
      icon: Wind,
      stats: [
        { label: "Temp. Entrada", val: "185 °C" },
        { label: "Temp. Salida", val: "85 °C" },
        { label: "Solubilidad Final", val: "99.8% instantánea" }
      ],
      description:
        "La leche concentrada se pulveriza a través de toberas de alta presión en microgotas dentro de la torre de aspersión. En milisegundos se evapora la humedad, resultando en un polvo suave y de solubilidad perfecta."
    },
    {
      id: 3,
      tag: "Fase 04",
      title: "Control Lote a Lote en Laboratorio",
      subtitle: "Auditoría bromatológica y microbiológica bajo ISO 9001",
      icon: Microscope,
      stats: [
        { label: "Grasa Láctea", val: "≥ 26.0%" },
        { label: "Proteína", val: "≥ 24.5%" },
        { label: "Humedad", val: "≤ 3.5%" }
      ],
      description:
        "Nuestro laboratorio interno en Europark Cartagena analiza muestras representativas de cada lote producido. No se libera ningún empaque al mercado sin el dictamen favorable de inocuidad microbiológica."
    },
    {
      id: 4,
      tag: "Fase 05",
      title: "Envasado con Atmósfera CO2 y Despacho",
      subtitle: "Termosellado de alta barrera y despacho nacional",
      icon: Boxes,
      stats: [
        { label: "Oxígeno Residual", val: "< 1.5%" },
        { label: "Vida Útil", val: "12 Meses" },
        { label: "Trazabilidad", val: "Código QR / Lote" }
      ],
      description:
        "Líneas automatizadas de empaque inyectan dióxido de carbono de grado alimenticio inmediatamente antes del sellado térmico. Los paquetes se consolidan en pacas o bultos Kraft listos para despacho en todo el país."
    }
  ];

  const batchesData: Record<string, { product: string; date: string; fat: string; protein: string; moisture: string; status: string }> = {
    "ML-2026-092": {
      product: "The Cántaro Entera 400g",
      date: "Septiembre 2026",
      fat: "26.4%",
      protein: "25.1%",
      moisture: "3.2%",
      status: "Conforme • Lote Aprobado"
    },
    "TC-2026-088": {
      product: "The Cántaro Azucarada 380g",
      date: "Agosto 2026",
      fat: "18.2%",
      protein: "16.8%",
      moisture: "2.9%",
      status: "Conforme • Lote Aprobado"
    },
    "BK-2026-095": {
      product: "Saco Industrial Kraft 25kg",
      date: "Septiembre 2026",
      fat: "26.8%",
      protein: "24.9%",
      moisture: "3.1%",
      status: "Conforme • Lote Aprobado"
    }
  };

  const currentBatchInfo = batchesData[selectedBatch] || batchesData["ML-2026-092"];

  // Calculate packs and pallets
  const matchedMatrix = siteConfig.packingMatrix.find((m) => m.weight.includes(calcPresentation)) || siteConfig.packingMatrix[4];
  const totalPacks = Math.ceil(calcUnits / matchedMatrix.unitsPerPack);
  const totalPallets = Math.max(1, Math.ceil(totalPacks / 48));

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-slate-900 flex flex-col justify-between">
      {/* Navbar with active route highlighting */}
      <Navbar />

      <main className="flex-grow pt-28 sm:pt-32 pb-20">
        {/* Hero Title Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black uppercase tracking-wider mb-4 border border-emerald-300 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Garantía de Inocuidad & Certificación ISO 9001:2015</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
            Estándares de Excelencia: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-700">
              Del Tambo al Empaque de Alta Barrera
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mt-4 leading-relaxed">
            Conoce de manera interactiva la ciencia detrás de la pureza de Mundilácteos: tecnología de deshidratación por aspersión, atmósfera modificada de CO2 y control microbiológico certificado.
          </p>
        </section>

        {/* 1. Macro-Interaction: 3D Trilaminated Packaging Layer Exploder */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-200/80 shadow-xl overflow-hidden relative">
            <div className="max-w-3xl mb-8">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Microtecnología de Barrera
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">
                Simulador 3D: Desglose de Capas Trilaminadas
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Selecciona cada capa protectora para examinar su composición molecular y función contra la luz, la humedad y el oxígeno.
              </p>
            </div>

            {/* Interactive Layer Visualizer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Visual 3D Layer Stacks */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#F7F9F6] to-white rounded-2xl border border-slate-200/80 relative min-h-[340px]">
                {/* Visual Layer Stacking Preview */}
                <div className="relative w-full max-w-xs h-64 flex items-center justify-center perspective-[800px]">
                  {packagingLayers.map((layer, index) => {
                    const isSelected = explodedLayer === index;
                    const offsetZ = isSelected ? 40 : index * -20;
                    const translateY = (index - 1) * 35 + (isSelected ? -10 : 0);

                    return (
                      <div
                        key={layer.id}
                        onClick={() => setExplodedLayer(index)}
                        style={{
                          transform: `translate3d(0, ${translateY}px, ${offsetZ}px) rotateX(25deg) rotateZ(-12deg)`,
                          transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
                        }}
                        className={`absolute w-56 h-36 rounded-2xl p-4 shadow-xl border-2 cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? "bg-gradient-to-r " + layer.color + " text-white border-white ring-4 ring-emerald-500/30 scale-105 z-30"
                            : "bg-white/85 text-slate-800 border-slate-200 hover:border-emerald-400 z-10 opacity-75 hover:opacity-100"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"}`}>
                            Capa 0{index + 1}
                          </span>
                          <span className="text-xs font-mono font-bold">{layer.thickness}</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold leading-tight">{layer.barrier}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-4">
                  Haz clic en las láminas para desglosarlas
                </span>
              </div>

              {/* Right Column: Layer Spec Details & Interactive Tabs */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex gap-2 pb-2 overflow-x-auto">
                  {packagingLayers.map((layer, index) => (
                    <button
                      key={layer.id}
                      onClick={() => setExplodedLayer(index)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex-shrink-0 ${
                        explodedLayer === index
                          ? "bg-emerald-700 text-white shadow-md scale-105"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      Capa 0{index + 1}: {layer.thickness}
                    </button>
                  ))}
                </div>

                <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-emerald-950">
                      {packagingLayers[explodedLayer].name}
                    </h3>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white text-emerald-800 border border-emerald-300 shadow-2xs">
                      {packagingLayers[explodedLayer].thickness}
                    </span>
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed">
                    {packagingLayers[explodedLayer].description}
                  </p>

                  <div className="pt-3 border-t border-emerald-200 flex flex-wrap items-center gap-4 text-xs font-semibold text-emerald-900">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{packagingLayers[explodedLayer].barrier}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Wind className="w-4 h-4 text-emerald-600" />
                      <span>Inocuidad Certificada</span>
                    </div>
                  </div>
                </div>

                {/* Micro-Interaction: Parameter Sliders */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Simulador de Preservación de Lote</span>
                    </h4>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      12 Meses Garantizados
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between mb-1 font-semibold text-slate-600">
                        <span>Pureza de Gas Inerte CO2 en Envasado:</span>
                        <span className="font-mono text-emerald-700">{simCO2}%</span>
                      </div>
                      <input
                        type="range"
                        min="90"
                        max="100"
                        value={simCO2}
                        onChange={(e) => setSimCO2(Number(e.target.value))}
                        className="w-full accent-emerald-600 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1 font-semibold text-slate-600">
                        <span>Humedad Residual en Polvo (Norma ≤ 3.5%):</span>
                        <span className="font-mono text-emerald-700">{simHumidity}%</span>
                      </div>
                      <input
                        type="range"
                        min="2.5"
                        max="3.5"
                        step="0.1"
                        value={simHumidity}
                        onChange={(e) => setSimHumidity(Number(e.target.value))}
                        className="w-full accent-emerald-600 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Interactive Stepper: The 5-Phase Pure Dairy Journey */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              Protocolo Industrial Paso a Paso
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              El Viaje de la Pureza: Del Origen al Cliente
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Explora las 5 etapas críticas donde aplicamos control termodinámico y microbiológico.
            </p>
          </div>

          {/* Stepper Navigation Pills */}
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 justify-start lg:justify-center no-scrollbar">
            {processStages.map((stage, idx) => (
              <button
                key={stage.id}
                onClick={() => setActiveStage(idx)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 flex-shrink-0 ${
                  activeStage === idx
                    ? "bg-emerald-700 text-white shadow-lg shadow-emerald-700/20 scale-105"
                    : "bg-white text-slate-700 border border-slate-200 hover:border-emerald-300"
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${activeStage === idx ? "bg-white text-emerald-800 font-black" : "bg-slate-100 text-slate-600"}`}>
                  {idx + 1}
                </span>
                <span>{stage.title.split(" ")[0]} {stage.title.split(" ")[1] || ""}</span>
              </button>
            ))}
          </div>

          {/* Active Stage Detailed Display */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-mono font-bold border border-emerald-200">
                <span>{processStages[activeStage].tag}</span>
                <span>•</span>
                <span>{processStages[activeStage].subtitle}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                {processStages[activeStage].title}
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {processStages[activeStage].description}
              </p>

              {/* Real Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100">
                {processStages[activeStage].stats.map((st, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">{st.label}</span>
                    <span className="text-sm sm:text-base font-black text-emerald-800 mt-0.5 block">{st.val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-tr from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between min-h-[280px]">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">
                  Garantía Operativa Mundilácteos
                </span>
                <h4 className="text-xl font-bold mt-2 text-white">
                  Auditoría de Inocuidad Permanente
                </h4>
                <p className="text-xs text-emerald-100 mt-2 leading-relaxed">
                  Todos los operadores de planta cuentan con carnet de manipulación de alimentos vigente y aplican Buenas Prácticas de Manufactura (BPM) certificadas.
                </p>
              </div>

              <div className="pt-4 border-t border-emerald-700/80 flex items-center justify-between text-xs text-emerald-200">
                <span className="flex items-center gap-1.5 font-bold">
                  <Check className="w-4 h-4 text-emerald-300" />
                  Registro INVIMA Vigente
                </span>
                <span className="font-mono font-bold text-white">ISO 9001:2015</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Interactive Lab Batch Verification & Technical Matrix */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Batch Verification Tool */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Microscope className="w-5 h-5 text-emerald-700" />
                <h3 className="text-lg font-bold text-slate-900">
                  Consulta de Análisis Bromatológico
                </h3>
              </div>

              <p className="text-xs text-slate-600 mb-4">
                Selecciona un lote de prueba para inspeccionar los resultados de laboratorio emitidos en planta Europark:
              </p>

              {/* Batch Selector Buttons */}
              <div className="flex flex-wrap gap-2 mb-6">
                {Object.keys(batchesData).map((batch) => (
                  <button
                    key={batch}
                    onClick={() => setSelectedBatch(batch)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      selectedBatch === batch
                        ? "bg-emerald-700 text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {batch}
                  </button>
                ))}
              </div>

              {/* Batch Certificate Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5 text-xs">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-semibold">Producto:</span>
                  <span className="font-bold text-slate-900">{currentBatchInfo.product}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-semibold">Materia Grasa:</span>
                  <span className="font-mono font-bold text-emerald-700">{currentBatchInfo.fat}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-semibold">Proteína Láctea:</span>
                  <span className="font-mono font-bold text-emerald-700">{currentBatchInfo.protein}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-semibold">Humedad:</span>
                  <span className="font-mono font-bold text-emerald-700">{currentBatchInfo.moisture}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500 font-semibold">Dictamen:</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {currentBatchInfo.status}
                  </span>
                </div>
              </div>
            </div>

            <Link
              href="/contacto"
              className="mt-6 w-full py-3 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border border-emerald-200 transition-colors"
            >
              <FileCheck className="w-4 h-4 text-emerald-700" />
              <span>Solicitar Ficha Técnica Oficial</span>
            </Link>
          </div>

          {/* Interactive Packaging Matrix & Yield Calculator */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  Calculadora de Cubicaje y Embalaje B2B
                </h3>
                <p className="text-xs text-slate-600">
                  Estima el número de pacas y pallets requeridos para tu orden institucional.
                </p>
              </div>
              <Package className="w-6 h-6 text-emerald-700" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                  Presentación:
                </label>
                <select
                  value={calcPresentation}
                  onChange={(e) => setCalcPresentation(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 font-medium focus:outline-none focus:border-emerald-600"
                >
                  <option value="27g">27g (Sobre individual)</option>
                  <option value="104g">104g (Formato tienda)</option>
                  <option value="200g">200g (Consumo familiar)</option>
                  <option value="380g">380g (Alta rotación)</option>
                  <option value="400g">400g (Estándar nacional)</option>
                  <option value="500g">500g (Familiar)</option>
                  <option value="900g">900g / 1000g (Institucional)</option>
                  <option value="5kg">5kg - 25kg (Bultos Kraft B2B)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                  Unidades Requeridas:
                </label>
                <input
                  type="number"
                  min="100"
                  step="100"
                  value={calcUnits}
                  onChange={(e) => setCalcUnits(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-slate-50 font-medium focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            {/* Output Estimates */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-center mb-6">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500">Unidades/Paca</span>
                <span className="text-base sm:text-lg font-black text-emerald-950 block mt-0.5">
                  {matchedMatrix.unitsPerPack}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500">Pacas Estimadas</span>
                <span className="text-base sm:text-lg font-black text-emerald-800 block mt-0.5">
                  {totalPacks}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500">Pallets Aprox.</span>
                <span className="text-base sm:text-lg font-black text-emerald-800 block mt-0.5">
                  {totalPallets}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>Canal sugerido: <strong className="text-emerald-900">{matchedMatrix.target}</strong></span>
              <Link
                href={`/contacto?producto=${encodeURIComponent("Cotización Volumen " + calcPresentation)}`}
                className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <span>Cotizar este volumen</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Conversion CTA Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-3xl p-8 sm:p-12 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-200">
                Atención Corporativa & Licitaciones
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold mt-1">
                ¿Necesitas muestras comerciales o auditoría técnica?
              </h3>
              <p className="text-sm text-emerald-100 mt-2 max-w-xl">
                Nuestro equipo de calidad y ventas despacha kits de muestra y certificados bromatológicos para clientes corporativos.
              </p>
            </div>

            <Link
              href="/contacto"
              className="px-8 py-4 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 font-black text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer"
            >
              <span>Ir a Contacto Comercial</span>
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
