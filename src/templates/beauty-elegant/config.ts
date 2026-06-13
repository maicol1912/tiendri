// Beauty Elegant Template — Configuration
// Purple/violet glassmorphic cosmetic store theme.
// Inspired by Blushora beauty brand aesthetics.

import type { TemplateConfig } from "@/types/templates";
import type { BrandingConfig, ContentConfig, BusinessConfig } from "@/types/templates";

export const beautyElegantConfig = {
  id: "beauty-elegant",
  name: "Beauty Elegant",
  description: "Ideal para cosméticos, maquillaje y marcas de belleza premium",

  colors: {
    primary: '#7700CF',
    secondary: '#190E2C',
    background: '#FEFEFF',
    foreground: '#000000',
    card: '#F0EDF5',
    border: '#E4E7EC',
    muted: '#6E6E6E',
    accent: '#F97316',
    onPrimary: '#FFFFFF',
    searchBg: '#BF68FF14',
    searchBorder: '#B081D3',
    bottomNavBg: '#190E2CCC',
    borderLight: '#B081D320',
    navBorder: '#B081D320',
    detailOverlayBg: '#37284ABF',
    detailInnerBg: '#190E2C',
    iconPillBg: '#BF68FF14',
    discountBg: '#01000185',
    discountText: '#FFFFFF',
    backButtonBg: '#655683',
    reviewBg: '#F9F5FF',
  },

  font: "Inter",
  headingFont: "Inter, var(--font-display), ui-sans-serif, system-ui, sans-serif",

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
    card: "16px",
    category: "20px",
    button: "9999px",
  },

  layout: {
    cardImageRatio: "portrait" as const,
    heroVariant: "minimal" as const,
    cardVariant: "detailed" as const,
    categoryVariant: "text-list" as const,
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
    description: "Tu tienda de belleza premium en Tiendri",
    socialLinks: {},
  } satisfies BrandingConfig,

  content: {
    heroBanner: {
      title: "Descubre tu belleza con productos premium",
      subtitle: "Cosméticos, maquillaje y cuidado personal de alta calidad.",
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
      "Sérum Vitamina C",
      "Crema Hidratante",
      "Base Líquida",
      "Labial Mate",
      "Paleta de Sombras",
      "Perfume Floral",
    ],
  } satisfies ContentConfig,

  business: {
    currency: "COP",
    paymentMethods: [],
  } satisfies BusinessConfig,
} as const satisfies TemplateConfig;

export type BeautyElegantConfig = typeof beautyElegantConfig;
