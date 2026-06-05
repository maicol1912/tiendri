// Electronics Classic — Product Listing Page (Presentational)
// Sidebar + product grid + pagination + filter drawer (mobile).
// All colors via var(--t-*). ZERO hardcoded hex.

import type { StorefrontStore, StorefrontCategory, StorefrontProduct, SortOption } from "../types";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { CategorySidebar } from "./CategorySidebar";
import { SortDropdown } from "./SortDropdown";
import { Pagination } from "./Pagination";
import { ProductCard } from "./ProductCard";
import { SlidersHorizontal } from "lucide-react";
import { gridColsClass } from "../utils/grid-classes";

const ITEMS_PER_PAGE = 12;

interface ProductListingPageProps {
  store: StorefrontStore;
  categories: StorefrontCategory[];
  products: StorefrontProduct[];
  cartCount: number;
  selectedCategory: string | null;
  minRating: number;
  sort: SortOption;
  currentPage: number;
  isFilterDrawerOpen: boolean;
  layout?: {
    cardStyle?: string;
    cardHoverEffect?: string;
    cardImageRatio?: string;
    headerStyle?: string;
    footerStyle?: string;
  };
  grid?: { listing?: { mobile: number; desktop: number } };
  currencySymbol?: string;
  onNavigate?: (path: string) => void;
  onSearchSubmit?: (query: string) => void;
  onCartClick?: () => void;
  onCategorySelect: (id: string | null) => void;
  onRatingChange: (rating: number) => void;
  onSortChange: (sort: SortOption) => void;
  onPageChange: (page: number) => void;
  onOpenFilterDrawer: () => void;
  onCloseFilterDrawer: () => void;
  onProductClick?: (productId: string) => void;
}

export function ProductListingPage({
  store,
  categories,
  products,
  cartCount,
  selectedCategory,
  minRating,
  sort,
  currentPage,
  isFilterDrawerOpen,
  layout,
  grid,
  currencySymbol = "$",
  onNavigate,
  onSearchSubmit,
  onCartClick,
  onCategorySelect,
  onRatingChange,
  onSortChange,
  onPageChange,
  onOpenFilterDrawer,
  onCloseFilterDrawer,
  onProductClick,
}: ProductListingPageProps) {
  // Filter + sort
  const filtered = products
    .filter((p) =>
      selectedCategory ? p.category === selectedCategory || p.id === selectedCategory : true
    )
    .filter((p) => (minRating > 0 ? (p.rating ?? 0) >= minRating : true));

  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE));
  const page = Math.min(currentPage, totalPages);
  const paged = sorted.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const listingGrid = grid?.listing ?? { mobile: 2, desktop: 3 };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--t-background)" }}>
      <Header
        store={store}
        cartCount={cartCount}
        layout={layout}
        onNavigate={onNavigate}
        onSearchSubmit={onSearchSubmit}
        onCartClick={onCartClick}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-24 md:pb-12">
        {/* Breadcrumb */}
        <nav className="py-4 text-xs" aria-label="Migas de pan">
          <ol className="flex items-center gap-1">
            <li>
              <button
                onClick={() => onNavigate?.("/template/electronics-classic")}
                className="hover:underline"
                style={{ color: "var(--t-text-muted)" }}
              >
                Inicio
              </button>
            </li>
            <li aria-hidden="true" style={{ color: "var(--t-text-muted)" }}>/</li>
            <li style={{ color: "var(--t-text-primary)" }} aria-current="page">Catálogo</li>
          </ol>
        </nav>

        <div className="flex gap-8">
          {/* Sidebar — desktop only */}
          <div className="hidden md:block w-56 shrink-0">
            <CategorySidebar
              categories={categories}
              selectedCategory={selectedCategory}
              minRating={minRating}
              onCategorySelect={(id) => { onCategorySelect(id); onPageChange(1); }}
              onRatingChange={(r) => { onRatingChange(r); onPageChange(1); }}
            />
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
              <div className="flex items-center gap-3">
                {/* Mobile filter button */}
                <button
                  onClick={onOpenFilterDrawer}
                  className="md:hidden flex items-center gap-1.5 text-sm px-3 py-1.5 border rounded-[var(--t-radius-button)]"
                  style={{
                    borderColor: "var(--t-surface)",
                    color: "var(--t-text-primary)",
                    backgroundColor: "var(--t-card-bg)",
                  }}
                  aria-label="Abrir filtros"
                >
                  <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
                  Filtros
                </button>
                <p className="text-sm" style={{ color: "var(--t-text-muted)" }}>
                  {filtered.length} producto{filtered.length !== 1 ? "s" : ""}
                </p>
              </div>
              <SortDropdown value={sort} onChange={(s) => { onSortChange(s); onPageChange(1); }} />
            </div>

            {/* Product grid */}
            {paged.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <p className="text-[var(--t-text-muted)] text-sm">
                  No se encontraron productos con los filtros seleccionados.
                </p>
                <button
                  onClick={() => { onCategorySelect(null); onRatingChange(0); }}
                  className="text-[var(--t-primary)] text-sm underline"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className={`grid ${gridColsClass(listingGrid.mobile, listingGrid.desktop)}`} style={{ gap: "var(--t-space-gap, 1rem)" }}>
                {paged.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    currencySymbol={currencySymbol}
                    layout={layout}
                    onProductClick={onProductClick}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </main>

      {/* Mobile filter drawer */}
      {isFilterDrawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-50 md:hidden"
            onClick={onCloseFilterDrawer}
            aria-hidden="true"
          />
          <div
            className="fixed inset-y-0 left-0 w-72 z-[60] overflow-y-auto md:hidden"
            style={{ backgroundColor: "var(--t-background)" }}
          >
            <CategorySidebar
              categories={categories}
              selectedCategory={selectedCategory}
              minRating={minRating}
              onCategorySelect={(id) => { onCategorySelect(id); onPageChange(1); onCloseFilterDrawer(); }}
              onRatingChange={(r) => { onRatingChange(r); onPageChange(1); }}
              onClose={onCloseFilterDrawer}
              isDrawer
            />
          </div>
        </>
      )}

      <Footer store={store} layout={layout} />
      <BottomNav cartCount={cartCount} onNavigate={onNavigate} />
    </div>
  );
}
