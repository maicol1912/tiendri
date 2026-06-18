import type { StoreInfo } from "@/types/store";

export interface NavLink {
  label: string;
  href: string;
}

export interface HeaderSlotProps {
  store: StoreInfo;
  navLinks: NavLink[];
  cartCount: number;
  isActive: (href: string) => boolean;
  onNavClick: (href: string) => void;
  onSearchClick: () => void;
  onCartClick: () => void;
}

export type HeaderVariant = "DEFAULT" | "GLASS" | "GREETING" | "MINIMAL";
