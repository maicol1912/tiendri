"use client";

// Beauty Elegant Template — Checkout Shell Route

import { useCallback } from "react";
import { CheckoutPage } from "./CheckoutPage";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useCart } from "@/lib/cart";
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
    <CheckoutPage
      store={store}
      currencySymbol={currencySymbol}
      cartItemCount={totalItems}
      onBack={nav.goCart}
      onNavLinkClick={handleNavLinkClick}
      onSearchOpen={nav.goSearch}
      onCartOpen={nav.goCart}
    />
  );
}
