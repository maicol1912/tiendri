// Furniture Dark Template — Color Palettes
// 16 palettes covering furniture/interior design aesthetics.
// Palette #1 (carbon-elegante) matches config.ts defaults EXACTLY.

import type { ColorPalette } from "@/types/templates/config-schema";

export const furnitureDarkPalettes: ColorPalette[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. CARBON ELEGANTE — Original furniture-dark default (DARK)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "carbon-elegante",
    name: "Carbón Elegante",
    description: "Negro profundo con acento amarillo verdoso — el original oscuro y sofisticado",
    style: "premium",
    preview: ["#EFF422", "#181818", "#F5F5F4", "#4D4D4D", "#B0BA38"],
    colors: {
      primary: "#EFF422",
      secondary: "#4D4D4D",
      background: "#181818",
      foreground: "#FFFFFF",
      card: "#F5F5F4",
      border: "#333333",
      muted: "#A0A0A0",
      accent: "#EFF422",
      onPrimary: "#181818",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. ROBLE NATURAL — Warm oak/wood tones on dark background (DARK)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "roble-natural",
    name: "Roble Natural",
    description: "Tonos de roble cálido sobre fondo oscuro — artesanía en madera premium",
    style: "warm",
    preview: ["#C8922A", "#1C1510", "#F0E4C8", "#3A2C1C", "#8B5E1A"],
    colors: {
      primary: "#C8922A",
      secondary: "#3A2C1C",
      background: "#1C1510",
      foreground: "#F0E4C8",
      card: "#F0E4C8",
      border: "#2E2218",
      muted: "#9A7A50",
      accent: "#C8922A",
      onPrimary: "#161008",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. MARMOL BLANCO — Light marble/white elegant (LIGHT)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "marmol-blanco",
    name: "Mármol Blanco",
    description: "Blanco mármol con detalles grafito — elegancia de showroom de lujo",
    style: "minimal",
    preview: ["#2C2C2C", "#FAFAFA", "#FFFFFF", "#E8E4E0", "#8A8A8A"],
    colors: {
      primary: "#2C2C2C",
      secondary: "#6A6A6A",
      background: "#FAFAFA",
      foreground: "#1A1A1A",
      card: "#FFFFFF",
      border: "#E0DCD8",
      muted: "#7A7A7A",
      accent: "#C8A050",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. OLIVA NORDICO — Olive/sage nordic on dark (DARK)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "oliva-nordico",
    name: "Oliva Nórdico",
    description: "Oliva y salvia sobre oscuro — naturaleza nórdica sofisticada",
    style: "nature",
    preview: ["#A0B862", "#161A10", "#ECF0DC", "#2A3020", "#5A6A3A"],
    colors: {
      primary: "#A0B862",
      secondary: "#2A3020",
      background: "#161A10",
      foreground: "#ECF0DC",
      card: "#ECF0DC",
      border: "#222A18",
      muted: "#7A8C5A",
      accent: "#A0B862",
      onPrimary: "#10140C",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. TERRACOTA RUSTICO — Earthy terracotta/clay warm (LIGHT)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "terracota-rustico",
    name: "Terracota Rústico",
    description: "Terracota y arcilla sobre crema cálida — encanto mediterráneo rústico",
    style: "warm",
    preview: ["#C05A2A", "#FAF0E8", "#FFFFFF", "#F0D8C8", "#8B3A14"],
    colors: {
      primary: "#C05A2A",
      secondary: "#8B3A14",
      background: "#FAF0E8",
      foreground: "#2C1408",
      card: "#FFFFFF",
      border: "#E8D0BC",
      muted: "#9A6A50",
      accent: "#E08020",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 6. AZUL MARINO CLASICO — Navy classic furniture (LIGHT)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "azul-marino-clasico",
    name: "Azul Marino Clásico",
    description: "Azul marino profundo con oro — elegancia clásica de salón inglés",
    style: "corporate",
    preview: ["#1A3A6E", "#F5F7FA", "#FFFFFF", "#C8A840", "#E8EDF5"],
    colors: {
      primary: "#1A3A6E",
      secondary: "#4A6A9E",
      background: "#F5F7FA",
      foreground: "#0A1C3A",
      card: "#FFFFFF",
      border: "#D0D8E8",
      muted: "#6A7A9A",
      accent: "#C8A840",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 7. CREMA PARISINO — Cream/beige Parisian elegance (LIGHT)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "crema-parisino",
    name: "Crema Parisino",
    description: "Crema champán con rosa polvo — elegancia parisina con carácter francés",
    style: "minimal",
    preview: ["#9A6A58", "#FAF6F0", "#FFFFFF", "#F0E4D8", "#C8A898"],
    colors: {
      primary: "#9A6A58",
      secondary: "#7A4A38",
      background: "#FAF6F0",
      foreground: "#2A1C14",
      card: "#FFFFFF",
      border: "#EAE0D4",
      muted: "#9A8070",
      accent: "#C8903A",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 8. GRAFITO INDUSTRIAL — Dark industrial gray (DARK)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "grafito-industrial",
    name: "Grafito Industrial",
    description: "Antracita puro y concreto oscuro — showroom industrial urbano sin concesiones",
    style: "corporate",
    preview: ["#E8E8E8", "#141414", "#F4F4F4", "#383838", "#888888"],
    colors: {
      primary: "#E8E8E8",
      secondary: "#383838",
      background: "#141414",
      foreground: "#F4F4F4",
      card: "#F4F4F4",
      border: "#2C2C2C",
      muted: "#888888",
      accent: "#E8E8E8",
      onPrimary: "#141414",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 9. VERDE BOSQUE — Deep forest green luxury (DARK)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "verde-bosque",
    name: "Verde Bosque",
    description: "Verdes profundos y marfil — lujo forestal aristocrático con carácter inglés",
    style: "nature",
    preview: ["#7EC86A", "#0C180E", "#E8F4E0", "#1A3020", "#3A6040"],
    colors: {
      primary: "#7EC86A",
      secondary: "#2A4A30",
      background: "#0C180E",
      foreground: "#E0F0D8",
      card: "#E8F4E0",
      border: "#162418",
      muted: "#5A8A60",
      accent: "#7EC86A",
      onPrimary: "#081208",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 10. ARENA MEDITERRANEO — Sandy Mediterranean warm (LIGHT)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "arena-mediterraneo",
    name: "Arena Mediterráneo",
    description: "Arena cálida con toques de turquesa — villa mediterránea costera",
    style: "tropical",
    preview: ["#2A8A7A", "#FAF4EC", "#FFFFFF", "#F0E0C0", "#A08840"],
    colors: {
      primary: "#2A8A7A",
      secondary: "#4A7060",
      background: "#FAF4EC",
      foreground: "#201808",
      card: "#FFFFFF",
      border: "#EAD8B8",
      muted: "#8A7058",
      accent: "#C08820",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 11. BURDEOS OPULENTO — Burgundy/wine rich (LIGHT)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "burdeos-opulento",
    name: "Burdeos Opulento",
    description: "Burdeos y champaña — piezas de comedor opulento y sala de lujo",
    style: "premium",
    preview: ["#8A1A2E", "#FAF6F8", "#FFFFFF", "#F8E8EC", "#D4A0A8"],
    colors: {
      primary: "#8A1A2E",
      secondary: "#6A0A1E",
      background: "#FAF6F8",
      foreground: "#1E0810",
      card: "#FFFFFF",
      border: "#EAD4D8",
      muted: "#9A7080",
      accent: "#C04040",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 12. GRIS ESCANDINAVO — Light Scandinavian gray minimal (LIGHT)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "gris-escandinavo",
    name: "Gris Escandinavo",
    description: "Blancos y grises nórdicos — minimalismo escandinavo limpio y funcional",
    style: "minimal",
    preview: ["#4A5A6A", "#F7F8F9", "#FFFFFF", "#E8EAF0", "#8A9AAA"],
    colors: {
      primary: "#4A5A6A",
      secondary: "#2A3A4A",
      background: "#F7F8F9",
      foreground: "#18222A",
      card: "#FFFFFF",
      border: "#DDE0E8",
      muted: "#7A8A9A",
      accent: "#C09040",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 13. NEGRO ZEN — Matte black zen/Japanese (DARK)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "negro-zen",
    name: "Negro Zen",
    description: "Negro obsidiana con toques wabi-sabi — sobriedad japonesa en muebles",
    style: "minimal",
    preview: ["#E8DCC8", "#0E0E0E", "#F0ECD8", "#2A2A28", "#6A6454"],
    colors: {
      primary: "#E8DCC8",
      secondary: "#3A3A38",
      background: "#0E0E0E",
      foreground: "#F0ECD8",
      card: "#F0ECD8",
      border: "#242420",
      muted: "#807A6A",
      accent: "#C8A840",
      onPrimary: "#0A0A0A",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 14. COBRE ART DECO — Copper/bronze art deco (LIGHT)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "cobre-art-deco",
    name: "Cobre Art Déco",
    description: "Cobre y bronce sobre marfil — glamour Art Déco de los años veinte",
    style: "premium",
    preview: ["#B8682A", "#FAF5EC", "#FFFFFF", "#F0E0C0", "#E0A850"],
    colors: {
      primary: "#B8682A",
      secondary: "#8A4818",
      background: "#FAF5EC",
      foreground: "#1C0E04",
      card: "#FFFFFF",
      border: "#EEE0C4",
      muted: "#9A7850",
      accent: "#D08820",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 15. LAVANDA SUAVE — Soft lavender, modern romantic (LIGHT)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "lavanda-suave",
    name: "Lavanda Suave",
    description: "Lavanda suave con oro rosado — diseño interior romántico contemporáneo",
    style: "playful",
    preview: ["#8A5AA0", "#FAF6FC", "#FFFFFF", "#F0E4F8", "#C89ABE"],
    colors: {
      primary: "#8A5AA0",
      secondary: "#6A3A80",
      background: "#FAF6FC",
      foreground: "#1E0A28",
      card: "#FFFFFF",
      border: "#E8D8F0",
      muted: "#907890",
      accent: "#C070A0",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 16. MOSTAZA RETRO — Mustard yellow retro (LIGHT)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "mostaza-retro",
    name: "Mostaza Retro",
    description: "Mostaza cálida y chocolate — revival del interiorismo retro de los 70",
    style: "vibrant",
    preview: ["#C8901A", "#FAF4E4", "#FFFFFF", "#F8E8B0", "#8A5A10"],
    colors: {
      primary: "#C8901A",
      secondary: "#8A5A10",
      background: "#FAF4E4",
      foreground: "#1E0E00",
      card: "#FFFFFF",
      border: "#EEE0B0",
      muted: "#9A7A40",
      accent: "#E07818",
      onPrimary: "#FFFFFF",
    },
  },
];
