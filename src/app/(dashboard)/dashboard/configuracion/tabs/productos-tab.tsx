"use client";

// ProductosTab — Product display and catalog configuration
// Card 1: grid columns (mobile/desktop), card image ratio, grid density.
// Card 2: curated product groups (delegates to ProductGroupsCard).
// Save: onSave prop (caller handles Supabase). Falls back to localStorage on UNAUTHORIZED.

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductGroupsCard } from "./product-groups-tab";
import { useConfigDirty } from "../config-dirty-context";
import { CUSTOMIZATION_STORAGE_KEY } from "../client-utils";
import { DEFAULT_TEMPLATE_ID } from "@/shared/constants";
import type { LayoutCustomization, StoreCustomization } from "@/types/templates/store-customization";
import type { ContentConfig } from "@/types/templates/customization-sections";
import type { TemplateConfigSchema } from "@/types/templates/config-schema";
import type { ImageRatio } from "@/types/templates/primitives";
import type { ProductGroupsConfig } from "@/types/templates/product-groups";

// ── Types ─────────────────────────────────────────────────────────────────────

interface ProductosTabProps {
  initialLayout?: LayoutCustomization;
  initialContent?: ContentConfig;
  products: any[]; // PickerProductData
  schema?: TemplateConfigSchema;
  isAuthenticated: boolean;
  onSave: (layout: Partial<LayoutCustomization>, content: Partial<ContentConfig>) => Promise<void>;
  onLivePreview?: (vars: Record<string, string>) => void;
}

type GridDensity = "compact" | "standard" | "spacious";

// ── Constants ─────────────────────────────────────────────────────────────────

const MOBILE_COLS_OPTIONS = [
  { value: "1", label: "1 columna" },
  { value: "2", label: "2 columnas" },
  { value: "3", label: "3 columnas" },
];

const DESKTOP_COLS_OPTIONS = [
  { value: "2", label: "2 columnas" },
  { value: "3", label: "3 columnas" },
  { value: "4", label: "4 columnas" },
  { value: "5", label: "5 columnas" },
];

const IMAGE_RATIO_OPTIONS: { value: ImageRatio; label: string }[] = [
  { value: "square", label: "Cuadrado" },
  { value: "portrait", label: "Retrato" },
  { value: "wide", label: "Panorámico" },
  { value: "tall", label: "Vertical" },
];

const GRID_DENSITY_OPTIONS: { value: GridDensity; label: string }[] = [
  { value: "compact", label: "Compacto" },
  { value: "standard", label: "Normal" },
  { value: "spacious", label: "Espacioso" },
];

// ── localStorage fallback ─────────────────────────────────────────────────────

function saveLayoutToLocalStorage(layout: Partial<LayoutCustomization>): void {
  try {
    const raw = localStorage.getItem(CUSTOMIZATION_STORAGE_KEY);
    const current: StoreCustomization = raw
      ? (JSON.parse(raw) as StoreCustomization)
      : { templateId: DEFAULT_TEMPLATE_ID };
    const updated: StoreCustomization = {
      ...current,
      layout: { ...(current.layout ?? {}), ...layout },
    };
    localStorage.setItem(CUSTOMIZATION_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // No crítico en modo demo
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

export function ProductosTab({
  initialLayout,
  initialContent,
  products,
  isAuthenticated,
  onSave,
}: ProductosTabProps) {
  const { markDirty, markClean } = useConfigDirty();

  // ── Visualización state ───────────────────────────────────────────────────────

  const [mobileCols, setMobileCols] = useState(
    String(initialLayout?.grid?.products?.mobile ?? 2)
  );
  const [desktopCols, setDesktopCols] = useState(
    String(initialLayout?.grid?.products?.desktop ?? 3)
  );
  const [cardImageRatio, setCardImageRatio] = useState<ImageRatio>(
    (initialLayout?.layout?.cardImageRatio as ImageRatio) ?? "square"
  );
  const [gridDensity, setGridDensity] = useState<GridDensity>(
    (initialLayout?.layout?.gridDensity as GridDensity) ?? "standard"
  );

  const [isSaving, setIsSaving] = useState(false);

  // ── Dirty tracking ────────────────────────────────────────────────────────────

  const dirty = useCallback(() => markDirty("productos"), [markDirty]);

  // ── Save — Card 1 ─────────────────────────────────────────────────────────────

  async function handleSaveVisualizacion() {
    setIsSaving(true);

    const layoutChanges: Partial<LayoutCustomization> = {
      grid: {
        products: {
          mobile: Number(mobileCols),
          desktop: Number(desktopCols),
        },
      },
      layout: {
        cardImageRatio,
        gridDensity,
      },
    };

    try {
      await onSave(layoutChanges, {});
      markClean("productos");
      toast.success("Configuración guardada");
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (message.includes("UNAUTHORIZED") || !isAuthenticated) {
        saveLayoutToLocalStorage(layoutChanges);
        markClean("productos");
        toast.warning("Cambios guardados localmente. Iniciá sesión para sincronizar con tu tienda.");
      } else {
        toast.error("Error al guardar la configuración. Intentá de nuevo.");
      }
    } finally {
      setIsSaving(false);
    }
  }

  // ── Save — Card 2 (ProductGroupsCard) ────────────────────────────────────────

  async function handleSaveProductGroups(groups: ProductGroupsConfig) {
    await onSave({}, { productGroups: groups });
  }

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Card 1 — Visualización de productos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Visualización de productos</CardTitle>
          <CardDescription>
            Configurá cómo se ven los productos en tu catálogo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Columnas en el celular */}
          <div className="space-y-1.5">
            <Label htmlFor="mobile-cols">Columnas en el celular</Label>
            <Select
              value={mobileCols}
              onValueChange={(v) => { setMobileCols(v); dirty(); }}
            >
              <SelectTrigger id="mobile-cols">
                <SelectValue placeholder="Seleccioná las columnas" />
              </SelectTrigger>
              <SelectContent>
                {MOBILE_COLS_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Columnas en pantalla grande */}
          <div className="space-y-1.5">
            <Label htmlFor="desktop-cols">Columnas en pantalla grande</Label>
            <Select
              value={desktopCols}
              onValueChange={(v) => { setDesktopCols(v); dirty(); }}
            >
              <SelectTrigger id="desktop-cols">
                <SelectValue placeholder="Seleccioná las columnas" />
              </SelectTrigger>
              <SelectContent>
                {DESKTOP_COLS_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Formato de las fotos */}
          <div className="space-y-1.5">
            <Label htmlFor="card-image-ratio">Formato de las fotos</Label>
            <Select
              value={cardImageRatio}
              onValueChange={(v) => { setCardImageRatio(v as ImageRatio); dirty(); }}
            >
              <SelectTrigger id="card-image-ratio">
                <SelectValue placeholder="Seleccioná el formato" />
              </SelectTrigger>
              <SelectContent>
                {IMAGE_RATIO_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Espaciado del catálogo */}
          <div className="space-y-1.5">
            <Label htmlFor="grid-density">Espaciado del catálogo</Label>
            <Select
              value={gridDensity}
              onValueChange={(v) => { setGridDensity(v as GridDensity); dirty(); }}
            >
              <SelectTrigger id="grid-density">
                <SelectValue placeholder="Seleccioná el espaciado" />
              </SelectTrigger>
              <SelectContent>
                {GRID_DENSITY_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Save button — Card 1 */}
      <div className="flex justify-end">
        <Button
          type="button"
          onClick={handleSaveVisualizacion}
          disabled={isSaving}
          className="min-w-32"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Guardando...
            </>
          ) : (
            "Guardar configuración"
          )}
        </Button>
      </div>

      {/* Card 2 — Grupos de productos */}
      <ProductGroupsCard
        initialProductGroups={initialContent?.productGroups}
        products={products}
        onSave={handleSaveProductGroups}
      />
    </div>
  );
}
