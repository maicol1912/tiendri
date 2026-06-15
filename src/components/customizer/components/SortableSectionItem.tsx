"use client";

import { GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { MutableSectionEntry } from "../types";

interface SortableSectionItemProps {
  section: MutableSectionEntry;
  label: string;
  onToggle: () => void;
}

export function SortableSectionItem({ section, label, onToggle }: SortableSectionItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: section.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 10px",
        background: "#222",
        borderRadius: "8px",
        border: "1px solid #2a2a2a",
      }}
    >
      <button
        {...attributes}
        {...listeners}
        aria-label="Arrastrar para reordenar"
        style={{
          background: "transparent",
          border: "none",
          padding: "2px",
          cursor: "grab",
          color: "#444",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "color 0.15s",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#888"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#444"; }}
      >
        <GripVertical size={14} />
      </button>

      <input
        type="checkbox"
        checked={section.visible}
        onChange={onToggle}
        style={{ width: "14px", height: "14px", accentColor: "#4a9eff", cursor: "pointer", flexShrink: 0 }}
      />

      <span style={{ flex: 1, fontSize: "12px", color: section.visible ? "#e5e5e5" : "#555", transition: "color 0.15s" }}>
        {label}
      </span>
    </div>
  );
}
