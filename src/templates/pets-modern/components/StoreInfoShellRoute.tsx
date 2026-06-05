"use client";

// Pet Modern — StoreInfoShellRoute
// Connects StoreInfoPage to CartContext and navigation.
// Rendered at /template/pets-modern/info

import { useCallback } from "react";
import { StoreInfoPage } from "./StoreInfoPage";
import { useCart } from "../context/CartContext";
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
      switch (tab) {
        case "shop":
          nav.goHome();
          break;
        case "explore":
          nav.goExplore();
          break;
        case "cart":
          nav.goCart();
          break;
        default:
          break;
      }
    },
    [nav]
  );

  return (
    <StoreInfoPage
      store={store}
      cartItemCount={totalItems}
      activeTab="info"
      onSearchClick={nav.goSearch}
      onCartClick={nav.goCart}
      onHomeClick={nav.goHome}
      onExploreClick={nav.goExplore}
      onTabChange={handleTabChange}
    />
  );
}
