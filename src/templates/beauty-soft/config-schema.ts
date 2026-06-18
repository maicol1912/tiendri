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
                  { value: "tall", label: "Vertical (3:4)" },
                  { value: "wide", label: "Panorámica" },
                ],
                defaultValue: "square",
              },
              {
                key: "structuralVariants.categoryDisplayType",
                label: "Vista de categorías",
                type: "select" as const,
                options: [
                  { value: "text-only", label: "Solo texto" },
                  { value: "icon-text", label: "Ícono + texto" },
                  { value: "image-text", label: "Imagen + texto" },
                ],
              },
            ],
          },
          {
            id: "layout",
            label: "Diseño y Estructura",
            description: "Estructura visual y densidad de la tienda.",
            fields: [
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

  // ─────────────────────────────────────────────────────────────────────────
  // Section schemas — per-section fields rendered by the dashboard accordion
  // ─────────────────────────────────────────────────────────────────────────
  sectionSchemas: {
    hero: {
      id: "hero",
      label: "Hero / Banner Principal",
      fields: [
        {
          key: "textAlignment",
          type: "select",
          label: "Alineación del texto",
          description: "Alineación del título y descripción del hero",
          options: [
            { value: "left", label: "Izquierda" },
            { value: "center", label: "Centro" },
            { value: "right", label: "Derecha" },
          ],
        },
        {
          key: "fontFamily",
          type: "select",
          label: "Fuente del título",
          description:
            "Fuente para el título del hero (deja vacío para usar la del template)",
          options: [
            { value: "", label: "Default del template" },
            { value: "Wix Madefor Display", label: "Wix Madefor Display — Suave moderno" },
            { value: "Cormorant Garamond", label: "Cormorant Garamond — Elegante" },
            { value: "Nunito", label: "Nunito — Amigable" },
            { value: "Outfit", label: "Outfit — Limpio" },
            { value: "Inter", label: "Inter — Moderno" },
            { value: "DM Sans", label: "DM Sans — Funcional" },
          ],
        },
      ],
    },

    categories: {
      id: "categories",
      label: "Categorías",
      fields: [
        {
          key: "gridColumnsMobile",
          type: "range",
          label: "Columnas en móvil",
          description: "Cantidad de columnas en pantallas pequeñas",
          min: 2,
          max: 4,
          step: 1,
        },
        {
          key: "gridColumnsDesktop",
          type: "range",
          label: "Columnas en escritorio",
          description: "Cantidad de columnas en pantallas grandes",
          min: 3,
          max: 8,
          step: 1,
        },
        {
          key: "textAlignment",
          type: "select",
          label: "Alineación del texto",
          options: [
            { value: "left", label: "Izquierda" },
            { value: "center", label: "Centro" },
            { value: "right", label: "Derecha" },
          ],
        },
      ],
    },

    products: {
      id: "products",
      label: "Productos",
      fields: [
        {
          key: "gridColumnsMobile",
          type: "range",
          label: "Columnas en móvil",
          min: 1,
          max: 3,
          step: 1,
        },
        {
          key: "gridColumnsDesktop",
          type: "range",
          label: "Columnas en escritorio",
          min: 2,
          max: 6,
          step: 1,
        },
        {
          key: "textAlignment",
          type: "select",
          label: "Alineación del texto",
          options: [
            { value: "left", label: "Izquierda" },
            { value: "center", label: "Centro" },
            { value: "right", label: "Derecha" },
          ],
        },
        {
          key: "fontFamily",
          type: "select",
          label: "Fuente de los títulos",
          description: "Fuente para el encabezado de productos",
          options: [
            { value: "", label: "Default del template" },
            { value: "Wix Madefor Display", label: "Wix Madefor Display — Suave moderno" },
            { value: "Cormorant Garamond", label: "Cormorant Garamond — Elegante" },
            { value: "Nunito", label: "Nunito — Amigable" },
            { value: "Outfit", label: "Outfit — Limpio" },
            { value: "Inter", label: "Inter — Moderno" },
            { value: "DM Sans", label: "DM Sans — Funcional" },
          ],
        },
        {
          key: "curatedProductIds",
          type: "tag-list",
          label: "Productos seleccionados",
          description:
            "IDs de los productos a mostrar (vacío = todos). Ingresá los IDs separados por Enter.",
          placeholder: "ID del producto",
        },
      ],
    },
  },
};
