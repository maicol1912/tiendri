// Tech Premium Template — Manifest
// Centralised source of truth: theme defaults + variant declarations.
// Supersedes config.ts (deleted) and structuralVariants.

import type { TemplateManifest } from "@/types/templates/manifest";
import type { BrandingConfig, ContentConfig, BusinessConfig } from "@/types/templates";

export const techPremiumManifest = {
  id: "tech-premium",
  name: "Tech Premium",
  description: "Ideal para tecnología, electrónica y gadgets",

  // Default theme colors
  colors: {
    primary: '#000000',
    secondary: '#211C24',
    background: '#FAFAFA',
    foreground: '#000000',
    card: '#F6F6F6',
    border: '#B5B5B5',
    muted: '#787878',
    accent: '#FFB547',
    onPrimary: '#FFFFFF',
    // Extra tokens
    footerBg: '#000000',
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
  layout: {
    cardImageRatio: "square" as const,
    gridDensity: "standard" as const,
    spacingDensity: "normal" as const,
    cardStyle: "transparent" as const,
  },

  // Home page sections — order determines render order, visible toggles show/hide.
  // Header, Footer, and BottomNav are structural and excluded from this system.
  sections: [
    { id: "hero" as const, visible: true },
    { id: "banners" as const, visible: true },
    { id: "categories" as const, visible: true },
    { id: "products" as const, visible: true },
    { id: "popular" as const, visible: true },
  ],

  // ── Default branding (store identity) ────────────────────────────────────────
  branding: {
    storeName: "Mi Tienda",
    description: "Tu tienda online en Tiendri",
    socialLinks: {},
  } satisfies BrandingConfig,

  // ── Default content (navigation, hero, footer, product tabs) ─────────────────
  content: {
    heroBanner: {
      image: "/mocks/tech-premium/hero-bento.png",
      title: "",
      subtitle: "",
      ctaText: "",
    },
    navLinks: [
      { label: "Inicio", href: "/" },
      { label: "Catálogo", href: "/catalogo" },
      { label: "Info", href: "/info" },
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

  // ── Default business info ─────────────────────────────────────────────────────
  business: {
    currency: "COP",
    paymentMethods: [],
  } satisfies BusinessConfig,

  // ── Variant declarations ──────────────────────────────────────────────────────
  variants: {
    header: "DEFAULT",
    footer: "COLUMNS",
    bottomNav: "EDGE",
    hero: "PROMO_CARD",
    categoryNav: "HORIZONTAL_SCROLL",
    productCard: "BELOW_IMAGE",
    searchBar: "INLINE",
  },

  heroConstrained: false,
  showSearchBar: false,
  showAddToCartInGrid: false,
  showDiscountBadge: false,
  categorySize: "large",
} as const satisfies TemplateManifest;

export type TechPremiumManifest = typeof techPremiumManifest;
