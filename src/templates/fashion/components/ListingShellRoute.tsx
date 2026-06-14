"use client";

// Fashion Template — Product Listing Shell Route
// State: activeFilters, searchQuery, sortOption, isFilterDrawerOpen.
// Builds filter groups from categories with counts.
// useMemo filtering + sorting before passing to ProductListingPage.

import { useState, useCallback, useMemo } from "react";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { ProductListingPage } from "./ProductListingPage";
import { fashionConfig } from "../config";
import type { FashionConfig } from "../config";
import type { StoreInfo, Category, StorefrontProduct, NavTab } from "../types";
import type { FilterGroup, SortOption } from "../types";

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

  // ── Filter state ────────────────────────────────────────────────────────────
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("recent");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // ── Build filter groups ─────────────────────────────────────────────────────
  const filterGroups = useMemo((): FilterGroup[] => {
    // Category counts from actual products
    const categoryCounts = categories.reduce<Record<string, number>>((acc, cat) => {
      acc[cat.id] = products.filter((p) => p.categoryId === cat.id).length;
      return acc;
    }, {});

    return [
      {
        id: "category",
        label: "Categoría",
        options: categories.map((cat) => ({
          id: cat.id,
          label: cat.name,
          count: categoryCounts[cat.id] ?? 0,
        })),
      },
      {
        id: "price",
        label: "Precio",
        options: [
          { id: "under-80k", label: "Menos de $80.000" },
          { id: "80k-130k", label: "$80.000 – $130.000" },
          { id: "130k-200k", label: "$130.000 – $200.000" },
          { id: "over-200k", label: "Más de $200.000" },
        ],
      },
      {
        id: "size",
        label: "Talla",
        options: ["XS", "S", "M", "L", "XL", "XXL"].map((s) => ({
          id: s.toLowerCase(),
          label: s,
        })),
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
    ];
  }, [categories, products]);

  // ── Filter + sort logic ─────────────────────────────────────────────────────
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.subtitle ?? "").toLowerCase().includes(q) ||
          (p.description ?? "").toLowerCase().includes(q)
      );
    }

    // Category
    const categoryFilters = activeFilters["category"] ?? [];
    if (categoryFilters.length > 0) {
      result = result.filter((p) => categoryFilters.includes(p.categoryId ?? ""));
    }

    // Price
    const priceFilters = activeFilters["price"] ?? [];
    if (priceFilters.length > 0) {
      result = result.filter((p) => {
        return priceFilters.some((pf) => {
          if (pf === "under-80k") return p.price < 80000;
          if (pf === "80k-130k") return p.price >= 80000 && p.price <= 130000;
          if (pf === "130k-200k") return p.price > 130000 && p.price <= 200000;
          if (pf === "over-200k") return p.price > 200000;
          return false;
        });
      });
    }

    // Size
    const sizeFilters = activeFilters["size"] ?? [];
    if (sizeFilters.length > 0) {
      result = result.filter((p) =>
        p.storageOptions
          ? p.storageOptions.some((s) => sizeFilters.includes(s.toLowerCase()))
          : false
      );
    }

    // Rating
    const ratingFilters = activeFilters["rating"] ?? [];
    if (ratingFilters.length > 0) {
      result = result.filter((p) => {
        const r = p.rating ?? 0;
        return ratingFilters.some((rf) => {
          if (rf === "4-plus") return r >= 4;
          if (rf === "3-plus") return r >= 3;
          return false;
        });
      });
    }

    // Availability
    const availFilters = activeFilters["availability"] ?? [];
    if (availFilters.length > 0) {
      result = result.filter((p) => {
        return availFilters.some((af) => {
          if (af === "in-stock") return p.inStock === true;
          if (af === "out-of-stock") return p.inStock === false;
          return false;
        });
      });
    }

    // Sort
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
        break;
    }

    return result;
  }, [products, activeFilters, searchQuery, sortOption]);

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleFilterChange = useCallback(
    (groupId: string, optionId: string, checked: boolean) => {
      setActiveFilters((prev) => {
        const current = prev[groupId] ?? [];
        return {
          ...prev,
          [groupId]: checked
            ? [...current, optionId]
            : current.filter((id) => id !== optionId),
        };
      });
    },
    []
  );

  const handleClearAll = useCallback(() => {
    setActiveFilters({});
    setSearchQuery("");
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
      allProductsCount={products.length}
      categories={categories}
      filterGroups={filterGroups}
      activeFilters={activeFilters}
      searchQuery={searchQuery}
      sortOption={sortOption}
      isFilterDrawerOpen={isFilterDrawerOpen}
      activeTab="home"
      cartItemCount={totalItems}
      currencySymbol={currencySymbol}
      grid={resolvedGrid}
      layout={resolvedLayout}
      activeHref="/catalogo"
      onSearchChange={setSearchQuery}
      onSearchClick={nav.goSearch}
      onCartClick={nav.goCart}
      onProductClick={handleProductClick}
      onNavLinkClick={handleNavLinkClick}
      onFilterChange={handleFilterChange}
      onClearAllFilters={handleClearAll}
      onSortChange={setSortOption}
      onFilterDrawerOpen={() => setIsFilterDrawerOpen(true)}
      onFilterDrawerClose={() => setIsFilterDrawerOpen(false)}
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
  return <ListingShellInner store={store} {...rest} />;
}
