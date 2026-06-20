// Furniture Dark — TemplateConfigSchema
// Declares the full configurable surface for the Furniture Dark template.

import type { TemplateConfigSchema } from "@/types/templates";
import { furnitureDarkPalettes } from "./palettes";

export const furnitureDarkConfigSchema: TemplateConfigSchema = {
  theme: {
    palettes: furnitureDarkPalettes,
    colors: [
      { key: "primary", label: "Color principal (acento — amarillo)", default: "#EFF422" },
      { key: "background", label: "Fondo de la página", default: "#181818" },
      { key: "cardBg", label: "Fondo de tarjetas de producto (blanco)", default: "#F5F5F4" },
      { key: "surface", label: "Fondo de pills y búsqueda", default: "#4D4D4D" },
      { key: "border", label: "Color de bordes y divisores", default: "#333333" },
      { key: "buttonBg", label: "Color de botones CTA", default: "#EFF422" },
      { key: "buttonText", label: "Texto en botones CTA", default: "#181818" },
      { key: "textPrimary", label: "Texto principal", default: "#FFFFFF" },
      { key: "textMuted", label: "Texto secundario", default: "#A0A0A0" },
      { key: "footerBg", label: "Fondo del pie de página", default: "#181818" },
    ],

    radius: [
      { key: "card", label: "Radio de tarjetas", default: "12px", max: 24 },
      { key: "category", label: "Radio de pills de categoría", default: "28px", max: 32 },
      { key: "button", label: "Radio de botones", default: "28px", max: 32 },
    ],

    fontPairs: [
      { key: "elegante", label: "Elegante", body: "Lato", heading: "Cormorant Garamond", preview: "Aa Bb Cc" },
      { key: "editorial", label: "Editorial", body: "DM Sans", heading: "Bodoni Moda", preview: "Aa Bb Cc" },
      { key: "preciso", label: "Preciso", body: "IBM Plex Sans", heading: "Space Grotesk", preview: "Aa Bb Cc" },
      { key: "minimalista", label: "Minimalista", body: "Inter", heading: "Manrope", preview: "Aa Bb Cc" },
    ],
  },

  content: {
    tabGroups: [
      {
        id: "estilo-visual",
        label: "Estilo visual",
        sections: [
          {
            id: "cards",
            label: "Tarjetas de producto",
            fields: [
              {
                key: "layout.layout.cardImageRatio",
                label: "Forma de las imágenes",
                type: "select" as const,
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
      {
        id: "grid",
        label: "Grilla",
        sections: [
          {
            id: "grid-settings",
            label: "Columnas por vista",
            fields: [
              {
                key: "grid.products.mobile",
                label: "Productos por fila (celular)",
                type: "number" as const,
                min: 1,
                max: 3,
              },
              {
                key: "grid.products.desktop",
                label: "Productos por fila (computador)",
                type: "number" as const,
                min: 2,
                max: 6,
              },
              {
                key: "grid.listing.mobile",
                label: "Catálogo por fila (celular)",
                type: "number" as const,
                min: 1,
                max: 3,
              },
              {
                key: "grid.listing.desktop",
                label: "Catálogo por fila (computador)",
                type: "number" as const,
                min: 2,
                max: 6,
              },
              {
                key: "grid.search.mobile",
                label: "Búsqueda por fila (celular)",
                type: "number" as const,
                min: 1,
                max: 3,
              },
              {
                key: "grid.search.desktop",
                label: "Búsqueda por fila (computador)",
                type: "number" as const,
                min: 2,
                max: 6,
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
            { value: "Cormorant Garamond", label: "Cormorant Garamond — Elegante" },
            { value: "Playfair Display", label: "Playfair Display — Clásico" },
            { value: "Space Grotesk", label: "Space Grotesk — Moderno" },
            { value: "Inter", label: "Inter — Funcional" },
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

    video: {
      id: "video",
      label: "Video",
      fields: [
        {
          key: "content.videoTitle",
          type: "text",
          label: "Título del video",
          description: "Encabezado que aparece sobre el reproductor de video",
          placeholder: "Conocé nuestra historia",
          maxLength: 80,
        },
        {
          key: "content.videoPosterImage",
          type: "image",
          label: "Imagen de portada",
          description: "Imagen que se muestra antes de reproducir el video. Recomendado: 1920 × 1080 px (16:9).",
          aspectRatio: "16:9",
          maxFileSize: 5242880,
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
            { value: "Cormorant Garamond", label: "Cormorant Garamond — Elegante" },
            { value: "Playfair Display", label: "Playfair Display — Clásico" },
            { value: "Space Grotesk", label: "Space Grotesk — Moderno" },
            { value: "Inter", label: "Inter — Funcional" },
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

    collections: {
      id: "collections",
      label: "Colecciones",
      fields: [
        {
          key: "content.collectionsTitle",
          type: "text",
          label: "Título de la sección",
          description: "Encabezado visible sobre la grilla de colecciones",
          placeholder: "Colección",
          maxLength: 80,
        },
        {
          key: "content.collectionsSubtitle",
          type: "text",
          label: "Subtítulo de la sección",
          description: "Texto secundario bajo el título (opcional)",
          placeholder: "Descripción breve",
          maxLength: 160,
        },
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
      ],
    },
  },
};
