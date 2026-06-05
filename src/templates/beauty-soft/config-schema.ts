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
        id: "apariencia",
        label: "Apariencia",
        icon: "Sliders",
        sections: [
          {
            id: "tarjetas",
            label: "Tarjetas de producto",
            description: "Ajustá el estilo visual de las tarjetas en la tienda.",
            icon: "LayoutGrid",
            fields: [
              {
                key: "layout.cardStyle",
                type: "select",
                label: "Estilo de tarjetas",
                options: [
                  { value: "flat", label: "Plana" },
                  { value: "shadow", label: "Con sombra" },
                  { value: "bordered", label: "Con borde" },
                  { value: "elevated", label: "Elevada" },
                ],
                defaultValue: "flat",
              },
              {
                key: "layout.cardHoverEffect",
                type: "select",
                label: "Efecto al pasar el mouse",
                options: [
                  { value: "none", label: "Ninguno" },
                  { value: "lift", label: "Elevar" },
                  { value: "scale", label: "Escalar" },
                  { value: "glow", label: "Brillar" },
                ],
                defaultValue: "none",
              },
              {
                key: "layout.cardImageRatio",
                type: "select",
                label: "Proporción de imágenes",
                options: [
                  { value: "square", label: "Cuadrada" },
                  { value: "portrait", label: "Retrato" },
                  { value: "wide", label: "Panorámica" },
                ],
                defaultValue: "square",
              },
            ],
          },
          {
            id: "estructura",
            label: "Estructura de la tienda",
            description: "Configurá el encabezado, pie de página y categorías.",
            icon: "Layout",
            fields: [
              {
                key: "layout.headerStyle",
                type: "select",
                label: "Estilo del encabezado",
                options: [
                  { value: "standard", label: "Estándar" },
                  { value: "centered", label: "Centrado" },
                  { value: "minimal", label: "Minimalista" },
                ],
                defaultValue: "standard",
              },
              {
                key: "layout.footerStyle",
                type: "select",
                label: "Estilo del pie de página",
                options: [
                  { value: "columns", label: "Columnas" },
                  { value: "minimal", label: "Minimalista" },
                  { value: "centered", label: "Centrado" },
                ],
                defaultValue: "minimal",
              },
              {
                key: "layout.navStyle",
                type: "select",
                label: "Estilo de categorías",
                options: [
                  { value: "grid", label: "Cuadrícula" },
                  { value: "pills", label: "Píldoras" },
                  { value: "scroll", label: "Scroll horizontal" },
                ],
                defaultValue: "scroll",
              },
              {
                key: "layout.bannerHeight",
                type: "select",
                label: "Altura del banner",
                options: [
                  { value: "short", label: "Bajo" },
                  { value: "normal", label: "Normal" },
                  { value: "tall", label: "Alto" },
                ],
                defaultValue: "normal",
              },
            ],
          },
          {
            id: "efectos",
            label: "Efectos visuales",
            description: "Animaciones y estilo de sombras en la tienda.",
            icon: "Sparkles",
            fields: [
              {
                key: "layout.animationLevel",
                type: "select",
                label: "Nivel de animaciones",
                options: [
                  { value: "none", label: "Sin animaciones" },
                  { value: "subtle", label: "Sutiles" },
                  { value: "full", label: "Completas" },
                ],
                defaultValue: "none",
              },
              {
                key: "layout.shadowStyle",
                type: "select",
                label: "Estilo de sombras",
                options: [
                  { value: "neutral", label: "Neutro" },
                  { value: "hue-tinted", label: "Tono del color principal" },
                ],
                defaultValue: "neutral",
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
};
