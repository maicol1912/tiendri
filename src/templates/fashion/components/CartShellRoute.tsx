"use client";

// Fashion Template — Cart Shell Route
// Uses useCart() for items, removeItem, incrementItem, decrementItem.
// Navigation via useTemplateNav.

import { useCallback } from "react";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { CartPage } from "./CartPage";
import type { StoreInfo, NavTab } from "../types";

interface CartShellInnerProps {
  store: StoreInfo;
  currencySymbol?: string;
}

function CartShellInner({ store, currencySymbol = "$" }: CartShellInnerProps) {
  const nav = useTemplateNav();
  const {
    items,
    totalItems,
    totalPrice,
    removeItem,
    incrementItem,
    decrementItem,
  } = useCart();

  const handleBack = useCallback(() => {
    if (typeof window !== "undefined") window.history.back();
  }, []);

  const handleTabChange = useCallback(
    (tab: NavTab) => {
      if (tab === "home") nav.goHome();
      else if (tab === "search") nav.goSearch();
      else if (tab === "cart") nav.goCart();
    },
    [nav]
  );

  return (
    <CartPage
      store={store}
      items={items}
      totalPrice={totalPrice}
      activeTab="cart"
      cartItemCount={totalItems}
      currencySymbol={currencySymbol}
      onBack={handleBack}
      onSearchClick={nav.goSearch}
      onCartClick={nav.goCart}
      onProductClick={(id) => nav.goProduct(id)}
      onRemoveItem={removeItem}
      onIncrementItem={incrementItem}
      onDecrementItem={decrementItem}
      onCheckout={nav.goCheckout}
      onContinueShopping={nav.goHome}
      onTabChange={handleTabChange}
    />
  );
}

interface CartShellRouteProps {
  store: StoreInfo;
  currencySymbol?: string;
}

export function CartShellRoute({ store, currencySymbol }: CartShellRouteProps) {
  return <CartShellInner store={store} currencySymbol={currencySymbol} />;
}
