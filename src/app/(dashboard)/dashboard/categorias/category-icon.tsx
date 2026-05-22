'use client'

// CategoryIconComponent — maps CategoryIcon string to Lucide icon component.

import type { CategoryIcon } from '@/types/domain'
import {
  Smartphone,
  Watch,
  Camera,
  Laptop,
  Headphones,
  Tv,
  Shirt,
  ShoppingBag,
  Home,
  Sofa,
  Utensils,
  Car,
  Bike,
  Dumbbell,
  Book,
  Music,
  Gamepad2,
  Baby,
  Dog,
  Flower2,
  type LucideIcon,
} from 'lucide-react'

export const ICON_MAP: Record<CategoryIcon, LucideIcon> = {
  Smartphone,
  Watch,
  Camera,
  Laptop,
  Headphones,
  Tv,
  Shirt,
  ShoppingBag,
  Home,
  Sofa,
  Utensils,
  Car,
  Bike,
  Dumbbell,
  Book,
  Music,
  Gamepad2,
  Baby,
  Dog,
  Flower2,
}

/** All available icons as an ordered array for the picker */
export const ICON_OPTIONS: CategoryIcon[] = Object.keys(ICON_MAP) as CategoryIcon[]

interface CategoryIconComponentProps {
  name: CategoryIcon
  className?: string
}

export function CategoryIconComponent({ name, className }: CategoryIconComponentProps) {
  const Icon = ICON_MAP[name]
  return <Icon className={className} />
}
