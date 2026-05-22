"use client";

// ThemeTab — Template & appearance configuration
// Shows color pickers (reusing ThemeCustomizer pattern), template selection.
// When a schema is provided, reads editable colors, radii, and font pairs
// from the schema. Falls back to hardcoded arrays when no schema is available.
// Save: persists to localStorage key `tiendri_demo-store_customization`

import { useState, useMemo } from "react";
import { toast } from "sonner";
import { Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ThemeCustomization } from "@/types/templates/store-customization";
import type { TemplateConfigSchema } from "@/types/templates/config-schema";
import { updateTheme } from "../actions";

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

// ── Template options (static for now) ───────────────────────────────────────

const TEMPLATES = [
  { id: "tech-premium", label: "Tech Premium", description: "Ideal para tecnología y electrónica", available: true },
  { id: "fashion-minimal", label: "Fashion Minimal", description: "Para moda y accesorios", available: false },
  { id: "food-warm", label: "Food & Gourmet", description: "Para alimentos y restaurantes", available: false },
  { id: "beauty-soft", label: "Beauty & Care", description: "Para cosméticos y salud", available: false },
];

function parseRadius(val: string): number {
  return parseInt(val, 10) || 0;
}

interface ThemeTabProps {
  initialTheme?: ThemeCustomization;
  /** When provided, colors/radius/fontPairs are read from the schema instead of hardcoded arrays. */
  schema?: TemplateConfigSchema;
}

export function ThemeTab({ initialTheme, schema }: ThemeTabProps) {
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
  const [colors, setColors] = useState<Record<string, string>>(
    (initialTheme?.colors as Record<string, string> | undefined) ?? defaultColors
  );

  const [radius, setRadius] = useState<Record<string, string>>(
    (initialTheme?.radius as Record<string, string> | undefined) ?? defaultRadius
  );

  const [fontPair, setFontPair] = useState<string>(
    initialTheme?.fontPair ?? "modern"
  );

  const [selectedTemplate] = useState("tech-premium");

  const [isSaving, setIsSaving] = useState(false);

  function handleColorChange(key: string, value: string) {
    setColors((prev) => ({ ...prev, [key]: value }));
  }

  function handleRadiusChange(key: string, value: number) {
    setRadius((prev) => ({ ...prev, [key]: `${value}px` }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSaving(true);

    const theme: ThemeCustomization = {
      colors,
      radius,
      fontPair,
    };

    const result = updateTheme(theme);

    setIsSaving(false);

    if (result.success) {
      toast.success("Cambios de apariencia guardados");
    } else {
      toast.error(result.error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Template selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Plantilla de diseño</CardTitle>
          <CardDescription>
            La plantilla define la estructura general de tu tienda. Más plantillas próximamente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {TEMPLATES.map((template) => (
              <div
                key={template.id}
                className={cn(
                  "relative flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors",
                  template.available
                    ? selectedTemplate === template.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                    : "cursor-not-allowed border-border/40 opacity-60"
                )}
              >
                {/* Radio dot (visual only for MVP) */}
                <div
                  className={cn(
                    "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2",
                    template.available && selectedTemplate === template.id
                      ? "border-primary"
                      : "border-muted-foreground/40"
                  )}
                >
                  {template.available && selectedTemplate === template.id && (
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{template.label}</span>
                    {!template.available && (
                      <Badge variant="secondary" className="text-[10px]">
                        <Lock className="mr-1 h-2.5 w-2.5" />
                        Próximamente
                      </Badge>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {template.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Color pickers */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Colores de tu tienda</CardTitle>
          <CardDescription>
            Personalizá los colores principales. Los cambios se ven al guardar.
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
