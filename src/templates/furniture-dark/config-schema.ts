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
      { key: "functional", label: "Funcional", body: "Inter", heading: "Inter", preview: "Aa Bb Cc" },
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
                  { value: "wide", label: "Horizontal" },
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
