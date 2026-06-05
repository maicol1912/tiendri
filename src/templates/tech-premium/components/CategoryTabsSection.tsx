"use client";

// Tech Premium Template — Category Tabs Section
// Used when categoryNavStyle = "tabs". Keeps its own active-tab state
// so HomePage can stay purely presentational.

import { useState } from "react";
import { CategorySection } from "./CategorySection";
import type { Category } from "../types";

interface CategoryTabsSectionProps {
  categories: Category[];
  activeCategoryId?: string | null;
  onCategoryClick?: (id: string) => void;
}

export function CategoryTabsSection({
  categories,
  activeCategoryId,
  onCategoryClick,
}: CategoryTabsSectionProps) {
  const [activeTabId, setActiveTabId] = useState<string | null>(
    categories[0]?.id ?? null,
  );

  const resolvedActiveId = activeCategoryId ?? activeTabId;

  function handleTabClick(id: string) {
    setActiveTabId(id);
    onCategoryClick?.(id);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Tab bar */}
      <div
        className="flex overflow-x-auto gap-1 border-b border-[var(--t-nav-border)] pb-0"
        role="tablist"
        aria-label="Categorías"
        style={{ scrollbarWidth: "none" }}
      >
        {categories.map((cat) => {
          const isActive = resolvedActiveId === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`shrink-0 px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer bg-transparent
                ${isActive
                  ? "border-[var(--t-primary)] text-[var(--t-text-primary)]"
                  : "border-transparent text-[var(--t-text-muted)] hover:text-[var(--t-text-primary)]"
                }`}
              onClick={() => handleTabClick(cat.id)}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Active category item */}
      <div className="flex justify-center">
        {categories
          .filter((cat) => cat.id === resolvedActiveId)
          .map((cat) => (
            <CategorySection
              key={cat.id}
              category={cat}
              isActive
              onClick={() => handleTabClick(cat.id)}
            />
          ))}
      </div>
    </div>
  );
}
