"use client";

// Decor Warm Template — Store Info Shell Route
// Client boundary. Wires navigation into StoreInfoPage.

import { useCallback } from "react";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { StoreInfoPage } from "./StoreInfoPage";
import type { StoreInfo } from "@/types/store";
import type { DecorWarmNavTab } from "../types";

interface StoreInfoShellRouteProps {
  store: StoreInfo;
}

export function StoreInfoShellRoute({ store }: StoreInfoShellRouteProps) {
  const nav = useTemplateNav();
  const { totalItems } = useCart();

  const handleTabChange = useCallback(
    (tab: DecorWarmNavTab) => {
      if (tab === "home") nav.goHome();
      else if (tab === "categories") nav.goListing();
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

  return (
    <StoreInfoPage
      store={store}
      activeTab="info"
      cartItemCount={totalItems}
      onBack={nav.goHome}
      onSearchClick={nav.goSearch}
      onCartOpen={nav.goCart}
      onNavLinkClick={handleNavLinkClick}
      onTabChange={handleTabChange}
    />
  );
}
