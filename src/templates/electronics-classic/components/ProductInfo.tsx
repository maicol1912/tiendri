// Electronics Classic — Product Info (Presentational)
// Name + price + key features + qty stepper + add to cart + view cart.
// All colors via var(--t-*). ZERO hardcoded hex.
// Intl.NumberFormat — NEVER toLocaleString().

import { Minus, Plus, ShoppingCart, Eye } from "lucide-react";
import type { StorefrontProduct } from "../types";

const fmt = new Intl.NumberFormat("en-US");

function StarRating({ rating, count }: { rating: number; count?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex" aria-label={`${rating} de 5 estrellas`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating)
                ? "text-yellow-400"
                : i < rating
                ? "text-yellow-300"
                : "text-[var(--t-surface)]"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      {count !== undefined && (
        <span className="text-[var(--t-text-muted)] text-xs">({count} reseñas)</span>
      )}
    </div>
  );
}

interface ProductInfoProps {
  product: StorefrontProduct;
  keyFeatures?: string[];
  quantity: number;
  currencySymbol?: string;
  onQuantityChange: (qty: number) => void;
  onAddToCart: () => void;
  onViewCart: () => void;
}

export function ProductInfo({
  product,
  keyFeatures = [],
  quantity,
  currencySymbol = "$",
  onQuantityChange,
  onAddToCart,
  onViewCart,
}: ProductInfoProps) {
  const price = `${currencySymbol}${fmt.format(product.price)}`;
  const compareAt = product.compare_at_price
    ? `${currencySymbol}${fmt.format(product.compare_at_price)}`
    : null;

  const discountPct = product.compare_at_price
    ? Math.round(
        ((product.compare_at_price - product.price) / product.compare_at_price) * 100
      )
    : null;

  return (
    <div className="flex flex-col gap-4">
      {/* Category */}
      {product.category && (
        <p className="text-[var(--t-text-muted)] text-xs uppercase tracking-wide">
          {product.category}
        </p>
      )}

      {/* Name */}
      <h1 className="text-xl md:text-2xl font-bold text-[var(--t-text-primary)] leading-tight">
        {product.name}
      </h1>

      {/* Rating */}
      {product.rating !== undefined && (
        <StarRating rating={product.rating} count={product.reviewCount} />
      )}

      {/* Price */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-2xl md:text-3xl font-bold text-[var(--t-primary)]">
          {price}
        </span>
        {compareAt && (
          <>
            <span className="text-[var(--t-text-muted)] line-through text-lg">
              {compareAt}
            </span>
            {discountPct && (
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded"
                style={{
                  backgroundColor: "var(--t-badge-bg)",
                  color: "var(--t-badge-text)",
                }}
              >
                -{discountPct}%
              </span>
            )}
          </>
        )}
      </div>

      {/* Availability */}
      <p
        className="text-sm font-medium"
        style={{
          color: product.available ? "var(--t-primary)" : "var(--t-badge-bg)",
        }}
      >
        {product.available ? "En stock" : "Agotado"}
      </p>

      {/* Key features list */}
      {keyFeatures.length > 0 && (
        <ul className="flex flex-col gap-2">
          {keyFeatures.map((feat, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[var(--t-text-secondary)]">
              <span className="mt-0.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "var(--t-primary)" }} aria-hidden="true" />
              {feat}
            </li>
          ))}
        </ul>
      )}

      {/* Quantity stepper */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-[var(--t-text-secondary)]">
          Cantidad:
        </span>
        <div
          className="flex items-center border rounded-[var(--t-radius-button)]"
          style={{ borderColor: "var(--t-surface)" }}
        >
          <button
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            aria-label="Reducir cantidad"
            className="w-9 h-9 flex items-center justify-center disabled:opacity-40 transition-colors hover:opacity-70"
            style={{ color: "var(--t-text-primary)" }}
          >
            <Minus className="w-4 h-4" aria-hidden="true" />
          </button>
          <span
            className="w-10 text-center text-sm font-semibold select-none"
            aria-live="polite"
            aria-label={`Cantidad: ${quantity}`}
            style={{ color: "var(--t-text-primary)" }}
          >
            {quantity}
          </span>
          <button
            onClick={() => onQuantityChange(quantity + 1)}
            aria-label="Aumentar cantidad"
            className="w-9 h-9 flex items-center justify-center transition-colors hover:opacity-70"
            style={{ color: "var(--t-text-primary)" }}
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onAddToCart}
          disabled={!product.available}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-6 font-semibold text-sm rounded-[var(--t-radius-button)] transition-opacity disabled:opacity-50"
          style={{
            backgroundColor: "var(--t-button-bg)",
            color: "var(--t-button-text)",
          }}
          aria-label={`Agregar ${product.name} al carrito`}
        >
          <ShoppingCart className="w-4 h-4" aria-hidden="true" />
          Agregar al carrito
        </button>
        <button
          onClick={onViewCart}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-6 font-semibold text-sm rounded-[var(--t-radius-button)] border transition-colors"
          style={{
            borderColor: "var(--t-primary)",
            color: "var(--t-primary)",
            backgroundColor: "transparent",
          }}
          aria-label="Ver carrito"
        >
          <Eye className="w-4 h-4" aria-hidden="true" />
          Ver carrito
        </button>
      </div>
    </div>
  );
}
