"use client";

// CategoryNav variant: HORIZONTAL_SCROLL
// Grid with chevron navigation buttons in the header row.
// Uses CategoryItem from _shared/components.

import { memo } from "react";
import type React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CategoryItem } from "@/templates/_shared/components/CategoryItem";
import type { CategoryNavSlotProps } from "./types";

const HorizontalScroll = memo(function HorizontalScroll({
  categories,
  activeCategoryId,
  onCategoryClick,
  gridMobile = 3,
  gridDesktop = 6,
  heading,
  showViewAll = false,
  onViewAll,
  iconColor,
  size,
}: CategoryNavSlotProps) {
  const sectionHeading = heading ?? "Explorar por categoría";

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
          {sectionHeading}
        </h2>
        {showViewAll ? (
          <button
            type="button"
            className="bg-transparent border-none cursor-pointer text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ color: "var(--t-muted)" }}
            onClick={onViewAll}
          >
            Ver todo
          </button>
        ) : (
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
        )}
      </div>

      <div
        className="flex flex-nowrap overflow-x-auto justify-start"
        style={{
          gap: size === "large" ? "2rem" : "var(--t-space-gap, 1rem)",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {categories.map((cat) => (
          <div key={cat.id} className="flex-shrink-0">
            <CategoryItem
              name={cat.name}
              icon={cat.icon}
              image={cat.image}
              productCount={cat.productCount}
              isActive={activeCategoryId === cat.id}
              onClick={() => onCategoryClick?.(cat.id)}
              displayType={cat.image ? "image-text" : "icon-text"}
              iconColor={iconColor}
              size={size}
            />
          </div>
        ))}
      </div>
    </>
  );
});

export default HorizontalScroll;
