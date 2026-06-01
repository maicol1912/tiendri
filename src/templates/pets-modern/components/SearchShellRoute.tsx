"use client";

// Pets Modern Template — Search Shell Route
// Wraps SearchPage with debounced search + cart provider.

import { useState, useCallback, useMemo } from "react";
import { SearchPage } from "./SearchPage";
import { useCart } from "../context/CartContext";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import type { PetsModernConfig } from "../config";
import type { StoreInfo, StorefrontProduct, NavTab } from "../types";

interface SearchShellRouteProps {
  store: StoreInfo;
  products: StorefrontProduct[];
  currencySymbol?: string;
}

export function SearchShellRoute({
  products,
  currencySymbol = "$",
}: SearchShellRouteProps) {
  const nav = useTemplateNav();
  const { addItem } = useCart();
  const { config } = useLayoutConfig<PetsModernConfig>();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
    );
  }, [query, products]);

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

  return (
    <SearchPage
      query={query}
      results={results}
      activeTab="shop"
      currencySymbol={currencySymbol}
      onBack={() => nav.goHome()}
      onQueryChange={setQuery}
      onProductClick={nav.goProduct}
      onAddToCart={handleAddToCart}
      onTabChange={handleTabChange}
      layout={config.layout}
      grid={config.grid}
    />
  );
}
