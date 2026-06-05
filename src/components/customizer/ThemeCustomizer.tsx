"use client";

// ThemeCustomizer — Generic live sidebar panel for any template preview.
// Receives all template-specific metadata as props — zero template imports.
// Desktop-only drawer; controlled by the caller via props.
//
// Colors section: shows palette picker by default.
// "Personalizar colores" toggle reveals individual color pickers (advanced).
// Personalidad section: preset picker at the top of the panel.

import { useState, useCallback, useMemo } from "react";
import { GripVertical } from "lucide-react";
import { stylePresets } from "@/lib/presets";
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
// Inline so ThemeCustomizer stays import-free of template-specific modules.

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
// Generic shape that covers what the panel can edit.
// Each field uses a string index so callers can use their own typed config.

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
  cardStyle: string;
  cardHoverEffect: string;
  cardImageRatio: string;
  tabStyle: string;
  navStyle: string;
  bannerHeight: string;
  headerStyle: string;
  footerStyle: string;
  buttonStyle: string;
  badgeStyle: string;
  priceDisplay: string;
  animationLevel: string;
  shadowStyle: string;
  [key: string]: string;
}

export interface MutableTypography {
  headingWeight: number;
  headingScale: string;
  headingTracking: string;
  headingTransform: string;
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
  /** Typography settings — set by presets, fine-tunable per field */
  theme?: {
    typography?: MutableTypography;
  };
  /** Density level — compact / balanced / spacious */
  layoutDensity?: string;
}

// ── Accordion section names ───────────────────────────────────────────────────

type PanelSection = "personalidad" | "colors" | "tipografia" | "radius" | "grid" | "layout" | "sections";

const PANEL_SECTIONS: { id: PanelSection; label: string; description: string }[] = [
  { id: "personalidad", label: "✦ Personalidad", description: "Elegí el estilo general de tu tienda" },
  { id: "colors", label: "🎨 Colores de tu tienda", description: "Personalizá los colores de tu tienda" },
  { id: "tipografia", label: "Aa Tipografía", description: "Ajustá el estilo de los títulos" },
  { id: "radius", label: "📐 Bordes y esquinas", description: "Ajustá qué tan redondeadas son las esquinas" },
  { id: "grid", label: "📱 Productos por fila", description: "Elegí cuántos productos mostrar por fila" },
  { id: "layout", label: "✨ Estilo visual", description: "Cambiá el estilo visual de tu tienda" },
  { id: "sections", label: "📋 Secciones de la página", description: "Arrastrá para reordenar, desmarcá para ocultar" },
];

// ── Props ─────────────────────────────────────────────────────────────────────

export interface ThemeCustomizerProps {
  config: MutableConfig;
  onConfigChange: (config: MutableConfig) => void;
  /** Called when the user clicks the X close button */
  onClose?: () => void;
  /** Called when the user clicks "Restablecer" — caller owns reset logic */
  onReset?: () => void;

  // Template-provided metadata
  templateLabel?: string;
  colorFields: CustomizerColorField[];
  gridFields: CustomizerGridField[];
  layoutOptions: CustomizerLayoutOption[];
  sectionLabels: CustomizerSectionLabel[];
  /** Optional pre-built palettes. When provided, shows palette picker in the colors section. */
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
      {/* Drag handle */}
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
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "#888";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "#444";
        }}
      >
        <GripVertical size={14} />
      </button>

      {/* Visibility checkbox */}
      <input
        type="checkbox"
        checked={section.visible}
        onChange={onToggle}
        style={{
          width: "14px",
          height: "14px",
          accentColor: "#4a9eff",
          cursor: "pointer",
          flexShrink: 0,
        }}
      />

      {/* Section label */}
      <span
        style={{
          flex: 1,
          fontSize: "12px",
          color: section.visible ? "#e5e5e5" : "#555",
          transition: "color 0.15s",
        }}
      >
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
    new Set(["personalidad"])
  );

  // Preset picker state
  const [activePresetId, setActivePresetId] = useState<string | undefined>(undefined);

  // Palette picker state
  const [activePaletteId, setActivePaletteId] = useState<string | undefined>(undefined);
  const [showAdvancedColors, setShowAdvancedColors] = useState(false);

  // Detect which palette (if any) matches the current config colors exactly
  const detectedPaletteId = useMemo(() => {
    if (!palettes) return undefined;
    for (const palette of palettes) {
      const keys = Object.keys(palette.colors);
      const matches = keys.every((k) => config.colors[k] === palette.colors[k]);
      if (matches) return palette.id;
    }
    return undefined;
  }, [palettes, config.colors]);

  // Effective selected palette: explicit user choice or detected from current colors
  const selectedPaletteId = activePaletteId ?? detectedPaletteId;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  // Build a label map for O(1) lookup in the sections panel
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
      onConfigChange({
        ...config,
        colors: { ...config.colors, [key]: value },
      });
    },
    [config, onConfigChange]
  );

  const applyPalette = useCallback(
    (palette: CustomizerPalette) => {
      setActivePaletteId(palette.id);
      onConfigChange({
        ...config,
        colors: { ...config.colors, ...palette.colors },
      });
    },
    [config, onConfigChange]
  );

  const updateRadius = useCallback(
    (key: keyof MutableRadius, value: string) => {
      onConfigChange({
        ...config,
        radius: { ...config.radius, [key]: value },
      });
    },
    [config, onConfigChange]
  );

  const updateGrid = useCallback(
    (
      section: keyof MutableGrid,
      breakpoint: "mobile" | "desktop",
      value: number
    ) => {
      onConfigChange({
        ...config,
        grid: {
          ...config.grid,
          [section]: { ...config.grid[section], [breakpoint]: value },
        },
      });
    },
    [config, onConfigChange]
  );

  const updateLayout = useCallback(
    (key: keyof MutableLayout, value: string) => {
      onConfigChange({
        ...config,
        layout: { ...config.layout, [key]: value },
      });
    },
    [config, onConfigChange]
  );

  const applyStylePreset = useCallback(
    (presetId: string) => {
      const preset = stylePresets.find((p) => p.id === presetId);
      if (!preset) return;
      setActivePresetId(presetId);
      onConfigChange({
        ...config,
        layout: {
          ...config.layout,
          cardStyle: preset.layout.layout.cardStyle,
          cardHoverEffect: preset.layout.layout.cardHoverEffect,
          cardImageRatio: preset.layout.layout.cardImageRatio,
          animationLevel: preset.layout.layout.animationLevel ?? "subtle",
          shadowStyle: preset.layout.layout.shadowStyle ?? "neutral",
          headerStyle: preset.layout.layout.headerStyle,
          bannerHeight: preset.layout.layout.bannerHeight,
          buttonStyle: preset.layout.layout.buttonStyle ?? "filled",
          badgeStyle: preset.layout.layout.badgeStyle ?? "pill",
          priceDisplay: preset.layout.layout.priceDisplay ?? "standard",
        },
        layoutDensity: preset.layout.density,
        theme: {
          ...config.theme,
          typography: {
            headingWeight: preset.theme.typography.headingWeight,
            headingScale: preset.theme.typography.headingScale,
            headingTracking: preset.theme.typography.headingTracking,
            headingTransform: preset.theme.typography.headingTransform,
          },
        },
      });
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
            [key]: value,
          },
        },
      });
    },
    [config, onConfigChange]
  );

  const updateDensity = useCallback(
    (value: string) => {
      onConfigChange({ ...config, layoutDensity: value });
    },
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
      const newSections = arrayMove([...config.sections], oldIndex, newIndex);
      onConfigChange({ ...config, sections: newSections });
    },
    [config, onConfigChange]
  );

  const handleReset = useCallback(() => {
    if (onReset) onReset();
  }, [onReset]);

  // ── Radius helper: strip "px" → number, format back ─────────────────────

  const parseRadius = (val: string) => parseInt(val, 10) || 0;

  // ── Render ───────────────────────────────────────────────────────────────

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
          <div style={{ fontWeight: 600, fontSize: "14px", color: "#fff" }}>
            Personalizador
          </div>
          {templateLabel && (
            <div style={{ fontSize: "11px", color: "#666", marginTop: "2px" }}>
              {templateLabel}
            </div>
          )}
        </div>

        {/* Actions: Restablecer + X close */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {onReset && (
            <button
              onClick={handleReset}
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
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background = "#333")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background = "#2a2a2a")
              }
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
              {/* X icon */}
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
              {/* Accordion header */}
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
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background = "#222")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background = "transparent")
                }
              >
                <span>{label}</span>
                <ChevronIcon open={isOpen} />
              </button>

              {/* Accordion body */}
              {isOpen && (
                <div style={{ padding: "4px 20px 16px" }}>
                  {/* Section description */}
                  <p style={{ color: "#555", fontSize: "11px", marginBottom: "12px", lineHeight: 1.5, marginTop: "2px" }}>
                    {description}
                  </p>

                  {/* ── PERSONALIDAD ─────────────────────────────────── */}
                  {id === "personalidad" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {stylePresets.map((preset) => {
                        const isSelected = activePresetId === preset.id;
                        return (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => applyStylePreset(preset.id)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              padding: "10px 12px",
                              background: isSelected ? "#1a2a1a" : "#222",
                              border: isSelected
                                ? "1.5px solid #4a9eff"
                                : "1.5px solid #2a2a2a",
                              borderRadius: "8px",
                              cursor: "pointer",
                              textAlign: "left",
                              transition: "border-color 0.15s, background 0.15s",
                              width: "100%",
                            }}
                            onMouseEnter={(e) => {
                              if (!isSelected) {
                                (e.currentTarget as HTMLButtonElement).style.borderColor = "#444";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isSelected) {
                                (e.currentTarget as HTMLButtonElement).style.borderColor = "#2a2a2a";
                              }
                            }}
                          >
                            {/* Content */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "6px",
                                  marginBottom: "2px",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: 600,
                                    color: isSelected ? "#fff" : "#e5e5e5",
                                  }}
                                >
                                  {preset.name}
                                </span>
                                <span
                                  style={{
                                    fontSize: "10px",
                                    color: "#555",
                                    background: "#2a2a2a",
                                    borderRadius: "99px",
                                    padding: "1px 6px",
                                    flexShrink: 0,
                                  }}
                                >
                                  {preset.layout.density}
                                </span>
                              </div>
                              <div
                                style={{
                                  fontSize: "11px",
                                  color: "#666",
                                  lineHeight: 1.4,
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {preset.description}
                              </div>
                            </div>

                            {/* Selected indicator */}
                            {isSelected && (
                              <div
                                style={{
                                  width: "18px",
                                  height: "18px",
                                  borderRadius: "50%",
                                  background: "#4a9eff",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexShrink: 0,
                                }}
                              >
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                  <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                            )}
                          </button>
                        );
                      })}
                      <p
                        style={{
                          marginTop: "6px",
                          fontSize: "10px",
                          color: "#444",
                          lineHeight: 1.5,
                        }}
                      >
                        El preset ajusta el layout, tipografía y densidad. Los colores se mantienen.
                      </p>
                    </div>
                  )}

                  {/* ── COLORS ───────────────────────────────────────── */}
                  {id === "colors" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {/* Palette picker — shown when palettes are available */}
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
                                  border: isSelected
                                    ? "1.5px solid #4a9eff"
                                    : "1.5px solid #2a2a2a",
                                  borderRadius: "8px",
                                  cursor: "pointer",
                                  textAlign: "left",
                                  transition: "border-color 0.15s, background 0.15s",
                                  position: "relative",
                                }}
                                onMouseEnter={(e) => {
                                  if (!isSelected) {
                                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#444";
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (!isSelected) {
                                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#2a2a2a";
                                  }
                                }}
                              >
                                {/* Swatch strip */}
                                <div style={{ display: "flex", gap: "3px", flexShrink: 0 }}>
                                  {palette.preview.map((color, i) => (
                                    <div
                                      key={i}
                                      style={{
                                        width: "16px",
                                        height: "32px",
                                        borderRadius: "4px",
                                        backgroundColor: color,
                                        border: "1px solid rgba(255,255,255,0.06)",
                                        flexShrink: 0,
                                      }}
                                    />
                                  ))}
                                </div>

                                {/* Name + style tag */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ fontSize: "12px", fontWeight: 500, color: "#e5e5e5", marginBottom: "2px" }}>
                                    {palette.name}
                                  </div>
                                  <div
                                    style={{
                                      display: "inline-block",
                                      fontSize: "10px",
                                      color: "#888",
                                      background: "#2a2a2a",
                                      borderRadius: "99px",
                                      padding: "1px 6px",
                                    }}
                                  >
                                    {STYLE_LABELS[palette.style] ?? palette.style}
                                  </div>
                                </div>

                                {/* Selected checkmark */}
                                {isSelected && (
                                  <div
                                    style={{
                                      width: "18px",
                                      height: "18px",
                                      borderRadius: "50%",
                                      background: "#4a9eff",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      flexShrink: 0,
                                    }}
                                  >
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

                      {/* Fallback: direct pickers when no palettes provided */}
                      {(!palettes || palettes.length === 0) && (
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          {colorFields.map(({ key, label: colorLabel }) => (
                            <div
                              key={key}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: "8px",
                              }}
                            >
                              <label style={{ color: "#aaa", flex: 1, fontSize: "12px" }}>
                                {colorLabel}
                              </label>
                              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <span style={{ color: "#666", fontSize: "11px", fontFamily: "monospace" }}>
                                  {(config.colors[key] ?? "#000000").toUpperCase()}
                                </span>
                                <input
                                  type="color"
                                  value={config.colors[key] ?? "#000000"}
                                  onChange={(e) => updateColor(key, e.target.value)}
                                  style={{
                                    width: "28px",
                                    height: "28px",
                                    border: "1px solid #3a3a3a",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    padding: "1px",
                                    background: "transparent",
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Advanced color toggle — only when palettes are present */}
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
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                              style={{
                                transform: showAdvancedColors ? "rotate(180deg)" : "rotate(0deg)",
                                transition: "transform 0.2s ease",
                                flexShrink: 0,
                              }}
                            >
                              <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>

                          {/* Individual pickers — collapsed by default */}
                          {showAdvancedColors && (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                                padding: "10px",
                                background: "#222",
                                borderRadius: "8px",
                                border: "1px solid #2a2a2a",
                              }}
                            >
                              <p style={{ fontSize: "10px", color: "#555", margin: 0, lineHeight: 1.4 }}>
                                Ajusta colores individuales sobre la paleta seleccionada.
                              </p>
                              {colorFields.map(({ key, label: colorLabel }) => (
                                <div
                                  key={key}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: "8px",
                                  }}
                                >
                                  <label style={{ color: "#aaa", flex: 1, fontSize: "12px" }}>
                                    {colorLabel}
                                  </label>
                                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                    <span style={{ color: "#666", fontSize: "11px", fontFamily: "monospace" }}>
                                      {(config.colors[key] ?? "#000000").toUpperCase()}
                                    </span>
                                    <input
                                      type="color"
                                      value={config.colors[key] ?? "#000000"}
                                      onChange={(e) => updateColor(key, e.target.value)}
                                      style={{
                                        width: "28px",
                                        height: "28px",
                                        border: "1px solid #3a3a3a",
                                        borderRadius: "6px",
                                        cursor: "pointer",
                                        padding: "1px",
                                        background: "transparent",
                                      }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}

                  {/* ── TIPOGRAFÍA ───────────────────────────────────── */}
                  {id === "tipografia" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {/* Heading Weight */}
                      <div>
                        <label
                          style={{
                            display: "block",
                            color: "#aaa",
                            fontSize: "12px",
                            marginBottom: "5px",
                          }}
                        >
                          Peso del título
                        </label>
                        <select
                          value={config.theme?.typography?.headingWeight ?? 700}
                          onChange={(e) =>
                            updateTypography("headingWeight", Number(e.target.value))
                          }
                          style={{
                            width: "100%",
                            padding: "6px 8px",
                            background: "#2a2a2a",
                            border: "1px solid #3a3a3a",
                            borderRadius: "6px",
                            color: "#e5e5e5",
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                        >
                          <option value={400}>Fino (400)</option>
                          <option value={500}>Regular (500)</option>
                          <option value={600}>Semibold (600)</option>
                          <option value={700}>Bold (700)</option>
                          <option value={800}>Extrabold (800)</option>
                        </select>
                      </div>

                      {/* Heading Scale */}
                      <div>
                        <label
                          style={{
                            display: "block",
                            color: "#aaa",
                            fontSize: "12px",
                            marginBottom: "5px",
                          }}
                        >
                          Tamaño del título
                        </label>
                        <select
                          value={config.theme?.typography?.headingScale ?? "xl"}
                          onChange={(e) =>
                            updateTypography("headingScale", e.target.value)
                          }
                          style={{
                            width: "100%",
                            padding: "6px 8px",
                            background: "#2a2a2a",
                            border: "1px solid #3a3a3a",
                            borderRadius: "6px",
                            color: "#e5e5e5",
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                        >
                          <option value="md">Compacto</option>
                          <option value="lg">Normal</option>
                          <option value="xl">Grande</option>
                          <option value="2xl">Muy grande</option>
                        </select>
                      </div>

                      {/* Heading Tracking */}
                      <div>
                        <label
                          style={{
                            display: "block",
                            color: "#aaa",
                            fontSize: "12px",
                            marginBottom: "5px",
                          }}
                        >
                          Espaciado entre letras
                        </label>
                        <select
                          value={config.theme?.typography?.headingTracking ?? "-0.02em"}
                          onChange={(e) =>
                            updateTypography("headingTracking", e.target.value)
                          }
                          style={{
                            width: "100%",
                            padding: "6px 8px",
                            background: "#2a2a2a",
                            border: "1px solid #3a3a3a",
                            borderRadius: "6px",
                            color: "#e5e5e5",
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                        >
                          <option value="-0.03em">Comprimido</option>
                          <option value="-0.02em">Apretado</option>
                          <option value="-0.01em">Normal</option>
                          <option value="0em">Espaciado</option>
                          <option value="0.05em">Amplio</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* ── RADIUS ───────────────────────────────────────── */}
                  {id === "radius" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
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
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "6px",
                              }}
                            >
                              <label style={{ color: "#aaa", fontSize: "12px" }}>
                                {rLabel}
                              </label>
                              <span style={{ color: "#666", fontSize: "11px" }}>
                                {numVal}px
                              </span>
                            </div>
                            <input
                              type="range"
                              min={0}
                              max={max}
                              value={numVal}
                              onChange={(e) =>
                                updateRadius(key, `${e.target.value}px`)
                              }
                              style={{ width: "100%", accentColor: "#4a9eff" }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* ── GRID ─────────────────────────────────────────── */}
                  {id === "grid" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                      {gridFields.map(({ key, mobileLabel, desktopLabel }) => (
                        <div key={key} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                          {(
                            [
                              { bp: "mobile" as const, bpLabel: mobileLabel },
                              { bp: "desktop" as const, bpLabel: desktopLabel },
                            ]
                          ).map(({ bp, bpLabel }) => (
                            <div key={bp}>
                              <label
                                style={{
                                  display: "block",
                                  color: "#aaa",
                                  fontSize: "12px",
                                  marginBottom: "4px",
                                }}
                              >
                                {bpLabel}
                              </label>
                              <select
                                value={config.grid[key]?.[bp] ?? 2}
                                onChange={(e) =>
                                  updateGrid(key, bp, Number(e.target.value))
                                }
                                style={{
                                  width: "100%",
                                  padding: "6px 8px",
                                  background: "#2a2a2a",
                                  border: "1px solid #3a3a3a",
                                  borderRadius: "6px",
                                  color: "#e5e5e5",
                                  fontSize: "12px",
                                  cursor: "pointer",
                                }}
                              >
                                {[1, 2, 3, 4, 5, 6].map((n) => (
                                  <option key={n} value={n}>
                                    {n} {n === 1 ? "columna" : "columnas"}
                                  </option>
                                ))}
                              </select>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ── LAYOUT ───────────────────────────────────────── */}
                  {id === "layout" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {/* Density */}
                      <div>
                        <label
                          style={{
                            display: "block",
                            color: "#aaa",
                            fontSize: "12px",
                            marginBottom: "5px",
                          }}
                        >
                          Espaciado general
                        </label>
                        <select
                          value={config.layoutDensity ?? "balanced"}
                          onChange={(e) => updateDensity(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "6px 8px",
                            background: "#2a2a2a",
                            border: "1px solid #3a3a3a",
                            borderRadius: "6px",
                            color: "#e5e5e5",
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                        >
                          <option value="compact">Compacto</option>
                          <option value="balanced">Equilibrado</option>
                          <option value="spacious">Espacioso</option>
                        </select>
                      </div>

                      {/* Template-specific layout options */}
                      {layoutOptions.map(({ key, label: lLabel, options }) => (
                        <div key={key}>
                          <label
                            style={{
                              display: "block",
                              color: "#aaa",
                              fontSize: "12px",
                              marginBottom: "5px",
                            }}
                          >
                            {lLabel}
                          </label>
                          <select
                            value={config.layout[key] ?? ""}
                            onChange={(e) => updateLayout(key, e.target.value)}
                            style={{
                              width: "100%",
                              padding: "6px 8px",
                              background: "#2a2a2a",
                              border: "1px solid #3a3a3a",
                              borderRadius: "6px",
                              color: "#e5e5e5",
                              fontSize: "12px",
                              cursor: "pointer",
                            }}
                          >
                            {options.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}

                      {/* Button style */}
                      <div>
                        <label
                          style={{
                            display: "block",
                            color: "#aaa",
                            fontSize: "12px",
                            marginBottom: "5px",
                          }}
                        >
                          Estilo de botones
                        </label>
                        <select
                          value={config.layout.buttonStyle ?? "filled"}
                          onChange={(e) => updateLayout("buttonStyle", e.target.value)}
                          style={{
                            width: "100%",
                            padding: "6px 8px",
                            background: "#2a2a2a",
                            border: "1px solid #3a3a3a",
                            borderRadius: "6px",
                            color: "#e5e5e5",
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                        >
                          <option value="filled">Relleno</option>
                          <option value="outlined">Con borde</option>
                          <option value="ghost">Fantasma</option>
                        </select>
                      </div>

                      {/* Badge style */}
                      <div>
                        <label
                          style={{
                            display: "block",
                            color: "#aaa",
                            fontSize: "12px",
                            marginBottom: "5px",
                          }}
                        >
                          Forma de etiquetas
                        </label>
                        <select
                          value={config.layout.badgeStyle ?? "pill"}
                          onChange={(e) => updateLayout("badgeStyle", e.target.value)}
                          style={{
                            width: "100%",
                            padding: "6px 8px",
                            background: "#2a2a2a",
                            border: "1px solid #3a3a3a",
                            borderRadius: "6px",
                            color: "#e5e5e5",
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                        >
                          <option value="pill">Redondeada</option>
                          <option value="square">Cuadrada</option>
                        </select>
                      </div>

                      {/* Price display */}
                      <div>
                        <label
                          style={{
                            display: "block",
                            color: "#aaa",
                            fontSize: "12px",
                            marginBottom: "5px",
                          }}
                        >
                          Prominencia del precio
                        </label>
                        <select
                          value={config.layout.priceDisplay ?? "standard"}
                          onChange={(e) => updateLayout("priceDisplay", e.target.value)}
                          style={{
                            width: "100%",
                            padding: "6px 8px",
                            background: "#2a2a2a",
                            border: "1px solid #3a3a3a",
                            borderRadius: "6px",
                            color: "#e5e5e5",
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                        >
                          <option value="prominent">Destacado</option>
                          <option value="standard">Estándar</option>
                          <option value="subtle">Sutil</option>
                        </select>
                      </div>

                      {/* Animation level */}
                      <div>
                        <label
                          style={{
                            display: "block",
                            color: "#aaa",
                            fontSize: "12px",
                            marginBottom: "5px",
                          }}
                        >
                          Nivel de animaciones
                        </label>
                        <select
                          value={config.layout.animationLevel ?? "subtle"}
                          onChange={(e) => updateLayout("animationLevel", e.target.value)}
                          style={{
                            width: "100%",
                            padding: "6px 8px",
                            background: "#2a2a2a",
                            border: "1px solid #3a3a3a",
                            borderRadius: "6px",
                            color: "#e5e5e5",
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                        >
                          <option value="none">Sin animaciones</option>
                          <option value="subtle">Sutiles</option>
                          <option value="full">Completas</option>
                        </select>
                      </div>

                      {/* Shadow style */}
                      <div>
                        <label
                          style={{
                            display: "block",
                            color: "#aaa",
                            fontSize: "12px",
                            marginBottom: "5px",
                          }}
                        >
                          Estilo de sombras
                        </label>
                        <select
                          value={config.layout.shadowStyle ?? "neutral"}
                          onChange={(e) => updateLayout("shadowStyle", e.target.value)}
                          style={{
                            width: "100%",
                            padding: "6px 8px",
                            background: "#2a2a2a",
                            border: "1px solid #3a3a3a",
                            borderRadius: "6px",
                            color: "#e5e5e5",
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                        >
                          <option value="neutral">Neutral</option>
                          <option value="hue-tinted">Tintada con color</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* ── SECTIONS ─────────────────────────────────────── */}
                  {id === "sections" && (
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                    >
                      <SortableContext
                        items={config.sections.map((s) => s.id)}
                        strategy={verticalListSortingStrategy}
                      >
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
