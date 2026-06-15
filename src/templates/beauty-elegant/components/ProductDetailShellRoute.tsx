"use client";

// Beauty Elegant Template — Product Detail Shell Route
// Client component that wraps ProductDetailPage.
// Handles navigation callbacks.

import { useCallback } from "react";
import { ProductDetailPage } from "./ProductDetailPage";
import { useTemplateNav } from "../../_shared/hooks/useTemplateNav";
import { useCart } from "@/lib/cart";
import type { BeautyElegantProduct } from "../types";
import type { StoreInfo } from "../types";

interface ProductDetailShellRouteProps {
  store: StoreInfo;
  product: BeautyElegantProduct;
  relatedProducts?: BeautyElegantProduct[];
  currencySymbol?: string;
}

export function ProductDetailShellRoute({
  store,
  product,
  relatedProducts = [],
  currencySymbol = "$",
}: ProductDetailShellRouteProps) {
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
    <ProductDetailPage
      product={product}
      store={store}
      currencySymbol={currencySymbol}
      relatedProducts={relatedProducts}
      cartItemCount={totalItems}
      onBack={nav.goHome}
      onNavLinkClick={handleNavLinkClick}
      onSearchOpen={nav.goSearch}
      onCartOpen={nav.goCart}
    />
  );
}
