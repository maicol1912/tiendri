// beauty-elegant — TemplateConfigSchema
// Configurable surface for the Beauty Elegant template.

import type { TemplateConfigSchema } from "@/types/templates";
import { beautyElegantPalettes } from "./palettes";

export const beautyElegantConfigSchema: TemplateConfigSchema = {
  // ─────────────────────────────────────────────────────────────────────────
  // Theme
  // ─────────────────────────────────────────────────────────────────────────
  theme: {
    palettes: beautyElegantPalettes,
    colors: [
      {
        key: "primary",
        label: "Color principal",
        default: "#7700CF",
      },
      {
        key: "background",
        label: "Color de fondo",
        default: "#FEFEFF",
      },
      {
        key: "buttonBg",
        label: "Color de botón",
        default: "#7700CF",
      },
      {
        key: "headerBg",
        label: "Color de encabezado",
        default: "#FEFEFEF2",
      },
    ],

    radius: [
      {
        key: "card",
        label: "Radio de tarjetas",
        default: "16px",
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
        default: "9999px",
        max: 32,
      },
    ],

    fontPairs: [
      {
        key: "soft-modern",
        label: "Suave moderno",
        body: "Inter",
        heading: "Inter",
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
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Content tabs
  // ─────────────────────────────────────────────────────────────────────────
  content: {
    tabGroups: [
      // Tab 1 — Diseño
      {
        id: "diseno",
        label: "Diseño",
        icon: "Palette",
        sections: [
          {
            id: "grilla-productos",
            label: "Grilla de productos",
            description: "Cuántos productos se muestran por fila.",
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

      // Tab 2 — Secciones
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
                label: "Bienvenida (Hero)",
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

      // Tab 3 — Apariencia
      {
        id: "estilo-visual",
        label: "Estilo visual",
        icon: "Palette",
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
            id: "layout-effects",
            label: "Efectos visuales",
            description: "Animaciones y sombras de la tienda.",
            fields: [
              {
                key: "layout.layout.animationLevel",
                type: "select" as const,
                label: "Nivel de animaciones",
                description: "Controla cuánto movimiento tiene tu tienda",
                defaultValue: "subtle",
                options: [
                  { label: "Sin animaciones", value: "none" },
                  { label: "Sutiles", value: "subtle" },
                  { label: "Completas", value: "full" },
                ],
              },
              {
                key: "layout.layout.shadowStyle",
                type: "select" as const,
                label: "Estilo de sombras",
                description: "Sombras neutras o con tono del color principal",
                defaultValue: "neutral",
                options: [
                  { label: "Neutro", value: "neutral" },
                  { label: "Tono del color principal", value: "hue-tinted" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};
