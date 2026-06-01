// Fashion Template — Color Swatch Selector
// Square swatches (35x36px), 0px border-radius.
// Selected: thicker border using primary color. Monochrome design.
// Accepts either ProductColor[] (name+hex) or string[] (hex values).
// Visual only — handlers come as props.

import type { ProductColor } from "../types";

interface ColorSwatchProps {
  /** Either ProductColor objects {name, hex} or plain hex strings */
  colors: ProductColor[] | string[];
  /** Currently selected color — matches name (ProductColor) or hex (string) */
  selectedColor?: string;
  onColorSelect?: (colorId: string) => void;
}

export function ColorSwatch({
  colors,
  selectedColor,
  onColorSelect,
}: ColorSwatchProps) {
  if (!colors.length) return null;

  // Normalize to {id, hex} regardless of input shape
  const normalized = (colors as Array<ProductColor | string>).map((c) =>
    typeof c === "string" ? { id: c, hex: c } : { id: c.name, hex: c.hex },
  );

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Seleccionar color">
      {normalized.map(({ id, hex }) => {
        const isSelected = selectedColor === id;
        return (
          <button
            key={id}
            type="button"
            title={id}
            aria-label={`Color: ${id}${isSelected ? " (seleccionado)" : ""}`}
            aria-pressed={isSelected}
            className="transition-transform hover:scale-105 active:scale-95"
            onClick={() => onColorSelect?.(id)}
            style={{
              width: "35px",
              height: "36px",
              borderRadius: "var(--t-radius-button)",
              backgroundColor: hex,
              border: isSelected
                ? "2.5px solid var(--t-primary)"
                : "1px solid var(--t-border)",
              padding: 0,
              cursor: "pointer",
            }}
          />
        );
      })}
    </div>
  );
}
