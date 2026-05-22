"use client";

import { useState, useCallback } from "react";
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
  const [inputValue, setInputValue] = useState("");

  const addTag = useCallback(() => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    if (value.includes(trimmed)) return;
    if (maxItems != null && value.length >= maxItems) return;

    onChange([...value, trimmed]);
    setInputValue("");
  }, [inputValue, value, onChange, maxItems]);

  const removeTag = useCallback(
    (index: number) => {
      onChange(value.filter((_, i) => i !== index));
    },
    [value, onChange]
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

  const isAtMax = maxItems != null && value.length >= maxItems;

  return (
    <div className="space-y-2">
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {value.map((tag, index) => (
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
        placeholder={isAtMax ? `Maximo ${maxItems} alcanzado` : placeholder}
        disabled={isAtMax}
      />
    </div>
  );
}
