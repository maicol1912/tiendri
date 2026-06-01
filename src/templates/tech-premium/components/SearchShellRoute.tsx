"use client";

// Tech Premium — SearchShellRoute
// URL-router version of SearchShell.
// Uses useTemplateNav() for navigation and useLayoutConfig() for config.
// Rendered at /template/tech-premium/buscar

import { useState, useEffect, useCallback, useRef } from "react";
import { SearchPage } from "./SearchPage";
import { useCart } from "../context/CartContext";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import type { TechPremiumConfig } from "../config";
import type { StoreInfo, StorefrontProduct, NavTab } from "../types";

interface SearchShellRouteProps {
  store: StoreInfo;
  allProducts: StorefrontProduct[];
  currencySymbol?: string;
}

export function SearchShellRoute({
  store,
  allProducts,
  currencySymbol = "$",
}: SearchShellRouteProps) {
  const nav = useTemplateNav();
  const { totalItems, addItem } = useCart();
  const { config } = useLayoutConfig<TechPremiumConfig>();

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [wishlistedIds, setWishlistedIds] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);

  // Autofocus on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Debounce 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Filter products by debounced query
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

  const handleProductClick = useCallback(
    (productId: string) => nav.goProduct(productId),
    [nav]
  );

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
      if (!product || !product.inStock) return;
      addItem({
        productId: product.id,
        variantName: null,
        name: product.name,
        price: product.price,
        quantity: 1,
        imageUrl: product.images[0]?.url ?? null,
      });
    },
    [allProducts, addItem]
  );

  const handleTabChange = useCallback(
    (tab: NavTab) => {
      if (tab === "home") nav.goHome();
      else if (tab === "cart") nav.goCart();
    },
    [nav]
  );

  const handleNavLinkClick = useCallback(
    (href: string) => {
      if (href === "/listing") nav.goListing();
      else nav.goHome();
    },
    [nav]
  );

  const enrichedResults = searchResults.map((p) => ({
    ...p,
    inWishlist: wishlistedIds.has(p.id) ? true : (p.inWishlist ?? false),
  }));

  return (
    <SearchPage
      store={store}
      navLinks={config.navLinks}
      footerServices={config.footerServices}
      footerAssistance={config.footerAssistance}
      grid={config.grid}
      searchQuery={query}
      results={enrichedResults}
      activeTab="search"
      cartItemCount={totalItems}
      currencySymbol={currencySymbol}
      suggestions={config.popularSearches}
      onSearchChange={setQuery}
      onSearchClear={handleClear}
      onSuggestionClick={(s) => setQuery(s)}
      onProductClick={handleProductClick}
      onWishlistToggle={handleWishlistToggle}
      onAddToCart={handleAddToCart}
      onCartClick={nav.goCart}
      onTabChange={handleTabChange}
      onNavLinkClick={handleNavLinkClick}
      inputRef={inputRef}
    />
  );
}
