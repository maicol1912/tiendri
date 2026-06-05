// Beauty Soft Template — Order Summary
// Discount code input, total row, and checkout button.
// ZERO hardcoded colors — all via var(--t-*).

interface OrderSummaryProps {
  totalPrice: number;
  currencySymbol?: string;
  onCheckout?: () => void;
  onContinueShopping?: () => void;
}

export function OrderSummary({
  totalPrice,
  currencySymbol = "$",
  onCheckout,
  onContinueShopping,
}: OrderSummaryProps) {
  const formattedTotal = `${currencySymbol}${new Intl.NumberFormat("en-US").format(totalPrice)}`;

  return (
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

        {/* Seguir comprando — text link */}
        <button
          type="button"
          className="w-full flex items-center justify-center border-0 cursor-pointer"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "14px",
            fontWeight: 500,
            color: "var(--t-text-secondary)",
            backgroundColor: "transparent",
            height: "36px",
            lineHeight: "22px",
            letterSpacing: "-0.408px",
            marginTop: "4px",
          }}
          onClick={onContinueShopping}
        >
          Seguir comprando
        </button>
      </div>
    </div>
  );
}
