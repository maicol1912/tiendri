"use client";

import { HexColorPicker, HexColorInput } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface ColorPickerPopoverProps {
  value: string;           // hex color, e.g. "#D4A574"
  onChange: (hex: string) => void;
  label: string;           // displayed next to the swatch
  isOverridden?: boolean;  // shows "Restablecer" button when true
  onReset?: () => void;
}

export function ColorPickerPopover({ value, onChange, label, isOverridden, onReset }: ColorPickerPopoverProps) {
  return (
    <div className="flex items-center gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="w-9 h-9 rounded-md border border-input shadow-sm cursor-pointer"
            style={{ backgroundColor: value }}
            aria-label={`Elegir ${label}`}
          />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3" align="start">
          <HexColorPicker color={value} onChange={onChange} />
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-muted-foreground">HEX</span>
            <HexColorInput
              color={value}
              onChange={onChange}
              prefixed
              className="w-24 text-xs border border-input rounded px-2 py-1 font-mono"
            />
          </div>
        </PopoverContent>
      </Popover>
      <span className="text-sm flex-1">{label}</span>
      <span className="text-xs font-mono text-muted-foreground">{value}</span>
      {isOverridden && onReset && (
        <Button variant="ghost" size="sm" onClick={onReset} className="text-xs h-7">
          Restablecer
        </Button>
      )}
    </div>
  );
}
