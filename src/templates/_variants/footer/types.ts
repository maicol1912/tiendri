import type { StoreInfo } from "@/types/domain/store";

export interface FooterSlotProps {
  store: StoreInfo;
  services?: string[];
  assistance?: string[];
}

export type FooterVariant = "COLUMNS" | "COMPACT";
