"use client";

// Pets Classic — Category Icon Card
// SVG icons from Figma assets. Active: primary bg + white inner rect.
// All colors via var(--t-*)
// Press spring + active transition gated by animationLevel prop.

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import type { PetsClassicCategory } from "../types";

type AnimationLevel = "full" | "subtle" | "none";

interface CategoryIconItemProps {
  category: PetsClassicCategory;
  isActive?: boolean;
  animationLevel?: AnimationLevel;
  onClick?: (id: string) => void;
}

export function CategoryIconItem({
  category,
  isActive = false,
  animationLevel = "none",
  onClick,
}: CategoryIconItemProps) {
  const [isPressed, setIsPressed] = useState(false);

  // Active indicator transition: 200ms cubic-bezier(0.23, 1, 0.32, 1) for "full" and "subtle"
  const hasActiveTransition = animationLevel === "full" || animationLevel === "subtle";
  // Press spring (scale down on :active) only for "full"
  const hasPressSpring = animationLevel === "full";

  // Compute transform for the icon container
  const containerTransform = hasPressSpring && isPressed ? "scale(0.94)" : "scale(1)";

  return (
    <button
      type="button"
      onClick={() => onClick?.(category.id)}
      className="flex flex-col items-center gap-1 flex-shrink-0"
      style={{ background: "none", border: "none", cursor: "pointer", minWidth: 54 }}
      aria-label={category.name}
      aria-pressed={isActive}
      onMouseDown={() => hasPressSpring && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => hasPressSpring && setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
    >
      {/* Icon container */}
      <div
        className="relative flex items-center justify-center"
        style={{
          width: 54,
          height: 54,
          borderRadius: "var(--t-radius-category)",
          backgroundColor: isActive ? "var(--t-category-active-bg)" : "var(--t-card-bg)",
          // Active state transition: smooth bg + shadow swap
          transition: hasActiveTransition
            ? "background-color 200ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 200ms cubic-bezier(0.23, 1, 0.32, 1), transform 100ms ease-out"
            : "all 0.15s ease",
          transform: containerTransform,
          boxShadow: isActive
            ? "0 4px 4px rgba(0,0,0,0.15)"
            : "0 1px 2px rgba(0,0,0,0.2), 0 2px 6px 2px rgba(0,0,0,0.1)",
          willChange: hasPressSpring ? "transform" : undefined,
        }}
      >
        {/* Active: white inner rect — fades in smoothly */}
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
          transition: hasActiveTransition ? "color 200ms cubic-bezier(0.23, 1, 0.32, 1)" : "color 0.15s ease",
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
  animationLevel?: AnimationLevel;
  onCategoryChange?: (id: string | null) => void;
}

export function CategoryRow({
  categories,
  activeCategoryId,
  animationLevel = "none",
  onCategoryChange,
}: CategoryRowProps) {
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
          animationLevel={animationLevel}
          onClick={(id) => {
            // Toggle off if already active
            onCategoryChange?.(activeCategoryId === id ? null : id);
          }}
        />
      ))}
    </div>
  );
}
