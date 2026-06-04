"use client";

// Beauty Elegant Template — Product Detail Shell Route
// Client component that wraps ProductDetailPage.
// Handles navigation callbacks.

import { ProductDetailPage } from "./ProductDetailPage";
import { useTemplateNav } from "../hooks/useTemplateNav";
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

  return (
    <ProductDetailPage
      product={product}
      store={store}
      currencySymbol={currencySymbol}
      relatedProducts={relatedProducts}
      onBack={nav.goHome}
    />
  );
}
