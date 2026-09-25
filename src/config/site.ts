export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: "consumer" | "industrial" | "sweetened";
  image: string;
  badge: string;
  presentations: string[];
  packaging: string;
  shelfLife: string;
  description: {
    es: string;
    en: string;
  };
  features: {
    es: string[];
    en: string[];
  };
}

export interface ClientPartner {
  name: string;
  logo: string;
  type: string;
}

export const siteConfig = {
  company: {
    legalName: "Inversiones Mundilácteos S.A.S",
    brandName: "Mundilácteos",
    nit: "900.XXX.XXX-X",
    foundedYear: 2012,
    yearsInMarket: 12,
    satisfiedClients: "+869,000",
    slogan: {
      es: "Productores de leche en polvo y derivados con excelencia, calidad y confianza",
      en: "Producers of whole milk powder and dairy derivatives with excellence, quality and trust"
    },
    address: {
      full: "Km. 1 Vía Turbaco, Lote 2A – 2B, Parque Industrial Europark Cartagena R.P.H Bodega No. 28",
      city: "Cartagena",
      country: "Colombia"
    },
    contact: {
      phoneMain: "+57 319 7690990",
      phoneSecondary: "+57 311 4293448",
      whatsapp: "573197690990",
      email: "contacto@mundilacteos.com",
      salesEmail: "ventas@mundilacteos.com"
    },
    socials: {
      instagram: "https://www.instagram.com/mundilacteos/",
      facebook: "https://www.facebook.com/mundilacteos",
      youtube: "https://www.youtube.com"
    },
    certifications: [
      { code: "ISO 9001:2015", label: "Sistema de Gestión de Calidad Certificado" },
      { code: "INVIMA", label: "Registro Sanitario Vigente para Alimentos" },
      { code: "HACCP Ready", label: "Estándares Rigurosos de Inocuidad y Cadena de Frío" }
    ]
  },

  partners: [
    { name: "Supertiendas Olímpica", logo: "/images/cliente-olimpica.jpg", type: "Retail Nacional" },
    { name: "Megatiendas", logo: "/images/cliente-megatiendas.jpg", type: "Supermercados" },
    { name: "Mr. Bono", logo: "/images/cliente-mrbono.jpg", type: "Cadena de Alimentos" },
    { name: "GA Rosa", logo: "/images/cliente-garosa.jpg", type: "Industria y Distribución" },
    { name: "Rapimercar", logo: "/images/cliente-rapimercar.jpg", type: "Retail Regional" }
  ] as ClientPartner[],

  products: [
    {
      id: "the-cantaro-entera",
      name: "The Cántaro — Leche Entera en Polvo",
      tagline: "El sabor y nutrición tradicional del campo en cada vaso",
      category: "consumer",
      image: "/images/the-cantaro-doble.png",
      badge: "Líder en Ventas",
      presentations: ["27g", "104g", "200g", "380g", "400g", "500g", "750g", "800g", "900g", "1000g"],
      packaging: "Bolsa trilaminada termo-sellada con atmósfera controlada de CO2",
      shelfLife: "12 meses",
      description: {
        es: "Leche entera en polvo obtenida por deshidratación de leche fresca pasteurizada, conservando todos los nutrientes, proteínas y calcio natural. Ideal para hogares y comercios que buscan rendimiento insuperable y pureza láctea.",
        en: "Whole milk powder obtained by dehydrating fresh pasteurized milk, retaining all nutrients, proteins, and natural calcium. Ideal for households and businesses demanding superior yield and pure dairy flavor."
      },
      features: {
        es: [
          "100% Leche pura de vaca seleccionada",
          "Excelente solubilidad en frío y en caliente",
          "Sin conservantes artificiales dañinos",
          "Presentaciones desde porción individual hasta familiar"
        ],
        en: [
          "100% selected pure cow's milk",
          "Superior solubility in cold and warm water",
          "Free from harmful artificial preservatives",
          "Available from single-serve to family-sized packs"
        ]
      }
    },
    {
      id: "the-cantaro-azucarada",
      name: "The Cántaro — Leche Azucarada",
      tagline: "Dulzura perfecta y cremosidad inmediata para tus recetas",
      category: "sweetened",
      image: "/images/the-cantaro-3.png",
      badge: "Sabor Superior",
      presentations: ["380g", "400g", "500g", "900g"],
      packaging: "Empaque hermético de alta barrera con sellado térmico",
      shelfLife: "12 meses",
      description: {
        es: "Fórmula láctea endulzada en su punto exacto, diseñada para preparaciones instantáneas, batidos, repostería y bebidas con cuerpo cremoso y dulzor homogéneo.",
        en: "Sweetened dairy formula crafted to exact balance, ideal for instant smoothies, confectionery, desserts, and creamy beverages with uniform sweetness."
      },
      features: {
        es: [
          "Balance justo de sacarosa y sólidos lácteos",
          "Disolución suave sin grumos",
          "Textura sedosa para repostería y cafetería",
          "Ahorro de tiempo en cocina y preparación"
        ],
        en: [
          "Carefully balanced sucrose and dairy solids",
          "Smooth lump-free instant dissolution",
          "Silky texture for bakeries and coffee shops",
          "Saves preparation time in kitchens"
        ]
      }
    },
    {
      id: "la-becerrita",
      name: "La Becerrita — Leche en Polvo",
      tagline: "Economía, rendimiento y nutrición familiar garantizada",
      category: "consumer",
      image: "/images/la-becerrita.png",
      badge: "Mejor Relación Calidad-Precio",
      presentations: ["380g", "400g", "500g", "900g"],
      packaging: "Bolsa bilaminada de alta resistencia",
      shelfLife: "12 meses",
      description: {
        es: "Una de nuestras marcas más queridas en el Caribe y el país, formulada para ofrecer el máximo rendimiento por litro preparado a un precio accesible para todos los hogares y pequeños negocios.",
        en: "One of our most popular brands in the Colombian Caribbean and nationwide, created to offer maximum yield per prepared liter at an affordable price for families and small businesses."
      },
      features: {
        es: [
          "Máximo rendimiento en dilución",
          "Fortificada con nutrientes esenciales",
          "Ideal para desayunos, avenas y jugos",
          "Presentación de alta rotación comercial"
        ],
        en: [
          "Maximum yield upon dilution",
          "Fortified with essential daily nutrients",
          "Great for breakfasts, oatmeal, and shakes",
          "High-turnover commercial staple"
        ]
      }
    },
    {
      id: "linea-bultos-industriales",
      name: "Línea Bultos Industriales (5kg, 12.5kg y 25kg)",
      tagline: "El aliado estratégico de la industria de alimentos y panificación",
      category: "industrial",
      image: "/images/bulto-industrial.png",
      badge: "Grado Industrial B2B",
      presentations: ["5kg", "12.5kg", "25kg"],
      packaging: "Polietileno de baja densidad + Papel Kraft triple capa exterior con barrera BOOP y atmósfera CO2",
      shelfLife: "12 meses",
      description: {
        es: "Suministro masivo para procesadores de alimentos, panificadoras, heladerías, dulcerías y distribuidores mayoristas. Empaque de triple barrera que preserva la frescura organoléptica en cualquier clima.",
        en: "Bulk supply for food processors, bakeries, ice cream factories, confectioners, and wholesale distributors. Triple-barrier packaging preserving fresh organoleptic qualities across any climate."
      },
      features: {
        es: [
          "Triple protección física y biológica",
          "Sellabilidad a alta temperatura dosificada",
          "Trazabilidad por lote con certificado de calidad",
          "Despachos directos desde bodega Cartagena a todo el país"
        ],
        en: [
          "Triple physical and biological protection",
          "High-temperature hermetic sealing",
          "Full lot traceability with quality certificates",
          "Direct warehouse shipments from Cartagena nationwide"
        ]
      }
    }
  ] as Product[],

  packingMatrix: [
    { weight: "27g", unitsPerPack: 300, target: "Institucional / Venta al detal" },
    { weight: "104g", unitsPerPack: 100, target: "Tiendas de barrio / Supermercados" },
    { weight: "200g", unitsPerPack: 60, target: "Consumo familiar semanal" },
    { weight: "380g", unitsPerPack: 30, target: "Alta rotación autoservicios" },
    { weight: "400g", unitsPerPack: 30, target: "Formato estándar nacional" },
    { weight: "500g", unitsPerPack: 24, target: "Ahorro familiar" },
    { weight: "750g", unitsPerPack: 15, target: "Familias numerosas / Panaderías" },
    { weight: "900g / 1kg", unitsPerPack: 12, target: "Mayoristas e institucional" },
    { weight: "5kg - 25kg", unitsPerPack: 1, target: "Bultos industriales Kraft B2B" }
  ]
};
