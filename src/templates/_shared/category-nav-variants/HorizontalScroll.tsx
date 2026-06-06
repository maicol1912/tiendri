'use client'

import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { CategoryNavProps } from './types'

export default function HorizontalScroll({
  categories,
  activeCategoryId,
  onCategoryClick,
}: CategoryNavProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const handler = (e: WheelEvent) => {
      e.preventDefault()
      el.scrollLeft += e.deltaY * 2.5
    }

    el.addEventListener('wheel', handler, { passive: false })
    return () => el.removeEventListener('wheel', handler)
  }, [])

  function scrollBy(delta: number) {
    scrollRef.current?.scrollBy({ left: delta, behavior: 'smooth' })
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="w-8 h-8 flex items-center justify-center bg-transparent border-none cursor-pointer text-[var(--t-text-primary)]/40 hover:text-[var(--t-text-primary)] transition-colors shrink-0"
        aria-label="Categorías anteriores"
        onClick={() => scrollBy(-240)}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-2 flex-1"
        style={{ scrollbarWidth: 'none' }}
      >
        {categories.map((cat) => {
          const isActive = activeCategoryId === cat.id
          return (
            <button
              key={cat.id}
              type="button"
              className={`shrink-0 px-4 py-2 rounded-[var(--t-radius-category)] text-sm font-medium border transition-colors cursor-pointer whitespace-nowrap
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

      <button
        type="button"
        className="w-8 h-8 flex items-center justify-center bg-transparent border-none cursor-pointer text-[var(--t-text-primary)]/40 hover:text-[var(--t-text-primary)] transition-colors shrink-0"
        aria-label="Siguientes categorías"
        onClick={() => scrollBy(240)}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}
