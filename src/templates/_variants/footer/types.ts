import type { StoreInfo } from "@/types/store";

export interface FooterSlotProps {
  store: StoreInfo;
  services?: string[];
  assistance?: string[];
}

export type FooterVariant = "COLUMNS" | "COMPACT";
