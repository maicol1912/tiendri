// Electronics Classic Template — Configuration
// Blue #0079EB primary, white page, Inter font. TronMart-inspired.

import type { TemplateConfig } from "@/types/templates";
import type { BrandingConfig, ContentConfig, BusinessConfig } from "@/types/templates";

export const electronicsClassicConfig = {
  id: "electronics-classic",
  name: "Electronics Classic",
  description: "Ideal para tiendas de tecnología, electrodomésticos y gadgets. Diseño clásico azul.",

  // Default theme colors — mirrors the original electronic template
  colors: {
    primary: "#0079EB",
    secondary: "#0082FB",
    background: "#FFFFFF",
    // Text tokens
    textPrimary: "#111111",
    textSecondary: "#333333",
    textMuted: "#666666",
    textSubtle: "#999999",
    textFooter: "#6B7280",
    textBreadcrumb: "#9CA3AF",
    textSummerSale: "#666666",
    // Surface tokens
    headerBg: "#0079EB",
    sectionBg: "#FAFAFA",
    cardBg: "#FFFFFF",
    surface: "#F5F5F5",
    searchBg: "#F5F5F5",
    reviewBg: "#FAFAFA",
    paginationBg: "#F5F5F5",
    specBadgeBg: "#F5F5F5",
    // Border tokens
    border: "#E5E7EB",
    borderLight: "#F3F4F6",
    borderInput: "#D1D5DB",
    borderMid: "#E5E7EB",
    navBorder: "#1e1e1e",
    // Button tokens
    buttonBg: "#444444",
    buttonText: "#FFFFFF",
    // Footer
    footerBg: "#FFFFFF",
    // Badge (cart count, etc.)
    badgeBg: "#EF4444",
    badgeText: "#FFFFFF",
    // Rating
    ratingStar: "#FBBF24",
    ratingBarBg: "#E5E7EB",
    // Active states
    tabActive: "#0079EB",
    categoryActiveBg: "#0079EB",
    categoryActiveText: "#FFFFFF",
    // Popular product cards (horizontal 4-card section)
    popularBg0: "#F5F5F5",
    popularBg1: "#EAEAEA",
    popularBg2: "#CDCDCD",
    popularBg3: "#9A9A9A",
    popularText0: "#111111",
    popularText1: "#111111",
    popularText2: "#111111",
    popularText3: "#FFFFFF",
    // Filter pills
    filterActiveBg: "#0079EB",
    filterActiveBorder: "#0079EB",
    // WhatsApp CTA
    whatsappBg: "#25D366",
    whatsappText: "#FFFFFF",
    // Promo banner
    promoBannerFrom: "#F5F5F5",
    promoBannerTo: "#EAEAEA",
    promoBannerText: "#111111",
    promoBannerSubtext: "#666666",
    // Top utility bar
    topBarBg: "#0082FB",
    topBarText: "#FFFFFF",
    // Shop title color
    shopTitleColor: "#0079EB",
    // Image gallery bg
    imageBg: "#F5F5F5",
    // Category overlay
    categoryOverlayBg: "rgba(0,0,0,0.6)",
    categoryOverlayText: "#FFFFFF",
  },

  // Default typography
  font: "Inter",
  headingFont: "var(--font-display), ui-sans-serif, system-ui, sans-serif",

  // Default grid layout
  grid: {
    products: { mobile: 2, desktop: 4 },
    categories: { mobile: 2, desktop: 4 },
    listing: { mobile: 2, desktop: 3 },
    search: { mobile: 2, desktop: 4 },
  },

  // Default border radii — electronics-classic uses square/minimal radius
  radius: {
    card: "8px",
    category: "8px",
    button: "4px",
  },

  // Layout options
  layout: {
    cardStyle: "flat" as const,
    cardHoverEffect: "scale" as const,
    cardImageRatio: "square" as const,
    navStyle: "grid" as const,
    tabStyle: "underline" as const,
    bannerHeight: "normal" as const,
    headerStyle: "standard" as const,
    footerStyle: "columns" as const,
  },

  // Navigation links (Colombian-Spanish labels)
  navLinks: [
    { label: "Todos los productos", href: "/" },
    { label: "Electrodomésticos", href: "/catalogo" },
    { label: "Audio & Video", href: "/catalogo" },
    { label: "Refrigeradores", href: "/catalogo" },
    { label: "Nuevos", href: "/catalogo" },
    { label: "Ofertas del día", href: "/catalogo" },
  ],

  // Footer columns
  footerServices: [
    "Ofertas especiales",
    "Categorías",
    "Marcas",
    "Rebajas",
    "Ofertas semanales",
  ],
  footerAssistance: [
    "Pedidos en línea",
    "Devoluciones",
    "Envíos y entregas",
    "Pagos",
    "Preguntas frecuentes",
  ],

  // Product tabs
  productTabs: [
    { id: "new-arrival" as const, label: "Nuevos" },
    { id: "bestseller" as const, label: "Más vendidos" },
    { id: "featured" as const, label: "Destacados" },
  ],

  // Popular search chips
  popularSearches: [
    "Audífonos",
    "iPhone",
    "Parlante",
    "Laptop",
    "TV",
    "Cocina",
    "Cámara",
    "Aire acondicionado",
  ],

  // Home page sections — reorderable + hideable
  sections: [
    { id: "hero" as const, visible: true },
    { id: "categories" as const, visible: true },
    { id: "products" as const, visible: true },
    { id: "feature-cards" as const, visible: true },
    { id: "promo-banner" as const, visible: true },
    { id: "testimonials" as const, visible: true },
  ],

  // ── Default recipe (composable section defaults) ─────────────────────────
  recipe: {
    defaultHeroVariant: "contained" as const,
    defaultCategoryNavVariant: "image-pills" as const,
    defaultCardContentLayout: "below-image" as const,
    defaultBottomNavVariant: "flat-solid" as const,
    defaultHeaderVariant: "multi-tier" as const,
    defaultFooterVariant: "three-column" as const,
    defaultCartVariant: "detailed" as const,
    defaultCheckoutVariant: "detailed" as const,
  },

  // Default branding
  branding: {
    storeName: "Electronics Classic",
    description: "Tu tienda de electrónica y electrodomésticos",
    socialLinks: {},
  } satisfies BrandingConfig,

  // Default content
  content: {
    heroBanner: {
      title: "El mejor sistema de entretenimiento para tu hogar",
      subtitle: "Encuentra los mejores equipos de electrónica al mejor precio.",
      ctaText: "Comprar ahora",
    },
    navLinks: [
      { label: "Todos los productos", href: "/" },
      { label: "Electrodomésticos", href: "/catalogo" },
    ],
    footerServices: [
      "Ofertas especiales",
      "Categorías",
      "Marcas",
      "Rebajas",
      "Ofertas semanales",
    ],
    footerAssistance: [
      "Pedidos en línea",
      "Devoluciones",
      "Envíos y entregas",
      "Pagos",
      "Preguntas frecuentes",
    ],
    productTabs: [
      { id: "new-arrival", label: "Nuevos" },
      { id: "bestseller", label: "Más vendidos" },
      { id: "featured", label: "Destacados" },
    ],
    popularSearches: [
      "Audífonos",
      "iPhone",
      "Parlante",
      "Laptop",
      "TV",
      "Cocina",
      "Cámara",
      "Aire acondicionado",
    ],
  } satisfies ContentConfig,

  // Default business info
  business: {
    currency: "COP",
    paymentMethods: [],
  } satisfies BusinessConfig,
} as const satisfies TemplateConfig;

export type ElectronicsClassicConfig = typeof electronicsClassicConfig;
