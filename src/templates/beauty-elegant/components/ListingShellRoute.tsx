"use client";

// Beauty Elegant Template — Listing Shell Route
// Client boundary. Wires navigation, cart, filter state, search, and sort.

import { useState, useCallback, useMemo } from "react";
import { ProductListingPage } from "./ProductListingPage";
import { useTemplateNav } from "../../_shared/hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { useCart } from "@/lib/cart";
import { beautyElegantConfig } from "../config";
import { mockCategories } from "../mock/data";
import type { BeautyElegantConfig } from "../config";
import type {
  BeautyElegantProduct,
  BeautyElegantCategory,
  BeautyElegantSortOption,
  NavTab,
} from "../types";
import type { FilterGroup } from "@/types/templates/filter";
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
  const { totalItems, addItem } = useCart();

  const layout = config?.layout ?? beautyElegantConfig.layout;
  const grid = config?.grid ?? beautyElegantConfig.grid;

  // ── Filter state ──────────────────────────────────────────────────────────────
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<BeautyElegantSortOption>("recent");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // ── Build filter groups ───────────────────────────────────────────────────────
  const filterGroups: FilterGroup[] = useMemo(
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
          { id: "under-80k", label: "Menos de $80.000" },
          { id: "80k-120k", label: "$80.000 - $120.000" },
          { id: "120k-180k", label: "$120.000 - $180.000" },
          { id: "over-180k", label: "Más de $180.000" },
        ],
      },
      {
        id: "availability",
        label: "Disponibilidad",
        options: [
          { id: "in-stock", label: "Disponible" },
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
          if (range === "under-80k") return p.price < 80000;
          if (range === "80k-120k") return p.price >= 80000 && p.price < 120000;
          if (range === "120k-180k") return p.price >= 120000 && p.price < 180000;
          if (range === "over-180k") return p.price >= 180000;
          return false;
        })
      );
    }

    // Filter by availability — products use `inStock` boolean field
    if ((activeFilters.availability ?? []).length > 0) {
      result = result.filter((p) => {
        if (activeFilters.availability!.includes("in-stock") && p.inStock === true)
          return true;
        if (activeFilters.availability!.includes("out-of-stock") && p.inStock === false)
          return true;
        return false;
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter((p) => {
        if (p.name.toLowerCase().includes(q)) return true;
        if ((p.description ?? "").toLowerCase().includes(q)) return true;
        if ((p.subtitle ?? "").toLowerCase().includes(q)) return true;
        if (p.specs?.some((s) => s.toLowerCase().includes(q)))
          return true;
        return false;
      });
    }

    // Sort
    if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }
    // "recent" = keep original order

    return result;
  }, [products, activeFilters, searchQuery, sortOption]);

  // ── Active filter count ───────────────────────────────────────────────────────
  const activeFilterCount = useMemo(
    () => Object.values(activeFilters).reduce((sum, arr) => sum + arr.length, 0),
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
          const { [groupId]: _removed, ...rest } = prev;
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

  const handleTabChange = useCallback(
    (tab: NavTab) => {
      if (tab === "home") nav.goHome();
      else if (tab === "cart") nav.goCart();
      else if (tab === "search") nav.goSearch();
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

  const handleAddToCart = useCallback(
    (productId: string) => {
      const product = products.find((p) => p.id === productId);
      if (!product || !product.inStock) return;
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.images[0]?.url ?? null,
        variantName: null,
        quantity: 1,
      });
    },
    [products, addItem]
  );

  return (
    <ProductListingPage
      store={store}
      categories={categories}
      products={products}
      filteredProducts={filteredProducts}
      currencySymbol={currencySymbol}
      layout={layout}
      grid={grid}
      filterGroups={filterGroups}
      activeFilters={activeFilters}
      activeFilterCount={activeFilterCount}
      searchQuery={searchQuery}
      sortOption={sortOption}
      isFilterDrawerOpen={isFilterDrawerOpen}
      onFilterChange={handleFilterChange}
      onClearAll={handleClearAll}
      onSearchChange={setSearchQuery}
      onSortChange={setSortOption}
      onOpenFilterDrawer={() => setIsFilterDrawerOpen(true)}
      onCloseFilterDrawer={() => setIsFilterDrawerOpen(false)}
      onProductClick={nav.goProduct}
      onAddToCart={handleAddToCart}
      onBack={nav.goHome}
      onTabChange={handleTabChange}
      onNavLinkClick={handleNavLinkClick}
      onSearchOpen={nav.goSearch}
      onCartOpen={nav.goCart}
      cartItemCount={totalItems}
    />
  );
}
