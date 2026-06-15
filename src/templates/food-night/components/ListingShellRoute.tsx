"use client";

// Food Night — Listing Shell Route

import { useState, useCallback, useMemo } from "react";
import { ProductListingPage } from "./ProductListingPage";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../../_shared/hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { foodNightConfig } from "../config";
import type { FoodNightConfig } from "../config";
import type { StoreInfo, Category, StorefrontProduct, FilterGroup, SortOption } from "../types";

interface ListingShellRouteProps {
  store: StoreInfo;
  categories: Category[];
  products: StorefrontProduct[];
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
  const { config } = useLayoutConfig<FoodNightConfig>();
  const layout = config?.layout ?? foodNightConfig.layout;
  const grid = config?.grid ?? foodNightConfig.grid;

  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("recent");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Build filter groups from categories + data
  const filterGroups = useMemo<FilterGroup[]>(() => {
    // Category counts
    const catCounts: Record<string, number> = {};
    for (const p of products) {
      if (p.categoryId) catCounts[p.categoryId] = (catCounts[p.categoryId] ?? 0) + 1;
    }

    return [
      {
        id: "category",
        label: "Categoría",
        options: categories.map((cat) => ({
          id: cat.id,
          label: cat.name,
          count: catCounts[cat.id] ?? 0,
        })),
      },
      {
        id: "price",
        label: "Precio",
        options: [
          { id: "under-30", label: "Menos de $30.000" },
          { id: "30-35", label: "$30.000 - $35.000" },
          { id: "35-40", label: "$35.000 - $40.000" },
          { id: "over-40", label: "Más de $40.000" },
        ],
      },
      {
        id: "rating",
        label: "Calificación",
        options: [
          { id: "4plus", label: "4 estrellas o más" },
          { id: "3plus", label: "3 estrellas o más" },
        ],
      },
      {
        id: "availability",
        label: "Disponibilidad",
        options: [
          { id: "available", label: "Disponible" },
          { id: "unavailable", label: "Agotado" },
        ],
      },
    ];
  }, [categories, products]);

  const handleNavLinkClick = useCallback((href: string) => {
    if (href === "/") nav.goHome();
    else if (href === "/catalogo") nav.goListing();
    else if (href === "/info") nav.goInfo();
  }, [nav]);

  const handleFilterChange = useCallback(
    (groupId: string, optionId: string, checked: boolean) => {
      setActiveFilters((prev) => {
        const current = prev[groupId] ?? [];
        if (checked) {
          return { ...prev, [groupId]: [...current, optionId] };
        } else {
          return { ...prev, [groupId]: current.filter((id) => id !== optionId) };
        }
      });
    },
    []
  );

  const handleClearAll = useCallback(() => {
    setActiveFilters({});
    setSearchQuery("");
  }, []);

  // Filtering logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description?.toLowerCase().includes(q) ?? false)
      );
    }

    // Category filter
    const catFilters = activeFilters["category"] ?? [];
    if (catFilters.length > 0) {
      result = result.filter((p) => p.categoryId && catFilters.includes(p.categoryId));
    }

    // Price filter
    const priceFilters = activeFilters["price"] ?? [];
    if (priceFilters.length > 0) {
      result = result.filter((p) => {
        return priceFilters.some((pf) => {
          if (pf === "under-30") return p.price < 30000;
          if (pf === "30-35") return p.price >= 30000 && p.price <= 35000;
          if (pf === "35-40") return p.price > 35000 && p.price <= 40000;
          if (pf === "over-40") return p.price > 40000;
          return false;
        });
      });
    }

    // Rating filter
    const ratingFilters = activeFilters["rating"] ?? [];
    if (ratingFilters.length > 0) {
      result = result.filter((p) => {
        const r = p.rating ?? 0;
        return ratingFilters.some((rf) => {
          if (rf === "4plus") return r >= 4;
          if (rf === "3plus") return r >= 3;
          return false;
        });
      });
    }

    // Availability filter
    const availFilters = activeFilters["availability"] ?? [];
    if (availFilters.length > 0) {
      result = result.filter((p) => {
        return availFilters.some((af) => {
          if (af === "available") return p.available === true;
          if (af === "unavailable") return p.available === false;
          return false;
        });
      });
    }

    // Sorting
    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case "recent":
      default:
        // Keep original order
        break;
    }

    return result;
  }, [products, searchQuery, activeFilters, sortOption]);

  return (
    <ProductListingPage
      store={store}
      categories={categories}
      products={filteredProducts}
      filterGroups={filterGroups}
      activeFilters={activeFilters}
      searchQuery={searchQuery}
      sortOption={sortOption}
      isFilterOpen={isFilterOpen}
      activeTab="home"
      activeHref="/catalogo"
      cartItemCount={totalItems}
      currencySymbol={currencySymbol}
      layout={layout}
      grid={grid}
      onSearchChange={setSearchQuery}
      onSortChange={setSortOption}
      onFilterChange={handleFilterChange}
      onClearAllFilters={handleClearAll}
      onFilterOpen={() => setIsFilterOpen(true)}
      onFilterClose={() => setIsFilterOpen(false)}
      onSearchClick={nav.goSearch}
      onCartClick={nav.goCart}
      onProductClick={nav.goProduct}
      onNavLinkClick={handleNavLinkClick}
      onTabChange={(tab) => {
        if (tab === "home") nav.goHome();
        else if (tab === "search") nav.goSearch();
        else if (tab === "cart") nav.goCart();
      }}
    />
  );
}
