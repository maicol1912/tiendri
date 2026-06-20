"use client";

import {
  DndContext,
  closestCenter,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { SortableSectionItem } from "../components/SortableSectionItem";
import type { MutableConfig, MutableSectionEntry } from "../types";

interface SectionsPanelProps {
  config: MutableConfig;
  sensors: ReturnType<typeof import("@dnd-kit/core").useSensors>;
  sectionLabelMap: Record<string, string>;
  toggleSectionVisible: (index: number) => void;
  onConfigChange: (config: MutableConfig) => void;
  /** Fallback sections from the template manifest — used when config.sections is empty or undefined. */
  manifestSections?: MutableSectionEntry[];
}

export function SectionsPanel({
  config,
  sensors,
  sectionLabelMap,
  toggleSectionVisible,
  onConfigChange,
  manifestSections,
}: SectionsPanelProps) {
  // Prefer config.sections when it has entries; fall back to manifestSections for
  // cases where the config was loaded from an external source without sections data.
  const sections: MutableSectionEntry[] =
    config.sections?.length ? config.sections : (manifestSections ?? []);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = sections.findIndex((s: MutableSectionEntry) => s.id === active.id);
    const newIndex = sections.findIndex((s: MutableSectionEntry) => s.id === over.id);
    onConfigChange({ ...config, sections: arrayMove([...sections], oldIndex, newIndex) });
  }

  if (sections.length === 0) {
    return (
      <p style={{ color: "#555", fontSize: "12px" }}>
        No hay secciones configuradas para esta plantilla.
      </p>
    );
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {sections.map((section, index) => (
            <SortableSectionItem
              key={section.id}
              section={section}
              label={sectionLabelMap[section.id] ?? section.id}
              onToggle={() => toggleSectionVisible(index)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
