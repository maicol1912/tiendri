// Beauty Soft Template — Cart Item Row
// Thumbnail + name + description + price + compact quantity counter.
// ZERO hardcoded colors — all via var(--t-*).

import Image from "next/image";
import type { CartItem } from "../context/CartContext";

interface CartItemRowProps {
  item: CartItem;
  currencySymbol?: string;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

export function CartItemRow({
  item,
  currencySymbol = "$",
  onIncrement,
  onDecrement,
}: CartItemRowProps) {
  const hasDiscount =
    item.originalPrice !== null &&
    item.originalPrice !== undefined &&
    item.originalPrice > item.price;

  const formattedPrice = `${currencySymbol}${new Intl.NumberFormat("en-US").format(item.price)}`;
  const formattedOriginalPrice =
    hasDiscount && item.originalPrice
      ? `${currencySymbol}${new Intl.NumberFormat("en-US").format(item.originalPrice)}`
      : null;

  return (
    <div
      className="flex items-start gap-[10px]"
      style={{
        backgroundColor: "var(--t-section-bg)",
        borderRadius: "22px",
        padding: "12px",
        minHeight: "119px",
      }}
    >
      {/* Thumbnail */}
      <div
        className="relative flex-shrink-0 overflow-hidden"
        style={{
          width: "85px",
          height: "85px",
          borderRadius: "var(--t-radius-card)",
        }}
      >
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.productName}
            fill
            sizes="85px"
            className="object-cover"
            style={{ borderRadius: "var(--t-radius-card)" }}
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: "var(--t-card-bg)", borderRadius: "var(--t-radius-card)" }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <rect width="28" height="28" rx="6" fill="var(--t-card-bg)" />
              <path
                d="M5 20l6-6 4 4 5-7 8 9"
                stroke="var(--t-border-mid)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden py-[4px]">
        <p
          className="line-clamp-1 m-0 text-sm font-semibold text-[var(--t-text-primary)] leading-[22px] tracking-[-0.408px]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {item.productName}
        </p>

        {item.description && (
          <p
            className="line-clamp-2 m-0 text-xs font-normal text-[var(--t-text-subtle)] leading-[18px] tracking-[-0.408px]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {item.description}
          </p>
        )}

        <div className="flex items-center justify-between gap-2 mt-auto">
          <div className="flex items-baseline gap-[6px] py-[5px]">
            {formattedOriginalPrice && (
              <span
                className="line-through text-xs font-medium text-[var(--t-primary)] leading-[22px] tracking-[-0.408px]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {formattedOriginalPrice}
              </span>
            )}
            <span
              className="text-base font-semibold text-[var(--t-text-primary)] leading-[22px] tracking-[-0.408px]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {formattedPrice}
            </span>
          </div>

          {/* Compact quantity counter */}
          <div
            className="inline-flex items-center gap-[8px]"
            style={{
              backgroundColor: "var(--t-card-bg)",
              borderRadius: "35px",
              padding: "3px 4px",
              height: "32px",
            }}
          >
            <button
              type="button"
              aria-label="Disminuir"
              className="flex items-center justify-center cursor-pointer"
              style={{
                width: "26px",
                height: "26px",
                borderRadius: "28px",
                backgroundColor: "var(--t-section-bg)",
                border: "1px solid var(--t-border)",
              }}
              onClick={onDecrement}
            >
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" stroke="var(--t-text-primary)" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </button>
            <span
              className="text-xs font-semibold text-[var(--t-text-primary)] leading-[22px] tracking-[-0.408px]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {String(item.quantity).padStart(2, "0")}
            </span>
            <button
              type="button"
              aria-label="Aumentar"
              className="flex items-center justify-center border-0 cursor-pointer"
              style={{
                width: "26px",
                height: "26px",
                borderRadius: "28px",
                backgroundColor: "var(--t-text-primary)",
              }}
              onClick={onIncrement}
            >
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19" stroke="var(--t-section-bg)" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="5" y1="12" x2="19" y2="12" stroke="var(--t-section-bg)" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
