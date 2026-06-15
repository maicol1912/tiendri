"use client";

// Tech Premium — CartShellRoute
// URL-router version of CartShell.
// Uses useTemplateNav() for navigation and useLayoutConfig() for config.
// Rendered at /template/tech-premium/carrito

import { useCallback } from "react";
import { CartPage } from "./CartPage";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../../_shared/hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import type { TechPremiumConfig } from "../config";
import type { StoreInfo, NavTab } from "../types";

interface CartShellRouteProps {
  store: StoreInfo;
  currencySymbol?: string;
}

export function CartShellRoute({
  store,
  currencySymbol = "$",
}: CartShellRouteProps) {
  const nav = useTemplateNav();
  const { items, totalItems, incrementItem, decrementItem, removeItem } = useCart();
  const { config } = useLayoutConfig<TechPremiumConfig>();

  const handleTabChange = useCallback(
    (tab: NavTab) => {
      if (tab === "home") nav.goHome();
      else if (tab === "search") nav.goSearch();
      else if (tab === "info") nav.goInfo();
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
    <CartPage
      store={store}
      items={items}
      navLinks={config.content?.navLinks ?? []}
      footerServices={config.content?.footerServices ?? []}
      footerAssistance={config.content?.footerAssistance ?? []}
      shipping={29}
      tax={50}
      currencySymbol={currencySymbol}
      activeTab="cart"
      cartItemCount={totalItems}
      onSearchClick={nav.goSearch}
      onCartClick={() => {
        // already on cart
      }}
      onIncrement={incrementItem}
      onDecrement={decrementItem}
      onRemove={removeItem}
      onCheckout={nav.goCheckout}
      onTabChange={handleTabChange}
      onNavLinkClick={handleNavLinkClick}
    />
  );
}
