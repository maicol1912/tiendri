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

export default function IconGrid({
  categories,
  activeCategoryId,
  onCategoryClick,
}: CategoryNavProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3" style={{ gap: 'var(--t-space-gap, 1rem)' }}>
      {categories.map((cat) => {
        const Icon = resolveIcon(cat)
        const isActive = activeCategoryId === cat.id
        return (
          <button
            key={cat.id}
            type="button"
            className={`flex flex-col items-center justify-center gap-2 rounded-[var(--t-radius-category)] cursor-pointer border-none transition-colors shrink-0
              w-full h-[100px] lg:h-[128px]
              ${isActive
                ? 'bg-[var(--t-category-active-bg)] text-[var(--t-category-active-text)]'
                : 'bg-[var(--t-surface)] text-[var(--t-text-primary)] hover:bg-[var(--t-nav-border)]'
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
  )
}
