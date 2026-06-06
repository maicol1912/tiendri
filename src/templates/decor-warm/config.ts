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
    primary: "#CC7861",
    secondary: "#FAF0E6",
    background: "#FFFFFF",
    textPrimary: "#363130",
    headerBg: "#FFFFFF",
    sectionBg: "#FFFFFF",
    cardBg: "#FFFFFF",
    border: "#F0E8E4",
    surface: "#FAF0E6",
    searchBg: "#FFFFFF",
    textMuted: "#A0A0A0",
    textFooter: "#A0A0A0",
    buttonBg: "#F4B5A4",
    buttonText: "#CC7861",
    footerBg: "#FFFFFF",
    badgeBg: "#F4B5A4",
    badgeText: "#CC7861",
    navBorder: "#F0E8E4",
    textSecondary: "#4B4544",
    textSubtle: "#DCBEB6",
    borderLight: "#F0E8E4",
    borderInput: "#E8D8D4",
    borderMid: "#E8D8D4",
    ratingStar: "#CC7861",
    ratingBarBg: "#F0E8E4",
    paginationBg: "#FAF0E6",
    textBreadcrumb: "#A0A0A0",
    tabActive: "#CC7861",
    categoryActiveBg: "#F4B5A4",
    categoryActiveText: "#FFFFFF",
    // Decor-warm specific tokens
    peach: "#F4B5A4",
    linen: "#FAF0E6",
    darkBrown: "#391713",
    darkMode: "#363130",
    iconInactive: "#DCBEB6",
    // Popular product card backgrounds
    popularBg0: "#F6F6F6",
    popularBg1: "#EAEAEA",
    popularBg2: "#CDCDCD",
    popularBg3: "#9A9A9A",
    popularText0: "#000000",
    popularText1: "#000000",
    popularText2: "#000000",
    popularText3: "#FFFFFF",
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
    cardStyle: "flat" as const,
    cardHoverEffect: "none" as const,
    cardImageRatio: "square" as const,
    tabStyle: "underline" as const,
    navStyle: "scroll" as const,
    bannerHeight: "normal" as const,
    headerStyle: "standard" as const,
    footerStyle: "minimal" as const,
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
    { id: "new-arrival" as const, label: "Nuevos" },
    { id: "bestseller" as const, label: "Más vendidos" },
    { id: "featured" as const, label: "Destacados" },
  ],

  popularSearches: [
    "Sillas",
    "Mesas",
    "Lámparas",
    "Camas",
    "Sofás",
    "Decoración",
  ],

  sections: [
    { id: "hero" as const, visible: true },
    { id: "categories" as const, visible: true },
    { id: "best-seller" as const, visible: true },
    { id: "products" as const, visible: true },
  ],

  recipe: {
    defaultHeroVariant: "promo-carousel" as const,
    defaultCategoryNavVariant: "icon-grid" as const,
    defaultCardContentLayout: "action-buttons" as const,
    defaultBottomNavVariant: "flat-solid" as const,
    defaultHeaderVariant: "color-accented" as const,
    defaultFooterVariant: "compact-row" as const,
    defaultCartVariant: "minimal" as const,
    defaultCheckoutVariant: "minimal" as const,
  },

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
