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
      // Tab 2 — Apariencia
      // Covers: layout options (cardStyle, hover, ratio, header, footer, nav, banner, animations, shadows)
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
                defaultValue: "scale",
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
            id: "estructura",
            label: "Estructura de la tienda",
            fields: [
              {
                key: "layout.layout.headerStyle",
                type: "select",
                label: "Estilo del encabezado",
                defaultValue: "centered",
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
                defaultValue: "tall",
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
