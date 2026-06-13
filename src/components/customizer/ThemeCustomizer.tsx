"use client";

// ThemeCustomizer — Generic live sidebar panel for any template preview.
// Receives all template-specific metadata as props — zero template imports.
// Desktop-only drawer; controlled by the caller via props.
//
// Sections are collapsible accordions.

import { useState, useCallback, useMemo } from "react";
import { GripVertical } from "lucide-react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// ── Palette type (mirrors ColorPalette from config-schema) ────────────────────

export interface CustomizerPalette {
  id: string;
  name: string;
  description: string;
  style: string;
  /** 4-5 hex colors for the preview swatch strip. */
  preview: string[];
  /** Full color token map for the palette. */
  colors: Record<string, string>;
}

// ── Style label display map ────────────────────────────────────────────────────

const STYLE_LABELS: Record<string, string> = {
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

// ── Public field/section descriptor types ─────────────────────────────────────

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

// ── Mutable config shape ──────────────────────────────────────────────────────

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
  // Fields in TemplateLayoutConfig
  cardImageRatio: string;
  gridDensity: string;
  spacingDensity: string;
  shadowElevation: string;
  transitionSpeed: string;
  transitionEasing: string;
  borderRadiusScale: string;
  dividerStyle: string;
  imageFit: string;
  imageBorderRadius: string;
  imageHoverEffect: string;
  cardBorderTreatment: string;
  cardPadding: string;
  [key: string]: string;
}

export interface MutableTypography {
  headingWeight: number;
  headingScale: string;
  headingTracking: string;
  headingTransform: string;
  headingFontStyle: string;
  headingDecoration: string;
  bodyFontSize: string;
  bodyLineHeight: string;
  displaySize: string;
  cardTextAlign: string;
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
  /** Density level — compact / balanced / spacious */
  layoutDensity?: string;
  gridColumnsMobile?: number;
  gridColumnsDesktop?: number;
  containerMaxWidth?: string;
  /** Active font pair key — set by presets, used to inject next/font CSS variable classes */
  fontPair?: string;
}

// ── Shared select style ────────────────────────────────────────────────────────

const selectStyle: React.CSSProperties = {
  width: "100%",
  padding: "6px 8px",
  background: "#2a2a2a",
  border: "1px solid #3a3a3a",
  borderRadius: "6px",
  color: "#e5e5e5",
  fontSize: "12px",
  cursor: "pointer",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  color: "#aaa",
  fontSize: "12px",
  marginBottom: "5px",
};

// ── ControlField component ─────────────────────────────────────────────────────

function ControlField({
  label,
  field,
  value,
  options,
  onChange,
}: {
  label: string;
  field: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={selectStyle}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// ── Accordion section names ───────────────────────────────────────────────────

type PanelSection =
  | "tipografia"
  | "colores"
  | "formas"
  | "estructura"
  | "efectos"
  | "cards-paginas"
  | "sections";

const PANEL_SECTIONS: { id: PanelSection; label: string; description: string }[] = [
  { id: "tipografia", label: "Aa Tipografía", description: "Ajustá el estilo de los textos y títulos" },
  { id: "colores", label: "🎨 Colores", description: "Paleta, estrategia de color y fondo" },
  { id: "formas", label: "📐 Formas y bordes", description: "Radio de bordes, estilo de tarjetas y badges" },
  { id: "estructura", label: "▦ Grid y estructura", description: "Columnas, espaciado y proporciones" },
  { id: "efectos", label: "✨ Efectos", description: "Animaciones, sombras y transiciones" },
  { id: "cards-paginas", label: "🃏 Cards y páginas", description: "Diseño de contenido, héroe y botones" },
  { id: "sections", label: "📋 Secciones", description: "Arrastrá para reordenar, desmarcá para ocultar" },
];

// ── Props ─────────────────────────────────────────────────────────────────────

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
}

// ── Chevron icon ──────────────────────────────────────────────────────────────

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.2s ease",
        flexShrink: 0,
      }}
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Sortable section item ─────────────────────────────────────────────────────

interface SortableSectionItemProps {
  section: MutableSectionEntry;
  label: string;
  onToggle: () => void;
}

function SortableSectionItem({ section, label, onToggle }: SortableSectionItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: section.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 10px",
        background: "#222",
        borderRadius: "8px",
        border: "1px solid #2a2a2a",
      }}
    >
      <button
        {...attributes}
        {...listeners}
        aria-label="Arrastrar para reordenar"
        style={{
          background: "transparent",
          border: "none",
          padding: "2px",
          cursor: "grab",
          color: "#444",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "color 0.15s",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#888"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#444"; }}
      >
        <GripVertical size={14} />
      </button>

      <input
        type="checkbox"
        checked={section.visible}
        onChange={onToggle}
        style={{ width: "14px", height: "14px", accentColor: "#4a9eff", cursor: "pointer", flexShrink: 0 }}
      />

      <span style={{ flex: 1, fontSize: "12px", color: section.visible ? "#e5e5e5" : "#555", transition: "color 0.15s" }}>
        {label}
      </span>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function ThemeCustomizer({
  config,
  onConfigChange,
  onClose,
  onReset,
  templateLabel,
  colorFields,
  gridFields,
  layoutOptions,
  sectionLabels,
  palettes,
}: ThemeCustomizerProps) {
  const [openSections, setOpenSections] = useState<Set<PanelSection>>(
    new Set(["tipografia"])
  );
  const [activePaletteId, setActivePaletteId] = useState<string | undefined>(undefined);
  const [showAdvancedColors, setShowAdvancedColors] = useState(false);

  const detectedPaletteId = useMemo(() => {
    if (!palettes) return undefined;
    for (const palette of palettes) {
      const keys = Object.keys(palette.colors);
      const matches = keys.every((k) => config.colors[k] === palette.colors[k]);
      if (matches) return palette.id;
    }
    return undefined;
  }, [palettes, config.colors]);

  const selectedPaletteId = activePaletteId ?? detectedPaletteId;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const sectionLabelMap = Object.fromEntries(
    sectionLabels.map(({ id, label }) => [id, label])
  );

  const toggleSection = useCallback((id: PanelSection) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // ── Update helpers ──────────────────────────────────────────────────────────

  const updateColor = useCallback(
    (key: string, value: string) => {
      onConfigChange({ ...config, colors: { ...config.colors, [key]: value } });
    },
    [config, onConfigChange]
  );

  const applyPalette = useCallback(
    (palette: CustomizerPalette) => {
      setActivePaletteId(palette.id);
      onConfigChange({ ...config, colors: { ...config.colors, ...palette.colors } });
    },
    [config, onConfigChange]
  );

  const updateRadius = useCallback(
    (key: keyof MutableRadius, value: string) => {
      onConfigChange({ ...config, radius: { ...config.radius, [key]: value } });
    },
    [config, onConfigChange]
  );

  const updateGrid = useCallback(
    (section: keyof MutableGrid, breakpoint: "mobile" | "desktop", value: number) => {
      onConfigChange({
        ...config,
        grid: { ...config.grid, [section]: { ...config.grid[section], [breakpoint]: value } },
      });
    },
    [config, onConfigChange]
  );

  const updateLayout = useCallback(
    (key: keyof MutableLayout, value: string) => {
      onConfigChange({ ...config, layout: { ...config.layout, [key]: value } });
    },
    [config, onConfigChange]
  );

  const updateTypography = useCallback(
    (key: keyof MutableTypography, value: string | number) => {
      onConfigChange({
        ...config,
        theme: {
          ...config.theme,
          typography: {
            headingWeight: config.theme?.typography?.headingWeight ?? 700,
            headingScale: config.theme?.typography?.headingScale ?? "xl",
            headingTracking: config.theme?.typography?.headingTracking ?? "-0.02em",
            headingTransform: config.theme?.typography?.headingTransform ?? "none",
            headingFontStyle: config.theme?.typography?.headingFontStyle ?? "normal",
            headingDecoration: config.theme?.typography?.headingDecoration ?? "none",
            bodyFontSize: config.theme?.typography?.bodyFontSize ?? "base",
            bodyLineHeight: config.theme?.typography?.bodyLineHeight ?? "normal",
            displaySize: config.theme?.typography?.displaySize ?? "lg",
            cardTextAlign: config.theme?.typography?.cardTextAlign ?? "left",
            [key]: value,
          },
        },
      });
    },
    [config, onConfigChange]
  );

  const updateColorToken = useCallback(
    (key: keyof MutableColor, value: string) => {
      onConfigChange({
        ...config,
        theme: {
          ...config.theme,
          color: {
            colorStrategy: config.theme?.color?.colorStrategy ?? "accent-pop",
            backgroundTreatment: config.theme?.color?.backgroundTreatment ?? "solid",
            cardBackground: config.theme?.color?.cardBackground ?? "white",
            imageOverlayHover: config.theme?.color?.imageOverlayHover ?? "none",
            accentDistribution: config.theme?.color?.accentDistribution ?? "badges-and-buttons",
            [key]: value,
          },
        },
      });
    },
    [config, onConfigChange]
  );

  const updateStructural = useCallback(
    (key: keyof MutableStructural, value: string) => {
      onConfigChange({
        ...config,
        structural: {
          cardContentLayout: config.structural?.cardContentLayout ?? "below-image",
          heroVariant: config.structural?.heroVariant ?? "full-bleed",
          categoryNavStyle: config.structural?.categoryNavStyle ?? "horizontal-scroll",
          addToCartStyle: config.structural?.addToCartStyle ?? "full-width",
          [key]: value,
        },
      });
    },
    [config, onConfigChange]
  );

  const updateDensity = useCallback(
    (value: string) => { onConfigChange({ ...config, layoutDensity: value }); },
    [config, onConfigChange]
  );

  const toggleSectionVisible = useCallback(
    (index: number) => {
      const newSections = config.sections.map((s, i) =>
        i === index ? { ...s, visible: !s.visible } : s
      );
      onConfigChange({ ...config, sections: newSections });
    },
    [config, onConfigChange]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      const oldIndex = config.sections.findIndex((s) => s.id === active.id);
      const newIndex = config.sections.findIndex((s) => s.id === over.id);
      onConfigChange({ ...config, sections: arrayMove([...config.sections], oldIndex, newIndex) });
    },
    [config, onConfigChange]
  );

  const parseRadius = (val: string) => parseInt(val, 10) || 0;

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <aside
      style={{
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        overflowY: "auto",
        background: "#1a1a1a",
        color: "#e5e5e5",
        display: "flex",
        flexDirection: "column",
        fontFamily: "system-ui, -apple-system, sans-serif",
        fontSize: "13px",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid #2a2a2a",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          background: "#1a1a1a",
          zIndex: 10,
        }}
      >
        <div>
          <div style={{ fontWeight: 600, fontSize: "14px", color: "#fff" }}>Personalizador</div>
          {templateLabel && (
            <div style={{ fontSize: "11px", color: "#666", marginTop: "2px" }}>{templateLabel}</div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {onReset && (
            <button
              onClick={onReset}
              style={{
                padding: "5px 10px",
                background: "#2a2a2a",
                border: "1px solid #3a3a3a",
                borderRadius: "6px",
                color: "#ccc",
                cursor: "pointer",
                fontSize: "11px",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#333"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#2a2a2a"; }}
            >
              Restablecer
            </button>
          )}

          {onClose && (
            <button
              onClick={onClose}
              aria-label="Cerrar personalizador"
              style={{
                width: "28px",
                height: "28px",
                background: "transparent",
                border: "1px solid #3a3a3a",
                borderRadius: "6px",
                color: "#888",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.15s, color 0.15s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                const btn = e.currentTarget as HTMLButtonElement;
                btn.style.background = "#2a2a2a";
                btn.style.color = "#e5e5e5";
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget as HTMLButtonElement;
                btn.style.background = "transparent";
                btn.style.color = "#888";
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Accordion sections */}
      <div style={{ flex: 1 }}>
        {PANEL_SECTIONS.map(({ id, label, description }) => {
          const isOpen = openSections.has(id);
          return (
            <div key={id} style={{ borderBottom: "1px solid #2a2a2a" }}>
              <button
                onClick={() => toggleSection(id)}
                style={{
                  width: "100%",
                  padding: "14px 20px",
                  background: "transparent",
                  border: "none",
                  color: "#e5e5e5",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "13px",
                  fontWeight: 500,
                  textAlign: "left",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#222"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
              >
                <span>{label}</span>
                <ChevronIcon open={isOpen} />
              </button>

              {isOpen && (
                <div style={{ padding: "4px 20px 16px" }}>
                  <p style={{ color: "#555", fontSize: "11px", marginBottom: "12px", lineHeight: 1.5, marginTop: "2px" }}>
                    {description}
                  </p>

                  {/* ── TIPOGRAFÍA ───────────────────────────────────── */}
                  {id === "tipografia" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {/* Font pair */}
                      <div>
                        <label style={labelStyle}>Par tipográfico</label>
                        <select
                          value={config.theme?.typography?.headingScale ?? "modern"}
                          onChange={(e) => updateTypography("headingScale", e.target.value)}
                          style={selectStyle}
                        >
                          <option value="modern">Moderno</option>
                          <option value="warm">Cálido</option>
                          <option value="elegant">Elegante</option>
                          <option value="functional">Funcional</option>
                          <option value="mono-geometric">Mono geométrico</option>
                          <option value="display-impact">Impacto display</option>
                          <option value="whisper-light">Suave ligero</option>
                          <option value="handcraft-mix">Artesanal mixto</option>
                        </select>
                      </div>

                      {/* Heading weight */}
                      <div>
                        <label style={labelStyle}>Peso del título</label>
                        <select
                          value={config.theme?.typography?.headingWeight ?? 700}
                          onChange={(e) => updateTypography("headingWeight", Number(e.target.value))}
                          style={selectStyle}
                        >
                          <option value={400}>Fino (400)</option>
                          <option value={500}>Regular (500)</option>
                          <option value={600}>Semibold (600)</option>
                          <option value={700}>Bold (700)</option>
                          <option value={800}>Extrabold (800)</option>
                        </select>
                      </div>

                      {/* Heading scale */}
                      <div>
                        <label style={labelStyle}>Tamaño del título</label>
                        <select
                          value={config.theme?.typography?.headingScale ?? "xl"}
                          onChange={(e) => updateTypography("headingScale", e.target.value)}
                          style={selectStyle}
                        >
                          <option value="md">Compacto</option>
                          <option value="lg">Normal</option>
                          <option value="xl">Grande</option>
                          <option value="2xl">Muy grande</option>
                        </select>
                      </div>

                      {/* Heading tracking */}
                      <div>
                        <label style={labelStyle}>Espaciado entre letras</label>
                        <select
                          value={config.theme?.typography?.headingTracking ?? "-0.02em"}
                          onChange={(e) => updateTypography("headingTracking", e.target.value)}
                          style={selectStyle}
                        >
                          <option value="-0.03em">Comprimido</option>
                          <option value="-0.02em">Apretado</option>
                          <option value="-0.01em">Normal</option>
                          <option value="0em">Espaciado</option>
                          <option value="0.05em">Amplio</option>
                        </select>
                      </div>

                      {/* Heading transform */}
                      <ControlField
                        label="Transformación del título"
                        field="typography.headingTransform"
                        value={config.theme?.typography?.headingTransform ?? "none"}
                        options={[
                          { value: "none", label: "Normal" },
                          { value: "uppercase", label: "MAYÚSCULAS" },
                        ]}
                        onChange={(v) => updateTypography("headingTransform", v)}
                      />

                      {/* Heading font style */}
                      <ControlField
                        label="Estilo del título"
                        field="typography.headingFontStyle"
                        value={config.theme?.typography?.headingFontStyle ?? "normal"}
                        options={[
                          { value: "normal", label: "Normal" },
                          { value: "italic", label: "Cursiva" },
                        ]}
                        onChange={(v) => updateTypography("headingFontStyle", v)}
                      />

                      {/* Heading decoration */}
                      <ControlField
                        label="Decoración del título"
                        field="typography.headingDecoration"
                        value={config.theme?.typography?.headingDecoration ?? "none"}
                        options={[
                          { value: "none", label: "Sin decoración" },
                          { value: "underline", label: "Subrayado" },
                          { value: "overline", label: "Línea superior" },
                          { value: "highlight", label: "Resaltado" },
                        ]}
                        onChange={(v) => updateTypography("headingDecoration", v)}
                      />

                      {/* Body font size */}
                      <div>
                        <label style={labelStyle}>Tamaño del texto</label>
                        <select
                          value={config.theme?.typography?.bodyFontSize ?? "base"}
                          onChange={(e) => updateTypography("bodyFontSize", e.target.value)}
                          style={selectStyle}
                        >
                          <option value="sm">Pequeño</option>
                          <option value="base">Normal</option>
                          <option value="lg">Grande</option>
                        </select>
                      </div>

                      {/* Body line height */}
                      <ControlField
                        label="Interlineado"
                        field="typography.bodyLineHeight"
                        value={config.theme?.typography?.bodyLineHeight ?? "normal"}
                        options={[
                          { value: "tight", label: "Apretado" },
                          { value: "normal", label: "Normal" },
                          { value: "relaxed", label: "Relajado" },
                          { value: "loose", label: "Suelto" },
                        ]}
                        onChange={(v) => updateTypography("bodyLineHeight", v)}
                      />

                      {/* Display size */}
                      <div>
                        <label style={labelStyle}>Tamaño de títulos display</label>
                        <select
                          value={config.theme?.typography?.displaySize ?? "lg"}
                          onChange={(e) => updateTypography("displaySize", e.target.value)}
                          style={selectStyle}
                        >
                          <option value="md">Mediano</option>
                          <option value="lg">Grande</option>
                          <option value="xl">Extra grande</option>
                          <option value="2xl">Muy grande</option>
                        </select>
                      </div>

                      {/* Card text align */}
                      <div>
                        <label style={labelStyle}>Alineación del texto en tarjetas</label>
                        <select
                          value={config.theme?.typography?.cardTextAlign ?? "left"}
                          onChange={(e) => updateTypography("cardTextAlign", e.target.value)}
                          style={selectStyle}
                        >
                          <option value="left">Izquierda</option>
                          <option value="center">Centrado</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* ── COLORES ───────────────────────────────────────── */}
                  {id === "colores" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {/* Palette picker */}
                      {palettes && palettes.length > 0 && (
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                          {palettes.map((palette) => {
                            const isSelected = selectedPaletteId === palette.id;
                            return (
                              <button
                                key={palette.id}
                                type="button"
                                onClick={() => applyPalette(palette)}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "10px",
                                  padding: "8px 10px",
                                  background: isSelected ? "#1e2d1e" : "#222",
                                  border: isSelected ? "1.5px solid #4a9eff" : "1.5px solid #2a2a2a",
                                  borderRadius: "8px",
                                  cursor: "pointer",
                                  textAlign: "left",
                                  transition: "border-color 0.15s, background 0.15s",
                                  position: "relative",
                                }}
                                onMouseEnter={(e) => {
                                  if (!isSelected) (e.currentTarget as HTMLButtonElement).style.borderColor = "#444";
                                }}
                                onMouseLeave={(e) => {
                                  if (!isSelected) (e.currentTarget as HTMLButtonElement).style.borderColor = "#2a2a2a";
                                }}
                              >
                                <div style={{ display: "flex", gap: "3px", flexShrink: 0 }}>
                                  {palette.preview.map((color, i) => (
                                    <div key={i} style={{ width: "16px", height: "32px", borderRadius: "4px", backgroundColor: color, border: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }} />
                                  ))}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ fontSize: "12px", fontWeight: 500, color: "#e5e5e5", marginBottom: "2px" }}>{palette.name}</div>
                                  <div style={{ display: "inline-block", fontSize: "10px", color: "#888", background: "#2a2a2a", borderRadius: "99px", padding: "1px 6px" }}>
                                    {STYLE_LABELS[palette.style] ?? palette.style}
                                  </div>
                                </div>
                                {isSelected && (
                                  <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#4a9eff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                      <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {(!palettes || palettes.length === 0) && (
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          {colorFields.map(({ key, label: colorLabel }) => (
                            <div key={key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                              <label style={{ color: "#aaa", flex: 1, fontSize: "12px" }}>{colorLabel}</label>
                              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <span style={{ color: "#666", fontSize: "11px", fontFamily: "monospace" }}>
                                  {(config.colors[key] ?? "#000000").toUpperCase()}
                                </span>
                                <input type="color" value={config.colors[key] ?? "#000000"} onChange={(e) => updateColor(key, e.target.value)} style={{ width: "28px", height: "28px", border: "1px solid #3a3a3a", borderRadius: "6px", cursor: "pointer", padding: "1px", background: "transparent" }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {palettes && palettes.length > 0 && (
                        <>
                          <button
                            type="button"
                            onClick={() => setShowAdvancedColors((prev) => !prev)}
                            style={{
                              marginTop: "4px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              width: "100%",
                              padding: "8px 10px",
                              background: "transparent",
                              border: "1px dashed #333",
                              borderRadius: "8px",
                              color: "#666",
                              fontSize: "11px",
                              cursor: "pointer",
                              transition: "border-color 0.15s, color 0.15s",
                            }}
                            onMouseEnter={(e) => {
                              const btn = e.currentTarget as HTMLButtonElement;
                              btn.style.borderColor = "#4a9eff";
                              btn.style.color = "#aaa";
                            }}
                            onMouseLeave={(e) => {
                              const btn = e.currentTarget as HTMLButtonElement;
                              btn.style.borderColor = "#333";
                              btn.style.color = "#666";
                            }}
                          >
                            <span>Personalizar colores individuales</span>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: showAdvancedColors ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease", flexShrink: 0 }}>
                              <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>

                          {showAdvancedColors && (
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "10px", background: "#222", borderRadius: "8px", border: "1px solid #2a2a2a" }}>
                              <p style={{ fontSize: "10px", color: "#555", margin: 0, lineHeight: 1.4 }}>
                                Ajustá colores individuales sobre la paleta seleccionada.
                              </p>
                              {colorFields.map(({ key, label: colorLabel }) => (
                                <div key={key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                                  <label style={{ color: "#aaa", flex: 1, fontSize: "12px" }}>{colorLabel}</label>
                                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                    <span style={{ color: "#666", fontSize: "11px", fontFamily: "monospace" }}>
                                      {(config.colors[key] ?? "#000000").toUpperCase()}
                                    </span>
                                    <input type="color" value={config.colors[key] ?? "#000000"} onChange={(e) => updateColor(key, e.target.value)} style={{ width: "28px", height: "28px", border: "1px solid #3a3a3a", borderRadius: "6px", cursor: "pointer", padding: "1px", background: "transparent" }} />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      )}

                      {/* Color strategy */}
                      <div style={{ marginTop: "8px", borderTop: "1px solid #2a2a2a", paddingTop: "12px" }}>
                        <ControlField
                          label="Estrategia de color"
                          field="color.colorStrategy"
                          value={config.theme?.color?.colorStrategy ?? "accent-pop"}
                          options={[
                            { value: "monotone", label: "Monotono" },
                            { value: "duotone", label: "Duotono" },
                            { value: "accent-pop", label: "Acento pop" },
                            { value: "gradient", label: "Gradiente" },
                          ]}
                          onChange={(v) => updateColorToken("colorStrategy", v)}
                        />
                      </div>

                      <ControlField
                        label="Tratamiento del fondo"
                        field="color.backgroundTreatment"
                        value={config.theme?.color?.backgroundTreatment ?? "solid"}
                        options={[
                          { value: "solid", label: "Sólido" },
                          { value: "subtle-gradient", label: "Gradiente sutil" },
                          { value: "pattern", label: "Patrón" },
                        ]}
                        onChange={(v) => updateColorToken("backgroundTreatment", v)}
                      />

                      <ControlField
                        label="Fondo de tarjetas"
                        field="color.cardBackground"
                        value={config.theme?.color?.cardBackground ?? "white"}
                        options={[
                          { value: "white", label: "Blanco" },
                          { value: "surface", label: "Superficie" },
                          { value: "transparent", label: "Transparente" },
                          { value: "primary-tint", label: "Tinte primario" },
                        ]}
                        onChange={(v) => updateColorToken("cardBackground", v)}
                      />

                      <div>
                        <label style={labelStyle}>Efecto hover de imagen</label>
                        <select
                          value={config.theme?.color?.imageOverlayHover ?? "none"}
                          onChange={(e) => updateColorToken("imageOverlayHover", e.target.value)}
                          style={selectStyle}
                        >
                          <option value="none">Sin efecto</option>
                          <option value="dark-scrim">Oscurecer</option>
                          <option value="color-tint">Tinte de color</option>
                          <option value="blur">Desenfoque</option>
                        </select>
                      </div>

                      <ControlField
                        label="Distribución del acento"
                        field="color.accentDistribution"
                        value={config.theme?.color?.accentDistribution ?? "badges-and-buttons"}
                        options={[
                          { value: "buttons-only", label: "Solo botones" },
                          { value: "badges-and-buttons", label: "Badges y botones" },
                          { value: "everywhere", label: "En todas partes" },
                          { value: "minimal", label: "Mínimo" },
                        ]}
                        onChange={(v) => updateColorToken("accentDistribution", v)}
                      />
                    </div>
                  )}

                  {/* ── FORMAS Y BORDES ──────────────────────────────── */}
                  {id === "formas" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {/* Radius sliders (legacy) */}
                      {(
                        [
                          { key: "card" as const, label: "Esquinas de tarjetas", max: 24 },
                          { key: "category" as const, label: "Esquinas de categorías", max: 30 },
                          { key: "button" as const, label: "Esquinas de botones", max: 24 },
                        ]
                      ).map(({ key, label: rLabel, max }) => {
                        const numVal = parseRadius(config.radius[key]);
                        return (
                          <div key={key}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                              <label style={{ color: "#aaa", fontSize: "12px" }}>{rLabel}</label>
                              <span style={{ color: "#666", fontSize: "11px" }}>{numVal}px</span>
                            </div>
                            <input
                              type="range"
                              min={0}
                              max={max}
                              value={numVal}
                              onChange={(e) => updateRadius(key, `${e.target.value}px`)}
                              style={{ width: "100%", accentColor: "#4a9eff" }}
                            />
                          </div>
                        );
                      })}

                      <div style={{ borderTop: "1px solid #2a2a2a", paddingTop: "12px" }}>
                        <ControlField
                          label="Escala de bordes"
                          field="chrome.borderRadiusScale"
                          value={config.layout.borderRadiusScale ?? "md"}
                          options={[
                            { value: "sharp", label: "Sin redondeo" },
                            { value: "xs", label: "Mínimo" },
                            { value: "sm", label: "Pequeño" },
                            { value: "md", label: "Mediano" },
                            { value: "lg", label: "Grande" },
                            { value: "xl", label: "Extra grande" },
                            { value: "pill", label: "Píldora" },
                          ]}
                          onChange={(v) => updateLayout("borderRadiusScale", v)}
                        />
                      </div>

                      <ControlField
                        label="Tratamiento del borde"
                        field="cards.cardBorderTreatment"
                        value={config.layout.cardBorderTreatment ?? "none"}
                        options={[
                          { value: "none", label: "Sin borde" },
                          { value: "subtle", label: "Sutil" },
                          { value: "prominent", label: "Prominente" },
                          { value: "left-accent", label: "Acento izquierdo" },
                          { value: "top-accent", label: "Acento superior" },
                        ]}
                        onChange={(v) => updateLayout("cardBorderTreatment", v)}
                      />

                      <ControlField
                        label="Radio de imagen"
                        field="cards.imageBorderRadius"
                        value={config.layout.imageBorderRadius ?? "same-as-card"}
                        options={[
                          { value: "same-as-card", label: "Igual a la tarjeta" },
                          { value: "none", label: "Sin bordes" },
                          { value: "rounded", label: "Redondeado" },
                          { value: "circle", label: "Circular" },
                        ]}
                        onChange={(v) => updateLayout("imageBorderRadius", v)}
                      />

                      <div>
                        <label style={labelStyle}>Estilo de separadores</label>
                        <select
                          value={config.layout.dividerStyle ?? "none"}
                          onChange={(e) => updateLayout("dividerStyle", e.target.value)}
                          style={selectStyle}
                        >
                          <option value="none">Sin separador</option>
                          <option value="line">Línea</option>
                          <option value="dots">Puntos</option>
                          <option value="dash">Guiones</option>
                        </select>
                      </div>

                    </div>
                  )}

                  {/* ── GRID Y ESTRUCTURA ─────────────────────────────── */}
                  {id === "estructura" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <div>
                        <label style={labelStyle}>Densidad del catálogo</label>
                        <select
                          value={config.layout?.gridDensity ?? "standard"}
                          onChange={(e) => updateLayout("gridDensity", e.target.value)}
                          style={selectStyle}
                        >
                          <option value="compact">Compacto</option>
                          <option value="standard">Estándar</option>
                          <option value="spacious">Espacioso</option>
                        </select>
                      </div>

                      <div>
                        <label style={labelStyle}>Espaciado entre secciones</label>
                        <select
                          value={config.layout?.spacingDensity ?? "normal"}
                          onChange={(e) => updateLayout("spacingDensity", e.target.value)}
                          style={selectStyle}
                        >
                          <option value="tight">Compacto</option>
                          <option value="normal">Normal</option>
                          <option value="airy">Espacioso</option>
                        </select>
                      </div>

                      {/* Density */}
                      <ControlField
                        label="Espaciado general"
                        field="layout.density"
                        value={config.layoutDensity ?? "balanced"}
                        options={[
                          { value: "compact", label: "Compacto" },
                          { value: "balanced", label: "Equilibrado" },
                          { value: "spacious", label: "Espacioso" },
                        ]}
                        onChange={updateDensity}
                      />

                      {/* Grid columns mobile */}
                      <ControlField
                        label="Columnas en móvil"
                        field="layout.gridColumnsMobile"
                        value={String(config.gridColumnsMobile ?? 2)}
                        options={[
                          { value: "1", label: "1 columna" },
                          { value: "2", label: "2 columnas" },
                        ]}
                        onChange={(v) => onConfigChange({ ...config, gridColumnsMobile: Number(v) })}
                      />

                      {/* Grid columns desktop */}
                      <div>
                        <label style={labelStyle}>Columnas en escritorio</label>
                        <select
                          value={config.gridColumnsDesktop ?? 3}
                          onChange={(e) => onConfigChange({ ...config, gridColumnsDesktop: Number(e.target.value) })}
                          style={selectStyle}
                        >
                          {[2, 3, 4, 5].map((n) => (
                            <option key={n} value={n}>{n} columnas</option>
                          ))}
                        </select>
                      </div>

                      {/* Container max width */}
                      <div>
                        <label style={labelStyle}>Ancho máximo del contenedor</label>
                        <select
                          value={config.containerMaxWidth ?? "medium"}
                          onChange={(e) => onConfigChange({ ...config, containerMaxWidth: e.target.value })}
                          style={selectStyle}
                        >
                          <option value="narrow">Estrecho</option>
                          <option value="medium">Mediano</option>
                          <option value="wide">Amplio</option>
                          <option value="full">Pantalla completa</option>
                        </select>
                      </div>

                      {/* Card image ratio */}
                      <ControlField
                        label="Proporción de imagen"
                        field="layout.cardImageRatio"
                        value={config.layout.cardImageRatio ?? "square"}
                        options={[
                          { value: "square", label: "Cuadrado" },
                          { value: "portrait", label: "Retrato" },
                          { value: "wide", label: "Panorámico" },
                        ]}
                        onChange={(v) => updateLayout("cardImageRatio", v)}
                      />

                      {/* Card padding */}
                      <div>
                        <label style={labelStyle}>Relleno de tarjetas</label>
                        <select
                          value={config.layout.cardPadding ?? "normal"}
                          onChange={(e) => updateLayout("cardPadding", e.target.value)}
                          style={selectStyle}
                        >
                          <option value="none">Sin relleno</option>
                          <option value="tight">Comprimido</option>
                          <option value="normal">Normal</option>
                          <option value="spacious">Espacioso</option>
                        </select>
                      </div>

                      {/* Image fit */}
                      <ControlField
                        label="Ajuste de imagen"
                        field="cards.imageFit"
                        value={config.layout.imageFit ?? "cover"}
                        options={[
                          { value: "cover", label: "Cubrir" },
                          { value: "contain", label: "Contener" },
                        ]}
                        onChange={(v) => updateLayout("imageFit", v)}
                      />

                      {/* Grid fields (legacy template-provided) */}
                      {gridFields.length > 0 && (
                        <div style={{ borderTop: "1px solid #2a2a2a", paddingTop: "12px" }}>
                          <p style={{ color: "#555", fontSize: "11px", marginBottom: "8px" }}>Columnas por sección</p>
                          {gridFields.map(({ key, mobileLabel, desktopLabel }) => (
                            <div key={key} style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "8px" }}>
                              {(
                                [
                                  { bp: "mobile" as const, bpLabel: mobileLabel },
                                  { bp: "desktop" as const, bpLabel: desktopLabel },
                                ]
                              ).map(({ bp, bpLabel }) => (
                                <div key={bp}>
                                  <label style={{ display: "block", color: "#aaa", fontSize: "12px", marginBottom: "4px" }}>
                                    {bpLabel}
                                  </label>
                                  <select
                                    value={config.grid[key]?.[bp] ?? 2}
                                    onChange={(e) => updateGrid(key, bp, Number(e.target.value))}
                                    style={selectStyle}
                                  >
                                    {[1, 2, 3, 4, 5, 6].map((n) => (
                                      <option key={n} value={n}>{n} {n === 1 ? "columna" : "columnas"}</option>
                                    ))}
                                  </select>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── EFECTOS ───────────────────────────────────────── */}
                  {id === "efectos" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <ControlField
                        label="Elevación de sombra"
                        field="effects.shadowElevation"
                        value={config.layout.shadowElevation ?? "sm"}
                        options={[
                          { value: "none", label: "Sin sombra" },
                          { value: "xs", label: "Mínima" },
                          { value: "sm", label: "Pequeña" },
                          { value: "md", label: "Mediana" },
                          { value: "lg", label: "Grande" },
                          { value: "xl", label: "Muy grande" },
                        ]}
                        onChange={(v) => updateLayout("shadowElevation", v)}
                      />

                      <ControlField
                        label="Velocidad de transición"
                        field="effects.transitionSpeed"
                        value={config.layout.transitionSpeed ?? "normal"}
                        options={[
                          { value: "instant", label: "Instantánea" },
                          { value: "fast", label: "Rápida" },
                          { value: "normal", label: "Normal" },
                          { value: "slow", label: "Lenta" },
                          { value: "very-slow", label: "Muy lenta" },
                        ]}
                        onChange={(v) => updateLayout("transitionSpeed", v)}
                      />

                      <div>
                        <label style={labelStyle}>Tipo de transición</label>
                        <select
                          value={config.layout.transitionEasing ?? "ease"}
                          onChange={(e) => updateLayout("transitionEasing", e.target.value)}
                          style={selectStyle}
                        >
                          <option value="linear">Lineal</option>
                          <option value="ease">Suave</option>
                          <option value="ease-in-out">Entrada y salida suave</option>
                          <option value="spring">Resorte</option>
                        </select>
                      </div>

                      <div>
                        <label style={labelStyle}>Efecto hover de imagen</label>
                        <select
                          value={config.layout.imageHoverEffect ?? "zoom"}
                          onChange={(e) => updateLayout("imageHoverEffect", e.target.value)}
                          style={selectStyle}
                        >
                          <option value="none">Sin efecto</option>
                          <option value="zoom">Zoom</option>
                          <option value="slide-up">Deslizar arriba</option>
                          <option value="grayscale-to-color">Escala de grises a color</option>
                          <option value="brightness">Brillo</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* ── CARDS Y PÁGINAS ───────────────────────────────── */}
                  {id === "cards-paginas" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <ControlField
                        label="Diseño de contenido"
                        field="cards.cardContentLayout"
                        value={config.structural?.cardContentLayout ?? "below-image"}
                        options={[
                          { value: "below-image", label: "Texto debajo" },
                          { value: "overlay-bottom", label: "Overlay inferior" },
                          { value: "overlay-full", label: "Overlay completo" },
                          { value: "side-by-side", label: "Lado a lado" },
                        ]}
                        onChange={(v) => updateStructural("cardContentLayout", v)}
                      />

                      <ControlField
                        label="Estilo del héroe"
                        field="structural.heroVariant"
                        value={config.structural?.heroVariant ?? "full-bleed"}
                        options={[
                          { value: "full-bleed", label: "Pantalla completa" },
                          { value: "contained", label: "Contenido" },
                          { value: "split", label: "Dividido" },
                          { value: "text-only", label: "Solo texto" },
                        ]}
                        onChange={(v) => updateStructural("heroVariant", v)}
                      />

                      <div>
                        <label style={labelStyle}>Navegación de categorías</label>
                        <select
                          value={config.structural?.categoryNavStyle ?? "horizontal-scroll"}
                          onChange={(e) => updateStructural("categoryNavStyle", e.target.value)}
                          style={selectStyle}
                        >
                          <option value="horizontal-scroll">Scroll horizontal</option>
                          <option value="grid">Grilla</option>
                          <option value="tabs">Pestañas</option>
                          <option value="chips">Chips</option>
                        </select>
                      </div>

                      <ControlField
                        label="Estilo de agregar al carrito"
                        field="chrome.addToCartStyle"
                        value={config.structural?.addToCartStyle ?? "full-width"}
                        options={[
                          { value: "full-width", label: "Botón completo" },
                          { value: "icon-button", label: "Ícono" },
                          { value: "floating-fab", label: "Flotante" },
                          { value: "on-hover-only", label: "Al pasar el cursor" },
                        ]}
                        onChange={(v) => updateStructural("addToCartStyle", v)}
                      />

                      {/* Template-specific layout options */}
                      {layoutOptions.map(({ key, label: lLabel, options }) => (
                        <div key={key}>
                          <label style={labelStyle}>{lLabel}</label>
                          <select
                            value={config.layout[key] ?? ""}
                            onChange={(e) => updateLayout(key, e.target.value)}
                            style={selectStyle}
                          >
                            {options.map((opt) => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ── SECTIONS ─────────────────────────────────────── */}
                  {id === "sections" && (
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                      <SortableContext items={config.sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                          {config.sections.map((section, index) => (
                            <SortableSectionItem
                              key={section.id}
                              section={section}
                              label={sectionLabelMap[section.id] ?? section.id}
                              onToggle={() => toggleSectionVisible(index)}
                            />
                          ))}
                        </div>
                      </SortableContext>
                    </DndContext>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "12px 20px",
          borderTop: "1px solid #2a2a2a",
          color: "#444",
          fontSize: "11px",
          textAlign: "center",
        }}
      >
        Tiendri — Personalizador de plantillas
      </div>
    </aside>
  );
}
