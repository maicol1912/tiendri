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
      { key: "functional", label: "Funcional", body: "Inter", heading: "Inter", preview: "Aa Bb Cc" },
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
        id: "estilo-visual",
        label: "Estilo visual",
        icon: "Palette",
        sections: [
          {
            id: "tarjetas",
            label: "Tarjetas de producto",
            description: "Ajustá el estilo visual de las tarjetas en la tienda.",
            icon: "LayoutGrid",
            fields: [
              {
                key: "layout.layout.cardStyle",
                type: "select",
                label: "Estilo de tarjetas",
                options: [
                  { value: "flat", label: "Plana" },
                  { value: "shadow", label: "Con sombra" },
                  { value: "bordered", label: "Con borde" },
                  { value: "elevated", label: "Elevada" },
                ],
                defaultValue: "flat",
              },
              {
                key: "layout.layout.cardHoverEffect",
                type: "select",
                label: "Efecto al pasar el mouse",
                options: [
                  { value: "none", label: "Ninguno" },
                  { value: "lift", label: "Elevar" },
                  { value: "scale", label: "Escalar" },
                  { value: "glow", label: "Brillar" },
                ],
                defaultValue: "none",
              },
              {
                key: "layout.layout.cardImageRatio",
                type: "select",
                label: "Proporción de imágenes",
                options: [
                  { value: "square", label: "Cuadrada" },
                  { value: "portrait", label: "Retrato" },
                  { value: "wide", label: "Panorámica" },
                ],
                defaultValue: "square",
              },
            ],
          },
          {
            id: "estructura",
            label: "Estructura de la tienda",
            description: "Configurá el encabezado, pie de página y categorías.",
            icon: "Layout",
            fields: [
              {
                key: "layout.layout.headerStyle",
                type: "select",
                label: "Estilo del encabezado",
                options: [
                  { value: "standard", label: "Estándar" },
                  { value: "centered", label: "Centrado" },
                  { value: "minimal", label: "Minimalista" },
                ],
                defaultValue: "standard",
              },
              {
                key: "layout.layout.footerStyle",
                type: "select",
                label: "Estilo del pie de página",
                options: [
                  { value: "columns", label: "Columnas" },
                  { value: "minimal", label: "Minimalista" },
                  { value: "centered", label: "Centrado" },
                ],
                defaultValue: "minimal",
              },
              {
                key: "layout.layout.navStyle",
                type: "select",
                label: "Estilo de categorías",
                options: [
                  { value: "grid", label: "Cuadrícula" },
                  { value: "pills", label: "Píldoras" },
                  { value: "scroll", label: "Scroll horizontal" },
                ],
                defaultValue: "scroll",
              },
              {
                key: "layout.layout.bannerHeight",
                type: "select",
                label: "Altura del banner",
                options: [
                  { value: "short", label: "Bajo" },
                  { value: "normal", label: "Normal" },
                  { value: "tall", label: "Alto" },
                ],
                defaultValue: "normal",
              },
            ],
          },
          {
            id: "efectos",
            label: "Efectos visuales",
            description: "Animaciones y estilo de sombras en la tienda.",
            icon: "Sparkles",
            fields: [
              {
                key: "layout.layout.animationLevel",
                type: "select",
                label: "Nivel de animaciones",
                options: [
                  { value: "none", label: "Sin animaciones" },
                  { value: "subtle", label: "Sutiles" },
                  { value: "full", label: "Completas" },
                ],
                defaultValue: "none",
              },
              {
                key: "layout.layout.shadowStyle",
                type: "select",
                label: "Estilo de sombras",
                options: [
                  { value: "neutral", label: "Neutro" },
                  { value: "hue-tinted", label: "Tono del color principal" },
                ],
                defaultValue: "neutral",
              },
            ],
          },
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
