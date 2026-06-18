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

  // Border radii — sharp edges throughout (fashion aesthetic)
  radius: {
    card: "0px",
    category: "0px",
    button: "0px",
  },

  // Layout options — fashion-forward visual style
  layout: {
    cardImageRatio: "portrait" as const,   // 4:5 — tall rectangle, shows full body
    gridDensity: "compact" as const,
    spacingDensity: "airy" as const,
    imageFit: "cover" as const,
    cardStyle: "transparent" as const,
  },

  // Home page sections — fashion layout
  // featured: heroFeaturedCount=4 renders featured products + CTA between hero and collection
  // categories: showCategories=false so section is omitted
  // editorial: editorialHeading is set in content → editorial section renders
  sections: [
    { id: "hero" as const, visible: true },
    { id: "featured" as const, visible: true },
    { id: "products" as const, visible: true },
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
      title: "Colección",
      subtitle: "Verano 2026",
      ctaText: "Ir a la tienda",
    },
    navLinks: [
      { label: "INICIO", href: "/" },
      { label: "CATÁLOGO", href: "/catalogo" },
      { label: "INFO", href: "/info" },
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
    // Editorial section — shown after the product grid
    editorialHeading: "NUESTRO ENFOQUE AL",
    editorialSubheading: "DISEÑO DE MODA",
    editorialBody: "Cada pieza nace de la observación de lo cotidiano. Trabajamos con materiales sostenibles y procesos artesanales para crear ropa que no sigue tendencias.",
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

  // ── Template-specific display flags ──────────────────────────────────────────
  // showSearchBar: false hides the inline search bar even when searchBar: "INLINE"
  showSearchBar: false,
  // showAddToCartInGrid: false hides the "Comprar" CTA button in the product grid
  showAddToCartInGrid: false,
  // showCategories: false hides the categories section on the home page
  showCategories: false,
  // showDiscountBadge: false hides the "-X%" badge over product images
  showDiscountBadge: false,
  // showOriginalPrice: true shows the strikethrough original price under the card
  showOriginalPrice: true,
  // productsHeading: heading displayed above the product collection grid
  productsHeading: "NUEVA COLECCIÓN",
  // heroTitleLight: overrides the light (thin) title line in the EDITORIAL hero
  heroTitleLight: "Nueva",
  // headerIcon: "diamond" renders a ◆ diamond before the store name in GLASS header
  headerIcon: "diamond",
  // heroFeaturedCount: render this many products between the hero title and the CTA button,
  // without discounts or strikethrough. The remaining products form the collection grid below.
  heroFeaturedCount: 4,
} as const satisfies TemplateManifest;

export type FashionManifest = typeof fashionManifest;
