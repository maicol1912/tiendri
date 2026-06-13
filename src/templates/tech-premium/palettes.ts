// Tech Premium — Color Palettes
// 16 pre-built palettes designed by Valentina (UI/UX).
// Palette #1 (obsidian) matches the existing defaults in config.ts exactly.

import type { ColorPalette } from "@/types/templates/config-schema";

export const techPremiumPalettes: ColorPalette[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. OBSIDIAN — The original tech-premium default
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "obsidian",
    name: "Obsidiana",
    description: "Negro sobre blanco — minimalismo tech con maximo contraste",
    style: "minimal",
    preview: ["#000000", "#FAFAFA", "#211C24", "#F6F6F6", "#909090"],
    colors: {
      primary: "#000000",
      secondary: "#211C24",
      background: "#FAFAFA",
      foreground: "#000000",
      card: "#F6F6F6",
      border: "#B5B5B5",
      muted: "#787878",
      accent: "#FFB547",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. MIDNIGHT LUXURY — Dark premium with gold accents
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "midnight-luxury",
    name: "Lujo Nocturno",
    description: "Elegancia oscura con acentos dorados — para marcas premium",
    style: "premium",
    preview: ["#0D1117", "#C9A84C", "#161B22", "#E6EDF3", "#1C2128"],
    colors: {
      primary: "#C9A84C",
      secondary: "#1C2128",
      background: "#0D1117",
      foreground: "#E6EDF3",
      card: "#161B22",
      border: "#30363D",
      muted: "#7D8590",
      accent: "#E3B341",
      onPrimary: "#0D1117",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. ARCTIC STEEL — Cool corporate blues and grays
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "arctic-steel",
    name: "Acero Artico",
    description: "Azules corporativos con grises frios — profesional y confiable",
    style: "corporate",
    preview: ["#1B2A4A", "#2B5EA7", "#F4F7FB", "#E8EEF4", "#4A6B8A"],
    colors: {
      primary: "#1B2A4A",
      secondary: "#2B5EA7",
      background: "#F4F7FB",
      foreground: "#1B2A4A",
      card: "#EDF1F7",
      border: "#B8C7D9",
      muted: "#6B839E",
      accent: "#F5A623",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. NEON CIRCUIT — Cyberpunk dark with electric accents
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "neon-circuit",
    name: "Circuito Neon",
    description: "Fondo oscuro con acentos electricos — para tiendas gaming y tech",
    style: "cyberpunk",
    preview: ["#0A0A0F", "#00E5FF", "#FF2D78", "#14141F", "#E0E0E8"],
    colors: {
      primary: "#00E5FF",
      secondary: "#FF2D78",
      background: "#0A0A0F",
      foreground: "#E0E0E8",
      card: "#14141F",
      border: "#2A2A3C",
      muted: "#6B6B82",
      accent: "#FFD700",
      onPrimary: "#0A0A0F",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. TERRACOTTA WARM — Warm neutrals with earthy accents
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "terracotta-warm",
    name: "Terracota Calida",
    description: "Tonos tierra con acentos arcilla — acogedor y artesanal",
    style: "warm",
    preview: ["#C06A3A", "#3D2C1E", "#FBF6F0", "#F2E8DB", "#6B5243"],
    colors: {
      primary: "#3D2C1E",
      secondary: "#C06A3A",
      background: "#FBF6F0",
      foreground: "#3D2C1E",
      card: "#F5EDE3",
      border: "#D4C4B0",
      muted: "#8A7560",
      accent: "#E8A838",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 6. BRUTALIST RAW — High-contrast, raw, unapologetic
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "brutalist-raw",
    name: "Brutalismo Crudo",
    description: "Alto contraste y tipografia imponente — diseno sin adornos",
    style: "brutalist",
    preview: ["#1A1A1A", "#D72631", "#F0F0E8", "#E8E8DF", "#FFFFFF"],
    colors: {
      primary: "#1A1A1A",
      secondary: "#D72631",
      background: "#F0F0E8",
      foreground: "#1A1A1A",
      card: "#E8E8DF",
      border: "#1A1A1A",
      muted: "#737368",
      accent: "#D72631",
      onPrimary: "#F0F0E8",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 7. SAGE GARDEN — Nature-inspired organic tones
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "sage-garden",
    name: "Jardin de Salvia",
    description: "Verdes organicos con tierras neutras — natural y sereno",
    style: "nature",
    preview: ["#2D3A2D", "#5C7C5C", "#F7F5F0", "#E8E5DC", "#8FA88F"],
    colors: {
      primary: "#2D3A2D",
      secondary: "#5C7C5C",
      background: "#F7F5F0",
      foreground: "#2D3A2D",
      card: "#F0EDE5",
      border: "#C4BFB0",
      muted: "#7A7568",
      accent: "#D4A72C",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 8. CANDY POP — Playful pastels with bright pops
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "candy-pop",
    name: "Dulce Pop",
    description: "Pasteles vibrantes con acentos fuertes — divertido y juvenil",
    style: "playful",
    preview: ["#E84393", "#2E1A3E", "#FFF5F8", "#F0E6F6", "#6C5CE7"],
    colors: {
      primary: "#2E1A3E",
      secondary: "#E84393",
      background: "#FFF5F8",
      foreground: "#2E1A3E",
      card: "#FFF0F4",
      border: "#E8C8D8",
      muted: "#8A6880",
      accent: "#FDCB6E",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 9. OCEAN DEPTHS — Tropical teals with coral and sand
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "ocean-depths",
    name: "Profundidad Oceanica",
    description: "Teals profundos con coral vibrante — fresco y tropical",
    style: "tropical",
    preview: ["#0C3547", "#0A7A6F", "#C03838", "#F5F9F8", "#E0F0ED"],
    colors: {
      primary: "#0C3547",
      secondary: "#0E8C7F",
      background: "#F5F9F8",
      foreground: "#0C3547",
      card: "#ECF4F2",
      border: "#B0D0CA",
      muted: "#5A847A",
      accent: "#FFB347",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 10. SUNSET BLOOM — Warm gradient-ready oranges, pinks, purples
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "sunset-bloom",
    name: "Flor del Atardecer",
    description: "Naranjas calidos y rosas suaves — energetico y memorable",
    style: "vibrant",
    preview: ["#C04420", "#3A1C3A", "#FFF8F5", "#FF8C69", "#D4608A"],
    colors: {
      primary: "#3A1C3A",
      secondary: "#C04420",
      background: "#FFF8F5",
      foreground: "#3A1C3A",
      card: "#FFF0EA",
      border: "#E8C8BA",
      muted: "#956A58",
      accent: "#FFB347",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 11. SLATE MONO — Monochrome single-hue sophistication
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "slate-mono",
    name: "Pizarra Monocromatica",
    description: "Un solo tono en multiples intensidades — sofisticado y atemporal",
    style: "monochrome",
    preview: ["#2B2B2B", "#5A5A5A", "#F5F4F2", "#E8E7E4", "#8A8A87"],
    colors: {
      primary: "#2B2B2B",
      secondary: "#5A5A5A",
      background: "#F5F4F2",
      foreground: "#2B2B2B",
      card: "#EDECE9",
      border: "#C5C4C0",
      muted: "#787875",
      accent: "#D4A72C",
      onPrimary: "#F5F4F2",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 12. ELECTRIC INDIGO — Awwwards-style creative vibrancy
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "electric-indigo",
    name: "Indigo Electrico",
    description: "Violetas intensos con acentos inesperados — audaz y creativo",
    style: "awwwards",
    preview: ["#5B3AE8", "#1A0A3E", "#F7F5FF", "#00D68F", "#EDE8FF"],
    colors: {
      primary: "#1A0A3E",
      secondary: "#5B3AE8",
      background: "#F7F5FF",
      foreground: "#1A0A3E",
      card: "#EFEBFF",
      border: "#C8BCEE",
      muted: "#8878B0",
      accent: "#FFB547",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 13. PINE FOREST — Deep dark green premium
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "pine-forest",
    name: "Bosque de Pinos",
    description: "Verdes profundos con dorado terroso — premium y organico",
    style: "premium",
    preview: ["#0F1E14", "#1C3D28", "#D4C8A0", "#162A1C", "#A0B8A5"],
    colors: {
      primary: "#D4C8A0",
      secondary: "#1C3D28",
      background: "#0F1E14",
      foreground: "#D8D0B8",
      card: "#162A1C",
      border: "#2A4A35",
      muted: "#6A8A72",
      accent: "#E8C040",
      onPrimary: "#0F1E14",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 14. ROSE QUARTZ — Warm minimal with dusty rose accent
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "rose-quartz",
    name: "Cuarzo Rosa",
    description: "Rosas empolvados con blancos calidos — elegante y femenino",
    style: "minimal",
    preview: ["#B5616A", "#3A2832", "#FDF9F8", "#F5E8E6", "#E8C8C8"],
    colors: {
      primary: "#3A2832",
      secondary: "#B5616A",
      background: "#FDF9F8",
      foreground: "#3A2832",
      card: "#F8F0EE",
      border: "#E0C8C4",
      muted: "#8A7070",
      accent: "#E8A838",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 15. CHARCOAL EMBER — Dark with warm red-orange embers
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "charcoal-ember",
    name: "Carbon y Brasa",
    description: "Oscuridad calida con acentos de fuego — intenso y magnetico",
    style: "premium",
    preview: ["#1C1C1E", "#FF5733", "#2A2A2E", "#E8E4E0", "#3A3A3F"],
    colors: {
      primary: "#FF5733",
      secondary: "#2A2A2E",
      background: "#1C1C1E",
      foreground: "#E8E4E0",
      card: "#2A2A2E",
      border: "#404045",
      muted: "#8A8890",
      accent: "#FFB547",
      onPrimary: "#0E0E0F",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 16. IVORY STUDIO — Ultra-clean, airy, editorial white
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "ivory-studio",
    name: "Estudio Marfil",
    description: "Blancos puros con un solo acento — editorial y aireado",
    style: "minimal",
    preview: ["#1A1A1A", "#2C5F2D", "#FFFDF9", "#F5F3EF", "#D0CEC8"],
    colors: {
      primary: "#1A1A1A",
      secondary: "#2C5F2D",
      background: "#FFFDF9",
      foreground: "#1A1A1A",
      card: "#F8F6F2",
      border: "#D8D6D0",
      muted: "#858580",
      accent: "#D4A72C",
      onPrimary: "#FFFDF9",
    },
  },
];
