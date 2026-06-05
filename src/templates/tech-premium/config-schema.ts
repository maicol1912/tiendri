// tech-premium — TemplateConfigSchema
// Declares the full configurable surface for the Tech Premium template.
// Phase 2: complete schema covering all ContentConfig fields and theme tokens.

import type { TemplateConfigSchema } from "@/types/templates";
import { techPremiumPalettes } from "./palettes";

export const techPremiumConfigSchema: TemplateConfigSchema = {
  // ─────────────────────────────────────────────────────────────────────────
  // Theme — 4 editable colors, 3 radius tokens, 4 font pairs
  // ─────────────────────────────────────────────────────────────────────────
  theme: {
    palettes: techPremiumPalettes,
    colors: [
      {
        key: "primary",
        label: "Color principal",
        default: "#000000",
      },
      {
        key: "secondary",
        label: "Color secundario",
        default: "#211C24",
      },
      {
        key: "accent",
        label: "Color de acento",
        default: "#000000",
      },
      {
        key: "background",
        label: "Color de fondo",
        default: "#FAFAFA",
      },
    ],

    radius: [
      {
        key: "card",
        label: "Radio de tarjetas",
        default: "9px",
        max: 24,
      },
      {
        key: "category",
        label: "Radio de categorías",
        default: "15px",
        max: 24,
      },
      {
        key: "button",
        label: "Radio de botones",
        default: "8px",
        max: 24,
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
        key: "warm",
        label: "Cálido",
        body: "Poppins",
        heading: "Playfair Display",
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
        key: "functional",
        label: "Funcional",
        body: "IBM Plex Sans",
        heading: "IBM Plex Mono",
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
      // Covers: heroBanner, promotionalBanners, offersBanner
      // ───────────────────────────────────────────────────────────────────
      {
        id: "contenido-principal",
        label: "Contenido Principal",
        icon: "Layout",
        sections: [
          // Hero banner — simple section
          {
            id: "hero-banner",
            label: "Banner principal",
            description:
              "El banner grande que aparece al inicio de la tienda.",
            icon: "Image",
            fields: [
              {
                key: "content.heroBanner.title",
                type: "text",
                label: "Título",
                placeholder: "Descubre lo mejor en tecnología",
                maxLength: 80,
              },
              {
                key: "content.heroBanner.subtitle",
                type: "textarea",
                label: "Subtítulo",
                placeholder:
                  "Los mejores productos al mejor precio, con envío rápido a toda Colombia.",
                maxLength: 160,
              },
              {
                key: "content.heroBanner.image",
                type: "image",
                label: "Imagen del banner",
                description: "Recomendado: 1920 × 1080 px (relación 16:9).",
                aspectRatio: "16:9",
                maxFileSize: 5242880,
              },
              {
                key: "content.heroBanner.ctaText",
                type: "text",
                label: "Texto del botón",
                placeholder: "Ver catálogo",
                maxLength: 40,
              },
            ],
          },

          // Promotional banners — repeatable section (max 4)
          {
            id: "promotional-banners",
            kind: "repeatable",
            label: "Banners promocionales",
            description:
              "Banners secundarios que destacan categorías, marcas u ofertas. Podés agregar hasta 4.",
            icon: "Image",
            itemLabel: "Banner promocional",
            minItems: 0,
            maxItems: 4,
            fields: [
              {
                key: "image",
                type: "image",
                label: "Imagen",
                description: "Recomendado: 1920 × 1080 px (relación 16:9).",
                aspectRatio: "16:9",
                maxFileSize: 5242880,
              },
              {
                key: "title",
                type: "text",
                label: "Título",
                placeholder: "Oferta especial",
                maxLength: 60,
              },
              {
                key: "subtitle",
                type: "text",
                label: "Subtítulo",
                placeholder: "Solo por tiempo limitado",
                maxLength: 100,
              },
              {
                key: "link",
                type: "url",
                label: "Enlace",
                placeholder: "https://...",
              },
            ],
          },

          // Offers banner — simple section
          {
            id: "offers-banner",
            label: "Banner de ofertas",
            description:
              "Banner especial que aparece en la sección de descuentos y promociones.",
            icon: "Image",
            fields: [
              {
                key: "content.offersBanner.desktopImage",
                type: "image",
                label: "Imagen escritorio",
                description: "Recomendado: 1920 × 1080 px (relación 16:9).",
                aspectRatio: "16:9",
                maxFileSize: 5242880,
              },
              {
                key: "content.offersBanner.mobileImage",
                type: "image",
                label: "Imagen móvil",
                description: "Recomendado: 1080 × 1920 px (relación 9:16).",
                aspectRatio: "9:16",
                maxFileSize: 5242880,
              },
              {
                key: "content.offersBanner.title",
                type: "text",
                label: "Título",
                placeholder: "Ofertas de temporada",
                maxLength: 80,
              },
              {
                key: "content.offersBanner.subtitle",
                type: "textarea",
                label: "Subtítulo",
                placeholder: "Aprovechá los mejores precios del año.",
                maxLength: 160,
              },
              {
                key: "content.offersBanner.ctaText",
                type: "text",
                label: "Texto del botón",
                placeholder: "Ver ofertas",
                maxLength: 40,
              },
            ],
          },
        ],
      },

      // ───────────────────────────────────────────────────────────────────
      // Tab 2 — Apariencia
      // Covers: layout tokens (cardStyle, hoverEffect, imageRatio, header,
      //         footer, navStyle, bannerHeight, animationLevel, shadowStyle)
      // ───────────────────────────────────────────────────────────────────
      {
        id: "apariencia",
        label: "Apariencia",
        icon: "Palette",
        sections: [
          {
            id: "layout-cards",
            label: "Tarjetas de productos",
            description: "Estilo visual de las tarjetas en catálogo y buscador.",
            fields: [
              {
                key: "layout.cardStyle",
                type: "select" as const,
                label: "Estilo de tarjetas",
                description: "Cómo se presentan las tarjetas de productos",
                defaultValue: "flat",
                options: [
                  { label: "Plana", value: "flat" },
                  { label: "Con sombra", value: "shadow" },
                  { label: "Con borde", value: "bordered" },
                  { label: "Elevada", value: "elevated" },
                ],
              },
              {
                key: "layout.cardHoverEffect",
                type: "select" as const,
                label: "Efecto al pasar el mouse",
                description: "Animación de las tarjetas al interactuar",
                defaultValue: "none",
                options: [
                  { label: "Ninguno", value: "none" },
                  { label: "Elevar", value: "lift" },
                  { label: "Escalar", value: "scale" },
                  { label: "Brillar", value: "glow" },
                ],
              },
              {
                key: "layout.cardImageRatio",
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
                key: "layout.headerStyle",
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
                key: "layout.footerStyle",
                type: "select" as const,
                label: "Estilo del pie de página",
                description: "Disposición del footer de tu tienda",
                defaultValue: "columns",
                options: [
                  { label: "Columnas", value: "columns" },
                  { label: "Minimalista", value: "minimal" },
                  { label: "Centrado", value: "centered" },
                ],
              },
              {
                key: "layout.navStyle",
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
                key: "layout.bannerHeight",
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
                key: "layout.animationLevel",
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
                key: "layout.shadowStyle",
                type: "select" as const,
                label: "Estilo de sombras",
                description: "Sombras neutras o con tono del color principal",
                defaultValue: "neutral",
                options: [
                  { label: "Neutro", value: "neutral" },
                  { label: "Tono del color principal", value: "hue-tinted" },
                ],
              },
            ],
          },
        ],
      },

      // ───────────────────────────────────────────────────────────────────
      // Tab 3 — Navegación y Pie de Página
      // Covers: navLinks, productTabs, popularSearches, footerServices, footerAssistance
      // ───────────────────────────────────────────────────────────────────
      {
        id: "navegacion-pie",
        label: "Navegación y Pie de Página",
        icon: "Navigation",
        sections: [
          // Nav links — repeatable
          {
            id: "nav-links",
            kind: "repeatable",
            label: "Enlaces de navegación",
            description:
              "Los enlaces que aparecen en el menú principal de la tienda.",
            icon: "Navigation",
            itemLabel: "Enlace",
            minItems: 1,
            maxItems: 8,
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

          // Product tabs — repeatable
          {
            id: "product-tabs",
            kind: "repeatable",
            label: "Pestañas de productos",
            description:
              "Las pestañas que filtran los productos en la página de inicio.",
            icon: "Layout",
            itemLabel: "Tab",
            minItems: 1,
            maxItems: 6,
            fields: [
              {
                key: "id",
                type: "text",
                label: "Identificador",
                placeholder: "new-arrival",
                required: true,
              },
              {
                key: "label",
                type: "text",
                label: "Etiqueta",
                placeholder: "Nuevos",
                maxLength: 30,
                required: true,
              },
            ],
          },

          // Popular searches — simple section with tag-list
          {
            id: "popular-searches",
            label: "Búsquedas populares",
            description:
              "Sugerencias de búsqueda que aparecen en la barra de búsqueda.",
            icon: "Search",
            fields: [
              {
                key: "content.popularSearches",
                type: "tag-list",
                label: "Términos de búsqueda",
                placeholder: "Agregar término",
              },
            ],
          },

          // Footer services — simple section with tag-list
          {
            id: "footer-services",
            label: "Servicios del pie de página",
            description:
              "Lista de servicios que se muestran en la sección de pie de página.",
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

          // Footer assistance — simple section with tag-list
          {
            id: "footer-assistance",
            label: "Asistencia del pie de página",
            description:
              "Lista de opciones de ayuda que se muestran en el pie de página.",
            icon: "HelpCircle",
            fields: [
              {
                key: "content.footerAssistance",
                type: "tag-list",
                label: "Opciones de asistencia",
                placeholder: "Agregar opción",
              },
            ],
          },
        ],
      },
    ],
  },
};
