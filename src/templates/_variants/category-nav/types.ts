import type { Category } from "@/types/store";

export interface CategoryNavSlotProps {
  categories: Category[];
  activeCategoryId?: string | null;
  onCategoryClick?: (categoryId: string) => void;
  gridMobile?: number;
  gridDesktop?: number;
}

export type CategoryNavVariant =
  | "CHIPS"
  | "GRID"
  | "HORIZONTAL_SCROLL"
  | "TABS"
  | "COLUMNAR";
