// Furniture Light — TemplateConfigSchema
// Configurable surface for the Furniture Light template.

import type { TemplateConfigSchema } from "@/types/templates";
import { furnitureLightPalettes } from "./palettes";

export const furnitureLightConfigSchema: TemplateConfigSchema = {
  theme: {
    palettes: furnitureLightPalettes,
    colors: [
      { key: "primary", label: "Color principal (naranja)", default: "#F5841F" },
      { key: "secondary", label: "Color secundario (navy)", default: "#1B2838" },
      { key: "background", label: "Fondo de la página", default: "#FFFFFF" },
      { key: "cardBg", label: "Fondo de tarjetas", default: "#F5F7FA" },
    ],
    radius: [
      { key: "card", label: "Radio de tarjetas", default: "16px", max: 28 },
      { key: "category", label: "Radio de categorías", default: "14px", max: 28 },
      { key: "button", label: "Radio de botones", default: "12px", max: 28 },
    ],
    fontPairs: [
      { key: "modern", label: "Moderno", body: "Inter", heading: "Space Grotesk", preview: "Aa Bb Cc" },
      { key: "warm", label: "Cálido", body: "Poppins", heading: "Playfair Display", preview: "Aa Bb Cc" },
      { key: "elegant", label: "Elegante", body: "DM Sans", heading: "Cormorant Garamond", preview: "Aa Bb Cc" },
      { key: "minimal", label: "Mínimo", body: "Nunito", heading: "Nunito", preview: "Aa Bb Cc" },
    ],
  },

  content: {
    tabGroups: [
      {
        id: "contenido-principal",
        label: "Contenido Principal",
        icon: "Layout",
        sections: [
          {
            id: "hero",
            label: "Banner principal",
            description: "El banner de bienvenida con imagen y texto.",
            icon: "Image",
            fields: [
              {
                key: "content.heroBanner.title",
                type: "text",
                label: "Título del banner",
                placeholder: "¡Nueva colección disponible!",
                maxLength: 80,
              },
              {
                key: "content.heroBanner.subtitle",
                type: "text",
                label: "Subtítulo / CTA del banner",
                placeholder: "Ver más",
                maxLength: 60,
              },
              {
                key: "content.heroBanner.image",
                type: "image",
                label: "Imagen del banner",
                description: "Recomendado: imagen cuadrada o apaisada con producto.",
                maxFileSize: 5242880,
              },
            ],
          },
          {
            id: "tienda",
            label: "Información de la tienda",
            description: "Nombre y datos de contacto que aparecen en el header.",
            icon: "Store",
            fields: [
              {
                key: "branding.storeName",
                type: "text",
                label: "Nombre de la tienda",
                placeholder: "KASA",
                maxLength: 40,
              },
              {
                key: "business.whatsapp",
                type: "text",
                label: "Número de WhatsApp",
                placeholder: "573001234567",
                description: "Solo números, sin +, sin espacios.",
              },
            ],
          },
        ],
      },
      {
        id: "apariencia",
        label: "Apariencia",
        icon: "Palette",
        sections: [
          {
            id: "nav-links",
            label: "Menú de navegación",
            description: "Los enlaces que aparecen en el menú del header (escritorio).",
            icon: "Navigation",
            kind: "repeatable",
            itemLabel: "Enlace",
            minItems: 0,
            maxItems: 6,
            fields: [
              { key: "label", type: "text", label: "Texto del enlace", placeholder: "Inicio", maxLength: 30 },
              { key: "href", type: "url", label: "URL del enlace", placeholder: "/catalogo" },
            ],
          } as import("@/types/templates").RepeatableConfigSection,
        ],
      },
    ],
  },
};
