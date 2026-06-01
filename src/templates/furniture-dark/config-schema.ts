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
      { key: "elegant", label: "Cormorant + DM Sans (elegante)", body: "DM Sans", heading: "Cormorant Garamond", preview: "Aa Bb Cc" },
      { key: "warm", label: "Playfair + Poppins (clásico)", body: "Poppins", heading: "Playfair Display", preview: "Aa Bb Cc" },
      { key: "modern", label: "Inter + Space Grotesk (moderno)", body: "Inter", heading: "Space Grotesk", preview: "Aa Bb Cc" },
    ],
  },

  content: {
    tabGroups: [
      {
        id: "appearance",
        label: "Apariencia",
        sections: [
          {
            id: "cards",
            label: "Tarjetas de producto",
            fields: [
              {
                key: "layout.cardStyle",
                label: "Estilo de tarjetas",
                type: "select" as const,
                options: [
                  { value: "flat", label: "Plano" },
                  { value: "shadow", label: "Con sombra" },
                  { value: "bordered", label: "Con borde" },
                  { value: "elevated", label: "Elevado" },
                ],
              },
              {
                key: "layout.cardHoverEffect",
                label: "Efecto al pasar el mouse",
                type: "select" as const,
                options: [
                  { value: "none", label: "Ninguno" },
                  { value: "lift", label: "Elevar" },
                  { value: "scale", label: "Agrandar" },
                  { value: "glow", label: "Brillar" },
                ],
              },
              {
                key: "layout.cardImageRatio",
                label: "Forma de las imágenes",
                type: "select" as const,
                options: [
                  { value: "square", label: "Cuadrada" },
                  { value: "portrait", label: "Vertical" },
                  { value: "wide", label: "Horizontal" },
                ],
              },
            ],
          },
          {
            id: "header-footer",
            label: "Encabezado y pie de página",
            fields: [
              {
                key: "layout.headerStyle",
                label: "Estilo del encabezado",
                type: "select" as const,
                options: [
                  { value: "standard", label: "Estándar" },
                  { value: "centered", label: "Centrado" },
                  { value: "minimal", label: "Mínimo" },
                ],
              },
              {
                key: "layout.footerStyle",
                label: "Estilo del pie de página",
                type: "select" as const,
                options: [
                  { value: "minimal", label: "Mínimo" },
                  { value: "columns", label: "En columnas" },
                  { value: "centered", label: "Centrado" },
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
      {
        id: "sections",
        label: "Secciones",
        sections: [
          {
            id: "home-sections",
            label: "Secciones del inicio",
            fields: [
              {
                key: "sections",
                label: "Secciones visibles y orden",
                // Note: section visibility is managed by the ThemeCustomizer's section labels UI.
                // Using "boolean" as placeholder type — actual rendering handled by customizer.
                type: "boolean" as const,
                description: "Administrar secciones desde el personalizador visual.",
              },
            ],
          },
        ],
      },
    ],
  },
};
