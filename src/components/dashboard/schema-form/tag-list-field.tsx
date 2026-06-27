"use client";

import { useState, useCallback, useMemo } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface TagListFieldProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxItems?: number;
}

export function TagListField({
  value,
  onChange,
  placeholder = "Escribe y presiona Enter",
  maxItems,
}: TagListFieldProps) {
  const safeValue = useMemo(() => {
    if (!value) return [];
    if (!Array.isArray(value)) return [];
    return value
      .map((item: unknown) => {
        if (typeof item === "string") return item;
        if (item && typeof item === "object" && "label" in item) return (item as { label: string }).label;
        return null;
      })
      .filter((item): item is string => item !== null);
  }, [value]);

  const [inputValue, setInputValue] = useState("");

  const addTag = useCallback(() => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    if (safeValue.includes(trimmed)) return;
    if (maxItems != null && safeValue.length >= maxItems) return;

    onChange([...safeValue, trimmed]);
    setInputValue("");
  }, [inputValue, safeValue, onChange, maxItems]);

  const removeTag = useCallback(
    (index: number) => {
      onChange(safeValue.filter((_, i) => i !== index));
    },
    [safeValue, onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addTag();
      }
    },
    [addTag]
  );

  const isAtMax = maxItems != null && safeValue.length >= maxItems;

  return (
    <div className="space-y-2">
      {safeValue.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {safeValue.map((tag, index) => (
            <Badge key={`${tag}-${index}`} variant="secondary" className="gap-1 pr-1">
              {tag}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="ml-0.5 flex size-4 items-center justify-center rounded-full hover:bg-destructive/20 transition-colors"
                aria-label={`Eliminar "${tag}"`}
              >
                <X className="size-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={isAtMax ? `Máximo ${maxItems} alcanzado` : placeholder}
        disabled={isAtMax}
      />
    </div>
  );
}
