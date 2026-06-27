"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import { Loader2, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { cn } from "@/shared/utils";
import { ColorPickerPopover } from "@/components/dashboard/color-picker-popover";
import { useFontPreview } from "../hooks/use-font-preview";
import { buildPreviewVars } from "../hooks/use-preview-sync";
import { useConfigDirty } from "../config-dirty-context";
import type {
  ThemeCustomization,
  StoreCustomization,
  TemplateConfig,
  TemplateConfigSchema,
  ColorPalette,
} from "@/types/templates";

// ── Fallback constants (used when no schema is provided) ──────────────────────

const FALLBACK_COLORS: { key: string; label: string; default: string }[] = [
  { key: "primary", label: "Color principal", default: "#000000" },
  { key: "secondary", label: "Color secundario", default: "#211C24" },
  { key: "background", label: "Fondo", default: "#FAFAFA" },
  { key: "cardBg", label: "Fondo de tarjetas", default: "#F6F6F6" },
];

const FALLBACK_RADIUS: {
  key: string;
  label: string;
  max: number;
  default: string;
}[] = [
  { key: "card", label: "Esquinas de tarjetas", max: 24, default: "9px" },
  { key: "category", label: "Esquinas de categorías", max: 30, default: "15px" },
  { key: "button", label: "Esquinas de botones", max: 24, default: "8px" },
];

const FALLBACK_FONT_PAIRS: {
  key: string;
  label: string;
  body: string;
  heading: string;
  preview?: string;
}[] = [
  { key: "modern", label: "Moderno", body: "Inter", heading: "Space Grotesk" },
  { key: "warm", label: "Cálido", body: "Poppins", heading: "Playfair Display" },
  { key: "elegant", label: "Elegante", body: "DM Sans", heading: "Cormorant Garamond" },
  { key: "functional", label: "Funcional", body: "IBM Plex Sans", heading: "IBM Plex Mono" },
];

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

const TAB_ID = "diseno";

// ── Helpers ───────────────────────────────────────────────────────────────────

function parseRadius(val: string): number {
  return parseInt(val, 10) || 0;
}

// ── PaletteCard ───────────────────────────────────────────────────────────────

interface PaletteCardProps {
  palette: ColorPalette;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

function PaletteCard({ palette, isSelected, onSelect }: PaletteCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(palette.id)}
      className={cn(
        "group relative flex flex-col rounded-xl border-2 p-3 text-left transition-all duration-200",
        isSelected
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-border hover:border-primary/40 hover:shadow-sm"
      )}
    >
      {isSelected && (
        <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
          <Check className="h-3 w-3 text-primary-foreground" />
        </div>
      )}

      {/* Color swatches strip */}
      <div className="mb-3 flex gap-1.5">
        {palette.preview.map((color, i) => (
          <div
            key={i}
            className="h-8 flex-1 rounded-md border border-black/5 transition-transform duration-200 group-hover:scale-105"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {/* Palette info */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{palette.name}</p>
          <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
            {palette.description}
          </p>
        </div>
      </div>

      {/* Style tag */}
      <div className="mt-2">
        <span className="inline-block rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          {STYLE_LABELS[palette.style] ?? palette.style}
        </span>
      </div>
    </button>
  );
}

// ── Props ─────────────────────────────────────────────────────────────────────

export interface DisenoTabProps {
  initialTheme?: ThemeCustomization;
  schema?: TemplateConfigSchema;
  manifest: TemplateConfig;
  isAuthenticated: boolean;
  onSave: (theme: ThemeCustomization) => Promise<void>;
  onLivePreview: (vars: Record<string, string>) => void;
}

// ── DisenoTab ─────────────────────────────────────────────────────────────────

export function DisenoTab({
  initialTheme,
  schema,
  manifest,
  // isAuthenticated is accepted for interface compatibility — save logic is
  // delegated entirely to the onSave prop provided by the parent.
  isAuthenticated: _isAuthenticated,
  onSave,
  onLivePreview,
}: DisenoTabProps) {
  const { markDirty, markClean } = useConfigDirty();

  const palettes = schema?.theme?.palettes;
  const hasPalettes = !!palettes && palettes.length > 0;

  // ── Resolved data sources ──────────────────────────────────────────────────

  const editableColors = useMemo(
    () => schema?.theme.colors ?? FALLBACK_COLORS,
    [schema]
  );

  const radiusControls = useMemo(
    () =>
      schema?.theme.radius.map((r) => ({
        key: r.key,
        label: r.label,
        max: r.max,
        default: r.default,
      })) ?? FALLBACK_RADIUS,
    [schema]
  );

  const fontPairs = useMemo(
    () =>
      schema?.theme.fontPairs.map((fp) => ({
        key: fp.key,
        label: fp.label,
        body: fp.body,
        heading: fp.heading,
        preview: fp.preview,
      })) ?? FALLBACK_FONT_PAIRS,
    [schema]
  );

  // Collect all font family names so useFontPreview loads them via Google Fonts
  const allFontFamilies = useMemo(() => {
    const families = new Set<string>();
    for (const pair of fontPairs) {
      if (pair.heading) families.add(pair.heading);
      if (pair.body) families.add(pair.body);
    }
    return [...families];
  }, [fontPairs]);

  // Load Google Fonts for every pair — enables real font previews in the cards
  useFontPreview(allFontFamilies);

  // ── Default maps ───────────────────────────────────────────────────────────

  const defaultColors = useMemo(() => {
    const map: Record<string, string> = {};
    for (const c of editableColors) map[c.key] = c.default;
    return map;
  }, [editableColors]);

  const defaultRadius = useMemo(() => {
    const map: Record<string, string> = {};
    for (const r of radiusControls) map[r.key] = r.default;
    return map;
  }, [radiusControls]);

  // ── State ──────────────────────────────────────────────────────────────────

  const [paletteId, setPaletteId] = useState<string | undefined>(
    initialTheme?.paletteId
  );

  // Per-token color overrides applied on top of the selected palette
  const [colorOverrides, setColorOverrides] = useState<Record<string, string>>(
    (initialTheme?.colors as Record<string, string> | undefined) ?? {}
  );

  const [radius, setRadius] = useState<Record<string, string>>(
    (initialTheme?.radius as Record<string, string> | undefined) ?? defaultRadius
  );

  // Bug fix: do NOT hardcode to "minimalista" — use schema's first pair or "modern"
  const [fontPair, setFontPair] = useState<string>(
    initialTheme?.fontPair ?? schema?.theme?.fontPairs?.[0]?.key ?? "modern"
  );

  const [isSaving, setIsSaving] = useState(false);
  const [showAdvancedColors, setShowAdvancedColors] = useState(false);

  // ── Palette helpers ────────────────────────────────────────────────────────

  const selectedPalette = useMemo(
    () => palettes?.find((p) => p.id === paletteId),
    [palettes, paletteId]
  );

  function getEffectiveColor(key: string): string {
    if (colorOverrides[key]) return colorOverrides[key];
    if (selectedPalette?.colors[key]) return selectedPalette.colors[key];
    return defaultColors[key] ?? "#000000";
  }

  function hasColorOverride(key: string): boolean {
    if (!colorOverrides[key]) return false;
    const paletteDefault = selectedPalette?.colors[key] ?? defaultColors[key];
    return colorOverrides[key] !== paletteDefault;
  }

  // ── Preview computation ────────────────────────────────────────────────────

  /**
   * Build CSS vars from an explicit snapshot of state.
   * Called with the NEW values directly (before setState resolves) so
   * onLivePreview always receives the up-to-date theme.
   */
  function computePreviewVars(
    nextPaletteId: string | undefined,
    nextColors: Record<string, string>,
    nextRadius: Record<string, string>,
    nextFontPair: string
  ): Record<string, string> {
    const theme: ThemeCustomization = {
      ...(nextPaletteId !== undefined ? { paletteId: nextPaletteId } : {}),
      ...(Object.keys(nextColors).length > 0 ? { colors: nextColors } : {}),
      radius: nextRadius,
      fontPair: nextFontPair,
    };
    const customization: StoreCustomization = {
      templateId: manifest.id,
      theme,
    };
    return buildPreviewVars(manifest, customization);
  }

  // ── Handlers ──────────────────────────────────────────────────────────────

  function handlePaletteSelect(id: string) {
    // Clear per-token overrides when switching palette — merchant starts fresh
    setPaletteId(id);
    setColorOverrides({});
    markDirty(TAB_ID);
    onLivePreview(computePreviewVars(id, {}, radius, fontPair));
  }

  function handleColorChange(key: string, value: string) {
    const next = { ...colorOverrides, [key]: value };
    setColorOverrides(next);
    markDirty(TAB_ID);
    onLivePreview(computePreviewVars(paletteId, next, radius, fontPair));
  }

  function handleColorReset(key: string) {
    const next = { ...colorOverrides };
    delete next[key];
    setColorOverrides(next);
    markDirty(TAB_ID);
    onLivePreview(computePreviewVars(paletteId, next, radius, fontPair));
  }

  function handleRadiusChange(key: string, value: number) {
    const next = { ...radius, [key]: `${value}px` };
    setRadius(next);
    markDirty(TAB_ID);
    onLivePreview(computePreviewVars(paletteId, colorOverrides, next, fontPair));
  }

  function handleFontPairSelect(key: string) {
    setFontPair(key);
    markDirty(TAB_ID);
    onLivePreview(computePreviewVars(paletteId, colorOverrides, radius, key));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSaving(true);

    const theme: ThemeCustomization = {
      ...(paletteId !== undefined ? { paletteId } : {}),
      ...(Object.keys(colorOverrides).length > 0 ? { colors: colorOverrides } : {}),
      radius,
      fontPair,
    };

    try {
      await onSave(theme);
      markClean(TAB_ID);
      toast.success("Diseño guardado correctamente");
    } catch {
      toast.error("Error al guardar el diseño. Intentá de nuevo.");
    } finally {
      setIsSaving(false);
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ── 1. Paleta de colores ─────────────────────────────────────────── */}
      {hasPalettes && palettes && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Paleta de colores</CardTitle>
            <CardDescription>
              Elegí una paleta armónica para tu tienda. Cada paleta aplica todos los
              colores de forma coordinada.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Scrollable palette grid */}
            <div className="max-h-[28rem] overflow-y-auto pr-1">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {palettes.map((palette) => (
                  <PaletteCard
                    key={palette.id}
                    palette={palette}
                    isSelected={paletteId === palette.id}
                    onSelect={handlePaletteSelect}
                  />
                ))}
              </div>
            </div>

            {/* ── 2. Personalizar colores (collapsible, hidden by default) ── */}
            <button
              type="button"
              onClick={() => setShowAdvancedColors((prev) => !prev)}
              className="flex w-full items-center justify-between rounded-lg border border-dashed border-border/60 px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <span>Personalizar colores individualmente</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  showAdvancedColors && "rotate-180"
                )}
              />
            </button>

            {showAdvancedColors && (
              <div className="space-y-4 rounded-lg border border-border/40 bg-muted/30 p-4">
                <p className="text-xs text-muted-foreground">
                  Ajustá colores individuales sobre la paleta seleccionada. Los cambios
                  se aplican encima de la paleta.
                </p>
                {editableColors.map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between gap-3">
                    <Label className="text-sm">{label}</Label>
                    <ColorPickerPopover
                      value={getEffectiveColor(key)}
                      onChange={(hex) => handleColorChange(key, hex)}
                      label={label}
                      isOverridden={hasColorOverride(key)}
                      onReset={() => handleColorReset(key)}
                    />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* ── Fallback: direct color pickers when template has no palettes ── */}
      {!hasPalettes && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Colores de tu tienda</CardTitle>
            <CardDescription>
              Personalizá los colores principales. Los cambios se aplican en tiempo real.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {editableColors.map(({ key, label }) => {
              const effectiveColor =
                colorOverrides[key] ?? defaultColors[key] ?? "#000000";
              const isOverridden =
                !!colorOverrides[key] &&
                colorOverrides[key] !== defaultColors[key];

              return (
                <div key={key} className="flex items-center justify-between gap-3">
                  <Label className="text-sm">{label}</Label>
                  <ColorPickerPopover
                    value={effectiveColor}
                    onChange={(hex) => handleColorChange(key, hex)}
                    label={label}
                    isOverridden={isOverridden}
                    onReset={() => handleColorReset(key)}
                  />
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* ── 3. Tipografía ────────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tipografía</CardTitle>
          <CardDescription>
            Elegí el par de fuentes que mejor representa tu marca.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {fontPairs.map((pair) => {
              const isSelected = fontPair === pair.key;
              return (
                <button
                  key={pair.key}
                  type="button"
                  onClick={() => handleFontPairSelect(pair.key)}
                  className={cn(
                    "flex flex-col gap-3 rounded-xl border-2 p-4 text-left transition-all duration-200",
                    isSelected
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border hover:border-primary/40 hover:shadow-sm"
                  )}
                >
                  {/* Selection indicator + label row */}
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2",
                        isSelected
                          ? "border-primary"
                          : "border-muted-foreground/40"
                      )}
                    >
                      {isSelected && (
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{pair.label}</span>
                  </div>

                  {/* Real font preview — renders each text in its actual font */}
                  <div className="rounded-lg bg-background/60 px-3 py-2 space-y-0.5">
                    <p
                      style={{
                        fontFamily: pair.heading,
                        fontSize: 22,
                        fontWeight: 600,
                      }}
                      className="leading-tight tracking-tight text-foreground"
                    >
                      Aa Bb Cc 123
                    </p>
                    <p
                      style={{
                        fontFamily: pair.body,
                        fontSize: 16,
                        fontWeight: 400,
                      }}
                      className="text-muted-foreground"
                    >
                      La mejor tienda online
                    </p>
                  </div>

                  {/* Font family names */}
                  <p className="text-[11px] text-muted-foreground">
                    {pair.heading} + {pair.body}
                  </p>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* ── 4. Bordes y esquinas ─────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Bordes y esquinas</CardTitle>
          <CardDescription>
            Ajustá qué tan redondeadas son las esquinas de los elementos de tu tienda.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {radiusControls.map(({ key, label, max }) => {
            const numVal = parseRadius(radius[key] ?? "0px");
            return (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">{label}</Label>
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {numVal}px
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={max}
                  value={numVal}
                  onChange={(e) => handleRadiusChange(key, Number(e.target.value))}
                  className="w-full accent-primary"
                  aria-label={label}
                />
                {/* Visual preview of the radius value */}
                <div className="flex items-center gap-2">
                  <div
                    className="h-8 w-16 border-2 border-primary/40 bg-primary/10"
                    style={{ borderRadius: radius[key] ?? "0px" }}
                  />
                  <span className="text-xs text-muted-foreground">Vista previa</span>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* ── Save ─────────────────────────────────────────────────────────── */}
      <div className="flex justify-end">
        <Button type="submit" disabled={isSaving} className="min-w-36">
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Guardando...
            </>
          ) : (
            "Guardar diseño"
          )}
        </Button>
      </div>
    </form>
  );
}
