import type { ComponentType } from "react";
import type { SectionRendererProps } from "./types";
import { HeroSection } from "./HeroSection";
import { CategoriesSection } from "./CategoriesSection";
import { ProductsSection } from "./ProductsSection";
import { CollectionsSection } from "./CollectionsSection";
import { EditorialSection } from "./EditorialSection";
import { BannersSection } from "./BannersSection";
import { PopularSection } from "./PopularSection";
import { VideoSection } from "./VideoSection";
import { FeaturedSection } from "./FeaturedSection";
import { SearchBarSection } from "./SearchBarSection";
import { DiscountsSection } from "./DiscountsSection";
import { BestSellersSectionAdapter } from "./BestSellersSectionAdapter";

export const SECTION_REGISTRY: Record<string, ComponentType<SectionRendererProps>> = {
  hero: HeroSection,
  categories: CategoriesSection,
  products: ProductsSection,
  collections: CollectionsSection,
  editorial: EditorialSection,
  banners: BannersSection,
  popular: PopularSection,
  video: VideoSection as unknown as ComponentType<SectionRendererProps>,
  featured: FeaturedSection,
  searchBar: SearchBarSection,
  discounts: DiscountsSection,
  bestSellers: BestSellersSectionAdapter,
};

export type { SectionRendererProps } from "./types";
