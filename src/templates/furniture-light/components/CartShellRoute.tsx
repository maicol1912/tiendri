"use client";

// Furniture Light — CartShellRoute
// Rendered at /template/furniture-light/carrito

import { useCallback } from "react";
import { CartPage } from "./CartPage";
import { useCart } from "../context/CartContext";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import type { FurnitureLightConfig } from "../config";
import type { FurnitureStoreInfo, FurnitureNavTab } from "../types";

interface CartShellRouteProps {
  store: FurnitureStoreInfo;
  currencySymbol?: string;
}

export function CartShellRoute({ store, currencySymbol = "$" }: CartShellRouteProps) {
  const nav = useTemplateNav();
  const { items, totalItems, incrementItem, decrementItem, removeItem } = useCart();
  const { config } = useLayoutConfig<FurnitureLightConfig>();

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
      navLinks={config.navLinks}
      layout={config.layout}
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
    />
  );
}
