// Beauty Elegant — Color Palettes
// 16 palettes for elegant beauty brands.
// Palette #1 matches config.ts defaults exactly.

import type { ColorPalette } from "@/types/templates/config-schema";

export const beautyElegantPalettes: ColorPalette[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. ELEGANTE DEFAULT — The original beauty-elegant default (purple on white)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "elegante-default",
    name: "Violeta Elegante",
    description: "Púrpura profundo sobre blanco cristalino — lujo y elegancia cosmética",
    style: "premium",
    preview: ["#7700CF", "#FEFEFF", "#F0EDF5", "#000000", "#B081D3"],
    colors: {
      primary: "#7700CF",
      secondary: "#190E2C",
      background: "#FEFEFF",
      foreground: "#000000",
      card: "#F0EDF5",
      border: "#E4E7EC",
      muted: "#6E6E6E",
      accent: "#F97316",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. ORO ROSA — Rose gold elegant
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "oro-rosa",
    name: "Oro Rosa",
    description: "Oro rosado sobre blanco perlado — lujo femenino y sofisticado",
    style: "premium",
    preview: ["#B5707A", "#FFF8F8", "#FAF0F0", "#2A0A10", "#E8C0C8"],
    colors: {
      primary: "#B5707A",
      secondary: "#F5D8DC",
      background: "#FFF8F8",
      foreground: "#2A0A10",
      card: "#FAF0F0",
      border: "#F0D0D8",
      muted: "#8A5A60",
      accent: "#F97316",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. MARFIL CLASICO — Ivory classic
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "marfil-clasico",
    name: "Marfil Clásico",
    description: "Marfil y crema atemporal — elegancia clásica y discreta",
    style: "minimal",
    preview: ["#8A6840", "#FFFCF5", "#F5EED8", "#1A1008", "#D8C8A0"],
    colors: {
      primary: "#8A6840",
      secondary: "#EDE0C0",
      background: "#FFFCF5",
      foreground: "#1A1008",
      card: "#F8F0DC",
      border: "#E8D8B8",
      muted: "#7A6040",
      accent: "#F97316",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. NEGRO SOFISTICADO — Sophisticated black (DARK)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "negro-sofisticado",
    name: "Negro Sofisticado",
    description: "Negro absoluto con detalles sutiles — sofisticación máxima",
    style: "premium",
    preview: ["#9B59B6", "#0A0A0A", "#161616", "#F5F5F5", "#2A1A3A"],
    colors: {
      primary: "#9B59B6",
      secondary: "#1A0A2A",
      background: "#0A0A0A",
      foreground: "#F5F5F5",
      card: "#202030",
      border: "#303040",
      muted: "#9A9AAA",
      accent: "#F97316",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. VERDE ESMERALDA — Emerald green luxury
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "verde-esmeralda",
    name: "Verde Esmeralda",
    description: "Esmeralda sobre blanco — naturaleza de lujo y sostenibilidad",
    style: "nature",
    preview: ["#0A7A4A", "#F0FAF5", "#E0F5EA", "#001A0A", "#80C8A8"],
    colors: {
      primary: "#0A7A4A",
      secondary: "#0A2818",
      background: "#F0FAF5",
      foreground: "#001A0A",
      card: "#E0F5EA",
      border: "#B0E8CC",
      muted: "#3A7058",
      accent: "#F97316",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 6. AZUL ZAFIRO — Sapphire blue (DARK)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "azul-zafiro",
    name: "Azul Zafiro",
    description: "Azul zafiro profundo — cosmética de alta gama, noche y misterio",
    style: "premium",
    preview: ["#4488FF", "#060E1A", "#0D1A2E", "#E8F0FF", "#1A2A50"],
    colors: {
      primary: "#4488FF",
      secondary: "#0D1428",
      background: "#060E1A",
      foreground: "#E8F0FF",
      card: "#162040",
      border: "#203060",
      muted: "#8099BB",
      accent: "#F97316",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 7. ROSA CHAMPAGNE — Champagne pink
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "rosa-champagne",
    name: "Rosa Champagne",
    description: "Champagne y rosa dorado — celebración, glamour sutil y femenino",
    style: "premium",
    preview: ["#C49A70", "#FFF9F3", "#F8EFE4", "#2A1800", "#E8D0B8"],
    colors: {
      primary: "#C49A70",
      secondary: "#F0D8BC",
      background: "#FFF9F3",
      foreground: "#2A1800",
      card: "#F8EFE4",
      border: "#E8D0B8",
      muted: "#8A6840",
      accent: "#F97316",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 8. GRIS PLATINO — Platinum gray minimal
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "gris-platino",
    name: "Gris Platino",
    description: "Gris platino minimalista — modernidad clean y sofisticación",
    style: "minimal",
    preview: ["#5A5A6A", "#F8F8FA", "#EFEFF5", "#111118", "#CCCCDA"],
    colors: {
      primary: "#5A5A6A",
      secondary: "#D0D0E0",
      background: "#F8F8FA",
      foreground: "#111118",
      card: "#EFEFF5",
      border: "#DCDCE8",
      muted: "#6E6E7E",
      accent: "#F97316",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 9. BURDEOS REAL — Royal burgundy
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "burdeos-real",
    name: "Burdeos Real",
    description: "Burdeos real sobre crema — monarquía, lujo y femineidad",
    style: "premium",
    preview: ["#8B1A3A", "#FFF8FA", "#F5ECF0", "#1A0008", "#D0A0B0"],
    colors: {
      primary: "#8B1A3A",
      secondary: "#2A0010",
      background: "#FFF8FA",
      foreground: "#1A0008",
      card: "#F5ECF0",
      border: "#E8CCDA",
      muted: "#8A5068",
      accent: "#F97316",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 10. CREMA SEDA — Silk cream
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "crema-seda",
    name: "Crema Seda",
    description: "Seda crema suave — feminidad delicada, cuidado y nutrición",
    style: "minimal",
    preview: ["#A87840", "#FFFDF8", "#F8F0E0", "#201000", "#E8D0A0"],
    colors: {
      primary: "#A87840",
      secondary: "#EDD8A8",
      background: "#FFFDF8",
      foreground: "#201000",
      card: "#F8F0E0",
      border: "#E8D8B8",
      muted: "#806030",
      accent: "#F97316",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 11. LILA AMETISTA — Amethyst purple
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "lila-ametista",
    name: "Lila Amatista",
    description: "Amatista y lila profundo — misterio, meditación y belleza interior",
    style: "playful",
    preview: ["#8A3AB0", "#FAF5FF", "#F0E8FA", "#180830", "#C8A0E0"],
    colors: {
      primary: "#8A3AB0",
      secondary: "#2A0848",
      background: "#FAF5FF",
      foreground: "#180830",
      card: "#F0E8FA",
      border: "#D8C0F0",
      muted: "#7A50A0",
      accent: "#F97316",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 12. COBRE BRILLANTE — Brilliant copper
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "cobre-brillante",
    name: "Cobre Brillante",
    description: "Cobre brillante y cálido — mineralidad, artesanal y moderno",
    style: "warm",
    preview: ["#B05020", "#FFF6F0", "#F8EAE0", "#1A0800", "#E8A870"],
    colors: {
      primary: "#B05020",
      secondary: "#3A1000",
      background: "#FFF6F0",
      foreground: "#1A0800",
      card: "#F8EAE0",
      border: "#F0D0B8",
      muted: "#8A5030",
      accent: "#F97316",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 13. AZUL MEDIANOCHE — Midnight blue (DARK)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "azul-medianoche",
    name: "Azul Medianoche",
    description: "Azul medianoche profundo — cosmética nocturna, sueño y reparación",
    style: "premium",
    preview: ["#6088FF", "#07091A", "#10142A", "#E0E8FF", "#182048"],
    colors: {
      primary: "#6088FF",
      secondary: "#10142A",
      background: "#07091A",
      foreground: "#E0E8FF",
      card: "#18204A",
      border: "#28305A",
      muted: "#7088AA",
      accent: "#F97316",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 14. CORAL SUNSET — Sunset coral warm
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "coral-sunset",
    name: "Coral Sunset",
    description: "Coral atardecer sobre crema — calidez, vitalidad y energía",
    style: "vibrant",
    preview: ["#E8583A", "#FFF5F2", "#FAEAE4", "#2A0A00", "#F0A890"],
    colors: {
      primary: "#E8583A",
      secondary: "#3A1000",
      background: "#FFF5F2",
      foreground: "#2A0A00",
      card: "#FAEAE4",
      border: "#F0C8B8",
      muted: "#8A4830",
      accent: "#F97316",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 15. MOCA CAFE — Mocha/coffee tones
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "moca-cafe",
    name: "Moca Café",
    description: "Moca y café oscuro — calor, tierra y sensualidad beauty",
    style: "warm",
    preview: ["#7A4830", "#FBF6F2", "#F5EDE5", "#1A0800", "#D0A880"],
    colors: {
      primary: "#7A4830",
      secondary: "#301000",
      background: "#FBF6F2",
      foreground: "#1A0800",
      card: "#F5EDE5",
      border: "#E8D4C4",
      muted: "#7A5840",
      accent: "#F97316",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 16. BLANCO PERLA — Pearl white pristine
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "blanco-perla",
    name: "Blanco Perla",
    description: "Perla blanca prístina — pureza, minimalismo y cosmética clean",
    style: "minimal",
    preview: ["#404860", "#FFFFFF", "#F5F5FA", "#080810", "#D0D0E0"],
    colors: {
      primary: "#404860",
      secondary: "#0A0C20",
      background: "#FFFFFF",
      foreground: "#080810",
      card: "#F5F5FA",
      border: "#E0E0EA",
      muted: "#606078",
      accent: "#F97316",
      onPrimary: "#FFFFFF",
    },
  },
];
