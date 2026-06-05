// Pets Classic — TemplateConfigSchema
// Full configurable surface for the Pets Classic template.

import type { TemplateConfigSchema } from "@/types/templates";
import { petsClassicPalettes } from "./palettes";

export const petsClassicConfigSchema: TemplateConfigSchema = {
  theme: {
    palettes: petsClassicPalettes,
    colors: [
      { key: "primary", label: "Color principal (naranja)", default: "#FFAF42" },
      { key: "background", label: "Fondo de la página", default: "#FFFFFF" },
      { key: "headerBg", label: "Fondo del encabezado", default: "#FFFFFF" },
      { key: "cardBg", label: "Fondo de tarjetas", default: "#FFFFFF" },
    ],
    radius: [
      { key: "card", label: "Radio de tarjetas", default: "14px", max: 28 },
      { key: "category", label: "Radio de categorías", default: "12px", max: 24 },
      { key: "button", label: "Radio de botones", default: "9999px", max: 9999 },
    ],
    fontPairs: [
      {
        key: "premium",
        label: "Plus Jakarta Sans + Poppins (Premium)",
        body: "Poppins",
        heading: "Plus Jakarta Sans",
        preview: "Aa Bb Cc",
      },
      {
        key: "modern",
        label: "Poppins + Poppins (Original)",
        body: "Poppins",
        heading: "Poppins",
      },
      {
        key: "classic",
        label: "Inter + Inter (Limpio)",
        body: "Inter",
        heading: "Inter",
      },
    ],
  },

  content: {
    tabGroups: [
      {
        id: "banner",
        label: "Banner promocional",
        icon: "Image",
        sections: [
          {
            id: "hero-content",
            label: "Contenido del banner",
            fields: [
              {
                key: "content.heroBanner.title",
                label: "Título principal",
                type: "text",
                defaultValue: "Todo para tu mascota",
                maxLength: 60,
              },
              {
                key: "content.heroBanner.subtitle",
                label: "Subtítulo",
                type: "textarea",
                defaultValue: "Los mejores productos para el bienestar de tu compañero fiel.",
                maxLength: 120,
              },
              {
                key: "content.heroBanner.ctaText",
                label: "Texto del botón",
                type: "text",
                defaultValue: "Ver catálogo",
                maxLength: 30,
              },
            ],
          },
        ],
      },
      {
        id: "store-info",
        label: "Información de la tienda",
        icon: "Store",
        sections: [
          {
            id: "branding",
            label: "Marca",
            fields: [
              {
                key: "branding.storeName",
                label: "Nombre de la tienda",
                type: "text",
                defaultValue: "Mi PetShop",
                maxLength: 50,
              },
              {
                key: "branding.description",
                label: "Descripción",
                type: "textarea",
                defaultValue: "Tu tienda de mascotas de confianza.",
                maxLength: 200,
              },
            ],
          },
        ],
      },
      {
        id: "appearance",
        label: "Apariencia",
        icon: "Sparkles",
        sections: [
          {
            id: "visual-effects",
            label: "Efectos visuales",
            fields: [
              {
                key: "layout.shadowStyle",
                label: "Estilo de sombras",
                type: "select" as const,
                description: "Sombras neutras o con tono del color principal",
                defaultValue: "hue-tinted",
                options: [
                  { value: "neutral", label: "Neutro (gris)" },
                  { value: "hue-tinted", label: "Tono del color principal" },
                ],
              },
              {
                key: "layout.animationLevel",
                label: "Nivel de animaciones",
                type: "select" as const,
                description: "Controla cuánto movimiento tiene tu tienda",
                defaultValue: "full",
                options: [
                  { value: "none", label: "Sin animaciones" },
                  { value: "subtle", label: "Sutiles" },
                  { value: "full", label: "Completas (recomendado)" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};
