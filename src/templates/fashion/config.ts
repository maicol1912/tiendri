// Fashion Template — Configuration
// Template metadata and default theme values.
// Monochromatic B&W — elegant, minimal, fashion-forward.

import type { TemplateConfig } from "@/types/templates";
import type { BrandingConfig, ContentConfig, BusinessConfig } from "@/types/templates";

export const fashionConfig = {
  id: "fashion",
  name: "Fashion",
  description: "Ideal para moda, ropa, accesorios y estilo de vida",

  // Default theme colors — monochromatic B&W palette
  colors: {
    // Core tokens (required by TemplateColorTokens)
    primary: "#000000",
    secondary: "#D9D9D9",
    background: "#F5F5F0",
    cardBg: "#FFFFFF",
    border: "#D9D9D9",
    surface: "#D9D9D9",
    textMuted: "#8A8A8A",
    buttonBg: "#D9D9D9",
    buttonText: "#000000",
    footerBg: "#F5F5F0",
    // Badge (cart count, labels)
    badgeBg: "#D9D9D9",
    badgeText: "#000000",
    // Header / nav
    headerBg: "#F5F5F0",
    navBorder: "#D9D9D9",
    // Section backgrounds
    sectionBg: "#FFFFFF",
    // Search
    searchBg: "#D9D9D9",
    // Text variants
    textPrimary: "#000000",
    textSecondary: "#5E5E5E",
    textSubtle: "#A3A3A3",
    textFooter: "#5E5E5E",
    textBreadcrumb: "#8A8A8A",
    textSummerSale: "#8A8A8A",
    // Border variants
    borderLight: "#D9D9D9",
    borderInput: "#D9D9D9",
    borderMid: "#D9D9D9",
    // Divider
    divider: "#D9D9D9",
    // Rating
    ratingBarBg: "#D9D9D9",
    ratingStar: "#000000",
    // Spec / review badges
    specBadgeBg: "#F5F5F0",
    reviewBg: "#F5F5F0",
    // Pagination / search suggestion
    paginationBg: "#F5F5F0",
    // Active states
    tabActive: "#000000",
    categoryActiveBg: "#000000",
    categoryActiveText: "#FFFFFF",
    // Popular product card backgrounds (light → dark progression)
    popularBg0: "#F6F6F6",
    popularBg1: "#EAEAEA",
    popularBg2: "#CDCDCD",
    popularBg3: "#9A9A9A",
    // Popular product card text colors (per-card)
    popularText0: "#000000",
    popularText1: "#000000",
    popularText2: "#000000",
    popularText3: "#FFFFFF",
  },

  // Typography — clean sans-serif
  font: "Inter",
  headingFont: "var(--font-display), ui-sans-serif, system-ui, sans-serif",

  // Grid layout — fashion uses 2/4 for products and listings; 2/4 for categories
  grid: {
    products: {
      mobile: 2,
      desktop: 4,
    },
    categories: {
      mobile: 2,
      desktop: 4,
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

  // Border radii — sharp edges everywhere (0px)
  radius: {
    card: "0px",
    category: "0px",
    button: "0px",
  },

  // Layout options — fashion-forward visual style
  layout: {
    cardStyle: "flat" as const,
    cardHoverEffect: "scale" as const,
    cardImageRatio: "portrait" as const,   // 3:4 — standard fashion product shot
    tabStyle: "underline" as const,
    navStyle: "scroll" as const,           // horizontal scroll nav (centered desktop)
    bannerHeight: "tall" as const,
    headerStyle: "centered" as const,      // logo centered, links flanking
    footerStyle: "minimal" as const,
  },

  // Navigation links
  navLinks: [
    { label: "HOMBRES", href: "/hombres" },
    { label: "MUJERES", href: "/mujeres" },
    { label: "NIÑOS", href: "/ninos" },
    { label: "NUEVA COLECCIÓN", href: "/nueva-coleccion" },
  ],

  // Footer service links — fashion-appropriate
  footerServices: [
    "Guía de tallas",
    "Tarjetas de regalo",
    "Programa de lealtad",
    "Cuotas sin interés",
    "Métodos de pago",
    "Envío express",
  ],

  // Footer assistance links
  footerAssistance: [
    "Rastrear pedido",
    "Política de envíos",
    "Cambios y devoluciones",
    "Cuidado de prendas",
    "Preguntas frecuentes",
    "Términos y condiciones",
  ],

  // Product tabs — fashion-specific tab labels
  productTabs: [
    { id: "new-arrival" as const, label: "Nueva Colección" },
    { id: "bestseller" as const, label: "Más Vendidos" },
    { id: "featured" as const, label: "Destacados" },
  ],

  // Popular search terms — fashion-relevant
  popularSearches: [
    "Camiseta negra",
    "Vestido midi",
    "Blazer mujer",
    "Pantalón slim",
    "Chaqueta oversize",
    "Accesorios",
  ],

  // Home page sections — fashion layout
  sections: [
    { id: "hero" as const, visible: true },
    { id: "collections" as const, visible: true },
    { id: "editorial" as const, visible: true },
  ],

  // ── Default recipe (composable section defaults) ─────────────────────────
  recipe: {
    defaultHeroVariant: "text-only" as const,
    defaultCategoryNavVariant: "horizontal-scroll" as const,
    defaultCardContentLayout: "below-image" as const,
    defaultBottomNavVariant: "flat-solid" as const,
    defaultHeaderVariant: "minimal-dark" as const,
    defaultFooterVariant: "compact-row" as const,
    defaultCartVariant: "minimal" as const,
    defaultCheckoutVariant: "minimal" as const,
  },

  // ── Default branding ─────────────────────────────────────────────────────────
  branding: {
    storeName: "Mi Tienda de Moda",
    description: "Tu destino de moda en Colombia",
    socialLinks: {},
  } satisfies BrandingConfig,

  // ── Default content ──────────────────────────────────────────────────────────
  content: {
    heroBanner: {
      title: "Nueva Colección",
      subtitle: "Piezas esenciales para el guardarropa moderno. Minimalismo y elegancia.",
      ctaText: "Ver colección",
    },
    navLinks: [
      { label: "HOMBRES", href: "/hombres" },
      { label: "MUJERES", href: "/mujeres" },
      { label: "NIÑOS", href: "/ninos" },
      { label: "NUEVA COLECCIÓN", href: "/nueva-coleccion" },
    ],
    footerServices: [
      "Guía de tallas",
      "Tarjetas de regalo",
      "Programa de lealtad",
      "Cuotas sin interés",
      "Métodos de pago",
      "Envío express",
    ],
    footerAssistance: [
      "Rastrear pedido",
      "Política de envíos",
      "Cambios y devoluciones",
      "Cuidado de prendas",
      "Preguntas frecuentes",
      "Términos y condiciones",
    ],
    productTabs: [
      { id: "new-arrival", label: "Nueva Colección" },
      { id: "bestseller", label: "Más Vendidos" },
      { id: "featured", label: "Destacados" },
    ],
    popularSearches: [
      "Camiseta negra",
      "Vestido midi",
      "Blazer mujer",
      "Pantalón slim",
      "Chaqueta oversize",
      "Accesorios",
    ],
  } satisfies ContentConfig,

  // ── Default business info ────────────────────────────────────────────────────
  business: {
    currency: "COP",
    paymentMethods: [],
  } satisfies BusinessConfig,
} as const satisfies TemplateConfig;

export type FashionConfig = typeof fashionConfig;
