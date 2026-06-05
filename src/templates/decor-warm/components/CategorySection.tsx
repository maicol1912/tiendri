"use client";

// Decor Warm Template — Category Section
// 66px linen rounded square with Lucide icon.
// Active: peach background, white icon.

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
  type LucideIcon,
} from "lucide-react";
import type { DecorWarmCategoryIcon } from "../types";

// ── Icon registry ──────────────────────────────────────────────────────────────
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
};

interface CategorySectionProps {
  category: DecorWarmCategoryIcon;
  isActive?: boolean;
  onClick?: () => void;
}

export function CategorySection({
  category,
  isActive = false,
  onClick,
}: CategorySectionProps) {
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
          backgroundColor: isActive ? "var(--t-peach)" : "var(--t-surface)",
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
            color: isActive ? "#FFFFFF" : "var(--t-primary)",
            transition: "color 0.15s ease",
          }}
        />
      </div>

      {/* Category name */}
      <span
        style={{
          color: isActive ? "var(--t-primary)" : "var(--t-text-secondary)",
          fontFamily: "'League Spartan', sans-serif",
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
