"use client";

// Beauty Elegant Template — Checkout Shell Route

import { CheckoutPage } from "./CheckoutPage";
import { useTemplateNav } from "../hooks/useTemplateNav";
import type { StoreInfo } from "../types";

interface CheckoutShellRouteProps {
  store: StoreInfo;
  currencySymbol?: string;
}

export function CheckoutShellRoute({
  store,
  currencySymbol = "$",
}: CheckoutShellRouteProps) {
  const nav = useTemplateNav();

  return (
    <CheckoutPage
      store={store}
      currencySymbol={currencySymbol}
      onBack={nav.goCart}
    />
  );
}
