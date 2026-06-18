import type { Category } from "@/types/store";

export interface CategoryNavSlotProps {
  categories: Category[];
  activeCategoryId?: string | null;
  onCategoryClick?: (categoryId: string) => void;
  gridMobile?: number;
  gridDesktop?: number;
  /** CHIPS-only: visual style. "underline" = plain text + active underline (default). "pills" = filled pill buttons. */
  chipStyle?: "underline" | "pills";
  /** Optional visible section heading. Defaults to variant-specific label when omitted. */
  heading?: string;
  /** When true, shows a "Ver todo" link next to the heading. */
  showViewAll?: boolean;
  /** Callback for the "Ver todo" link. */
  onViewAll?: () => void;
}

export type CategoryNavVariant =
  | "CHIPS"
  | "GRID"
  | "HORIZONTAL_SCROLL"
  | "TABS"
  | "COLUMNAR";
