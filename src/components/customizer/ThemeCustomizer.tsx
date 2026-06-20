"use client";

import { useState, useCallback, useMemo } from "react";
import {
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CustomizerHeader } from "./components/CustomizerHeader";
import { ChevronIcon } from "./components/ChevronIcon";
import { TypographyPanel } from "./panels/TypographyPanel";
import { ColorsPanel } from "./panels/ColorsPanel";
import { ShapesPanel } from "./panels/ShapesPanel";
import { StructurePanel } from "./panels/StructurePanel";
import { CardsAndPagesPanel } from "./panels/CardsAndPagesPanel";
import { SectionsPanel } from "./panels/SectionsPanel";
import { detectPaletteId, TYPOGRAPHY_DEFAULTS, COLOR_TOKEN_DEFAULTS, STRUCTURAL_DEFAULTS } from "./utils";
import {
  PANEL_SECTIONS,
  type PanelSection,
  type ThemeCustomizerProps,
  type MutableRadius,
  type MutableGrid,
  type MutableLayout,
  type MutableTypography,
  type MutableColor,
  type MutableStructural,
  type CustomizerPalette,
} from "./types";

export type {
  CustomizerPalette,
  CustomizerFontPair,
  CustomizerColorField,
  CustomizerSectionLabel,
  CustomizerGridField,
  CustomizerLayoutOption,
  MutableColors,
  MutableRadius,
  MutableGridEntry,
  MutableGrid,
  MutableLayout,
  MutableTypography,
  MutableColor,
  MutableStructural,
  MutableSectionEntry,
  MutableConfig,
  PanelSection,
  ThemeCustomizerProps,
} from "./types";

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
  fontPairs,
  manifestSections,
}: ThemeCustomizerProps) {
  const [openSections, setOpenSections] = useState<Set<PanelSection>>(
    new Set(["tipografia"])
  );
  const [activePaletteId, setActivePaletteId] = useState<string | undefined>(undefined);

  const detectedPaletteId = useMemo(
    () => detectPaletteId(palettes, config.colors),
    [palettes, config.colors]
  );

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
            headingWeight: config.theme?.typography?.headingWeight ?? TYPOGRAPHY_DEFAULTS.headingWeight,
            headingScale: config.theme?.typography?.headingScale ?? TYPOGRAPHY_DEFAULTS.headingScale,
            headingTransform: config.theme?.typography?.headingTransform ?? TYPOGRAPHY_DEFAULTS.headingTransform,
            bodyFontSize: config.theme?.typography?.bodyFontSize ?? TYPOGRAPHY_DEFAULTS.bodyFontSize,
            headingSpacing: config.theme?.typography?.headingSpacing ?? TYPOGRAPHY_DEFAULTS.headingSpacing,
            bodyFontWeight: config.theme?.typography?.bodyFontWeight ?? TYPOGRAPHY_DEFAULTS.bodyFontWeight,
            fontSizeContrast: config.theme?.typography?.fontSizeContrast ?? TYPOGRAPHY_DEFAULTS.fontSizeContrast,
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
            colorStrategy: config.theme?.color?.colorStrategy ?? COLOR_TOKEN_DEFAULTS.colorStrategy,
            backgroundTreatment: config.theme?.color?.backgroundTreatment ?? COLOR_TOKEN_DEFAULTS.backgroundTreatment,
            cardBackground: config.theme?.color?.cardBackground ?? COLOR_TOKEN_DEFAULTS.cardBackground,
            imageOverlayHover: config.theme?.color?.imageOverlayHover ?? COLOR_TOKEN_DEFAULTS.imageOverlayHover,
            accentDistribution: config.theme?.color?.accentDistribution ?? COLOR_TOKEN_DEFAULTS.accentDistribution,
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
          cardContentLayout: config.structural?.cardContentLayout ?? STRUCTURAL_DEFAULTS.cardContentLayout,
          heroVariant: config.structural?.heroVariant ?? STRUCTURAL_DEFAULTS.heroVariant,
          categoryNavStyle: config.structural?.categoryNavStyle ?? STRUCTURAL_DEFAULTS.categoryNavStyle,
          addToCartStyle: config.structural?.addToCartStyle ?? STRUCTURAL_DEFAULTS.addToCartStyle,
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
      <CustomizerHeader templateLabel={templateLabel} onReset={onReset} onClose={onClose} />

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

                  {id === "tipografia" && (
                    <TypographyPanel
                      config={config}
                      onConfigChange={onConfigChange}
                      updateTypography={updateTypography}
                      fontPairs={fontPairs}
                    />
                  )}

                  {id === "colores" && (
                    <ColorsPanel
                      config={config}
                      colorFields={colorFields}
                      palettes={palettes}
                      selectedPaletteId={selectedPaletteId}
                      updateColor={updateColor}
                      applyPalette={applyPalette}
                      updateColorToken={updateColorToken}
                    />
                  )}

                  {id === "formas" && (
                    <ShapesPanel
                      config={config}
                      updateRadius={updateRadius}
                      updateLayout={updateLayout}
                    />
                  )}

                  {id === "estructura" && (
                    <StructurePanel
                      config={config}
                      gridFields={gridFields}
                      onConfigChange={onConfigChange}
                      updateLayout={updateLayout}
                      updateDensity={updateDensity}
                      updateGrid={updateGrid}
                    />
                  )}

                  {id === "cards-paginas" && (
                    <CardsAndPagesPanel
                      config={config}
                      layoutOptions={layoutOptions}
                      updateLayout={updateLayout}
                      updateStructural={updateStructural}
                    />
                  )}

                  {id === "sections" && (
                    <SectionsPanel
                      config={config}
                      sensors={sensors}
                      sectionLabelMap={sectionLabelMap}
                      toggleSectionVisible={toggleSectionVisible}
                      onConfigChange={onConfigChange}
                      manifestSections={manifestSections}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

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
