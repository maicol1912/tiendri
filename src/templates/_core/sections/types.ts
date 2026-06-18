import type { ResolvedStoreConfig } from "@/types/templates/resolved-config";
import type { StorefrontProduct, StoreInfo, Category } from "@/types/store";
import type { HeroVariant } from "@/templates/_variants/hero";
import type { CategoryNavVariant } from "@/templates/_variants/category-nav";
import type { ProductCardVariant } from "@/templates/_variants/product-card";
import type { ResolvedStyleTokens } from "@/templates/_core/pages/style-tokens";
import type { SearchBarVariant } from "@/templates/_variants/search-bar/types";
import type { BestSellerItem } from "@/templates/_core/sections/BestSellersSection";
import type { PopularProductItem } from "@/templates/mock-loader";

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
    /** CTA text for the second banner slide (CAROUSEL variant). */
    secondCtaText?: string;
  };

  // Derived layout
  aspectRatioClass?: string;

  // Display flags
  showAddToCartInGrid?: boolean;
  showDiscountBadge?: boolean;
  showOriginalPrice?: boolean;
  showRating?: boolean;
  showCategories?: boolean;
  heroConstrained?: boolean;
  heroDesktopOnly?: boolean;
  heroCompact?: boolean;
  categoriesWide?: boolean;

  // Section headings
  categoriesHeading?: string;
  productsHeading?: string;
  secondProductsHeading?: string;

  // Category nav config
  chipStyle?: string;
  categoryIconColor?: string;
  categorySize?: string;

  // Product config
  productsLimit?: number;
  heroFeaturedCount?: number;
  productTabs?: string[];

  // Search bar
  showSearchBar?: boolean;
  searchBarVariant?: SearchBarVariant;
  searchBarPlaceholder?: string;

  // Extra data arrays
  bestSellers?: BestSellerItem[];
  popularProducts?: PopularProductItem[];
  discountProducts?: StorefrontProduct[];
}
