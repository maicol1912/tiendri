"use client";

// Beauty Elegant Template — Listing Shell Route

import { ProductListingPage } from "./ProductListingPage";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { beautyElegantConfig } from "../config";
import type { BeautyElegantConfig } from "../config";
import type { BeautyElegantProduct, BeautyElegantCategory } from "../types";
import type { StoreInfo } from "../types";

interface ListingShellRouteProps {
  store: StoreInfo;
  categories: BeautyElegantCategory[];
  products: BeautyElegantProduct[];
  currencySymbol?: string;
}

export function ListingShellRoute({
  store,
  categories,
  products,
  currencySymbol = "$",
}: ListingShellRouteProps) {
  const nav = useTemplateNav();
  const { config } = useLayoutConfig<BeautyElegantConfig>();

  const layout = config?.layout ?? beautyElegantConfig.layout;
  const grid = config?.grid ?? beautyElegantConfig.grid;

  return (
    <ProductListingPage
      store={store}
      categories={categories}
      products={products}
      currencySymbol={currencySymbol}
      layout={layout}
      grid={grid}
      onProductClick={nav.goProduct}
      onBack={nav.goHome}
    />
  );
}
