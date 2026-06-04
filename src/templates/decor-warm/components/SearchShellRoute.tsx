"use client";

// Decor Warm Template — SearchShellRoute
// Client boundary. Debounced search (300ms) + navigation wiring.

import { useState, useEffect, useCallback, useRef } from "react";
import { SearchPage } from "./SearchPage";
import { useCart } from "../context/CartContext";
import { useTemplateNav } from "../hooks/useTemplateNav";
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
  popularSearches = decorWarmConfig.popularSearches as unknown as string[],
  currencySymbol = "$",
}: SearchShellRouteProps) {
  const nav = useTemplateNav();
  const { addItem } = useCart();
  const { config } = useLayoutConfig<DecorWarmConfig>();

  const layout = config?.layout ?? decorWarmConfig.layout;
  const grid = config?.grid ?? decorWarmConfig.grid;

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [wishlistedIds, setWishlistedIds] = useState<Set<string>>(new Set());
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

  const handleWishlistToggle = useCallback((productId: string) => {
    setWishlistedIds((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  }, []);

  const handleAddToCart = useCallback(
    (product: DecorWarmProduct) => {
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.images[0]?.url ?? null,
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

  return (
    <SearchPage
      store={store}
      query={query}
      results={results}
      recommendations={recommendations}
      popularSearches={popularSearches}
      isSearching={isSearching}
      currencySymbol={currencySymbol}
      wishlistedIds={wishlistedIds}
      layout={layout}
      grid={grid}
      onBack={nav.goHome}
      onQueryChange={setQuery}
      onClear={() => {
        setQuery("");
        setDebouncedQuery("");
        setIsSearching(false);
      }}
      onProductClick={(id) => nav.goProduct(id)}
      onWishlistToggle={handleWishlistToggle}
      onAddToCart={handleAddToCart}
      onSuggestionClick={(q) => setQuery(q)}
      onTabChange={handleTabChange}
    />
  );
}
