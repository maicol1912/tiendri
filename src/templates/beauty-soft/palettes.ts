// Beauty Soft — Color Palettes
// 16 palettes for skincare/beauty stores.
// Palette #1 matches config.ts defaults exactly.

import type { ColorPalette } from "@/types/templates/config-schema";

export const beautySoftPalettes: ColorPalette[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. CORAL SUAVE — The original beauty-soft default (coral accent on soft gray)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "coral-suave",
    name: "Coral Suave",
    description: "Coral cálido sobre gris suave — belleza fresca y accesible",
    style: "warm",
    preview: ["#FF4428", "#F4F4F7", "#FFFFFF", "#000000", "#9DA2A6"],
    colors: {
      primary: "#FF4428",
      secondary: "#F5F4F7",
      background: "#F4F4F7",
      foreground: "#000000",
      card: "#F4F4F7",
      border: "#E5E5EE",
      muted: "#9DA2A6",
      accent: "#F97316",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. ROSA DELICADO — Soft pink, feminine
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "rosa-delicado",
    name: "Rosa Delicado",
    description: "Rosa suave con acentos vibrantes — femenino y delicado",
    style: "playful",
    preview: ["#E91E8C", "#FDF2F8", "#FFFFFF", "#1A1A1A", "#F8BBD9"],
    colors: {
      primary: "#E91E8C",
      secondary: "#FCE4EC",
      background: "#FDF2F8",
      foreground: "#1A1A1A",
      card: "#FDF2F8",
      border: "#F8BBD9",
      muted: "#9A607A",
      accent: "#F97316",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. LAVANDA SPA — Lavender, calming spa
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "lavanda-spa",
    name: "Lavanda Spa",
    description: "Lavanda calmante con tonos suaves — ideal para spa y bienestar",
    style: "minimal",
    preview: ["#7C3AED", "#F5F3FF", "#FFFFFF", "#1A1A2E", "#DDD6FE"],
    colors: {
      primary: "#7C3AED",
      secondary: "#EDE9FE",
      background: "#F5F3FF",
      foreground: "#1A1A2E",
      card: "#F5F3FF",
      border: "#DDD6FE",
      muted: "#6B5A8A",
      accent: "#F97316",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. VERDE ORGANICO — Green, organic beauty
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "verde-organico",
    name: "Verde Orgánico",
    description: "Verde natural para productos orgánicos y cosméticos limpios",
    style: "nature",
    preview: ["#2D7D46", "#F0FAF3", "#FFFFFF", "#1A3320", "#A7D7B4"],
    colors: {
      primary: "#2D7D46",
      secondary: "#D1FADF",
      background: "#F0FAF3",
      foreground: "#1A3320",
      card: "#F0FAF3",
      border: "#BBF0CB",
      muted: "#4A7A58",
      accent: "#F97316",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. NOCHE GLAMOUR — Dark glamour, gold accents (DARK)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "noche-glamour",
    name: "Noche Glamour",
    description: "Fondo oscuro con acento dorado — lujo, misterio y glamour",
    style: "premium",
    preview: ["#D4A843", "#0F0F0F", "#1A1A1A", "#F0EEF4", "#3A3030"],
    colors: {
      primary: "#D4A843",
      secondary: "#1A1A1A",
      background: "#0F0F0F",
      foreground: "#F0EEF4",
      card: "#242424",
      border: "#333333",
      muted: "#9A9A9A",
      accent: "#D4A843",
      onPrimary: "#0F0F0F",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 6. NUDE NATURAL — Nude/beige natural tones
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "nude-natural",
    name: "Nude Natural",
    description: "Tonos nude y beige naturales — piel, naturaleza y simplicidad",
    style: "minimal",
    preview: ["#A0744A", "#FAF5F0", "#FFFFFF", "#2A1F14", "#DDD0C0"],
    colors: {
      primary: "#A0744A",
      secondary: "#EDE0D0",
      background: "#FAF5F0",
      foreground: "#2A1F14",
      card: "#FAF5F0",
      border: "#E8D8C8",
      muted: "#8A7060",
      accent: "#F97316",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 7. AZUL HIELO — Icy blue, clinical skincare
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "azul-hielo",
    name: "Azul Hielo",
    description: "Azul clínico sobre blanco puro — skincare científico y limpio",
    style: "corporate",
    preview: ["#0070CC", "#F0F6FF", "#FFFFFF", "#0A1A30", "#B8D4F0"],
    colors: {
      primary: "#0070CC",
      secondary: "#DBEFFE",
      background: "#F0F6FF",
      foreground: "#0A1A30",
      card: "#F0F6FF",
      border: "#B8D4F0",
      muted: "#4A6A90",
      accent: "#F97316",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 8. MELOCOTON DORADO — Peach/golden warm
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "melocoton-dorado",
    name: "Melocotón Dorado",
    description: "Durazno y dorado cálido — luminoso, tierno y brillante",
    style: "warm",
    preview: ["#E8803A", "#FFF6EE", "#FFFFFF", "#2D1500", "#F0C090"],
    colors: {
      primary: "#E8803A",
      secondary: "#FFE8D0",
      background: "#FFF6EE",
      foreground: "#2D1500",
      card: "#FFF6EE",
      border: "#F8D8B8",
      muted: "#A06820",
      accent: "#E8803A",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 9. MENTA FRESCA — Fresh mint green
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "menta-fresca",
    name: "Menta Fresca",
    description: "Verde menta refrescante — natural, orgánico y limpio",
    style: "nature",
    preview: ["#10B981", "#F0FDF4", "#FFFFFF", "#064E3B", "#6EE7B7"],
    colors: {
      primary: "#10B981",
      secondary: "#D1FAE5",
      background: "#F0FDF4",
      foreground: "#064E3B",
      card: "#F0FDF4",
      border: "#A7F3D0",
      muted: "#047857",
      accent: "#F97316",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 10. BURDEOS LUJO — Burgundy luxury (DARK)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "burdeos-lujo",
    name: "Burdeos Lujo",
    description: "Burdeos profundo y oscuro — feminidad poderosa y lujo",
    style: "premium",
    preview: ["#C2185B", "#1A0A10", "#2A1018", "#F5E8EE", "#5A1530"],
    colors: {
      primary: "#C2185B",
      secondary: "#2A1018",
      background: "#120609",
      foreground: "#F5E8EE",
      card: "#2A1018",
      border: "#4A2030",
      muted: "#B09898",
      accent: "#E91E63",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 11. BLANCO CLINICO — Pure white clinical
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "blanco-clinico",
    name: "Blanco Clínico",
    description: "Blanco clínico puro — dermatología, ciencia y pureza",
    style: "minimal",
    preview: ["#1A6BC2", "#FFFFFF", "#F8F8F8", "#111111", "#E0E0E0"],
    colors: {
      primary: "#1A6BC2",
      secondary: "#EBF4FF",
      background: "#FFFFFF",
      foreground: "#111111",
      card: "#FFFFFF",
      border: "#E0E0E0",
      muted: "#707070",
      accent: "#F97316",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 12. TERRACOTA TIERRA — Earthy terracotta
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "terracota-tierra",
    name: "Terracota Tierra",
    description: "Terracota y arcilla — belleza natural, tierra y artesanal",
    style: "warm",
    preview: ["#B5451B", "#FBF3EE", "#FFFFFF", "#2A1008", "#E8B090"],
    colors: {
      primary: "#B5451B",
      secondary: "#F5D8C8",
      background: "#FBF3EE",
      foreground: "#2A1008",
      card: "#FBF3EE",
      border: "#F0D0B8",
      muted: "#8A5030",
      accent: "#F97316",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 13. LILA MODERNO — Modern lilac
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "lila-moderno",
    name: "Lila Moderno",
    description: "Lila contemporáneo — cosmética joven, fresca y trendy",
    style: "playful",
    preview: ["#9C4DCC", "#FAF5FF", "#FFFFFF", "#2A103A", "#D4B0E8"],
    colors: {
      primary: "#9C4DCC",
      secondary: "#EDD9FF",
      background: "#FAF5FF",
      foreground: "#2A103A",
      card: "#FAF5FF",
      border: "#DDB8F8",
      muted: "#7A50A0",
      accent: "#F97316",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 14. NEGRO CHIC — Black chic cosmetics (DARK)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "negro-chic",
    name: "Negro Chic",
    description: "Negro absoluto con coral vibrante — cosmética chic y poderosa",
    style: "premium",
    preview: ["#FF4040", "#0A0A0A", "#161616", "#F8F8F8", "#2A2A2A"],
    colors: {
      primary: "#FF4040",
      secondary: "#161616",
      background: "#0A0A0A",
      foreground: "#F8F8F8",
      card: "#202020",
      border: "#303030",
      muted: "#888888",
      accent: "#FF4040",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 15. CREMA VAINILLA — Vanilla cream soft
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "crema-vainilla",
    name: "Crema Vainilla",
    description: "Crema y vainilla suave — cuidado delicado, calidez y dulzura",
    style: "warm",
    preview: ["#C8892A", "#FFFBF0", "#FFFFFF", "#2A1A00", "#F0D898"],
    colors: {
      primary: "#C8892A",
      secondary: "#F5DFA0",
      background: "#FFFBF0",
      foreground: "#2A1A00",
      card: "#FFFBF0",
      border: "#F0DFB8",
      muted: "#907030",
      accent: "#F97316",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 16. TURQUESA TROPICAL — Tropical turquoise
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "turquesa-tropical",
    name: "Turquesa Tropical",
    description: "Turquesa vibrante y tropical — fresco, energético y veraniego",
    style: "tropical",
    preview: ["#00968A", "#F0FFFE", "#FFFFFF", "#003330", "#80D8D4"],
    colors: {
      primary: "#00968A",
      secondary: "#B2EFE8",
      background: "#F0FFFE",
      foreground: "#003330",
      card: "#F0FFFE",
      border: "#80D8D4",
      muted: "#2A7068",
      accent: "#F97316",
      onPrimary: "#FFFFFF",
    },
  },
];
