"use client";

// Furniture Light — SearchShellRoute
// Rendered at /template/furniture-light/buscar

import { useState, useEffect, useCallback, useRef } from "react";
import { SearchPage } from "./SearchPage";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import type { FurnitureLightConfig } from "../config";
import type { FurnitureProduct, FurnitureStoreInfo, FurnitureNavTab } from "../types";

interface SearchShellRouteProps {
  store: FurnitureStoreInfo;
  allProducts: FurnitureProduct[];
  currencySymbol?: string;
}

export function SearchShellRoute({
  store,
  allProducts,
  currencySymbol = "$",
}: SearchShellRouteProps) {
  const nav = useTemplateNav();
  const { totalItems, addItem } = useCart();
  const { config } = useLayoutConfig<FurnitureLightConfig>();

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [wishlistedIds, setWishlistedIds] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);

  // Autofocus on mount
  useEffect(() => {
    const timer = setTimeout(() => { inputRef.current?.focus(); }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Debounce 300ms
  useEffect(() => {
    const timer = setTimeout(() => { setDebouncedQuery(query); }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const searchResults = debouncedQuery.trim()
    ? allProducts.filter((p) => {
        const q = debouncedQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          (p.description?.toLowerCase().includes(q) ?? false)
        );
      })
    : [];

  const handleClear = useCallback(() => {
    setQuery("");
    setDebouncedQuery("");
    inputRef.current?.focus();
  }, []);

  const handleWishlistToggle = useCallback((productId: string) => {
    setWishlistedIds((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  }, []);

  const handleAddToCart = useCallback(
    (productId: string) => {
      const product = allProducts.find((p) => p.id === productId);
      if (!product || product.available === false) return;
      addItem({
        productId: product.id,
        variantName: product.colorVariant ?? null,
        name: product.name,
        price: product.price,
        quantity: 1,
        imageUrl: product.images[0]?.url ?? null,
      });
    },
    [allProducts, addItem]
  );

  const handleNavLinkClick = useCallback(
    (href: string) => {
      if (href === "/") nav.goHome();
      else if (href === "/catalogo") nav.goListing();
      else if (href === "/info") nav.goInfo();
    },
    [nav]
  );

  const handleTabChange = useCallback(
    (tab: FurnitureNavTab) => {
      if (tab === "home") nav.goHome();
      else if (tab === "cart") nav.goCart();
    },
    [nav]
  );

  const enrichedResults = searchResults.map((p) => ({
    ...p,
    inWishlist: wishlistedIds.has(p.id),
  }));

  const enrichedAll = allProducts.map((p) => ({
    ...p,
    inWishlist: wishlistedIds.has(p.id),
  }));

  return (
    <SearchPage
      store={store}
      navLinks={config.content?.navLinks ?? []}
      layout={config.layout}
      grid={config.grid}
      searchQuery={query}
      results={enrichedResults}
      allProducts={enrichedAll}
      activeTab="search"
      cartItemCount={totalItems}
      currencySymbol={currencySymbol}
      suggestions={config.content?.popularSearches ?? []}
      inputRef={inputRef}
      onSearchChange={setQuery}
      onSearchClear={handleClear}
      onSuggestionClick={(s) => setQuery(s)}
      onProductClick={(id) => nav.goProduct(id)}
      onWishlistToggle={handleWishlistToggle}
      onAddToCart={handleAddToCart}
      onCartClick={nav.goCart}
      onNavLinkClick={handleNavLinkClick}
      onBack={nav.goHome}
      onTabChange={handleTabChange}
    />
  );
}
