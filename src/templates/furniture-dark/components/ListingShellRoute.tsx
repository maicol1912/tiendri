"use client";

// Furniture Dark — ListingShellRoute
// Full filter + sort system. Category filtering via FilterSidebar (replaces old pill-based system).

import { useState, useMemo } from "react";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "@/templates/_shared/hooks/useTemplateNav";
import { ProductListingPage } from "./ProductListingPage";
import { mockStore, mockProducts, mockCategoryBanner } from "../mock/data";
import type { FilterGroup, SortOption } from "../types";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Destacados" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "rating", label: "Mejor calificados" },
  { value: "newest", label: "Más recientes" },
];

export function ListingShellRoute() {
  const { totalItems, addItem } = useCart();
  const nav = useTemplateNav();

  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [sortOption, setSortOption] = useState<SortOption>("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Build filter groups with dynamic counts from mockProducts
  const filterGroups: FilterGroup[] = useMemo(() => {
    const categoryCount = (catId: string) =>
      mockProducts.filter((p) => p.categoryId === catId).length;

    return [
      {
        id: "category",
        label: "Categoría",
        options: [
          { id: "living-room", label: "Sala", count: categoryCount("living-room") },
          { id: "bedroom", label: "Dormitorio", count: categoryCount("bedroom") },
          { id: "dining", label: "Comedor", count: categoryCount("dining") },
          { id: "office", label: "Oficina", count: categoryCount("office") },
          { id: "outdoor", label: "Exterior", count: categoryCount("outdoor") },
          { id: "storage", label: "Almacenamiento", count: categoryCount("storage") },
        ],
      },
      {
        id: "price",
        label: "Rango de precio",
        options: [
          { id: "under-500", label: "Menos de $500.000" },
          { id: "500-1000", label: "$500.000 - $1.000.000" },
          { id: "1000-1500", label: "$1.000.000 - $1.500.000" },
          { id: "over-1500", label: "Más de $1.500.000" },
        ],
      },
      {
        id: "rating",
        label: "Calificación",
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
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...mockProducts];

    // 1. Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }

    // 2. Category filter
    const catFilters = activeFilters.category ?? [];
    if (catFilters.length > 0) {
      result = result.filter((p) => p.categoryId && catFilters.includes(p.categoryId));
    }

    // 3. Price range filter
    const priceFilters = activeFilters.price ?? [];
    if (priceFilters.length > 0) {
      result = result.filter((p) => {
        return priceFilters.some((rangeId) => {
          if (rangeId === "under-500") return p.price < 500000;
          if (rangeId === "500-1000") return p.price >= 500000 && p.price <= 999999;
          if (rangeId === "1000-1500") return p.price >= 1000000 && p.price <= 1499999;
          if (rangeId === "over-1500") return p.price >= 1500000;
          return false;
        });
      });
    }

    // 4. Rating filter
    const ratingFilters = activeFilters.rating ?? [];
    if (ratingFilters.length > 0) {
      const minRating = ratingFilters.includes("3-plus") ? 3.0 : 4.0;
      result = result.filter((p) => (p.rating ?? 0) >= minRating);
    }

    // 5. Availability filter
    const availFilters = activeFilters.availability ?? [];
    if (availFilters.length > 0) {
      result = result.filter((p) => {
        const isAvailable = p.inStock;
        if (availFilters.includes("in-stock") && availFilters.includes("out-of-stock")) return true;
        if (availFilters.includes("in-stock")) return isAvailable;
        if (availFilters.includes("out-of-stock")) return !isAvailable;
        return true;
      });
    }

    // 6. Sort
    if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating") {
      result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    } else if (sortOption === "newest") {
      result.reverse();
    }
    // "featured" = original order (no sort)

    return result;
  }, [activeFilters, sortOption, searchQuery]);

  function handleFilterChange(groupId: string, optionId: string, checked: boolean) {
    setActiveFilters((prev) => {
      const current = prev[groupId] ?? [];
      if (checked) {
        return { ...prev, [groupId]: [...current, optionId] };
      } else {
        const next = current.filter((id) => id !== optionId);
        if (next.length === 0) {
          const { [groupId]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [groupId]: next };
      }
    });
  }

  function handleClearAll() {
    setActiveFilters({});
  }

  function handleAddToCart(productId: string) {
    const product = mockProducts.find((p) => p.id === productId);
    if (!product || !product.inStock) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.images?.[0]?.url ?? null,
      variantName: null,
      quantity: 1,
    });
  }

  return (
    <ProductListingPage
      store={mockStore}
      products={filteredProducts}
      categoryBanner={mockCategoryBanner}
      cartItemCount={totalItems}
      filters={filterGroups}
      activeFilters={activeFilters}
      sortOption={sortOption}
      sortOptions={SORT_OPTIONS}
      searchQuery={searchQuery}
      isFilterOpen={isFilterOpen}
      totalCount={mockProducts.length}
      onFilterChange={handleFilterChange}
      onClearAll={handleClearAll}
      onSortChange={setSortOption}
      onSearchChange={setSearchQuery}
      onFilterToggle={() => setIsFilterOpen((v) => !v)}
      onFilterClose={() => setIsFilterOpen(false)}
      activeHref="/catalogo"
      onBack={nav.goHome}
      onProductClick={(productId) => nav.goProduct(productId)}
      onAddToCart={handleAddToCart}
      onSearchClick={nav.goSearch}
      onCartClick={nav.goCart}
      onNavLinkClick={(href) => {
        if (href === "/") nav.goHome();
        else if (href === "/catalogo") nav.goListing();
        else if (href === "/info") nav.goInfo();
      }}
      onBottomNavTab={(tab) => {
        if (tab === "home") nav.goHome();
        else if (tab === "cart") nav.goCart();
        else if (tab === "search") nav.goSearch();
        else if (tab === "info") nav.goInfo();
      }}
    />
  );
}
