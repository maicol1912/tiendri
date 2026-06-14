"use client";

// Food Night — Cart Shell Route
// Reads from CartContext + useTemplateNav, renders CartPage

import { CartPage } from "./CartPage";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { foodNightConfig } from "../config";
import type { FoodNightConfig } from "../config";
import type { StoreInfo } from "../types";

interface CartShellRouteProps {
  store: StoreInfo;
  currencySymbol?: string;
}

export function CartShellRoute({ store, currencySymbol = "$" }: CartShellRouteProps) {
  const nav = useTemplateNav();
  const { items, totalPrice: subtotal, removeItem, incrementItem, decrementItem } = useCart();
  const { config } = useLayoutConfig<FoodNightConfig>();
  const layout = config?.layout ?? foodNightConfig.layout;

  return (
    <CartPage
      store={store}
      items={items}
      subtotal={subtotal}
      currencySymbol={currencySymbol}
      activeTab="cart"
      layout={layout}
      onBack={nav.goHome}
      onIncrement={incrementItem}
      onDecrement={decrementItem}
      onRemove={removeItem}
      onCheckout={nav.goCheckout}
      onSearchClick={nav.goSearch}
      onTabChange={(tab) => {
        if (tab === "home") nav.goHome();
        else if (tab === "search") nav.goSearch();
        else if (tab === "info") nav.goInfo();
      }}
    />
  );
}
