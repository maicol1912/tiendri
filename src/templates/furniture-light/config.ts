// Furniture Light Template — Configuration
// KASA-inspired: white bg, orange #F5841F accent, teal #26A69A bookmarks, dark navy #1B2838
// Design: clean Scandinavian light, lifestyle product cards, icon categories.

import type { TemplateConfig } from "@/types/templates";
import type { BrandingConfig, ContentConfig, BusinessConfig } from "@/types/templates";

export const furnitureLightConfig = {
  id: "furniture-light",
  name: "Furniture Light",
  description: "Ideal para tiendas de muebles, decoración y hogar con estilo escandinavo claro",

  colors: {
    primary: '#F5841F',
    secondary: '#1B2838',
    background: '#FFFFFF',
    foreground: '#1B2838',
    card: '#F5F7FA',
    border: '#E5E8EB',
    muted: '#666666',
    accent: '#F5841F',
    onPrimary: '#FFFFFF',
    bookmarkBg: '#26A69A',
    walletBg: '#1B2838',
    popularBg0: '#F0E6D4',
    popularBg1: '#E8F5E9',
    popularBg2: '#FEF9E7',
    popularBg3: '#E6F0F8',
    popularText0: '#1B2838',
    popularText1: '#1B2838',
    popularText2: '#1B2838',
    popularText3: '#1B2838',
  },

  font: "Inter",
  headingFont: "var(--font-display), ui-sans-serif, system-ui, sans-serif",

  grid: {
    products: { mobile: 2, desktop: 4 },
    categories: { mobile: 5, desktop: 5 },
    listing: { mobile: 2, desktop: 3 },
    search: { mobile: 2, desktop: 4 },
  },

  radius: {
    card: "16px",
    category: "14px",
    button: "12px",
  },

  layout: {
    cardImageRatio: "square" as const,
    gridDensity: "standard" as const,
    spacingDensity: "normal" as const,
  },

  structuralVariants: {
    heroVariant: 'text-only' as const,
    cardContentLayout: 'below-image' as const,
    categoryNavStyle: 'horizontal-scroll' as const,
    addToCartStyle: 'full-width' as const,
  },

  sections: [
    { id: "hero" as const, visible: true },
    { id: "categories" as const, visible: true },
    { id: "flash-sale" as const, visible: true },
    { id: "room-styles" as const, visible: true },
    { id: "products" as const, visible: true },
  ],

  branding: {
    storeName: "Mi Tienda",
    description: "Tu tienda de muebles en Tiendri",
    socialLinks: {},
  } satisfies BrandingConfig,

  content: {
    heroBanner: {
      title: "¡Nueva colección disponible!",
      subtitle: "Ver más",
      ctaText: "Ver catálogo",
    },
    navLinks: [
      { label: "Inicio", href: "/" },
      { label: "Catálogo", href: "/catalogo" },
      { label: "Explorar", href: "/buscar" },
    ],
    footerServices: [
      "Política de privacidad",
      "Términos y condiciones",
    ],
    footerAssistance: [
      "Preguntas frecuentes",
      "Contacto",
    ],
    productTabs: [
      { id: "new-arrival", label: "Nuevos" },
      { id: "bestseller", label: "Más vendidos" },
      { id: "featured", label: "Destacados" },
    ],
    popularSearches: [
      "Sillas",
      "Mesas",
      "Sofás",
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

export type FurnitureLightConfig = typeof furnitureLightConfig;
