// Beauty Soft Template — Cart Page (Presentational)
// Soft background, white card items, discount code input, total, checkout button.
// ZERO hardcoded colors — all via var(--t-*).

import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { BottomNav } from "./BottomNav";
import type { CartItem } from "../context/CartContext";

interface CartPageProps {
  items: CartItem[];
  totalPrice: number;
  currencySymbol?: string;
  onBack?: () => void;
  onGoHome?: () => void;
  onCheckout?: () => void;
  onIncrement?: (productId: string, variantLabel?: string | null) => void;
  onDecrement?: (productId: string, variantLabel?: string | null) => void;
  onRemove?: (productId: string, variantLabel?: string | null) => void;
  onTabChange?: (tab: "home" | "cart" | "favorites" | "profile") => void;
}

function CartItemRow({
  item,
  currencySymbol = "$",
  onIncrement,
  onDecrement,
}: {
  item: CartItem;
  currencySymbol?: string;
  onIncrement?: () => void;
  onDecrement?: () => void;
}) {
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

export function CartPage({
  items,
  totalPrice,
  currencySymbol = "$",
  onBack,
  onGoHome,
  onCheckout,
  onIncrement,
  onDecrement,
  onTabChange,
}: CartPageProps) {
  const isEmpty = items.length === 0;
  const formattedTotal = `${currencySymbol}${new Intl.NumberFormat("en-US").format(totalPrice)}`;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--t-background)" }}
    >
      {/* Header */}
      <header className="px-5 pt-[12px] pb-0">
        <div className="max-w-5xl mx-auto flex items-center gap-[10px] h-[47px] relative">
          <button
            type="button"
            className="flex items-center justify-center flex-shrink-0 border-0 cursor-pointer"
            style={{
              width: "47px",
              height: "47px",
              borderRadius: "37px",
              backgroundColor: "var(--t-section-bg)",
            }}
            aria-label="Volver"
            onClick={onBack}
          >
            <ChevronLeft size={24} strokeWidth={2} className="text-[var(--t-text-primary)]" />
          </button>

          <p
            className="absolute left-1/2 -translate-x-1/2 m-0 text-[20px] font-medium text-[var(--t-text-primary)] leading-[22px] tracking-[-0.408px]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Mi carrito
          </p>
        </div>
      </header>

      <main
        className="flex-1 max-w-5xl mx-auto w-full px-5 pt-5"
        style={{
          paddingBottom: isEmpty
            ? "24px"
            : "calc(300px + env(safe-area-inset-bottom, 0px))",
        }}
      >
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--t-section-bg)" }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
                  stroke="var(--t-text-muted)"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line x1="3" y1="6" x2="21" y2="6" stroke="var(--t-text-muted)" strokeWidth="1.75" />
                <path
                  d="M16 10a4 4 0 0 1-8 0"
                  stroke="var(--t-text-muted)"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p
              className="m-0 text-base font-semibold text-[var(--t-text-primary)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Tu carrito está vacío
            </p>
            <p
              className="m-0 text-sm font-normal text-[var(--t-text-muted)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Agrega productos para continuar
            </p>
            <button
              type="button"
              className="px-6 py-3 border-0 cursor-pointer text-[var(--t-button-text)]"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "15px",
                fontWeight: 600,
                backgroundColor: "var(--t-button-bg)",
                borderRadius: "var(--t-radius-button)",
              }}
              onClick={onGoHome}
            >
              Ver productos
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {items.map((item) => (
              <CartItemRow
                key={`${item.productId}-${item.variantLabel ?? ""}`}
                item={item}
                currencySymbol={currencySymbol}
                onIncrement={() => onIncrement?.(item.productId, item.variantLabel)}
                onDecrement={() => onDecrement?.(item.productId, item.variantLabel)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Bottom checkout section */}
      {!isEmpty && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 lg:relative"
          style={{
            backgroundColor: "var(--t-section-bg)",
            paddingBottom: "calc(70px + env(safe-area-inset-bottom, 0px))",
            borderTop: "1px solid var(--t-border)",
          }}
        >
          <div className="max-w-5xl mx-auto px-5 pt-[10px] pb-[10px] flex flex-col gap-[10px]">
            {/* Discount code input */}
            <div
              className="flex items-center justify-between"
              style={{
                backgroundColor: "var(--t-card-bg)",
                borderRadius: "var(--t-radius-button)",
                height: "55px",
                paddingLeft: "21px",
                paddingRight: "8px",
              }}
            >
              <span
                className="text-sm font-normal text-[var(--t-text-muted)] leading-[22px] tracking-[-0.408px]"
                style={{ fontFamily: "var(--font-heading, var(--font-sans))" }}
              >
                Ingresar código de descuento
              </span>
              <button
                type="button"
                className="flex items-center justify-center border-0 cursor-pointer text-[var(--t-button-text)]"
                style={{
                  backgroundColor: "var(--t-discount-bg, var(--t-card-bg))",
                  borderRadius: "27px",
                  width: "83px",
                  height: "39px",
                  fontFamily: "var(--font-heading, var(--font-sans))",
                  fontSize: "14px",
                  fontWeight: 700,
                  lineHeight: "22px",
                  letterSpacing: "-0.408px",
                }}
              >
                Aplicar
              </button>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between" style={{ padding: "20px 12px" }}>
              <span
                className="text-sm font-semibold text-[var(--t-text-primary)] leading-[22px] tracking-[-0.408px]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Total
              </span>
              <span
                className="text-base font-semibold text-[var(--t-text-primary)] leading-[22px] tracking-[-0.408px]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {formattedTotal}
              </span>
            </div>

            {/* Checkout button */}
            <button
              type="button"
              className="w-full flex items-center justify-center border-0 cursor-pointer text-[var(--t-button-text)]"
              style={{
                fontFamily: "var(--font-heading, var(--font-sans))",
                fontSize: "17px",
                fontWeight: 400,
                backgroundColor: "var(--t-button-bg)",
                borderRadius: "var(--t-radius-button)",
                height: "47px",
                lineHeight: "22px",
                letterSpacing: "-0.408px",
              }}
              onClick={onCheckout}
            >
              Finalizar compra
            </button>
          </div>
        </div>
      )}

      <BottomNav activeTab="cart" onTabChange={onTabChange} />
    </div>
  );
}
