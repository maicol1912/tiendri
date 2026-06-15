"use client";

// Decor Warm Template — ListingShellRoute
// Client boundary. Wires navigation, cart, filter state, search, and sort.

import { useState, useCallback, useMemo } from "react";
import { ProductListingPage } from "./ProductListingPage";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../../_shared/hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { decorWarmConfig } from "../config";
import { mockCategories } from "../mock/data";
import type { DecorWarmConfig } from "../config";
import type { DecorWarmProduct, DecorWarmNavTab, FilterGroup, SortOption } from "../types";
import type { StoreInfo } from "@/types/store";

interface ListingShellRouteProps {
  store: StoreInfo;
  products: DecorWarmProduct[];
  currencySymbol?: string;
}

export function ListingShellRoute({
  store,
  products,
  currencySymbol = "$",
}: ListingShellRouteProps) {
  const nav = useTemplateNav();
  const { totalItems, addItem } = useCart();
  const { config } = useLayoutConfig<DecorWarmConfig>();

  const layout = config?.layout ?? decorWarmConfig.layout;
  const grid = config?.grid ?? decorWarmConfig.grid;

  // ── Filter state ──────────────────────────────────────────────────────────────
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("recent");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // ── Build filter groups from categories + static options ──────────────────────
  const filters: FilterGroup[] = useMemo(
    () => [
      {
        id: "category",
        label: "Categoría",
        options: mockCategories.map((cat) => ({
          id: cat.id,
          label: cat.name,
          count: products.filter((p) => p.categoryId === cat.id).length,
        })),
      },
      {
        id: "price",
        label: "Precio",
        options: [
          { id: "under-500k", label: "Menos de $500.000" },
          { id: "500k-1m", label: "$500.000 - $1.000.000" },
          { id: "1m-2m", label: "$1.000.000 - $2.000.000" },
          { id: "over-2m", label: "Más de $2.000.000" },
        ],
      },
      {
        id: "rating",
        label: "Valoración",
        options: [
          { id: "4-plus", label: "4 estrellas o más" },
          { id: "3-plus", label: "3 estrellas o más" },
        ],
      },
      {
        id: "availability",
        label: "Disponibilidad",
        options: [
          { id: "available", label: "Disponible" },
          { id: "out-of-stock", label: "Agotado" },
        ],
      },
    ],
    [products]
  );

  // ── Filtered + sorted products ────────────────────────────────────────────────
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if ((activeFilters.category ?? []).length > 0) {
      result = result.filter((p) =>
        activeFilters.category!.includes(p.categoryId ?? "")
      );
    }

    // Filter by price range
    if ((activeFilters.price ?? []).length > 0) {
      result = result.filter((p) =>
        activeFilters.price!.some((range) => {
          if (range === "under-500k") return p.price < 500000;
          if (range === "500k-1m") return p.price >= 500000 && p.price <= 1000000;
          if (range === "1m-2m") return p.price > 1000000 && p.price <= 2000000;
          if (range === "over-2m") return p.price > 2000000;
          return false;
        })
      );
    }

    // Filter by rating
    if ((activeFilters.rating ?? []).length > 0) {
      result = result.filter((p) => {
        const r = p.rating ?? 0;
        if (activeFilters.rating!.includes("4-plus") && r >= 4) return true;
        if (activeFilters.rating!.includes("3-plus") && r >= 3) return true;
        return false;
      });
    }

    // Filter by availability — products use `available` boolean field
    if ((activeFilters.availability ?? []).length > 0) {
      result = result.filter((p) => {
        if (
          activeFilters.availability!.includes("available") &&
          p.available === true
        )
          return true;
        if (
          activeFilters.availability!.includes("out-of-stock") &&
          p.available === false
        )
          return true;
        return false;
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description ?? "").toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating") {
      result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }
    // "recent" = keep original order (as-is)

    return result;
  }, [products, activeFilters, searchQuery, sortOption]);

  // ── Active filter count ───────────────────────────────────────────────────────
  const activeFilterCount = useMemo(
    () =>
      Object.values(activeFilters).reduce((sum, arr) => sum + arr.length, 0),
    [activeFilters]
  );

  // ── Handlers ──────────────────────────────────────────────────────────────────
  const handleFilterChange = useCallback(
    (groupId: string, optionId: string, checked: boolean) => {
      setActiveFilters((prev) => {
        const current = prev[groupId] ?? [];
        if (checked) {
          return { ...prev, [groupId]: [...current, optionId] };
        }
        const next = current.filter((id) => id !== optionId);
        if (next.length === 0) {
          const { [groupId]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [groupId]: next };
      });
    },
    []
  );

  const handleClearAll = useCallback(() => {
    setActiveFilters({});
    setSearchQuery("");
    setSortOption("recent");
  }, []);

  const handleAddToCart = useCallback(
    (product: DecorWarmProduct) => {
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.images[0]?.url ?? null,
        variantName: null,
        quantity: 1,
      });
    },
    [addItem]
  );

  const handleTabChange = useCallback(
    (tab: DecorWarmNavTab) => {
      if (tab === "home") nav.goHome();
      else if (tab === "cart") nav.goCart();
      else if (tab === "info") nav.goInfo();
    },
    [nav]
  );

  const handleNavLinkClick = useCallback(
    (href: string) => {
      if (href === "/") nav.goHome();
      else if (href === "/catalogo") nav.goListing();
      else if (href === "/info") nav.goInfo();
    },
    [nav]
  );

  return (
    <ProductListingPage
      store={store}
      products={filteredProducts}
      cartItemCount={totalItems}
      currencySymbol={currencySymbol}
      layout={layout}
      grid={grid}
      filters={filters}
      activeFilters={activeFilters}
      searchQuery={searchQuery}
      sortOption={sortOption}
      filteredCount={filteredProducts.length}
      activeFilterCount={activeFilterCount}
      isFilterDrawerOpen={isFilterDrawerOpen}
      onSearchOpen={nav.goSearch}
      onCartOpen={nav.goCart}
      onNavLinkClick={handleNavLinkClick}
      onProductClick={(id) => nav.goProduct(id)}
      onAddToCart={handleAddToCart}
      onTabChange={handleTabChange}
      onFilterChange={handleFilterChange}
      onClearAll={handleClearAll}
      onFilterDrawerToggle={() => setIsFilterDrawerOpen((prev) => !prev)}
      onFilterDrawerClose={() => setIsFilterDrawerOpen(false)}
      onSearchQueryChange={setSearchQuery}
      onSortChange={setSortOption}
    />
  );
}
