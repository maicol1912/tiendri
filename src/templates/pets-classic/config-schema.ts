// Pets Classic — TemplateConfigSchema
// Full configurable surface for the Pets Classic template.

import type { TemplateConfigSchema } from "@/types/templates";
import { petsClassicPalettes } from "./palettes";

export const petsClassicConfigSchema: TemplateConfigSchema = {
  theme: {
    palettes: petsClassicPalettes,
    colors: [
      { key: "primary", label: "Color principal (naranja)", default: "#FFAF42" },
      { key: "background", label: "Fondo de la página", default: "#FFFFFF" },
      { key: "headerBg", label: "Fondo del encabezado", default: "#FFFFFF" },
      { key: "cardBg", label: "Fondo de tarjetas", default: "#FFFFFF" },
    ],
    radius: [
      { key: "card", label: "Radio de tarjetas", default: "14px", max: 28 },
      { key: "category", label: "Radio de categorías", default: "12px", max: 24 },
      { key: "button", label: "Radio de botones", default: "9999px", max: 9999 },
    ],
    fontPairs: [
      {
        key: "premium",
        label: "Plus Jakarta Sans + Poppins (Premium)",
        body: "Poppins",
        heading: "Plus Jakarta Sans",
        preview: "Aa Bb Cc",
      },
      {
        key: "modern",
        label: "Poppins + Poppins (Original)",
        body: "Poppins",
        heading: "Poppins",
        preview: "Aa Bb Cc",
      },
      {
        key: "classic",
        label: "Inter + Inter (Limpio)",
        body: "Inter",
        heading: "Inter",
        preview: "Aa Bb Cc",
      },
      {
        key: "elegant",
        label: "Elegante",
        body: "DM Sans",
        heading: "Playfair Display",
        preview: "Aa Bb Cc",
      },
      {
        key: "warm",
        label: "Cálido",
        body: "Nunito",
        heading: "Nunito",
        preview: "Aa Bb Cc",
      },
      {
        key: "functional",
        label: "Funcional",
        body: "Inter",
        heading: "Inter",
        preview: "Aa Bb Cc",
      },
    ],
  },

  content: {
    tabGroups: [
      {
        id: "banner",
        label: "Banner promocional",
        icon: "Image",
        sections: [
          {
            id: "hero-content",
            label: "Contenido del banner",
            fields: [
              {
                key: "content.heroBanner.title",
                label: "Título principal",
                type: "text",
                defaultValue: "Todo para tu mascota",
                maxLength: 60,
              },
              {
                key: "content.heroBanner.subtitle",
                label: "Subtítulo",
                type: "textarea",
                defaultValue: "Los mejores productos para el bienestar de tu compañero fiel.",
                maxLength: 120,
              },
              {
                key: "content.heroBanner.ctaText",
                label: "Texto del botón",
                type: "text",
                defaultValue: "Ver catálogo",
                maxLength: 30,
              },
            ],
          },
        ],
      },
      {
        id: "store-info",
        label: "Información de la tienda",
        icon: "Store",
        sections: [
          {
            id: "branding",
            label: "Marca",
            fields: [
              {
                key: "branding.storeName",
                label: "Nombre de la tienda",
                type: "text",
                defaultValue: "Mi PetShop",
                maxLength: 50,
              },
              {
                key: "branding.description",
                label: "Descripción",
                type: "textarea",
                defaultValue: "Tu tienda de mascotas de confianza.",
                maxLength: 200,
              },
            ],
          },
        ],
      },
      {
        id: "estilo-visual",
        label: "Estilo visual",
        icon: "Sparkles",
        sections: [
          {
            id: "layout-cards",
            label: "Tarjetas de productos",
            description: "Estilo visual de las tarjetas en catálogo y buscador.",
            fields: [
              {
                key: "layout.layout.cardStyle",
                type: "select" as const,
                label: "Estilo de tarjetas",
                description: "Cómo se presentan las tarjetas de productos",
                defaultValue: "flat",
                options: [
                  { label: "Plana", value: "flat" },
                  { label: "Con sombra", value: "shadow" },
                  { label: "Con borde", value: "bordered" },
                  { label: "Elevada", value: "elevated" },
                ],
              },
              {
                key: "layout.layout.cardHoverEffect",
                type: "select" as const,
                label: "Efecto al pasar el mouse",
                description: "Animación de las tarjetas al interactuar",
                defaultValue: "none",
                options: [
                  { label: "Ninguno", value: "none" },
                  { label: "Elevar", value: "lift" },
                  { label: "Escalar", value: "scale" },
                  { label: "Brillar", value: "glow" },
                ],
              },
              {
                key: "layout.layout.cardImageRatio",
                type: "select" as const,
                label: "Proporción de imágenes",
                description: "Forma de las imágenes en las tarjetas",
                defaultValue: "portrait",
                options: [
                  { label: "Cuadrada", value: "square" },
                  { label: "Retrato (vertical)", value: "portrait" },
                  { label: "Panorámica (horizontal)", value: "wide" },
                ],
              },
            ],
          },
          {
            id: "layout-structure",
            label: "Estructura de la tienda",
            description: "Disposición del encabezado, pie de página y categorías.",
            fields: [
              {
                key: "layout.layout.headerStyle",
                type: "select" as const,
                label: "Estilo del encabezado",
                description: "Disposición del encabezado de tu tienda",
                defaultValue: "standard",
                options: [
                  { label: "Estándar", value: "standard" },
                  { label: "Centrado", value: "centered" },
                  { label: "Minimalista", value: "minimal" },
                ],
              },
              {
                key: "layout.layout.footerStyle",
                type: "select" as const,
                label: "Estilo del pie de página",
                description: "Disposición del footer de tu tienda",
                defaultValue: "minimal",
                options: [
                  { label: "Columnas", value: "columns" },
                  { label: "Minimalista", value: "minimal" },
                  { label: "Centrado", value: "centered" },
                ],
              },
              {
                key: "layout.layout.navStyle",
                type: "select" as const,
                label: "Estilo de categorías",
                description: "Cómo se muestran las categorías",
                defaultValue: "scroll",
                options: [
                  { label: "Cuadrícula", value: "grid" },
                  { label: "Píldoras", value: "pills" },
                  { label: "Scroll horizontal", value: "scroll" },
                ],
              },
              {
                key: "layout.layout.bannerHeight",
                type: "select" as const,
                label: "Altura del banner",
                description: "Tamaño del banner principal en la portada",
                defaultValue: "normal",
                options: [
                  { label: "Bajo", value: "short" },
                  { label: "Normal", value: "normal" },
                  { label: "Alto", value: "tall" },
                ],
              },
            ],
          },
          {
            id: "visual-effects",
            label: "Efectos visuales",
            fields: [
              {
                key: "layout.layout.shadowStyle",
                label: "Estilo de sombras",
                type: "select" as const,
                description: "Sombras neutras o con tono del color principal",
                defaultValue: "hue-tinted",
                options: [
                  { value: "neutral", label: "Neutro (gris)" },
                  { value: "hue-tinted", label: "Tono del color principal" },
                ],
              },
              {
                key: "layout.layout.animationLevel",
                label: "Nivel de animaciones",
                type: "select" as const,
                description: "Controla cuánto movimiento tiene tu tienda",
                defaultValue: "full",
                options: [
                  { value: "none", label: "Sin animaciones" },
                  { value: "subtle", label: "Sutiles" },
                  { value: "full", label: "Completas (recomendado)" },
                ],
              },
              {
                key: "layout.layout.buttonStyle",
                type: "select" as const,
                label: "Estilo de botones",
                description: "Apariencia de los botones principales",
                defaultValue: "filled",
                options: [
                  { label: "Relleno", value: "filled" },
                  { label: "Contorno", value: "outlined" },
                  { label: "Transparente", value: "ghost" },
                ],
              },
              {
                key: "layout.layout.badgeStyle",
                type: "select" as const,
                label: "Forma de etiquetas",
                description: "Forma de las etiquetas de descuento y estado",
                defaultValue: "pill",
                options: [
                  { label: "Redondeada", value: "pill" },
                  { label: "Cuadrada", value: "square" },
                ],
              },
              {
                key: "layout.layout.priceDisplay",
                type: "select" as const,
                label: "Prominencia de precios",
                description: "Qué tan destacados se muestran los precios",
                defaultValue: "standard",
                options: [
                  { label: "Destacado", value: "prominent" },
                  { label: "Normal", value: "standard" },
                  { label: "Discreto", value: "subtle" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};
