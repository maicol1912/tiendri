// Beauty Soft Template — Configuration
// Template metadata and default theme values.
// Inspired by soft, feminine, wellness/beauty aesthetics.

import type { TemplateConfig } from "@/types/templates";
import type { BrandingConfig, ContentConfig, BusinessConfig } from "@/types/templates";

export const beautySoftConfig = {
  id: "beauty-soft",
  name: "Beauty Soft",
  description: "Ideal para belleza, cosméticos, bienestar y cuidado personal",

  colors: {
    primary: "#FF4428",
    secondary: "#F5F4F7",
    background: "#F4F4F7",
    textPrimary: "#000000",
    headerBg: "#FFFFFF",
    sectionBg: "#FFFFFF",
    cardBg: "#F4F4F7",
    border: "#E5E5EE",
    surface: "#D8D5D0",
    searchBg: "#F4F4F7",
    textMuted: "#9DA2A6",
    textFooter: "#B1B0B0",
    buttonBg: "#FF4428",
    buttonText: "#FFFFFF",
    footerBg: "#FFFFFF",
    badgeBg: "#FF4428",
    badgeText: "#FFFFFF",
    navBorder: "#E5E5EE",
    textSecondary: "#8A8A8A",
    textSubtle: "#949494",
    borderLight: "#E5E5EE",
    borderInput: "#E5E5EE",
    borderMid: "#B1B0B0",
    ratingStar: "#F97316",
    ratingBarBg: "#E5E5EE",
    paginationBg: "#F4F4F7",
    textBreadcrumb: "#9DA2A6",
    tabActive: "#FF4428",
    categoryActiveBg: "#FF4428",
    categoryActiveText: "#FFFFFF",
    // Icon/pill backgrounds
    iconPillBg: "#F6F5F5",
    // Discount/sale badge
    discountBg: "#DBDADD",
    discountText: "#FFFFFF",
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
  headingFont: "'Wix Madefor Display', var(--font-display), ui-sans-serif, system-ui, sans-serif",

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

  radius: {
    card: "20px",
    category: "20px",
    button: "29px",
  },

  layout: {
    cardStyle: "flat" as const,
    cardHoverEffect: "none" as const,
    cardImageRatio: "square" as const,
    tabStyle: "pills" as const,
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
    "Sérum vitamina C",
    "Crema hidratante",
    "Protector solar",
    "Gel limpiador",
    "Mascarilla facial",
    "Tónico facial",
  ],

  sections: [
    { id: "hero" as const, visible: true },
    { id: "categories" as const, visible: true },
    { id: "products" as const, visible: true },
  ],

  // ── Default recipe (composable section defaults) ─────────────────────────
  recipe: {
    defaultHeroVariant: "split" as const,
    defaultCategoryNavVariant: "chips" as const,
    defaultCardContentLayout: "below-image" as const,
    defaultBottomNavVariant: "flat-solid" as const,
    defaultHeaderVariant: "location-greeting" as const,
    defaultFooterVariant: "social-icons" as const,
    defaultCartVariant: "minimal" as const,
    defaultCheckoutVariant: "minimal" as const,
  },

  branding: {
    storeName: "Mi Tienda",
    description: "Tu tienda de belleza online en Tiendri",
    socialLinks: {},
  } satisfies BrandingConfig,

  content: {
    heroBanner: {
      title: "Descubre tu rutina ideal de belleza",
      subtitle: "Los mejores productos de cuidado personal al mejor precio.",
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
      "Sérum vitamina C",
      "Crema hidratante",
      "Protector solar",
      "Gel limpiador",
      "Mascarilla facial",
      "Tónico facial",
    ],
  } satisfies ContentConfig,

  business: {
    currency: "COP",
    paymentMethods: [],
  } satisfies BusinessConfig,
} as const satisfies TemplateConfig;

export type BeautySoftConfig = typeof beautySoftConfig;
