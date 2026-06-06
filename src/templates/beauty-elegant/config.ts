// Beauty Elegant Template — Configuration
// Purple/violet glassmorphic cosmetic store theme.
// Inspired by Blushora beauty brand aesthetics.

import type { TemplateConfig } from "@/types/templates";
import type { BrandingConfig, ContentConfig, BusinessConfig } from "@/types/templates";

export const beautyElegantConfig = {
  id: "beauty-elegant",
  name: "Beauty Elegant",
  description: "Ideal para cosméticos, maquillaje y marcas de belleza premium",

  colors: {
    primary: "#7700CF",
    secondary: "#190E2C",
    background: "#FEFEFF",
    textPrimary: "#000000",
    headerBg: "#FEFEFFEF",
    sectionBg: "#FFFFFF",
    cardBg: "#F0EDF5",
    border: "#E4E7EC",
    surface: "#F0EDF5",
    searchBg: "#BF68FF14",
    searchBorder: "#B081D3",
    textMuted: "#6E6E6E",
    textFooter: "#B1B0B0",
    buttonBg: "#7700CF",
    buttonText: "#FFFFFF",
    footerBg: "#FFFFFF",
    badgeBg: "#7700CF",
    badgeText: "#FFFFFF",
    navBorder: "#B081D320",
    textSecondary: "#3C3C3C",
    textSubtle: "#8A8A8A",
    borderLight: "#B081D320",
    borderInput: "#B081D34D",
    borderMid: "#B081D3",
    ratingStar: "#F97316",
    ratingBarBg: "#E5E5EE",
    paginationBg: "#F0EDF5",
    textBreadcrumb: "#9DA2A6",
    tabActive: "#7700CF",
    categoryActiveBg: "#7700CF",
    categoryActiveText: "#FFFFFF",
    iconPillBg: "#BF68FF14",
    discountBg: "#01000185",
    discountText: "#FFFFFF",
    // Popular product card backgrounds (glassmorphic progression)
    popularBg0: "#F6F2FB",
    popularBg1: "#EDE5F7",
    popularBg2: "#D8CAF0",
    popularBg3: "#C2ADE6",
    popularText0: "#000000",
    popularText1: "#000000",
    popularText2: "#000000",
    popularText3: "#FFFFFF",
    // Product detail glassmorphic overlay
    detailOverlayBg: "#37284ABF",
    detailInnerBg: "#654D91B8",
    // Bottom nav dark pill
    bottomNavBg: "#190E2CCC",
    // Back button bg
    backButtonBg: "#655683",
    // Review / health facts card
    reviewBg: "#F9F5FF",
    specBadgeBg: "#F0EDF5",
  },

  font: "Inter",
  headingFont: "Inter, var(--font-display), ui-sans-serif, system-ui, sans-serif",

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
      desktop: 4,
    },
    search: {
      mobile: 2,
      desktop: 4,
    },
  },

  radius: {
    card: "16px",
    category: "20px",
    button: "9999px",
  },

  layout: {
    cardStyle: "flat" as const,
    cardHoverEffect: "none" as const,
    cardImageRatio: "portrait" as const,
    tabStyle: "underline" as const,
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
    "Sérum Vitamina C",
    "Crema Hidratante",
    "Base Líquida",
    "Labial Mate",
    "Paleta de Sombras",
    "Perfume Floral",
  ],

  sections: [
    { id: "hero" as const, visible: true },
    { id: "categories" as const, visible: true },
    { id: "products" as const, visible: true },
  ],

  recipe: {
    defaultHeroVariant: "split" as const,
    defaultCategoryNavVariant: "chips" as const,
    defaultCardContentLayout: "glassmorphic-discount" as const,
    defaultBottomNavVariant: "flat-solid" as const,
    defaultHeaderVariant: "glassmorphic" as const,
    defaultFooterVariant: "compact-row" as const,
    defaultCartVariant: "minimal" as const,
    defaultCheckoutVariant: "minimal" as const,
  },

  branding: {
    storeName: "Mi Tienda",
    description: "Tu tienda de belleza premium en Tiendri",
    socialLinks: {},
  } satisfies BrandingConfig,

  content: {
    heroBanner: {
      title: "Descubre tu belleza con productos premium",
      subtitle: "Cosméticos, maquillaje y cuidado personal de alta calidad.",
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
      "Sérum Vitamina C",
      "Crema Hidratante",
      "Base Líquida",
      "Labial Mate",
      "Paleta de Sombras",
      "Perfume Floral",
    ],
  } satisfies ContentConfig,

  business: {
    currency: "COP",
    paymentMethods: [],
  } satisfies BusinessConfig,
} as const satisfies TemplateConfig;

export type BeautyElegantConfig = typeof beautyElegantConfig;
