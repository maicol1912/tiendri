// Furniture Dark Template — Configuration
// Dark theme: #181818 background, yellow-green accent (#EFF422→#B0BA38), elegant serif fonts.
// Signature: white (#F5F5F4) product card image bg inside dark page.
// Font pair: Cormorant Garamond (headings) + DM Sans (body) — the "elegant" pair.

import type { TemplateConfig } from "@/types/templates";
import type { BrandingConfig, ContentConfig, BusinessConfig } from "@/types/templates";

export const furnitureDarkConfig = {
  id: "furniture-dark",
  name: "Furniture Dark",
  description: "Ideal para tiendas de muebles y decoración con estilo oscuro y elegante",

  colors: {
    primary: '#EFF422',
    secondary: '#4D4D4D',
    background: '#181818',
    foreground: '#FFFFFF',
    card: '#F5F5F4',
    border: '#333333',
    muted: '#A0A0A0',
    accent: '#EFF422',
    onPrimary: '#181818',
    surface: '#4D4D4D',
    searchBg: '#4D4D4D',
    categoryActiveBg: '#5A5A5A',
    categoryActiveText: '#EFF422',
    textSecondary: '#D0D0D0',
    popularBg0: '#3A3A3A',
    popularBg1: '#2E2E2E',
    popularBg2: '#222222',
    popularBg3: '#1A1A1A',
    popularText0: '#FFFFFF',
    popularText1: '#FFFFFF',
    popularText2: '#FFFFFF',
    popularText3: '#FFFFFF',
  },

  font: "var(--font-body-elegant), DM Sans, ui-sans-serif, system-ui, sans-serif",
  headingFont: "var(--font-heading-elegant), Cormorant Garamond, ui-serif, Georgia, serif",

  grid: {
    products: { mobile: 2, desktop: 4 },
    categories: { mobile: 3, desktop: 6 },
    listing: { mobile: 2, desktop: 4 },
    search: { mobile: 2, desktop: 4 },
  },

  radius: {
    card: "12px",
    category: "28px",
    button: "28px",
  },

  layout: {
    cardImageRatio: "square" as const,
    heroVariant: "carousel" as const,
    cardVariant: "detailed" as const,
    categoryVariant: "horizontal-scroll" as const,
    gridDensity: "standard" as const,
    spacingDensity: "tight" as const,
  },

  sections: [
    { id: "promo-carousel" as const, visible: true },
    { id: "categories" as const, visible: true },
    { id: "video" as const, visible: true },
    { id: "best-sellers" as const, visible: true },
    { id: "featured" as const, visible: true },
  ],

  branding: {
    storeName: "Mi Tienda",
    description: "Tu tienda de muebles y decoración",
    socialLinks: {},
  } satisfies BrandingConfig,

  content: {
    heroBanner: {
      title: "El mueble que te define",
      subtitle: "Descubrí piezas únicas para cada espacio de tu hogar.",
      ctaText: "Ver catálogo",
    },
    navLinks: [
      { label: "Inicio", href: "/" },
      { label: "Categorías", href: "/catalogo" },
      { label: "Ofertas", href: "/buscar" },
    ],
    footerServices: [
      "Envío a domicilio",
      "Garantía de calidad",
      "Devoluciones",
      "Instalación incluida",
    ],
    footerAssistance: [
      "Contacto",
      "Preguntas frecuentes",
      "Políticas de privacidad",
      "Términos de uso",
    ],
    productTabs: [
      { id: "bestseller", label: "Más vendidos" },
      { id: "featured", label: "Destacados" },
      { id: "new-arrival", label: "Nuevos" },
    ],
    popularSearches: [
      "Sofás",
      "Sillas",
      "Mesas",
      "Camas",
      "Estantes",
      "Lámparas",
    ],
  } satisfies ContentConfig,

  business: {
    currency: "COP",
    paymentMethods: [],
  } satisfies BusinessConfig,
} as const satisfies TemplateConfig;

export type FurnitureDarkConfig = typeof furnitureDarkConfig;
