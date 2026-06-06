import type { CategoryNavProps } from './types'

export default function Chips({
  categories,
  activeCategoryId,
  onCategoryClick,
}: CategoryNavProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const isActive = activeCategoryId === cat.id
        return (
          <button
            key={cat.id}
            type="button"
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors cursor-pointer
              ${isActive
                ? 'bg-[var(--t-category-active-bg)] text-[var(--t-category-active-text)] border-[var(--t-primary)]'
                : 'bg-[var(--t-surface)] text-[var(--t-text-primary)] border-[var(--t-border)] hover:border-[var(--t-primary)]'
              }`}
            onClick={() => onCategoryClick?.(cat.id)}
            aria-pressed={isActive}
          >
            {cat.name}
          </button>
        )
      })}
    </div>
  )
}
