"use client";

// Furniture Light — CartShellRoute
// Rendered at /template/furniture-light/carrito

import { useCallback } from "react";
import { CartPage } from "./CartPage";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../../_shared/hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import type { FurnitureLightConfig } from "../config";
import type { StoreInfo, FurnitureNavTab } from "../types";

interface CartShellRouteProps {
  store: StoreInfo;
  currencySymbol?: string;
}

export function CartShellRoute({ store, currencySymbol = "$" }: CartShellRouteProps) {
  const nav = useTemplateNav();
  const { items, totalItems, incrementItem, decrementItem, removeItem } = useCart();
  const { config } = useLayoutConfig<FurnitureLightConfig>();

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
      else if (tab === "search") nav.goSearch();
      else if (tab === "info") nav.goInfo();
    },
    [nav]
  );

  return (
    <CartPage
      store={store}
      items={items}
      navLinks={config.content?.navLinks ?? []}
      layout={config.layout}
      currencySymbol={currencySymbol}
      activeTab="cart"
      cartItemCount={totalItems}
      onSearchClick={nav.goSearch}
      onNavLinkClick={handleNavLinkClick}
      onCartClick={() => {
        // already on cart
      }}
      onIncrement={incrementItem}
      onDecrement={decrementItem}
      onRemove={removeItem}
      onCheckout={nav.goCheckout}
      onTabChange={handleTabChange}
    />
  );
}
