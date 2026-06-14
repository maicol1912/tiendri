"use client";

// Beauty Elegant Template — Search Shell Route

import { useCallback } from "react";
import { SearchPage } from "./SearchPage";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { useCart } from "@/lib/cart";
import { beautyElegantConfig } from "../config";
import type { BeautyElegantConfig } from "../config";
import type { BeautyElegantProduct } from "../types";
import type { StoreInfo } from "../types";

interface SearchShellRouteProps {
  store: StoreInfo;
  products: BeautyElegantProduct[];
  currencySymbol?: string;
}

export function SearchShellRoute({
  store,
  products,
  currencySymbol = "$",
}: SearchShellRouteProps) {
  const nav = useTemplateNav();
  const { config } = useLayoutConfig<BeautyElegantConfig>();
  const { totalItems } = useCart();

  const layout = config?.layout ?? beautyElegantConfig.layout;
  const grid = config?.grid ?? beautyElegantConfig.grid;

  const handleNavLinkClick = useCallback(
    (href: string) => {
      if (href === "/") nav.goHome();
      else if (href === "/catalogo") nav.goListing();
      else if (href === "/info") nav.goInfo();
    },
    [nav]
  );

  return (
    <SearchPage
      store={store}
      allProducts={products}
      currencySymbol={currencySymbol}
      layout={layout}
      grid={grid}
      cartItemCount={totalItems}
      onProductClick={nav.goProduct}
      onBack={nav.goHome}
      onNavLinkClick={handleNavLinkClick}
      onSearchOpen={nav.goSearch}
      onCartOpen={nav.goCart}
    />
  );
}
