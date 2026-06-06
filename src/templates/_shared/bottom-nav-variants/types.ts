export type BottomNavTab = 'home' | 'search' | 'cart' | 'info';

export interface BottomNavProps {
  activeTab?: BottomNavTab;
  cartItemCount?: number;
  onTabChange?: (tab: BottomNavTab) => void;
}
