// Electronics Classic — TemplateConfigSchema
// Declares the full configurable surface for the Electronics Classic template.

import type { TemplateConfigSchema } from "@/types/templates";
import { electronicsClassicPalettes } from "./palettes";

export const electronicsClassicConfigSchema: TemplateConfigSchema = {
  // ─────────────────────────────────────────────────────────────────────────
  // Theme — editable colors, radius tokens, font pairs
  // ─────────────────────────────────────────────────────────────────────────
  theme: {
    palettes: electronicsClassicPalettes,
    colors: [
      { key: "primary", label: "Color principal (botones, enlaces)", default: "#0079EB" },
      { key: "secondary", label: "Color secundario", default: "#0082FB" },
      { key: "background", label: "Fondo de la página", default: "#FFFFFF" },
      { key: "headerBg", label: "Fondo del encabezado", default: "#0079EB" },
      { key: "cardBg", label: "Fondo de tarjetas", default: "#FFFFFF" },
      { key: "surface", label: "Fondo de imágenes y superficies", default: "#F5F5F5" },
      { key: "topBarBg", label: "Barra superior de info", default: "#0082FB" },
      { key: "buttonBg", label: "Color de botones de acción", default: "#444444" },
      { key: "buttonText", label: "Texto en botones", default: "#FFFFFF" },
      { key: "textPrimary", label: "Texto principal", default: "#111111" },
      { key: "textMuted", label: "Texto secundario / etiquetas", default: "#666666" },
      { key: "footerBg", label: "Fondo del pie de página", default: "#FFFFFF" },
    ],

    radius: [
      { key: "card", label: "Radio de tarjetas", default: "8px", max: 24 },
      { key: "category", label: "Radio de categorías", default: "8px", max: 24 },
      { key: "button", label: "Radio de botones", default: "4px", max: 24 },
    ],

    fontPairs: [
      { key: "tech", label: "Tech (Inter)", body: "Inter", heading: "Inter", preview: "Aa Bb Cc" },
      { key: "sharp", label: "Futurista (Roboto)", body: "Roboto", heading: "Roboto Condensed", preview: "Aa Bb Cc" },
      { key: "clean", label: "Limpio (DM Sans)", body: "DM Sans", heading: "DM Sans", preview: "Aa Bb Cc" },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Content — dashboard tab groups
  // ─────────────────────────────────────────────────────────────────────────
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
                label: "Proporción de imágenes",
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
            id: "navigation",
            label: "Navegación",
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
                  { value: "columns", label: "En columnas" },
                  { value: "minimal", label: "Mínimo" },
                  { value: "centered", label: "Centrado" },
                ],
              },
              {
                key: "layout.bannerHeight",
                label: "Altura del banner principal",
                type: "select" as const,
                options: [
                  { value: "short", label: "Bajo" },
                  { value: "normal", label: "Normal" },
                  { value: "tall", label: "Alto" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};
