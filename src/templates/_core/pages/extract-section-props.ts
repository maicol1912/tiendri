import { imageRatioClass } from "@/templates/_shared/utils/image-classes";
import type { ResolvedStoreConfig } from "@/types/templates/resolved-config";

export function extractSectionProps(config: ResolvedStoreConfig) {
  const raw = config as Record<string, unknown>;
  const layout = (config.layout ?? {}) as unknown as Record<string, unknown>;
  const productTabsRaw = raw.productTabs as
    | string[]
    | Array<{ id: string; label: string }>
    | undefined;

  const productTabs: string[] | undefined = productTabsRaw
    ? productTabsRaw.map((t) => (typeof t === "string" ? t : t.label))
    : undefined;

  return {
    showAddToCartInGrid: (raw.showAddToCartInGrid as boolean | undefined) ?? true,
    showDiscountBadge: (raw.showDiscountBadge as boolean | undefined) ?? true,
    showOriginalPrice: (raw.showOriginalPrice as boolean | undefined) ?? true,
    showRating: (raw.showRating as boolean | undefined) ?? false,
    showCategories: (raw.showCategories as boolean | undefined) ?? true,
    heroConstrained: (raw.heroConstrained as boolean | undefined) ?? false,
    heroDesktopOnly: (raw.heroDesktopOnly as boolean | undefined) ?? false,
    heroCompact: (raw.heroCompact as boolean | undefined) ?? false,
    categoriesWide: (raw.categoriesWide as boolean | undefined) ?? false,
    categoriesHeading: raw.categoriesHeading as string | undefined,
    productsHeading: raw.productsHeading as string | undefined,
    secondProductsHeading: raw.secondProductsHeading as string | undefined,
    chipStyle: raw.chipStyle as string | undefined,
    categoryIconColor: raw.categoryIconColor as string | undefined,
    categorySize: raw.categorySize as string | undefined,
    productsLimit: raw.productsLimit as number | undefined,
    heroFeaturedCount: raw.heroFeaturedCount as number | undefined,
    productTabs,
    aspectRatioClass: imageRatioClass(layout.cardImageRatio as string | undefined ?? "square"),
  };
}
