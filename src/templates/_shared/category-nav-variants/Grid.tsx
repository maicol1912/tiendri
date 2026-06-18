import { CategoryItem } from '@/templates/_shared/components/CategoryItem';
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
          <CategoryItem
            key={cat.id}
            name={cat.name}
            icon={cat.icon}
            image={cat.image}
            productCount={cat.productCount}
            isActive={activeCategoryId === cat.id}
            onClick={() => onCategoryClick?.(cat.id)}
            displayType={cat.image ? 'image-text' : 'icon-text'}
          />
        ))}
      </div>
    </>
  );
}
