// beauty-soft — TemplateConfigSchema
// Configurable surface for the Beauty Soft template.

import type { TemplateConfigSchema } from "@/types/templates";
import { beautySoftPalettes } from "./palettes";

export const beautySoftConfigSchema: TemplateConfigSchema = {
  // ─────────────────────────────────────────────────────────────────────────
  // Theme
  // ─────────────────────────────────────────────────────────────────────────
  theme: {
    palettes: beautySoftPalettes,
    colors: [
      {
        key: "primary",
        label: "Color principal",
        default: "#FF4428",
      },
      {
        key: "background",
        label: "Color de fondo",
        default: "#F4F4F7",
      },
      {
        key: "buttonBg",
        label: "Color de botón",
        default: "#FF4428",
      },
      {
        key: "headerBg",
        label: "Color de encabezado",
        default: "#FFFFFF",
      },
    ],

    radius: [
      {
        key: "card",
        label: "Radio de tarjetas",
        default: "20px",
        max: 28,
      },
      {
        key: "category",
        label: "Radio de categorías",
        default: "20px",
        max: 28,
      },
      {
        key: "button",
        label: "Radio de botones",
        default: "29px",
        max: 32,
      },
    ],

    fontPairs: [
      {
        key: "soft-modern",
        label: "Suave moderno",
        body: "Inter",
        heading: "Wix Madefor Display",
        preview: "Aa Bb Cc",
      },
      {
        key: "elegant",
        label: "Elegante",
        body: "DM Sans",
        heading: "Cormorant Garamond",
        preview: "Aa Bb Cc",
      },
      {
        key: "friendly",
        label: "Amigable",
        body: "Nunito",
        heading: "Nunito",
        preview: "Aa Bb Cc",
      },
      {
        key: "clean",
        label: "Limpio",
        body: "Outfit",
        heading: "Outfit",
        preview: "Aa Bb Cc",
      },
      {
        key: "modern",
        label: "Moderno",
        body: "Inter",
        heading: "Inter",
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
        body: "DM Sans",
        heading: "DM Sans",
        preview: "Aa Bb Cc",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Content tabs
  // ─────────────────────────────────────────────────────────────────────────
  content: {
    tabGroups: [
      // Tab 1 — Banner y tienda
      {
        id: "contenido-principal",
        label: "Contenido Principal",
        icon: "Layout",
        sections: [
          {
            id: "hero-banner",
            label: "Banner principal",
            description: "El banner que aparece al inicio de tu tienda de belleza.",
            icon: "Image",
            fields: [
              {
                key: "content.heroBanner.title",
                type: "text",
                label: "Título del banner",
                placeholder: "Descubrí lo mejor en belleza",
                maxLength: 60,
              },
              {
                key: "content.heroBanner.discountText",
                type: "text",
                label: "Texto de descuento",
                placeholder: "20% OFF en tu primer pedido",
                maxLength: 40,
              },
              {
                key: "content.heroBanner.ctaText",
                type: "text",
                label: "Texto del botón",
                placeholder: "Ver ofertas",
                maxLength: 30,
              },
              {
                key: "content.heroBanner.image",
                type: "image",
                label: "Imagen del banner",
                description: "Recomendado: 800 × 400 px.",
                aspectRatio: "2:1",
                maxFileSize: 5242880,
              },
            ],
          },
        ],
      },

      // Tab 2 — Grilla y diseño
      {
        id: "diseno",
        label: "Diseño",
        icon: "Palette",
        sections: [
          {
            id: "grilla-productos",
            label: "Grilla de productos",
            description: "Cuántos productos se muestran por fila en móvil y escritorio.",
            icon: "Grid",
            fields: [
              {
                key: "grid.products.mobile",
                type: "select",
                label: "Columnas en móvil",
                options: [
                  { value: "1", label: "1 columna" },
                  { value: "2", label: "2 columnas" },
                ],
                defaultValue: "2",
              },
              {
                key: "grid.products.desktop",
                type: "select",
                label: "Columnas en escritorio",
                options: [
                  { value: "3", label: "3 columnas" },
                  { value: "4", label: "4 columnas" },
                  { value: "5", label: "5 columnas" },
                ],
                defaultValue: "4",
              },
            ],
          },
        ],
      },

      // Tab 3 — Apariencia
      {
        id: "estilo-visual",
        label: "Estilo visual",
        icon: "Sliders",
        sections: [
          {
            id: "tarjetas",
            label: "Tarjetas de producto",
            description: "Ajustá el estilo visual de las tarjetas en la tienda.",
            icon: "LayoutGrid",
            fields: [
              {
                key: "layout.layout.cardImageRatio",
                type: "select",
                label: "Proporción de imágenes",
                options: [
                  { value: "square", label: "Cuadrada" },
                  { value: "portrait", label: "Retrato" },
                  { value: "wide", label: "Panorámica" },
                ],
                defaultValue: "square",
              },
            ],
          },
          {
            id: "layout",
            label: "Diseño y Estructura",
            description: "Estructura visual y densidad de la tienda.",
            fields: [
              {
                key: "heroVariant",
                type: "select" as const,
                label: "Estilo del banner principal",
                description: "Cambia la estructura visual del banner hero",
                options: [
                  { value: "full-width", label: "Ancho completo" },
                  { value: "split", label: "Dividido (texto + imagen)" },
                  { value: "contained", label: "Contenido centrado" },
                  { value: "carousel", label: "Carrusel de slides" },
                  { value: "minimal", label: "Minimalista" },
                ],
              },
              {
                key: "cardVariant",
                type: "select" as const,
                label: "Estilo de tarjeta de producto",
                description: "Cambia cómo se muestran los productos en el catálogo",
                options: [
                  { value: "minimal", label: "Minimalista (imagen + nombre + precio)" },
                  { value: "detailed", label: "Detallado (con rating, badges, botón)" },
                  { value: "overlay", label: "Superpuesto (info sobre la imagen)" },
                  { value: "horizontal", label: "Horizontal (imagen + info lado a lado)" },
                ],
              },
              {
                key: "categoryVariant",
                type: "select" as const,
                label: "Estilo de categorías",
                description: "Cambia cómo se muestran las categorías en el inicio",
                options: [
                  { value: "grid-icons", label: "Grilla de íconos" },
                  { value: "horizontal-scroll", label: "Scroll horizontal" },
                  { value: "cards-with-image", label: "Tarjetas con imagen" },
                  { value: "text-list", label: "Lista de texto" },
                ],
              },
              {
                key: "gridDensity",
                type: "select" as const,
                label: "Densidad del catálogo",
                description: "Cuántos productos se muestran por fila",
                options: [
                  { value: "compact", label: "Compacto (más productos por fila)" },
                  { value: "standard", label: "Estándar" },
                  { value: "spacious", label: "Espacioso (menos productos, más grandes)" },
                ],
              },
              {
                key: "spacingDensity",
                type: "select" as const,
                label: "Espaciado general",
                description: "Cuánto espacio hay entre secciones y elementos",
                options: [
                  { value: "tight", label: "Compacto" },
                  { value: "normal", label: "Normal" },
                  { value: "airy", label: "Espacioso (más aire, más premium)" },
                ],
              },
            ],
          },
        ],
      },

      // Tab 4 — Secciones
      {
        id: "secciones",
        label: "Secciones",
        icon: "Layers",
        sections: [
          {
            id: "visibilidad",
            label: "Visibilidad de secciones",
            description: "Elegí qué secciones aparecen en tu tienda.",
            icon: "Eye",
            fields: [
              {
                key: "sections[0].visible",
                type: "boolean",
                label: "Banner principal",
                defaultValue: true,
              },
              {
                key: "sections[1].visible",
                type: "boolean",
                label: "Categorías",
                defaultValue: true,
              },
              {
                key: "sections[2].visible",
                type: "boolean",
                label: "Grilla de productos",
                defaultValue: true,
              },
            ],
          },
        ],
      },
    ],
  },
};
