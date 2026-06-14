"use client";

// Furniture Dark — StoreInfoShellRoute
// Client boundary. Wires navigation for the Info page.

import { useCallback } from "react";
import { StoreInfoPage } from "./StoreInfoPage";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { mockStore } from "../mock/data";

type TabId = "home" | "cart" | "search" | "info";

export function StoreInfoShellRoute() {
  const nav = useTemplateNav();

  const handleTabChange = useCallback(
    (tab: TabId) => {
      if (tab === "home") nav.goHome();
      else if (tab === "cart") nav.goCart();
      else if (tab === "search") nav.goSearch();
      else if (tab === "info") nav.goInfo();
    },
    [nav]
  );

  return (
    <StoreInfoPage
      store={mockStore}
      activeHref="/info"
      onSearchClick={nav.goSearch}
      onCartClick={nav.goCart}
      onNavLinkClick={(href) => {
        if (href === "/") nav.goHome();
        else if (href === "/catalogo") nav.goListing();
        else if (href === "/info") nav.goInfo();
      }}
      onTabChange={handleTabChange}
    />
  );
}
