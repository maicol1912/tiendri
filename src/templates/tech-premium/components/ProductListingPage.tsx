// Tech Premium Template — Product Listing Page
// Desktop: sidebar filters (left) + 3-col product grid (right) + pagination.
// Mobile: "Filters" button + sort dropdown + 2-col grid + pagination.
// Visual only — handlers come as props.

import { ChevronLeft, ChevronRight, ChevronDown, SlidersHorizontal } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { ProductCard } from "./ProductCard";
import { FilterSidebar } from "./FilterSidebar";
import { gridColsClass } from "../utils/grid-classes";
import type { TechPremiumConfig } from "../config";
import type {
  StoreInfo,
  Product,
  NavTab,
  FilterGroup,
} from "../types";

interface ProductListingPageProps {
  store: StoreInfo;
  products: Product[];
  navLinks: readonly { label: string; href: string }[];
  footerServices: readonly string[];
  footerAssistance: readonly string[];
  grid: TechPremiumConfig["grid"];
  filters?: FilterGroup[];
  totalProducts?: number;
  currentPage?: number;
  totalPages?: number;
  sortLabel?: string;
  activeTab?: NavTab;
  cartItemCount?: number;
  currencySymbol?: string;
  isFilterDrawerOpen?: boolean;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onProductClick?: (productId: string) => void;
  onWishlistToggle?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
  onPageChange?: (page: number) => void;
  onFilterToggle?: (groupId: string) => void;
  onFilterCheck?: (groupId: string, optionId: string) => void;
  onFilterDrawerToggle?: () => void;
  onTabChange?: (tab: NavTab) => void;
  onNavLinkClick?: (href: string) => void;
}

function getPageNumbers(currentPage: number, totalPages: number): (number | "...")[] {
  const pages: (number | "...")[] = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1, 2, 3);
    if (currentPage > 4) pages.push("...");
    if (currentPage > 3 && currentPage < totalPages - 2) pages.push(currentPage);
    if (currentPage < totalPages - 3) pages.push("...");
    pages.push(totalPages);
  }
  return pages;
}

export function ProductListingPage({
  store,
  products,
  navLinks,
  footerServices,
  footerAssistance,
  grid,
  filters = [],
  totalProducts = 85,
  currentPage = 1,
  totalPages = 12,
  sortLabel = "Por calificación",
  activeTab = "home",
  cartItemCount = 0,
  currencySymbol = "$",
  isFilterDrawerOpen = false,
  onSearchClick,
  onCartClick,
  onProductClick,
  onWishlistToggle,
  onAddToCart,
  onPageChange,
  onFilterToggle,
  onFilterCheck,
  onFilterDrawerToggle,
  onTabChange,
  onNavLinkClick,
}: ProductListingPageProps) {
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: `https://tiendri.com/template/${store.slug}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Catálogo",
        item: `https://tiendri.com/template/${store.slug}/catalogo`,
      },
    ],
  };

  return (
    <div className="bg-white min-h-screen font-['Inter',sans-serif] flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Header */}
      <Header
        store={store}
        navLinks={navLinks}
        cartItemCount={cartItemCount}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
        onNavLinkClick={onNavLinkClick}
      />

      {/* Breadcrumbs — desktop only */}
      <nav aria-label="Ruta de navegación" className="hidden lg:flex items-center gap-4 px-[160px] py-10">
        <span className="text-[var(--t-text-breadcrumb)] text-base font-medium cursor-pointer">Inicio</span>
        <ChevronRight className="w-4 h-4 text-[var(--t-text-breadcrumb)]" aria-hidden="true" />
        <span className="text-[var(--t-text-breadcrumb)] text-base font-medium">Catálogo</span>
        <ChevronRight className="w-4 h-4 text-[var(--t-text-breadcrumb)]" aria-hidden="true" />
        <span className="text-black text-base font-medium">Smartphones</span>
      </nav>

      <main>
      <h1 className="sr-only">Catálogo</h1>

      {/* ── Mobile: Filter bar + sort ── */}
      <div className="lg:hidden flex items-center gap-3 px-4 pt-4">
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2.5 bg-[var(--t-button-bg)] text-[var(--t-button-text)] rounded-[var(--t-radius-button)] text-sm font-medium border-none cursor-pointer"
          onClick={onFilterDrawerToggle}
          aria-expanded={isFilterDrawerOpen}
        >
          <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
          Filtrar
        </button>
        <div className="flex items-center gap-1 px-4 py-2.5 border border-[var(--t-border-mid)]/50 rounded-lg flex-1">
          <span className="text-[15px] text-black">{sortLabel}</span>
          <ChevronDown className="w-5 h-5 text-black ml-auto" aria-hidden="true" />
        </div>
      </div>

      {/* ── Mobile: Product count ── */}
      <div className="lg:hidden flex items-center gap-1.5 px-4 pt-4">
        <span className="text-base text-[var(--t-text-secondary)] tracking-[0.48px]">Resultados:</span>
        <span className="text-xl font-medium text-black tracking-[0.6px]">{totalProducts}</span>
      </div>

      {/* ── Main content area ── */}
      <div className="flex items-start px-4 pt-6 pb-14 lg:px-[160px] lg:pt-6 lg:pb-14">
        <div className="flex flex-1 gap-8">
          {/* Desktop: Filter sidebar */}
          <FilterSidebar
            filters={filters}
            onFilterToggle={onFilterToggle}
            onFilterCheck={onFilterCheck}
            isOpen={isFilterDrawerOpen}
            onClose={onFilterDrawerToggle}
          />

          {/* Products area */}
          <div className="flex flex-col gap-10 flex-1 min-w-0">
            {/* Desktop: top bar */}
            <div className="hidden lg:flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-end gap-1.5 min-w-[200px]">
                <span className="text-base text-[var(--t-text-secondary)] tracking-[0.48px]">Productos seleccionados:</span>
                <span className="text-xl font-medium text-black tracking-[0.6px]">{totalProducts}</span>
              </div>
              <div className="flex items-center justify-between px-4 py-2 border border-[var(--t-border-mid)]/50 rounded-lg min-w-[140px] max-w-[256px] flex-1">
                <span className="text-[15px] text-black">{sortLabel}</span>
                <ChevronDown className="w-6 h-6 text-black" aria-hidden="true" />
              </div>
            </div>

            {/* Product grid — paginated */}
            <div className={`grid ${gridColsClass(grid.listing.mobile, grid.listing.desktop)} gap-4`}>
              {products.slice((currentPage - 1) * 9, currentPage * 9).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currencySymbol={currencySymbol}
                  onClick={() => onProductClick?.(product.id)}
                  onWishlistToggle={() => onWishlistToggle?.(product.id)}
                  onAddToCart={() => onAddToCart?.(product.id)}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav aria-label="Paginación" className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  className="w-6 h-6 flex items-center justify-center bg-transparent border-none cursor-pointer disabled:opacity-30 p-0"
                  onClick={() => onPageChange?.(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Página anterior"
                >
                  <ChevronLeft className="w-5 h-5 text-black" />
                </button>

                <div className="flex items-end gap-2">
                  {pageNumbers.map((page, idx) =>
                    page === "..." ? (
                      <span key={`dots-${idx}`} className="px-1 text-base text-black/40">...</span>
                    ) : (
                      <button
                        key={page}
                        type="button"
                        className={`px-3 py-1 rounded-[5px] text-base font-medium tracking-[0.48px] border-none cursor-pointer ${
                          page === currentPage
                            ? "bg-[var(--t-primary)] text-[var(--t-button-text)]"
                            : "bg-[var(--t-pagination-bg)] text-[var(--t-primary)] hover:bg-[var(--t-surface)]"
                        }`}
                        onClick={() => onPageChange?.(page as number)}
                        aria-current={page === currentPage ? "page" : undefined}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  type="button"
                  className="w-6 h-6 flex items-center justify-center bg-transparent border-none cursor-pointer disabled:opacity-30 p-0"
                  onClick={() => onPageChange?.(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Página siguiente"
                >
                  <ChevronRight className="w-5 h-5 text-black" />
                </button>
              </nav>
            )}
          </div>
        </div>
      </div>

      </main>

      {/* Footer */}
      <Footer store={store} services={footerServices} assistance={footerAssistance} />

      {/* Bottom nav — mobile */}
      <BottomNav
        activeTab={activeTab}
        cartItemCount={cartItemCount}
        onTabChange={onTabChange}
      />
      <div className="h-16 lg:hidden" />
    </div>
  );
}
