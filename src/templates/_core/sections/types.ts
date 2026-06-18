import type { ResolvedStoreConfig } from "@/types/templates/resolved-config";
import type { StorefrontProduct, StoreInfo, Category } from "@/types/store";
import type { HeroVariant } from "@/templates/_variants/hero";
import type { CategoryNavVariant } from "@/templates/_variants/category-nav";
import type { ProductCardVariant } from "@/templates/_variants/product-card";
import type { ResolvedStyleTokens } from "@/templates/_core/pages/style-tokens";

export interface SectionRendererProps {
  store: StoreInfo;
  products: StorefrontProduct[];
  categories: Category[];
  config: ResolvedStoreConfig;
  currencySymbol: string;
  variants: {
    hero: HeroVariant;
    categoryNav: CategoryNavVariant;
    productCard: ProductCardVariant;
  };
  styleTokens: ResolvedStyleTokens;
  onProductClick: (slug: string) => void;
  onAddToCart: (productId: string) => void;
  onCategoryClick: (categoryId: string) => void;
  onCtaClick?: () => void;
  heroData?: {
    subtitle?: string;
    titleLight?: string;
    titleBold?: string;
    description?: string;
    ctaText?: string;
    image?: string;
  };
}
