// Decor Warm Template — Configuration
// Warm home décor theme: peach accent (#F4B5A4), linen surface (#FAF0E6),
// burnt sienna CTA (#CC7861). Fonts: Poppins + League Spartan.

import type { TemplateConfig } from "@/types/templates";
import type { BrandingConfig, ContentConfig, BusinessConfig } from "@/types/templates";

export const decorWarmConfig = {
  id: "decor-warm",
  name: "Decor Warm",
  description: "Ideal para tiendas de muebles, decoración y hogar con estética cálida y acogedora",

  colors: {
    primary: '#CC7861',
    secondary: '#FAF0E6',
    background: '#FFFFFF',
    foreground: '#363130',
    card: '#FFFFFF',
    border: '#F0E8E4',
    muted: '#A0A0A0',
    accent: '#CC7861',
    onPrimary: '#FFFFFF',
    // Template-specific extras — generate via buildCssVars
    peach: '#F4B5A4',        // Best-seller card bg, header greeting, search icon bg, hero slides
    darkMode: '#363130',     // Dark text for nav icons, labels, back buttons (alias for foreground)
    iconInactive: '#A0A0A0', // Inactive nav icon color (alias for muted)
  },

  font: "Inter",
  headingFont: "'Poppins', var(--font-display), ui-sans-serif, system-ui, sans-serif",

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
      desktop: 4,
    },
    search: {
      mobile: 2,
      desktop: 4,
    },
  },

  radius: {
    card: "14px",
    category: "13px",
    button: "30px",
  },

  layout: {
    cardImageRatio: "square" as const,
    gridDensity: "standard" as const,
    spacingDensity: "tight" as const,
  },

  structuralVariants: {
    heroVariant: 'full-bleed' as const,
    cardContentLayout: 'below-image' as const,
    categoryNavStyle: 'horizontal-scroll' as const,
    addToCartStyle: 'full-width' as const,
  },

  sections: [
    { id: "hero" as const, visible: true },
    { id: "categories" as const, visible: true },
    { id: "best-seller" as const, visible: true },
    { id: "products" as const, visible: true },
  ],

  branding: {
    storeName: "Mi Tienda",
    description: "Tu tienda de decoración y muebles en Tiendri",
    socialLinks: {},
  } satisfies BrandingConfig,

  content: {
    heroBanner: {
      title: "Transforma tu hogar con estilo",
      subtitle: "Los mejores muebles y accesorios de decoración.",
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
      "Sillas",
      "Mesas",
      "Lámparas",
      "Camas",
      "Sofás",
      "Decoración",
    ],
  } satisfies ContentConfig,

  business: {
    currency: "COP",
    paymentMethods: [],
  } satisfies BusinessConfig,
} as const satisfies TemplateConfig;

export type DecorWarmConfig = typeof decorWarmConfig;
