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
}

export function SectionsPanel({
  config,
  sensors,
  sectionLabelMap,
  toggleSectionVisible,
  onConfigChange,
}: SectionsPanelProps) {
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = config.sections.findIndex((s: MutableSectionEntry) => s.id === active.id);
    const newIndex = config.sections.findIndex((s: MutableSectionEntry) => s.id === over.id);
    onConfigChange({ ...config, sections: arrayMove([...config.sections], oldIndex, newIndex) });
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={config.sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {config.sections.map((section, index) => (
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
