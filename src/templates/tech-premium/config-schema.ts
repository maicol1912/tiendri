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
      {
        key: "elegante",
        label: "Elegante",
        body: "Lato",
        heading: "Cormorant Garamond",
        preview: "Aa Bb Cc",
      },
      {
        key: "contemporaneo",
        label: "Contemporáneo",
        body: "Outfit",
        heading: "Bricolage Grotesque",
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
      // Tab 2 — Estilo visual
      // Covers: cardImageRatio + new variant selectors
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
                key: "layout.layout.cardImageRatio",
                type: "select" as const,
                label: "Proporción de imágenes",
                description: "Forma de las imágenes en las tarjetas",
                defaultValue: "square",
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
            { value: "Space Grotesk", label: "Space Grotesk — Moderno" },
            { value: "Playfair Display", label: "Playfair Display — Cálido" },
            {
              value: "Cormorant Garamond",
              label: "Cormorant Garamond — Elegante",
            },
            { value: "IBM Plex Mono", label: "IBM Plex Mono — Funcional" },
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
            { value: "Space Grotesk", label: "Space Grotesk — Moderno" },
            { value: "Playfair Display", label: "Playfair Display — Cálido" },
            {
              value: "Cormorant Garamond",
              label: "Cormorant Garamond — Elegante",
            },
            { value: "IBM Plex Mono", label: "IBM Plex Mono — Funcional" },
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

    banners: {
      id: "banners",
      label: "Banners promocionales",
      fields: [
        {
          key: "content.banners.wide.title",
          type: "text",
          label: "Título del banner ancho",
          description: "Texto principal del banner grande (izquierda superior)",
          placeholder: "Nuevo lanzamiento",
          maxLength: 60,
        },
        {
          key: "content.banners.wide.description",
          type: "text",
          label: "Descripción del banner ancho",
          placeholder: "Descripción breve del producto o campaña",
          maxLength: 120,
        },
        {
          key: "content.banners.tall.title",
          type: "text",
          label: "Título del banner vertical",
          description: "Texto principal del banner alto (columna derecha)",
          placeholder: "Colección exclusiva",
          maxLength: 60,
        },
        {
          key: "content.banners.tall.ctaText",
          type: "text",
          label: "Texto del botón (banner vertical)",
          placeholder: "Ver más",
          maxLength: 30,
        },
      ],
    },

    discounts: {
      id: "discounts",
      label: "Descuentos",
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
      ],
    },
  },
};
