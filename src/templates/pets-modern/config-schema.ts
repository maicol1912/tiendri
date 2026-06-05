// pets-modern — TemplateConfigSchema
// Declares the full configurable surface for the Pets Modern template.

import type { TemplateConfigSchema } from "@/types/templates";
import { petsModernPalettes } from "./palettes";

export const petsModernConfigSchema: TemplateConfigSchema = {
  // ─────────────────────────────────────────────────────────────────────────
  // Theme — editable colors, radius tokens, font pairs
  // ─────────────────────────────────────────────────────────────────────────
  theme: {
    palettes: petsModernPalettes,
    colors: [
      {
        key: "primary",
        label: "Color principal (acentos, pestanas activas)",
        default: "#FF7322",
      },
      {
        key: "background",
        label: "Color de fondo",
        default: "#FFFFFF",
      },
      {
        key: "cardBg",
        label: "Fondo de tarjetas",
        default: "#FFFFFF",
      },
      {
        key: "surface",
        label: "Fondo de imagenes y busqueda",
        default: "#F2F3F2",
      },
      {
        key: "border",
        label: "Color de bordes",
        default: "#E2E2E2",
      },
      {
        key: "buttonBg",
        label: "Color de botones",
        default: "#1D1D1B",
      },
    ],

    radius: [
      {
        key: "card",
        label: "Radio de tarjetas",
        default: "18px",
        max: 30,
      },
      {
        key: "category",
        label: "Radio de categorias",
        default: "18px",
        max: 30,
      },
      {
        key: "button",
        label: "Radio de botones",
        default: "15px",
        max: 30,
      },
    ],

    fontPairs: [
      {
        key: "modern",
        label: "Moderno",
        body: "Inter",
        heading: "Space Grotesk",
        preview: "Aa Bb Cc",
      },
      {
        key: "friendly",
        label: "Amigable",
        body: "Nunito",
        heading: "Nunito Sans",
        preview: "Aa Bb Cc",
      },
      {
        key: "warm",
        label: "Cálido",
        body: "Poppins",
        heading: "Playfair Display",
        preview: "Aa Bb Cc",
      },
      {
        key: "functional",
        label: "Funcional",
        body: "IBM Plex Sans",
        heading: "IBM Plex Mono",
        preview: "Aa Bb Cc",
      },
      {
        key: "elegant",
        label: "Elegante",
        body: "DM Sans",
        heading: "Cormorant Garamond",
        preview: "Aa Bb Cc",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Content tabs
  // ─────────────────────────────────────────────────────────────────────────
  content: {
    tabGroups: [
      // ───────────────────────────────────────────────────────────────────
      // Tab 1 — Contenido Principal
      // ───────────────────────────────────────────────────────────────────
      {
        id: "contenido-principal",
        label: "Contenido Principal",
        icon: "Layout",
        sections: [
          // Promo banner
          {
            id: "promo-banner",
            label: "Banner promocional",
            description:
              "El banner de promocion que aparece al inicio de la tienda.",
            icon: "Image",
            fields: [
              {
                key: "content.heroBanner.title",
                type: "text",
                label: "Titulo",
                placeholder: "Symply Adult Lamb",
                maxLength: 80,
              },
              {
                key: "content.heroBanner.subtitle",
                type: "text",
                label: "Subtitulo",
                placeholder: "20% de descuento",
                maxLength: 100,
              },
              {
                key: "content.heroBanner.image",
                type: "image",
                label: "Imagen del banner",
                description: "Recomendado: imagen cuadrada o rectangular.",
                maxFileSize: 5242880,
              },
            ],
          },

          // Trending items — repeatable
          {
            id: "trending-items",
            kind: "repeatable",
            label: "Productos en tendencia",
            description:
              "Las tarjetas de tendencia que aparecen en el carrusel horizontal.",
            icon: "TrendingUp",
            itemLabel: "Tendencia",
            minItems: 0,
            maxItems: 6,
            fields: [
              {
                key: "image",
                type: "image",
                label: "Imagen",
                maxFileSize: 5242880,
              },
              {
                key: "title",
                type: "text",
                label: "Titulo",
                placeholder: "Juguetes ecologicos",
                maxLength: 60,
              },
              {
                key: "subtitle",
                type: "text",
                label: "Subtitulo",
                placeholder: "Amigable con el planeta",
                maxLength: 100,
              },
            ],
          },

          // Pet types — repeatable
          {
            id: "pet-types",
            kind: "repeatable",
            label: "Tipos de mascota",
            description:
              "Las tarjetas de tipos de mascota (perros, gatos, etc.).",
            icon: "Heart",
            itemLabel: "Tipo de mascota",
            minItems: 0,
            maxItems: 8,
            fields: [
              {
                key: "image",
                type: "image",
                label: "Imagen",
                maxFileSize: 5242880,
              },
              {
                key: "label",
                type: "text",
                label: "Nombre",
                placeholder: "Perros",
                maxLength: 30,
              },
            ],
          },
        ],
      },

      // ───────────────────────────────────────────────────────────────────
      // Tab 2 — Apariencia
      // ───────────────────────────────────────────────────────────────────
      {
        id: "estilo-visual",
        label: "Estilo visual",
        icon: "Palette",
        sections: [
          {
            id: "layout-cards",
            label: "Tarjetas de productos",
            description: "Estilo visual de las tarjetas en catálogo y buscador.",
            fields: [
              {
                key: "layout.layout.cardStyle",
                type: "select" as const,
                label: "Estilo de tarjetas",
                description: "Cómo se presentan las tarjetas de productos",
                defaultValue: "bordered",
                options: [
                  { label: "Plana", value: "flat" },
                  { label: "Con sombra", value: "shadow" },
                  { label: "Con borde", value: "bordered" },
                  { label: "Elevada", value: "elevated" },
                ],
              },
              {
                key: "layout.layout.cardHoverEffect",
                type: "select" as const,
                label: "Efecto al pasar el mouse",
                description: "Animación de las tarjetas al interactuar",
                defaultValue: "scale",
                options: [
                  { label: "Ninguno", value: "none" },
                  { label: "Elevar", value: "lift" },
                  { label: "Escalar", value: "scale" },
                  { label: "Brillar", value: "glow" },
                ],
              },
              {
                key: "layout.layout.cardImageRatio",
                type: "select" as const,
                label: "Proporción de imágenes",
                description: "Forma de las imágenes en las tarjetas",
                defaultValue: "square",
                options: [
                  { label: "Cuadrada", value: "square" },
                  { label: "Retrato (vertical)", value: "portrait" },
                  { label: "Panorámica (horizontal)", value: "wide" },
                ],
              },
            ],
          },
          {
            id: "layout-structure",
            label: "Estructura de la tienda",
            description: "Disposición del encabezado, pie de página y categorías.",
            fields: [
              {
                key: "layout.layout.headerStyle",
                type: "select" as const,
                label: "Estilo del encabezado",
                description: "Disposición del encabezado de tu tienda",
                defaultValue: "standard",
                options: [
                  { label: "Estándar", value: "standard" },
                  { label: "Centrado", value: "centered" },
                  { label: "Minimalista", value: "minimal" },
                ],
              },
              {
                key: "layout.layout.footerStyle",
                type: "select" as const,
                label: "Estilo del pie de página",
                description: "Disposición del footer de tu tienda",
                defaultValue: "minimal",
                options: [
                  { label: "Columnas", value: "columns" },
                  { label: "Minimalista", value: "minimal" },
                  { label: "Centrado", value: "centered" },
                ],
              },
              {
                key: "layout.layout.navStyle",
                type: "select" as const,
                label: "Estilo de categorías",
                description: "Cómo se muestran las categorías",
                defaultValue: "grid",
                options: [
                  { label: "Cuadrícula", value: "grid" },
                  { label: "Píldoras", value: "pills" },
                  { label: "Scroll horizontal", value: "scroll" },
                ],
              },
              {
                key: "layout.layout.bannerHeight",
                type: "select" as const,
                label: "Altura del banner",
                description: "Tamaño del banner principal en la portada",
                defaultValue: "normal",
                options: [
                  { label: "Bajo", value: "short" },
                  { label: "Normal", value: "normal" },
                  { label: "Alto", value: "tall" },
                ],
              },
            ],
          },
          {
            id: "layout-effects",
            label: "Efectos visuales",
            description: "Animaciones y sombras de la tienda.",
            fields: [
              {
                key: "layout.layout.animationLevel",
                type: "select" as const,
                label: "Nivel de animaciones",
                description: "Controla cuánto movimiento tiene tu tienda",
                defaultValue: "subtle",
                options: [
                  { label: "Sin animaciones", value: "none" },
                  { label: "Sutiles", value: "subtle" },
                  { label: "Completas", value: "full" },
                ],
              },
              {
                key: "layout.layout.shadowStyle",
                type: "select" as const,
                label: "Estilo de sombras",
                description: "Sombras neutras o con tono del color principal",
                defaultValue: "neutral",
                options: [
                  { label: "Neutro", value: "neutral" },
                  { label: "Tono del color principal", value: "hue-tinted" },
                ],
              },
              {
                key: "layout.layout.buttonStyle",
                type: "select" as const,
                label: "Estilo de botones",
                description: "Apariencia de los botones principales",
                defaultValue: "filled",
                options: [
                  { label: "Relleno", value: "filled" },
                  { label: "Contorno", value: "outlined" },
                  { label: "Transparente", value: "ghost" },
                ],
              },
              {
                key: "layout.layout.badgeStyle",
                type: "select" as const,
                label: "Forma de etiquetas",
                description: "Forma de las etiquetas de descuento y estado",
                defaultValue: "pill",
                options: [
                  { label: "Redondeada", value: "pill" },
                  { label: "Cuadrada", value: "square" },
                ],
              },
              {
                key: "layout.layout.priceDisplay",
                type: "select" as const,
                label: "Prominencia de precios",
                description: "Qué tan destacados se muestran los precios",
                defaultValue: "standard",
                options: [
                  { label: "Destacado", value: "prominent" },
                  { label: "Normal", value: "standard" },
                  { label: "Discreto", value: "subtle" },
                ],
              },
            ],
          },
        ],
      },

      // ───────────────────────────────────────────────────────────────────
      // Tab 3 — Navegacion
      // ───────────────────────────────────────────────────────────────────
      {
        id: "navegacion",
        label: "Navegacion",
        icon: "Navigation",
        sections: [
          // Nav links — repeatable
          {
            id: "nav-links",
            kind: "repeatable",
            label: "Enlaces de navegacion",
            description:
              "Los enlaces que aparecen en el menu principal de la tienda.",
            icon: "Navigation",
            itemLabel: "Enlace",
            minItems: 1,
            maxItems: 6,
            fields: [
              {
                key: "label",
                type: "text",
                label: "Texto del enlace",
                placeholder: "Tienda",
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

          // Popular searches
          {
            id: "popular-searches",
            label: "Busquedas populares",
            description:
              "Sugerencias de busqueda para tus clientes.",
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
    ],
  },
};
