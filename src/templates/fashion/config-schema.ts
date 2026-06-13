// Fashion Template — TemplateConfigSchema
// Declares the full configurable surface for the Fashion template.
// Covers theme tokens (colors, radius, font pairs, palettes) and content tabs.

import type { TemplateConfigSchema } from "@/types/templates/config-schema";
import { fashionPalettes } from "./palettes";

export const fashionConfigSchema: TemplateConfigSchema = {
  // ─────────────────────────────────────────────────────────────────────────
  // Theme — editable colors, radius tokens, font pairs, palettes
  // ─────────────────────────────────────────────────────────────────────────
  theme: {
    palettes: fashionPalettes,

    colors: [
      {
        key: "primary",
        label: "Color principal",
        default: "#000000",
      },
      {
        key: "secondary",
        label: "Color secundario",
        default: "#D9D9D9",
      },
      {
        key: "background",
        label: "Color de fondo",
        default: "#F5F5F0",
      },
      {
        key: "cardBg",
        label: "Fondo de tarjetas",
        default: "#FFFFFF",
      },
      {
        key: "headerBg",
        label: "Fondo del encabezado",
        default: "#F5F5F0",
      },
      {
        key: "footerBg",
        label: "Fondo del pie de página",
        default: "#F5F5F0",
      },
      {
        key: "buttonBg",
        label: "Fondo del botón",
        default: "#D9D9D9",
      },
      {
        key: "buttonText",
        label: "Texto del botón",
        default: "#000000",
      },
      {
        key: "textPrimary",
        label: "Texto principal",
        default: "#000000",
      },
      {
        key: "border",
        label: "Color de borde",
        default: "#D9D9D9",
      },
    ],

    radius: [
      {
        key: "card",
        label: "Radio de tarjetas",
        default: "0px",
        max: 24,
      },
      {
        key: "category",
        label: "Radio de categorías",
        default: "0px",
        max: 24,
      },
      {
        key: "button",
        label: "Radio de botones",
        default: "0px",
        max: 24,
      },
    ],

    fontPairs: [
      {
        key: "modern",
        label: "Moderno",
        body: "Inter",
        heading: "Inter",
        preview: "Aa Bb Cc",
      },
      {
        key: "warm",
        label: "Cálido",
        body: "Lato",
        heading: "Playfair Display",
        preview: "Aa Bb Cc",
      },
      {
        key: "elegant",
        label: "Elegante",
        body: "Montserrat",
        heading: "Cormorant Garamond",
        preview: "Aa Bb Cc",
      },
      {
        key: "functional",
        label: "Funcional",
        body: "DM Sans",
        heading: "DM Sans",
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
      // Covers: heroBanner, editorial
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
                placeholder: "Nueva Colección",
                maxLength: 80,
              },
              {
                key: "content.heroBanner.subtitle",
                type: "textarea",
                label: "Subtítulo",
                placeholder:
                  "Piezas esenciales para el guardarropa moderno. Minimalismo y elegancia.",
                maxLength: 160,
              },
              {
                key: "content.heroBanner.ctaText",
                type: "text",
                label: "Texto del botón",
                placeholder: "Ver colección",
                maxLength: 40,
              },
            ],
          },

          // Editorial section — simple section
          {
            id: "editorial",
            label: "Sección editorial",
            description:
              "Texto editorial destacado que acompaña la colección principal.",
            icon: "Type",
            fields: [
              {
                key: "content.editorial.heading",
                type: "text",
                label: "Encabezado editorial",
                placeholder: "Colección Primavera — Verano",
                maxLength: 80,
              },
              {
                key: "content.editorial.body",
                type: "textarea",
                label: "Cuerpo del texto",
                placeholder:
                  "Descubrí piezas que combinan simplicidad y elegancia para cada ocasión.",
                maxLength: 300,
              },
            ],
          },
        ],
      },

      // ───────────────────────────────────────────────────────────────────
      // Tab 2 — Estilo visual
      // Covers: cardImageRatio + new variant selectors
      // ───────────────────────────────────────────────────────────────────
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
                key: "layout.layout.cardImageRatio",
                type: "select",
                label: "Proporción de imágenes",
                defaultValue: "portrait",
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

      // ───────────────────────────────────────────────────────────────────
      // Tab 3 — Navegación y Pie de Página
      // Covers: navLinks, footerServices, footerAssistance
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
            maxItems: 6,
            fields: [
              {
                key: "label",
                type: "text",
                label: "Texto del enlace",
                placeholder: "HOMBRES",
                maxLength: 40,
                required: true,
              },
              {
                key: "href",
                type: "text",
                label: "Ruta",
                placeholder: "/hombres",
                required: true,
              },
            ],
          },

          // Footer services — repeatable
          {
            id: "footer-services",
            kind: "repeatable",
            label: "Servicios del pie de página",
            description:
              "Lista de servicios que se muestran en la sección de pie de página.",
            icon: "List",
            itemLabel: "Servicio",
            minItems: 0,
            maxItems: 8,
            fields: [
              {
                key: "label",
                type: "text",
                label: "Nombre del servicio",
                placeholder: "Guía de tallas",
                maxLength: 60,
                required: true,
              },
            ],
          },

          // Footer assistance — repeatable
          {
            id: "footer-assistance",
            kind: "repeatable",
            label: "Asistencia del pie de página",
            description:
              "Lista de opciones de ayuda que se muestran en el pie de página.",
            icon: "HelpCircle",
            itemLabel: "Opción de ayuda",
            minItems: 0,
            maxItems: 8,
            fields: [
              {
                key: "label",
                type: "text",
                label: "Nombre de la opción",
                placeholder: "Política de envíos",
                maxLength: 60,
                required: true,
              },
            ],
          },
        ],
      },
    ],
  },
};
