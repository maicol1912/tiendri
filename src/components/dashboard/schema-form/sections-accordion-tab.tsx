"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { ConfigSection } from "@/types/templates/config-schema";
import type { SectionConfig, SectionId } from "@/types/templates/sections";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { DynamicField } from "./dynamic-field";

// ---------------------------------------------------------------------------
// Section label mapping
// ---------------------------------------------------------------------------

const SECTION_LABELS: Record<string, string> = {
  hero: "Banner Principal",
  categories: "Categorías",
  products: "Productos",
  featured: "Productos Destacados",
  editorial: "Editorial",
  video: "Video",
  collections: "Colecciones",
  banners: "Banners",
  popular: "Populares",
  discounts: "Descuentos",
  searchBar: "Barra de Búsqueda",
  bestSellers: "Más Vendidos",
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

interface SectionsAccordionTabProps {
  sectionSchemas: Record<string, ConfigSection>;
  sections: SectionConfig[];
  onSave: (sections: SectionConfig[]) => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SectionsAccordionTab({
  sectionSchemas,
  sections,
  onSave,
}: SectionsAccordionTabProps) {
  const [formSections, setFormSections] = useState<SectionConfig[]>(() =>
    structuredClone(sections)
  );

  function handleToggleVisibility(sectionId: string) {
    setFormSections((prev) => {
      const exists = prev.some((s) => s.id === sectionId);
      if (!exists) {
        return [
          ...prev,
          { id: sectionId as SectionId, visible: false, config: {} },
        ];
      }
      return prev.map((s) =>
        s.id === sectionId ? { ...s, visible: !s.visible } : s
      );
    });
  }

  function handleFieldChange(
    sectionId: string,
    fieldKey: string,
    value: unknown
  ) {
    setFormSections((prev) => {
      const idx = prev.findIndex((s) => s.id === sectionId);

      if (idx === -1) {
        // Section exists in schema but not in current sections — create it
        return [
          ...prev,
          {
            id: sectionId as SectionId,
            visible: true,
            config: { [fieldKey]: value },
          },
        ];
      }

      const updated = prev.map((s, i) => {
        if (i !== idx) return s;
        return {
          ...s,
          config: {
            ...s.config,
            [fieldKey]: value,
          },
        };
      });

      return updated;
    });
  }

  // Bug #2 fix: when sections is empty (new merchant), fall back to schema keys
  const effectiveSections: SectionConfig[] =
    formSections.length > 0
      ? formSections
      : Object.keys(sectionSchemas ?? {}).map((id) => ({
          id: id as SectionId,
          visible: true,
          config: {},
        }));

  // Determine which schema IDs have a matching configured section
  const sectionIds = Object.keys(sectionSchemas);
  const visibleIds = sectionIds.filter((id) =>
    effectiveSections.some((s) => s.id === id)
  );

  if (visibleIds.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No hay secciones configurables disponibles.
      </p>
    );
  }

  return (
    <div>
      <Accordion type="multiple">
        {visibleIds.map((sectionId) => {
          const schema = sectionSchemas[sectionId];
          const section = effectiveSections.find((s) => s.id === sectionId);
          const isVisible = section?.visible ?? true;

          return (
            <AccordionItem
              key={sectionId}
              value={sectionId}
              className="rounded-lg border mb-2 px-1 last:mb-0"
            >
              <AccordionTrigger className="px-3 font-medium text-sm hover:no-underline">
                {getSectionLabel(sectionId, schema.label)}
              </AccordionTrigger>
              <AccordionContent className="px-3">
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between pb-1 border-b">
                    <span className="text-xs text-muted-foreground">
                      {isVisible ? "Sección visible" : "Sección oculta"}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={() => handleToggleVisibility(sectionId)}
                      aria-label={isVisible ? "Ocultar sección" : "Mostrar sección"}
                    >
                      {isVisible ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {schema.fields.map((field) => (
                    <DynamicField
                      key={field.key}
                      field={field}
                      value={section?.config?.[field.key]}
                      onChange={(value) =>
                        handleFieldChange(sectionId, field.key, value)
                      }
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      <Button
        className="mt-6"
        onClick={() => onSave(formSections)}
      >
        Guardar cambios
      </Button>
    </div>
  );
}
