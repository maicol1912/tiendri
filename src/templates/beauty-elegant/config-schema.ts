// beauty-elegant — TemplateConfigSchema
// Configurable surface for the Beauty Elegant template.

import type { TemplateConfigSchema } from "@/types/templates";
import { beautyElegantPalettes } from "./palettes";

export const beautyElegantConfigSchema: TemplateConfigSchema = {
  // ─────────────────────────────────────────────────────────────────────────
  // Theme
  // ─────────────────────────────────────────────────────────────────────────
  theme: {
    palettes: beautyElegantPalettes,
    colors: [
      {
        key: "primary",
        label: "Color principal",
        default: "#7700CF",
      },
      {
        key: "background",
        label: "Color de fondo",
        default: "#FEFEFF",
      },
      {
        key: "buttonBg",
        label: "Color de botón",
        default: "#7700CF",
      },
      {
        key: "headerBg",
        label: "Color de encabezado",
        default: "#FEFEFEF2",
      },
    ],

    radius: [
      {
        key: "card",
        label: "Radio de tarjetas",
        default: "16px",
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
        default: "9999px",
        max: 32,
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
        key: "amigable",
        label: "Amigable",
        body: "Nunito",
        heading: "Poppins",
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
      // Covers: heroBanner, navLinks, footerServices, footerAssistance
      // ───────────────────────────────────────────────────────────────────
      {
        id: "contenido-principal",
        label: "Contenido Principal",
        icon: "Layout",
        sections: [
          // Hero banner
          {
            id: "hero-banner",
            label: "Banner principal",
            description: "El banner grande que aparece al inicio de la tienda.",
            icon: "Image",
            fields: [
              {
                key: "content.heroBanner.title",
                type: "text",
                label: "Título del banner",
                placeholder: "Descubre tu belleza con productos premium",
                maxLength: 80,
              },
              {
                key: "content.heroBanner.subtitle",
                type: "textarea",
                label: "Subtítulo",
                placeholder:
                  "Cosméticos, maquillaje y cuidado personal de alta calidad.",
                maxLength: 160,
              },
              {
                key: "content.heroBanner.ctaText",
                type: "text",
                label: "Texto del botón",
                placeholder: "Ver catálogo",
                maxLength: 40,
              },
              {
                key: "content.heroBanner.image",
                type: "image",
                label: "Imagen del banner",
                description: "Recomendado: 1920 × 1080 px (relación 16:9).",
                aspectRatio: "16:9",
                maxFileSize: 5242880,
              },
            ],
          },

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

          // Footer services — tag-list
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

          // Footer assistance — tag-list
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

      // Tab 2 — Diseño
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
                  { value: "5", label: "5 columnas" },
                ],
                defaultValue: "4",
              },
            ],
          },
        ],
      },

      // Tab 2 — Secciones
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
                label: "Bienvenida (Hero)",
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

      // Tab 3 — Apariencia
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
                key: "layout.layout.cardImageRatio",
                type: "select" as const,
                label: "Proporción de imágenes",
                description: "Forma de las imágenes en las tarjetas",
                defaultValue: "portrait",
                options: [
                  { label: "Cuadrada", value: "square" },
                  { label: "Retrato (vertical)", value: "portrait" },
                  { label: "Vertical (3:4)", value: "tall" },
                  { label: "Panorámica (horizontal)", value: "wide" },
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
            { value: "Inter", label: "Inter — Suave moderno" },
            { value: "Cormorant Garamond", label: "Cormorant Garamond — Elegante" },
            { value: "Nunito", label: "Nunito — Amigable" },
            { value: "Poppins", label: "Poppins — Moderno" },
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
            { value: "Inter", label: "Inter — Suave moderno" },
            { value: "Cormorant Garamond", label: "Cormorant Garamond — Elegante" },
            { value: "Nunito", label: "Nunito — Amigable" },
            { value: "Poppins", label: "Poppins — Moderno" },
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
  },
};
