// Furniture Light — Product Detail Page
// 2-col desktop: image gallery left, product info right (color selector, key features, size table, star reviews)
// Mobile: stacked — image + thumbs, info, recommendations grid
// Visual only — handlers from shell

import React from "react";
import Image from "next/image";
import { ChevronRight, ShoppingCart } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { ProductCard } from "./ProductCard";
import { VariantPriceSelector } from "@/components/shared/VariantPriceSelector";
import { gridColsClass } from "../../_shared/utils/grid-classes";
import { BUTTON_STYLE_MAP } from "@/templates/_shared/style-maps";
import { ProductTabs } from "@/templates/_shared/components/ProductTabs";
import type { VariantSelection } from "@/hooks/useVariantPrice";
import type { TemplateLayoutConfig } from "@/types/templates";
import type { FurnitureLightConfig } from "../config";
import type { FurnitureProduct, FurnitureStoreInfo, FurnitureNavTab } from "../types";

interface ProductDetailPageProps {
  store: FurnitureStoreInfo;
  product: FurnitureProduct;
  navLinks?: readonly { label: string; href: string }[];
  relatedProducts?: FurnitureProduct[];
  grid?: FurnitureLightConfig["grid"];
  layout?: Partial<TemplateLayoutConfig>;
  activeTab?: FurnitureNavTab;
  cartItemCount?: number;
  currencySymbol?: string;
  selectedImageIndex?: number;
  selectedColorIndex?: number;
  dimensionUnit?: "cm" | "inch";
  effectivePrice?: number;
  selectedVariants?: VariantSelection;
  onSelectVariant?: (groupId: string, optionId: string) => void;
  onBack?: () => void;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onNavLinkClick?: (href: string) => void;
  onAddToCart?: () => void;
  onImageSelect?: (index: number) => void;
  onColorSelect?: (index: number) => void;
  onDimensionUnitToggle?: () => void;
  onProductClick?: (productId: string) => void;
  onAddToCartProduct?: (productId: string) => void;
  onTabChange?: (tab: FurnitureNavTab) => void;
  productDetailTabs?: Array<{ id: string; label: string; content: string }>;
}


export function ProductDetailPage({
  store,
  product,
  navLinks = [],
  relatedProducts = [],
  grid,
  layout,
  activeTab = "home",
  cartItemCount = 0,
  currencySymbol = "$",
  selectedImageIndex = 0,
  selectedColorIndex = 0,
  dimensionUnit = "cm",
  effectivePrice,
  selectedVariants,
  onSelectVariant,
  onBack,
  onSearchClick,
  onCartClick,
  onNavLinkClick,
  onAddToCart,
  onImageSelect,
  onColorSelect,
  onDimensionUnitToggle,
  onProductClick,
  onAddToCartProduct,
  onTabChange,
  productDetailTabs = [],
}: ProductDetailPageProps) {
  const images = product.images ?? [];
  const activeImage = images[selectedImageIndex]?.url ?? null;

  const displayPrice = effectivePrice ?? product.price;
  const formattedPrice = `${currencySymbol}${new Intl.NumberFormat("es-CO").format(displayPrice)}`;
  const comparePrice = product.compare_at_price
    ? `${currencySymbol}${new Intl.NumberFormat("es-CO").format(product.compare_at_price)}`
    : null;

  const discountPct = product.discountPercent ?? (
    product.compare_at_price
      ? Math.round((1 - product.price / product.compare_at_price) * 100)
      : 0
  );

  const gridCols = grid?.listing ?? { mobile: 2, desktop: 3 };
  const btnClass = BUTTON_STYLE_MAP["filled"];

  return (
    <div className="min-h-screen bg-[var(--t-background)]">
      <Header
        store={store}
        navLinks={navLinks as { label: string; href: string }[]}
        cartItemCount={cartItemCount}
        activeHref="/catalogo"
        onNavLinkClick={onNavLinkClick}
        onCartClick={onCartClick}
        onSearchClick={onSearchClick}
      />

      <main className="pt-[60px] lg:pt-[72px] pb-6 max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 px-5 md:px-6 lg:px-8 py-3 text-xs text-[var(--t-muted)]">
          <button onClick={onBack} className="hover:text-[var(--t-primary)] transition-colors">Inicio</button>
          <ChevronRight size={12} />
          <span className="text-[var(--t-foreground)] font-medium line-clamp-1">{product.name}</span>
        </div>

        <div className="px-5 md:px-6 lg:px-8">
          {/* 2-col layout desktop */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-12">
            {/* Left: image gallery */}
            <div>
              {/* Main image with category badge + 360° button */}
              <div
                className="relative w-full overflow-hidden mb-3"
                style={{
                  borderRadius: "var(--t-radius-card)",
                  backgroundColor: product.cardBgColor ?? "var(--t-card)",
                  aspectRatio: "1 / 1",
                }}
              >
                {/* Category badge */}
                {product.categoryId && (
                  <div
                    className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-[var(--t-spec-badge-bg)]"
                  >
                    <span className="text-[10px] font-semibold text-[var(--t-foreground)]">{product.categoryId.replace("cat-", "")}</span>
                  </div>
                )}

                {/* 360° button */}
                <button
                  className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm"
                  aria-label="Vista 360°"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--t-foreground)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                    <path d="M21 3v5h-5" />
                  </svg>
                  <span className="text-[10px] font-semibold text-[var(--t-foreground)]">360°</span>
                </button>

                {activeImage ? (
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="relative w-full h-full">
                      <Image
                        src={activeImage}
                        alt={product.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                      />
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-[var(--t-radius-card)] bg-white/30" />
                  </div>
                )}
              </div>

              {/* Thumbnail row */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => onImageSelect?.(idx)}
                      className="shrink-0 relative overflow-hidden"
                      style={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "var(--t-radius-card)",
                        backgroundColor: product.cardBgColor ?? "var(--t-card)",
                        border: idx === selectedImageIndex
                          ? "2px solid var(--t-primary)"
                          : "2px solid transparent",
                      }}
                    >
                      <Image
                        src={img.url}
                        alt={`Vista ${idx + 1}`}
                        fill
                        className="object-contain p-1.5"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: product info */}
            <div className="mt-5 lg:mt-0">
              {/* Name + rating */}
              <h1
                className="text-xl lg:text-2xl font-bold text-[var(--t-foreground)] leading-tight"
                style={{ fontFamily: "var(--font-display, var(--font-sans, 'Inter', sans-serif))" }}
              >
                {product.name}
              </h1>


              {/* Price */}
              <div className="flex items-center gap-3 mt-3">
                <span className="text-2xl font-bold text-[var(--t-foreground)]">{formattedPrice}</span>
                {comparePrice && (
                  <span className="text-base text-[var(--t-muted)] line-through">{comparePrice}</span>
                )}
                {discountPct > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[var(--t-primary)] text-[var(--t-on-primary)]">
                    -{discountPct}%
                  </span>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <p className="mt-3 text-sm text-[var(--t-muted)] leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Color options */}
              {product.colorOptions && product.colorOptions.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-semibold text-[var(--t-foreground)] mb-2">
                    Color: <span className="font-normal text-[var(--t-muted)]">{product.colorOptions[selectedColorIndex] ?? product.colorVariant}</span>
                  </p>
                  <div className="flex gap-2">
                    {product.colorOptions.map((color, idx) => (
                      <button
                        key={color}
                        onClick={() => onColorSelect?.(idx)}
                        className="px-3 py-1.5 text-xs font-medium transition-all"
                        style={{
                          borderRadius: "var(--t-radius-category)",
                          border: idx === selectedColorIndex
                            ? "2px solid var(--t-primary)"
                            : "2px solid var(--t-border)",
                          backgroundColor: idx === selectedColorIndex
                            ? "var(--t-primary)"
                            : "var(--t-background)",
                          color: idx === selectedColorIndex
                            ? "var(--t-on-primary)"
                            : "var(--t-foreground)",
                        }}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Variant groups with price modifiers */}
              {product.variants && product.variants.length > 0 && (
                <div className="mt-4 flex flex-col gap-4">
                  {product.variants.map((group) => (
                    <VariantPriceSelector
                      key={group.id}
                      group={group}
                      selectedOptionId={selectedVariants?.[group.id]}
                      onSelect={(optionId) => onSelectVariant?.(group.id, optionId)}
                      currencySymbol={currencySymbol}
                    />
                  ))}
                </div>
              )}

              {/* Key features */}
              <div className="mt-5">
                <p className="text-sm font-bold text-[var(--t-foreground)] mb-2">Características principales</p>
                <ul className="space-y-1.5">
                  {["Material de alta calidad", "Diseño ergonómico", "Fácil ensamblaje", "Garantía 1 año"].map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-xs text-[var(--t-muted)]">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0 bg-[var(--t-primary)]" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dimension table with cm/inch toggle */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-bold text-[var(--t-foreground)]">Dimensiones</p>
                  <button
                    onClick={onDimensionUnitToggle}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full"
                    style={{
                      border: "1px solid var(--t-border)",
                      backgroundColor: "var(--t-background)",
                      color: "var(--t-foreground)",
                    }}
                  >
                    {dimensionUnit === "cm" ? "cm → pulgadas" : "pulgadas → cm"}
                  </button>
                </div>
                <div className="overflow-hidden" style={{ borderRadius: "var(--t-radius-card)", border: "1px solid var(--t-border)" }}>
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-[var(--t-background)]">
                        <th className="text-left px-3 py-2 font-semibold text-[var(--t-foreground)]">Medida</th>
                        <th className="text-right px-3 py-2 font-semibold text-[var(--t-foreground)]">{dimensionUnit === "cm" ? "cm" : "pulgadas"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { label: "Largo", cm: 120 }, { label: "Ancho", cm: 60 }, { label: "Alto", cm: 75 },
                      ].map(({ label, cm }, i) => (
                        <tr key={label} style={{ backgroundColor: i % 2 === 0 ? "var(--t-background)" : "var(--t-background)" }}>
                          <td className="px-3 py-2 text-[var(--t-muted)]">{label}</td>
                          <td className="px-3 py-2 text-right font-medium text-[var(--t-foreground)]">
                            {dimensionUnit === "cm" ? cm : Math.round(cm / 2.54)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Desktop: add to cart */}
              <div className="hidden lg:flex items-center gap-3 mt-6">
                <button
                  onClick={onAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98] border ${product.available === false ? "opacity-50 cursor-not-allowed" : ""} ${btnClass}`}
                  style={{ borderRadius: "var(--t-radius-button)" }}
                  disabled={product.available === false}
                >
                  <ShoppingCart size={18} />
                  {product.available === false ? "Agotado" : "Agregar al carrito"}
                </button>
              </div>
            </div>
          </div>

          {/* Product Detail Tabs */}
          {productDetailTabs.length > 0 && (
            <div className="mt-8">
              <ProductTabs tabs={productDetailTabs.map(({ label, content }) => ({ label, content }))} />
            </div>
          )}

          {/* Related products */}
          {relatedProducts.length > 0 && (
            <div className="mt-8">
              <h2 className="text-[var(--t-foreground)] mb-4" style={{ fontWeight: "var(--t-type-heading-weight, 700)" as React.CSSProperties["fontWeight"], fontSize: "var(--t-type-heading-size, 1rem)", letterSpacing: "var(--t-type-heading-tracking, 0em)", textTransform: "var(--t-type-heading-transform, none)" as React.CSSProperties["textTransform"] }}>También te puede gustar</h2>
              <div className={`grid ${gridColsClass(gridCols.mobile, gridCols.desktop)}`} style={{ gap: "var(--t-space-gap, 0.75rem)" }}>
                {relatedProducts.slice(0, 6).map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    currencySymbol={currencySymbol}
                    layout={layout}
                    onProductClick={onProductClick}
                    onAddToCart={onAddToCartProduct}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Mobile sticky CTA */}
      <div className="lg:hidden fixed bottom-[60px] left-0 right-0 z-40 px-5 pb-2 pt-2 bg-[var(--t-background)]" style={{ boxShadow: "0 -4px 12px rgba(0,0,0,0.06)" }}>
        <button
          onClick={onAddToCart}
          className={`w-full flex items-center justify-center gap-2 py-3 font-semibold text-sm transition-all hover:opacity-90 border ${product.available === false ? "opacity-50 cursor-not-allowed" : ""} ${btnClass}`}
          style={{ borderRadius: "var(--t-radius-button)" }}
          disabled={product.available === false}
        >
          <ShoppingCart size={16} />
          {product.available === false ? "Agotado" : "Agregar al carrito"}
        </button>
      </div>

      <Footer store={store} layout={layout} />

      <BottomNav
        activeTab={activeTab}
        cartItemCount={cartItemCount}
        onTabChange={(tab) => {
          if (tab === "search") onSearchClick?.();
          else if (tab === "cart") onCartClick?.();
          else onTabChange?.(tab);
        }}
      />

    </div>
  );
}
