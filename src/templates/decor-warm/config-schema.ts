// Decor Warm — TemplateConfigSchema
// Configurable surface for the Decor Warm template.

import type { TemplateConfigSchema } from "@/types/templates";
import { decorWarmPalettes } from "./palettes";
// Note: config.ts has been replaced by manifest.ts

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
        label: "Esquinas de las tarjetas",
        default: "14px",
        max: 24,
      },
      {
        key: "category",
        label: "Esquinas de categorías",
        default: "13px",
        max: 20,
      },
      {
        key: "button",
        label: "Esquinas de los botones",
        default: "30px",
        max: 32,
      },
    ],

    fontPairs: [
      {
        key: "amigable",
        label: "Amigable",
        body: "Nunito",
        heading: "Poppins",
        preview: "Aa Bb Cc",
      },
      {
        key: "elegante",
        label: "Elegante",
        body: "Lato",
        heading: "Cormorant Garamond",
        preview: "Aa Bb Cc",
      },
      {
        key: "artesanal",
        label: "Artesanal",
        body: "Karla",
        heading: "Caveat",
        preview: "Aa Bb Cc",
      },
      {
        key: "minimalista",
        label: "Minimalista",
        body: "Inter",
        heading: "Manrope",
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

      // Tab 2 — Apariencia
      {
        id: "estilo-visual",
        label: "Estilo visual",
        icon: "Sliders",
        sections: [
          {
            id: "tarjetas",
            label: "Tarjetas de producto",
            fields: [
              {
                key: "layout.layout.cardImageRatio",
                type: "select",
                label: "Formato de las fotos",
                defaultValue: "square",
                options: [
                  { value: "square", label: "Cuadrada" },
                  { value: "portrait", label: "Vertical" },
                  { value: "tall", label: "Vertical (3:4)" },
                  { value: "wide", label: "Horizontal" },
                ],
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
                key: "layout.gridDensity",
                type: "select" as const,
                label: "Espaciado del catálogo",
                description: "Cuántos productos se muestran por fila",
                options: [
                  { value: "compact", label: "Compacto (más productos por fila)" },
                  { value: "standard", label: "Estándar" },
                  { value: "spacious", label: "Espacioso (menos productos, más grandes)" },
                ],
              },
              {
                key: "layout.spacingDensity",
                type: "select" as const,
                label: "Espaciado entre elementos",
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

      // Tab 3 — Grilla y diseño
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
                key: "layout.grid.products.mobile",
                type: "select",
                label: "Columnas en móvil",
                options: [
                  { value: "1", label: "1 columna" },
                  { value: "2", label: "2 columnas" },
                ],
                defaultValue: "2",
              },
              {
                key: "layout.grid.products.desktop",
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

    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Section schemas — per-section fields rendered by the dashboard accordion
  // ─────────────────────────────────────────────────────────────────────────
  sectionSchemas: {
    hero: {
      id: "hero",
      label: "Banner principal",
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
            { value: "Poppins", label: "Poppins — Hogar cálido" },
            { value: "Cormorant Garamond", label: "Cormorant Garamond — Elegante" },
            { value: "Nunito", label: "Nunito — Amigable" },
            { value: "Inter", label: "Inter — Moderno" },
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
            { value: "Poppins", label: "Poppins — Hogar cálido" },
            { value: "Cormorant Garamond", label: "Cormorant Garamond — Elegante" },
            { value: "Nunito", label: "Nunito — Amigable" },
            { value: "Inter", label: "Inter — Moderno" },
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
