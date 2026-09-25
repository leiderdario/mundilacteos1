"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "es" | "en";

interface Translations {
  [key: string]: {
    es: string;
    en: string;
  };
}

export const translations: Translations = {
  // Nav
  navHome: { es: "Inicio", en: "Home" },
  navAbout: { es: "Nosotros", en: "About Us" },
  navProducts: { es: "Productos", en: "Products" },
  navQuality: { es: "Calidad & Proceso", en: "Quality & Process" },
  navClients: { es: "Aliados", en: "Partners" },
  navContact: { es: "Contacto Comercial", en: "Commercial Contact" },
  navQuoteCTA: { es: "Cotizar Ahora", en: "Request a Quote" },

  // Hero
  heroPre: { es: "EXPERIENCIA LÁCTEA DIGITAL • DESDE 2012", en: "DIGITAL DAIRY EXPERIENCE • SINCE 2012" },
  heroTitle1: { es: "LO QUE NOS UNE", en: "WHAT UNITES US" },
  heroTitle2: { es: "ES LA PUREZA.", en: "IS PURE ESSENCE." },
  heroSubtitle: {
    es: "Más de 12 años liderando la producción y distribución de leche en polvo en Colombia con calidad certificada ISO 9001:2015, frescura innegociable y los mejores precios del mercado.",
    en: "Over 12 years leading the production and distribution of whole milk powder in Colombia with ISO 9001:2015 certified quality, unmatched freshness, and competitive market pricing."
  },
  heroExploreBtn: { es: "Explorar Experiencia", en: "Explore Experience" },
  heroContactBtn: { es: "Hablar con un Asesor", en: "Talk to an Advisor" },
  heroScrollHint: { es: "Desliza para descubrir el viaje lácteo", en: "Scroll down to discover the dairy journey" },
  heroInteractiveBadge: { es: "Interactúa con el empaque 3D", en: "Interact with 3D packaging" },

  // Stats
  statYears: { es: "Años en el Mercado", en: "Years in Market" },
  statClients: { es: "Clientes Satisfechos", en: "Satisfied Customers" },
  statIso: { es: "Certificación de Calidad", en: "Quality Certification" },
  statCoverage: { es: "Cobertura Nacional", en: "Nationwide Coverage" },

  // Milk Showcase
  milkPouchTitle: { es: "El Protagonista: La Leche", en: "The Hero: Pure Milk" },
  milkPouchSubtitle: {
    es: "Cada gramo de nuestra leche en polvo entera condensa el esfuerzo del campo caribeño y los más altos estándares tecnológicos de deshidratación alimentaria.",
    en: "Every single gram of our whole milk powder encapsulates the dedication of Colombian farmers and top-tier dehydration technology."
  },
  milkBenefit1Title: { es: "100% Solubilidad Instantánea", en: "100% Instant Solubility" },
  milkBenefit1Desc: { es: "Disolución uniforme sin sedimentos ni grumos tanto en frío como en caliente.", en: "Smooth dissolution without lumps or residue in both cold and hot preparations." },
  milkBenefit2Title: { es: "Atmósfera Modificada de CO2", en: "CO2 Modified Atmosphere" },
  milkBenefit2Desc: { es: "Sellado trilaminado hermético que garantiza 12 meses de frescura sin conservantes dañinos.", en: "Tri-laminated hermetic seal guaranteeing 12 months shelf-life without harsh preservatives." },
  milkBenefit3Title: { es: "Cadena de Frío y Control Riguroso", en: "Strict Cold Chain & Quality Control" },
  milkBenefit3Desc: { es: "Desde el acopio hasta la entrega final garantizamos la estabilidad físico-química del producto.", en: "From farm milk collection to final dispatch, we ensure strict physical-chemical stability." },

  // Horizontal Products
  productsTitle: { es: "NUESTRO CATÁLOGO DE PRODUCTOS", en: "OUR PRODUCT CATALOG" },
  productsSubtitle: {
    es: "Desliza verticalmente para navegar por nuestras marcas insignias: The Cántaro y La Becerrita.",
    en: "Scroll vertically to navigate across our flagship brands: The Cántaro and La Becerrita."
  },
  viewPresentations: { es: "Ver Presentaciones", en: "View Formats" },
  shelfLifeLabel: { es: "Vida Útil:", en: "Shelf Life:" },
  packagingLabel: { es: "Empaque:", en: "Packaging:" },
  quoteProductBtn: { es: "Cotizar este Producto", en: "Quote this Product" },

  // Story
  storyBadge: { es: "NUESTRA IDENTIDAD", en: "OUR IDENTITY" },
  storyTitle: { es: "De un sueño familiar en Cartagena a la mesa de toda Colombia", en: "From a family vision in Cartagena to tables across Colombia" },
  storyP1: {
    es: "Mundilácteos nació gracias a la visión de nuestro fundador, quien identificó la necesidad en el mercado de una distribución y venta confiable de leche en polvo accesible, nutritiva y de alta pureza en la Región Caribe.",
    en: "Mundilácteos was born out of our founder's vision, recognizing the market need for a dependable, nutritious, and accessible whole milk powder supply across the Caribbean Region."
  },
  storyP2: {
    es: "Hoy somos una compañía familiar consolidada en el Parque Industrial Europark Cartagena, orgullosa de su equipo de colaboradores que día tras día entregan su compromiso para superar las expectativas de más de 869,000 clientes y grandes cadenas aliadas.",
    en: "Today we stand as a consolidated family enterprise based in Europark Industrial Park Cartagena, proud of a dedicated workforce that天天 delivers excellence to over 869,000 clients and national chains."
  },

  // Packaging Matrix
  matrixTitle: { es: "Capacidad de Embalaje y Distribución", en: "Packaging & Packing Capacity" },
  matrixSubtitle: { es: "Especificaciones exactas de embalaje por paca y bulto para distribuidores y mayoristas.", en: "Exact packing specifications per case and bulk sacks for distributors and wholesalers." },
  weightCol: { es: "Gramaje", en: "Unit Weight" },
  unitsCol: { es: "Unidades por Paca", en: "Units per Pack" },
  targetCol: { es: "Canal Sugerido", en: "Target Channel" },

  // Partners
  partnersTitle: { es: "Empresas que Confían en Nuestra Calidad", en: "Enterprises that Trust Our Quality" },
  partnersSubtitle: { es: "Grandes cadenas de supermercados, restaurantes y distribuidoras certifican nuestro servicio.", en: "Major supermarket chains, restaurants, and distributors vouch for our dependable service." },

  // Contact / CRM
  contactTitle: { es: "Hablemos de Negocios", en: "Let's Talk Business" },
  contactSubtitle: {
    es: "Completa el formulario para recibir asesoría personalizada, listas de precios al por mayor o muestras de producto para tu empresa.",
    en: "Complete the form to receive personalized consulting, wholesale price lists, or product samples for your business."
  },
  formName: { es: "Nombre Completo", en: "Full Name" },
  formCompany: { es: "Empresa / Razón Social", en: "Company / Business Name" },
  formEmail: { es: "Correo Electrónico", en: "Corporate Email" },
  formPhone: { es: "Teléfono / WhatsApp", en: "Phone / WhatsApp" },
  formType: { es: "Tipo de Consulta", en: "Inquiry Type" },
  formTypeWholesale: { es: "Distribución Mayorista", en: "Wholesale Distribution" },
  formTypeIndustrial: { es: "Línea Industrial (Bultos 25kg)", en: "Industrial Bulk (25kg Sacks)" },
  formTypeRetail: { es: "Supermercados / Retail", en: "Supermarkets / Retail" },
  formTypeGeneral: { es: "Consulta General / Otros", en: "General Inquiry / Other" },
  formMessage: { es: "Detalles del requerimiento o volumen estimado", en: "Requirement details or estimated volume" },
  formSubmit: { es: "Enviar Solicitud Comercial", en: "Submit Commercial Inquiry" },
  formSubmitting: { es: "Procesando solicitud...", en: "Submitting inquiry..." },
  formSuccessTitle: { es: "¡Solicitud Recibida con Éxito!", en: "Inquiry Successfully Received!" },
  formSuccessDesc: { es: "Uno de nuestros asesores comerciales se pondrá en contacto en menos de 24 horas hábiles.", en: "One of our commercial advisors will get in touch with you within 24 business hours." },

  // Footer
  footerRights: { es: "Todos los derechos reservados. Inversiones Mundilácteos S.A.S", en: "All rights reserved. Inversiones Mundilácteos S.A.S" },
  footerLocation: { es: "Cartagena de Indias, Colombia", en: "Cartagena de Indias, Colombia" }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "es",
  setLanguage: () => {},
  t: (key: string) => key
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("es");

  useEffect(() => {
    const saved = localStorage.getItem("mundilacteos_lang") as Language;
    if (saved === "es" || saved === "en") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("mundilacteos_lang", lang);
  };

  const t = (key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[language] || entry.es;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
