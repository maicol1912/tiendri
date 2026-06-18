// Fashion Template — Manifest
// Template metadata, default theme values, and variant declarations.
// Monochromatic B&W — elegant, minimal, fashion-forward.

import type { TemplateManifest } from "@/types/templates/manifest";
import type { BrandingConfig, ContentConfig, BusinessConfig } from "@/types/templates";

export const fashionManifest = {
  id: "fashion",
  name: "Fashion",
  description: "Ideal para moda, ropa, accesorios y estilo de vida",

  // Default theme colors — monochromatic B&W palette
  colors: {
    primary: '#000000',
    secondary: '#D9D9D9',
    background: '#F5F5F0',
    foreground: '#000000',
    card: '#FFFFFF',
    border: '#D9D9D9',
    muted: '#8A8A8A',
    accent: '#000000',
    onPrimary: '#FFFFFF',
    // Extra tokens
    buttonBg: '#D9D9D9',
    buttonText: '#000000',
    surface: '#D9D9D9',
    searchBg: '#D9D9D9',
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
    cardImageRatio: "portrait" as const,   // 3:4 — standard fashion product shot
    gridDensity: "compact" as const,
    spacingDensity: "airy" as const,
  },

  // Home page sections — fashion layout
  sections: [
    { id: "hero" as const, visible: true },
    { id: "collections" as const, visible: true },
    { id: "editorial" as const, visible: true },
  ],

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
    productDetailTabs: [
      { id: "descripcion", label: "Descripción", content: "Pieza de moda diseñada con materiales de alta calidad para un estilo cómodo y sofisticado. Perfecta para cualquier ocasión." },
      { id: "detalles", label: "Detalles", content: "Confección de primera línea con acabados cuidados al detalle. Disponible en múltiples tallas y colores de temporada." },
      { id: "cuidados", label: "Cuidados", content: "Lavar a máquina en agua fría con colores similares. No usar secadora. Planchar a temperatura media por el revés de la prenda." },
      { id: "envio_devoluciones", label: "Envío y devoluciones", content: "Envío gratis en compras superiores a $150.000. Cambios y devoluciones dentro de los 30 días siguientes a la compra." },
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

  // ── Variant declarations ─────────────────────────────────────────────────────
  variants: {
    header: "GLASS",
    footer: "COLUMNS",
    bottomNav: "EDGE",
    hero: "EDITORIAL",
    categoryNav: "HORIZONTAL_SCROLL",
    productCard: "BELOW_IMAGE",
    searchBar: "INLINE",
  },
} as const satisfies TemplateManifest;

export type FashionManifest = typeof fashionManifest;
