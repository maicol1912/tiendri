// Tech Premium Template — Order Summary
// Renders: promo/discount fields, subtotal, taxes, shipping, total, checkout button.
// Visual only — callbacks come as props.

import { BUTTON_STYLE_MAP } from "@/templates/_shared/style-maps";
import type { ButtonStyle } from "@/types/templates";

export interface OrderSummaryProps {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currencySymbol?: string;
  buttonStyle?: ButtonStyle;
  onCheckout?: () => void;
}

export function OrderSummary({
  subtotal,
  tax,
  shipping,
  total,
  currencySymbol = "$",
  buttonStyle = "filled",
  onCheckout,
}: OrderSummaryProps) {
  const checkoutBtnClass = BUTTON_STYLE_MAP[buttonStyle];
  const fmt = (price: number) =>
    `${currencySymbol}${new Intl.NumberFormat("en-US").format(price)}`;

  return (
    <aside className="lg:w-[400px] xl:w-[440px] shrink-0">
      <div className="border border-[var(--t-border-light)] rounded-[10px] px-8 py-10 lg:px-16 lg:py-14 flex flex-col gap-10 lg:sticky lg:top-24">
        <h2 className="text-xl font-bold text-[var(--t-primary)]">Resumen del pedido</h2>

        <div className="flex flex-col gap-12">
          {/* Promo fields */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6">
              {/* Discount code */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[var(--t-text-subtle)]">
                  Código de descuento / Código promo
                </label>
                <div className="border border-[var(--t-border-input)]/50 rounded-[7px] px-4 py-4">
                  <span className="text-sm text-[var(--t-text-muted)] tracking-[-0.07px]">Código</span>
                </div>
              </div>

              {/* Bonus card */}
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

            {/* Prices */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-base font-medium text-[var(--t-text-primary)] tracking-[0.48px]">Subtotal</span>
                <span className="text-base font-medium text-[var(--t-text-primary)] tracking-[0.48px]">
                  {fmt(subtotal)}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-base text-[var(--t-text-subtle)]">Impuestos estimados</span>
                  <span className="text-base font-medium text-[var(--t-text-primary)] tracking-[0.48px]">
                    {fmt(tax)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base text-[var(--t-text-subtle)]">Envío y manejo estimado</span>
                  <span className="text-base font-medium text-[var(--t-text-primary)] tracking-[0.48px]">
                    {fmt(shipping)}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base font-medium text-[var(--t-text-primary)] tracking-[0.48px]">Total</span>
                <span className="text-base font-medium text-[var(--t-text-primary)] tracking-[0.48px]">
                  {fmt(total)}
                </span>
              </div>
            </div>
          </div>

          {/* Checkout button */}
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
