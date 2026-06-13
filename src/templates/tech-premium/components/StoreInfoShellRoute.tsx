"use client";

// Tech Premium — StoreInfoShellRoute
// URL-router version of StoreInfoPage.
// Rendered at /template/tech-premium/info

import { useCallback } from "react";
import { StoreInfoPage } from "./StoreInfoPage";
import { useCart } from "../context/CartContext";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import type { TechPremiumConfig } from "../config";
import type { StoreInfo, NavTab } from "../types";

interface StoreInfoShellRouteProps {
  store: StoreInfo;
}

export function StoreInfoShellRoute({ store }: StoreInfoShellRouteProps) {
  const nav = useTemplateNav();
  const { totalItems } = useCart();
  const { config } = useLayoutConfig<TechPremiumConfig>();

  const handleTabChange = useCallback(
    (tab: NavTab) => {
      if (tab === "home") nav.goHome();
      else if (tab === "search") nav.goSearch();
      else if (tab === "cart") nav.goCart();
    },
    [nav]
  );

  const handleNavLinkClick = useCallback(
    (href: string) => {
      if (href === "/listing") nav.goListing();
      else nav.goHome();
    },
    [nav]
  );

  return (
    <StoreInfoPage
      store={store}
      navLinks={config.content?.navLinks ?? []}
      footerServices={config.content?.footerServices ?? []}
      footerAssistance={config.content?.footerAssistance ?? []}
      cartItemCount={totalItems}
      activeTab="info"
      onSearchClick={nav.goSearch}
      onCartClick={nav.goCart}
      onTabChange={handleTabChange}
      onNavLinkClick={handleNavLinkClick}
    />
  );
}
