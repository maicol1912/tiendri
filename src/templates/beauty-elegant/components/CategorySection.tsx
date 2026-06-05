"use client";

// Beauty Elegant Template — Category Section
// Horizontal scrollable tabs. Active = primary color with underline indicator.

import type { BeautyElegantCategory } from "../types";

interface CategorySectionProps {
  categories: BeautyElegantCategory[];
  activeCategoryId?: string | null;
  onCategoryChange?: (id: string | null) => void;
}

export function CategorySection({
  categories,
  activeCategoryId = null,
  onCategoryChange,
}: CategorySectionProps) {
  const allItems: Array<{ id: string | null; name: string }> = [
    { id: null, name: "Todos" },
    ...categories.map((c) => ({ id: c.id, name: c.name })),
  ];

  return (
    <div className="flex items-center gap-6 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
      {allItems.map((item) => {
        const isActive = activeCategoryId === item.id;
        return (
          <button
            key={item.id ?? "all"}
            type="button"
            className="flex-shrink-0 relative pb-1 transition-colors duration-200"
            style={{
              fontSize: "14px",
              fontWeight: isActive ? 600 : 500,
              color: isActive ? "var(--t-tab-active)" : "var(--t-text-secondary)",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              lineHeight: "20px",
            }}
            onClick={() => onCategoryChange?.(item.id)}
            aria-current={isActive ? "true" : undefined}
          >
            {item.name}
            {isActive && (
              <span
                className="absolute bottom-0 left-0 right-0"
                style={{
                  height: "2px",
                  backgroundColor: "var(--t-tab-active)",
                  borderRadius: "1px",
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
