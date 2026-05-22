"use client";

// ThemeTab — Template & appearance configuration
// Shows color pickers (reusing ThemeCustomizer pattern), template selection.
// For MVP: only tech-premium available. Others show "Próximamente".

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ThemeCustomization } from "@/types/templates/store-customization";
import { updateTheme } from "../actions";

// Font pair options shown in the selector
const FONT_PAIRS: { key: string; label: string; preview: string }[] = [
  { key: "modern", label: "Moderno", preview: "Inter + Space Grotesk" },
  { key: "warm", label: "Cálido", preview: "Poppins + Playfair Display" },
  { key: "elegant", label: "Elegante", preview: "DM Sans + Cormorant Garamond" },
  { key: "functional", label: "Funcional", preview: "IBM Plex Sans + IBM Plex Mono" },
];

interface ThemeTabProps {
  storeId: string;
  initialTheme?: ThemeCustomization;
  initialFontPair?: string;
}

// Color fields the merchant can edit — subset of all template color tokens
const EDITABLE_COLORS: { key: string; label: string }[] = [
  { key: "primary", label: "Color principal" },
  { key: "secondary", label: "Color secundario" },
  { key: "background", label: "Fondo" },
  { key: "cardBg", label: "Fondo de tarjetas" },
];

// Radius controls
const RADIUS_CONTROLS: { key: string; label: string; max: number }[] = [
  { key: "card", label: "Esquinas de tarjetas", max: 24 },
  { key: "category", label: "Esquinas de categorías", max: 30 },
  { key: "button", label: "Esquinas de botones", max: 24 },
];

// Template options
const TEMPLATES = [
  { id: "tech-premium", label: "Tech Premium", description: "Ideal para tecnología y electrónica", available: true },
  { id: "fashion-minimal", label: "Fashion Minimal", description: "Para moda y accesorios", available: false },
  { id: "food-warm", label: "Food & Gourmet", description: "Para alimentos y restaurantes", available: false },
  { id: "beauty-soft", label: "Beauty & Care", description: "Para cosméticos y salud", available: false },
];

// Default colors from tech-premium template
const DEFAULT_COLORS: Record<string, string> = {
  primary: "#000000",
  secondary: "#211C24",
  background: "#FAFAFA",
  cardBg: "#F6F6F6",
};

const DEFAULT_RADIUS: Record<string, string> = {
  card: "9px",
  category: "15px",
  button: "8px",
};

function parseRadius(val: string): number {
  return parseInt(val, 10) || 0;
}

export function ThemeTab({ initialTheme, initialFontPair = "modern" }: ThemeTabProps) {
  const [colors, setColors] = useState<Record<string, string>>(
    (initialTheme?.colors as Record<string, string> | undefined) ?? DEFAULT_COLORS
  );

  const [radius, setRadius] = useState<Record<string, string>>(
    (initialTheme?.radius as Record<string, string> | undefined) ?? DEFAULT_RADIUS
  );

  const [fontPair, setFontPair] = useState<string>(initialFontPair);

  const [selectedTemplate] = useState("tech-premium");

  const [isPending, startTransition] = useTransition();

  function handleColorChange(key: string, value: string) {
    setColors((prev) => ({ ...prev, [key]: value }));
  }

  function handleRadiusChange(key: string, value: number) {
    setRadius((prev) => ({ ...prev, [key]: `${value}px` }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    startTransition(async () => {
      const formData = new FormData();

      // Color fields
      for (const key of Object.keys(colors)) {
        const val = colors[key];
        if (val !== undefined) formData.set(key, val);
      }

      // Radius fields — use prefixed names to avoid conflicts
      for (const key of Object.keys(radius)) {
        const val = radius[key];
        if (val !== undefined) formData.set(`radius${key.charAt(0).toUpperCase()}${key.slice(1)}`, val);
      }

      // Font pair
      formData.set("fontPair", fontPair);

      const result = await updateTheme(formData);

      if (result.success) {
        toast.success("Cambios de apariencia guardados");
      } else {
        toast.error(result.error.message);
      }
    });
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
          {EDITABLE_COLORS.map(({ key, label }) => (
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
            {FONT_PAIRS.map((pair) => (
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
                  <p className="mt-0.5 text-xs text-muted-foreground">{pair.preview}</p>
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
          {RADIUS_CONTROLS.map(({ key, label, max }) => {
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
        <Button type="submit" disabled={isPending} className="min-w-32">
          {isPending ? (
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
