"use client";

// Food Night — Listing Shell Route

import { useState, useCallback } from "react";
import { ProductListingPage } from "./ProductListingPage";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { foodNightConfig } from "../config";
import type { FoodNightConfig } from "../config";
import type { StoreInfo, Category, StorefrontProduct } from "../types";

interface ListingShellRouteProps {
  store: StoreInfo;
  categories: Category[];
  products: StorefrontProduct[];
  currencySymbol?: string;
}

export function ListingShellRoute({
  store,
  categories,
  products,
  currencySymbol = "$",
}: ListingShellRouteProps) {
  const nav = useTemplateNav();
  const { totalItems } = useCart();
  const { config } = useLayoutConfig<FoodNightConfig>();
  const layout = config?.layout ?? foodNightConfig.layout;
  const grid = config?.grid ?? foodNightConfig.grid;

  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const handleCategoryChange = useCallback((id: string | null) => {
    setActiveCategoryId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <ProductListingPage
      store={store}
      categories={categories}
      products={products}
      activeCategoryId={activeCategoryId}
      activeTab="home"
      cartItemCount={totalItems}
      currencySymbol={currencySymbol}
      layout={layout}
      grid={grid}
      onSearchClick={nav.goSearch}
      onCartClick={nav.goCart}
      onCategoryChange={handleCategoryChange}
      onProductClick={nav.goProduct}
      onTabChange={(tab) => {
        if (tab === "home") nav.goHome();
        else if (tab === "search") nav.goSearch();
        else if (tab === "cart") nav.goCart();
      }}
    />
  );
}
