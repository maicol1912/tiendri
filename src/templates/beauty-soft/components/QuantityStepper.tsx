// Beauty Soft Template — Quantity Stepper
// The +/- quantity control used in ProductDetailPage bottom bar.
// ZERO hardcoded colors — all via var(--t-*).

interface QuantityStepperProps {
  quantity: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

export function QuantityStepper({
  quantity,
  onIncrement,
  onDecrement,
}: QuantityStepperProps) {
  return (
    <div
      className="inline-flex items-center gap-[14px]"
      style={{
        backgroundColor: "var(--t-card-bg)",
        borderRadius: "35px",
        padding: "3px 4px",
        height: "47px",
      }}
    >
      <button
        type="button"
        aria-label="Disminuir cantidad"
        className="flex items-center justify-center cursor-pointer"
        style={{
          width: "41px",
          height: "41px",
          borderRadius: "28px",
          backgroundColor: "var(--t-section-bg)",
          border: "1px solid var(--t-border)",
        }}
        onClick={onDecrement}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <line x1="5" y1="12" x2="19" y2="12" stroke="var(--t-text-primary)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <span
        className="text-base font-semibold text-[var(--t-text-primary)] min-w-[20px] text-center leading-[22px] tracking-[-0.408px]"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {String(quantity).padStart(2, "0")}
      </span>

      <button
        type="button"
        aria-label="Aumentar cantidad"
        className="flex items-center justify-center cursor-pointer border-0"
        style={{
          width: "41px",
          height: "41px",
          borderRadius: "28px",
          backgroundColor: "var(--t-text-primary)",
        }}
        onClick={onIncrement}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <line x1="12" y1="5" x2="12" y2="19" stroke="var(--t-section-bg)" strokeWidth="2" strokeLinecap="round" />
          <line x1="5" y1="12" x2="19" y2="12" stroke="var(--t-section-bg)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
