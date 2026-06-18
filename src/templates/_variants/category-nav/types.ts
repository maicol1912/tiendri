import type { Category } from "@/types/store";

export interface CategoryNavSlotProps {
  categories: Category[];
  activeCategoryId?: string | null;
  onCategoryClick?: (categoryId: string) => void;
  gridMobile?: number;
  gridDesktop?: number;
  /** CHIPS-only: visual style. "underline" = plain text + active underline (default). "pills" = filled pill buttons. "bordered" = transparent border inactive, filled foreground active (food-night style). */
  chipStyle?: "underline" | "pills" | "bordered";
  /** Optional visible section heading. Defaults to variant-specific label when omitted. */
  heading?: string;
  /** When true, shows a "Ver todo" link next to the heading. */
  showViewAll?: boolean;
  /** Callback for the "Ver todo" link. */
  onViewAll?: () => void;
  /** Color for category icons in icon-text display mode. Defaults to var(--t-primary). */
  iconColor?: string;
  /** Size variant for category items. "large" renders bigger icon containers (~110px wide, ~44px icon). Defaults to "default". */
  size?: "default" | "large";
}

export type CategoryNavVariant =
  | "CHIPS"
  | "GRID"
  | "HORIZONTAL_SCROLL"
  | "TABS"
  | "COLUMNAR";
