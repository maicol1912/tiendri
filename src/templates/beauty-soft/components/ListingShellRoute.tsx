"use client";

// Beauty Soft Template — ListingShellRoute
// Client boundary. Wires category filtering, navigation, favorites.

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ProductListingPage } from "./ProductListingPage";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { beautySoftConfig } from "../config";
import type { BeautySoftConfig } from "../config";
import type { BeautySoftProduct, BeautySoftCategory, NavTab } from "../types";
import type { StoreInfo } from "@/types/store";

interface ListingShellRouteProps {
  store: StoreInfo;
  categories: BeautySoftCategory[];
  products: BeautySoftProduct[];
  currencySymbol?: string;
}

export function ListingShellRoute({
  store,
  categories,
  products,
  currencySymbol = "$",
}: ListingShellRouteProps) {
  const nav = useTemplateNav();
  const { totalItems } = useCart();
  const { config } = useLayoutConfig<BeautySoftConfig>();

  const layout = config?.layout ?? beautySoftConfig.layout;
  const grid = config?.grid ?? beautySoftConfig.grid;

  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const handleCategoryChange = useCallback((id: string | null) => {
    setActiveCategoryId(id);
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

  const visibleProducts =
    activeCategoryId === null
      ? products
      : products.filter((p) => p.categoryId === activeCategoryId);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <ProductListingPage
        store={store}
        categories={categories}
        products={visibleProducts}
        activeCategoryId={activeCategoryId}
        activeTab="home"
        currencySymbol={currencySymbol}
        favorites={favorites}
        layout={layout}
        grid={grid}
        cartItemCount={totalItems}
        activeHref="/catalogo"
        onBack={nav.goHome}
        onSearchOpen={nav.goSearch}
        onCategoryChange={handleCategoryChange}
        onProductClick={handleProductClick}
        onFavoriteToggle={handleFavoriteToggle}
        onTabChange={handleTabChange}
        onNavLinkClick={handleNavLinkClick}
      />
    </motion.div>
  );
}
