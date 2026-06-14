"use client";

// Decor Warm Template — CartShellRoute
// Client boundary. Wires cart state + navigation.

import { useCallback } from "react";
import { CartPage } from "./CartPage";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../hooks/useTemplateNav";
import type { StoreInfo } from "@/types/store";
import type { DecorWarmNavTab } from "../types";

interface CartShellRouteProps {
  store: StoreInfo;
  currencySymbol?: string;
}

export function CartShellRoute({ store: _store, currencySymbol = "$" }: CartShellRouteProps) {
  const nav = useTemplateNav();
  const { items, totalPrice, removeItem, incrementItem, decrementItem } = useCart();

  const handleIncrement = useCallback(
    (productId: string) => incrementItem(productId),
    [incrementItem]
  );

  const handleDecrement = useCallback(
    (productId: string) => {
      const item = items.find((i) => i.productId === productId);
      if (!item) return;
      if (item.quantity <= 1) removeItem(productId);
      else decrementItem(productId);
    },
    [items, removeItem, decrementItem]
  );

  const handleTabChange = useCallback(
    (tab: DecorWarmNavTab) => {
      if (tab === "home") nav.goHome();
      else if (tab === "categories") nav.goListing();
      else if (tab === "info") nav.goInfo();
    },
    [nav]
  );

  return (
    <CartPage
      items={items}
      totalPrice={totalPrice}
      currencySymbol={currencySymbol}
      onBack={nav.goHome}
      onGoHome={nav.goHome}
      onCheckout={nav.goCheckout}
      onIncrement={handleIncrement}
      onDecrement={handleDecrement}
      onRemove={removeItem}
      onTabChange={handleTabChange}
    />
  );
}
