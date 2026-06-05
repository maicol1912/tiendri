"use client";

// Pets Classic — Category Icon Card
// SVG icons from Figma assets. Active: primary bg + white inner rect.
// All colors via var(--t-*)

import Image from "next/image";
import { useRef, useEffect } from "react";
import type { PetsClassicCategory } from "../types";

interface CategoryIconItemProps {
  category: PetsClassicCategory;
  isActive?: boolean;
  onClick?: (id: string) => void;
}

export function CategoryIconItem({ category, isActive = false, onClick }: CategoryIconItemProps) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(category.id)}
      className="flex flex-col items-center gap-1 flex-shrink-0"
      style={{ background: "none", border: "none", cursor: "pointer", minWidth: 54 }}
      aria-label={category.name}
      aria-pressed={isActive}
    >
      {/* Icon container */}
      <div
        className="relative flex items-center justify-center"
        style={{
          width: 54,
          height: 54,
          borderRadius: "var(--t-radius-category)",
          backgroundColor: isActive ? "var(--t-category-active-bg)" : "var(--t-card-bg)",
          transition: "all 0.15s ease",
          boxShadow: isActive
            ? "0 4px 4px rgba(0,0,0,0.15)"
            : "0 1px 2px rgba(0,0,0,0.2), 0 2px 6px 2px rgba(0,0,0,0.1)",
        }}
      >
        {/* Active: white inner rect */}
        {isActive && (
          <div
            className="absolute flex items-center justify-center"
            style={{
              width: 44,
              height: 44,
              borderRadius: "calc(var(--t-radius-category) - 4px)",
              backgroundColor: "var(--t-card-bg)",
              top: 4,
              left: 5,
            }}
          />
        )}
        <Image
          src={category.iconSrc}
          alt=""
          width={28}
          height={28}
          className="relative z-10 object-contain"
          aria-hidden="true"
        />
      </div>

      <span
        style={{
          fontSize: "10px",
          fontWeight: 500,
          color: "var(--t-text-primary)",
          transition: "color 0.15s ease",
          whiteSpace: "nowrap",
        }}
      >
        {category.name}
      </span>
    </button>
  );
}

// ── Category Row ──────────────────────────────────────────────────────────────

interface CategoryRowProps {
  categories: PetsClassicCategory[];
  activeCategoryId: string | null;
  onCategoryChange?: (id: string | null) => void;
}

export function CategoryRow({ categories, activeCategoryId, onCategoryChange }: CategoryRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rowRef.current;
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
      ref={rowRef}
      className="flex overflow-x-auto gap-4 pb-1"
      style={{ scrollbarWidth: "none" }}
      role="group"
      aria-label="Categorías de productos"
    >
      {categories.map((cat) => (
        <CategoryIconItem
          key={cat.id}
          category={cat}
          isActive={activeCategoryId === cat.id}
          onClick={(id) => {
            // Toggle off if already active
            onCategoryChange?.(activeCategoryId === id ? null : id);
          }}
        />
      ))}
    </div>
  );
}
