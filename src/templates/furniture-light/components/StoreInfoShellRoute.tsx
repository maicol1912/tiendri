"use client";

// Furniture Light — StoreInfoShellRoute
// Client boundary. Wires navigation for the Info page.

import { useCallback } from "react";
import { StoreInfoPage } from "./StoreInfoPage";
import { useTemplateNav } from "../hooks/useTemplateNav";
import type { FurnitureStoreInfo, FurnitureNavTab } from "../types";

interface StoreInfoShellRouteProps {
  store: FurnitureStoreInfo;
}

export function StoreInfoShellRoute({ store }: StoreInfoShellRouteProps) {
  const nav = useTemplateNav();

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
      else if (tab === "search") nav.goSearch();
    },
    [nav]
  );

  return (
    <StoreInfoPage
      store={store}
      onBack={nav.goHome}
      onCartClick={nav.goCart}
      onSearchClick={nav.goSearch}
      onNavLinkClick={handleNavLinkClick}
      onTabChange={handleTabChange}
    />
  );
}
