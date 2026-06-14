"use client";

// Fashion Template — Home Shell
// Wraps HomePage with CartProvider.
// Navigation via useTemplateNav.
// Reads configOverride from LayoutConfigContext provided by TemplateLayoutClient.
// Passes sections, layout, and grid from the active config down to HomePage.

import { useCallback } from "react";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { HomePage } from "./HomePage";
import { fashionConfig } from "../config";
import type { FashionConfig } from "../config";
import type { StoreInfo, StorefrontProduct, NavTab } from "../types";

interface Collection {
  title: string;
  products: StorefrontProduct[];
}

interface HomeShellInnerProps {
  store: StoreInfo;
  products: StorefrontProduct[];
  collections?: Collection[];
  allProducts?: StorefrontProduct[];
  currencySymbol?: string;
}

function HomeShellInner({
  store,
  products,
  collections,
  currencySymbol = "$",
}: HomeShellInnerProps) {
  const nav = useTemplateNav();
  const { totalItems } = useCart();
  const { config } = useLayoutConfig<FashionConfig>();

  // Resolve config values: context override → fashionConfig defaults
  const resolvedSections = config?.sections ?? fashionConfig.sections;
  const resolvedLayout = config?.layout ?? fashionConfig.layout;
  const resolvedGrid = config?.grid ?? fashionConfig.grid;

  const handleProductClick = useCallback(
    (id: string) => nav.goProduct(id),
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

  return (
    <HomePage
      store={store}
      products={products}
      collections={collections}
      activeTab="home"
      cartItemCount={totalItems}
      currencySymbol={currencySymbol}
      sections={resolvedSections}
      layout={resolvedLayout}
      grid={resolvedGrid}
      onSearchClick={nav.goSearch}
      onCartClick={nav.goCart}
      onShopClick={nav.goListing}
      onProductClick={handleProductClick}
      onTabChange={handleTabChange}
    />
  );
}

interface HomeShellProps {
  store: StoreInfo;
  products: StorefrontProduct[];
  collections?: Collection[];
  allProducts?: StorefrontProduct[];
  currencySymbol?: string;
}

export function HomeShell({ store, ...rest }: HomeShellProps) {
  return <HomeShellInner store={store} {...rest} />;
}
