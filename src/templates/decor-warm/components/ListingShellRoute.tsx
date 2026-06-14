"use client";

// Decor Warm Template — ListingShellRoute
// Client boundary. Wires category filtering, navigation, and cart.

import { useState, useCallback } from "react";
import { ProductListingPage } from "./ProductListingPage";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { decorWarmConfig } from "../config";
import type { DecorWarmConfig } from "../config";
import type { DecorWarmProduct, DecorWarmCategory, DecorWarmNavTab } from "../types";
import type { StoreInfo } from "@/types/store";

interface ListingShellRouteProps {
  store: StoreInfo;
  categories: DecorWarmCategory[];
  products: DecorWarmProduct[];
  currencySymbol?: string;
}

export function ListingShellRoute({
  store: _store,
  categories,
  products,
  currencySymbol = "$",
}: ListingShellRouteProps) {
  const nav = useTemplateNav();
  const { totalItems, addItem } = useCart();
  const { config } = useLayoutConfig<DecorWarmConfig>();

  const layout = config?.layout ?? decorWarmConfig.layout;
  const grid = config?.grid ?? decorWarmConfig.grid;

  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const handleCategoryChange = useCallback((id: string | null) => {
    setActiveCategoryId(id);
  }, []);

  const handleAddToCart = useCallback(
    (product: DecorWarmProduct) => {
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.images[0]?.url ?? null,
        variantName: null,
        quantity: 1,
      });
    },
    [addItem]
  );

  const handleTabChange = useCallback(
    (tab: DecorWarmNavTab) => {
      if (tab === "home") nav.goHome();
      else if (tab === "cart") nav.goCart();
      else if (tab === "info") nav.goInfo();
    },
    [nav]
  );

  const visibleProducts =
    activeCategoryId === null
      ? products
      : products.filter((p) => p.categoryId === activeCategoryId);

  return (
    <ProductListingPage
      categories={categories}
      products={visibleProducts}
      activeCategoryId={activeCategoryId}
      cartItemCount={totalItems}
      currencySymbol={currencySymbol}
      layout={layout}
      grid={grid}
      onBack={nav.goHome}
      onSearchOpen={nav.goSearch}
      onCategoryChange={handleCategoryChange}
      onProductClick={(id) => nav.goProduct(id)}
      onAddToCart={handleAddToCart}
      onTabChange={handleTabChange}
    />
  );
}
