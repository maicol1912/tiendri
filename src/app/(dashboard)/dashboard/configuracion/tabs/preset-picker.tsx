"use client";

// PresetPicker — Grid of 8 style preset cards for the Apariencia tab.
// Shows preset name, description, target store tags, and active indicator.

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { stylePresets } from "@/lib/presets";

export interface PresetPickerProps {
  activePresetId?: string;
  onPresetSelect: (presetId: string) => void;
}

export function PresetPicker({ activePresetId, onPresetSelect }: PresetPickerProps) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stylePresets.map((preset) => {
        const isActive = activePresetId === preset.id;

        return (
          <button
            key={preset.id}
            type="button"
            onClick={() => onPresetSelect(preset.id)}
            className={cn(
              "group relative flex flex-col rounded-xl border-2 p-3 text-left transition-all duration-200",
              isActive
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border hover:border-primary/40 hover:shadow-sm"
            )}
          >
            {/* Active indicator */}
            {isActive && (
              <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                <Check className="h-3 w-3 text-primary-foreground" />
              </div>
            )}

            {/* Preset name */}
            <p className={cn(
              "text-sm font-semibold leading-tight",
              isActive ? "text-primary" : "text-foreground"
            )}>
              {preset.name}
            </p>

            {/* Description */}
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
              {preset.description}
            </p>

            {/* Target store tags */}
            <div className="mt-2 flex flex-wrap gap-1">
              {preset.targetStores.slice(0, 2).map((store) => (
                <span
                  key={store}
                  className={cn(
                    "inline-block rounded-full px-2 py-0.5 text-[10px] font-medium",
                    isActive
                      ? "bg-primary/15 text-primary"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {store}
                </span>
              ))}
              {preset.targetStores.length > 2 && (
                <span className="inline-block rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                  +{preset.targetStores.length - 2}
                </span>
              )}
            </div>

            {/* Selected label */}
            {isActive && (
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-primary">
                Seleccionado
              </p>
            )}
          </button>
        );
      })}
    </div>
  );
}
