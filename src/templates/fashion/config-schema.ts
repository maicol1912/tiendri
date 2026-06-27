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
        label: "Esquinas de las tarjetas",
        default: "0px",
        max: 24,
      },
      {
        key: "category",
        label: "Esquinas de categorías",
        default: "0px",
        max: 24,
      },
      {
        key: "button",
        label: "Esquinas de los botones",
        default: "0px",
        max: 24,
      },
    ],

    fontPairs: [
      {
        key: "elegante",
        label: "Elegante",
        body: "Lato",
        heading: "Cormorant Garamond",
        preview: "Aa Bb Cc",
      },
      {
        key: "editorial",
        label: "Editorial",
        body: "DM Sans",
        heading: "Bodoni Moda",
        preview: "Aa Bb Cc",
      },
      {
        key: "atemporal",
        label: "Atemporal",
        body: "Source Sans 3",
        heading: "Libre Baskerville",
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
                label: "Formato de las fotos",
                defaultValue: "portrait",
                options: [
                  { value: "square", label: "Cuadrada" },
                  { value: "portrait", label: "Vertical" },
                  { value: "tall", label: "Vertical (3:4)" },
                  { value: "wide", label: "Horizontal" },
                ],
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
                key: "layout.gridDensity",
                type: "select" as const,
                label: "Espaciado del catálogo",
                description: "Cuántos productos se muestran por fila",
                options: [
                  { value: "compact", label: "Compacto (más productos por fila)" },
                  { value: "standard", label: "Estándar" },
                  { value: "spacious", label: "Espacioso (menos productos, más grandes)" },
                ],
              },
              {
                key: "layout.spacingDensity",
                type: "select" as const,
                label: "Espaciado entre elementos",
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
                key: "layout.gridProductsMobile",
                label: "Columnas en el celular",
                type: "number" as const,
                min: 1,
                max: 3,
              },
              {
                key: "layout.gridProductsDesktop",
                label: "Columnas en pantalla grande",
                type: "number" as const,
                min: 2,
                max: 6,
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
                label: "Enlace",
                description: "Ej: /productos, /categorias",
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

  // ─────────────────────────────────────────────────────────────────────────
  // Section schemas — per-section fields rendered by the dashboard accordion
  // ─────────────────────────────────────────────────────────────────────────
  sectionSchemas: {
    hero: {
      id: "hero",
      label: "Banner principal",
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
            { value: "Inter", label: "Inter — Moderno" },
            { value: "Playfair Display", label: "Playfair Display — Cálido" },
            { value: "Cormorant Garamond", label: "Cormorant Garamond — Elegante" },
            { value: "DM Sans", label: "DM Sans — Funcional" },
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
            { value: "Inter", label: "Inter — Moderno" },
            { value: "Playfair Display", label: "Playfair Display — Cálido" },
            { value: "Cormorant Garamond", label: "Cormorant Garamond — Elegante" },
            { value: "DM Sans", label: "DM Sans — Funcional" },
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

    collections: {
      id: "collections",
      label: "Colecciones",
      fields: [
        {
          key: "content.collectionsTitle",
          type: "text",
          label: "Título de la sección",
          description: "Encabezado visible sobre la grilla de colecciones",
          placeholder: "Colección",
          maxLength: 80,
        },
        {
          key: "content.collectionsSubtitle",
          type: "text",
          label: "Subtítulo de la sección",
          description: "Texto secundario bajo el título (opcional)",
          placeholder: "Descripción breve",
          maxLength: 160,
        },
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
      ],
    },
  },
};
