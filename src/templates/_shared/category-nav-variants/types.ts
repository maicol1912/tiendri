import type { SharedCategory } from '@/types/store'

export interface CategoryNavProps {
  categories: readonly SharedCategory[]
  activeCategoryId?: string | null
  onCategoryClick?: (categoryId: string) => void
}
