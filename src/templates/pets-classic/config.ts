// Pets Classic Template — Configuration
// Light theme with warm orange (#FFAF42) accents.
// Poppins font, rounded corners, SVG category icons.

import type { TemplateConfig } from "@/types/templates";
import type { BrandingConfig, ContentConfig, BusinessConfig } from "@/types/templates";

export const petsClassicConfig = {
  id: "pets-classic",
  name: "Pets Classic",
  description: "Ideal para tiendas de mascotas, veterinarias y accesorios para animales",

  colors: {
    primary: "#FFAF42",
    secondary: "#1A1A1A",
    background: "#FFFFFF",
    textPrimary: "#1A1A1A",
    textSecondary: "#555555",
    textMuted: "#999999",
    textSubtle: "#BBBBBB",
    textFooter: "#999999",
    textBreadcrumb: "#999999",
    textSummerSale: "#555555",
    headerBg: "#FFFFFF",
    cardBg: "#FFFFFF",
    sectionBg: "#FFFFFF",
    surface: "#F7F7F7",
    searchBg: "#F9F9F9",
    border: "#EEEEEE",
    borderLight: "#F5F5F5",
    borderInput: "#DDDDDD",
    borderMid: "#E0E0E0",
    navBorder: "#EEEEEE",
    buttonBg: "#FFAF42",
    buttonText: "#FFFFFF",
    footerBg: "#FFFFFF",
    badgeBg: "#FFAF42",
    badgeText: "#FFFFFF",
    specBadgeBg: "#FFF5E6",
    reviewBg: "#F9F9F9",
    ratingStar: "#FFAF42",
    ratingBarBg: "#EEEEEE",
    paginationBg: "#F9F9F9",
    tabActive: "#FFAF42",
    categoryActiveBg: "#FFAF42",
    categoryActiveText: "#FFFFFF",
    popularBg0: "#F6F6F6",
    popularBg1: "#EAEAEA",
    popularBg2: "#CDCDCD",
    popularBg3: "#9A9A9A",
    popularText0: "#1A1A1A",
    popularText1: "#1A1A1A",
    popularText2: "#1A1A1A",
    popularText3: "#FFFFFF",
  },

  font: "Poppins",
  headingFont: "Plus Jakarta Sans, var(--font-display), ui-sans-serif, system-ui, sans-serif",

  grid: {
    products: { mobile: 2, desktop: 4 },
    categories: { mobile: 3, desktop: 6 },
    listing: { mobile: 2, desktop: 4 },
    search: { mobile: 2, desktop: 4 },
  },

  radius: {
    card: "14px",
    category: "12px",
    button: "9999px",
  },

  layout: {
    cardStyle: "flat" as const,
    cardHoverEffect: "none" as const,
    cardImageRatio: "portrait" as const,
    navStyle: "scroll" as const,
    tabStyle: "pills" as const,
    bannerHeight: "normal" as const,
    headerStyle: "standard" as const,
    footerStyle: "minimal" as const,
    shadowStyle: "hue-tinted" as const,
    animationLevel: "full" as const,
  },

  sections: [
    { id: "promo-banner" as const, visible: true },
    { id: "categories" as const, visible: true },
    { id: "featured" as const, visible: true },
    { id: "popular" as const, visible: true },
  ],

  navLinks: [
    { label: "Inicio", href: "/" },
    { label: "Catálogo", href: "/catalogo" },
    { label: "Buscar", href: "/buscar" },
    { label: "Carrito", href: "/carrito" },
  ],

  footerServices: [
    "Envío a domicilio",
    "Asesoría veterinaria",
    "Garantía de productos",
    "Devoluciones",
  ],

  footerAssistance: [
    "Preguntas frecuentes",
    "Términos de uso",
    "Política de privacidad",
    "Contáctenos",
  ],

  productTabs: [
    { id: "new-arrival" as const, label: "Nuevos" },
    { id: "bestseller" as const, label: "Más vendidos" },
    { id: "featured" as const, label: "Destacados" },
  ],

  popularSearches: [
    "Comida para perros",
    "Juguetes gatos",
    "Vitaminas",
    "Arnés",
    "Grooming",
    "Ropa mascotas",
  ],

  // ── Default recipe (composable section defaults) ─────────────────────────
  recipe: {
    defaultHeroVariant: "promo-carousel" as const,
    defaultCategoryNavVariant: "icon-grid" as const,
    defaultCardContentLayout: "featured-animated" as const,
    defaultBottomNavVariant: "rounded-top" as const,
    defaultHeaderVariant: "color-accented" as const,
    defaultFooterVariant: "compact-row" as const,
    defaultCartVariant: "detailed" as const,
    defaultCheckoutVariant: "detailed" as const,
  },

  branding: {
    storeName: "Mi Tienda",
    description: "Tu tienda de mascotas en Tiendri",
    socialLinks: {},
  } satisfies BrandingConfig,

  content: {
    heroBanner: {
      title: "Todo para tu mascota",
      subtitle: "Los mejores productos para el bienestar de tu compañero fiel.",
      ctaText: "Ver catálogo",
    },
    navLinks: [
      { label: "Inicio", href: "/" },
      { label: "Catálogo", href: "/catalogo" },
      { label: "Buscar", href: "/buscar" },
      { label: "Carrito", href: "/carrito" },
    ],
    footerServices: [
      "Envío a domicilio",
      "Asesoría veterinaria",
      "Garantía de productos",
      "Devoluciones",
    ],
    footerAssistance: [
      "Preguntas frecuentes",
      "Términos de uso",
      "Política de privacidad",
      "Contáctenos",
    ],
    productTabs: [
      { id: "new-arrival", label: "Nuevos" },
      { id: "bestseller", label: "Más vendidos" },
      { id: "featured", label: "Destacados" },
    ],
    popularSearches: [
      "Comida para perros",
      "Juguetes gatos",
      "Vitaminas",
      "Arnés",
      "Grooming",
      "Ropa mascotas",
    ],
  } satisfies ContentConfig,

  business: {
    currency: "COP",
    paymentMethods: [],
  } satisfies BusinessConfig,
} as const satisfies TemplateConfig;

export type PetsClassicConfig = typeof petsClassicConfig;
