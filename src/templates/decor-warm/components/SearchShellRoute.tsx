"use client";

// Decor Warm Template — SearchShellRoute
// Client boundary. Debounced search (300ms) + navigation wiring + shared Header.

import { useState, useEffect, useCallback, useRef } from "react";
import { SearchPage } from "./SearchPage";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../../_shared/hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { decorWarmConfig } from "../config";
import type { DecorWarmConfig } from "../config";
import type { DecorWarmProduct, DecorWarmNavTab } from "../types";
import type { StoreInfo } from "@/types/store";

interface SearchShellRouteProps {
  store: StoreInfo;
  products: DecorWarmProduct[];
  popularSearches?: string[];
  currencySymbol?: string;
}

export function SearchShellRoute({
  store,
  products,
  popularSearches = decorWarmConfig.content.popularSearches as unknown as string[],
  currencySymbol = "$",
}: SearchShellRouteProps) {
  const nav = useTemplateNav();
  const { totalItems, addItem } = useCart();
  const { config } = useLayoutConfig<DecorWarmConfig>();

  const layout = config?.layout ?? decorWarmConfig.layout;
  const grid = config?.grid ?? decorWarmConfig.grid;

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounce
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    if (query.trim().length === 0) {
      setDebouncedQuery("");
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    debounceTimer.current = setTimeout(() => {
      setDebouncedQuery(query.trim());
      setIsSearching(false);
    }, 300);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [query]);

  const results =
    debouncedQuery.length > 0
      ? products.filter(
          (p) =>
            p.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
            (p.description?.toLowerCase().includes(debouncedQuery.toLowerCase()) ?? false)
        )
      : [];

  const recommendations = products.slice(0, 4);

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
    },
    [nav]
  );

  const handleNavLinkClick = useCallback(
    (href: string) => {
      if (href === "/") nav.goHome();
      else if (href === "/catalogo") nav.goListing();
      else if (href === "/info") nav.goInfo();
    },
    [nav]
  );

  return (
    <SearchPage
      store={store}
      query={query}
      results={results}
      recommendations={recommendations}
      popularSearches={popularSearches}
      isSearching={isSearching}
      currencySymbol={currencySymbol}
      cartItemCount={totalItems}
      layout={layout}
      grid={grid}
      onQueryChange={setQuery}
      onClear={() => {
        setQuery("");
        setDebouncedQuery("");
        setIsSearching(false);
      }}
      onCartOpen={nav.goCart}
      onNavLinkClick={handleNavLinkClick}
      onProductClick={(id) => nav.goProduct(id)}
      onAddToCart={handleAddToCart}
      onSuggestionClick={(q) => setQuery(q)}
      onTabChange={handleTabChange}
    />
  );
}
