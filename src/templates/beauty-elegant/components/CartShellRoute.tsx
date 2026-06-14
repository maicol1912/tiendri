"use client";

// Beauty Elegant Template — Cart Shell Route
// Client wrapper for CartPage with navigation callbacks.

import { useCallback } from "react";
import { CartPage } from "./CartPage";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useCart } from "@/lib/cart";
import type { StoreInfo } from "../types";

interface CartShellRouteProps {
  store: StoreInfo;
  currencySymbol?: string;
}

export function CartShellRoute({
  store,
  currencySymbol = "$",
}: CartShellRouteProps) {
  const nav = useTemplateNav();
  const { totalItems } = useCart();

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
      currencySymbol={currencySymbol}
      cartItemCount={totalItems}
      onBack={nav.goHome}
      onGoHome={nav.goHome}
      onCheckout={nav.goCheckout}
      onNavLinkClick={handleNavLinkClick}
      onSearchOpen={nav.goSearch}
      onCartOpen={nav.goCart}
    />
  );
}
