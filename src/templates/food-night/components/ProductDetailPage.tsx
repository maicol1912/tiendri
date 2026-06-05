"use client";

// Food Night — Product Detail Page Assembly
// Mobile: image with back/heart → info section → size selector → sticky CTA
// Desktop: 2-col (image left 45%, info right 55% with inline CTA)

import Image from "next/image";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";
import { QuantityStepper } from "./QuantityStepper";
import { SizeSelector } from "./SizeSelector";
import { StickyBottomBar } from "./StickyBottomBar";
import { Star } from "lucide-react";
import { Heart } from "lucide-react";
import type { StoreInfo, StorefrontProduct, SizeOption, NavTab } from "../types";

interface ProductDetailPageProps {
  store: StoreInfo;
  product: StorefrontProduct;
  sizeOptions?: SizeOption[];
  currencySymbol?: string;
  selectedSizeId?: string | null;
  quantity?: number;
  isDescriptionExpanded?: boolean;
  inWishlist?: boolean;
  activeTab?: NavTab;
  cartItemCount?: number;
  layout?: { headerStyle?: string; footerStyle?: string };
  onBack?: () => void;
  onSizeSelect?: (id: string) => void;
  onDecrement?: () => void;
  onIncrement?: () => void;
  onAddToCart?: () => void;
  onWishlistToggle?: () => void;
  onToggleDescription?: () => void;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onTabChange?: (tab: NavTab) => void;
}

function formatPrice(price: number, symbol: string = "$"): string {
  return `${symbol}${new Intl.NumberFormat("en-US").format(price)}`;
}

function formatReviewCount(count: number): string {
  return new Intl.NumberFormat("en-US").format(count);
}

export function ProductDetailPage({
  store,
  product,
  sizeOptions = [],
  currencySymbol = "$",
  selectedSizeId = null,
  quantity = 1,
  isDescriptionExpanded = false,
  inWishlist = false,
  activeTab = "home",
  cartItemCount = 0,
  layout,
  onBack,
  onSizeSelect,
  onDecrement,
  onIncrement,
  onAddToCart,
  onWishlistToggle,
  onToggleDescription,
  onSearchClick,
  onCartClick,
  onTabChange,
}: ProductDetailPageProps) {
  const primaryImage = product.images[0]?.url ?? null;
  const rating = product.rating ?? 5.0;
  const reviewCount = product.reviewCount ?? 0;

  const floatingButtonStyle: React.CSSProperties = {
    width: 36,
    height: 36,
    borderRadius: "50%",
    backgroundColor: "var(--t-button-bg)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
    border: "none",
    cursor: "pointer",
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--t-background)" }}>
      <Header
        store={store}
        cartItemCount={cartItemCount}
        layout={layout}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
      />

      {/* Desktop back button */}
      <div className="hidden lg:block max-w-5xl mx-auto px-4 md:px-6 lg:px-8 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-[13px] font-normal transition-opacity hover:opacity-70"
          style={{
            color: "var(--t-text-secondary)",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          aria-label="Volver al catálogo"
        >
          <ArrowLeft size={18} strokeWidth={2} />
          <span>Volver</span>
        </button>
      </div>

      <main className="pb-[calc(140px+env(safe-area-inset-bottom,0px))] md:pb-16">
        <div className="flex flex-col lg:grid lg:grid-cols-[45%_55%] lg:gap-10 lg:items-start lg:max-w-5xl lg:mx-auto lg:px-4 md:px-6 lg:px-8 lg:pt-6">

          {/* LEFT: Hero image */}
          <div className="w-full">
            {/* Mobile image */}
            <div
              className="lg:hidden relative w-full overflow-hidden mx-4"
              style={{
                borderRadius: "var(--t-radius-card)",
                backgroundColor: "var(--t-card-bg)",
                maxWidth: "calc(100% - 32px)",
              }}
              aria-label={`Imagen de ${product.name}`}
            >
              <div className="relative w-full aspect-[4/3]" style={{ minHeight: 240, maxHeight: 380 }}>
                {primaryImage ? (
                  <Image
                    src={primaryImage}
                    alt={product.name}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                      <rect width="64" height="64" fill="var(--t-surface)" />
                    </svg>
                  </div>
                )}

                <button
                  type="button"
                  onClick={onBack}
                  className="absolute top-3 left-3 z-10 flex items-center justify-center"
                  style={floatingButtonStyle}
                  aria-label="Volver"
                >
                  <ArrowLeft size={18} strokeWidth={2} style={{ color: "var(--t-button-text)" }} />
                </button>

                <button
                  type="button"
                  onClick={onWishlistToggle}
                  className="absolute top-3 right-3 z-10 flex items-center justify-center"
                  style={floatingButtonStyle}
                  aria-label={inWishlist ? "Quitar de favoritos" : "Agregar a favoritos"}
                >
                  <Heart
                    size={16}
                    strokeWidth={2}
                    style={{
                      color: inWishlist ? "var(--t-primary)" : "var(--t-button-text)",
                      fill: inWishlist ? "var(--t-primary)" : "transparent",
                    }}
                  />
                </button>
              </div>
            </div>

            {/* Desktop image */}
            <div
              className="hidden lg:block relative w-full overflow-hidden"
              style={{
                aspectRatio: "4 / 3",
                backgroundColor: "var(--t-card-bg)",
                borderRadius: "var(--t-radius-card)",
              }}
              aria-label={`Imagen de ${product.name}`}
            >
              {primaryImage ? (
                <Image
                  src={primaryImage}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 45vw"
                  className="object-cover"
                  priority
                />
              ) : null}

              <button
                type="button"
                onClick={onWishlistToggle}
                className="absolute top-3 right-3 z-10 flex items-center justify-center"
                style={floatingButtonStyle}
                aria-label={inWishlist ? "Quitar de favoritos" : "Agregar a favoritos"}
              >
                <Heart
                  size={16}
                  strokeWidth={2}
                  style={{
                    color: inWishlist ? "var(--t-primary)" : "var(--t-button-text)",
                    fill: inWishlist ? "var(--t-primary)" : "transparent",
                  }}
                />
              </button>
            </div>
          </div>

          {/* RIGHT: Product info */}
          <div className="flex flex-col gap-6 pt-4 lg:pt-0 px-4 lg:px-0">
            {/* Name */}
            <h1
              className="text-[clamp(16px,4vw,20px)] font-semibold leading-tight"
              style={{ color: "var(--t-text-primary)" }}
            >
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <Star
                size={14}
                strokeWidth={0}
                fill="var(--t-rating-star)"
                style={{ color: "var(--t-rating-star)" }}
              />
              <span className="text-[13px] font-semibold" style={{ color: "var(--t-text-primary)" }}>
                {rating.toFixed(1)}
              </span>
              {reviewCount > 0 && (
                <span className="text-[13px] font-normal" style={{ color: "var(--t-text-muted)" }}>
                  ({formatReviewCount(reviewCount)} reseñas)
                </span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="flex flex-col gap-1">
                <p
                  className={`text-[12px] font-normal leading-relaxed ${isDescriptionExpanded ? "" : "line-clamp-3"}`}
                  style={{ color: "var(--t-text-secondary)" }}
                >
                  {product.description}
                </p>
                <button
                  type="button"
                  onClick={onToggleDescription}
                  className="text-[12px] font-medium self-start transition-opacity hover:opacity-70"
                  style={{
                    color: "var(--t-rating-star)",
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                  aria-expanded={isDescriptionExpanded}
                >
                  {isDescriptionExpanded ? "Ver menos" : "Leer más"}
                </button>
              </div>
            )}

            {/* Quantity row */}
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-semibold" style={{ color: "var(--t-text-primary)" }}>
                Cantidad
              </span>
              <QuantityStepper
                quantity={quantity}
                onDecrement={onDecrement}
                onIncrement={onIncrement}
              />
            </div>

            {/* Divider */}
            <div style={{ height: 1, backgroundColor: "var(--t-border-light)" }} aria-hidden="true" />

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-[20px] font-bold" style={{ color: "var(--t-text-primary)" }}>
                {formatPrice(product.price, currencySymbol)}
              </span>
              {product.compare_at_price && product.compare_at_price > product.price && (
                <span
                  className="line-through text-[14px] font-normal"
                  style={{ color: "var(--t-text-muted)" }}
                >
                  {formatPrice(product.compare_at_price, currencySymbol)}
                </span>
              )}
            </div>

            {/* Size selector */}
            {sizeOptions.length > 0 && (
              <SizeSelector
                options={sizeOptions}
                selectedId={selectedSizeId}
                onSelect={onSizeSelect}
              />
            )}

            {/* Desktop inline add-to-cart */}
            <div className="hidden lg:flex items-center gap-4 pt-2">
              <QuantityStepper
                quantity={quantity}
                onDecrement={onDecrement}
                onIncrement={onIncrement}
              />
              <button
                type="button"
                disabled={!product.available}
                onClick={onAddToCart}
                className="flex-1 flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
                style={{
                  borderRadius: "var(--t-radius-button)",
                  height: 52,
                  backgroundColor: product.available ? "var(--t-button-bg)" : "var(--t-card-bg)",
                  color: product.available ? "var(--t-button-text)" : "var(--t-text-muted)",
                  border: "none",
                  cursor: product.available ? "pointer" : "not-allowed",
                  maxWidth: 320,
                  fontSize: "14px",
                  fontWeight: 600,
                }}
                aria-label={
                  product.available
                    ? `Agregar al carrito — ${formatPrice(product.price, currencySymbol)}`
                    : "Producto agotado"
                }
              >
                <ShoppingCart size={17} strokeWidth={2} />
                <span>{product.available ? "Agregar al carrito" : "Agotado"}</span>
                {product.available && (
                  <span style={{ marginLeft: 4 }}>
                    | {formatPrice(product.price, currencySymbol)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>

      <StickyBottomBar
        price={product.price}
        available={product.available}
        currencySymbol={currencySymbol}
        onAddToCart={onAddToCart}
      />

      <BottomNav
        activeTab={activeTab}
        cartItemCount={cartItemCount}
        onTabChange={(tab) => {
          if (tab === "cart") onCartClick?.();
          else onTabChange?.(tab);
        }}
      />
    </div>
  );
}
