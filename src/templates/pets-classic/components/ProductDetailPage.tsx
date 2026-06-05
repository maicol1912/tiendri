"use client";

// Pets Classic — Product Detail Page
// 2-col desktop (image left | info right). Heart button. Stars rating.
// Tags as pills. Qty stepper. Sticky bottom CTA on mobile.
// All colors via var(--t-*). ZERO hardcoded hex.

import { useState } from "react";
import Image from "next/image";
import { Heart, Star, ShoppingBag, ChevronLeft } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import type { PetsClassicConfig } from "../config";
import type {
  StoreInfo,
  PetsClassicProduct,
  NavTab,
} from "../types";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US").format(price);
}

interface ProductDetailPageProps {
  store: StoreInfo;
  product: PetsClassicProduct;
  layout?: PetsClassicConfig["layout"];
  activeTab?: NavTab;
  cartItemCount?: number;
  currencySymbol?: string;
  onBack?: () => void;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onMenuClick?: () => void;
  onTabChange?: (tab: NavTab) => void;
  onAddToCart?: (productId: string, quantity: number) => void;
  onWishlistToggle?: (productId: string) => void;
}

export function ProductDetailPage({
  store,
  product,
  layout,
  activeTab = "home",
  cartItemCount = 0,
  currencySymbol = "$",
  onBack,
  onSearchClick,
  onCartClick,
  onMenuClick,
  onTabChange,
  onAddToCart,
  onWishlistToggle,
}: ProductDetailPageProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [inWishlist, setInWishlist] = useState(product.inWishlist ?? false);

  const activeImage = product.images[activeImageIndex]?.url ?? null;
  const hasDiscount =
    product.compare_at_price !== null && product.compare_at_price > product.price;

  const handleWishlist = () => {
    setInWishlist((prev) => !prev);
    onWishlistToggle?.(product.id);
  };

  const handleDecrement = () => setQuantity((q) => Math.max(1, q - 1));
  const handleIncrement = () => setQuantity((q) => q + 1);

  const handleAddToCart = () => {
    if (!product.available) return;
    onAddToCart?.(product.id, quantity);
  };

  const rating = product.rating ?? 4.5;
  const fullStars = Math.floor(rating);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--t-background)", fontFamily: "var(--t-font, Poppins, sans-serif)" }}
    >
      <Header
        store={store}
        cartItemCount={cartItemCount}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
        onMenuClick={onMenuClick}
      />

      <main className="pb-28 lg:pb-8">
        {/* Back button */}
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-3">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--t-text-muted)",
              fontSize: "13px",
            }}
          >
            <ChevronLeft size={16} />
            Volver
          </button>
        </div>

        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            {/* ── Image column ── */}
            <div className="flex flex-col gap-3">
              {/* Main image */}
              <div
                className="relative w-full aspect-square overflow-hidden flex items-center justify-center"
                style={{
                  borderRadius: "var(--t-radius-card)",
                  backgroundColor: "var(--t-surface)",
                }}
              >
                {activeImage ? (
                  <Image
                    src={activeImage}
                    alt={product.name}
                    fill
                    className="object-contain p-6"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div style={{ color: "var(--t-border)" }}>Sin imagen</div>
                )}

                {/* Heart button overlay */}
                <button
                  type="button"
                  onClick={handleWishlist}
                  className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center"
                  style={{
                    borderRadius: "50%",
                    backgroundColor: "var(--t-card-bg)",
                    border: "1px solid var(--t-border)",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                  aria-label={inWishlist ? "Quitar de favoritos" : "Agregar a favoritos"}
                  aria-pressed={inWishlist}
                >
                  <Heart
                    size={16}
                    strokeWidth={2}
                    fill={inWishlist ? "var(--t-primary)" : "none"}
                    style={{ color: inWishlist ? "var(--t-primary)" : "var(--t-text-muted)" }}
                  />
                </button>
              </div>

              {/* Thumbnail row */}
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveImageIndex(i)}
                      className="flex-shrink-0"
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: "var(--t-radius-category)",
                        border:
                          i === activeImageIndex
                            ? "2px solid var(--t-primary)"
                            : "1px solid var(--t-border)",
                        overflow: "hidden",
                        cursor: "pointer",
                        padding: 0,
                        backgroundColor: "var(--t-surface)",
                        position: "relative",
                      }}
                      aria-label={`Imagen ${i + 1}`}
                      aria-pressed={i === activeImageIndex}
                    >
                      <Image
                        src={img.url}
                        alt={`${product.name} imagen ${i + 1}`}
                        fill
                        className="object-contain p-1"
                        sizes="60px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Info column ── */}
            <div className="flex flex-col gap-4">
              {/* Category + Name */}
              <div>
                <h1
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "var(--t-text-primary)",
                    lineHeight: 1.3,
                    marginBottom: 8,
                  }}
                >
                  {product.name}
                </h1>

                {/* Stars */}
                {product.rating && (
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        strokeWidth={0}
                        fill={i < fullStars ? "var(--t-rating-star)" : "var(--t-rating-bar-bg)"}
                      />
                    ))}
                    <span style={{ fontSize: "12px", color: "var(--t-text-muted)", marginLeft: 4 }}>
                      {rating.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span style={{ fontSize: "26px", fontWeight: 800, color: "var(--t-text-primary)" }}>
                  {currencySymbol}{formatPrice(product.price)}
                </span>
                {hasDiscount && product.compare_at_price && (
                  <>
                    <span style={{ fontSize: "16px", color: "var(--t-text-muted)", textDecoration: "line-through" }}>
                      {currencySymbol}{formatPrice(product.compare_at_price)}
                    </span>
                    <span
                      className="px-2 py-0.5"
                      style={{
                        borderRadius: 9999,
                        backgroundColor: "var(--t-badge-bg)",
                        color: "var(--t-badge-text)",
                        fontSize: "11px",
                        fontWeight: 700,
                      }}
                    >
                      -{Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)}%
                    </span>
                  </>
                )}
              </div>

              {/* Availability */}
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: product.available ? "var(--t-primary)" : "var(--t-text-muted)",
                }}
              >
                {product.available ? "En stock" : "Agotado"}
              </p>

              {/* Description */}
              {product.description && (
                <p style={{ fontSize: "13px", color: "var(--t-text-secondary)", lineHeight: 1.7 }}>
                  {product.description}
                </p>
              )}

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1"
                      style={{
                        borderRadius: "var(--t-radius-button)",
                        backgroundColor: "var(--t-spec-badge-bg)",
                        color: "var(--t-text-secondary)",
                        fontSize: "11px",
                        fontWeight: 500,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Quantity stepper — desktop */}
              {product.available && (
                <div className="hidden lg:flex items-center gap-6 mt-2">
                  <div
                    className="flex items-center"
                    style={{
                      border: "1px solid var(--t-border)",
                      borderRadius: "var(--t-radius-button)",
                      overflow: "hidden",
                    }}
                  >
                    <button
                      type="button"
                      onClick={handleDecrement}
                      disabled={quantity <= 1}
                      className="flex items-center justify-center w-10 h-10"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: quantity <= 1 ? "not-allowed" : "pointer",
                        color: quantity <= 1 ? "var(--t-border)" : "var(--t-text-primary)",
                        fontSize: "18px",
                        fontWeight: 700,
                      }}
                      aria-label="Disminuir cantidad"
                    >
                      −
                    </button>
                    <span
                      className="w-10 text-center"
                      style={{ fontSize: "14px", fontWeight: 600, color: "var(--t-text-primary)" }}
                    >
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={handleIncrement}
                      className="flex items-center justify-center w-10 h-10"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--t-text-primary)",
                        fontSize: "18px",
                        fontWeight: 700,
                      }}
                      aria-label="Aumentar cantidad"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex items-center gap-2 px-8 py-3 flex-1"
                    style={{
                      borderRadius: "var(--t-radius-button)",
                      backgroundColor: "var(--t-button-bg)",
                      color: "var(--t-button-text)",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: 700,
                      justifyContent: "center",
                    }}
                  >
                    <ShoppingBag size={16} />
                    Agregar al carrito
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer store={store} layout={layout} />

      {/* Mobile sticky CTA */}
      {product.available && (
        <div
          className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-4 pb-safe"
          style={{
            backgroundColor: "var(--t-background)",
            borderTop: "1px solid var(--t-border)",
            paddingTop: 12,
            paddingBottom: 12,
          }}
        >
          <div className="flex items-center gap-3 max-w-lg mx-auto">
            <div
              className="flex items-center flex-shrink-0"
              style={{
                border: "1px solid var(--t-border)",
                borderRadius: "var(--t-radius-button)",
                overflow: "hidden",
              }}
            >
              <button
                type="button"
                onClick={handleDecrement}
                disabled={quantity <= 1}
                className="flex items-center justify-center w-9 h-9"
                style={{
                  background: "none",
                  border: "none",
                  cursor: quantity <= 1 ? "not-allowed" : "pointer",
                  color: quantity <= 1 ? "var(--t-border)" : "var(--t-text-primary)",
                  fontSize: "16px",
                  fontWeight: 700,
                }}
                aria-label="Disminuir cantidad"
              >
                −
              </button>
              <span
                className="w-8 text-center"
                style={{ fontSize: "13px", fontWeight: 600, color: "var(--t-text-primary)" }}
              >
                {quantity}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                className="flex items-center justify-center w-9 h-9"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--t-text-primary)",
                  fontSize: "16px",
                  fontWeight: 700,
                }}
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="flex items-center gap-2 py-3 flex-1"
              style={{
                borderRadius: "var(--t-radius-button)",
                backgroundColor: "var(--t-button-bg)",
                color: "var(--t-button-text)",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 700,
                justifyContent: "center",
              }}
            >
              <ShoppingBag size={16} />
              Agregar al carrito
            </button>
          </div>
        </div>
      )}

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
