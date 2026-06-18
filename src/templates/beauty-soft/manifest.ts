import type { TemplateManifest } from "@/types/templates/manifest";
import type { BrandingConfig, ContentConfig, BusinessConfig } from "@/types/templates";

export const beautySoftManifest = {
  id: "beauty-soft",
  name: "Beauty Soft",
  description: "Ideal para belleza, cosméticos, bienestar y cuidado personal",

  colors: {
    primary: '#FF4428',
    secondary: '#F5F4F7',
    background: '#F4F4F7',
    foreground: '#000000',
    card: '#F4F4F7',
    border: '#E5E5EE',
    muted: '#9DA2A6',
    accent: '#F97316',
    onPrimary: '#FFFFFF',
    surface: '#D8D5D0',
    iconPillBg: '#F6F5F5',
    discountBg: '#DBDADD',
    discountText: '#FFFFFF',
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
    cardImageRatio: "square" as const,
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
    description: "Tu tienda de belleza online en Tiendri",
    socialLinks: {},
  } satisfies BrandingConfig,

  content: {
    heroBanner: {
      tag: "GLOW STUDIO",
      title: "Cuida tu piel con lo mejor",
      subtitle: "Hasta 30% de descuento",
      ctaText: "Ver productos",
      image: "/mocks/beauty-soft/hero-banner.png",
    },
    navLinks: [
      { label: "Inicio", href: "" },
      { label: "Catálogo", href: "/catalogo" },
      { label: "Info", href: "/info" },
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
      { id: "descripcion", label: "Descripción", content: "Producto de belleza formulado con ingredientes naturales de alta eficacia. Ideal para todo tipo de piel, apto para uso diario en tu rutina de cuidado." },
      { id: "ingredientes", label: "Ingredientes", content: "Formulado con activos dermatológicamente probados: ácido hialurónico, vitamina C y extractos botánicos. Sin parabenos, sin sulfatos." },
      { id: "modo_de_uso", label: "Modo de uso", content: "Aplicar sobre piel limpia con movimientos circulares suaves. Usar mañana y noche para mejores resultados. Evitar el contacto con los ojos." },
      { id: "envio", label: "Envío", content: "Envío a todo Colombia en 2-5 días hábiles. Empaque discreto y seguro para proteger el producto durante el transporte." },
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

  variants: {
    header: "GLASS",
    footer: "COMPACT",
    bottomNav: "FLOATING_PILL",
    hero: "CARD_SPLIT",
    categoryNav: "HORIZONTAL_SCROLL",
    productCard: "BELOW_IMAGE",
    searchBar: "ICON_TRIGGER",
  },

  /** beauty-soft no muestra el botón "Comprar" en la grilla del home */
  showAddToCartInGrid: false,

  /**
   * Vacío para que el eyebrow del CARD_SPLIT hero muestre el tag ("GLOW STUDIO")
   * en vez del nombre de tienda. Sin esto, titleLight defaultea a store.name.
   */
  heroTitleLight: "",

  /** Restringe el hero a ~65% del ancho, centrado: max-w-[92%] lg:max-w-[65%] mx-auto */
  heroConstrained: true,

  /** Encabezados de sección visibles */
  categoriesHeading: "Categorías",
  productsHeading: "Para vos",
} as const satisfies TemplateManifest;

export type BeautySoftManifest = typeof beautySoftManifest;
