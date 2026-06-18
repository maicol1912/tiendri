// Furniture Light Template — Manifest
// KASA-inspired: white bg, orange #F5841F accent, teal #26A69A bookmarks, dark navy #1B2838
// Design: clean Scandinavian light, lifestyle product cards, icon categories.

import type { TemplateManifest } from "@/types/templates/manifest";
import type { BrandingConfig, ContentConfig, BusinessConfig } from "@/types/templates";

export const furnitureLightManifest = {
  id: "furniture-light",
  name: "Furniture Light",
  description: "Ideal para tiendas de muebles, decoración y hogar con estilo escandinavo claro",

  colors: {
    primary: '#F5841F',
    secondary: '#1B2838',
    background: '#FFFFFF',
    foreground: '#1B2838',
    card: '#F5F7FA',
    border: '#E5E8EB',
    muted: '#666666',
    accent: '#F5841F',
    onPrimary: '#FFFFFF',
    bookmarkBg: '#26A69A',
    walletBg: '#1B2838',
    popularBg0: '#F0E6D4',
    popularBg1: '#E8F5E9',
    popularBg2: '#FEF9E7',
    popularBg3: '#E6F0F8',
    popularText0: '#1B2838',
    popularText1: '#1B2838',
    popularText2: '#1B2838',
    popularText3: '#1B2838',
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
    cardImageRatio: "square" as const,
    gridDensity: "standard" as const,
    spacingDensity: "normal" as const,
    cardStyle: "transparent" as const,
  },

  sections: [
    { id: "hero" as const, visible: true },
    { id: "categories" as const, visible: true },
    { id: "collections" as const, visible: true },
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
      subtitle: "",
      ctaText: "Ver más",
      image: "/mocks/furniture-light/hero-banner-1.jpg",
    },
    navLinks: [
      { label: "Inicio", href: "/" },
      { label: "Catálogo", href: "/catalogo" },
      { label: "Info", href: "/info" },
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
    productDetailTabs: [
      { id: "descripcion", label: "Descripción", content: "Mueble de estilo escandinavo con líneas limpias y funcionalidad pensada para el hogar moderno. Materiales naturales de alta durabilidad." },
      { id: "especificaciones", label: "Especificaciones", content: "Incluye ficha técnica con peso, capacidad de carga y materiales utilizados. Compatible con ensamblaje sencillo sin herramientas especiales." },
      { id: "cuidado", label: "Cuidado", content: "Limpiar con paño húmedo y jabón neutro. Evitar exposición prolongada a la luz solar directa. Revisar tornillos cada 6 meses." },
      { id: "envio", label: "Envío", content: "Envío gratuito en compras superiores a $300.000. Entrega en 3-7 días hábiles según la ciudad de destino." },
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

  variants: {
    header: "DEFAULT",
    footer: "COMPACT",
    bottomNav: "EDGE",
    hero: "CARD_SPLIT",
    categoryNav: "HORIZONTAL_SCROLL",
    productCard: "BELOW_IMAGE",
    searchBar: "INLINE",
  },

  heroConstrained: true,
  heroTitleLight: "",
  showSearchBar: false,
  categoriesHeading: "Categorías",
  showRating: true,
  productsHeading: "Todos los productos",
  showAddToCartInGrid: false,
} as const satisfies TemplateManifest;

export type FurnitureLightManifest = typeof furnitureLightManifest;
