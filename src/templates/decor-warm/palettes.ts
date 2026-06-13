// Decor Warm — Color Palettes
// 16 palettes for home decor stores.
// Palette #1 matches config.ts defaults exactly.

import type { ColorPalette } from "@/types/templates/config-schema";

export const decorWarmPalettes: ColorPalette[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. MELOCOTÓN CÁLIDO — The original decor-warm default (peach/warm on white)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "melocoton-calido",
    name: "Melocotón Cálido",
    description: "Melocotón suave sobre blanco — hogar acogedor y luminoso",
    style: "warm",
    preview: ["#CC7861", "#F4B5A4", "#FAF0E6", "#FFFFFF", "#363130"],
    colors: {
      primary: "#CC7861",
      secondary: "#FAF0E6",
      background: "#FFFFFF",
      foreground: "#363130",
      card: "#FFFFFF",
      border: "#F0E8E4",
      muted: "#A0A0A0",
      accent: "#CC7861",
      onPrimary: "#CC7861",
      peach: "#F4B5A4",
      darkMode: "#363130",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. SALVIA NATURAL — Sage green natural
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "salvia-natural",
    name: "Salvia Natural",
    description: "Verde salvia suave — decoración natural, plantas y bienestar en el hogar",
    style: "nature",
    preview: ["#6A8C5A", "#F3F7F0", "#E8F2E2", "#1A2A14", "#B0CCA0"],
    colors: {
      primary: "#6A8C5A",
      secondary: "#E8F2E2",
      background: "#F3F7F0",
      foreground: "#1A2A14",
      card: "#FFFFFF",
      border: "#C8E0BC",
      muted: "#5A7848",
      accent: "#6A8C5A",
      onPrimary: "#3A6028",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. TERRACOTA BOHEMIO — Bohemian terracotta
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "terracota-bohemio",
    name: "Terracota Bohemio",
    description: "Terracota y arcilla boho — calidez artesanal y decoración étnica",
    style: "warm",
    preview: ["#B8502A", "#FBF0E8", "#F5E0D0", "#2A0E00", "#E8A880"],
    colors: {
      primary: "#B8502A",
      secondary: "#F5E0D0",
      background: "#FBF0E8",
      foreground: "#2A0E00",
      card: "#FFFFFF",
      border: "#F0D0B8",
      muted: "#8A5030",
      accent: "#B8502A",
      onPrimary: "#B8502A",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. AZUL COSTERO — Coastal blue
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "azul-costero",
    name: "Azul Costero",
    description: "Azul costero y arena — hogar marino, fresco y luminoso",
    style: "tropical",
    preview: ["#2A7A9A", "#F0F8FF", "#E0F0F8", "#001828", "#90C8E0"],
    colors: {
      primary: "#2A7A9A",
      secondary: "#E0F0F8",
      background: "#F0F8FF",
      foreground: "#001828",
      card: "#FFFFFF",
      border: "#B0D8EE",
      muted: "#3A6880",
      accent: "#2A7A9A",
      onPrimary: "#2A7A9A",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. NOCHE ELEGANTE — Dark elegant home (DARK)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "noche-elegante",
    name: "Noche Elegante",
    description: "Fondo oscuro con acento dorado — hogar de lujo, nocturnidad y drama",
    style: "premium",
    preview: ["#C8A048", "#0C0A07", "#181510", "#F0ECE4", "#302A20"],
    colors: {
      primary: "#C8A048",
      secondary: "#181510",
      background: "#0C0A07",
      foreground: "#F0ECE4",
      card: "#242018",
      border: "#38322A",
      muted: "#A09888",
      accent: "#C8A048",
      onPrimary: "#1A1408",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 6. ARENA DESIERTO — Desert sand warm
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "arena-desierto",
    name: "Arena Desierto",
    description: "Arena y desierto cálido — minimalismo árido, terracota suave",
    style: "warm",
    preview: ["#C09060", "#FFFAF3", "#F8F0E0", "#1A1000", "#E0C890"],
    colors: {
      primary: "#C09060",
      secondary: "#F0E0C0",
      background: "#FFFAF3",
      foreground: "#1A1000",
      card: "#FFFFFF",
      border: "#ECD8B8",
      muted: "#8A7040",
      accent: "#C09060",
      onPrimary: "#A07020",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 7. OLIVA MEDITERRANEO — Olive Mediterranean
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "oliva-mediterraneo",
    name: "Oliva Mediterráneo",
    description: "Oliva mediterráneo — decoración europea, aceite de oliva y tradición",
    style: "nature",
    preview: ["#7A8A40", "#F5F5E8", "#EEEED8", "#181800", "#C0C880"],
    colors: {
      primary: "#7A8A40",
      secondary: "#EEEED8",
      background: "#F5F5E8",
      foreground: "#181800",
      card: "#FFFFFF",
      border: "#D8D8A8",
      muted: "#5A6030",
      accent: "#7A8A40",
      onPrimary: "#485018",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 8. ROSA EMPOLVADO — Dusty rose
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "rosa-empolvado",
    name: "Rosa Empolvado",
    description: "Rosa empolvado sobre blanco — hogar romántico, femenino y delicado",
    style: "playful",
    preview: ["#C07888", "#FFF5F7", "#FAE8EC", "#280810", "#E8B8C8"],
    colors: {
      primary: "#C07888",
      secondary: "#F0D0DC",
      background: "#FFF5F7",
      foreground: "#280810",
      card: "#FFFFFF",
      border: "#F0CCDC",
      muted: "#9A5868",
      accent: "#C07888",
      onPrimary: "#A05060",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 9. CARBON INDUSTRIAL — Industrial dark (DARK)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "carbon-industrial",
    name: "Carbón Industrial",
    description: "Carbón oscuro con acento naranja — decoración industrial, loft y moderno",
    style: "brutalist",
    preview: ["#E87030", "#0E0E0E", "#181818", "#F0F0F0", "#2A2A2A"],
    colors: {
      primary: "#E87030",
      secondary: "#181818",
      background: "#0E0E0E",
      foreground: "#F0F0F0",
      card: "#242424",
      border: "#383838",
      muted: "#9A9A9A",
      accent: "#E87030",
      onPrimary: "#0E0E0E",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 10. CREMA ESCANDINAVO — Scandinavian cream
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "crema-escandinavo",
    name: "Crema Escandinavo",
    description: "Crema y blanco nórdico — minimalismo escandinavo, hygge y funcional",
    style: "minimal",
    preview: ["#4A4A5A", "#FAFAFA", "#F0F0F0", "#111118", "#D8D8E0"],
    colors: {
      primary: "#4A4A5A",
      secondary: "#E8E8F0",
      background: "#FAFAFA",
      foreground: "#111118",
      card: "#FFFFFF",
      border: "#E0E0E8",
      muted: "#6A6A7A",
      accent: "#4A4A5A",
      onPrimary: "#2A2A3A",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 11. VERDE SELVA — Jungle green tropical
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "verde-selva",
    name: "Verde Selva",
    description: "Verde selva tropical — plantas, naturaleza exuberante y hogar vivo",
    style: "nature",
    preview: ["#286A38", "#F2FAF4", "#E0F2E4", "#0A1E10", "#90CCA0"],
    colors: {
      primary: "#286A38",
      secondary: "#E0F2E4",
      background: "#F2FAF4",
      foreground: "#0A1E10",
      card: "#FFFFFF",
      border: "#A8D8B8",
      muted: "#2A6040",
      accent: "#286A38",
      onPrimary: "#155028",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 12. MOSTAZA VINTAGE — Vintage mustard
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "mostaza-vintage",
    name: "Mostaza Vintage",
    description: "Mostaza vintage y retro — decoración años 70, bohemio y nostálgico",
    style: "warm",
    preview: ["#C8A020", "#FFFBF0", "#F8F0D0", "#1A1200", "#E8D090"],
    colors: {
      primary: "#C8A020",
      secondary: "#F0E0A0",
      background: "#FFFBF0",
      foreground: "#1A1200",
      card: "#FFFFFF",
      border: "#ECD8A0",
      muted: "#8A7020",
      accent: "#C8A020",
      onPrimary: "#7A5800",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 13. GRIS CEMENTO — Cement gray modern
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "gris-cemento",
    name: "Gris Cemento",
    description: "Gris cemento moderno — arquitectura, concreto y diseño contemporáneo",
    style: "corporate",
    preview: ["#5A6A78", "#F5F5F8", "#EBEBEE", "#0A0E12", "#C0C8D0"],
    colors: {
      primary: "#5A6A78",
      secondary: "#D0D8E0",
      background: "#F5F5F8",
      foreground: "#0A0E12",
      card: "#FFFFFF",
      border: "#D0D8E0",
      muted: "#5A6878",
      accent: "#5A6A78",
      onPrimary: "#2A3A48",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 14. BURDEOS OTONO — Autumn burgundy
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "burdeos-otono",
    name: "Burdeos Otoño",
    description: "Burdeos otoñal — hogar cálido, vino tinto y decoración de temporada",
    style: "warm",
    preview: ["#8B2830", "#FFF5F5", "#F8E8E8", "#1A0008", "#D09898"],
    colors: {
      primary: "#8B2830",
      secondary: "#F0D0D0",
      background: "#FFF5F5",
      foreground: "#1A0008",
      card: "#FFFFFF",
      border: "#EEDCDC",
      muted: "#8A5050",
      accent: "#8B2830",
      onPrimary: "#6A1820",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 15. AZUL MARINO CLASICO — Classic navy
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "azul-marino-clasico",
    name: "Azul Marino Clásico",
    description: "Navy atemporal sobre blanco — hogar clásico, náutico y refinado",
    style: "corporate",
    preview: ["#1A3A5C", "#F5F8FF", "#E8EFF8", "#060E18", "#90A8C8"],
    colors: {
      primary: "#1A3A5C",
      secondary: "#D0DCF0",
      background: "#F5F8FF",
      foreground: "#060E18",
      card: "#FFFFFF",
      border: "#C0D0E8",
      muted: "#4A6080",
      accent: "#1A3A5C",
      onPrimary: "#1A3A5C",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 16. BLANCO JAPONES — Japanese white zen
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "blanco-japones",
    name: "Blanco Japonés",
    description: "Blanco zen japonés — wabi-sabi, vacío y serenidad en el hogar",
    style: "minimal",
    preview: ["#3A3A3A", "#FFFFFF", "#F8F7F5", "#0A0A0A", "#D8D4D0"],
    colors: {
      primary: "#3A3A3A",
      secondary: "#E8E4E0",
      background: "#FFFFFF",
      foreground: "#0A0A0A",
      card: "#FFFFFF",
      border: "#E0DDD8",
      muted: "#787878",
      accent: "#3A3A3A",
      onPrimary: "#2A2A2A",
    },
  },
];
