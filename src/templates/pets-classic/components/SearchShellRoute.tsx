"use client";

// Pets Classic — Search Shell Route
// Manages search query state with debounce for filtering.

import { useState, useCallback } from "react";
import { SearchPage } from "./SearchPage";
import { useCart } from "../context/CartContext";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { petsClassicConfig } from "../config";
import type { PetsClassicConfig } from "../config";
import type {
  StoreInfo,
  PetsClassicProduct,
} from "../types";

interface SearchShellRouteProps {
  store: StoreInfo;
  allProducts: PetsClassicProduct[];
  popularSearches?: readonly string[];
  currencySymbol?: string;
}

export function SearchShellRoute({
  store,
  allProducts,
  popularSearches = petsClassicConfig.popularSearches,
  currencySymbol = "$",
}: SearchShellRouteProps) {
  const nav = useTemplateNav();
  const { totalItems, addItem } = useCart();
  const { config } = useLayoutConfig<PetsClassicConfig>();

  const [searchQuery, setSearchQuery] = useState("");

  const handleAddToCart = useCallback(
    (productId: string) => {
      const p = allProducts.find((x) => x.id === productId);
      if (!p || !p.available) return;
      addItem({
        productId: p.id,
        name: p.name,
        price: p.price,
        quantity: 1,
        imageUrl: p.images[0]?.url ?? null,
      });
    },
    [allProducts, addItem]
  );

  return (
    <SearchPage
      store={store}
      allProducts={allProducts}
      popularSearches={popularSearches}
      layout={config.layout ?? petsClassicConfig.layout}
      grid={config.grid ?? petsClassicConfig.grid}
      searchQuery={searchQuery}
      activeTab="home"
      cartItemCount={totalItems}
      currencySymbol={currencySymbol}
      onSearchChange={setSearchQuery}
      onSearchClear={() => setSearchQuery("")}
      onProductClick={nav.goProduct}
      onAddToCart={handleAddToCart}
      onCartClick={nav.goCart}
      onSearchClick={() => {}}
      onTabChange={(tab) => {
        if (tab === "home") nav.goHome();
        else if (tab === "cart") nav.goCart();
      }}
      onPopularSearchClick={setSearchQuery}
    />
  );
}
