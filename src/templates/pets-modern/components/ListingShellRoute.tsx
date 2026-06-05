"use client";

// Pets Modern Template — Listing Shell Route
// Wraps ProductListingPage with category filter state + navigation.
// Renders when a user navigates to /catalogo (optionally with ?category=id).

import { useState, useCallback } from "react";
import { ProductListingPage } from "./ProductListingPage";
import { useCart } from "../context/CartContext";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { petsModernConfig } from "../config";
import type { PetsModernConfig } from "../config";
import type {
  StoreInfo,
  StorefrontProduct,
  PetCategory,
  NavTab,
} from "../types";

interface ListingShellRouteProps {
  store: StoreInfo;
  categories: PetCategory[];
  products: StorefrontProduct[];
  initialCategoryId?: string | null;
  currencySymbol?: string;
}

export function ListingShellRoute({
  store,
  categories,
  products,
  initialCategoryId = null,
  currencySymbol = "$",
}: ListingShellRouteProps) {
  const nav = useTemplateNav();
  const { totalItems, addItem } = useCart();
  const { config } = useLayoutConfig<PetsModernConfig>();

  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(
    initialCategoryId
  );

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
    <ProductListingPage
      store={store}
      categories={categories}
      products={products}
      layout={config.layout ?? petsModernConfig.layout}
      grid={config.grid ?? petsModernConfig.grid}
      activeTab="shop"
      activeCategoryId={activeCategoryId}
      cartItemCount={totalItems}
      currencySymbol={currencySymbol}
      onBack={nav.goHome}
      onSearchClick={nav.goSearch}
      onCartClick={nav.goCart}
      onTabChange={handleTabChange}
      onCategoryChange={setActiveCategoryId}
      onProductClick={nav.goProduct}
      onAddToCart={handleAddToCart}
    />
  );
}
