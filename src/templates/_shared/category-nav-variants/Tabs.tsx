'use client';

import { useState } from 'react';
import type React from 'react';
import { Smartphone, type LucideIcon } from 'lucide-react';
import type { CategoryNavProps } from './types';
import type { Category } from '@/types/store';

// Minimal icon map for category display — tech-premium specific icons are NOT imported.
// Add more Lucide icons here as needed when new templates register categories.
const ICON_MAP: Record<string, LucideIcon> = {
  Smartphone,
  Phone: Smartphone,
};

function CategoryCard({
  category,
  isActive,
  onClick,
}: {
  category: Category;
  isActive?: boolean;
  onClick?: () => void;
}) {
  const Icon = ICON_MAP[category.icon] ?? ICON_MAP[category.name] ?? Smartphone;
  return (
    <button
      type="button"
      className={`flex flex-col items-center justify-center gap-2 rounded-[var(--t-radius-category)] cursor-pointer border-none transition-colors shrink-0
        w-[100px] h-[100px] lg:w-[160px] lg:h-[128px]
        ${isActive ? 'bg-[var(--t-primary)] text-[var(--t-on-primary)]' : 'bg-[var(--t-card)] text-[var(--t-primary)] hover:bg-[var(--t-border)]'}`}
      onClick={onClick}
      aria-label={category.name}
      aria-pressed={isActive}
    >
      <Icon className="w-8 h-8 lg:w-12 lg:h-12" strokeWidth={1.5} />
      <span className="text-xs lg:text-base font-medium leading-6 text-center whitespace-nowrap">
        {category.name}
      </span>
    </button>
  );
}

export default function Tabs({
  categories,
  activeCategoryId,
  onCategoryClick,
}: CategoryNavProps) {
  const [activeTabId, setActiveTabId] = useState<string | null>(
    categories[0]?.id ?? null,
  );

  const resolvedActiveId = activeCategoryId ?? activeTabId;

  function handleTabClick(id: string) {
    setActiveTabId(id);
    onCategoryClick?.(id);
  }

  return (
    <>
      <div className="mb-8">
        <h2
          id="categories-heading"
          className="text-[var(--t-foreground)] tracking-[0.24px]"
          style={{
            fontWeight: 'var(--t-type-heading-weight, 500)' as React.CSSProperties['fontWeight'],
            fontSize: 'var(--t-type-heading-size, 1.5rem)',
            letterSpacing: 'var(--t-type-heading-tracking, 0.24px)',
            textTransform: 'var(--t-type-heading-transform, none)' as React.CSSProperties['textTransform'],
          }}
        >
          Explorar por categoría
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        <div
          className="flex overflow-x-auto gap-1 border-b border-[var(--t-border)] pb-0"
          role="tablist"
          aria-label="Categorías"
          style={{ scrollbarWidth: 'none' }}
        >
          {categories.map((cat) => {
            const isActive = resolvedActiveId === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`shrink-0 px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer bg-transparent
                  ${isActive
                    ? 'border-[var(--t-primary)] text-[var(--t-foreground)]'
                    : 'border-transparent text-[var(--t-muted)] hover:text-[var(--t-foreground)]'
                  }`}
                onClick={() => handleTabClick(cat.id)}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        <div className="flex justify-center">
          {categories
            .filter((cat) => cat.id === resolvedActiveId)
            .map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                isActive
                onClick={() => handleTabClick(cat.id)}
              />
            ))}
        </div>
      </div>
    </>
  );
}
