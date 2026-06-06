import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { BUTTON_STYLE_MAP } from "@/templates/_shared/style-maps";
import type { CartPageProps } from "./types";

function fmt(price: number, symbol: string): string {
  return `${symbol}${new Intl.NumberFormat("en-US").format(price)}`;
}

function DetailedCartItemRow({
  item,
  currencySymbol,
  isLast,
  onIncrement,
  onDecrement,
  onRemove,
}: {
  item: CartPageProps["items"][number];
  currencySymbol: string;
  isLast: boolean;
  onIncrement?: (productId: string) => void;
  onDecrement?: (productId: string) => void;
  onRemove?: (productId: string) => void;
}) {
  return (
    <div
      className={`flex gap-4 items-center py-4 ${
        !isLast ? "border-b border-[var(--t-border)]/50 pb-8" : ""
      }`}
    >
      <div className="relative w-[90px] h-[90px] shrink-0">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-contain"
            sizes="90px"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-[var(--t-card-bg)] rounded" />
        )}
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-0 flex-1 min-w-0">
        <div className="flex flex-col gap-2 flex-1 min-w-[106px]">
          <p className="text-base font-medium text-[var(--t-text-primary)] line-clamp-2">{item.name}</p>
          <p className="text-sm text-[var(--t-text-primary)]">
            #{item.productId.replace(/\D/g, "").slice(0, 14) || "00000000"}
          </p>
        </div>

        <div className="flex items-center gap-6 justify-end">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="w-6 h-6 flex items-center justify-center bg-transparent border-none cursor-pointer p-0"
              onClick={() => onDecrement?.(item.productId)}
              aria-label="Disminuir cantidad"
            >
              <Minus className="w-4 h-4 text-[var(--t-text-primary)]" />
            </button>
            <div className="border border-[var(--t-border-mid)]/50 rounded px-4 py-2 min-w-[32px] text-center">
              <span className="text-base font-medium text-[var(--t-text-primary)]">{item.quantity}</span>
            </div>
            <button
              type="button"
              className="w-6 h-6 flex items-center justify-center bg-transparent border-none cursor-pointer p-0"
              onClick={() => onIncrement?.(item.productId)}
              aria-label="Aumentar cantidad"
            >
              <Plus className="w-4 h-4 text-[var(--t-text-primary)]" />
            </button>
          </div>

          <span className="text-xl font-medium text-[var(--t-text-primary)] tracking-[0.6px] whitespace-nowrap">
            {fmt(item.price * item.quantity, currencySymbol)}
          </span>

          <button
            type="button"
            className="w-6 h-6 flex items-center justify-center bg-transparent border-none cursor-pointer p-0"
            onClick={() => onRemove?.(item.productId)}
            aria-label={`Eliminar ${item.name} del carrito`}
          >
            <X className="w-5 h-5 text-[var(--t-text-primary)]" />
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailedOrderSummary({
  subtotal,
  tax,
  shipping,
  total,
  currencySymbol,
  buttonStyle,
  onCheckout,
}: {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currencySymbol: string;
  buttonStyle?: CartPageProps["buttonStyle"];
  onCheckout?: () => void;
}) {
  const checkoutBtnClass = BUTTON_STYLE_MAP[buttonStyle ?? "filled"];

  return (
    <aside className="lg:w-[400px] xl:w-[440px] shrink-0">
      <div className="border border-[var(--t-border-light)] rounded-[10px] px-8 py-10 lg:px-16 lg:py-14 flex flex-col gap-10 lg:sticky lg:top-24">
        <h2 className="text-xl font-bold text-[var(--t-primary)]">Resumen del pedido</h2>

        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[var(--t-text-subtle)]">
                  Código de descuento / Código promo
                </label>
                <div className="border border-[var(--t-border-input)]/50 rounded-[7px] px-4 py-4">
                  <span className="text-sm text-[var(--t-text-muted)] tracking-[-0.07px]">Código</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[var(--t-text-subtle)]">
                  Número de tu tarjeta de bonos
                </label>
                <div className="flex items-center border border-[var(--t-border-input)]/50 rounded-[7px] px-4 py-4">
                  <span className="flex-1 text-sm text-[var(--t-text-muted)] tracking-[-0.07px]">
                    Ingresá el número de tarjeta
  </span>
                  <button
                    type="button"
                    className="px-2 py-2 border border-[var(--t-primary)] rounded-[6px] text-xs font-medium text-[var(--t-primary)] bg-[var(--t-section-bg)] cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-base font-medium text-[var(--t-text-primary)] tracking-[0.48px]">Subtotal</span>
                <span className="text-base font-medium text-[var(--t-text-primary)] tracking-[0.48px]">
                  {fmt(subtotal, currencySymbol)}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-base text-[var(--t-text-subtle)]">Impuestos estimados</span>
                  <span className="text-base font-medium text-[var(--t-text-primary)] tracking-[0.48px]">
                    {fmt(tax, currencySymbol)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base text-[var(--t-text-subtle)]">Envío y manejo estimado</span>
                  <span className="text-base font-medium text-[var(--t-text-primary)] tracking-[0.48px]">
                    {fmt(shipping, currencySymbol)}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base font-medium text-[var(--t-text-primary)] tracking-[0.48px]">Total</span>
                <span className="text-base font-medium text-[var(--t-text-primary)] tracking-[0.48px]">
                  {fmt(total, currencySymbol)}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className={`w-full py-4 text-base font-medium rounded-[var(--t-radius-button)] border cursor-pointer hover:opacity-90 transition-opacity ${checkoutBtnClass}`}
            onClick={onCheckout}
          >
            Finalizar compra
          </button>
        </div>
      </div>
    </aside>
  );
}

export function DetailedCart({
  items,
  subtotal,
  tax = 50,
  shipping = 29,
  currencySymbol = "$",
  buttonStyle,
  onIncrement,
  onDecrement,
  onRemove,
  onCheckout,
}: CartPageProps) {
  const total = subtotal + (tax ?? 50) + (shipping ?? 29);
  const isEmpty = items.length === 0;

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-20">
        <p className="text-xl font-semibold text-[var(--t-text-primary)]">Tu carrito está vacío</p>
        <p className="text-base text-[var(--t-text-secondary)]">Explorá los productos y agregá artículos a tu carrito</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      <div className="flex flex-col gap-10 flex-1 min-w-0">
        <h1 className="text-2xl font-semibold text-[var(--t-text-primary)]">Carrito de compras</h1>

        <div className="flex flex-col gap-10">
          {items.map((item, idx) => (
            <DetailedCartItemRow
              key={item.productId}
              item={item}
              currencySymbol={currencySymbol}
              isLast={idx === items.length - 1}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              onRemove={onRemove}
            />
          ))}
        </div>
      </div>

      <DetailedOrderSummary
        subtotal={subtotal}
        tax={tax ?? 50}
        shipping={shipping ?? 29}
        total={total}
        currencySymbol={currencySymbol}
        buttonStyle={buttonStyle}
        onCheckout={onCheckout}
      />
    </div>
  );
}
