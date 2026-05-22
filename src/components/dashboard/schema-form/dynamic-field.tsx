"use client";

import { useCallback } from "react";
import type { ConfigField } from "@/types/templates/config-schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TagListField } from "./tag-list-field";
import { ImageUploadField } from "./image-upload-field";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface DynamicFieldProps {
  field: ConfigField;
  value: unknown;
  onChange: (value: unknown) => void;
  error?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function asString(v: unknown): string {
  if (typeof v === "string") return v;
  if (v == null) return "";
  return String(v);
}

function asNumber(v: unknown): number {
  if (typeof v === "number") return v;
  const n = Number(v);
  return Number.isNaN(n) ? 0 : n;
}

function asBoolean(v: unknown): boolean {
  return v === true || v === "true";
}

function asStringArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(String);
  return [];
}

function asKeyValueList(
  v: unknown
): { key: string; value: string }[] {
  if (Array.isArray(v)) {
    return v.map((item) => {
      if (item && typeof item === "object" && "key" in item && "value" in item) {
        return {
          key: String((item as Record<string, unknown>).key ?? ""),
          value: String((item as Record<string, unknown>).value ?? ""),
        };
      }
      return { key: "", value: "" };
    });
  }
  return [];
}

// ---------------------------------------------------------------------------
// Sub-renderers
// ---------------------------------------------------------------------------

function TextFieldRenderer({
  field,
  value,
  onChange,
}: {
  field: ConfigField;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder}
      maxLength={field.maxLength}
    />
  );
}

function TextareaFieldRenderer({
  field,
  value,
  onChange,
}: {
  field: ConfigField;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        maxLength={field.maxLength}
      />
      {field.maxLength != null && (
        <p className="text-xs text-muted-foreground text-right">
          {value.length} / {field.maxLength}
        </p>
      )}
    </div>
  );
}

function UrlFieldRenderer({
  field,
  value,
  onChange,
}: {
  field: ConfigField;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Input
      type="url"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder ?? "https://"}
    />
  );
}

function ColorFieldRenderer({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="color"
        value={value || "#000000"}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 w-12 cursor-pointer rounded border border-input bg-transparent p-0.5"
      />
      <span className="text-sm font-mono text-muted-foreground uppercase">
        {value || "#000000"}
      </span>
    </div>
  );
}

function SelectFieldRenderer({
  field,
  value,
  onChange,
}: {
  field: ConfigField;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={field.placeholder ?? "Seleccionar..."} />
      </SelectTrigger>
      <SelectContent>
        {(field.options ?? []).map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function NumberFieldRenderer({
  field,
  value,
  onChange,
}: {
  field: ConfigField;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <Input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      min={field.min}
      max={field.max}
      step={field.step}
      placeholder={field.placeholder}
    />
  );
}

function RangeFieldRenderer({
  field,
  value,
  onChange,
}: {
  field: ConfigField;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={field.min ?? 0}
        max={field.max ?? 100}
        step={field.step ?? 1}
        className="flex-1 accent-primary"
      />
      <span className="min-w-[3rem] text-sm text-muted-foreground text-right tabular-nums">
        {value}
        {field.unit ? ` ${field.unit}` : ""}
      </span>
    </div>
  );
}

function BooleanFieldRenderer({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return <Switch checked={value} onCheckedChange={onChange} />;
}

function KeyValueListRenderer({
  value,
  onChange,
}: {
  value: { key: string; value: string }[];
  onChange: (v: { key: string; value: string }[]) => void;
}) {
  const updateItem = useCallback(
    (index: number, field: "key" | "value", newVal: string) => {
      onChange(
        value.map((item, i) =>
          i === index ? { ...item, [field]: newVal } : item
        )
      );
    },
    [value, onChange]
  );

  const addItem = useCallback(() => {
    onChange([...value, { key: "", value: "" }]);
  }, [value, onChange]);

  const removeItem = useCallback(
    (index: number) => {
      onChange(value.filter((_, i) => i !== index));
    },
    [value, onChange]
  );

  return (
    <div className="space-y-2">
      {value.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <Input
            value={item.key}
            onChange={(e) => updateItem(index, "key", e.target.value)}
            placeholder="Clave"
            className="flex-1"
          />
          <Input
            value={item.value}
            onChange={(e) => updateItem(index, "value", e.target.value)}
            placeholder="Valor"
            className="flex-1"
          />
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            aria-label="Eliminar par"
          >
            &times;
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="text-sm text-primary hover:underline"
      >
        + Agregar par
      </button>
    </div>
  );
}

function FontPickerRenderer({
  field,
  value,
  onChange,
}: {
  field: ConfigField;
  value: string;
  onChange: (v: string) => void;
}) {
  const options = field.options ?? [];

  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`rounded-lg border p-3 text-left transition-colors ${
            value === opt.value
              ? "border-primary bg-primary/5 ring-1 ring-primary"
              : "border-border hover:border-muted-foreground/50"
          }`}
        >
          <span className="block text-sm font-medium">{opt.label}</span>
          <span className="block text-xs text-muted-foreground mt-0.5">
            {opt.value}
          </span>
        </button>
      ))}
    </div>
  );
}

function ColorPaletteRenderer({
  field,
  value,
  onChange,
}: {
  field: ConfigField;
  value: string;
  onChange: (v: string) => void;
}) {
  const options = field.options ?? [];

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`group relative size-9 rounded-full border-2 transition-all ${
            value === opt.value
              ? "border-primary scale-110 ring-2 ring-primary/30"
              : "border-transparent hover:scale-105"
          }`}
          style={{ backgroundColor: opt.value }}
          aria-label={opt.label}
          title={opt.label}
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function DynamicField({
  field,
  value,
  onChange,
  error,
}: DynamicFieldProps) {
  const fieldId = `field-${field.key.replace(/\./g, "-")}`;

  function renderField() {
    switch (field.type) {
      case "text":
        return (
          <TextFieldRenderer
            field={field}
            value={asString(value)}
            onChange={onChange}
          />
        );

      case "textarea":
        return (
          <TextareaFieldRenderer
            field={field}
            value={asString(value)}
            onChange={onChange}
          />
        );

      case "image":
        return (
          <ImageUploadField
            value={asString(value)}
            onChange={(v) => onChange(v)}
            aspectRatio={field.aspectRatio}
            maxFileSize={field.maxFileSize}
          />
        );

      case "url":
        return (
          <UrlFieldRenderer
            field={field}
            value={asString(value)}
            onChange={onChange}
          />
        );

      case "color":
        return (
          <ColorFieldRenderer value={asString(value)} onChange={onChange} />
        );

      case "select":
        return (
          <SelectFieldRenderer
            field={field}
            value={asString(value)}
            onChange={onChange}
          />
        );

      case "number":
        return (
          <NumberFieldRenderer
            field={field}
            value={asNumber(value)}
            onChange={onChange}
          />
        );

      case "range":
        return (
          <RangeFieldRenderer
            field={field}
            value={asNumber(value)}
            onChange={onChange}
          />
        );

      case "boolean":
        return (
          <BooleanFieldRenderer
            value={asBoolean(value)}
            onChange={onChange}
          />
        );

      case "tag-list":
        return (
          <TagListField
            value={asStringArray(value)}
            onChange={onChange}
          />
        );

      case "key-value-list":
        return (
          <KeyValueListRenderer
            value={asKeyValueList(value)}
            onChange={onChange}
          />
        );

      case "font-picker":
        return (
          <FontPickerRenderer
            field={field}
            value={asString(value)}
            onChange={onChange}
          />
        );

      case "color-palette":
        return (
          <ColorPaletteRenderer
            field={field}
            value={asString(value)}
            onChange={onChange}
          />
        );

      default: {
        // Exhaustive check — if FieldType grows, tsc catches it
        const _exhaustive: never = field.type;
        return (
          <p className="text-sm text-muted-foreground">
            Tipo no soportado: {String(_exhaustive)}
          </p>
        );
      }
    }
  }

  // Boolean fields use inline label layout
  if (field.type === "boolean") {
    return (
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <Label htmlFor={fieldId} className="text-sm font-medium">
              {field.label}
              {field.required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </Label>
            {field.description && (
              <p className="text-xs text-muted-foreground">
                {field.description}
              </p>
            )}
          </div>
          {renderField()}
        </div>
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <Label htmlFor={fieldId} className="text-sm font-medium">
        {field.label}
        {field.required && (
          <span className="text-destructive ml-1">*</span>
        )}
      </Label>
      {renderField()}
      {field.description && (
        <p className="text-xs text-muted-foreground">{field.description}</p>
      )}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
