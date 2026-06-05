"use client";

// Beauty Soft Template — Category Nav (horizontal scroll with thumbnails)
// Wheel-to-horizontal-scroll per tiendri-rules.md section 6.1.
// ZERO hardcoded colors — all via var(--t-*).

import { useRef, useEffect } from "react";
import type { BeautySoftCategory } from "../types";

interface CategorySectionProps {
  categories: BeautySoftCategory[];
  activeCategoryId?: string | null;
  onCategoryChange?: (id: string | null) => void;
  onSeeAll?: () => void;
}

export function CategorySection({
  categories,
  activeCategoryId = null,
  onCategoryChange,
  onSeeAll,
}: CategorySectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Wheel-to-horizontal-scroll per tiendri-rules.md section 6.1
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handler = (e: WheelEvent) => {
      e.preventDefault();
      el.scrollLeft += e.deltaY * 2.5;
    };

    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, []);

  return (
    <section className="flex flex-col gap-[11px]">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <h2
          className="text-base font-medium text-[var(--t-text-primary)] leading-[22px] tracking-[-0.408px] m-0"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Categorías
        </h2>
        <button
          type="button"
          className="text-sm font-normal text-[var(--t-text-muted)] bg-transparent border-none cursor-pointer p-0 leading-[22px] tracking-[-0.408px]"
          style={{ fontFamily: "var(--font-sans)" }}
          onClick={onSeeAll}
        >
          Ver todo
        </button>
      </div>

      {/* Horizontal scroll thumbnails */}
      <div
        ref={scrollRef}
        className="flex items-start gap-[10px] overflow-x-auto pb-1"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
        role="list"
        aria-label="Categorías de productos"
      >
        {categories.map((cat) => {
          const isActive = activeCategoryId === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              role="listitem"
              className="flex flex-col items-center gap-[5px] flex-shrink-0 bg-transparent border-none cursor-pointer p-0"
              onClick={() => onCategoryChange?.(cat.id)}
              aria-pressed={isActive}
              aria-label={cat.name}
            >
              {/* Category thumbnail */}
              <div
                className="overflow-hidden flex items-center justify-center"
                style={{
                  width: "80.75px",
                  height: "80px",
                  borderRadius: "var(--t-radius-category)",
                  backgroundColor: "var(--t-surface)",
                  border: isActive
                    ? "2px solid var(--t-category-active-bg)"
                    : "2px solid transparent",
                }}
              >
                {cat.imageUrl ? (
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect width="24" height="24" rx="4" fill="rgba(255,255,255,0.3)" />
                    <path
                      d="M3 18l5-5 4 4 4-6 8 7"
                      stroke="rgba(255,255,255,0.6)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                )}
              </div>

              {/* Category label */}
              <span
                className="text-sm leading-[22px] tracking-[-0.408px] whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "var(--t-category-active-bg)" : "var(--t-text-primary)",
                }}
              >
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
