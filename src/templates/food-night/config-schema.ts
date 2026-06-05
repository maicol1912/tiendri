// Food Night — TemplateConfigSchema
// Declares the full configurable surface for the Food Night template.

import type { TemplateConfigSchema } from "@/types/templates";
import { foodNightPalettes } from "./palettes";

export const foodNightConfigSchema: TemplateConfigSchema = {
  // ─────────────────────────────────────────────────────────────────────────
  // Theme — editable colors, radius tokens, font pairs
  // ─────────────────────────────────────────────────────────────────────────
  theme: {
    palettes: foodNightPalettes,
    colors: [
      {
        key: "primary",
        label: "Color principal (CTA, activos)",
        default: "#F13658",
      },
      {
        key: "background",
        label: "Color de fondo",
        default: "#0E0600",
      },
      {
        key: "cardBg",
        label: "Fondo de tarjetas",
        default: "#292526",
      },
      {
        key: "buttonBg",
        label: "Color de botones",
        default: "#FFFFFF",
      },
      {
        key: "ratingStar",
        label: "Color de estrellas",
        default: "#FFD33C",
      },
    ],

    radius: [
      {
        key: "card",
        label: "Radio de tarjetas",
        default: "16px",
        max: 32,
      },
      {
        key: "category",
        label: "Radio de categorias",
        default: "8px",
        max: 24,
      },
      {
        key: "button",
        label: "Radio de botones",
        default: "45px",
        max: 50,
      },
    ],

    fontPairs: [
      {
        key: "dark-modern",
        label: "Oscuro moderno",
        body: "Inter",
        heading: "Inter",
        preview: "Aa Bb Cc",
      },
      {
        key: "urban",
        label: "Urbano",
        body: "DM Sans",
        heading: "DM Serif Display",
        preview: "Aa Bb Cc",
      },
      {
        key: "clean",
        label: "Limpio",
        body: "Plus Jakarta Sans",
        heading: "Plus Jakarta Sans",
        preview: "Aa Bb Cc",
      },
      {
        key: "bold",
        label: "Impactante",
        body: "Manrope",
        heading: "Syne",
        preview: "Aa Bb Cc",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Content tabs
  // ─────────────────────────────────────────────────────────────────────────
  content: {
    tabGroups: [
      // ─────────────────────────────────────────────────────────────────────
      // Tab 1 — Contenido Principal
      // ─────────────────────────────────────────────────────────────────────
      {
        id: "contenido-principal",
        label: "Contenido Principal",
        icon: "Layout",
        sections: [
          // Hero banner
          {
            id: "hero-banner",
            label: "Banner principal",
            description: "Titulo y subtitulo del banner de bienvenida.",
            icon: "Image",
            fields: [
              {
                key: "content.heroBanner.title",
                type: "text",
                label: "Titulo",
                placeholder: "El sabor que te mereces",
                maxLength: 80,
              },
              {
                key: "content.heroBanner.subtitle",
                type: "text",
                label: "Subtitulo",
                placeholder: "Los mejores platos, listos para tu mesa o tu puerta.",
                maxLength: 120,
              },
              {
                key: "content.heroBanner.ctaText",
                type: "text",
                label: "Texto del boton",
                placeholder: "Ver menu",
                maxLength: 30,
              },
            ],
          },

          // Popular searches
          {
            id: "popular-searches",
            label: "Busquedas populares",
            description: "Sugerencias de busqueda para tus clientes.",
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

      // ─────────────────────────────────────────────────────────────────────
      // Tab 2 — Navegacion
      // ─────────────────────────────────────────────────────────────────────
      {
        id: "navegacion",
        label: "Navegacion",
        icon: "Navigation",
        sections: [
          {
            id: "nav-links",
            kind: "repeatable",
            label: "Enlaces de navegacion",
            description: "Los enlaces que aparecen en el menu principal.",
            icon: "Navigation",
            itemLabel: "Enlace",
            minItems: 1,
            maxItems: 6,
            fields: [
              {
                key: "label",
                type: "text",
                label: "Texto del enlace",
                placeholder: "Inicio",
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
        ],
      },

      // ─────────────────────────────────────────────────────────────────────
      // Tab 3 — Apariencia
      // ─────────────────────────────────────────────────────────────────────
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
                key: "layout.layout.cardStyle",
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
                key: "layout.layout.cardHoverEffect",
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
                key: "layout.layout.cardImageRatio",
                type: "select",
                label: "Proporción de imágenes",
                options: [
                  { value: "square", label: "Cuadrada" },
                  { value: "portrait", label: "Retrato" },
                  { value: "wide", label: "Panorámica" },
                ],
                defaultValue: "portrait",
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
                key: "layout.layout.headerStyle",
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
                key: "layout.layout.footerStyle",
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
                key: "layout.layout.navStyle",
                type: "select",
                label: "Estilo de categorías",
                options: [
                  { value: "grid", label: "Cuadrícula" },
                  { value: "pills", label: "Píldoras" },
                  { value: "scroll", label: "Scroll horizontal" },
                ],
                defaultValue: "pills",
              },
              {
                key: "layout.layout.bannerHeight",
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
                key: "layout.layout.animationLevel",
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
                key: "layout.layout.shadowStyle",
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

      // ─────────────────────────────────────────────────────────────────────
      // Tab 4 — Footer
      // ─────────────────────────────────────────────────────────────────────
      {
        id: "footer",
        label: "Footer",
        icon: "AlignBottom",
        sections: [
          {
            id: "footer-services",
            label: "Servicios del footer",
            description: "Lista de servicios que aparecen en el pie de pagina.",
            icon: "List",
            fields: [
              {
                key: "content.footerServices",
                type: "tag-list",
                label: "Servicios",
                placeholder: "Agregar servicio",
              },
            ],
          },
          {
            id: "footer-assistance",
            label: "Asistencia del footer",
            description: "Lista de asistencia que aparecen en el pie de pagina.",
            icon: "HelpCircle",
            fields: [
              {
                key: "content.footerAssistance",
                type: "tag-list",
                label: "Asistencia",
                placeholder: "Agregar item",
              },
            ],
          },
        ],
      },
    ],
  },
};
