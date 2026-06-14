"use client";

// Fashion Template — Store Info Shell Route
// Client boundary. Wires navigation into StoreInfoPage.

import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { StoreInfoPage } from "./StoreInfoPage";
import type { StoreInfo, NavTab } from "../types";

interface StoreInfoShellRouteInnerProps {
  store: StoreInfo;
}

function StoreInfoShellRouteInner({ store }: StoreInfoShellRouteInnerProps) {
  const nav = useTemplateNav();
  const { totalItems } = useCart();

  const handleTabChange = (tab: NavTab) => {
    if (tab === "home") nav.goHome();
    else if (tab === "search") nav.goSearch();
    else if (tab === "cart") nav.goCart();
    else if (tab === "info") nav.goInfo();
  };

  return (
    <StoreInfoPage
      store={store}
      activeTab="info"
      cartItemCount={totalItems}
      onSearchClick={nav.goSearch}
      onCartClick={nav.goCart}
      onTabChange={handleTabChange}
    />
  );
}

interface StoreInfoShellRouteProps {
  store: StoreInfo;
}

export function StoreInfoShellRoute({ store }: StoreInfoShellRouteProps) {
  return <StoreInfoShellRouteInner store={store} />;
}
