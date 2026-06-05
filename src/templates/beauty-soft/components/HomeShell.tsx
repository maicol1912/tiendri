"use client";

// Beauty Soft Template — HomeShell
// Client boundary. Reads live config from useLayoutConfig().
// Wires navigation, category filter, cart state, and favorites.

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { HomePage } from "./HomePage";
import { useCart } from "../context/CartContext";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { beautySoftConfig } from "../config";
import type { BeautySoftConfig } from "../config";
import type { BeautySoftProduct, BeautySoftCategory, HeroBannerData, NavTab } from "../types";
import type { StoreInfo } from "@/types/store";

interface HomeShellProps {
  store: StoreInfo;
  categories: BeautySoftCategory[];
  products: BeautySoftProduct[];
  heroBanner?: HeroBannerData | null;
  currencySymbol?: string;
}

export function HomeShell({
  store,
  categories,
  products,
  heroBanner = null,
  currencySymbol = "$",
}: HomeShellProps) {
  const nav = useTemplateNav();
  const { totalItems } = useCart();
  const { config } = useLayoutConfig<BeautySoftConfig>();

  const layout = config?.layout ?? beautySoftConfig.layout;
  const grid = config?.grid ?? beautySoftConfig.grid;
  const sections = config?.sections ?? beautySoftConfig.sections;

  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const handleCategoryChange = useCallback((id: string | null) => {
    setActiveCategoryId(id);
  }, []);

  const handleProductClick = useCallback(
    (productId: string) => nav.goProduct(productId),
    [nav]
  );

  const handleTabChange = useCallback(
    (tab: NavTab) => {
      if (tab === "home") nav.goHome();
      else if (tab === "cart") nav.goCart();
      else if (tab === "search") nav.goSearch();
      else if (tab === "info") nav.goInfo();
    },
    [nav]
  );

  // Filter products by active category
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
      <HomePage
        store={store}
        categories={categories}
        products={visibleProducts}
        activeCategoryId={activeCategoryId}
        activeTab="home"
        cartItemCount={totalItems}
        currencySymbol={currencySymbol}
        heroBanner={heroBanner}
        layout={layout}
        grid={grid}
        sections={[...sections]}
        onCategoryChange={handleCategoryChange}
        onProductClick={handleProductClick}
        onSearchOpen={nav.goSearch}
        onCartOpen={nav.goCart}
        onTabChange={handleTabChange}
        onSeeAll={nav.goListing}
      />
    </motion.div>
  );
}
