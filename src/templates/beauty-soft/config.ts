// Beauty Soft Template — Configuration
// Template metadata and default theme values.
// Inspired by soft, feminine, wellness/beauty aesthetics.

import type { TemplateConfig } from "@/types/templates";
import type { BrandingConfig, ContentConfig, BusinessConfig } from "@/types/templates";

export const beautySoftConfig = {
  id: "beauty-soft",
  name: "Beauty Soft",
  description: "Ideal para belleza, cosméticos, bienestar y cuidado personal",

  colors: {
    primary: '#FF4428',
    secondary: '#F5F4F7',
    background: '#F4F4F7',
    foreground: '#000000',
    card: '#F4F4F7',
    border: '#E5E5EE',
    muted: '#9DA2A6',
    accent: '#F97316',
    onPrimary: '#FFFFFF',
    surface: '#D8D5D0',
    iconPillBg: '#F6F5F5',
    discountBg: '#DBDADD',
    discountText: '#FFFFFF',
  },

  font: "Inter",
  headingFont: "'Wix Madefor Display', var(--font-display), ui-sans-serif, system-ui, sans-serif",

  grid: {
    products: {
      mobile: 2,
      desktop: 4,
    },
    categories: {
      mobile: 3,
      desktop: 6,
    },
    listing: {
      mobile: 2,
      desktop: 3,
    },
    search: {
      mobile: 2,
      desktop: 3,
    },
  },

  radius: {
    card: "20px",
    category: "20px",
    button: "29px",
  },

  layout: {
    cardImageRatio: "square" as const,
    heroVariant: "minimal" as const,
    cardVariant: "minimal" as const,
    categoryVariant: "horizontal-scroll" as const,
    gridDensity: "standard" as const,
    spacingDensity: "normal" as const,
  },

  sections: [
    { id: "hero" as const, visible: true },
    { id: "categories" as const, visible: true },
    { id: "products" as const, visible: true },
  ],

  branding: {
    storeName: "Mi Tienda",
    description: "Tu tienda de belleza online en Tiendri",
    socialLinks: {},
  } satisfies BrandingConfig,

  content: {
    heroBanner: {
      title: "Descubre tu rutina ideal de belleza",
      subtitle: "Los mejores productos de cuidado personal al mejor precio.",
      ctaText: "Ver catálogo",
    },
    navLinks: [
      { label: "Inicio", href: "/" },
      { label: "Catálogo", href: "/catalogo" },
      { label: "Buscar", href: "/buscar" },
      { label: "Carrito", href: "/carrito" },
    ],
    footerServices: [
      "Envíos a domicilio",
      "Devoluciones gratis",
      "Pago seguro",
      "Atención al cliente",
    ],
    footerAssistance: [
      "Preguntas frecuentes",
      "Cómo comprar",
      "Términos y condiciones",
      "Política de privacidad",
    ],
    productTabs: [
      { id: "new-arrival", label: "Nuevos" },
      { id: "bestseller", label: "Más vendidos" },
      { id: "featured", label: "Destacados" },
    ],
    popularSearches: [
      "Sérum vitamina C",
      "Crema hidratante",
      "Protector solar",
      "Gel limpiador",
      "Mascarilla facial",
      "Tónico facial",
    ],
  } satisfies ContentConfig,

  business: {
    currency: "COP",
    paymentMethods: [],
  } satisfies BusinessConfig,
} as const satisfies TemplateConfig;

export type BeautySoftConfig = typeof beautySoftConfig;
