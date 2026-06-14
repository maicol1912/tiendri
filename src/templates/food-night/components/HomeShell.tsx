"use client";

// Food Night — Home Shell (URL-router version)
// Single "use client" entry — reads from LayoutConfigContext.

import { useState, useCallback } from "react";
import { HomePage } from "./HomePage";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { foodNightConfig } from "../config";
import type { FoodNightConfig } from "../config";
import type { StoreInfo, Category, StorefrontProduct } from "../types";

interface HomeShellProps {
  store: StoreInfo;
  categories: Category[];
  products: StorefrontProduct[];
  currencySymbol?: string;
}

export function HomeShell({
  store,
  categories,
  products,
  currencySymbol = "$",
}: HomeShellProps) {
  const nav = useTemplateNav();
  const { totalItems } = useCart();
  const { config } = useLayoutConfig<FoodNightConfig>();

  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const layout = config?.layout ?? foodNightConfig.layout;
  const grid = config?.grid ?? foodNightConfig.grid;
  const sections = config?.sections ?? foodNightConfig.sections;
  const heroBanner = config?.content?.heroBanner ?? foodNightConfig.content.heroBanner;

  const filteredProducts =
    activeCategoryId === null
      ? products
      : products.filter((p) => p.categoryId === activeCategoryId);

  return (
    <HomePage
      store={store}
      categories={categories}
      products={filteredProducts}
      activeCategoryId={activeCategoryId}
      activeTab="home"
      cartItemCount={totalItems}
      currencySymbol={currencySymbol}
      heroBanner={heroBanner}
      sections={sections}
      layout={layout}
      grid={grid}
      onSearchClick={nav.goSearch}
      onCartClick={nav.goCart}
      onCategoryChange={(id) => setActiveCategoryId((prev) => (prev === id ? null : id))}
      onProductClick={nav.goProduct}
      onTabChange={(tab) => {
        if (tab === "search") nav.goSearch();
        else if (tab === "cart") nav.goCart();
        else if (tab === "info") nav.goInfo();
      }}
    />
  );
}
