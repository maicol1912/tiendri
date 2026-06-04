"use client";

// Decor Warm Template — Pipe-Separated Category Tab Bar
// Filter tabs with | separators. Active: primary color, Poppins Medium.
// Inactive: textSubtle color, Poppins Regular.

import { useRef, useEffect } from "react";
import type { DecorWarmCategory } from "../types";

interface CategoryTabBarProps {
  categories: DecorWarmCategory[];
  activeCategoryId?: string | null;
  onCategoryChange?: (id: string | null) => void;
}

export function CategoryTabBar({
  categories,
  activeCategoryId = null,
  onCategoryChange,
}: CategoryTabBarProps) {
  if (categories.length === 0) return null;

  // wheel-to-horizontal-scroll
  const scrollRef = useRef<HTMLDivElement>(null);
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
    <div
      ref={scrollRef}
      className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="flex items-center gap-0 px-4 md:px-6 lg:px-8 py-1 min-w-max">
        {categories.map((cat, index) => {
          const isActive = activeCategoryId === cat.id;
          const isLast = index === categories.length - 1;

          return (
            <div key={cat.id} className="flex items-center">
              <button
                type="button"
                onClick={() => onCategoryChange?.(isActive ? null : cat.id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  paddingLeft: 12,
                  paddingRight: 12,
                  paddingTop: 4,
                  paddingBottom: 4,
                  color: isActive ? "var(--t-primary)" : "var(--t-text-subtle)",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "16px",
                  fontWeight: isActive ? 500 : 400,
                  whiteSpace: "nowrap",
                  transition: "color 0.15s ease",
                }}
                aria-label={cat.name}
                aria-pressed={isActive}
              >
                {cat.name}
              </button>

              {/* Pipe separator */}
              {!isLast && (
                <span
                  aria-hidden="true"
                  style={{
                    color: "var(--t-text-subtle)",
                    fontFamily: "'League Spartan', sans-serif",
                    fontSize: "16px",
                    fontWeight: 300,
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  |
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
