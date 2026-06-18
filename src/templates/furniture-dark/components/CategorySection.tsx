// Furniture Dark — CategoryPill
// Horizontal pill: circular 42×42 image + text label
// Active: categoryActiveBg + yellow text; Inactive: surface bg + text-primary
// ALL colors via var(--t-*)

import Image from "next/image";
import type { Category } from "../types";

interface CategorySectionProps {
  category: Category;
  isActive?: boolean;
  onClick?: (categoryId: string) => void;
}

export function CategorySection({ category, isActive = false, onClick }: CategorySectionProps) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(category.id)}
      aria-label={category.name}
      aria-pressed={isActive}
      className="flex items-center gap-2 px-3 py-2 rounded-[var(--t-radius-category)] flex-shrink-0 transition-colors"
      style={{
        backgroundColor: isActive ? "var(--t-category-active-bg)" : "var(--t-surface)",
      }}
    >
      {/* Circular category image */}
      <div className="relative w-[42px] h-[42px] rounded-full overflow-hidden flex-shrink-0">
        {category.image ? (
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="42px"
            className="object-cover"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: "var(--t-border)" }}
          >
            <span
              className="text-[var(--t-muted)]"
              style={{ fontFamily: "var(--font-body, 'Urbanist', sans-serif)", fontSize: "11px" }}
            >
              {category.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Label */}
      <span
        className="whitespace-nowrap font-medium"
        style={{
          fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
          fontSize: "13px",
          fontWeight: 500,
          color: isActive ? "var(--t-category-active-text)" : "var(--t-foreground)",
          letterSpacing: "-0.26px",
        }}
      >
        {category.name}
      </span>
    </button>
  );
}
