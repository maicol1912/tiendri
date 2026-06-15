"use client";

// Beauty Soft Template — CartShellRoute
// Client boundary. Wires cart state + navigation.

import { useCallback } from "react";
import { CartPage } from "./CartPage";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../../_shared/hooks/useTemplateNav";
import type { StoreInfo } from "@/types/store";

interface CartShellRouteProps {
  store: StoreInfo;
  currencySymbol?: string;
}

export function CartShellRoute({ store, currencySymbol = "$" }: CartShellRouteProps) {
  const nav = useTemplateNav();
  const { items, totalPrice, totalItems, addItem: _addItem, removeItem, incrementItem, decrementItem } = useCart();

  const handleIncrement = useCallback(
    (productId: string, variantLabel?: string | null) => {
      incrementItem(productId, variantLabel ?? null);
    },
    [incrementItem]
  );

  const handleDecrement = useCallback(
    (productId: string, variantLabel?: string | null) => {
      const item = items.find(
        (i) => i.productId === productId && (i.variantName ?? null) === (variantLabel ?? null)
      );
      if (!item) return;
      if (item.quantity <= 1) {
        removeItem(productId, variantLabel ?? null);
      } else {
        decrementItem(productId, variantLabel ?? null);
      }
    },
    [items, removeItem, decrementItem]
  );

  const handleTabChange = useCallback(
    (tab: "home" | "cart" | "search" | "info") => {
      if (tab === "home") nav.goHome();
      else if (tab === "cart") nav.goCart();
      else if (tab === "search") nav.goSearch();
      else if (tab === "info") nav.goInfo();
    },
    [nav]
  );

  const handleNavLinkClick = useCallback(
    (href: string) => {
      if (href === "/") nav.goHome();
      else if (href === "/catalogo") nav.goListing();
      else if (href === "/info") nav.goInfo();
    },
    [nav]
  );

  return (
    <CartPage
      store={store}
      items={items}
      totalPrice={totalPrice}
      currencySymbol={currencySymbol}
      cartItemCount={totalItems}
      onBack={nav.goHome}
      onGoHome={nav.goHome}
      onCheckout={nav.goCheckout}
      onIncrement={handleIncrement}
      onDecrement={handleDecrement}
      onRemove={(productId, variantLabel) => removeItem(productId, variantLabel ?? null)}
      onTabChange={handleTabChange}
      onNavLinkClick={handleNavLinkClick}
    />
  );
}
