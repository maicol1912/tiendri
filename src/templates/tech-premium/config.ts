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
  // Default values reproduce the original Figma design exactly.
  layout: {
    cardImageRatio: "square" as const, // "square" | "portrait" | "wide"
    gridDensity: "standard" as const,
    spacingDensity: "normal" as const,
  },

  structuralVariants: {
    heroVariant: 'contained' as const,
    cardContentLayout: 'below-image' as const,
    categoryNavStyle: 'horizontal-scroll' as const,
    addToCartStyle: 'full-width' as const,
    categoryDisplayType: 'icon-text' as const,
  },

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
    productDetailTabs: [
      { id: "descripcion", label: "Descripción", content: "Producto de alta tecnología con las últimas innovaciones del mercado. Diseñado para ofrecer el máximo rendimiento en cada uso." },
      { id: "especificaciones", label: "Especificaciones", content: "Consulta la ficha técnica completa con procesador, memoria, pantalla y conectividad. Compatibilidad con los principales sistemas operativos." },
      { id: "garantia", label: "Garantía", content: "Garantía oficial de 1 año por defectos de fabricación. Servicio técnico autorizado en toda Colombia." },
      { id: "envio", label: "Envío", content: "Envío a todo el país en 2-5 días hábiles. Despacho el mismo día para pedidos antes de las 2 p.m." },
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
