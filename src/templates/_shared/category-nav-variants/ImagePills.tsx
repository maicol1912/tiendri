'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import type { CategoryNavProps } from './types'

export default function ImagePills({
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

  return (
    <div
      ref={scrollRef}
      className="flex overflow-x-auto gap-2"
      style={{ scrollbarWidth: 'none' }}
    >
      {categories.map((cat) => {
        const isActive = activeCategoryId === cat.id
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onCategoryClick?.(cat.id)}
            aria-label={cat.name}
            aria-pressed={isActive}
            className="flex items-center gap-2 px-3 py-2 rounded-[var(--t-radius-category)] flex-shrink-0 transition-colors cursor-pointer border-none"
            style={{
              backgroundColor: isActive ? 'var(--t-category-active-bg)' : 'var(--t-surface)',
            }}
          >
            <div className="relative w-[42px] h-[42px] rounded-full overflow-hidden flex-shrink-0">
              {cat.image ? (
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="42px"
                  className="object-cover"
                />
              ) : (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ backgroundColor: 'var(--t-border)' }}
                >
                  <span
                    className="text-[var(--t-text-muted)]"
                    style={{ fontSize: '11px' }}
                  >
                    {cat.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            <span
              className="whitespace-nowrap font-medium"
              style={{
                fontSize: '13px',
                fontWeight: 500,
                color: isActive ? 'var(--t-category-active-text)' : 'var(--t-text-primary)',
                letterSpacing: '-0.26px',
              }}
            >
              {cat.name}
            </span>
          </button>
        )
      })}
    </div>
  )
}
