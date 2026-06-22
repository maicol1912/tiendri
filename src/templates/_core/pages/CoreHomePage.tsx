"use client";

// _core/pages/CoreHomePage.tsx
// Layout estructural del Home. NO gestiona estado.
// Recibe todo como props, delega render a secciones vía SECTION_REGISTRY dispatch.

import React, { memo } from "react";
import { SECTION_REGISTRY, type SectionRendererProps } from "../sections";
import { extractSectionProps } from "./extract-section-props";
import { resolveStyleTokens } from "./style-tokens";
import type { ResolvedStoreConfig } from "@/types/templates/resolved-config";
import type { StorefrontProduct, StoreInfo, StorefrontCategory } from "@/types/domain/store";
import type { HeroVariant } from "@/templates/_variants/hero";
import type { CategoryNavVariant } from "@/templates/_variants/category-nav";
import type { ProductCardVariant } from "@/templates/_variants/product-card";
import type { SearchBarVariant } from "@/templates/_variants/search-bar";
import type { BestSellerItem } from "@/templates/_core/sections/BestSellersSection";
import type { PopularProductItem } from "@/templates/mock-loader";
import type { BestSellersVariant } from "@/templates/_variants/best-sellers/types";
import type { PopularVariant } from "@/templates/_variants/popular/types";
import type { BannersVariant } from "@/templates/_variants/banners/types";
import type { EditorialVariant } from "@/templates/_variants/editorial/types";
import type { VideoVariant } from "@/templates/_variants/video/types";

/** Variant overrides for inline sections (optional — only templates that render these declare them). */
interface SectionVariantOverrides {
  bestSellers?: BestSellersVariant;
  popular?: PopularVariant;
  banners?: BannersVariant;
  editorial?: EditorialVariant;
  video?: VideoVariant;
}

interface CoreHomePageProps {
  store: StoreInfo;
  products: StorefrontProduct[];
  categories: StorefrontCategory[];
  config: ResolvedStoreConfig;
  variants: {
    hero: HeroVariant;
    categoryNav: CategoryNavVariant;
    productCard: ProductCardVariant;
  };
  onProductClick: (slug: string) => void;
  onAddToCart: (productId: string) => void;
  onCategoryClick: (categoryId: string) => void;
  onCtaClick?: () => void;
  currencySymbol?: string;
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
  /** Si es true, renderiza un search bar entre el header y el hero */
  showSearchBar?: boolean;
  searchBarVariant?: SearchBarVariant;
  searchBarPlaceholder?: string;
  /** Lista de productos más vendidos — renderiza la sección "Más Vendidos" si no está vacía */
  bestSellers?: BestSellerItem[];
  /** Productos populares — renderiza sección de banner cards si existe y tiene ítems */
  popularProducts?: PopularProductItem[];
  /** Productos con descuento — renderiza sección "Descuentos" usando el ProductCardComponent */
  discountProducts?: StorefrontProduct[];
  /** Variant overrides for inline sections (bestSellers, popular, banners, editorial, video). */
  sectionVariants?: SectionVariantOverrides;
}

export const CoreHomePage = memo(function CoreHomePage({
  store,
  products,
  categories,
  config,
  variants,
  onProductClick,
  onAddToCart,
  onCategoryClick,
  onCtaClick,
  currencySymbol = "$",
  heroData,
  showSearchBar = false,
  searchBarVariant = "INLINE",
  searchBarPlaceholder = "Buscar productos...",
  bestSellers,
  popularProducts,
  discountProducts,
  sectionVariants,
}: CoreHomePageProps) {
  // Resolver tokens de estilo desde config + style-maps
  const styleTokens = resolveStyleTokens(config);

  // Extraer props derivadas del config (display flags, headings, layout values)
  const extractedProps = extractSectionProps(config);

  // Build the unified props object for all section renderers
  const sectionProps: SectionRendererProps = {
    // Core data
    store,
    products,
    categories,
    config,
    currencySymbol,

    // Variants
    variants: {
      hero: variants.hero,
      categoryNav: variants.categoryNav,
      productCard: variants.productCard,
    },

    // Style tokens
    styleTokens,

    // Extracted config values (display flags, headings, layout)
    ...extractedProps,

    // Callbacks
    onProductClick,
    onAddToCart,
    onCategoryClick,
    onCtaClick,

    // Hero data
    heroData,

    // Extra data arrays (passed from HomeShell)
    bestSellers,
    popularProducts,
    discountProducts,

    // Search bar (passed from HomeShell)
    showSearchBar,
    searchBarVariant,
    searchBarPlaceholder,
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--t-background)" }}
    >
      {config.sections
        ?.filter((s) => s.visible)
        .map((s) => {
          const Renderer = SECTION_REGISTRY[s.id];
          if (!Renderer) {
            if (process.env.NODE_ENV === "development") {
              console.warn(`Unknown section: ${s.id}`);
            }
            return null;
          }
          const sectionVariant = sectionVariants?.[s.id as keyof SectionVariantOverrides] as string | undefined;
          return <Renderer key={s.id} {...sectionProps} sectionConfig={s.config} variant={sectionVariant} />;
        })}
    </div>
  );
});
