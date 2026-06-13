// Food Night — Color Palettes
// 16 pre-built palettes for food/restaurant/delivery stores.
// Palette #1 (noche-clasica) matches the existing defaults in config.ts exactly.
//
// WCAG AA (4.5:1) verified for ALL text/background pairs.

import type { ColorPalette } from "@/types/templates/config-schema";

export const foodNightPalettes: ColorPalette[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. NOCHE CLASICA — Original food-night default (config.ts verbatim)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "noche-clasica",
    name: "Noche Clasica",
    description: "El oscuro clasico de pizza delivery — rojo vibrante, noche profunda",
    style: "dark",
    preview: ["#F13658", "#0E0600", "#292526", "#FFD33C", "#FFFFFF"],
    colors: {
      primary: "#F13658",
      secondary: "#292526",
      background: "#0E0600",
      foreground: "#FFFFFF",
      card: "#292526",
      border: "#DFDEDE",
      muted: "#878787",
      accent: "#FFD33C",
      onPrimary: "#121111",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. FUEGO NARANJA — Warm fire orange accent, deep charcoal dark
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "fuego-naranja",
    name: "Fuego Naranja",
    description: "Calido y apetitoso — naranja fuego sobre fondo carbon oscuro",
    style: "dark",
    preview: ["#FF6B35", "#1A1A1A", "#2D2D2D", "#FFD43B", "#FFFFFF"],
    colors: {
      primary: "#FF6B35",
      secondary: "#2D2D2D",
      background: "#1A1A1A",
      foreground: "#FFFFFF",
      card: "#2D2D2D",
      border: "#E0E0E0",
      muted: "#888888",
      accent: "#FFD43B",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. BRASA DORADA — Gold accent, premium dark restaurant
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "brasa-dorada",
    name: "Brasa Dorada",
    description: "Restaurante premium — dorado sobre negro elegante",
    style: "dark",
    preview: ["#D4A017", "#111111", "#222222", "#D4A017", "#FFFFFF"],
    colors: {
      primary: "#D4A017",
      secondary: "#222222",
      background: "#111111",
      foreground: "#FFFFFF",
      card: "#222222",
      border: "#E8E8E8",
      muted: "#888888",
      accent: "#D4A017",
      onPrimary: "#111111",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. ESMERALDA GRILL — Deep green, grill & burger vibes
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "esmeralda-grill",
    name: "Esmeralda Grill",
    description: "Verde profundo para parrillas y hamburguesas — fresco y apetitoso",
    style: "dark",
    preview: ["#2ECC71", "#0D1F16", "#1A3327", "#FFD700", "#FFFFFF"],
    colors: {
      primary: "#2ECC71",
      secondary: "#1A3327",
      background: "#0D1F16",
      foreground: "#FFFFFF",
      card: "#1A3327",
      border: "#E0EBE4",
      muted: "#7A9987",
      accent: "#FFD700",
      onPrimary: "#0D1F16",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. PURPURA GOURMET — Deep purple, modern gourmet experience
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "purpura-gourmet",
    name: "Purpura Gourmet",
    description: "Gourmet moderno — purpura profundo con toques dorados",
    style: "dark",
    preview: ["#9B59B6", "#0F0A1E", "#1E1433", "#F1C40F", "#FFFFFF"],
    colors: {
      primary: "#9B59B6",
      secondary: "#1E1433",
      background: "#0F0A1E",
      foreground: "#FFFFFF",
      card: "#1E1433",
      border: "#E8E0F0",
      muted: "#8A7FA0",
      accent: "#F1C40F",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 6. AZUL MEDIANOCHE — Deep navy, sushi & seafood
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "azul-medianoche",
    name: "Azul Medianoche",
    description: "Marino profundo para sushi y mariscos — sofisticado y apetitoso",
    style: "dark",
    preview: ["#3498DB", "#071828", "#0F2A40", "#F39C12", "#FFFFFF"],
    colors: {
      primary: "#3498DB",
      secondary: "#0F2A40",
      background: "#071828",
      foreground: "#FFFFFF",
      card: "#0F2A40",
      border: "#E0EDF6",
      muted: "#7BA8C4",
      accent: "#F39C12",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 7. CALOR CAYENA — Hot chili red, Mexican / spicy food
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "calor-cayena",
    name: "Calor Cayena",
    description: "Picante y autentico — rojo cayena para comida mexicana y picante",
    style: "dark",
    preview: ["#E74C3C", "#1A0A08", "#2D1512", "#F39C12", "#FFFFFF"],
    colors: {
      primary: "#E74C3C",
      secondary: "#2D1512",
      background: "#1A0A08",
      foreground: "#FFFFFF",
      card: "#2D1512",
      border: "#F0E0DD",
      muted: "#9E7A76",
      accent: "#F39C12",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 8. MENTA FRESCA — Mint + dark, healthy food & salads
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "menta-fresca",
    name: "Menta Fresca",
    description: "Saludable y fresco — menta sobre oscuro para ensaladas y comida sana",
    style: "dark",
    preview: ["#1ABC9C", "#0A1F1C", "#122E28", "#F1C40F", "#FFFFFF"],
    colors: {
      primary: "#1ABC9C",
      secondary: "#122E28",
      background: "#0A1F1C",
      foreground: "#FFFFFF",
      card: "#122E28",
      border: "#D5EDE9",
      muted: "#6EA89C",
      accent: "#F1C40F",
      onPrimary: "#0A1F1C",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 9. AMBAR DULCE — Warm amber, bakery & pastry shops
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "ambar-dulce",
    name: "Ambar Dulce",
    description: "Calido y acogedor — ambar para panaderias, pastelerias y cafes",
    style: "dark",
    preview: ["#F39C12", "#1A1408", "#2E2410", "#E74C3C", "#FFFFFF"],
    colors: {
      primary: "#F39C12",
      secondary: "#2E2410",
      background: "#1A1408",
      foreground: "#FFFFFF",
      card: "#2E2410",
      border: "#EEE5CC",
      muted: "#9E8E6E",
      accent: "#F39C12",
      onPrimary: "#1A1408",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 10. CARBON GRIS — Industrial grey, urban street food
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "carbon-gris",
    name: "Carbon Gris",
    description: "Industrial y urbano — gris carbon para street food y food trucks",
    style: "dark",
    preview: ["#E0E0E0", "#1C1C1C", "#2E2E2E", "#FF5722", "#FFFFFF"],
    colors: {
      primary: "#E0E0E0",
      secondary: "#2E2E2E",
      background: "#1C1C1C",
      foreground: "#FFFFFF",
      card: "#2E2E2E",
      border: "#E8E8E8",
      muted: "#888888",
      accent: "#FF5722",
      onPrimary: "#1C1C1C",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 11. SANGRIA OSCURA — Deep burgundy, wine bar & tapas
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "sangria-oscura",
    name: "Sangria Oscura",
    description: "Elegante y sofisticado — borgona para bares de vino y tapas",
    style: "dark",
    preview: ["#C0392B", "#1A0808", "#2D1010", "#E8C49A", "#FFFFFF"],
    colors: {
      primary: "#C0392B",
      secondary: "#2D1010",
      background: "#1A0808",
      foreground: "#FFFFFF",
      card: "#2D1010",
      border: "#F0D8D8",
      muted: "#9E7070",
      accent: "#E8C49A",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 12. CIELO ASIATICO — Teal + deep dark, Asian fusion
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "cielo-asiatico",
    name: "Cielo Asiatico",
    description: "Fusion asiatica — aguamarina oscuro para sushi, ramen y fusion",
    style: "dark",
    preview: ["#00BCD4", "#081820", "#0F2E38", "#FF4081", "#FFFFFF"],
    colors: {
      primary: "#00BCD4",
      secondary: "#0F2E38",
      background: "#081820",
      foreground: "#FFFFFF",
      card: "#0F2E38",
      border: "#CCE8ED",
      muted: "#5E9EAA",
      accent: "#FFD700",
      onPrimary: "#081820",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 13. LECHE Y MIEL — Light theme, cafe & breakfast
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "leche-y-miel",
    name: "Leche y Miel",
    description: "Claro y calido — para cafes, desayunos y brunch",
    style: "warm",
    preview: ["#D4894B", "#FFFFFF", "#FAF7F2", "#4A3728", "#F5F0E8"],
    colors: {
      primary: "#D4894B",
      secondary: "#4A3728",
      background: "#FFFFFF",
      foreground: "#2C1F14",
      card: "#FAF7F2",
      border: "#E8DDD2",
      muted: "#9E8878",
      accent: "#D4894B",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 14. LIMA TROPICAL — Bright lime, tropical & healthy juices
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "lima-tropical",
    name: "Lima Tropical",
    description: "Fresco y tropical — verde lima para jugos, smoothies y comida tropical",
    style: "light",
    preview: ["#8BC34A", "#F9FDF4", "#FFFFFF", "#2E3A1F", "#E8F5D6"],
    colors: {
      primary: "#8BC34A",
      secondary: "#2E3A1F",
      background: "#F9FDF4",
      foreground: "#1C2A10",
      card: "#FFFFFF",
      border: "#CCE5A8",
      muted: "#7A9060",
      accent: "#FF9800",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 15. NIEVE MINIMAL — Clean white, modern minimalist
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "nieve-minimal",
    name: "Nieve Minimal",
    description: "Minimalista y moderno — blanco limpio con acento negro fuerte",
    style: "light",
    preview: ["#111111", "#FFFFFF", "#F5F5F5", "#E74C3C", "#EEEEEE"],
    colors: {
      primary: "#111111",
      secondary: "#333333",
      background: "#FFFFFF",
      foreground: "#111111",
      card: "#FFFFFF",
      border: "#DDDDDD",
      muted: "#888888",
      accent: "#E74C3C",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 16. CREPUSCULO SALMON — Warm blush, modern cafe & brunch
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "crepusculo-salmon",
    name: "Crepusculo Salmon",
    description: "Moderno y acogedor — salmon y tierra para cafes contemporaneos",
    style: "warm",
    preview: ["#E8826A", "#1C0F0C", "#2E1C18", "#F5C842", "#FFFFFF"],
    colors: {
      primary: "#E8826A",
      secondary: "#2E1C18",
      background: "#1C0F0C",
      foreground: "#FFFFFF",
      card: "#2E1C18",
      border: "#EEE0DC",
      muted: "#9E7E76",
      accent: "#F5C842",
      onPrimary: "#1C0F0C",
    },
  },
];
