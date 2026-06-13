// Furniture Light — Color Palettes
// 16 palettes themed around furniture, interiors, and Scandinavian design.
// Palette #1 (kasa-original) matches config.ts defaults exactly.

import type { ColorPalette } from "@/types/templates/config-schema";

export const furnitureLightPalettes: ColorPalette[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. KASA ORIGINAL — The original furniture-light default (white + orange + navy)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "kasa-original",
    name: "KASA Original",
    description: "Blanco limpio con naranja cálido y navy profundo — el clásico escandinavo",
    style: "minimal",
    preview: ["#F5841F", "#1B2838", "#FFFFFF", "#F5F7FA", "#26A69A"],
    colors: {
      primary: "#F5841F",
      secondary: "#1B2838",
      background: "#FFFFFF",
      foreground: "#1B2838",
      card: "#F5F7FA",
      border: "#E5E8EB",
      muted: "#666666",
      accent: "#F5841F",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. ROBLE NÓRDICO — Warm oak tones, natural wood aesthetic
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "roble-nordico",
    name: "Roble Nórdico",
    description: "Tonos cálidos de madera de roble — calidez escandinava auténtica",
    style: "warm",
    preview: ["#C27D3E", "#3D2B1F", "#FDF8F3", "#F7EDE2", "#8B6914"],
    colors: {
      primary: "#C27D3E",
      secondary: "#3D2B1F",
      background: "#FDF8F3",
      foreground: "#3D2B1F",
      card: "#F7EDE2",
      border: "#E8D5C0",
      muted: "#7A5C3E",
      accent: "#C27D3E",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. BOSQUE SAGE — Serene sage green, nature-inspired minimalism
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "bosque-sage",
    name: "Bosque Sage",
    description: "Verde sage sereno y blanco natural — diseño orgánico y tranquilo",
    style: "nature",
    preview: ["#6B8F71", "#2D4A30", "#F7FAF7", "#EAF0EB", "#A8C5AB"],
    colors: {
      primary: "#6B8F71",
      secondary: "#2D4A30",
      background: "#F7FAF7",
      foreground: "#2D4A30",
      card: "#EAF0EB",
      border: "#C8DACC",
      muted: "#5A7A5E",
      accent: "#6B8F71",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. ARENA CÁLIDA — Sandy beige, warm interior design palette
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "arena-calida",
    name: "Arena Cálida",
    description: "Beige arena y tierra — interiores acogedores y cálidos",
    style: "warm",
    preview: ["#D4956A", "#4A3428", "#FBF7F2", "#F2EAE0", "#B07040"],
    colors: {
      primary: "#D4956A",
      secondary: "#4A3428",
      background: "#FBF7F2",
      foreground: "#4A3428",
      card: "#F2EAE0",
      border: "#E4D4C4",
      muted: "#806050",
      accent: "#D4956A",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. ÍNDIGO MODERNO — Bold indigo + light background, contemporary
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "indigo-moderno",
    name: "Índigo Moderno",
    description: "Índigo audaz sobre blanco — contemporáneo y sofisticado",
    style: "corporate",
    preview: ["#4361EE", "#1A237E", "#F8F9FF", "#EEF0FA", "#7B8CDE"],
    colors: {
      primary: "#4361EE",
      secondary: "#1A237E",
      background: "#F8F9FF",
      foreground: "#1A237E",
      card: "#EEF0FA",
      border: "#D0D6F4",
      muted: "#5A6494",
      accent: "#4361EE",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 6. CORAL LIVING — Warm coral + cream, vibrant yet comfortable
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "coral-living",
    name: "Coral Living",
    description: "Coral vibrante sobre crema — vitalidad y calidez del hogar",
    style: "vibrant",
    preview: ["#E85D4A", "#3D1E19", "#FFFAF9", "#FFF0EE", "#F4A69A"],
    colors: {
      primary: "#E85D4A",
      secondary: "#3D1E19",
      background: "#FFFAF9",
      foreground: "#3D1E19",
      card: "#FFF0EE",
      border: "#F5D4D0",
      muted: "#8A4A44",
      accent: "#E85D4A",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 7. MÁRMOL BLANCO — White marble + gold accents, luxury minimal
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "marmol-blanco",
    name: "Mármol Blanco",
    description: "Blanco mármol con acentos dorados — lujo minimalista premium",
    style: "premium",
    preview: ["#C9A84C", "#2A2216", "#FEFCF8", "#F5F0E8", "#D4B870"],
    colors: {
      primary: "#C9A84C",
      secondary: "#2A2216",
      background: "#FEFCF8",
      foreground: "#2A2216",
      card: "#F5F0E8",
      border: "#E8DEC8",
      muted: "#6A5840",
      accent: "#C9A84C",
      onPrimary: "#2A2216",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 8. NOCHE PROFUNDA — Dark premium with orange accents (DARK palette)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "noche-profunda",
    name: "Noche Profunda",
    description: "Azul navy oscuro con naranja cálido — lujo nocturno premium",
    style: "premium",
    preview: ["#F5841F", "#0D1117", "#161B22", "#E6EDF3", "#1C2128"],
    colors: {
      primary: "#F5841F",
      secondary: "#1C2128",
      background: "#0D1117",
      foreground: "#E6EDF3",
      card: "#161B22",
      border: "#30363D",
      muted: "#7D8590",
      accent: "#F5841F",
      onPrimary: "#0D1117",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 9. LAVANDA HOGAR — Soft lavender, calm and elegant
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "lavanda-hogar",
    name: "Lavanda Hogar",
    description: "Lavanda suave y crema — calma y elegancia para el hogar",
    style: "minimal",
    preview: ["#8B5CF6", "#3D1A78", "#FAF8FF", "#F0EEFF", "#A78BFA"],
    colors: {
      primary: "#8B5CF6",
      secondary: "#3D1A78",
      background: "#FAF8FF",
      foreground: "#3D1A78",
      card: "#F0EEFF",
      border: "#DDD6FE",
      muted: "#6D5A9A",
      accent: "#8B5CF6",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 10. CARBÓN OSCURO — Charcoal dark + light gold, industrial minimal (DARK)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "carbon-oscuro",
    name: "Carbón Oscuro",
    description: "Carbón elegante con acentos dorados suaves — industrial de lujo",
    style: "premium",
    preview: ["#D4A847", "#1A1A1A", "#242424", "#E8E0D0", "#2A2A2A"],
    colors: {
      primary: "#D4A847",
      secondary: "#2A2A2A",
      background: "#1A1A1A",
      foreground: "#E8E0D0",
      card: "#242424",
      border: "#383838",
      muted: "#9A9080",
      accent: "#D4A847",
      onPrimary: "#1A1A1A",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 11. TERRACOTA HOGAR — Terracotta + natural linen, Bohemian comfort
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "terracota-hogar",
    name: "Terracota Hogar",
    description: "Terracota mediterránea sobre lino natural — bohemio y acogedor",
    style: "warm",
    preview: ["#C4603C", "#4A2818", "#FBF5EE", "#F3E8DC", "#E8A080"],
    colors: {
      primary: "#C4603C",
      secondary: "#4A2818",
      background: "#FBF5EE",
      foreground: "#4A2818",
      card: "#F3E8DC",
      border: "#E4CEC0",
      muted: "#7A4C3A",
      accent: "#C4603C",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 12. PIZARRA MODERNA — Slate gray monochrome, professional modern
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "pizarra-moderna",
    name: "Pizarra Moderna",
    description: "Pizarra gris elegante — moderno profesional sin distracciones",
    style: "minimal",
    preview: ["#475569", "#1E293B", "#F8FAFC", "#F1F5F9", "#64748B"],
    colors: {
      primary: "#475569",
      secondary: "#1E293B",
      background: "#F8FAFC",
      foreground: "#1E293B",
      card: "#F1F5F9",
      border: "#CBD5E1",
      muted: "#64748B",
      accent: "#475569",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 13. TEAL FRESH — Fresh teal + white, contemporary Scandinavian
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "teal-fresco",
    name: "Teal Fresco",
    description: "Teal fresco y blanco puro — contemporáneo y refrescante",
    style: "minimal",
    preview: ["#0D9488", "#1A3A38", "#F0FAFA", "#E0F5F4", "#14B8A6"],
    colors: {
      primary: "#0D9488",
      secondary: "#1A3A38",
      background: "#F0FAFA",
      foreground: "#1A3A38",
      card: "#E0F5F4",
      border: "#B0E0DC",
      muted: "#3A7874",
      accent: "#0D9488",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 14. PINO NÓRDICO — Deep forest pine + cream, rustic Scandinavian (DARK)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "pino-nordico",
    name: "Pino Nórdico",
    description: "Pino oscuro del bosque nórdico — rústico elegante y natural",
    style: "nature",
    preview: ["#7CB87C", "#1A2E1A", "#202C20", "#D4E8D4", "#2C3C2C"],
    colors: {
      primary: "#7CB87C",
      secondary: "#2C3C2C",
      background: "#1A2E1A",
      foreground: "#D4E8D4",
      card: "#202C20",
      border: "#304430",
      muted: "#6A8A6A",
      accent: "#7CB87C",
      onPrimary: "#1A2E1A",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 15. DURAZNO PASTEL — Peach pastel + ivory, playful feminine
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "durazno-pastel",
    name: "Durazno Pastel",
    description: "Durazno pastel y marfil — juguetón, dulce y acogedor",
    style: "playful",
    preview: ["#F4926A", "#5A2818", "#FFF8F4", "#FFE8DC", "#FFB090"],
    colors: {
      primary: "#F4926A",
      secondary: "#5A2818",
      background: "#FFF8F4",
      foreground: "#5A2818",
      card: "#FFE8DC",
      border: "#FFD0C0",
      muted: "#9A5440",
      accent: "#F4926A",
      onPrimary: "#FFFFFF",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 16. MODERNO GRIS — Cool gray + bright orange pop, brutalist modern
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "moderno-gris",
    name: "Moderno Gris",
    description: "Gris neutro frío con pop de naranja — brutalismo moderno y directo",
    style: "brutalist",
    preview: ["#FF6B00", "#1C1C1C", "#F4F4F4", "#EBEBEB", "#FF9940"],
    colors: {
      primary: "#FF6B00",
      secondary: "#1C1C1C",
      background: "#F4F4F4",
      foreground: "#1C1C1C",
      card: "#EBEBEB",
      border: "#D0D0D0",
      muted: "#5A5A5A",
      accent: "#FF6B00",
      onPrimary: "#FFFFFF",
    },
  },
];
