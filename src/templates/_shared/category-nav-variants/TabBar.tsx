'use client'

import { useState } from 'react'
import type { CategoryNavProps } from './types'

export default function TabBar({
  categories,
  activeCategoryId,
  onCategoryClick,
}: CategoryNavProps) {
  const [internalActiveId, setInternalActiveId] = useState<string | null>(
    categories[0]?.id ?? null,
  )

  const resolvedActiveId = activeCategoryId ?? internalActiveId

  function handleClick(id: string) {
    setInternalActiveId(id)
    onCategoryClick?.(id)
  }

  return (
    <div
      className="flex overflow-x-auto gap-1 border-b border-[var(--t-nav-border)] pb-0"
      role="tablist"
      aria-label="Categorías"
      style={{ scrollbarWidth: 'none' }}
    >
      {categories.map((cat) => {
        const isActive = resolvedActiveId === cat.id
        return (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`shrink-0 px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer bg-transparent border-x-0 border-t-0
              ${isActive
                ? 'border-b-[var(--t-primary)] text-[var(--t-text-primary)]'
                : 'border-b-transparent text-[var(--t-text-muted)] hover:text-[var(--t-text-primary)]'
              }`}
            onClick={() => handleClick(cat.id)}
          >
            {cat.name}
          </button>
        )
      })}
    </div>
  )
}
