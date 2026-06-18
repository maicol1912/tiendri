"use client";

// CategoryNav variant: CHIPS
// Horizontally wrapping pill buttons. Active: --t-primary fill.

import { memo } from "react";
import type React from "react";
import type { CategoryNavSlotProps } from "./types";

const Chips = memo(function Chips({
  categories,
  activeCategoryId,
  onCategoryClick,
}: CategoryNavSlotProps) {
  return (
    <>
      <div className="mb-8">
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
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isActive = activeCategoryId === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors cursor-pointer
                ${
                  isActive
                    ? "bg-[var(--t-primary)] text-[var(--t-on-primary)] border-[var(--t-primary)]"
                    : "bg-[var(--t-card)] text-[var(--t-primary)] border-[var(--t-border)] hover:border-[var(--t-primary)]"
                }`}
              onClick={() => onCategoryClick?.(cat.id)}
              aria-pressed={isActive}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </>
  );
});

export default Chips;
