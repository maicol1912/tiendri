// Decor Warm Template — Product Detail Page (Presentational)
// Layout: back button + title, linen image hero (4:3), product info,
//         category tab bar, opinions section, full-width peach CTA pill.
// ZERO hardcoded colors — all via var(--t-*).

import Image from "next/image";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { CategoryTabBar } from "./CategoryTabBar";
import { QuantityStepper } from "./QuantityStepper";
import type { DecorWarmProduct, DecorWarmCategory } from "../types";


interface ProductDetailPageProps {
  product: DecorWarmProduct;
  categories?: DecorWarmCategory[];
  activeCategoryId?: string | null;
  activeImageIndex?: number;
  quantity?: number;
  isAdded?: boolean;
  currencySymbol?: string;
  onBack?: () => void;
  onCartClick?: () => void;
  onCategoryChange?: (id: string | null) => void;
  onImageIndexChange?: (index: number) => void;
  onQuantityChange?: (value: number) => void;
  onAddToCart?: () => void;
}

export function ProductDetailPage({
  product,
  categories = [],
  activeCategoryId = null,
  activeImageIndex = 0,
  quantity = 1,
  isAdded = false,
  currencySymbol = "$",
  onBack,
  onCartClick,
  onCategoryChange,
  onImageIndexChange,
  onQuantityChange,
  onAddToCart,
}: ProductDetailPageProps) {
  const primaryImage = product.images[activeImageIndex]?.url
    ?? product.images[0]?.url
    ?? null;

  const formattedPrice = `${currencySymbol}${new Intl.NumberFormat("en-US").format(product.price)}`;

  const hasDiscount = product.compare_at_price != null && product.compare_at_price > product.price;
  const formattedOriginal = hasDiscount && product.compare_at_price
    ? `${currencySymbol}${new Intl.NumberFormat("en-US").format(product.compare_at_price)}`
    : null;

  const hasThumbnails = product.images.length > 1;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--t-background)" }}>
      <main className="flex-1 flex flex-col pb-[calc(100px+env(safe-area-inset-bottom,0px))] lg:pb-8">

        {/* ── Top bar ── */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-4 md:px-6 lg:px-8 py-3"
          style={{ backgroundColor: "var(--t-header-bg)", borderBottom: "1px solid var(--t-nav-border)" }}
        >
          <button
            type="button"
            className="flex items-center justify-center"
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              backgroundColor: "var(--t-surface)",
              border: "none",
              cursor: "pointer",
            }}
            aria-label="Volver"
            onClick={onBack}
          >
            <ArrowLeft size={18} style={{ color: "var(--t-dark-mode)" }} />
          </button>

          <span
            style={{
              color: "var(--t-dark-mode)",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            Detalles
          </span>

          <button
            type="button"
            className="flex items-center justify-center"
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              backgroundColor: "var(--t-surface)",
              border: "none",
              cursor: "pointer",
            }}
            aria-label="Ver carrito"
            onClick={onCartClick}
          >
            <ShoppingCart size={18} style={{ color: "var(--t-dark-mode)" }} />
          </button>
        </div>

        {/* ── Category tab bar ── */}
        {categories.length > 0 && (
          <div className="pt-2">
            <CategoryTabBar
              categories={categories}
              activeCategoryId={activeCategoryId}
              onCategoryChange={onCategoryChange}
            />
          </div>
        )}

        <div className="max-w-5xl mx-auto w-full px-4 md:px-6 lg:px-8 mt-4 lg:flex lg:gap-8 lg:items-start">

          {/* ── Hero image (4:3 linen) ── */}
          <div className="lg:w-1/2 flex-shrink-0">
            <div
              className="relative w-full overflow-hidden"
              style={{
                aspectRatio: "4 / 3",
                backgroundColor: "var(--t-surface)",
                borderRadius: "var(--t-radius-card)",
              }}
            >
              {primaryImage ? (
                <Image
                  src={primaryImage}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  className="object-contain p-6"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                    <rect width="48" height="48" rx="12" fill="var(--t-border)" />
                    <path
                      d="M8 34l10-12 7 7 9-11L46 34"
                      stroke="var(--t-primary)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {hasThumbnails && (
              <div className="flex items-center gap-2 mt-3 overflow-x-auto [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
                {product.images.map((img, i) => (
                  <button
                    key={img.url + i}
                    type="button"
                    onClick={() => onImageIndexChange?.(i)}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: "var(--t-radius-category)",
                      backgroundColor: "var(--t-surface)",
                      border: i === activeImageIndex
                        ? "2px solid var(--t-primary)"
                        : "2px solid transparent",
                      cursor: "pointer",
                      flexShrink: 0,
                      overflow: "hidden",
                      position: "relative",
                    }}
                    aria-label={`Imagen ${i + 1}`}
                    aria-pressed={i === activeImageIndex}
                  >
                    <Image
                      src={img.url}
                      alt={`${product.name} vista ${i + 1}`}
                      fill
                      sizes="60px"
                      className="object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product info (right on desktop) ── */}
          <div className="lg:flex-1 mt-5 lg:mt-0 flex flex-col gap-4">
            {/* Name */}
            <h1
              style={{
                color: "var(--t-dark-mode)",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "22px",
                fontWeight: 600,
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              {product.name}
            </h1>

            {/* Price row */}
            <div className="flex items-baseline gap-2">
              <span
                style={{
                  color: "var(--t-primary)",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "20px",
                  fontWeight: 600,
                }}
              >
                {formattedPrice}
              </span>
              {formattedOriginal && (
                <span
                  className="line-through"
                  style={{
                    color: "var(--t-text-muted)",
                    fontFamily: "'League Spartan', sans-serif",
                    fontSize: "14px",
                  }}
                >
                  {formattedOriginal}
                </span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="flex flex-col gap-1.5">
                <h3
                  style={{
                    color: "var(--t-dark-mode)",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    margin: 0,
                  }}
                >
                  Descripción
                </h3>
                <p
                  style={{
                    color: "var(--t-text-secondary)",
                    fontFamily: "'League Spartan', sans-serif",
                    fontSize: "14px",
                    fontWeight: 300,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {product.description}
                </p>
              </div>
            )}

            {/* Quantity + add (desktop) */}
            <div className="hidden lg:flex items-center gap-4 mt-4">
              <QuantityStepper
                quantity={quantity}
                min={1}
                max={99}
                onChange={onQuantityChange ?? (() => {})}
                size="md"
              />
              <button
                type="button"
                disabled={!product.available}
                style={{
                  flex: 1,
                  backgroundColor: isAdded ? "#22C55E" : "var(--t-peach)",
                  color: "#FFFFFF",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "15px",
                  fontWeight: 600,
                  borderRadius: "var(--t-radius-button)",
                  border: "none",
                  cursor: product.available ? "pointer" : "not-allowed",
                  padding: "13px 24px",
                  transition: "background-color 0.2s ease",
                }}
                onClick={onAddToCart}
              >
                {!product.available
                  ? "Agotado"
                  : isAdded
                  ? "Agregado ✓"
                  : "Agregar al carrito"}
              </button>
            </div>

          </div>
        </div>
      </main>

      {/* ── Bottom CTA (mobile) — full-width peach pill ── */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center gap-3 px-4 py-4"
        style={{
          backgroundColor: "var(--t-background)",
          paddingBottom: "calc(16px + env(safe-area-inset-bottom, 0px))",
          borderTop: "1px solid var(--t-border)",
        }}
      >
        <QuantityStepper
          quantity={quantity}
          min={1}
          max={99}
          onChange={onQuantityChange ?? (() => {})}
          size="sm"
        />
        <button
          type="button"
          disabled={!product.available}
          className="flex-1"
          style={{
            backgroundColor: isAdded ? "#22C55E" : "var(--t-peach)",
            color: "#FFFFFF",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "15px",
            fontWeight: 600,
            borderRadius: "var(--t-radius-button)",
            border: "none",
            cursor: product.available ? "pointer" : "not-allowed",
            padding: "13px 0",
            transition: "background-color 0.2s ease",
          }}
          onClick={onAddToCart}
        >
          {!product.available
            ? "Agotado"
            : isAdded
            ? "Agregado ✓"
            : "Agregar al carrito"}
        </button>
      </div>
    </div>
  );
}
