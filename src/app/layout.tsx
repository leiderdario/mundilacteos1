import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://mundilacteos.com"),
  title: "Mundilácteos — Digital Experience | Leche en Polvo y Derivados",
  description:
    "Productores de leche en polvo entera, azucarada y derivados lácteos en Colombia con más de 12 años de experiencia. Calidad certificada ISO 9001:2015 y Registro INVIMA.",
  keywords: [
    "Mundilácteos",
    "leche en polvo Colombia",
    "The Cántaro",
    "La Becerrita",
    "leche en polvo entera Cartagena",
    "bultos de leche 25kg",
    "proveedor lácteo Colombia"
  ],
  authors: [{ name: "Inversiones Mundilácteos S.A.S" }],
  openGraph: {
    title: "Mundilácteos — Lo que nos une es la pureza",
    description:
      "Experiencia digital interactiva de Mundilácteos. Líderes en leche en polvo y derivados lácteos de alta calidad con cobertura nacional en Colombia.",
    url: "https://mundilacteos.com",
    siteName: "Mundilácteos",
    images: [
      {
        url: "/images/the-cantaro-doble.png",
        width: 800,
        height: 800,
        alt: "The Cántaro Leche en Polvo Mundilácteos"
      }
    ],
    locale: "es_CO",
    type: "website"
  },
  icons: {
    icon: "/images/logo-mundilacteos-icon.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="bg-[#FAF9F5] text-slate-900 antialiased selection:bg-emerald-600 selection:text-white">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
