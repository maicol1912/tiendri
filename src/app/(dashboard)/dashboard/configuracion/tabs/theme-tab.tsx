"use client";

// ThemeTab — Template & appearance configuration
// Shows preset picker, palette picker (when schema has palettes), color pickers, radius, fonts.
// Save: persists to localStorage key `tiendri_demo-store_customization`

import { useState, useMemo, useCallback } from "react";
import { toast } from "sonner";
import { Loader2, Check, ChevronDown, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/shared/utils";
import { DEFAULT_TEMPLATE_ID } from "@/shared/constants";
import type { ThemeCustomization } from "@/types/templates/store-customization";
import type { TemplateConfigSchema, ColorPalette } from "@/types/templates/config-schema";
import { updateTheme } from "../actions";
import { CUSTOMIZATION_STORAGE_KEY } from "../client-utils";
import type { StoreCustomization } from "@/types/templates/store-customization";

// ── Fallback hardcoded arrays (used when no schema is provided) ─────────────

const FALLBACK_COLORS: { key: string; label: string; default: string }[] = [
  { key: "primary", label: "Color principal", default: "#000000" },
  { key: "secondary", label: "Color secundario", default: "#211C24" },
  { key: "background", label: "Fondo", default: "#FAFAFA" },
  { key: "cardBg", label: "Fondo de tarjetas", default: "#F6F6F6" },
];

const FALLBACK_RADIUS: { key: string; label: string; max: number; default: string }[] = [
  { key: "card", label: "Esquinas de tarjetas", max: 24, default: "9px" },
  { key: "category", label: "Esquinas de categorías", max: 30, default: "15px" },
  { key: "button", label: "Esquinas de botones", max: 24, default: "8px" },
];

const FALLBACK_FONT_PAIRS: { key: string; label: string; body: string; heading: string; preview?: string }[] = [
  { key: "modern", label: "Moderno", body: "Inter", heading: "Space Grotesk" },
  { key: "warm", label: "Cálido", body: "Poppins", heading: "Playfair Display" },
  { key: "elegant", label: "Elegante", body: "DM Sans", heading: "Cormorant Garamond" },
  { key: "functional", label: "Funcional", body: "IBM Plex Sans", heading: "IBM Plex Mono" },
];

// ── Style tag labels (display-friendly) ──────────────────────────────────────

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

function parseRadius(val: string): number {
  return parseInt(val, 10) || 0;
}

// ── Palette Card Component ────────────────────────────────────────────────────

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
      {/* Selection indicator */}
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

// ── ThemeTab ──────────────────────────────────────────────────────────────────

interface ThemeTabProps {
  initialTheme?: ThemeCustomization;
  /** When provided, colors/radius/fontPairs are read from the schema instead of hardcoded arrays. */
  schema?: TemplateConfigSchema;
  isAuthenticated: boolean;
}

// ── localStorage fallback ─────────────────────────────────────────────────────

function saveThemeToLocalStorage(theme: ThemeCustomization): void {
  try {
    const raw = localStorage.getItem(CUSTOMIZATION_STORAGE_KEY);
    const current: StoreCustomization = raw
      ? (JSON.parse(raw) as StoreCustomization)
      : { templateId: DEFAULT_TEMPLATE_ID };
    const updated: StoreCustomization = {
      ...current,
      theme: { ...(current.theme ?? {}), ...theme },
    };
    localStorage.setItem(CUSTOMIZATION_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Non-critical in demo mode
  }
}

export function ThemeTab({ initialTheme, schema, isAuthenticated }: ThemeTabProps) {
  const palettes = schema?.theme.palettes;
  const hasPalettes = palettes && palettes.length > 0;

  // Resolve data sources: schema-driven or fallback
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

  // Build default maps from the resolved data source
  const defaultColors = useMemo(() => {
    const map: Record<string, string> = {};
    for (const c of editableColors) {
      map[c.key] = c.default;
    }
    return map;
  }, [editableColors]);

  const defaultRadius = useMemo(() => {
    const map: Record<string, string> = {};
    for (const r of radiusControls) {
      map[r.key] = r.default;
    }
    return map;
  }, [radiusControls]);

  // ── State ──────────────────────────────────────────────────────────────────

  const [paletteId, setPaletteId] = useState<string | undefined>(
    initialTheme?.paletteId
  );

  const [colors, setColors] = useState<Record<string, string>>(
    (initialTheme?.colors as Record<string, string> | undefined) ?? defaultColors
  );

  const [radius, setRadius] = useState<Record<string, string>>(
    (initialTheme?.radius as Record<string, string> | undefined) ?? defaultRadius
  );

  const [fontPair, setFontPair] = useState<string>(
    initialTheme?.fontPair ?? schema?.theme?.fontPairs?.[0]?.key ?? "modern"
  );

  const [isSaving, setIsSaving] = useState(false);
  const [showAdvancedColors, setShowAdvancedColors] = useState(false);

  // Get the currently selected palette object
  const selectedPalette = useMemo(
    () => palettes?.find((p) => p.id === paletteId),
    [palettes, paletteId]
  );

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handlePaletteSelect = useCallback((id: string) => {
    setPaletteId(id);
    // Clear per-token overrides when switching palette — merchant starts fresh
    setColors({});
  }, []);

  function handleColorChange(key: string, value: string) {
    setColors((prev) => ({ ...prev, [key]: value }));
  }

  function handleColorReset(key: string) {
    setColors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function handleRadiusChange(key: string, value: number) {
    setRadius((prev) => ({ ...prev, [key]: `${value}px` }));
  }

  /**
   * Resolve the effective color for a token: per-token override > palette > schema default.
   */
  function getEffectiveColor(key: string): string {
    if (colors[key]) return colors[key];
    if (selectedPalette?.colors[key]) return selectedPalette.colors[key];
    return defaultColors[key] ?? "#000000";
  }

  /**
   * Check if a color token has a per-token override (differs from palette default).
   */
  function hasColorOverride(key: string): boolean {
    if (!colors[key]) return false;
    const paletteDefault = selectedPalette?.colors[key] ?? defaultColors[key];
    return colors[key] !== paletteDefault;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSaving(true);

    // Only include non-empty color overrides
    const colorOverrides: Record<string, string> = {};
    for (const [key, value] of Object.entries(colors)) {
      if (value) colorOverrides[key] = value;
    }

    const theme: ThemeCustomization = {
      ...(paletteId ? { paletteId } : {}),
      ...(Object.keys(colorOverrides).length > 0 ? { colors: colorOverrides } : {}),
      radius,
      fontPair,
    };

    try {
      if (isAuthenticated) {
        const result = await updateTheme(theme);
        if (result.success) {
          toast.success("Cambios de apariencia guardados");
        } else if (result.error.code === "UNAUTHORIZED") {
          saveThemeToLocalStorage(theme);
          toast.success("Cambios guardados localmente");
        } else {
          toast.error(result.error.message);
        }
      } else {
        saveThemeToLocalStorage(theme);
        toast.success("Cambios de apariencia guardados");
      }
    } catch {
      toast.error("Error al guardar los cambios. Intentá de nuevo.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Template — read-only display */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Plantilla de diseño</CardTitle>
          <CardDescription>
            La plantilla define la estructura general de tu tienda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 rounded-lg border border-primary bg-primary/5 p-4">
            <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-primary">
              <div className="h-2 w-2 rounded-full bg-primary" />
            </div>
            <div>
              <p className="text-sm font-medium capitalize">
                {DEFAULT_TEMPLATE_ID.replace(/-/g, " ")}
              </p>
            </div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Para cambiar de plantilla, contacta a soporte.
          </p>
        </CardContent>
      </Card>

      {/* Palette picker (only when schema has palettes) */}
      {hasPalettes && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Paleta de colores</CardTitle>
            <CardDescription>
              Elegí una paleta armónica para tu tienda. Cada paleta aplica todos los colores de forma coordinada.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Palette grid */}
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

            {/* Advanced color customization toggle */}
            <button
              type="button"
              onClick={() => setShowAdvancedColors((prev) => !prev)}
              className="flex w-full items-center justify-between rounded-lg border border-dashed border-border/60 px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <span>Personalizar colores individuales</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  showAdvancedColors && "rotate-180"
                )}
              />
            </button>

            {/* Advanced color pickers (collapsed by default) */}
            {showAdvancedColors && (
              <div className="space-y-4 rounded-lg border border-border/40 bg-muted/30 p-4">
                <p className="text-xs text-muted-foreground">
                  Ajusta colores individuales sobre la paleta seleccionada. Los cambios se aplican encima de la paleta.
                </p>
                {editableColors.map(({ key, label }) => {
                  const effectiveColor = getEffectiveColor(key);
                  const isOverridden = hasColorOverride(key);

                  return (
                    <div key={key} className="flex items-center justify-between gap-4">
                      <Label className="flex-1 text-sm">{label}</Label>
                      <div className="flex items-center gap-2">
                        {isOverridden && (
                          <button
                            type="button"
                            onClick={() => handleColorReset(key)}
                            className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            title="Restablecer al valor de la paleta"
                          >
                            <RotateCcw className="h-3 w-3" />
                            Restablecer
                          </button>
                        )}
                        <span className="text-xs tabular-nums text-muted-foreground font-mono">
                          {effectiveColor.toUpperCase()}
                        </span>
                        <input
                          type="color"
                          value={effectiveColor}
                          onChange={(e) => handleColorChange(key, e.target.value)}
                          className="h-9 w-9 cursor-pointer rounded-md border border-input p-1"
                          aria-label={`Color: ${label}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Color pickers (fallback when no palettes) */}
      {!hasPalettes && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Colores de tu tienda</CardTitle>
            <CardDescription>
              Personaliza los colores principales. Los cambios se ven al guardar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {editableColors.map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between gap-4">
                <Label className="flex-1 text-sm">{label}</Label>
                <div className="flex items-center gap-3">
                  <span className="text-xs tabular-nums text-muted-foreground font-mono">
                    {(colors[key] ?? "#000000").toUpperCase()}
                  </span>
                  <input
                    type="color"
                    value={colors[key] ?? "#000000"}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    className="h-9 w-9 cursor-pointer rounded-md border border-input p-1"
                    aria-label={`Color: ${label}`}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Font pair selector */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Par de fuentes</CardTitle>
          <CardDescription>
            Elegí la combinación de tipografías para tu tienda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {fontPairs.map((pair) => (
              <button
                key={pair.key}
                type="button"
                onClick={() => setFontPair(pair.key)}
                className={cn(
                  "flex items-start gap-3 rounded-lg border p-4 text-left transition-colors",
                  fontPair === pair.key
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                )}
              >
                <div
                  className={cn(
                    "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2",
                    fontPair === pair.key ? "border-primary" : "border-muted-foreground/40"
                  )}
                >
                  {fontPair === pair.key && (
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{pair.label}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {pair.body} + {pair.heading}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Radius controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Bordes y esquinas</CardTitle>
          <CardDescription>
            Ajustá qué tan redondeadas son las esquinas de los elementos.
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
                {/* Visual preview of the radius */}
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

      {/* Save button */}
      <div className="flex justify-end">
        <Button type="submit" disabled={isSaving} className="min-w-32">
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Guardando...
            </>
          ) : (
            "Guardar cambios"
          )}
        </Button>
      </div>
    </form>
  );
}
