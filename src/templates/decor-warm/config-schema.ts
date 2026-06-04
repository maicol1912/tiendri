// Decor Warm — TemplateConfigSchema
// Configurable surface for the Decor Warm template.

import type { TemplateConfigSchema } from "@/types/templates";
import { decorWarmPalettes } from "./palettes";

export const decorWarmConfigSchema: TemplateConfigSchema = {
  // ─────────────────────────────────────────────────────────────────────────
  // Theme
  // ─────────────────────────────────────────────────────────────────────────
  theme: {
    palettes: decorWarmPalettes,
    colors: [
      {
        key: "primary",
        label: "Color principal",
        default: "#CC7861",
      },
      {
        key: "background",
        label: "Color de fondo",
        default: "#FFFFFF",
      },
      {
        key: "buttonBg",
        label: "Color de botón",
        default: "#F4B5A4",
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
        default: "14px",
        max: 24,
      },
      {
        key: "category",
        label: "Radio de categorías",
        default: "13px",
        max: 20,
      },
      {
        key: "button",
        label: "Radio de botones",
        default: "30px",
        max: 32,
      },
    ],

    fontPairs: [
      {
        key: "warm-home",
        label: "Hogar cálido",
        body: "Poppins",
        heading: "Poppins",
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
      // Tab 1 — Tienda y banner
      {
        id: "contenido-principal",
        label: "Contenido Principal",
        icon: "Layout",
        sections: [
          {
            id: "hero-banner",
            label: "Banner principal",
            description: "El banner de bienvenida con texto de saludo.",
            icon: "Image",
            fields: [
              {
                key: "content.heroBanner.title",
                type: "text",
                label: "Título del banner",
                placeholder: "Transforma tu hogar",
                maxLength: 60,
              },
              {
                key: "content.heroBanner.ctaText",
                type: "text",
                label: "Texto del botón",
                placeholder: "Ver productos",
                maxLength: 30,
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
                ],
                defaultValue: "4",
              },
            ],
          },
        ],
      },

      // Tab 3 — Secciones
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
                label: "Más vendido",
                defaultValue: true,
              },
              {
                key: "sections[3].visible",
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
