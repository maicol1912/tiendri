import type { ResolvedStoreConfig } from "@/types/templates/resolved-config";

export type EditorialVariant = "DEFAULT";

export interface EditorialSlotProps {
  config: ResolvedStoreConfig;
  sectionConfig?: Record<string, unknown>;
}
