"use client";

// _core/shells/ListingShell.tsx
// Client boundary para la ruta de catálogo.
// Gestiona filtros, búsqueda, paginación y carrito; delega render a CoreListingPage.

import { useState, useCallback } from "react";
import { CoreListingPage } from "@/templates/_core/pages/CoreListingPage";
import { useShellHandlers } from "@/templates/_core/hooks/useShellHandlers";
import { useListingController } from "@/templates/_core/hooks/useListingController";
import { useCartController } from "@/templates/_core/hooks/useCartController";
import { useTemplateNav } from "@/templates/_shared/hooks/useTemplateNav";
import { useCart } from "@/templates/_core/cart";
import type { StorefrontProduct, Category } from "@/types/domain/store";
import type { ResolvedStoreConfig } from "@/types/templates/resolved-config";
import type { TemplateVariants } from "@/types/templates/manifest";
import type { FilterGroup } from "@/types/templates/filter";
import type { SortOption } from "@/templates/_core/hooks/useListingController";

export interface ListingShellProps {
  products: StorefrontProduct[];
  categories: Category[];
  config: ResolvedStoreConfig;
  variants: TemplateVariants;
  currencySymbol?: string;
}

function buildFilterGroups(categories: Category[], products: StorefrontProduct[]): FilterGroup[] {
  const filterGroups: FilterGroup[] = [];

  // Grupo de categorías
  if (categories.length > 0) {
    filterGroups.push({
      id: "category",
      label: "Categoría",
      options: categories.map((cat) => ({
        id: cat.id,
        label: cat.name,
        count: products.filter((p) => p.categoryId === cat.id).length,
      })),
    });
  }

  // Grupo de disponibilidad
  filterGroups.push({
    id: "availability",
    label: "Disponibilidad",
    options: [
      {
        id: "in-stock",
        label: "En stock",
        count: products.filter((p) => p.inStock).length,
      },
      {
        id: "out-of-stock",
        label: "Agotado",
        count: products.filter((p) => !p.inStock).length,
      },
    ],
  });

  // Grupo de precio — rangos adaptados al mercado colombiano
  const prices = products.map((p) => p.price);
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

  if (maxPrice > 0) {
    const priceOptions = [];

    if (maxPrice > 2_000_000) {
      // Precios altos (decor, muebles)
      priceOptions.push(
        { id: "under-500k", label: "Menos de $500.000", count: products.filter((p) => p.price < 500_000).length },
        { id: "500k-1m", label: "$500.000 – $1.000.000", count: products.filter((p) => p.price >= 500_000 && p.price <= 1_000_000).length },
        { id: "1m-2m", label: "$1.000.000 – $2.000.000", count: products.filter((p) => p.price > 1_000_000 && p.price <= 2_000_000).length },
        { id: "over-2m", label: "Más de $2.000.000", count: products.filter((p) => p.price > 2_000_000).length }
      );
    } else if (maxPrice > 180_000) {
      // Precios medios (belleza, moda)
      priceOptions.push(
        { id: "under-80k", label: "Menos de $80.000", count: products.filter((p) => p.price < 80_000).length },
        { id: "80k-120k", label: "$80.000 – $120.000", count: products.filter((p) => p.price >= 80_000 && p.price < 120_000).length },
        { id: "120k-180k", label: "$120.000 – $180.000", count: products.filter((p) => p.price >= 120_000 && p.price < 180_000).length },
        { id: "over-180k", label: "Más de $180.000", count: products.filter((p) => p.price >= 180_000).length }
      );
    } else {
      // Precios bajos o mixtos (tech en USD equivalentes)
      priceOptions.push(
        { id: "under-200", label: "Menos de $200", count: products.filter((p) => p.price < 200).length },
        { id: "200-500", label: "$200 – $500", count: products.filter((p) => p.price >= 200 && p.price <= 500).length },
        { id: "500-1000", label: "$500 – $1.000", count: products.filter((p) => p.price >= 500 && p.price <= 1_000).length },
        { id: "over-1000", label: "Más de $1.000", count: products.filter((p) => p.price > 1_000).length }
      );
    }

    filterGroups.push({
      id: "price",
      label: "Precio",
      options: priceOptions.filter((o) => o.count > 0),
    });
  }

  return filterGroups;
}

export function ListingShell({
  products,
  categories,
  config,
  variants,
  currencySymbol = "$",
}: ListingShellProps) {
  const nav = useTemplateNav();
  const { addItem } = useCart();
  const { } = useCartController();

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const listing = useListingController(products, { pageSize: 12 });
  const { } = useShellHandlers(nav);

  const filterGroups = buildFilterGroups(categories, products);

  const handleProductClick = useCallback(
    (productId: string) => nav.goProduct(productId),
    [nav]
  );

  const handleAddToCart = useCallback(
    (productId: string) => {
      const product = products.find((p) => p.id === productId);
      if (!product || !product.inStock) return;
      addItem({
        productId: product.id,
        variantName: null,
        name: product.name,
        price: product.price,
        quantity: 1,
        imageUrl: product.images[0]?.url ?? null,
      });
    },
    [products, addItem]
  );

  const handleOpenFilterDrawer = useCallback(() => setIsFilterDrawerOpen(true), []);
  const handleCloseFilterDrawer = useCallback(() => setIsFilterDrawerOpen(false), []);

  return (
    <CoreListingPage
      config={config}
      variants={{ productCard: variants.productCard }}
      filteredProducts={listing.filteredProducts}
      searchQuery={listing.searchQuery}
      setSearchQuery={listing.setSearchQuery}
      sortOption={listing.sortOption}
      setSortOption={(s: string) => listing.setSortOption(s as SortOption)}
      activeFilters={listing.activeFilters}
      activeFilterCount={listing.activeFilterCount}
      handleFilterChange={listing.handleFilterChange}
      handleClearAll={listing.handleClearAll}
      paginatedProducts={listing.paginatedProducts}
      currentPage={listing.currentPage}
      setCurrentPage={listing.setCurrentPage}
      totalPages={listing.totalPages}
      onProductClick={handleProductClick}
      onAddToCart={handleAddToCart}
      filterGroups={filterGroups}
      isFilterDrawerOpen={isFilterDrawerOpen}
      onOpenFilterDrawer={handleOpenFilterDrawer}
      onCloseFilterDrawer={handleCloseFilterDrawer}
      currencySymbol={currencySymbol}
    />
  );
}
