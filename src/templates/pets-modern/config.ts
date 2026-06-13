// Pets Modern Template — Configuration
// Template metadata and default theme values.

import type { TemplateConfig } from "@/types/templates";
import type { BrandingConfig, ContentConfig, BusinessConfig } from "@/types/templates";

export const petsModernConfig = {
  id: "pets-modern",
  name: "Pet Shop",
  description: "Ideal para tiendas de mascotas, veterinarias y accesorios para animales",

  // Default theme colors
  colors: {
    primary: "#FF7322",
    secondary: "#1D1D1B",
    background: "#FFFFFF",
    // Text/surface tokens
    textPrimary: "#181725",
    headerBg: "#FFFFFF",
    sectionBg: "#FFFFFF",
    cardBg: "#FFFFFF",
    border: "#E2E2E2",
    surface: "#F2F3F2",
    searchBg: "#F2F3F2",
    textMuted: "#7C7C7C",
    textFooter: "#999999",
    // Button colors
    buttonBg: "#1D1D1B",
    buttonText: "#FFFFFF",
    // Footer background (no footer in pets-modern but required by TemplateConfig)
    footerBg: "#1D1D1B",
    // Badge (cart count)
    badgeBg: "#FF7322",
    badgeText: "#FFFFFF",
    // Bottom nav border
    navBorder: "#F2F3F2",
    // Text secondary variants
    textSecondary: "#3E423F",
    textSubtle: "#545454",
    // Border variants
    borderLight: "#F2F3F2",
    borderInput: "#E2E2E2",
    borderMid: "#E2E2E2",
    // Rating star color
    ratingStar: "#FF7322",
    ratingBarBg: "#E2E2E2",
    // Promo banner gradient colors
    promoBannerFrom: "#6DC298",
    promoBannerTo: "#23BDA8",
    promoBannerText: "#030303",
    promoBannerSubtext: "#FFFFFF",
    // Active tab/category
    tabActive: "#FF7322",
    categoryActiveBg: "#FF7322",
    categoryActiveText: "#181725",
    // Spec badge bg (product detail image bg)
    specBadgeBg: "#F2F3F2",
    // Review bg
    reviewBg: "#FAFAFA",
    // Pagination bg
    paginationBg: "#F2F3F2",
    // Summer sale text (not used in pets-modern but matches tech-premium tokens)
    textSummerSale: "#7C7C7C",
    // Breadcrumb text
    textBreadcrumb: "#7C7C7C",
    // Popular product card backgrounds (not used in pets-modern, but keeps parity with tech-premium)
    popularBg0: "#F2F3F2",
    popularBg1: "#E8E9E8",
    popularBg2: "#CDCECD",
    popularBg3: "#9A9B9A",
    popularText0: "#1D1D1B",
    popularText1: "#1D1D1B",
    popularText2: "#1D1D1B",
    popularText3: "#FFFFFF",
    // Filter pill active bg
    filterActiveBg: "#FF7322",
    filterActiveBorder: "#FF7322",
    // WhatsApp button
    whatsappBg: "#25D366",
    whatsappText: "#FFFFFF",
  },

  // Default typography
  font: "Inter",
  headingFont: "var(--font-display), ui-sans-serif, system-ui, sans-serif",

  // Default grid layout
  grid: {
    products: {
      mobile: 2,
      desktop: 4,
    },
    categories: {
      mobile: 2,
      desktop: 4,
    },
    trending: {
      mobile: 2,
      desktop: 4,
    },
    petTypes: {
      mobile: 2,
      desktop: 4,
    },
    listing: {
      mobile: 2,
      desktop: 3,
    },
    search: {
      mobile: 2,
      desktop: 4,
    },
  },

  // Default border radii
  radius: {
    card: "18px",
    category: "18px",
    button: "15px",
  },

  // Layout options
  layout: {
    cardStyle: "bordered" as const,
    cardHoverEffect: "scale" as const,
    cardImageRatio: "square" as const,
    navStyle: "grid" as const,
    tabStyle: "pills" as const,
    bannerHeight: "normal" as const,
    headerStyle: "standard" as const,
    footerStyle: "minimal" as const,
  },

  // Navigation links
  navLinks: [
    { label: "Tienda", href: "/" },
    { label: "Explorar", href: "/explore" },
    { label: "Favoritos", href: "/favourites" },
  ],

  // No footer in pets-modern, but keeping for TemplateConfig compatibility
  footerServices: [] as string[],
  footerAssistance: [] as string[],

  // Product tabs (not used in pets-modern home, but for listing page)
  productTabs: [
    { id: "new-arrival" as const, label: "Nuevos" },
    { id: "bestseller" as const, label: "Populares" },
    { id: "featured" as const, label: "Destacados" },
  ],

  // Popular searches
  popularSearches: [
    "Comida para perro",
    "Comida para gato",
    "Juguetes",
    "Accesorios",
    "Higiene",
    "Snacks",
  ],

  // Home page sections
  sections: [
    { id: "promo-banner" as const, visible: true },
    { id: "trending" as const, visible: true },
    { id: "pet-types" as const, visible: true },
    { id: "products" as const, visible: true },
  ],

  // ── Default branding ─────────────────────────────────────────────────────────
  branding: {
    storeName: "Pet Shop",
    description: "Tu tienda de mascotas favorita",
    socialLinks: {},
  } satisfies BrandingConfig,

  // ── Default content ───────────────────────────────────────────────────────────
  content: {
    heroBanner: {
      title: "Todo para tus mascotas",
      subtitle: "Encuentra los mejores productos para el cuidado de tus mascotas.",
      ctaText: "Ver productos",
    },
    navLinks: [
      { label: "Tienda", href: "/" },
      { label: "Explorar", href: "/explore" },
      { label: "Favoritos", href: "/favourites" },
    ],
    footerServices: [],
    footerAssistance: [],
    productTabs: [
      { id: "new-arrival", label: "Nuevos" },
      { id: "bestseller", label: "Populares" },
      { id: "featured", label: "Destacados" },
    ],
    popularSearches: [
      "Comida para perro",
      "Comida para gato",
      "Juguetes",
      "Accesorios",
      "Higiene",
      "Snacks",
    ],
  } satisfies ContentConfig,

  // ── Default business info ─────────────────────────────────────────────────────
  business: {
    currency: "COP",
    paymentMethods: [],
  } satisfies BusinessConfig,
} as const satisfies TemplateConfig;

export type PetsModernConfig = typeof petsModernConfig;
