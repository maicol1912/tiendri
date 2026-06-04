"use client";

// Beauty Elegant Template — Search Shell Route

import { SearchPage } from "./SearchPage";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { beautyElegantConfig } from "../config";
import type { BeautyElegantConfig } from "../config";
import type { BeautyElegantProduct } from "../types";
import type { StoreInfo } from "../types";

interface SearchShellRouteProps {
  store: StoreInfo;
  products: BeautyElegantProduct[];
  currencySymbol?: string;
}

export function SearchShellRoute({
  store,
  products,
  currencySymbol = "$",
}: SearchShellRouteProps) {
  const nav = useTemplateNav();
  const { config } = useLayoutConfig<BeautyElegantConfig>();

  const layout = config?.layout ?? beautyElegantConfig.layout;
  const grid = config?.grid ?? beautyElegantConfig.grid;

  return (
    <SearchPage
      store={store}
      allProducts={products}
      currencySymbol={currencySymbol}
      layout={layout}
      grid={grid}
      onProductClick={nav.goProduct}
      onBack={nav.goHome}
    />
  );
}
