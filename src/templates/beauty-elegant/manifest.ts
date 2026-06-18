import type { TemplateManifest } from "@/types/templates/manifest";
import type { BrandingConfig, ContentConfig, BusinessConfig } from "@/types/templates";

export const beautyElegantManifest = {
  id: "beauty-elegant",
  name: "Beauty Elegant",
  description: "Ideal para cosméticos, maquillaje y marcas de belleza premium",

  colors: {
    primary: '#7700CF',
    secondary: '#190E2C',
    background: '#FEFEFF',
    foreground: '#000000',
    card: '#F0EDF5',
    border: '#E4E7EC',
    muted: '#6E6E6E',
    accent: '#F97316',
    onPrimary: '#FFFFFF',
    searchBg: '#BF68FF14',
    searchBorder: '#B081D3',
    bottomNavBg: '#190E2CCC',
    borderLight: '#B081D320',
    navBorder: '#B081D320',
    detailOverlayBg: '#37284ABF',
    detailInnerBg: '#190E2C',
    iconPillBg: '#BF68FF14',
    discountBg: '#01000185',
    discountText: '#FFFFFF',
    backButtonBg: '#655683',
    reviewBg: '#F9F5FF',
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
    cardImageRatio: "portrait" as const,
    gridDensity: "standard" as const,
    spacingDensity: "normal" as const,
  },

  sections: [
    { id: "hero" as const, visible: true },
    { id: "categories" as const, visible: true },
    { id: "products" as const, visible: true },
  ],

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
      { label: "Inicio", href: "" },
      { label: "Catálogo", href: "/catalogo" },
      { label: "Nosotros", href: "/info" },
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
    productDetailTabs: [
      { id: "descripcion", label: "Descripción", content: "Cosmético premium desarrollado con la más avanzada biotecnología de belleza. Resultados visibles desde las primeras aplicaciones en tu rutina diaria." },
      { id: "ingredientes", label: "Ingredientes", content: "Fórmula enriquecida con péptidos activos, retinol y extracto de rosa mosqueta. Dermatológicamente probado, sin crueldad animal." },
      { id: "beneficios", label: "Beneficios", content: "Hidrata, ilumina y protege la piel en un solo paso. Reduce la apariencia de líneas finas y mejora la textura del cutis en 4 semanas." },
      { id: "envio", label: "Envío", content: "Despacho en 24-48 horas hábiles. Envío nacional con seguimiento en tiempo real y empaque premium especial para regalo." },
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

  variants: {
    header: "GLASS",
    footer: "COMPACT",
    bottomNav: "FLOATING_PILL",
    hero: "CARD_SPLIT",
    categoryNav: "CHIPS",
    productCard: "BELOW_IMAGE",
    searchBar: "INLINE",
  },

  /** beauty-elegant no muestra el botón "Comprar" en la grilla del home */
  showAddToCartInGrid: false,
} as const satisfies TemplateManifest;

export type BeautyElegantManifest = typeof beautyElegantManifest;
