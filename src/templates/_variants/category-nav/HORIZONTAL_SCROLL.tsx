"use client";

// CategoryNav variant: HORIZONTAL_SCROLL
// Grid with chevron navigation buttons in the header row.
// Uses CategoryItem from _shared/components.

import { memo } from "react";
import type React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CategoryItem } from "@/templates/_shared/components/CategoryItem";
import { gridColsClass } from "@/templates/_shared/utils/grid-classes";
import type { CategoryNavSlotProps } from "./types";

const HorizontalScroll = memo(function HorizontalScroll({
  categories,
  activeCategoryId,
  onCategoryClick,
  gridMobile = 3,
  gridDesktop = 6,
}: CategoryNavSlotProps) {
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h2
          id="categories-heading"
          className="text-[var(--t-foreground)] tracking-[0.24px]"
          style={{
            fontWeight:
              "var(--t-type-heading-weight, 500)" as React.CSSProperties["fontWeight"],
            fontSize: "var(--t-type-heading-size, 1.5rem)",
            letterSpacing: "var(--t-type-heading-tracking, 0.24px)",
            textTransform:
              "var(--t-type-heading-transform, none)" as React.CSSProperties["textTransform"],
          }}
        >
          Explorar por categoría
        </h2>
        <div className="flex gap-4">
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-transparent border-none cursor-pointer text-[var(--t-foreground)]/40 hover:text-[var(--t-foreground)] transition-colors"
            aria-label="Categorías anteriores"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-transparent border-none cursor-pointer text-[var(--t-foreground)]/40 hover:text-[var(--t-foreground)] transition-colors"
            aria-label="Siguientes categorías"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        className={`grid ${gridColsClass(gridMobile, gridDesktop)}`}
        style={{ gap: "var(--t-space-gap, 1rem)" }}
      >
        {categories.map((cat) => (
          <CategoryItem
            key={cat.id}
            name={cat.name}
            icon={cat.icon}
            image={cat.image}
            productCount={cat.productCount}
            isActive={activeCategoryId === cat.id}
            onClick={() => onCategoryClick?.(cat.id)}
            displayType={cat.image ? "image-text" : "icon-text"}
          />
        ))}
      </div>
    </>
  );
});

export default HorizontalScroll;
