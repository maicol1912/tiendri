export interface CustomizerPalette {
  id: string;
  name: string;
  description: string;
  style: string;
  preview: string[];
  colors: Record<string, string>;
}

export const STYLE_LABELS: Record<string, string> = {
  minimal: "Minimal",
  premium: "Premium",
  corporate: "Corporativo",
  cyberpunk: "Cyberpunk",
  warm: "Cálido",
  brutalist: "Brutalista",
  nature: "Natural",
  playful: "Juvenil",
  tropical: "Tropical",
  vibrant: "Vibrante",
  monochrome: "Monocromo",
  awwwards: "Creativo",
};

export interface CustomizerColorField {
  key: string;
  label: string;
}

export interface CustomizerSectionLabel {
  id: string;
  label: string;
}

export interface CustomizerGridField {
  key: string;
  mobileLabel: string;
  desktopLabel: string;
}

export interface CustomizerLayoutOption {
  key: string;
  label: string;
  options: { value: string; label: string }[];
}

export interface MutableColors {
  [key: string]: string;
}

export interface MutableRadius {
  card: string;
  category: string;
  button: string;
  [key: string]: string;
}

export interface MutableGridEntry {
  mobile: number;
  desktop: number;
}

export interface MutableGrid {
  products: MutableGridEntry;
  categories: MutableGridEntry;
  listing: MutableGridEntry;
  search: MutableGridEntry;
  [key: string]: MutableGridEntry;
}

export interface MutableLayout {
  cardImageRatio: string;
  gridDensity: string;
  spacingDensity: string;
  borderRadiusScale: string;
  dividerStyle: string;
  imageFit: string;
  imageBorderRadius: string;
  cardBorderTreatment: string;
  cardPadding: string;
  [key: string]: string;
}

export interface MutableTypography {
  headingWeight: number;
  headingScale: string;
  headingTransform: string;
  bodyFontSize: string;
  headingSpacing: string;
  bodyFontWeight: number;
  fontSizeContrast: string;
}

export interface MutableColor {
  colorStrategy: string;
  backgroundTreatment: string;
  cardBackground: string;
  imageOverlayHover: string;
  accentDistribution: string;
}

export interface MutableStructural {
  cardContentLayout: string;
  heroVariant: string;
  categoryNavStyle: string;
  addToCartStyle: string;
}

export interface MutableSectionEntry {
  id: string;
  visible: boolean;
}

export interface MutableConfig {
  colors: MutableColors;
  radius: MutableRadius;
  grid: MutableGrid;
  layout: MutableLayout;
  sections: MutableSectionEntry[];
  theme?: {
    typography?: MutableTypography;
    color?: MutableColor;
  };
  structural?: MutableStructural;
  layoutDensity?: string;
  gridColumnsMobile?: number;
  gridColumnsDesktop?: number;
  containerMaxWidth?: string;
  fontPair?: string;
}

export type PanelSection =
  | "tipografia"
  | "colores"
  | "formas"
  | "estructura"
  | "cards-paginas"
  | "sections";

export const PANEL_SECTIONS: { id: PanelSection; label: string; description: string }[] = [
  { id: "tipografia", label: "Aa Tipografía", description: "Ajustá el estilo de los textos y títulos" },
  { id: "colores", label: "🎨 Colores", description: "Paleta, estrategia de color y fondo" },
  { id: "formas", label: "📐 Formas y bordes", description: "Radio de bordes, estilo de tarjetas y badges" },
  { id: "estructura", label: "▦ Grid y estructura", description: "Columnas, espaciado y proporciones" },
  { id: "cards-paginas", label: "🃏 Cards y páginas", description: "Diseño de contenido, héroe y botones" },
  { id: "sections", label: "📋 Secciones", description: "Arrastrá para reordenar, desmarcá para ocultar" },
];

export interface CustomizerFontPair {
  /** Must match a key in shared/fonts.ts `fontPairs` record */
  key: string;
  label: string;
  /** Display name for the heading font */
  heading: string;
  /** Display name for the body font */
  body: string;
  preview?: string;
}

export interface ThemeCustomizerProps {
  config: MutableConfig;
  onConfigChange: (config: MutableConfig) => void;
  onClose?: () => void;
  onReset?: () => void;
  templateLabel?: string;
  colorFields: CustomizerColorField[];
  gridFields: CustomizerGridField[];
  layoutOptions: CustomizerLayoutOption[];
  sectionLabels: CustomizerSectionLabel[];
  palettes?: CustomizerPalette[];
  /** Template-specific font pair subset. Keys must match shared/fonts.ts. Falls back to global fontGroups when omitted. */
  fontPairs?: CustomizerFontPair[];
  /** Fallback sections from the template manifest. Passed to SectionsPanel when config.sections is empty. */
  manifestSections?: MutableSectionEntry[];
}

export const selectStyle: React.CSSProperties = {
  width: "100%",
  padding: "6px 8px",
  background: "#2a2a2a",
  border: "1px solid #3a3a3a",
  borderRadius: "6px",
  color: "#e5e5e5",
  fontSize: "12px",
  cursor: "pointer",
};

export const labelStyle: React.CSSProperties = {
  display: "block",
  color: "#aaa",
  fontSize: "12px",
  marginBottom: "5px",
};
