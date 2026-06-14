"use client";

// Beauty Elegant Template — StoreInfoShellRoute
// Connects StoreInfoPage to navigation and cart.
// Rendered at /template/beauty-elegant/info

import { useCallback } from "react";
import { StoreInfoPage } from "./StoreInfoPage";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../hooks/useTemplateNav";
import type { StoreInfo, NavTab } from "../types";

interface StoreInfoShellRouteProps {
  store: StoreInfo;
}

export function StoreInfoShellRoute({ store }: StoreInfoShellRouteProps) {
  const nav = useTemplateNav();
  const { totalItems } = useCart();

  const handleTabChange = useCallback(
    (tab: NavTab) => {
      if (tab === "home") nav.goHome();
      else if (tab === "search") nav.goSearch();
      else if (tab === "cart") nav.goCart();
    },
    [nav]
  );

  return (
    <StoreInfoPage
      store={store}
      cartItemCount={totalItems}
      activeTab="info"
      onSearchOpen={nav.goSearch}
      onCartOpen={nav.goCart}
      onTabChange={handleTabChange}
    />
  );
}
