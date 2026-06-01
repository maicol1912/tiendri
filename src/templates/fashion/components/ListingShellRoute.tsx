"use client";

// Fashion Template — Product Listing Shell Route
// State: activeCategoryId, selectedSizes[], sortOption.
// Applies filter + sort logic before passing to ProductListingPage.
// Navigation via useTemplateNav.
// Reads configOverride from LayoutConfigContext for grid + layout props.

import { useState, useCallback, useMemo } from "react";
import { CartProvider, useCart } from "../context/CartContext";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { ProductListingPage } from "./ProductListingPage";
import { fashionConfig } from "../config";
import type { FashionConfig } from "../config";
import type { StoreInfo, Category, StorefrontProduct, NavTab, SortOption } from "../types";

interface ListingShellInnerProps {
  store: StoreInfo;
  products: StorefrontProduct[];
  categories: Category[];
  currencySymbol?: string;
}

function ListingShellInner({
  store,
  products,
  categories,
  currencySymbol = "$",
}: ListingShellInnerProps) {
  const nav = useTemplateNav();
  const { totalItems } = useCart();
  const { config } = useLayoutConfig<FashionConfig>();

  const resolvedGrid = config?.grid?.listing ?? fashionConfig.grid.listing;
  const resolvedLayout = config?.layout ?? fashionConfig.layout;

  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategoryId !== null) {
      result = result.filter((p) => p.categoryId === activeCategoryId);
    }

    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.storageOptions
          ? p.storageOptions.some((s) => selectedSizes.includes(s))
          : true
      );
    }

    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
      default:
        break;
    }

    return result;
  }, [products, activeCategoryId, selectedSizes, sortOption]);

  const handleSizeToggle = useCallback((size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  }, []);

  const handleProductClick = useCallback(
    (id: string) => nav.goProduct(id),
    [nav]
  );

  const handleTabChange = useCallback(
    (tab: NavTab) => {
      if (tab === "home") nav.goHome();
      else if (tab === "search") nav.goSearch();
      else if (tab === "cart") nav.goCart();
    },
    [nav]
  );

  return (
    <ProductListingPage
      store={store}
      products={filteredProducts}
      categories={categories}
      activeCategoryId={activeCategoryId}
      selectedSizes={selectedSizes}
      sortOption={sortOption}
      activeTab="home"
      cartItemCount={totalItems}
      currencySymbol={currencySymbol}
      showFilterPanel={showFilterPanel}
      grid={resolvedGrid}
      layout={resolvedLayout}
      onSearchClick={nav.goSearch}
      onCartClick={nav.goCart}
      onProductClick={handleProductClick}
      onCategoryChange={(id) => setActiveCategoryId(id)}
      onSizeToggle={handleSizeToggle}
      onSortChange={(sort) => setSortOption(sort)}
      onFilterToggle={() => setShowFilterPanel((prev) => !prev)}
      onTabChange={handleTabChange}
    />
  );
}

interface ListingShellRouteProps {
  store: StoreInfo;
  products: StorefrontProduct[];
  categories: Category[];
  currencySymbol?: string;
}

export function ListingShellRoute({ store, ...rest }: ListingShellRouteProps) {
  return (
    <CartProvider slug={store.slug}>
      <ListingShellInner store={store} {...rest} />
    </CartProvider>
  );
}
