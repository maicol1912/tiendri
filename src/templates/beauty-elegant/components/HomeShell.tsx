"use client";

// Beauty Elegant Template — HomeShell
// Client boundary. Reads live config from useLayoutConfig().
// Wires navigation, category filter, cart state.

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { HomePage } from "./HomePage";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { beautyElegantConfig } from "../config";
import type { BeautyElegantConfig } from "../config";
import type { BeautyElegantProduct, BeautyElegantCategory, NavTab } from "../types";
import type { StoreInfo } from "../types";

interface HomeShellProps {
  store: StoreInfo;
  categories: BeautyElegantCategory[];
  products: BeautyElegantProduct[];
  currencySymbol?: string;
}

export function HomeShell({
  store,
  categories,
  products,
  currencySymbol = "$",
}: HomeShellProps) {
  const nav = useTemplateNav();
  const { totalItems } = useCart();
  const { config } = useLayoutConfig<BeautyElegantConfig>();

  const layout = config?.layout ?? beautyElegantConfig.layout;
  const grid = config?.grid ?? beautyElegantConfig.grid;
  const sections = config?.sections ?? beautyElegantConfig.sections;
  const heroBanner = config?.content?.heroBanner ?? beautyElegantConfig.content.heroBanner;

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
      else if (tab === "search") nav.goSearch();
      else if (tab === "cart") nav.goCart();
      else if (tab === "info") nav.goInfo();
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
        activeHref="/"
        onSearchOpen={nav.goSearch}
        onCartOpen={nav.goCart}
        onNavLinkClick={handleNavLinkClick}
        onTabChange={handleTabChange}
        onSeeAll={nav.goListing}
      />
    </motion.div>
  );
}
