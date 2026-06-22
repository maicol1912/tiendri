"use client";

// CategoryNav variant: COLUMNAR
// Horizontal scroll row of 66px icon squares with label below.
// Active: --t-primary background + white icon. Inactive: --t-secondary background + --t-primary icon.
// Extracted and adapted from decor-warm/components/CategorySection.tsx.

import { memo } from "react";
import {
  Sofa,
  BedDouble,
  Lamp,
  Armchair,
  BookOpen,
  Archive,
  LayoutGrid,
  Star,
  Package,
  Layers,
  UtensilsCrossed,
  Flower2,
  Bath,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import type { CategoryNavSlotProps } from "./types";
import type { StorefrontCategory } from "@/types/domain/store";

// Icon registry — add more Lucide icons here as new templates register categories.
const ICON_MAP: Record<string, LucideIcon> = {
  Sofa,
  BedDouble,
  Lamp,
  Armchair,
  BookOpen,
  Archive,
  LayoutGrid,
  Star,
  Package,
  Layers,
  UtensilsCrossed,
  Flower2,
  Bath,
  Smartphone,
  Phone: Smartphone,
};

interface ColumnarItemProps {
  category: StorefrontCategory;
  isActive: boolean;
  onClick: () => void;
}

function ColumnarItem({ category, isActive, onClick }: ColumnarItemProps) {
  const IconComponent: LucideIcon = ICON_MAP[category.icon] ?? LayoutGrid;

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 flex-shrink-0"
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        minWidth: 72,
      }}
      aria-label={category.name}
      aria-pressed={isActive}
    >
      {/* Icon square */}
      <div
        style={{
          width: 66,
          height: 66,
          borderRadius: "var(--t-radius-category)",
          backgroundColor: isActive
            ? "var(--t-primary)"
            : "var(--t-secondary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background-color 0.15s ease",
        }}
      >
        <IconComponent
          size={26}
          strokeWidth={1.5}
          style={{
            color: isActive ? "var(--t-on-primary)" : "var(--t-primary)",
            transition: "color 0.15s ease",
          }}
        />
      </div>

      {/* Category name */}
      <span
        style={{
          color: isActive ? "var(--t-primary)" : "var(--t-muted)",
          fontFamily: "var(--font-sans)",
          fontSize: "11px",
          fontWeight: isActive ? 500 : 400,
          textAlign: "center",
          maxWidth: 72,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          transition: "color 0.15s ease",
        }}
      >
        {category.name}
      </span>
    </button>
  );
}

const Columnar = memo(function Columnar({
  categories,
  activeCategoryId,
  onCategoryClick,
}: CategoryNavSlotProps) {
  return (
    <div
      className="flex flex-row gap-3 overflow-x-auto py-2"
      style={{ scrollbarWidth: "none" }}
      aria-label="Categorías"
    >
      {categories.map((cat) => (
        <ColumnarItem
          key={cat.id}
          category={cat}
          isActive={activeCategoryId === cat.id}
          onClick={() => onCategoryClick?.(cat.id)}
        />
      ))}
    </div>
  );
});

export default Columnar;
