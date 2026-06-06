'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Smartphone,
  Watch,
  Camera,
  Headphones,
  Monitor,
  Gamepad2,
  Package,
  ShoppingBag,
  Shirt,
  Home,
  UtensilsCrossed,
  Dumbbell,
  BookOpen,
  Car,
  Baby,
  Gem,
  Music,
  Palette,
  Leaf,
  type LucideIcon,
} from 'lucide-react'
import type { CategoryNavProps } from './types'

// Icon map — matches tech-premium CategorySection original
const ICON_MAP: Record<string, LucideIcon> = {
  Smartphone,
  Phone: Smartphone,
  Phones: Smartphone,
  Watch,
  'Smart Watches': Watch,
  SmartWatch: Watch,
  Camera,
  Cameras: Camera,
  Headphones,
  Monitor,
  Computer: Monitor,
  Computers: Monitor,
  Gamepad2,
  Gaming: Gamepad2,
  ShoppingBag,
  Bag: ShoppingBag,
  Shirt,
  Clothing: Shirt,
  Ropa: Shirt,
  Home,
  Hogar: Home,
  Furniture: Home,
  Muebles: Home,
  UtensilsCrossed,
  Food: UtensilsCrossed,
  Comida: UtensilsCrossed,
  Restaurant: UtensilsCrossed,
  Dumbbell,
  Sports: Dumbbell,
  Deportes: Dumbbell,
  Gym: Dumbbell,
  BookOpen,
  Books: BookOpen,
  Libros: BookOpen,
  Car,
  Autos: Car,
  Baby,
  Kids: Baby,
  Niños: Baby,
  Gem,
  Jewelry: Gem,
  Joyas: Gem,
  Music,
  Música: Music,
  Palette,
  Art: Palette,
  Arte: Palette,
  Leaf,
  Nature: Leaf,
  Plants: Leaf,
}

function resolveIcon(category: { name: string; icon?: string | null }): LucideIcon {
  if (category.icon) {
    return ICON_MAP[category.icon] ?? ICON_MAP[category.name] ?? Package
  }
  return ICON_MAP[category.name] ?? Package
}

// Scroll delta per arrow click (px)
const SCROLL_DELTA = 240

export default function HorizontalScroll({
  categories,
  activeCategoryId,
  onCategoryClick,
}: CategoryNavProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  function scrollBy(delta: number) {
    scrollRef.current?.scrollBy({ left: delta, behavior: 'smooth' })
  }

  return (
    <>
      {/* Section header — heading + nav arrows */}
      <div className="flex items-center justify-between mb-8">
        <h2
          id="categories-heading"
          className="text-[var(--t-text-primary)] tracking-[0.24px]"
          style={{
            fontWeight: 'var(--t-type-heading-weight, 500)' as React.CSSProperties['fontWeight'],
            fontSize: 'var(--t-type-heading-size, 1.5rem)',
            letterSpacing: 'var(--t-type-heading-tracking, 0.24px)',
            textTransform: 'var(--t-type-heading-transform, none)' as React.CSSProperties['textTransform'],
          }}
        >
          Explorar por categoría
        </h2>
        <div className="flex gap-4">
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-transparent border-none cursor-pointer text-[var(--t-text-primary)]/40 hover:text-[var(--t-text-primary)] transition-colors"
            aria-label="Categorías anteriores"
            onClick={() => scrollBy(-SCROLL_DELTA)}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-transparent border-none cursor-pointer text-[var(--t-text-primary)]/40 hover:text-[var(--t-text-primary)] transition-colors"
            aria-label="Siguientes categorías"
            onClick={() => scrollBy(SCROLL_DELTA)}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Category cards — mobile: 3-col grid, desktop: 6-col grid (original layout) */}
      <div
        ref={scrollRef}
        className="grid grid-cols-3 lg:grid-cols-6"
        style={{ gap: 'var(--t-space-gap, 1rem)' }}
      >
        {categories.map((cat) => {
          const Icon = resolveIcon(cat)
          const isActive = activeCategoryId === cat.id
          return (
            <button
              key={cat.id}
              type="button"
              className={`flex flex-col items-center justify-center gap-2 rounded-[var(--t-radius-category)] cursor-pointer border-none transition-colors shrink-0
                w-[100px] h-[100px] lg:w-[160px] lg:h-[128px]
                ${isActive
                  ? 'bg-[var(--t-category-active-bg)] text-[var(--t-category-active-text)]'
                  : 'bg-[var(--t-surface)] text-[var(--t-primary)] hover:bg-[var(--t-nav-border)]'
                }`}
              onClick={() => onCategoryClick?.(cat.id)}
              aria-label={cat.name}
              aria-pressed={isActive}
            >
              <Icon className="w-8 h-8 lg:w-12 lg:h-12" strokeWidth={1.5} />
              <span className="text-xs lg:text-base font-medium leading-6 text-center whitespace-nowrap">
                {cat.name}
              </span>
            </button>
          )
        })}
      </div>
    </>
  )
}
