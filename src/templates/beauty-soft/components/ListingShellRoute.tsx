"use client";

// Beauty Soft Template — ListingShellRoute
// Client boundary. Wires navigation, cart, filter state, search, and sort.

import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { ProductListingPage } from "./ProductListingPage";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { beautySoftConfig } from "../config";
import { mockCategories } from "../mock/data";
import type { BeautySoftConfig } from "../config";
import type {
  BeautySoftProduct,
  BeautySoftCategory,
  NavTab,
  FilterGroup,
  SortOption,
} from "../types";
import type { StoreInfo } from "@/types/store";

interface ListingShellRouteProps {
  store: StoreInfo;
  categories: BeautySoftCategory[];
  products: BeautySoftProduct[];
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
  const { config } = useLayoutConfig<BeautySoftConfig>();

  const layout = config?.layout ?? beautySoftConfig.layout;
  const grid = config?.grid ?? beautySoftConfig.grid;

  // ── Filter state ──────────────────────────────────────────────────────────────
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("recent");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // ── Build filter groups from categories ──────────────────────────────────────
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
          { id: "under-60k", label: "Menos de $60.000" },
          { id: "60k-80k", label: "$60.000 - $80.000" },
          { id: "80k-100k", label: "$80.000 - $100.000" },
          { id: "over-100k", label: "Más de $100.000" },
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
          if (range === "under-60k") return p.price < 60000;
          if (range === "60k-80k") return p.price >= 60000 && p.price < 80000;
          if (range === "80k-100k") return p.price >= 80000 && p.price < 100000;
          if (range === "over-100k") return p.price >= 100000;
          return false;
        })
      );
    }

    // Filter by rating — uses product.rating field
    if ((activeFilters.rating ?? []).length > 0) {
      result = result.filter((p) => {
        const rating = p.rating ?? 0;
        if (activeFilters.rating!.includes("4-plus") && rating >= 4) return true;
        if (activeFilters.rating!.includes("3-plus") && rating >= 3) return true;
        return false;
      });
    }

    // Filter by availability — uses product.inStock boolean
    if ((activeFilters.availability ?? []).length > 0) {
      result = result.filter((p) => {
        if (activeFilters.availability!.includes("in-stock") && p.inStock === true)
          return true;
        if (activeFilters.availability!.includes("out-of-stock") && p.inStock === false)
          return true;
        return false;
      });
    }

    // Filter by search query — case-insensitive on name + description
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter((p) => {
        if (p.name.toLowerCase().includes(q)) return true;
        if ((p.description ?? "").toLowerCase().includes(q)) return true;
        return false;
      });
    }

    // Sort
    if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating") {
      result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
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

  const handleProductClick = useCallback(
    (productId: string) => nav.goProduct(productId),
    [nav]
  );

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

  // Suppress unused variable — categories prop kept for API compat
  void categories;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <ProductListingPage
        store={store}
        categories={categories}
        products={products}
        filteredProducts={filteredProducts}
        currencySymbol={currencySymbol}
        layout={layout}
        grid={grid}
        activeTab="home"
        cartItemCount={totalItems}
        activeHref="/catalogo"
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
        onBack={nav.goHome}
        onSearchOpen={nav.goSearch}
        onCartClick={nav.goCart}
        onProductClick={handleProductClick}
        onTabChange={handleTabChange}
        onNavLinkClick={handleNavLinkClick}
      />
    </motion.div>
  );
}
