import type { Category } from '@/types/store';

export interface CategoryNavProps {
  categories: Category[];
  activeCategoryId?: string | null;
  onCategoryClick?: (id: string) => void;
  gridMobile?: number;
  gridDesktop?: number;
}
