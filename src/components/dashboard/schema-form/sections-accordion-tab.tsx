"use client";

import { useState } from "react";
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
  hero: "Hero / Banner Principal",
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

  // Determine which schema IDs have a matching configured section
  const sectionIds = Object.keys(sectionSchemas);
  const visibleIds = sectionIds.filter((id) =>
    formSections.some((s) => s.id === id)
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
          const section = formSections.find((s) => s.id === sectionId);

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
