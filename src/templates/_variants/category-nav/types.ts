import type { Category } from "@/types/store";

export interface CategoryNavSlotProps {
  categories: Category[];
  activeCategoryId?: string | null;
  onCategoryClick?: (categoryId: string) => void;
  gridMobile?: number;
  gridDesktop?: number;
  /** CHIPS-only: visual style. "underline" = plain text + active underline (default). "pills" = filled pill buttons. */
  chipStyle?: "underline" | "pills";
}

export type CategoryNavVariant =
  | "CHIPS"
  | "GRID"
  | "HORIZONTAL_SCROLL"
  | "TABS"
  | "COLUMNAR";
