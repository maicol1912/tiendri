"use client";

// Pets Classic — StoreInfoShellRoute
// Connects StoreInfoPage to CartContext and navigation.
// Rendered at /template/pets-classic/info

import { StoreInfoPage } from "./StoreInfoPage";
import { useCart } from "../context/CartContext";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { petsClassicConfig } from "../config";
import type { PetsClassicConfig } from "../config";
import type { StoreInfo, NavTab } from "../types";

interface StoreInfoShellRouteProps {
  store: StoreInfo;
}

export function StoreInfoShellRoute({ store }: StoreInfoShellRouteProps) {
  const nav = useTemplateNav();
  const { totalItems } = useCart();
  const { config } = useLayoutConfig<PetsClassicConfig>();

  const layout = config.layout ?? petsClassicConfig.layout;

  return (
    <StoreInfoPage
      store={store}
      cartItemCount={totalItems}
      activeTab="info"
      animationLevel={layout.animationLevel ?? "none"}
      onSearchClick={nav.goSearch}
      onCartClick={nav.goCart}
      onMenuClick={nav.goHome}
      onCatalogClick={nav.goListing}
      onTabChange={(tab: NavTab) => {
        if (tab === "home") nav.goHome();
        else if (tab === "cart") nav.goCart();
        else if (tab === "listing") nav.goListing();
      }}
    />
  );
}
