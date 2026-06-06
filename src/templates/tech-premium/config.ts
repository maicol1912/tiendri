// Tech Premium Template — Configuration
// Template metadata and default theme values.

import type { TemplateConfig } from "@/types/templates";
import type { BrandingConfig, ContentConfig, BusinessConfig } from "@/types/templates";

export const techPremiumConfig = {
  id: "tech-premium",
  name: "Tech Premium",
  description: "Ideal para tecnología, electrónica y gadgets",

  // Default theme colors
  colors: {
    primary: "#000000",
    secondary: "#211C24",
    background: "#FAFAFA",
    // Text/surface tokens — used instead of hardcoded text-black / bg-white
    textPrimary: "#000000",
    headerBg: "#FFFFFF",
    sectionBg: "#FFFFFF",
    cardBg: "#F6F6F6",
    border: "#B5B5B5",
    surface: "#EDEDED",
    searchBg: "#F5F5F5",
    textMuted: "#787878",
    textFooter: "#CFCFCF",
    // Button colors
    buttonBg: "#000000",
    buttonText: "#FFFFFF",
    // Footer background
    footerBg: "#000000",
    // Icon badge background (cart count, etc.)
    badgeBg: "#000000",
    badgeText: "#FFFFFF",
    // Spec badge background (product detail)
    specBadgeBg: "#F4F4F4",
    // Review card background
    reviewBg: "#FAFAFA",
    // Bottom nav border
    navBorder: "#E0E0E0",
    // Text secondary variants used in pages
    textSecondary: "#6C6C6C",
    textSubtle: "#545454",
    // Border variants
    borderLight: "#EBEBEB",
    borderInput: "#9F9F9F",
    borderMid: "#D9D9D9",
    // Rating bar background
    ratingBarBg: "#D9D9D9",
    // Rating star color
    ratingStar: "#FFB547",
    // Pagination / search suggestion bg
    paginationBg: "#F6F6F6",
    // Summer sale description color
    textSummerSale: "#787878", // matches textMuted for obsidian
    // Product detail breadcrumb / muted text
    textBreadcrumb: "#A4A4A4",
    // Active tab underline (same as primary, but explicit)
    tabActive: "#000000",
    // Category active bg (same as primary)
    categoryActiveBg: "#000000",
    categoryActiveText: "#FFFFFF",
    // Popular product card backgrounds (solid progression light→dark)
    popularBg0: "#F6F6F6",
    popularBg1: "#EAEAEA",
    popularBg2: "#CDCDCD",
    popularBg3: "#9A9A9A",
    // Popular product card text colors (per-card, handles light↔dark palettes)
    popularText0: "#000000",
    popularText1: "#000000",
    popularText2: "#000000",
    popularText3: "#FFFFFF",
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

  // Default border radii
  radius: {
    card: "9px",
    category: "15px",
    button: "8px",
  },

  // Layout options — controls visual style of key UI regions.
  // Default values reproduce the original Figma design exactly.
  layout: {
    // Product card visual style
    cardStyle: "flat" as const,        // "flat" | "shadow" | "bordered" | "elevated"
    cardHoverEffect: "none" as const,  // "none" | "lift" | "scale" | "glow"
    cardImageRatio: "square" as const, // "square" | "portrait" | "wide"

    // Product tabs style
    tabStyle: "underline" as const,    // "underline" | "pills" | "bordered"

    // Category nav style (container-level)
    navStyle: "grid" as const,         // "grid" | "pills" | "scroll"

    // Summer-sale / hero banner height (desktop)
    bannerHeight: "normal" as const,   // "short" | "normal" | "tall"

    // Header layout
    headerStyle: "standard" as const,  // "standard" | "centered" | "minimal"

    // Footer layout
    footerStyle: "columns" as const,   // "columns" | "minimal" | "centered"
  },

  // Navigation links
  navLinks: [
    { label: "Inicio", href: "/" },
    { label: "Catálogo", href: "/listing" },
    { label: "Populares", href: "/popular" },
    { label: "Ofertas", href: "/discounts" },
  ],

  // Footer service links
  footerServices: [
    "Programa de bonos",
    "Tarjetas de regalo",
    "Crédito y pago",
    "Contratos de servicio",
    "Cuenta sin efectivo",
    "Métodos de pago",
  ],

  // Footer assistance links
  footerAssistance: [
    "Buscar pedido",
    "Términos de envío",
    "Cambios y devoluciones",
    "Garantía",
    "Preguntas frecuentes",
    "Términos de uso",
  ],

  // Product tabs
  productTabs: [
    { id: "new-arrival" as const, label: "Nuevos" },
    { id: "bestseller" as const, label: "Más vendidos" },
    { id: "featured" as const, label: "Destacados" },
  ],

  // Popular search suggestions
  popularSearches: [
    "iPhone",
    "AirPods",
    "MacBook",
    "Apple Watch",
    "Samsung Galaxy",
    "iPad",
  ],

  // Home page sections — order determines render order, visible toggles show/hide.
  // Header, Footer, and BottomNav are structural and excluded from this system.
  sections: [
    { id: "hero" as const, visible: true },
    { id: "banners" as const, visible: true },
    { id: "categories" as const, visible: true },
    { id: "products" as const, visible: true },
    { id: "popular" as const, visible: true },
    { id: "discounts" as const, visible: true },
    { id: "summer-sale" as const, visible: true },
  ],

  // ── Default recipe (composable section defaults) ─────────────────────────
  recipe: {
    defaultHeroVariant: "contained" as const,
    defaultCategoryNavVariant: "horizontal-scroll" as const,
    defaultCardContentLayout: "below-image" as const,
  },

  // ── Default branding (store identity) ────────────────────────────────────
  // These are template-level placeholder defaults. Merchants override via
  // /dashboard/configuracion → Identidad tab.
  branding: {
    storeName: "Mi Tienda",
    description: "Tu tienda online en Tiendri",
    socialLinks: {},
  } satisfies BrandingConfig,

  // ── Default content (navigation, hero, footer, product tabs) ─────────────
  // Arrays here mirror the top-level keys (navLinks, footerServices, etc.)
  // that existing components reference via config.navLinks. Both paths should
  // stay in sync — when a merchant overrides via content, the resolved config
  // will have content.navLinks, while legacy components use the top-level key.
  content: {
    heroBanner: {
      title: "Descubre lo mejor en tecnología",
      subtitle: "Los mejores productos al mejor precio, con envío rápido a toda Colombia.",
      ctaText: "Ver catálogo",
    },
    navLinks: [
      { label: "Inicio", href: "/" },
      { label: "Catálogo", href: "/listing" },
      { label: "Populares", href: "/popular" },
      { label: "Ofertas", href: "/discounts" },
    ],
    footerServices: [
      "Programa de bonos",
      "Tarjetas de regalo",
      "Crédito y pago",
      "Contratos de servicio",
      "Cuenta sin efectivo",
      "Métodos de pago",
    ],
    footerAssistance: [
      "Buscar pedido",
      "Términos de envío",
      "Cambios y devoluciones",
      "Garantía",
      "Preguntas frecuentes",
      "Términos de uso",
    ],
    productTabs: [
      { id: "new-arrival", label: "Nuevos" },
      { id: "bestseller", label: "Más vendidos" },
      { id: "featured", label: "Destacados" },
    ],
    popularSearches: [
      "iPhone",
      "AirPods",
      "MacBook",
      "Apple Watch",
      "Samsung Galaxy",
      "iPad",
    ],
  } satisfies ContentConfig,

  // ── Default business info ────────────────────────────────────────────────
  // Merchants fill this in via /dashboard/configuracion → Negocio tab.
  business: {
    currency: "COP",
    paymentMethods: [],
  } satisfies BusinessConfig,
} as const satisfies TemplateConfig;

export type TechPremiumConfig = typeof techPremiumConfig;
