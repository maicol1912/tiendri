"use client";

import { useState, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { ConfigTabGroup } from "@/types/templates/config-schema";
import { isRepeatableSection } from "@/types/templates/config-schema";
import { getByPath, setByPath } from "@/catalog/config-path-utils";
import { Button } from "@/components/ui/button";
import { DynamicSection } from "./dynamic-section";
import { RepeatableSection } from "./repeatable-section";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface DynamicTabContentProps {
  tabGroup: ConfigTabGroup;
  customization: Record<string, unknown>;
  onSave: (data: Record<string, unknown>) => void;
}

// ---------------------------------------------------------------------------
// Data path resolution
// ---------------------------------------------------------------------------

/**
 * Resolves the data path for a section within the customization object.
 *
 * Convention: for repeatable sections, the section id (kebab-case) is
 * converted to camelCase and prefixed with "content." to form the data path.
 * Example: "promotional-banners" -> "content.promotionalBanners"
 *
 * For regular sections, field keys are already dot-paths into the
 * customization object (e.g. "content.heroBanner.title"), so no section-level
 * data path is needed.
 */
function sectionIdToDataPath(sectionId: string): string {
  const camelCase = sectionId.replace(/-([a-z])/g, (_, c: string) =>
    c.toUpperCase()
  );
  return `content.${camelCase}`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function DynamicTabContent({
  tabGroup,
  customization,
  onSave,
}: DynamicTabContentProps) {
  const [formState, setFormState] = useState<Record<string, unknown>>(
    () => structuredClone(customization)
  );
  const [isSaving, setIsSaving] = useState(false);

  // --- Handlers for flat sections ---

  const handleFieldChange = useCallback(
    (key: string, value: unknown) => {
      setFormState((prev) => setByPath(prev, key, value));
    },
    []
  );

  // --- Handlers for repeatable sections ---

  const handleRepeatableChange = useCallback(
    (sectionId: string, items: Record<string, unknown>[]) => {
      const dataPath = sectionIdToDataPath(sectionId);
      setFormState((prev) => setByPath(prev, dataPath, items));
    },
    []
  );

  // --- Save ---

  const handleSave = useCallback(() => {
    setIsSaving(true);
    try {
      onSave(formState);
      toast.success("Cambios guardados");
    } catch {
      toast.error("Error al guardar los cambios");
    } finally {
      setIsSaving(false);
    }
  }, [formState, onSave]);

  return (
    <div className="space-y-6">
      {tabGroup.sections.map((section) => {
        if (isRepeatableSection(section)) {
          const dataPath = sectionIdToDataPath(section.id);
          const rawItems = getByPath(formState, dataPath);
          const items = Array.isArray(rawItems)
            ? (rawItems as Record<string, unknown>[])
            : [];

          return (
            <RepeatableSection
              key={section.id}
              section={section}
              items={items}
              onChange={(newItems) =>
                handleRepeatableChange(section.id, newItems)
              }
            />
          );
        }

        return (
          <DynamicSection
            key={section.id}
            section={section}
            values={formState}
            onChange={handleFieldChange}
          />
        );
      })}

      {/* Save button */}
      <div className="flex justify-end">
        <Button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="min-w-32"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Guardando...
            </>
          ) : (
            "Guardar cambios"
          )}
        </Button>
      </div>
    </div>
  );
}
