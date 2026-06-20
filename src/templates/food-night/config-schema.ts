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
        key: "urbano",
        label: "Urbano",
        body: "Nunito Sans",
        heading: "Syne",
        preview: "Aa Bb Cc",
      },
      {
        key: "audaz",
        label: "Audaz",
        body: "Hind",
        heading: "Bebas Neue",
        preview: "Aa Bb Cc",
      },
      {
        key: "preciso",
        label: "Preciso",
        body: "IBM Plex Sans",
        heading: "Space Grotesk",
        preview: "Aa Bb Cc",
      },
      {
        key: "minimalista",
        label: "Minimalista",
        body: "Inter",
        heading: "Manrope",
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
                  { value: "tall", label: "Vertical (3:4)" },
                  { value: "wide", label: "Panorámica" },
                ],
                defaultValue: "portrait",
              },
              {
                key: "structuralVariants.categoryDisplayType",
                label: "Vista de categorías",
                type: "select" as const,
                options: [
                  { value: "text-only", label: "Solo texto" },
                  { value: "icon-text", label: "Ícono + texto" },
                  { value: "image-text", label: "Imagen + texto" },
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
          {
            id: "grilla-productos",
            label: "Columnas de productos",
            description: "Cuántos productos se muestran por fila en móvil y escritorio.",
            fields: [
              {
                key: "gridProductsMobile",
                label: "Columnas productos (mobile)",
                type: "number" as const,
                min: 1,
                max: 3,
              },
              {
                key: "gridProductsDesktop",
                label: "Columnas productos (desktop)",
                type: "number" as const,
                min: 2,
                max: 6,
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

  // ─────────────────────────────────────────────────────────────────────────
  // Section schemas — per-section fields rendered by the dashboard accordion
  // ─────────────────────────────────────────────────────────────────────────
  sectionSchemas: {
    hero: {
      id: "hero",
      label: "Hero / Banner Principal",
      fields: [
        {
          key: "textAlignment",
          type: "select",
          label: "Alineación del texto",
          description: "Alineación del título y descripción del hero",
          options: [
            { value: "left", label: "Izquierda" },
            { value: "center", label: "Centro" },
            { value: "right", label: "Derecha" },
          ],
        },
        {
          key: "fontFamily",
          type: "select",
          label: "Fuente del título",
          description:
            "Fuente para el título del hero (deja vacío para usar la del template)",
          options: [
            { value: "", label: "Default del template" },
            { value: "Inter", label: "Inter — Oscuro moderno" },
            { value: "DM Serif Display", label: "DM Serif Display — Urbano" },
            { value: "Plus Jakarta Sans", label: "Plus Jakarta Sans — Limpio" },
            { value: "Syne", label: "Syne — Impactante" },
            { value: "Nunito", label: "Nunito — Cálido" },
          ],
        },
      ],
    },

    categories: {
      id: "categories",
      label: "Categorías",
      fields: [
        {
          key: "gridColumnsMobile",
          type: "range",
          label: "Columnas en móvil",
          description: "Cantidad de columnas en pantallas pequeñas",
          min: 2,
          max: 4,
          step: 1,
        },
        {
          key: "gridColumnsDesktop",
          type: "range",
          label: "Columnas en escritorio",
          description: "Cantidad de columnas en pantallas grandes",
          min: 3,
          max: 8,
          step: 1,
        },
        {
          key: "textAlignment",
          type: "select",
          label: "Alineación del texto",
          options: [
            { value: "left", label: "Izquierda" },
            { value: "center", label: "Centro" },
            { value: "right", label: "Derecha" },
          ],
        },
      ],
    },

    products: {
      id: "products",
      label: "Productos",
      fields: [
        {
          key: "gridColumnsMobile",
          type: "range",
          label: "Columnas en móvil",
          min: 1,
          max: 3,
          step: 1,
        },
        {
          key: "gridColumnsDesktop",
          type: "range",
          label: "Columnas en escritorio",
          min: 2,
          max: 6,
          step: 1,
        },
        {
          key: "textAlignment",
          type: "select",
          label: "Alineación del texto",
          options: [
            { value: "left", label: "Izquierda" },
            { value: "center", label: "Centro" },
            { value: "right", label: "Derecha" },
          ],
        },
        {
          key: "fontFamily",
          type: "select",
          label: "Fuente de los títulos",
          description: "Fuente para el encabezado de productos",
          options: [
            { value: "", label: "Default del template" },
            { value: "Inter", label: "Inter — Oscuro moderno" },
            { value: "DM Serif Display", label: "DM Serif Display — Urbano" },
            { value: "Plus Jakarta Sans", label: "Plus Jakarta Sans — Limpio" },
            { value: "Syne", label: "Syne — Impactante" },
            { value: "Nunito", label: "Nunito — Cálido" },
          ],
        },
        {
          key: "curatedProductIds",
          type: "tag-list",
          label: "Productos seleccionados",
          description:
            "IDs de los productos a mostrar (vacío = todos). Ingresá los IDs separados por Enter.",
          placeholder: "ID del producto",
        },
      ],
    },
  },
};
