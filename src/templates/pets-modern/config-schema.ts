// pets-modern — TemplateConfigSchema
// Declares the full configurable surface for the Pets Modern template.

import type { TemplateConfigSchema } from "@/types/templates";
import { petsModernPalettes } from "./palettes";

export const petsModernConfigSchema: TemplateConfigSchema = {
  // ─────────────────────────────────────────────────────────────────────────
  // Theme — editable colors, radius tokens, font pairs
  // ─────────────────────────────────────────────────────────────────────────
  theme: {
    palettes: petsModernPalettes,
    colors: [
      {
        key: "primary",
        label: "Color principal (acentos, pestanas activas)",
        default: "#FF7322",
      },
      {
        key: "background",
        label: "Color de fondo",
        default: "#FFFFFF",
      },
      {
        key: "cardBg",
        label: "Fondo de tarjetas",
        default: "#FFFFFF",
      },
      {
        key: "surface",
        label: "Fondo de imagenes y busqueda",
        default: "#F2F3F2",
      },
      {
        key: "border",
        label: "Color de bordes",
        default: "#E2E2E2",
      },
      {
        key: "buttonBg",
        label: "Color de botones",
        default: "#1D1D1B",
      },
    ],

    radius: [
      {
        key: "card",
        label: "Radio de tarjetas",
        default: "18px",
        max: 30,
      },
      {
        key: "category",
        label: "Radio de categorias",
        default: "18px",
        max: 30,
      },
      {
        key: "button",
        label: "Radio de botones",
        default: "15px",
        max: 30,
      },
    ],

    fontPairs: [
      {
        key: "modern",
        label: "Moderno",
        body: "Inter",
        heading: "Space Grotesk",
        preview: "Aa Bb Cc",
      },
      {
        key: "friendly",
        label: "Amigable",
        body: "Nunito",
        heading: "Nunito Sans",
        preview: "Aa Bb Cc",
      },
      {
        key: "warm",
        label: "Calido",
        body: "Poppins",
        heading: "Playfair Display",
        preview: "Aa Bb Cc",
      },
      {
        key: "functional",
        label: "Funcional",
        body: "IBM Plex Sans",
        heading: "IBM Plex Mono",
        preview: "Aa Bb Cc",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Content tabs
  // ─────────────────────────────────────────────────────────────────────────
  content: {
    tabGroups: [
      // ───────────────────────────────────────────────────────────────────
      // Tab 1 — Contenido Principal
      // ───────────────────────────────────────────────────────────────────
      {
        id: "contenido-principal",
        label: "Contenido Principal",
        icon: "Layout",
        sections: [
          // Promo banner
          {
            id: "promo-banner",
            label: "Banner promocional",
            description:
              "El banner de promocion que aparece al inicio de la tienda.",
            icon: "Image",
            fields: [
              {
                key: "content.heroBanner.title",
                type: "text",
                label: "Titulo",
                placeholder: "Symply Adult Lamb",
                maxLength: 80,
              },
              {
                key: "content.heroBanner.subtitle",
                type: "text",
                label: "Subtitulo",
                placeholder: "20% de descuento",
                maxLength: 100,
              },
              {
                key: "content.heroBanner.image",
                type: "image",
                label: "Imagen del banner",
                description: "Recomendado: imagen cuadrada o rectangular.",
                maxFileSize: 5242880,
              },
            ],
          },

          // Trending items — repeatable
          {
            id: "trending-items",
            kind: "repeatable",
            label: "Productos en tendencia",
            description:
              "Las tarjetas de tendencia que aparecen en el carrusel horizontal.",
            icon: "TrendingUp",
            itemLabel: "Tendencia",
            minItems: 0,
            maxItems: 6,
            fields: [
              {
                key: "image",
                type: "image",
                label: "Imagen",
                maxFileSize: 5242880,
              },
              {
                key: "title",
                type: "text",
                label: "Titulo",
                placeholder: "Juguetes ecologicos",
                maxLength: 60,
              },
              {
                key: "subtitle",
                type: "text",
                label: "Subtitulo",
                placeholder: "Amigable con el planeta",
                maxLength: 100,
              },
            ],
          },

          // Pet types — repeatable
          {
            id: "pet-types",
            kind: "repeatable",
            label: "Tipos de mascota",
            description:
              "Las tarjetas de tipos de mascota (perros, gatos, etc.).",
            icon: "Heart",
            itemLabel: "Tipo de mascota",
            minItems: 0,
            maxItems: 8,
            fields: [
              {
                key: "image",
                type: "image",
                label: "Imagen",
                maxFileSize: 5242880,
              },
              {
                key: "label",
                type: "text",
                label: "Nombre",
                placeholder: "Perros",
                maxLength: 30,
              },
            ],
          },
        ],
      },

      // ───────────────────────────────────────────────────────────────────
      // Tab 2 — Navegacion
      // ───────────────────────────────────────────────────────────────────
      {
        id: "navegacion",
        label: "Navegacion",
        icon: "Navigation",
        sections: [
          // Nav links — repeatable
          {
            id: "nav-links",
            kind: "repeatable",
            label: "Enlaces de navegacion",
            description:
              "Los enlaces que aparecen en el menu principal de la tienda.",
            icon: "Navigation",
            itemLabel: "Enlace",
            minItems: 1,
            maxItems: 6,
            fields: [
              {
                key: "label",
                type: "text",
                label: "Texto del enlace",
                placeholder: "Tienda",
                maxLength: 40,
                required: true,
              },
              {
                key: "href",
                type: "text",
                label: "Ruta",
                placeholder: "/",
                required: true,
              },
            ],
          },

          // Popular searches
          {
            id: "popular-searches",
            label: "Busquedas populares",
            description:
              "Sugerencias de busqueda para tus clientes.",
            icon: "Search",
            fields: [
              {
                key: "content.popularSearches",
                type: "tag-list",
                label: "Terminos de busqueda",
                placeholder: "Agregar termino",
              },
            ],
          },
        ],
      },
    ],
  },
};
