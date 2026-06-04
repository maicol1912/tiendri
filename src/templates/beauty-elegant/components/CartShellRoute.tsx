"use client";

// Beauty Elegant Template — Cart Shell Route
// Client wrapper for CartPage with navigation callbacks.

import { CartPage } from "./CartPage";
import { useTemplateNav } from "../hooks/useTemplateNav";
import type { StoreInfo } from "../types";

interface CartShellRouteProps {
  store: StoreInfo;
  currencySymbol?: string;
}

export function CartShellRoute({
  store: _store,
  currencySymbol = "$",
}: CartShellRouteProps) {
  const nav = useTemplateNav();

  return (
    <CartPage
      currencySymbol={currencySymbol}
      onBack={nav.goHome}
      onGoHome={nav.goHome}
      onCheckout={nav.goCheckout}
    />
  );
}
