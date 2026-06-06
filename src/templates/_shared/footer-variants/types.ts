import type { SharedStoreInfo } from '@/types/store'

export interface FooterProps {
  store: SharedStoreInfo
  services?: readonly string[]
  assistance?: readonly string[]
  showBranding?: boolean
}
