"use client";

// Pet V3 Template — Cart Shell Route
// Wraps CartPage with cart context + navigation.

import { useCallback } from "react";
import { CartPage } from "./CartPage";
import { useCart } from "../context/CartContext";
import { useTemplateNav } from "../hooks/useTemplateNav";
import type { StoreInfo, NavTab } from "../types";

interface CartShellRouteProps {
  store: StoreInfo;
  currencySymbol?: string;
}

export function CartShellRoute({
  currencySymbol = "$",
}: CartShellRouteProps) {
  const nav = useTemplateNav();
  const { items, totalPrice, incrementItem, decrementItem, removeItem } = useCart();

  const handleTabChange = useCallback(
    (tab: NavTab) => {
      switch (tab) {
        case "shop":
          nav.goHome();
          break;
        case "explore":
          nav.goExplore();
          break;
        default:
          break;
      }
    },
    [nav]
  );

  return (
    <CartPage
      items={items}
      totalPrice={totalPrice}
      currencySymbol={currencySymbol}
      activeTab="shop"
      onBack={() => nav.goHome()}
      onCheckout={nav.goCheckout}
      onIncrement={incrementItem}
      onDecrement={decrementItem}
      onRemove={removeItem}
      onTabChange={handleTabChange}
    />
  );
}
