"use client";

// Beauty Soft Template — SearchShellRoute
// Client boundary. Debounced search (300ms) + navigation wiring.

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { SearchPage } from "./SearchPage";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../../_shared/hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { beautySoftConfig } from "../config";
import type { BeautySoftConfig } from "../config";
import type { BeautySoftProduct, NavTab } from "../types";
import type { StoreInfo } from "@/types/store";

interface SearchShellRouteProps {
  store: StoreInfo;
  products: BeautySoftProduct[];
  currencySymbol?: string;
}

export function SearchShellRoute({ store, products, currencySymbol = "$" }: SearchShellRouteProps) {
  const nav = useTemplateNav();
  const { totalItems } = useCart();
  const { config } = useLayoutConfig<BeautySoftConfig>();

  const layout = config?.layout ?? beautySoftConfig.layout;
  const grid = config?.grid ?? beautySoftConfig.grid;

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
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

  // Top 4 as recommendations when no query
  const recommendations = products.slice(0, 4);

  const handleQueryChange = useCallback((q: string) => {
    setQuery(q);
  }, []);

  const handleClear = useCallback(() => {
    setQuery("");
    setDebouncedQuery("");
    setIsSearching(false);
  }, []);

  const handleProductClick = useCallback(
    (productId: string) => nav.goProduct(productId),
    [nav]
  );

  const handleFavoriteToggle = useCallback((productId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  }, []);

  const handleTabChange = useCallback(
    (tab: NavTab) => {
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <SearchPage
        store={store}
        query={query}
        results={results}
        recommendations={recommendations}
        isSearching={isSearching}
        currencySymbol={currencySymbol}
        favorites={favorites}
        layout={layout}
        grid={grid}
        cartItemCount={totalItems}
        onBack={nav.goHome}
        onQueryChange={handleQueryChange}
        onClear={handleClear}
        onProductClick={handleProductClick}
        onFavoriteToggle={handleFavoriteToggle}
        onTabChange={handleTabChange}
        onNavLinkClick={handleNavLinkClick}
      />
    </motion.div>
  );
}
