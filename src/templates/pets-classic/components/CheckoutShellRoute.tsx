"use client";

// Pets Classic — Checkout Shell Route

import { CheckoutPage } from "./CheckoutPage";
import { useCart } from "../context/CartContext";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { petsClassicConfig } from "../config";
import type { PetsClassicConfig } from "../config";
import type { StoreInfo } from "../types";

interface CheckoutShellRouteProps {
  store: StoreInfo;
  currencySymbol?: string;
}

export function CheckoutShellRoute({ store, currencySymbol = "$" }: CheckoutShellRouteProps) {
  const nav = useTemplateNav();
  const { items, totalItems, clearCart } = useCart();
  const { config } = useLayoutConfig<PetsClassicConfig>();

  const handleSuccess = () => {
    clearCart();
    nav.goHome();
  };

  return (
    <CheckoutPage
      store={store}
      items={items}
      layout={config.layout ?? petsClassicConfig.layout}
      activeTab="cart"
      cartItemCount={totalItems}
      currencySymbol={currencySymbol}
      onBack={nav.goCart}
      onSearchClick={nav.goSearch}
      onCartClick={nav.goCart}
      onSuccess={handleSuccess}
      onTabChange={(tab) => {
        if (tab === "home") nav.goHome();
        else if (tab === "cart") nav.goCart();
      }}
    />
  );
}
