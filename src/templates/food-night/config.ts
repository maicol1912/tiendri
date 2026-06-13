// Food Night Template — Configuration
// Dark food delivery / pizza app theme.
// Default: very dark brown/black background, warm red primary accent.

import type { TemplateConfig } from "@/types/templates";
import type { BrandingConfig, ContentConfig, BusinessConfig } from "@/types/templates";

export const foodNightConfig = {
  id: "food-night",
  name: "Food Night",
  description: "Ideal para restaurantes, pizzerías y delivery de comida — estética oscura y apetitosa",

  colors: {
    // Primary — CTA buttons, active states, accent
    primary: "#F13658",
    // Secondary — dark surface inside cards/headers
    secondary: "#292526",
    // Page background
    background: "#0E0600",
    // Text
    textPrimary: "#FFFFFF",
    textSecondary: "#CAC9C9",
    textMuted: "#878787",
    textFooter: "#878787",
    textBreadcrumb: "#CAC9C9",
    textSummerSale: "#878787",
    textSubtle: "#CAC9C9",
    // Surfaces
    headerBg: "#0E0600",
    sectionBg: "#0E0600",
    cardBg: "#292526",
    surface: "#292526",
    searchBg: "transparent",
    reviewBg: "#1A1210",
    paginationBg: "#292526",
    specBadgeBg: "#292526",
    // Borders
    border: "#DFDEDE",
    borderLight: "rgba(255,255,255,0.08)",
    borderInput: "#DFDEDE",
    borderMid: "rgba(255,255,255,0.08)",
    navBorder: "rgba(255,255,255,0.08)",
    // Buttons
    buttonBg: "#FFFFFF",
    buttonText: "#121111",
    // Footer
    footerBg: "#0E0600",
    // Badges (cart count)
    badgeBg: "#F13658",
    badgeText: "#FFFFFF",
    // Rating star
    ratingStar: "#FFD33C",
    ratingBarBg: "#292526",
    // Tab active (category pills)
    tabActive: "#FFFFFF",
    categoryActiveBg: "#FFFFFF",
    categoryActiveText: "#121111",
    // Popular product card backgrounds (dark progression)
    popularBg0: "#3A2820",
    popularBg1: "#2C1E18",
    popularBg2: "#1E1410",
    popularBg3: "#120C08",
    popularText0: "#FFFFFF",
    popularText1: "#FFFFFF",
    popularText2: "#FFFFFF",
    popularText3: "#FFFFFF",
  },

  font: "Inter",
  headingFont: "var(--font-display), ui-sans-serif, system-ui, sans-serif",

  grid: {
    products: { mobile: 2, desktop: 4 },
    categories: { mobile: 3, desktop: 6 },
    listing: { mobile: 2, desktop: 3 },
    search: { mobile: 2, desktop: 4 },
  },

  radius: {
    card: "16px",
    category: "8px",
    button: "45px",
  },

  layout: {
    cardStyle: "flat" as const,
    cardHoverEffect: "none" as const,
    cardImageRatio: "portrait" as const,
    tabStyle: "pills" as const,
    navStyle: "pills" as const,
    bannerHeight: "normal" as const,
    headerStyle: "standard" as const,
    footerStyle: "minimal" as const,
  },

  navLinks: [
    { label: "Inicio", href: "/" },
    { label: "Catálogo", href: "/listing" },
  ],

  footerServices: [
    "Domicilios",
    "Pedidos corporativos",
    "Descuentos especiales",
  ],

  footerAssistance: [
    "Preguntas frecuentes",
    "Rastrear pedido",
    "Términos de uso",
  ],

  productTabs: [
    { id: "new-arrival" as const, label: "Nuevos" },
    { id: "bestseller" as const, label: "Más pedidos" },
    { id: "featured" as const, label: "Destacados" },
  ],

  popularSearches: [
    "Pizza",
    "Hamburguesa",
    "Pollo",
    "Vegetariano",
    "Combos",
    "Bebidas",
  ],

  sections: [
    { id: "hero" as const, visible: true },
    { id: "categories" as const, visible: true },
    { id: "products" as const, visible: true },
  ],

  branding: {
    storeName: "Mi Restaurante",
    description: "Tu restaurante favorito en Tiendri",
    socialLinks: {},
  } satisfies BrandingConfig,

  content: {
    heroBanner: {
      title: "El sabor que te mereces",
      subtitle: "Los mejores platos, listos para tu mesa o tu puerta.",
      ctaText: "Ver menú",
    },
    navLinks: [
      { label: "Inicio", href: "/" },
      { label: "Catálogo", href: "/listing" },
    ],
    footerServices: [
      "Domicilios",
      "Pedidos corporativos",
      "Descuentos especiales",
    ],
    footerAssistance: [
      "Preguntas frecuentes",
      "Rastrear pedido",
      "Términos de uso",
    ],
    productTabs: [
      { id: "new-arrival", label: "Nuevos" },
      { id: "bestseller", label: "Más pedidos" },
      { id: "featured", label: "Destacados" },
    ],
    popularSearches: [
      "Pizza",
      "Hamburguesa",
      "Pollo",
      "Vegetariano",
      "Combos",
      "Bebidas",
    ],
  } satisfies ContentConfig,

  business: {
    currency: "COP",
    paymentMethods: [],
  } satisfies BusinessConfig,
} as const satisfies TemplateConfig;

export type FoodNightConfig = typeof foodNightConfig;
