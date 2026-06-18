"use client";

// CategoryNav variant: CHIPS
// chipStyle="underline" (default): plain text + active underline — beauty-elegant style.
// chipStyle="pills": filled pill buttons with border — original style.
// chipStyle="bordered": transparent border inactive, filled foreground active — food-night style.

import { memo } from "react";
import type { CategoryNavSlotProps } from "./types";

const Chips = memo(function Chips({
  categories,
  activeCategoryId,
  onCategoryClick,
  chipStyle = "underline",
}: CategoryNavSlotProps) {
  const isAllActive = activeCategoryId == null || activeCategoryId === "";

  if (chipStyle === "pills") {
    return (
      <div className="flex flex-wrap gap-2">
        {/* "Todos" chip — activo cuando no hay categoría seleccionada */}
        <button
          type="button"
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors cursor-pointer
            ${
              isAllActive
                ? "bg-[var(--t-primary)] text-[var(--t-on-primary)] border-[var(--t-primary)]"
                : "bg-[var(--t-card)] text-[var(--t-primary)] border-[var(--t-border)] hover:border-[var(--t-primary)]"
            }`}
          onClick={() => onCategoryClick?.("")}
          aria-pressed={isAllActive}
        >
          Todos
        </button>

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
    );
  }

  // bordered style — horizontal scroll, transparent+bordered inactive, filled foreground active (food-night)
  if (chipStyle === "bordered") {
    return (
      <div className="flex flex-nowrap overflow-x-auto gap-2 scrollbar-hide justify-start">
        {/* "Todos" — activo cuando no hay categoría seleccionada */}
        <button
          type="button"
          className={`shrink-0 whitespace-nowrap px-4 py-1.5 text-[13px] cursor-pointer border transition-colors
            ${
              isAllActive
                ? "font-semibold"
                : "font-normal hover:opacity-80"
            }`}
          style={{
            backgroundColor: isAllActive ? "var(--t-foreground)" : "transparent",
            border: "1px solid var(--t-border)",
            color: isAllActive ? "var(--t-background)" : "var(--t-foreground)",
            borderRadius: "var(--t-radius-category, 8px)",
          }}
          onClick={() => onCategoryClick?.("")}
          aria-pressed={isAllActive}
        >
          Todos
        </button>

        {categories.map((cat) => {
          const isActive = activeCategoryId === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              className={`shrink-0 whitespace-nowrap px-4 py-1.5 text-[13px] cursor-pointer border transition-colors
                ${
                  isActive
                    ? "font-semibold"
                    : "font-normal hover:opacity-80"
                }`}
              style={{
                backgroundColor: isActive ? "var(--t-foreground)" : "transparent",
                border: "1px solid var(--t-border)",
                color: isActive ? "var(--t-background)" : "var(--t-foreground)",
                borderRadius: "var(--t-radius-category, 8px)",
              }}
              onClick={() => onCategoryClick?.(cat.id)}
              aria-pressed={isActive}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    );
  }

  // underline style (default) — plain text, active item gets bottom border in --t-primary
  return (
    <div className="flex flex-nowrap overflow-x-auto gap-4 lg:gap-6 scrollbar-hide">
      {/* "Todos" — activo cuando no hay categoría seleccionada */}
      <button
        type="button"
        className={`text-sm font-medium px-1 py-2 cursor-pointer bg-transparent border-none transition-colors whitespace-nowrap flex-shrink-0
          ${
            isAllActive
              ? "text-[var(--t-primary)] border-b-2 border-[var(--t-primary)]"
              : "text-[var(--t-muted)] hover:text-[var(--t-foreground)]"
          }`}
        onClick={() => onCategoryClick?.("")}
        aria-pressed={isAllActive}
      >
        Todos
      </button>

      {categories.map((cat) => {
        const isActive = activeCategoryId === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            className={`text-sm font-medium px-1 py-2 cursor-pointer bg-transparent border-none transition-colors whitespace-nowrap flex-shrink-0
              ${
                isActive
                  ? "text-[var(--t-primary)] border-b-2 border-[var(--t-primary)]"
                  : "text-[var(--t-muted)] hover:text-[var(--t-foreground)]"
              }`}
            onClick={() => onCategoryClick?.(cat.id)}
            aria-pressed={isActive}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
});

export default Chips;
