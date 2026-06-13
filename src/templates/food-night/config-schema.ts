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
      {
        key: "modern",
        label: "Moderno",
        body: "Inter",
        heading: "Inter",
        preview: "Aa Bb Cc",
      },
      {
        key: "elegant",
        label: "Elegante",
        body: "DM Sans",
        heading: "DM Serif Display",
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
        body: "Plus Jakarta Sans",
        heading: "Plus Jakarta Sans",
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
