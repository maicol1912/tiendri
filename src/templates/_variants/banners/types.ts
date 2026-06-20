import type { SectionRendererProps } from "@/templates/_core/sections/types";

export type BannersVariant = "DEFAULT";

export interface BannersSlotProps
  extends Pick<
    SectionRendererProps,
    "config" | "sectionConfig" | "onCtaClick"
  > {}
