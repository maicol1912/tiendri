// Decor Warm Template — Manifest
// Warm home décor theme: peach accent (#F4B5A4), linen surface (#FAF0E6),
// burnt sienna CTA (#CC7861). Fonts: Poppins + League Spartan.

import type { TemplateManifest } from "@/types/templates/manifest";
import type { BrandingConfig, ContentConfig, BusinessConfig } from "@/types/templates";

export const decorWarmManifest = {
  id: "decor-warm",
  name: "Decor Warm",
  description: "Ideal para tiendas de muebles, decoración y hogar con estética cálida y acogedora",

  colors: {
    primary: '#CC7861',
    secondary: '#FAF0E6',
    background: '#FFFFFF',
    foreground: '#363130',
    card: '#FFFFFF',
    border: '#F0E8E4',
    muted: '#A0A0A0',
    accent: '#CC7861',
    onPrimary: '#FFFFFF',
    // Template-specific extras — generate via buildCssVars
    peach: '#F4B5A4',        // Best-seller card bg, header greeting, search icon bg, hero slides
    darkMode: '#363130',     // Dark text for nav icons, labels, back buttons (alias for foreground)
    iconInactive: '#A0A0A0', // Inactive nav icon color (alias for muted)
  },

  font: "Inter",
  headingFont: "'Poppins', var(--font-display), ui-sans-serif, system-ui, sans-serif",

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
    card: "14px",
    category: "13px",
    button: "30px",
  },

  layout: {
    cardImageRatio: "square" as const,
    gridDensity: "standard" as const,
    spacingDensity: "tight" as const,
  },

  // bestSellers: data-driven — renders BestSellersSection when bestSellers prop has items
  // popular was incorrect; CoreHomePage renders bestSellers before products, not popular cards
  sections: [
    { id: "hero" as const, visible: true },
    { id: "categories" as const, visible: true },
    { id: "bestSellers" as const, visible: true },
    { id: "products" as const, visible: true },
  ],

  branding: {
    storeName: "Mi Tienda",
    description: "Tu tienda de decoración y muebles en Tiendri",
    socialLinks: {},
  } satisfies BrandingConfig,

  content: {
    heroBanner: {
      title: "Experiencia de Confort",
      subtitle: "OFERTA ESPECIAL",
      image: "/mocks/decor-warm/hero-banner.png",
      ctaText: "Ver catálogo",
    },
    promotionalBanners: [
      {
        image: "/mocks/decor-warm/hero-banner-2.png",
        title: "Diseño que Inspira",
        subtitle: "NUEVA COLECCIÓN",
      },
    ],
    navLinks: [
      { label: "Inicio", href: "/" },
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
      { id: "descripcion", label: "Descripción", content: "Pieza de decoración artesanal que combina estética cálida y funcionalidad para crear ambientes acogedores y únicos en tu hogar." },
      { id: "materiales", label: "Materiales", content: "Fabricado con maderas naturales, textiles orgánicos y acabados artesanales. Cada pieza es única con pequeñas variaciones propias del proceso manual." },
      { id: "dimensiones", label: "Dimensiones", content: "Medidas detalladas disponibles en la ficha de cada producto. Recomendamos verificar el espacio antes de realizar el pedido." },
      { id: "envio_garantia", label: "Envío y garantía", content: "Envío protegido con embalaje especial anti-golpes. Garantía de 6 meses en estructura. Cambios sin costo dentro de los primeros 15 días." },
    ],
    popularSearches: [
      "Sillas",
      "Mesas",
      "Lámparas",
      "Camas",
      "Sofás",
      "Decoración",
    ],
  } satisfies ContentConfig,

  business: {
    currency: "COP",
    paymentMethods: [],
  } satisfies BusinessConfig,

  variants: {
    header: "GREETING_SIMPLE",
    footer: "COMPACT",
    bottomNav: "DOT_INDICATOR",
    hero: "CAROUSEL",
    categoryNav: "COLUMNAR",
    productCard: "WITH_DESCRIPTION",
    searchBar: "ICON_TRIGGER",
    bestSellers: "DEFAULT",
  },

  productsHeading: "Nueva Colección",
  heroConstrained: true,
} as const satisfies TemplateManifest;

export type DecorWarmManifest = typeof decorWarmManifest;
