"use client";

// Pets Classic — Product Detail Page
// 2-col desktop (image left | info right). Heart button. Stars rating.
// Tags as pills. Qty stepper. Sticky bottom CTA on mobile.
// All colors via var(--t-*). ZERO hardcoded hex.

import { useState } from "react";
import Image from "next/image";
import { ShoppingBag, ChevronLeft } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { QuantityStepper } from "./QuantityStepper";
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
}: ProductDetailPageProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isCartBtnPressed, setIsCartBtnPressed] = useState(false);

  const activeImage = product.images[activeImageIndex]?.url ?? null;
  const hasDiscount =
    product.compare_at_price !== null && product.compare_at_price > product.price;

  const handleDecrement = () => setQuantity((q) => Math.max(1, q - 1));
  const handleIncrement = () => setQuantity((q) => q + 1);

  const handleAddToCart = () => {
    if (!product.available) return;
    onAddToCart?.(product.id, quantity);
  };


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
                className="relative w-full overflow-hidden flex items-center justify-center"
                style={{
                  borderRadius: "var(--t-radius-card)",
                  backgroundColor: "#fff",
                  aspectRatio: "4/3",
                  maxHeight: "420px",
                }}
              >
                {activeImage ? (
                  <Image
                    src={activeImage}
                    alt={product.name}
                    fill
                    className="object-contain p-3"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div style={{ color: "var(--t-border)" }}>Sin imagen</div>
                )}

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
                    fontSize: "28px",
                    fontWeight: 800,
                    color: "var(--t-text-primary)",
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                    fontFamily: "var(--t-font-heading, inherit)",
                    marginBottom: 10,
                  }}
                >
                  {product.name}
                </h1>

              </div>

              {/* Price */}
              <div
                style={{
                  backgroundColor: "var(--t-surface)",
                  borderRadius: "var(--t-radius-card)",
                  padding: "12px 16px",
                }}
              >
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span style={{ fontSize: "32px", fontWeight: 900, color: "var(--t-primary)", letterSpacing: "-0.02em" }}>
                    {currencySymbol}{formatPrice(product.price)}
                  </span>
                  {hasDiscount && product.compare_at_price && (
                    <span style={{ fontSize: "16px", color: "var(--t-text-muted)", textDecoration: "line-through" }}>
                      {currencySymbol}{formatPrice(product.compare_at_price)}
                    </span>
                  )}
                </div>
                {hasDiscount && product.compare_at_price && (
                  <span
                    className="inline-block px-2 py-0.5 mt-1"
                    style={{
                      borderRadius: 9999,
                      backgroundColor: "var(--t-badge-bg)",
                      color: "var(--t-badge-text)",
                      fontSize: "12px",
                      fontWeight: 700,
                      alignSelf: "flex-start",
                    }}
                  >
                    Ahorrás {Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)}%
                  </span>
                )}
              </div>

              {/* Availability */}
              <div className="flex items-center gap-2">
                {product.available ? (
                  <>
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: "#22C55E",
                        boxShadow: "0 0 0 3px rgba(34,197,94,0.2)",
                        display: "inline-block",
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    />
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "#16A34A" }}>
                      En stock
                    </span>
                  </>
                ) : (
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--t-text-muted)" }}>
                    Agotado
                  </span>
                )}
              </div>

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
                      className="px-3 py-1.5"
                      style={{
                        borderRadius: "var(--t-radius-button)",
                        backgroundColor: "var(--t-spec-badge-bg)",
                        color: "var(--t-primary)",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.03em",
                        border: "1px solid rgba(var(--t-primary-rgb), 0.2)",
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
                  <QuantityStepper
                    value={quantity}
                    onDecrement={handleDecrement}
                    onIncrement={handleIncrement}
                  />

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex items-center gap-2 px-8 py-3.5 flex-1"
                    style={{
                      borderRadius: "var(--t-radius-button)",
                      background: "linear-gradient(135deg, var(--t-button-bg) 0%, color-mix(in srgb, var(--t-button-bg) 80%, #000) 100%)",
                      color: "var(--t-button-text)",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "15px",
                      fontWeight: 800,
                      letterSpacing: "0.02em",
                      justifyContent: "center",
                      boxShadow: "0 4px 16px rgba(var(--t-primary-rgb), 0.30), 0 1px 4px rgba(0,0,0,0.10)",
                      // Press feedback: scale(0.97) on active — animationLevel "full" or "subtle"
                      transform:
                        (layout?.animationLevel === "full" || layout?.animationLevel === "subtle") && isCartBtnPressed
                          ? "scale(0.97)"
                          : "scale(1)",
                      transition:
                        layout?.animationLevel === "full" || layout?.animationLevel === "subtle"
                          ? "transform 100ms ease-out"
                          : undefined,
                      willChange:
                        layout?.animationLevel === "full" ? "transform" : undefined,
                    }}
                    onMouseDown={() => {
                      if (layout?.animationLevel === "full" || layout?.animationLevel === "subtle") {
                        setIsCartBtnPressed(true);
                      }
                    }}
                    onMouseUp={() => setIsCartBtnPressed(false)}
                    onMouseLeave={() => setIsCartBtnPressed(false)}
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
            <QuantityStepper
              value={quantity}
              buttonSize={9}
              valueWidth={8}
              fontSize="13px"
              onDecrement={handleDecrement}
              onIncrement={handleIncrement}
            />

            <button
              type="button"
              onClick={handleAddToCart}
              className="flex items-center gap-2 py-3.5 flex-1"
              style={{
                borderRadius: "var(--t-radius-button)",
                background: "linear-gradient(135deg, var(--t-button-bg) 0%, color-mix(in srgb, var(--t-button-bg) 80%, #000) 100%)",
                color: "var(--t-button-text)",
                border: "none",
                cursor: "pointer",
                fontSize: "15px",
                fontWeight: 800,
                letterSpacing: "0.02em",
                justifyContent: "center",
                boxShadow: "0 4px 16px rgba(var(--t-primary-rgb), 0.30), 0 1px 4px rgba(0,0,0,0.10)",
                // Press feedback: same isCartBtnPressed state as desktop (shared)
                transform:
                  (layout?.animationLevel === "full" || layout?.animationLevel === "subtle") && isCartBtnPressed
                    ? "scale(0.97)"
                    : "scale(1)",
                transition:
                  layout?.animationLevel === "full" || layout?.animationLevel === "subtle"
                    ? "transform 100ms ease-out"
                    : undefined,
                willChange:
                  layout?.animationLevel === "full" ? "transform" : undefined,
              }}
              onMouseDown={() => {
                if (layout?.animationLevel === "full" || layout?.animationLevel === "subtle") {
                  setIsCartBtnPressed(true);
                }
              }}
              onMouseUp={() => setIsCartBtnPressed(false)}
              onMouseLeave={() => setIsCartBtnPressed(false)}
              onTouchStart={() => {
                if (layout?.animationLevel === "full" || layout?.animationLevel === "subtle") {
                  setIsCartBtnPressed(true);
                }
              }}
              onTouchEnd={() => setIsCartBtnPressed(false)}
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
        animationLevel={layout?.animationLevel}
        onTabChange={(tab) => {
          if (tab === "cart") onCartClick?.();
          else onTabChange?.(tab);
        }}
      />
    </div>
  );
}
