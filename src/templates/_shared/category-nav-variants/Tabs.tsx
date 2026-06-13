'use client';

import { useState } from 'react';
import type React from 'react';
import { CategorySection } from '@/templates/tech-premium/components/CategorySection';
import type { CategoryNavProps } from './types';

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
              <CategorySection
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
