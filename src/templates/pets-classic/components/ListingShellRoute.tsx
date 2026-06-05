"use client";

// Pets Classic — Listing Shell Route

import { useState } from "react";
import { ProductListingPage } from "./ProductListingPage";
import { useCart } from "../context/CartContext";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { petsClassicConfig } from "../config";
import type { PetsClassicConfig } from "../config";
import type {
  StoreInfo,
  PetsClassicCategory,
  PetsClassicProduct,
} from "../types";

interface ListingShellRouteProps {
  store: StoreInfo;
  categories: PetsClassicCategory[];
  products: PetsClassicProduct[];
  currencySymbol?: string;
}

export function ListingShellRoute({
  store,
  categories,
  products,
  currencySymbol = "$",
}: ListingShellRouteProps) {
  const nav = useTemplateNav();
  const { totalItems } = useCart();
  const { config } = useLayoutConfig<PetsClassicConfig>();

  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  return (
    <ProductListingPage
      store={store}
      categories={categories}
      products={products}
      layout={config.layout ?? petsClassicConfig.layout}
      grid={config.grid ?? petsClassicConfig.grid}
      activeTab="listing"
      activeCategoryId={activeCategoryId}
      cartItemCount={totalItems}
      currencySymbol={currencySymbol}
      onSearchClick={nav.goSearch}
      onCartClick={nav.goCart}
      onCatalogClick={nav.goListing}
      onCategoryChange={setActiveCategoryId}
      onProductClick={nav.goProduct}
      onTabChange={(tab) => {
        if (tab === "home") nav.goHome();
        else if (tab === "cart") nav.goCart();
        else if (tab === "listing") nav.goListing();
      }}
    />
  );
}
