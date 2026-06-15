"use client";

// Food Night — Search Shell Route

import { useCallback } from "react";
import { SearchPage } from "./SearchPage";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../../_shared/hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { foodNightConfig } from "../config";
import type { FoodNightConfig } from "../config";
import type { StoreInfo, StorefrontProduct } from "../types";

interface SearchShellRouteProps {
  store: StoreInfo;
  products: StorefrontProduct[];
  currencySymbol?: string;
}

export function SearchShellRoute({
  store,
  products,
  currencySymbol = "$",
}: SearchShellRouteProps) {
  const nav = useTemplateNav();
  const { totalItems } = useCart();
  const { config } = useLayoutConfig<FoodNightConfig>();
  const layout = config?.layout ?? foodNightConfig.layout;
  const grid = config?.grid ?? foodNightConfig.grid;

  const handleNavLinkClick = useCallback((href: string) => {
    if (href === "/") nav.goHome();
    else if (href === "/catalogo") nav.goListing();
    else if (href === "/info") nav.goInfo();
  }, [nav]);

  // Popular = first 8, sorted by rating desc
  const popularProducts = [...products]
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0, 8);

  return (
    <SearchPage
      store={store}
      allProducts={products}
      popularProducts={popularProducts}
      currencySymbol={currencySymbol}
      activeTab="search"
      activeHref={undefined}
      cartItemCount={totalItems}
      layout={layout}
      grid={grid}
      onBack={nav.goHome}
      onProductClick={nav.goProduct}
      onCartClick={nav.goCart}
      onNavLinkClick={handleNavLinkClick}
      onTabChange={(tab) => {
        if (tab === "home") nav.goHome();
        else if (tab === "cart") nav.goCart();
      }}
    />
  );
}
