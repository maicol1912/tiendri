// Fashion Template — Color Swatch Selector
// Square swatches (35x36px), 0px border-radius.
// Selected: thicker border using primary color. Monochrome design.
// Visual only — handlers come as props.

import type { ColorOption } from "../types";

interface ColorSwatchProps {
  colors: ColorOption[];
  /** Currently selected color — matches ColorOption.id */
  selectedColor?: string;
  onColorSelect?: (colorId: string) => void;
}

export function ColorSwatch({
  colors,
  selectedColor,
  onColorSelect,
}: ColorSwatchProps) {
  if (!colors.length) return null;

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Seleccionar color">
      {colors.map((color) => {
        const isSelected = selectedColor === color.id;
        return (
          <button
            key={color.id}
            type="button"
            title={color.label}
            aria-label={`Color: ${color.label}${isSelected ? " (seleccionado)" : ""}`}
            aria-pressed={isSelected}
            className="transition-transform hover:scale-105 active:scale-95"
            onClick={() => onColorSelect?.(color.id)}
            style={{
              width: "35px",
              height: "36px",
              borderRadius: "var(--t-radius-button)",
              backgroundColor: color.hex,
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
