// Furniture Light — TemplateConfigSchema
// Configurable surface for the Furniture Light template.

import type { TemplateConfigSchema } from "@/types/templates";
import { furnitureLightPalettes } from "./palettes";

export const furnitureLightConfigSchema: TemplateConfigSchema = {
  theme: {
    palettes: furnitureLightPalettes,
    colors: [
      { key: "primary", label: "Color principal (naranja)", default: "#F5841F" },
      { key: "secondary", label: "Color secundario (navy)", default: "#1B2838" },
      { key: "background", label: "Fondo de la página", default: "#FFFFFF" },
      { key: "cardBg", label: "Fondo de tarjetas", default: "#F5F7FA" },
    ],
    radius: [
      { key: "card", label: "Radio de tarjetas", default: "16px", max: 28 },
      { key: "category", label: "Radio de categorías", default: "14px", max: 28 },
      { key: "button", label: "Radio de botones", default: "12px", max: 28 },
    ],
    fontPairs: [
      { key: "modern", label: "Moderno", body: "Inter", heading: "Space Grotesk", preview: "Aa Bb Cc" },
      { key: "warm", label: "Cálido", body: "Poppins", heading: "Playfair Display", preview: "Aa Bb Cc" },
      { key: "elegant", label: "Elegante", body: "DM Sans", heading: "Cormorant Garamond", preview: "Aa Bb Cc" },
      { key: "minimal", label: "Mínimo", body: "Nunito", heading: "Nunito", preview: "Aa Bb Cc" },
      { key: "functional", label: "Funcional", body: "Inter", heading: "Inter", preview: "Aa Bb Cc" },
    ],
  },

  content: {
    tabGroups: [
      {
        id: "contenido-principal",
        label: "Contenido Principal",
        icon: "Layout",
        sections: [
          {
            id: "hero",
            label: "Banner principal",
            description: "El banner de bienvenida con imagen y texto.",
            icon: "Image",
            fields: [
              {
                key: "content.heroBanner.title",
                type: "text",
                label: "Título del banner",
                placeholder: "¡Nueva colección disponible!",
                maxLength: 80,
              },
              {
                key: "content.heroBanner.subtitle",
                type: "text",
                label: "Subtítulo / CTA del banner",
                placeholder: "Ver más",
                maxLength: 60,
              },
              {
                key: "content.heroBanner.image",
                type: "image",
                label: "Imagen del banner",
                description: "Recomendado: imagen cuadrada o apaisada con producto.",
                maxFileSize: 5242880,
              },
            ],
          },
          {
            id: "tienda",
            label: "Información de la tienda",
            description: "Nombre y datos de contacto que aparecen en el header.",
            icon: "Store",
            fields: [
              {
                key: "branding.storeName",
                type: "text",
                label: "Nombre de la tienda",
                placeholder: "KASA",
                maxLength: 40,
              },
              {
                key: "business.whatsapp",
                type: "text",
                label: "Número de WhatsApp",
                placeholder: "573001234567",
                description: "Solo números, sin +, sin espacios.",
              },
            ],
          },
        ],
      },
      {
        id: "estilo-visual",
        label: "Estilo visual",
        icon: "Palette",
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
          {
            id: "grilla-productos",
            label: "Columnas de productos",
            description: "Cuántos productos se muestran por fila en móvil y escritorio.",
            fields: [
              {
                key: "gridProductsMobile",
                label: "Columnas productos (mobile)",
                type: "number" as const,
                min: 1,
                max: 3,
              },
              {
                key: "gridProductsDesktop",
                label: "Columnas productos (desktop)",
                type: "number" as const,
                min: 2,
                max: 6,
              },
            ],
          },
          {
            id: "nav-links",
            label: "Menú de navegación",
            description: "Los enlaces que aparecen en el menú del header (escritorio).",
            icon: "Navigation",
            kind: "repeatable",
            itemLabel: "Enlace",
            minItems: 0,
            maxItems: 6,
            fields: [
              { key: "label", type: "text", label: "Texto del enlace", placeholder: "Inicio", maxLength: 30 },
              { key: "href", type: "url", label: "URL del enlace", placeholder: "/catalogo" },
            ],
          } as import("@/types/templates").RepeatableConfigSection,
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
            { value: "Space Grotesk", label: "Space Grotesk — Moderno" },
            { value: "Playfair Display", label: "Playfair Display — Cálido" },
            { value: "Cormorant Garamond", label: "Cormorant Garamond — Elegante" },
            { value: "Nunito", label: "Nunito — Mínimo" },
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
            { value: "Space Grotesk", label: "Space Grotesk — Moderno" },
            { value: "Playfair Display", label: "Playfair Display — Cálido" },
            { value: "Cormorant Garamond", label: "Cormorant Garamond — Elegante" },
            { value: "Nunito", label: "Nunito — Mínimo" },
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
  },
};
