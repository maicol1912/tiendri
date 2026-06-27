"use client";

import { useState } from "react";
import type { SectionConfig, SectionId } from "@/types/templates/sections";
import type { ConfigSection } from "@/types/templates/config-schema";
import { SortableList, DragHandle } from "@/components/shared/sortable-list";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DynamicField } from "./dynamic-field";
import { ChevronDown, Plus } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/shared/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SECTION_LABELS: Record<string, string> = {
  hero: "Banner Principal",
  categories: "Categorías",
  products: "Productos",
  collections: "Colecciones",
  featured: "Destacados",
  searchBar: "Barra de búsqueda",
  discounts: "Descuentos",
  banners: "Banners promocionales",
  bestSellers: "Más Vendidos",
  editorial: "Editorial",
  popular: "Búsquedas populares",
  video: "Video",
};

function getSectionLabel(sectionId: string, schemaLabel?: string): string {
  return SECTION_LABELS[sectionId] ?? schemaLabel ?? capitalize(sectionId);
}

function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface SectionManagerProps {
  sections: SectionConfig[];
  availablePool: string[];
  sectionSchemas?: Record<string, ConfigSection>;
  onChange: (sections: SectionConfig[]) => void;
  onSave: (sections: SectionConfig[]) => Promise<void>;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SectionManager({
  sections,
  availablePool,
  sectionSchemas = {},
  onChange,
  onSave,
}: SectionManagerProps) {
  const [formSections, setFormSections] = useState<SectionConfig[]>(() =>
    structuredClone(sections)
  );
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [showPool, setShowPool] = useState(false);
  const [saving, setSaving] = useState(false);

  function update(next: SectionConfig[]) {
    setFormSections(next);
    onChange(next);
  }

  function handleReorder(orderedIds: string[]) {
    const reordered = orderedIds
      .map((id) => formSections.find((s) => s.id === id))
      .filter((s): s is SectionConfig => s !== undefined);
    update(reordered);
  }

  function handleToggleVisible(sectionId: string) {
    update(
      formSections.map((s) =>
        s.id === sectionId ? { ...s, visible: !s.visible } : s
      )
    );
  }

  function handleToggleExpand(sectionId: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  }

  function handleFieldChange(sectionId: string, fieldKey: string, value: unknown) {
    update(
      formSections.map((s) =>
        s.id === sectionId
          ? { ...s, config: { ...s.config, [fieldKey]: value } }
          : s
      )
    );
  }

  function handleAddSection(sectionId: string) {
    const newSection: SectionConfig = {
      id: sectionId as SectionId,
      visible: true,
      config: {},
    };
    const next = [...formSections, newSection];
    update(next);
    setExpandedIds((prev) => new Set(prev).add(sectionId));
    toast.success(`Sección "${getSectionLabel(sectionId)}" agregada`);
  }

  async function handleSave() {
    setSaving(true);
    try {
      await onSave(formSections);
      toast.success("Secciones guardadas");
    } catch {
      toast.error("No se pudieron guardar las secciones");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Active sections */}
      {formSections.length > 0 ? (
        <SortableList
          items={formSections}
          onReorder={handleReorder}
          renderItem={(section, { isDragging, listeners, attributes }) => {
            const schema = sectionSchemas[section.id];
            const hasConfig = Boolean(schema && schema.fields.length > 0);
            const isExpanded = expandedIds.has(section.id);

            return (
              <Card
                className={cn(
                  "transition-shadow",
                  isDragging && "shadow-lg ring-2 ring-primary/30"
                )}
              >
                <CardContent className="p-0">
                  {/* Row */}
                  <div className="flex items-center gap-3 px-3 py-3">
                    <DragHandle listeners={listeners} attributes={attributes} />

                    <Switch
                      checked={section.visible}
                      onCheckedChange={() => handleToggleVisible(section.id)}
                      aria-label={`${section.visible ? "Ocultar" : "Mostrar"} sección`}
                    />

                    <span
                      className={cn(
                        "flex-1 text-sm font-medium select-none",
                        !section.visible && "text-muted-foreground line-through"
                      )}
                    >
                      {getSectionLabel(section.id, schema?.label)}
                    </span>

                    {hasConfig && (
                      <button
                        type="button"
                        onClick={() => handleToggleExpand(section.id)}
                        className="flex items-center justify-center rounded p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label={isExpanded ? "Cerrar configuración" : "Abrir configuración"}
                      >
                        <ChevronDown
                          className={cn(
                            "size-4 transition-transform duration-200",
                            isExpanded && "rotate-180"
                          )}
                        />
                      </button>
                    )}
                  </div>

                  {/* Inline config */}
                  {hasConfig && isExpanded && schema && (
                    <div className="border-t px-4 py-4 space-y-4">
                      {schema.fields.map((field) => (
                        <DynamicField
                          key={field.key}
                          field={field}
                          value={section.config?.[field.key]}
                          onChange={(value) =>
                            handleFieldChange(section.id, field.key, value)
                          }
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          }}
        />
      ) : (
        <p className="py-6 text-center text-sm text-muted-foreground">
          No hay secciones activas. Agregá secciones desde el panel de abajo.
        </p>
      )}

      {/* Add section pool */}
      {availablePool.length > 0 && (
        <div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => setShowPool((p) => !p)}
          >
            <Plus className="size-3.5" />
            Agregar sección
            <ChevronDown
              className={cn(
                "size-3.5 transition-transform duration-200",
                showPool && "rotate-180"
              )}
            />
          </Button>

          {showPool && (
            <Card className="mt-2">
              <CardContent className="p-3 space-y-1">
                {availablePool.map((sectionId) => (
                  <div
                    key={sectionId}
                    className="flex items-center justify-between gap-3 rounded-md px-2 py-2 hover:bg-muted/50 transition-colors"
                  >
                    <span className="text-sm">
                      {getSectionLabel(
                        sectionId,
                        sectionSchemas[sectionId]?.label
                      )}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => handleAddSection(sectionId)}
                    >
                      Agregar
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Save */}
      <Button
        type="button"
        disabled={saving}
        onClick={handleSave}
        className="w-full"
      >
        {saving ? "Guardando..." : "Guardar secciones"}
      </Button>
    </div>
  );
}
