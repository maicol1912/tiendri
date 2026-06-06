import type { SharedStoreInfo } from '@/types/store'

export interface HeaderProps {
  store: SharedStoreInfo
  cartItemCount?: number
  onSearchClick?: () => void
  onCartClick?: () => void
  onMenuClick?: () => void
  navLinks?: readonly { label: string; href: string }[]
  onNavLinkClick?: (href: string) => void
}
