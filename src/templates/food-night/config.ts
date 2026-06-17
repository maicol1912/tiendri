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
    primary: '#F13658',
    secondary: '#292526',
    background: '#0E0600',
    foreground: '#FFFFFF',
    card: '#292526',
    border: '#DFDEDE',
    muted: '#878787',
    accent: '#FFD33C',
    onPrimary: '#FFFFFF',
    // Extra tokens
    buttonBg: '#FFFFFF',
    buttonText: '#121111',
    searchBg: 'transparent',
    categoryActiveBg: '#FFFFFF',
    categoryActiveText: '#121111',
    borderLight: 'rgba(255,255,255,0.08)',
    borderMid: 'rgba(255,255,255,0.08)',
    navBorder: 'rgba(255,255,255,0.08)',
    textSecondary: '#CAC9C9',
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
    cardImageRatio: "portrait" as const,
    gridDensity: "compact" as const,
    spacingDensity: "tight" as const,
  },

  structuralVariants: {
    heroVariant: 'text-only' as const,
    cardContentLayout: 'below-image' as const,
    categoryNavStyle: 'horizontal-scroll' as const,
    addToCartStyle: 'full-width' as const,
    categoryDisplayType: 'icon-text' as const,
  },

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
    productDetailTabs: [
      { id: "descripcion", label: "Descripción", content: "Plato preparado con ingredientes frescos y seleccionados. Receta tradicional con el sabor auténtico que nos caracteriza, listo para disfrutar." },
      { id: "ingredientes", label: "Ingredientes", content: "Elaborado con productos frescos de origen local. Consulta la lista completa de ingredientes en la descripción del producto." },
      { id: "alergenos", label: "Alérgenos", content: "Puede contener gluten, lácteos, huevo y frutos secos. Consulta con nuestro equipo si tenés alguna alergia o restricción alimentaria específica." },
      { id: "info_nutricional", label: "Información nutricional", content: "Valores nutricionales por porción disponibles en nuestra carta. Contamos con opciones bajas en calorías y adaptadas a diferentes dietas." },
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
