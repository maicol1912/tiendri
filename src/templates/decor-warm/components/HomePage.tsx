"use client";

// Decor Warm Template — Home Page Layout
// Sections: hero (HeroBanner), categories (CategorySection row),
//           best-seller (BestSellerCard), products (ProductCard grid).
// Dynamic section ordering via sectionRenderers pattern.
// ZERO hardcoded colors.

import React, { Fragment, useRef, useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { HeroBanner } from "./HeroBanner";
import { CategorySection } from "./CategorySection";

import { BestSellerCard } from "./BestSellerCard";
import { ProductCard } from "./ProductCard";
import { gridColsClass } from "../utils/grid-classes";
import type {
  DecorWarmProduct,
  DecorWarmCategory,
  DecorWarmCategoryIcon,
  DecorWarmPromoSlide,
  DecorWarmBestSeller,
  DecorWarmNavTab,
} from "../types";
import type { StoreInfo } from "@/types/store";
import type { DecorWarmConfig } from "../config";

interface HomePageProps {
  store: StoreInfo;
  categoryIcons: DecorWarmCategoryIcon[];
  categories: DecorWarmCategory[];
  products: DecorWarmProduct[];
  promoSlides: DecorWarmPromoSlide[];
  bestSellers: DecorWarmBestSeller[];
  activeCategoryId?: string | null;
  activeIconId?: string | null;
  activeTab?: DecorWarmNavTab;
  activePromoSlide?: number;
  cartItemCount?: number;
  wishlistCount?: number;
  currencySymbol?: string;
  layout?: DecorWarmConfig["layout"];
  grid?: DecorWarmConfig["grid"];
  sections?: Array<{ id: string; visible: boolean }>;
  wishlistedIds?: Set<string>;
  onCategoryChange?: (id: string | null) => void;
  onIconCategoryChange?: (id: string | null) => void;
  onProductClick?: (productId: string) => void;
  onWishlistToggle?: (productId: string) => void;
  onAddToCart?: (product: DecorWarmProduct) => void;
  onBestSellerClick?: (productId: string) => void;
  onPromoSlideChange?: (index: number) => void;
  onSearchOpen?: () => void;
  onCartOpen?: () => void;
  onWishlistOpen?: () => void;
  onTabChange?: (tab: DecorWarmNavTab) => void;
  onSeeAll?: () => void;
}

export function HomePage({
  store,
  categoryIcons,
  categories,
  products,
  promoSlides,
  bestSellers,
  activeCategoryId = null,
  activeIconId = null,
  activeTab = "home",
  activePromoSlide = 0,
  cartItemCount = 0,
  wishlistCount = 0,
  currencySymbol = "$",
  layout,
  grid,
  sections,
  wishlistedIds,
  onCategoryChange,
  onIconCategoryChange,
  onProductClick,
  onWishlistToggle,
  onAddToCart,
  onBestSellerClick,
  onPromoSlideChange,
  onSearchOpen,
  onCartOpen,
  onWishlistOpen,
  onTabChange,
  onSeeAll,
}: HomePageProps) {
  const iconScrollRef = useRef<HTMLDivElement>(null);

  // Wheel-to-horizontal-scroll for category icons
  useEffect(() => {
    const el = iconScrollRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      el.scrollLeft += e.deltaY * 2.5;
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, []);

  const productGridClass = gridColsClass(
    grid?.products?.mobile ?? 2,
    grid?.products?.desktop ?? 4
  );

  // Filter products by active category icon or tab
  const filteredProducts = React.useMemo(() => {
    const activeId = activeCategoryId ?? activeIconId;
    if (!activeId) return products;
    return products.filter((p) => p.categoryId === activeId);
  }, [products, activeCategoryId, activeIconId]);

  const sectionRenderers: Record<string, () => React.ReactNode> = {
    // ── Hero promo banner ──────────────────────────────────────────────────────
    hero: () => (
      <HeroBanner
        slides={promoSlides}
        activeSlide={activePromoSlide}
        onSlideChange={onPromoSlideChange}
      />
    ),

    // ── Category icons + tab bar ───────────────────────────────────────────────
    categories: () => (
      <section>
        {/* Icon row */}
        <div
          ref={iconScrollRef}
          className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden px-4 md:px-6 lg:px-8"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex items-start gap-3 pb-2 min-w-max">
            {categoryIcons.map((icon) => (
              <CategorySection
                key={icon.id}
                category={icon}
                isActive={activeIconId === icon.id}
                onClick={() =>
                  onIconCategoryChange?.(
                    activeIconId === icon.id ? null : icon.id
                  )
                }
              />
            ))}
          </div>
        </div>


      </section>
    ),

    // ── Best seller featured card(s) ───────────────────────────────────────────
    "best-seller": () =>
      bestSellers.length > 0 ? (
        <section className="flex flex-col gap-3 px-4 md:px-6 lg:px-8" style={{ paddingTop: "var(--t-space-section, 1rem)", paddingBottom: "var(--t-space-section, 1rem)" }}>
          <div className="flex items-center justify-between">
            <h2
              style={{
                color: "var(--t-dark-mode)",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "var(--t-type-heading-weight, 600)" as React.CSSProperties["fontWeight"],
                fontSize: "var(--t-type-heading-size, 16px)",
                letterSpacing: "var(--t-type-heading-tracking, 0em)",
                textTransform: "var(--t-type-heading-transform, none)" as React.CSSProperties["textTransform"],
                margin: 0,
              }}
            >
              Más Vendidos
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "var(--t-space-gap, 1rem)" }}>
            {bestSellers.map((item) => (
              <BestSellerCard
                key={item.productId}
                item={item}
                currencySymbol={currencySymbol}
                onClick={
                  onBestSellerClick
                    ? () => onBestSellerClick(item.productId)
                    : undefined
                }
              />
            ))}
          </div>
        </section>
      ) : null,

    // ── Product grid ───────────────────────────────────────────────────────────
    products: () => (
      <section className="flex flex-col gap-4 px-4 md:px-6 lg:px-8" style={{ paddingTop: "var(--t-space-section, 1rem)", paddingBottom: "var(--t-space-section, 1rem)" }}>
        <div className="flex items-center justify-between">
          <h2
            style={{
              color: "var(--t-dark-mode)",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: "var(--t-type-heading-weight, 600)" as React.CSSProperties["fontWeight"],
              fontSize: "var(--t-type-heading-size, 16px)",
              letterSpacing: "var(--t-type-heading-tracking, 0em)",
              textTransform: "var(--t-type-heading-transform, none)" as React.CSSProperties["textTransform"],
              margin: 0,
            }}
          >
            Nueva Colección
          </h2>
          {onSeeAll && (
            <button
              type="button"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--t-primary)",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "12px",
                fontWeight: 500,
                padding: 0,
              }}
              onClick={onSeeAll}
            >
              Ver todo
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <p
              style={{
                color: "var(--t-muted)",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "14px",
                margin: 0,
              }}
            >
              No hay productos en esta categoría
            </p>
          </div>
        ) : (
          <div
            className={`grid ${productGridClass}`}
            style={{ gap: "var(--t-space-gap, 1rem)" }}
            aria-label="Catálogo de productos"
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currencySymbol={currencySymbol}
                layout={layout}
                onAddToCart={
                  onAddToCart ? () => onAddToCart(product) : undefined
                }
                onClick={
                  onProductClick ? () => onProductClick(product.id) : undefined
                }
              />
            ))}
          </div>
        )}
      </section>
    ),
  };

  const activeSections = sections ?? [
    { id: "hero", visible: true },
    { id: "categories", visible: true },
    { id: "best-seller", visible: true },
    { id: "products", visible: true },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--t-background)" }}>
      <Header
        store={store}
        cartItemCount={cartItemCount}
        onSearchClick={onSearchOpen}
      />

      <main
        className="max-w-7xl mx-auto pt-4 pb-[calc(80px+env(safe-area-inset-bottom,0px))] lg:pb-8 flex flex-col gap-6"
        aria-label="Contenido principal"
      >
        {activeSections
          .filter((s) => s.visible)
          .map((s) => (
            <Fragment key={s.id}>{sectionRenderers[s.id]?.()}</Fragment>
          ))}
      </main>

      <Footer store={store} />

      <BottomNav
        activeTab={activeTab}
        cartItemCount={cartItemCount}
        onTabChange={(tab) => {
          if (tab === "cart") onCartOpen?.();
          else onTabChange?.(tab);
        }}
      />
    </div>
  );
}
