"use client";

// Food Night — StoreInfoShellRoute
// Client boundary. Wires navigation for the Info page.

import { useCallback } from "react";
import { StoreInfoPage } from "./StoreInfoPage";
import { useTemplateNav } from "../hooks/useTemplateNav";
import type { StoreInfo, NavTab } from "../types";

interface StoreInfoShellRouteProps {
  store: StoreInfo;
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
    (tab: NavTab) => {
      if (tab === "home") nav.goHome();
      else if (tab === "cart") nav.goCart();
      else if (tab === "search") nav.goSearch();
    },
    [nav]
  );

  return (
    <StoreInfoPage
      store={store}
      activeHref="/info"
      onBack={nav.goHome}
      onCartClick={nav.goCart}
      onSearchClick={nav.goSearch}
      onTabChange={handleTabChange}
      onNavLinkClick={handleNavLinkClick}
    />
  );
}
