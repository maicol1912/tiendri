"use client";

// Pets Classic — Cart Shell Route
// Connects CartPage to CartContext and navigation.

import { CartPage } from "./CartPage";
import { useCart } from "../context/CartContext";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { petsClassicConfig } from "../config";
import type { PetsClassicConfig } from "../config";
import type { StoreInfo } from "../types";

interface CartShellRouteProps {
  store: StoreInfo;
  currencySymbol?: string;
}

export function CartShellRoute({ store, currencySymbol = "$" }: CartShellRouteProps) {
  const nav = useTemplateNav();
  const { items, totalItems, removeItem, incrementItem, decrementItem } = useCart();
  const { config } = useLayoutConfig<PetsClassicConfig>();

  return (
    <CartPage
      store={store}
      items={items}
      layout={config.layout ?? petsClassicConfig.layout}
      activeTab="cart"
      cartItemCount={totalItems}
      currencySymbol={currencySymbol}
      onBack={nav.goHome}
      onSearchClick={nav.goSearch}
      onCartClick={nav.goCart}
      onContinueShopping={nav.goHome}
      onCheckout={nav.goCheckout}
      onRemoveItem={removeItem}
      onIncrementItem={incrementItem}
      onDecrementItem={decrementItem}
      onTabChange={(tab) => {
        if (tab === "home") nav.goHome();
        else if (tab === "listing") nav.goListing();
        else if (tab === "info") nav.goInfo();
      }}
    />
  );
}
