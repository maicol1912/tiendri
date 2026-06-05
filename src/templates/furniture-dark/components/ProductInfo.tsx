"use client";

// Furniture Dark — ProductInfo
// Rating + name + price + description with "Leer más" toggle
// Color selector + quantity stepper inline (desktop)
// ALL colors via var(--t-*)

import { useState } from "react";
import type { StorefrontProduct, ColorOption } from "../types";
import { QuantityStepper } from "./QuantityStepper";

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

interface ProductInfoProps {
  product: StorefrontProduct;
  quantity: number;
  selectedColorId?: string;
  onColorSelect?: (colorId: string) => void;
  onIncrement: () => void;
  onDecrement: () => void;
  /** Optional: shown on desktop only, calls onAddToCart */
  onAddToCart?: () => void;
}

export function ProductInfo({
  product,
  quantity,
  selectedColorId,
  onColorSelect,
  onIncrement,
  onDecrement,
  onAddToCart,
}: ProductInfoProps) {
  const [descExpanded, setDescExpanded] = useState(false);

  const colors = product.colors ?? [];
  const discountPct =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : null;

  const description = product.description ?? "";
  const descShort = description.length > 160 ? description.slice(0, 160) + "…" : description;

  return (
    <div className="flex flex-col gap-5">
      {/* Name */}
      <h1
        className="text-[var(--t-text-primary)]"
        style={{
          fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
          fontSize: "24px",
          fontWeight: 700,
          letterSpacing: "-0.72px",
          lineHeight: "1.2",
        }}
      >
        {product.name}
      </h1>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span
          className="text-[var(--t-text-primary)]"
          style={{
            fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
            fontSize: "28px",
            fontWeight: 700,
            letterSpacing: "-0.84px",
          }}
        >
          {formatPrice(product.price)}
        </span>
        {product.originalPrice && product.originalPrice > product.price && (
          <>
            <span
              className="line-through text-[var(--t-text-muted)]"
              style={{
                fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                fontSize: "16px",
              }}
            >
              {formatPrice(product.originalPrice)}
            </span>
            {discountPct !== null && (
              <span
                className="px-2 py-0.5 rounded-full text-xs font-bold"
                style={{
                  backgroundColor: "var(--t-badge-bg)",
                  color: "var(--t-badge-text)",
                  fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                }}
              >
                -{discountPct}%
              </span>
            )}
          </>
        )}
      </div>

      {/* Description */}
      {description && (
        <div>
          <p
            className="text-[var(--t-text-secondary)] leading-relaxed"
            style={{
              fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
              fontSize: "14px",
              lineHeight: "1.7",
            }}
          >
            {descExpanded ? description : descShort}
          </p>
          {description.length > 160 && (
            <button
              type="button"
              className="mt-2 text-[var(--t-primary)] font-semibold text-sm"
              style={{ fontFamily: "var(--font-body, 'Urbanist', sans-serif)" }}
              onClick={() => setDescExpanded((p) => !p)}
            >
              {descExpanded ? "Leer menos" : "Leer más"}
            </button>
          )}
        </div>
      )}

      {/* Color selector */}
      {colors.length > 0 && (
        <div className="flex flex-col gap-3">
          <p
            className="text-[var(--t-text-secondary)] font-medium"
            style={{
              fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            Color
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            {colors.map((color: ColorOption) => (
              <button
                key={color.id}
                type="button"
                className="w-8 h-8 rounded-full transition-transform hover:scale-110 active:scale-95"
                style={{
                  backgroundColor: color.hex,
                  outline:
                    selectedColorId === color.id
                      ? "2px solid var(--t-primary)"
                      : "2px solid transparent",
                  outlineOffset: "2px",
                }}
                aria-label={color.name}
                aria-pressed={selectedColorId === color.id}
                onClick={() => onColorSelect?.(color.id)}
                title={color.name}
              />
            ))}
          </div>
        </div>
      )}

      {/* Quantity + Add to cart (desktop) */}
      <div className="hidden lg:flex items-center gap-4">
        <QuantityStepper
          quantity={quantity}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          size="md"
        />
        {onAddToCart && (
          <button
            type="button"
            className="flex-1 py-3.5 rounded-[var(--t-radius-button)] font-bold transition-opacity hover:opacity-90 active:scale-95"
            style={{
              backgroundColor: "var(--t-button-bg)",
              color: "var(--t-button-text)",
              fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "-0.28px",
            }}
            onClick={onAddToCart}
          >
            AGREGAR AL CARRITO
          </button>
        )}
      </div>
    </div>
  );
}
