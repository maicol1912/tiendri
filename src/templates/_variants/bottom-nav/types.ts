export type NavTab = "home" | "cart" | "search" | "info";

export interface BottomNavSlotProps {
  activeTab: NavTab;
  cartCount: number;
  onTabChange: (tab: NavTab) => void;
}

export type BottomNavVariant = "EDGE" | "FLOATING_PILL" | "DOT_INDICATOR";
