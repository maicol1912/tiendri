"use client";

// Pets Modern Template — Home Shell (URL-router version)
// Uses useTemplateNav() for navigation instead of state-based routing.
// Reads configOverride from LayoutConfigContext provided by the shared layout.

import { useCallback } from "react";
import { HomePage } from "./HomePage";
import { useCart } from "../context/CartContext";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { petsModernConfig } from "../config";
import type { PetsModernConfig } from "../config";
import type {
  StoreInfo,
  StorefrontProduct,
  TrendingItem,
  PetType,
  PromoBannerData,
  NavTab,
  HomeSectionConfig,
} from "../types";

interface HomeShellProps {
  store: StoreInfo;
  promoBanner: PromoBannerData;
  trendingItems: TrendingItem[];
  petTypes: PetType[];
  products: StorefrontProduct[];
  sections?: readonly HomeSectionConfig[];
  currencySymbol?: string;
}

export function HomeShell({
  store,
  promoBanner,
  trendingItems,
  petTypes,
  products,
  sections,
  currencySymbol = "$",
}: HomeShellProps) {
  const nav = useTemplateNav();
  const { totalItems, addItem } = useCart();
  const { config } = useLayoutConfig<PetsModernConfig>();

  // Resolve sections: prop -> configOverride.sections -> static default
  const resolvedSections = sections ?? config.sections ?? petsModernConfig.sections;

  const handleTabChange = useCallback(
    (tab: NavTab) => {
      switch (tab) {
        case "shop":
          nav.goHome();
          break;
        case "explore":
          nav.goExplore();
          break;
        default:
          break;
      }
    },
    [nav]
  );

  const handleAddToCart = useCallback(
    (product: StorefrontProduct) => {
      addItem({
        productId: product.id,
        variantName: null,
        name: product.name,
        price: product.price,
        imageUrl: product.images[0]?.url ?? null,
      });
    },
    [addItem]
  );

  return (
    <HomePage
      store={store}
      promoBanner={promoBanner}
      trendingItems={trendingItems}
      petTypes={petTypes}
      products={products}
      activeTab="shop"
      cartItemCount={totalItems}
      currencySymbol={currencySymbol}
      sections={resolvedSections}
      layout={config.layout}
      grid={config.grid}
      onSearchClick={nav.goSearch}
      onCartClick={nav.goCart}
      onExploreClick={nav.goExplore}
      onProductClick={nav.goProduct}
      onAddToCart={handleAddToCart}
      onTabChange={handleTabChange}
    />
  );
}
