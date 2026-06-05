// Furniture Light Template — Configuration
// KASA-inspired: white bg, orange #F5841F accent, teal #26A69A bookmarks, dark navy #1B2838
// Design: clean Scandinavian light, lifestyle product cards, icon categories.

import type { TemplateConfig } from "@/types/templates";
import type { BrandingConfig, ContentConfig, BusinessConfig } from "@/types/templates";

export const furnitureLightConfig = {
  id: "furniture-light",
  name: "Furniture Light",
  description: "Ideal para tiendas de muebles, decoración y hogar con estilo escandinavo claro",

  colors: {
    primary: "#F5841F",
    secondary: "#1B2838",
    background: "#FFFFFF",
    textPrimary: "#1B2838",
    headerBg: "#FFFFFF",
    sectionBg: "#FFFFFF",
    cardBg: "#F5F7FA",
    border: "#E5E8EB",
    surface: "#F5F7FA",
    searchBg: "#F5F7FA",
    textMuted: "#666666",
    textFooter: "#999999",
    buttonBg: "#F5841F",
    buttonText: "#FFFFFF",
    footerBg: "#FFFFFF",
    badgeBg: "#F5841F",
    badgeText: "#FFFFFF",
    specBadgeBg: "#F5F7FA",
    reviewBg: "#FAFAFA",
    navBorder: "#E5E8EB",
    textSecondary: "#666666",
    textSubtle: "#999999",
    borderLight: "#F0F0F0",
    borderInput: "#E5E8EB",
    borderMid: "#E5E8EB",
    ratingBarBg: "#F0F0F0",
    ratingStar: "#F5841F",
    paginationBg: "#F5F7FA",
    textSummerSale: "#666666",
    textBreadcrumb: "#999999",
    tabActive: "#1B2838",
    categoryActiveBg: "#1B2838",
    categoryActiveText: "#FFFFFF",
    // Bookmark / wishlist teal color
    bookmarkBg: "#26A69A",
    // Wallet bar gradient start (mobile)
    walletBg: "#1B2838",
    // Popular product card backgrounds
    popularBg0: "#F0E6D4",
    popularBg1: "#E8F5E9",
    popularBg2: "#FEF9E7",
    popularBg3: "#E6F0F8",
    popularText0: "#1B2838",
    popularText1: "#1B2838",
    popularText2: "#1B2838",
    popularText3: "#1B2838",
  },

  font: "Inter",
  headingFont: "var(--font-display), ui-sans-serif, system-ui, sans-serif",

  grid: {
    products: { mobile: 2, desktop: 4 },
    categories: { mobile: 5, desktop: 5 },
    listing: { mobile: 2, desktop: 3 },
    search: { mobile: 2, desktop: 4 },
  },

  radius: {
    card: "16px",
    category: "14px",
    button: "12px",
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
    { label: "Explorar", href: "/buscar" },
  ],

  footerServices: [
    "Política de privacidad",
    "Términos y condiciones",
  ],

  footerAssistance: [
    "Preguntas frecuentes",
    "Contacto",
  ],

  productTabs: [
    { id: "new-arrival" as const, label: "Nuevos" },
    { id: "bestseller" as const, label: "Más vendidos" },
    { id: "featured" as const, label: "Destacados" },
  ],

  popularSearches: [
    "Sillas",
    "Mesas",
    "Sofás",
    "Camas",
    "Estantes",
    "Lámparas",
  ],

  sections: [
    { id: "hero" as const, visible: true },
    { id: "categories" as const, visible: true },
    { id: "flash-sale" as const, visible: true },
    { id: "room-styles" as const, visible: true },
    { id: "products" as const, visible: true },
  ],

  branding: {
    storeName: "Mi Tienda",
    description: "Tu tienda de muebles en Tiendri",
    socialLinks: {},
  } satisfies BrandingConfig,

  content: {
    heroBanner: {
      title: "¡Nueva colección disponible!",
      subtitle: "Ver más",
      ctaText: "Ver catálogo",
    },
    navLinks: [
      { label: "Inicio", href: "/" },
      { label: "Catálogo", href: "/catalogo" },
      { label: "Explorar", href: "/buscar" },
    ],
    footerServices: [
      "Política de privacidad",
      "Términos y condiciones",
    ],
    footerAssistance: [
      "Preguntas frecuentes",
      "Contacto",
    ],
    productTabs: [
      { id: "new-arrival", label: "Nuevos" },
      { id: "bestseller", label: "Más vendidos" },
      { id: "featured", label: "Destacados" },
    ],
    popularSearches: [
      "Sillas",
      "Mesas",
      "Sofás",
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

export type FurnitureLightConfig = typeof furnitureLightConfig;
