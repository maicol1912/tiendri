export const ACCENT_COLORS = [
  { id: "rojo",     hex: "#EF4444", label: "Rojo" },
  { id: "naranja",  hex: "#F97316", label: "Naranja" },
  { id: "amarillo", hex: "#EAB308", label: "Amarillo" },
  { id: "verde",    hex: "#22C55E", label: "Verde" },
  { id: "turquesa", hex: "#14B8A6", label: "Turquesa" },
  { id: "azul",     hex: "#3B82F6", label: "Azul" },
  { id: "violeta",  hex: "#8B5CF6", label: "Violeta" },
  { id: "rosa",     hex: "#EC4899", label: "Rosa" },
  { id: "negro",    hex: "#171717", label: "Negro" },
  { id: "gris",     hex: "#6B7280", label: "Gris" },
  { id: "blanco",   hex: "#FFFFFF", label: "Blanco" },
  { id: "cafe",     hex: "#92400E", label: "Café" },
] as const;

export const ACCENT_HEX: Record<string, string> = Object.fromEntries(
  ACCENT_COLORS.map(({ id, hex }) => [id, hex])
);
