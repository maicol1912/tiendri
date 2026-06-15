import { CategorySection } from '@/templates/tech-premium/components/CategorySection';
import { gridColsClass } from '@/templates/_shared/utils/grid-classes';
import type React from 'react';
import type { CategoryNavProps } from './types';

export default function Grid({
  categories,
  activeCategoryId,
  onCategoryClick,
  gridMobile = 2,
  gridDesktop = 3,
}: CategoryNavProps) {
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
      <div
        className={`grid ${gridColsClass(gridMobile, gridDesktop)}`}
        style={{ gap: 'var(--t-space-gap, 1rem)' }}
      >
        {categories.map((cat) => (
          <CategorySection
            key={cat.id}
            category={cat}
            isActive={activeCategoryId === cat.id}
            onClick={() => onCategoryClick?.(cat.id)}
          />
        ))}
      </div>
    </>
  );
}
