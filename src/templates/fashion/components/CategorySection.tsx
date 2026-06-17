'use client';

// Fashion Template — Category Section
// Horizontal scrollable category filter pills.
// Monochromatic B&W style — sharp edges, minimal.

import { useRef, useEffect } from "react";
import { CategoryItem } from '@/templates/_shared/components/CategoryItem';
import type { CategoryDisplayType } from '@/templates/_shared/components/CategoryItem';
import type { Category } from "../types";

interface CategorySectionProps {
  categories: Category[];
  activeCategoryId?: string | null;
  onCategoryChange?: (id: string | null) => void;
  displayType?: CategoryDisplayType;
}

export function CategorySection({
  categories,
  activeCategoryId = null,
  onCategoryChange,
  displayType = 'text-only',
}: CategorySectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Wheel → horizontal scroll
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

  const allItems: Array<{ id: string | null; name: string; icon?: string; image?: string; productCount?: number }> = [
    { id: null, name: "Todos" },
    ...categories.map((c) => ({ id: c.id, name: c.name, icon: c.icon, image: c.image, productCount: c.productCount })),
  ];

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto pb-0.5"
      style={{ scrollbarWidth: "none" }}
      aria-label="Filtrar por categoría"
    >
      {allItems.map((item) => {
        const isActive = activeCategoryId === item.id;
        return (
          <CategoryItem
            key={item.id ?? "all"}
            name={item.name}
            icon={item.icon}
            image={item.image}
            productCount={item.id !== null ? item.productCount : undefined}
            isActive={isActive}
            onClick={() => onCategoryChange?.(item.id)}
            displayType={displayType}
          />
        );
      })}
    </div>
  );
}
