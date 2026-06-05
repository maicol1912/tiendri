"use client";

// Furniture Light — Category Icon Circles
// Displays categories as icon circles (rounded square) with label below.
// Active: orange border + tinted bg. Inactive: plain surface bg.
// Horizontal scroll on mobile, grid on desktop.
// ZERO hardcoded colors.

import { Armchair, Table, Archive, Sofa, BedDouble, UtensilsCrossed, Bath, Monitor } from "lucide-react";
import type { FurnitureCategory } from "../types";

interface CategorySectionProps {
  categories: FurnitureCategory[];
  activeCategoryId: string | null;
  onCategoryChange?: (id: string | null) => void;
}

const CATEGORY_ICON_MAP: Record<string, React.ReactNode> = {
  table:     <Table     size={20} strokeWidth={1.8} style={{ color: "var(--t-text-primary)" }} />,
  chair:     <Armchair  size={20} strokeWidth={1.8} style={{ color: "var(--t-text-primary)" }} />,
  cabinet:   <Archive   size={20} strokeWidth={1.8} style={{ color: "var(--t-text-primary)" }} />,
  sofa:      <Sofa      size={20} strokeWidth={1.8} style={{ color: "var(--t-text-primary)" }} />,
  bed:       <BedDouble size={20} strokeWidth={1.8} style={{ color: "var(--t-text-primary)" }} />,
  kitchen:   <UtensilsCrossed size={20} strokeWidth={1.8} style={{ color: "var(--t-text-primary)" }} />,
  bathroom:  <Bath      size={20} strokeWidth={1.8} style={{ color: "var(--t-text-primary)" }} />,
  workspace: <Monitor   size={20} strokeWidth={1.8} style={{ color: "var(--t-text-primary)" }} />,
};

function getCategoryIcon(name: string, icon?: string): React.ReactNode {
  if (icon && CATEGORY_ICON_MAP[icon]) return CATEGORY_ICON_MAP[icon];
  const lower = name.toLowerCase();
  for (const [key, el] of Object.entries(CATEGORY_ICON_MAP)) {
    if (lower.includes(key)) return el;
  }
  return <Armchair size={20} strokeWidth={1.8} style={{ color: "var(--t-text-primary)" }} />;
}

export function CategorySection({ categories, activeCategoryId, onCategoryChange }: CategorySectionProps) {
  return (
    <section
      aria-label="Categorías"
      className="px-5 md:px-6 lg:px-8"
    >
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <h2
          className="text-base font-bold text-[var(--t-text-primary)]"
          style={{ fontFamily: "var(--font-display, var(--font-sans, 'Inter', sans-serif))" }}
        >
          Categorías
        </h2>
        <button className="text-xs font-semibold text-[var(--t-primary)]">
          Ver todos
        </button>
      </div>

      {/* Icon circles — horizontal scroll mobile, max 5 grid desktop */}
      <div
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-1 md:grid md:grid-cols-5 lg:max-w-xl lg:gap-4"
        role="tablist"
        aria-label="Categorías"
      >
        {(categories.length > 0 ? categories : [
          { id: "table",   name: "Mesa"    },
          { id: "chair",   name: "Silla"   },
          { id: "cabinet", name: "Gabinete"},
          { id: "sofa",    name: "Sofá"    },
          { id: "bed",     name: "Cama"    },
        ] as FurnitureCategory[]).slice(0, 5).map((cat) => {
          const isActive = activeCategoryId === cat.id;
          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onCategoryChange?.(cat.id)}
              className="shrink-0 flex flex-col items-center gap-2 min-w-[56px] group"
            >
              {/* Icon square */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center transition-colors"
                style={{
                  backgroundColor: isActive
                    ? "var(--t-category-icon-active-bg, #FFF3E6)"
                    : "var(--t-surface)",
                  border: isActive
                    ? "2px solid var(--t-primary)"
                    : "none",
                }}
              >
                {getCategoryIcon(cat.name, cat.icon)}
              </div>
              {/* Label */}
              <span className="text-[11px] font-medium text-[var(--t-text-muted)]">
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
