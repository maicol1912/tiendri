// Fashion Template — Size Selector
// Sharp rectangular buttons, 0px border-radius.
// Active: primary bg + button-text. Inactive: card-bg + text-primary + border.
// Visual only — handlers come as props.

interface SizeSelectorProps {
  sizes: string[];
  selectedSize?: string;
  onSizeSelect?: (size: string) => void;
}

export function SizeSelector({
  sizes,
  selectedSize,
  onSizeSelect,
}: SizeSelectorProps) {
  if (!sizes.length) return null;

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Seleccionar talla">
      {sizes.map((size) => {
        const isSelected = selectedSize === size;
        return (
          <button
            key={size}
            type="button"
            aria-label={`Talla ${size}${isSelected ? " (seleccionada)" : ""}`}
            aria-pressed={isSelected}
            className="px-4 py-2 transition-colors cursor-pointer"
            onClick={() => onSizeSelect?.(size)}
            style={{
              backgroundColor: isSelected
                ? "var(--t-button-bg)"
                : "var(--t-surface)",
              color: isSelected
                ? "var(--t-button-text)"
                : "var(--t-foreground)",
              border: isSelected
                ? "1px solid var(--t-primary)"
                : "1px solid var(--t-border)",
              borderRadius: "var(--t-radius-button)",
              fontFamily: "var(--font-sans)",
              fontSize: "12px",
              fontWeight: 500,
              minWidth: "44px",
            }}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}
