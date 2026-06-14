"use client";

// Fashion Template — Search Shell Route
// State: inputValue, debouncedQuery (300ms debounce).
// Memoized search across: name, description.
// Navigation via useTemplateNav.
// Reads configOverride from LayoutConfigContext for grid + layout props.

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { SearchPage } from "./SearchPage";
import { fashionConfig } from "../config";
import type { FashionConfig } from "../config";
import type { StoreInfo, StorefrontProduct, NavTab } from "../types";

interface SearchShellInnerProps {
  store: StoreInfo;
  products: StorefrontProduct[];
  currencySymbol?: string;
  initialQuery?: string;
}

function SearchShellInner({
  store,
  products,
  currencySymbol = "$",
  initialQuery = "",
}: SearchShellInnerProps) {
  const nav = useTemplateNav();
  const { totalItems } = useCart();
  const { config } = useLayoutConfig<FashionConfig>();

  const resolvedGrid = config?.grid?.search ?? fashionConfig.grid.search;
  const resolvedLayout = config?.layout ?? fashionConfig.layout;

  const [inputValue, setInputValue] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearchChange = useCallback((value: string) => {
    setInputValue(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(value);
    }, 300);
  }, []);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const results = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return [];
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.description?.toLowerCase().includes(q) ?? false)
    );
  }, [debouncedQuery, products]);

  const handleProductClick = useCallback(
    (id: string) => nav.goProduct(id),
    [nav]
  );

  const handleTabChange = useCallback(
    (tab: NavTab) => {
      if (tab === "home") nav.goHome();
      else if (tab === "search") nav.goSearch();
      else if (tab === "cart") nav.goCart();
    },
    [nav]
  );

  return (
    <SearchPage
      store={store}
      searchQuery={inputValue}
      results={results}
      activeTab="search"
      cartItemCount={totalItems}
      currencySymbol={currencySymbol}
      grid={resolvedGrid}
      layout={resolvedLayout}
      onSearchChange={handleSearchChange}
      onCartClick={nav.goCart}
      onProductClick={handleProductClick}
      onTabChange={handleTabChange}
    />
  );
}

interface SearchShellRouteProps {
  store: StoreInfo;
  products: StorefrontProduct[];
  currencySymbol?: string;
  initialQuery?: string;
}

export function SearchShellRoute({ store, ...rest }: SearchShellRouteProps) {
  return <SearchShellInner store={store} {...rest} />;
}
