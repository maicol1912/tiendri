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
    primary: "#EFF422",        // Yellow — buttons, active states, badges
    secondary: "#4D4D4D",      // Dark gray — pills, search backgrounds
    background: "#181818",     // Page background
    cardBg: "#F5F5F4",         // Product card image background (WHITE — signature)
    border: "#333333",         // General borders / dividers
    surface: "#4D4D4D",        // Category pill bg, input backgrounds
    searchBg: "#4D4D4D",       // Search input background
    textMuted: "#A0A0A0",      // Secondary text (compare-at prices, metadata)
    textPrimary: "#FFFFFF",    // Main text on dark bg
    headerBg: "#181818",       // Header background
    sectionBg: "#181818",      // Section background
    buttonBg: "#EFF422",       // CTA button background
    buttonText: "#181818",     // CTA button text (dark on yellow)
    footerBg: "#181818",       // Footer background
    badgeBg: "#EFF422",        // Cart badge, discount badge background
    badgeText: "#181818",      // Badge text
    navBorder: "#333333",      // Bottom nav / header border
    textSecondary: "#D0D0D0",  // Icon text, secondary labels
    textSubtle: "#A8A8A8",     // Tertiary text, description, muted
    textFooter: "#666666",     // Footer text
    borderLight: "#242424",    // Sticky bottom bar bg
    borderInput: "#444444",    // Input border
    borderMid: "#4A4A4A",      // Disabled button bg
    ratingBarBg: "#333333",    // Rating bar background
    ratingStar: "#EFF422",     // Rating star color
    paginationBg: "#4D4D4D",   // Pagination button bg
    textSummerSale: "#A8A8A8", // Muted text variant
    textBreadcrumb: "#A8A8A8", // Breadcrumb muted
    tabActive: "#EFF422",      // Active tab color
    categoryActiveBg: "#5A5A5A", // Active category pill bg
    categoryActiveText: "#EFF422", // Active category text (yellow)
    specBadgeBg: "#242424",    // Product spec badge bg
    reviewBg: "#242424",       // Review card bg
    // Popular card bg: dark progression (must contrast with #181818 bg)
    popularBg0: "#3A3A3A",
    popularBg1: "#2E2E2E",
    popularBg2: "#222222",
    popularBg3: "#1A1A1A",
    popularText0: "#FFFFFF",
    popularText1: "#FFFFFF",
    popularText2: "#FFFFFF",
    popularText3: "#FFFFFF",
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
    cardStyle: "flat" as const,
    cardHoverEffect: "none" as const,
    cardImageRatio: "square" as const,
    tabStyle: "underline" as const,
    navStyle: "pills" as const,
    bannerHeight: "normal" as const,
    headerStyle: "standard" as const,
    footerStyle: "minimal" as const,
  },

  sections: [
    { id: "promo-carousel" as const, visible: true },
    { id: "categories" as const, visible: true },
    { id: "video" as const, visible: true },
    { id: "best-sellers" as const, visible: true },
    { id: "featured" as const, visible: true },
  ],

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
    { id: "bestseller" as const, label: "Más vendidos" },
    { id: "featured" as const, label: "Destacados" },
    { id: "new-arrival" as const, label: "Nuevos" },
  ],

  popularSearches: [
    "Sofás",
    "Sillas",
    "Mesas",
    "Camas",
    "Estantes",
    "Lámparas",
  ],

  // ── Default recipe (composable section defaults) ─────────────────────────
  recipe: {
    defaultHeroVariant: "promo-carousel" as const,
    defaultCategoryNavVariant: "image-pills" as const,
    defaultCardContentLayout: "below-image" as const,
    defaultBottomNavVariant: "frosted-glass" as const,
    defaultHeaderVariant: "location-greeting" as const,
  },

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
