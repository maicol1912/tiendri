"use client";

// Pets Classic — Order Summary
// Renders: subtotal, IVA, delivery fee, total, checkout + continue shopping buttons.
// Visual only — callbacks come as props.

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US").format(price);
}

const DELIVERY_FEE = 5000;

export interface OrderSummaryProps {
  subtotal: number;
  tax: number;
  total: number;
  currencySymbol?: string;
  onCheckout?: () => void;
  onContinueShopping?: () => void;
}

export function OrderSummary({
  subtotal,
  tax,
  total,
  currencySymbol = "$",
  onCheckout,
  onContinueShopping,
}: OrderSummaryProps) {
  return (
    <div
      className="lg:w-72 flex-shrink-0"
      style={{
        borderRadius: "var(--t-radius-card)",
        border: "1px solid var(--t-border)",
        backgroundColor: "var(--t-card-bg)",
        padding: 20,
        height: "fit-content",
      }}
    >
      <p style={{ fontSize: "15px", fontWeight: 700, color: "var(--t-text-primary)", marginBottom: 16 }}>
        Resumen del pedido
      </p>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <span style={{ fontSize: "13px", color: "var(--t-text-secondary)" }}>Subtotal</span>
          <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--t-text-primary)" }}>
            {currencySymbol}{formatPrice(subtotal)}
          </span>
        </div>
        <div className="flex justify-between">
          <span style={{ fontSize: "13px", color: "var(--t-text-secondary)" }}>IVA (2.5%)</span>
          <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--t-text-primary)" }}>
            {currencySymbol}{formatPrice(tax)}
          </span>
        </div>
        <div className="flex justify-between">
          <span style={{ fontSize: "13px", color: "var(--t-text-secondary)" }}>Domicilio</span>
          <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--t-text-primary)" }}>
            {currencySymbol}{formatPrice(DELIVERY_FEE)}
          </span>
        </div>
      </div>

      <div
        style={{ height: 1, backgroundColor: "var(--t-border)", margin: "16px 0" }}
        aria-hidden="true"
      />

      <div className="flex justify-between mb-4">
        <span style={{ fontSize: "15px", fontWeight: 700, color: "var(--t-text-primary)" }}>Total</span>
        <span style={{ fontSize: "15px", fontWeight: 800, color: "var(--t-primary)" }}>
          {currencySymbol}{formatPrice(total)}
        </span>
      </div>

      <button
        type="button"
        onClick={onCheckout}
        className="w-full py-3"
        style={{
          borderRadius: "var(--t-radius-button)",
          backgroundColor: "var(--t-button-bg)",
          color: "var(--t-button-text)",
          border: "none",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: 700,
        }}
      >
        Proceder al pago
      </button>

      <button
        type="button"
        onClick={onContinueShopping}
        className="w-full py-2 mt-2"
        style={{
          borderRadius: "var(--t-radius-button)",
          backgroundColor: "transparent",
          color: "var(--t-text-secondary)",
          border: "1px solid var(--t-border)",
          cursor: "pointer",
          fontSize: "13px",
          fontWeight: 500,
        }}
      >
        Seguir comprando
      </button>
    </div>
  );
}
