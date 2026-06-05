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
                key: "layout.layout.cardStyle",
                type: "select",
                label: "Estilo de tarjetas",
                defaultValue: "flat",
                options: [
                  { value: "flat", label: "Plano" },
                  { value: "shadow", label: "Con sombra" },
                  { value: "bordered", label: "Con borde" },
                  { value: "elevated", label: "Elevado" },
                ],
              },
              {
                key: "layout.layout.cardHoverEffect",
                type: "select",
                label: "Efecto al pasar el mouse",
                defaultValue: "none",
                options: [
                  { value: "none", label: "Ninguno" },
                  { value: "lift", label: "Elevar" },
                  { value: "scale", label: "Agrandar" },
                  { value: "glow", label: "Brillar" },
                ],
              },
              {
                key: "layout.layout.cardImageRatio",
                type: "select",
                label: "Proporción de imágenes",
                defaultValue: "square",
                options: [
                  { value: "square", label: "Cuadrada" },
                  { value: "portrait", label: "Vertical" },
                  { value: "wide", label: "Horizontal" },
                ],
              },
            ],
          },
          {
            id: "estructura",
            label: "Estructura de la tienda",
            fields: [
              {
                key: "layout.layout.headerStyle",
                type: "select",
                label: "Estilo del encabezado",
                defaultValue: "standard",
                options: [
                  { value: "standard", label: "Estándar" },
                  { value: "centered", label: "Centrado" },
                  { value: "minimal", label: "Mínimo" },
                ],
              },
              {
                key: "layout.layout.footerStyle",
                type: "select",
                label: "Estilo del pie de página",
                defaultValue: "minimal",
                options: [
                  { value: "columns", label: "En columnas" },
                  { value: "minimal", label: "Mínimo" },
                  { value: "centered", label: "Centrado" },
                ],
              },
              {
                key: "layout.layout.navStyle",
                type: "select",
                label: "Estilo de categorías",
                defaultValue: "scroll",
                options: [
                  { value: "grid", label: "Cuadrícula" },
                  { value: "pills", label: "Pastillas" },
                  { value: "scroll", label: "Desplazable" },
                ],
              },
              {
                key: "layout.layout.bannerHeight",
                type: "select",
                label: "Altura del banner",
                defaultValue: "normal",
                options: [
                  { value: "short", label: "Bajo" },
                  { value: "normal", label: "Normal" },
                  { value: "tall", label: "Alto" },
                ],
              },
            ],
          },
          {
            id: "efectos",
            label: "Efectos",
            fields: [
              {
                key: "layout.layout.animationLevel",
                type: "select",
                label: "Nivel de animaciones",
                defaultValue: "subtle",
                options: [
                  { value: "none", label: "Sin animaciones" },
                  { value: "subtle", label: "Sutil" },
                  { value: "full", label: "Completo" },
                ],
              },
              {
                key: "layout.layout.shadowStyle",
                type: "select",
                label: "Estilo de sombras",
                defaultValue: "neutral",
                options: [
                  { value: "neutral", label: "Neutral" },
                  { value: "hue-tinted", label: "Con tinte de color" },
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
