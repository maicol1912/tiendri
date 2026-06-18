"use client";

// Food Night — Category Filter Pills
// Horizontal scroll with wheel handler (tiendri-rules.md §6.1).

import { useRef, useEffect } from "react";
import type { Category } from "../types";

interface CategorySectionProps {
  categories: Category[];
  activeCategoryId: string | null;
  onCategoryChange?: (id: string | null) => void;
}

export function CategorySection({
  categories,
  activeCategoryId,
  onCategoryChange,
}: CategorySectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Wheel → horizontal scroll (tiendri-rules.md §6.1)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      el.scrollLeft += e.deltaY * 2.5;
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, []);

  const allCategory: Category = { id: "__all__", name: "Todos", slug: "__all__", icon: "LayoutGrid" };
  const allItems = [allCategory, ...categories];

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto pb-0.5"
      style={{ scrollbarWidth: "none" }}
      aria-label="Filtrar por categoría"
    >
      {allItems.map((cat) => {
        const isActive =
          cat.id === "__all__" ? activeCategoryId === null : activeCategoryId === cat.id;

        return (
          <button
            key={cat.id}
            type="button"
            className="shrink-0 px-4 py-1.5 text-[13px] whitespace-nowrap transition-colors"
            style={{
              borderRadius: "var(--t-radius-category)",
              backgroundColor: isActive ? "var(--t-category-active-bg)" : "transparent",
              color: isActive ? "var(--t-category-active-text)" : "var(--t-foreground)",
              border: isActive ? "1px solid var(--t-category-active-bg)" : "1px solid var(--t-border-light)",
              fontWeight: isActive ? 600 : 400,
              cursor: "pointer",
            }}
            onClick={() => onCategoryChange?.(cat.id === "__all__" ? null : cat.id)}
            aria-pressed={isActive}
            aria-label={`Filtrar por ${cat.name}`}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
