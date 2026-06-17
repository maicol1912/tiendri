// Fashion Template — Color Palettes
// 16 pre-built palettes designed for fashion, apparel, and lifestyle stores.
// Palette #1 (classic-noir) matches the existing defaults in config.ts exactly.

import type { ColorPalette } from "@/types/templates/config-schema";

export const fashionPalettes: ColorPalette[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. CLASSIC NOIR — Exact match of config.ts defaults (monochromatic B&W)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "classic-noir",
    name: "Clásico Noir",
    description: "Blanco y negro — minimalismo editorial con máximo contraste",
    style: "minimal",
    preview: ["#000000", "#F5F5F0", "#D9D9D9", "#FFFFFF", "#8A8A8A"],
    colors: {
      primary: "#000000",
      secondary: "#D9D9D9",
      background: "#F5F5F0",
      foreground: "#000000",
      card: "#FFFFFF",
      border: "#D9D9D9",
      muted: "#8A8A8A",
      accent: "#000000",
      onPrimary: "#000000",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. MIDNIGHT VELVET — Dark navy with gold accents, luxury evening
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "midnight-velvet",
    name: "Terciopelo Nocturno",
    description: "Azul marino profundo con detalles dorados — lujo de noche",
    style: "premium",
    preview: ["#0C0E1A", "#C8A96E", "#141828", "#E8E0D0", "#1E2438"],
    colors: {
      primary: "#C8A96E",
      secondary: "#1E2438",
      background: "#0C0E1A",
      foreground: "#E8E0D0",
      card: "#141828",
      border: "#252D48",
      muted: "#7A8099",
      accent: "#C8A96E",
      onPrimary: "#0C0E1A",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. IVORY ROSE — Warm ivory background, dusty rose accents
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "ivory-rose",
    name: "Marfil y Rosa",
    description: "Marfil cálido con rosas empolvados — elegancia romántica",
    style: "elegant",
    preview: ["#2A1A1F", "#C07080", "#FAF7F2", "#F2E8E8", "#E8D4D4"],
    colors: {
      primary: "#2A1A1F",
      secondary: "#C07080",
      background: "#FAF7F2",
      foreground: "#2A1A1F",
      card: "#FFFCF8",
      border: "#E8D4D4",
      muted: "#9A7878",
      accent: "#C07080",
      onPrimary: "#FAF7F2",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. ARCTIC FROST — Cool grays with ice blue accents
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "arctic-frost",
    name: "Escarcha Ártica",
    description: "Grises fríos con detalles azul hielo — profesional y limpio",
    style: "corporate",
    preview: ["#1A2A3A", "#4A90B8", "#F4F7FA", "#E4EFF5", "#8AB0C8"],
    colors: {
      primary: "#1A2A3A",
      secondary: "#4A90B8",
      background: "#F4F7FA",
      foreground: "#1A2A3A",
      card: "#FFFFFF",
      border: "#C8DCE8",
      muted: "#6A8898",
      accent: "#F0A030",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. TERRACOTTA SUN — Warm cream background, terracotta primary
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "terracotta-sun",
    name: "Sol de Terracota",
    description: "Crema cálido con terracota terroso — artesanal y mediterráneo",
    style: "warm",
    preview: ["#B55A30", "#3D2820", "#FBF6EE", "#F5E8D8", "#C8906A"],
    colors: {
      primary: "#3D2820",
      secondary: "#B55A30",
      background: "#FBF6EE",
      foreground: "#3D2820",
      card: "#FFFDF8",
      border: "#E0C8B0",
      muted: "#8A6848",
      accent: "#D08020",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 6. SAGE LINEN — Linen background, sage green accents
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "sage-linen",
    name: "Lino y Salvia",
    description: "Fondo lino con verde salvia — natural, sostenible y sereno",
    style: "nature",
    preview: ["#2C3A30", "#5C8060", "#F5F2EA", "#E5EBE0", "#8CAA8C"],
    colors: {
      primary: "#2C3A30",
      secondary: "#5C8060",
      background: "#F5F2EA",
      foreground: "#2C3A30",
      card: "#FDFCF8",
      border: "#C8D4C0",
      muted: "#708070",
      accent: "#B88020",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 7. OCEAN BREEZE — Sandy background, deep teal primary
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "ocean-breeze",
    name: "Brisa Oceánica",
    description: "Arena cálida con teal profundo — fresco, tropical y relajado",
    style: "tropical",
    preview: ["#1A5068", "#0E9090", "#F8F5EE", "#E0EEF0", "#68A8B0"],
    colors: {
      primary: "#1A5068",
      secondary: "#0E9090",
      background: "#F8F5EE",
      foreground: "#1A5068",
      card: "#FFFEF9",
      border: "#C0D8DC",
      muted: "#508090",
      accent: "#E09820",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 8. BLUSH GOLD — Soft pink background, gold accents
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "blush-gold",
    name: "Rubor y Oro",
    description: "Rosa suave con detalles dorados — glamour femenino y juguetón",
    style: "playful",
    preview: ["#3A2830", "#C8922A", "#FDF4F6", "#F5E0E4", "#E8B8C0"],
    colors: {
      primary: "#3A2830",
      secondary: "#C8922A",
      background: "#FDF4F6",
      foreground: "#3A2830",
      card: "#FFFAFE",
      border: "#EDD0D8",
      muted: "#9A7080",
      accent: "#C8922A",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 9. CHARCOAL STUDIO — Dark charcoal, high contrast brutalist
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "charcoal-studio",
    name: "Estudio Carbón",
    description: "Carbón oscuro con máximo contraste — editorial audaz y brutalist",
    style: "brutalist",
    preview: ["#1A1A1A", "#E0E0E0", "#252525", "#F0F0F0", "#383838"],
    colors: {
      primary: "#E0E0E0",
      secondary: "#383838",
      background: "#1A1A1A",
      foreground: "#F0F0F0",
      card: "#252525",
      border: "#404040",
      muted: "#808080",
      accent: "#E0E0E0",
      onPrimary: "#1A1A1A",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 10. LAVENDER DREAM — Soft lavender accents, serene palette
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "lavender-dream",
    name: "Sueño Lavanda",
    description: "Lavanda suave con neutrales cálidos — sereno y sofisticado",
    style: "vibrant",
    preview: ["#3A2860", "#7A58C0", "#FAF8FF", "#EDE5FA", "#C8B8E8"],
    colors: {
      primary: "#3A2860",
      secondary: "#7A58C0",
      background: "#FAF8FF",
      foreground: "#3A2860",
      card: "#FFFEFF",
      border: "#D8C8EC",
      muted: "#8870A8",
      accent: "#9058E0",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 11. ESPRESSO CREAM — Coffee tones, cream background
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "espresso-cream",
    name: "Espresso y Crema",
    description: "Tonos café y crema — cálido, acogedor y artesanal",
    style: "warm",
    preview: ["#2C1810", "#6A3820", "#FAF6EE", "#F0E4D0", "#C8A878"],
    colors: {
      primary: "#2C1810",
      secondary: "#6A3820",
      background: "#FAF6EE",
      foreground: "#2C1810",
      card: "#FFFDF8",
      border: "#E0CCAA",
      muted: "#907860",
      accent: "#C87820",
      onPrimary: "#FAF6EE",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 12. ELECTRIC MINT — Crisp white, mint green accents (awwwards)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "electric-mint",
    name: "Menta Eléctrica",
    description: "Blanco nítido con menta vibrante — fresco, moderno y digital",
    style: "awwwards",
    preview: ["#0A2820", "#00A870", "#FFFFFF", "#E8FBF4", "#50C890"],
    colors: {
      primary: "#0A2820",
      secondary: "#00A870",
      background: "#FFFFFF",
      foreground: "#0A2820",
      card: "#F8FBF8",
      border: "#C0E8D8",
      muted: "#508870",
      accent: "#00A870",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 13. FASHION OBSIDIAN — Deep black with warm off-white, ultra editorial
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "fashion-obsidian",
    name: "Obsidiana Fashion",
    description: "Negro profundo con blanco cálido — editorial de alta costura",
    style: "premium",
    preview: ["#0A0A0A", "#F0EDE8", "#141414", "#E8E4DF", "#5A5A5A"],
    colors: {
      primary: "#0A0A0A",
      secondary: "#2A2A2A",
      background: "#F0EDE8",
      foreground: "#0A0A0A",
      card: "#FAFAF8",
      border: "#D8D4CF",
      muted: "#7A7470",
      accent: "#C8A050",
      onPrimary: "#F0EDE8",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 14. FASHION TERRACOTTA — Rich terracotta jewel tone, editorial warmth
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "fashion-terracotta",
    name: "Terracota Editorial",
    description: "Terracota joya con neutros cálidos — editorial mediterráneo de lujo",
    style: "warm",
    preview: ["#8B3A2A", "#C8624A", "#FBF5EF", "#F0D8CC", "#A86850"],
    colors: {
      primary: "#8B3A2A",
      secondary: "#C8624A",
      background: "#FBF5EF",
      foreground: "#3A1A10",
      card: "#FFFDF9",
      border: "#E8CCBC",
      muted: "#A07060",
      accent: "#C8624A",
      onPrimary: "#FBF5EF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 15. FASHION SAGE — Dusty sage with linen, sustainable chic
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "fashion-sage",
    name: "Salvia Sofisticada",
    description: "Salvia empolvado con lino — moda sostenible y sofisticada",
    style: "nature",
    preview: ["#3A4A38", "#7A9870", "#F2F0E8", "#D8E4D0", "#90A888"],
    colors: {
      primary: "#3A4A38",
      secondary: "#7A9870",
      background: "#F2F0E8",
      foreground: "#2A3828",
      card: "#FDFCF8",
      border: "#C8D8C0",
      muted: "#788870",
      accent: "#C8A040",
      onPrimary: "#F2F0E8",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 16. FASHION PEARL — Luminous pearl whites with platinum neutrals
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "fashion-pearl",
    name: "Perla Luminosa",
    description: "Blancos nacarados con platino — minimalismo de lujo atemporal",
    style: "minimal",
    preview: ["#2A2A2C", "#C8C4BC", "#FAFAFA", "#F0EEEC", "#D8D4D0"],
    colors: {
      primary: "#2A2A2C",
      secondary: "#C8C4BC",
      background: "#FAFAFA",
      foreground: "#1A1A1C",
      card: "#FFFFFF",
      border: "#E4E0DC",
      muted: "#909090",
      accent: "#B8A890",
      onPrimary: "#FAFAFA",
    },
  },
];
