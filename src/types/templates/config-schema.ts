// Template System — TemplateConfigSchema
// Describes the configurable surface of a template for the dashboard UI.
// Plain TypeScript types — no Zod. Zod is reserved for server-side validation.

// ---------------------------------------------------------------------------
// Field vocabulary
// ---------------------------------------------------------------------------

/** All field input types the dashboard schema form supports. */
export type FieldType =
  | "text"
  | "textarea"
  | "image"
  | "url"
  | "color"
  | "select"
  | "number"
  | "range"
  | "boolean"
  | "tag-list"
  | "key-value-list"
  | "font-picker"
  | "color-palette";

// ---------------------------------------------------------------------------
// ConfigField — a single configurable field
// ---------------------------------------------------------------------------

/** One configurable field inside a section. */
export interface ConfigField {
  /** Dot-path key mapping to StoreCustomization — e.g. "content.heroBanner.title". */
  key: string;
  type: FieldType;
  /** Spanish UI label shown to the merchant. */
  label: string;
  description?: string;
  placeholder?: string;
  defaultValue?: unknown;

  // --- Validation ---
  required?: boolean;
  /** Max character count — applies to text and textarea fields. */
  maxLength?: number;
  /** Minimum numeric value — applies to number and range fields. */
  min?: number;
  /** Maximum numeric value — applies to number and range fields. */
  max?: number;
  /** Step increment — applies to range fields. */
  step?: number;
  /** Display unit suffix — applies to range fields (e.g. "px", "%"). */
  unit?: string;

  // --- Type-specific ---
  /** Options list — required for select fields. */
  options?: { label: string; value: string }[];
  /** Aspect ratio constraint for image upload (e.g. "16:9", "1:1"). */
  aspectRatio?: string;
  /** Maximum file size in bytes — applies to image fields. */
  maxFileSize?: number;

  // --- Conditional visibility ---
  /** Hide this field unless another field matches the given value. */
  dependsOn?: { field: string; value: unknown };
}

// ---------------------------------------------------------------------------
// ConfigSection — a group of fields
// ---------------------------------------------------------------------------

/** A flat group of configurable fields rendered as a card. */
export interface ConfigSection {
  id: string;
  label: string;
  description?: string;
  /** Lucide icon name (e.g. "Image", "Link2"). */
  icon?: string;
  fields: ConfigField[];
}

// ---------------------------------------------------------------------------
// RepeatableConfigSection — a section with 0–N identical item entries
// ---------------------------------------------------------------------------

/** A repeatable section where the merchant can add, remove, and reorder items. */
export interface RepeatableConfigSection
  extends Omit<ConfigSection, "fields"> {
  kind: "repeatable";
  /** Singular item label shown on the "Agregar" button — e.g. "Banner", "Enlace". */
  itemLabel: string;
  /** Minimum number of items (default: 0). */
  minItems?: number;
  /** Maximum number of items the merchant can create. */
  maxItems?: number;
  /**
   * Fields per item. Keys are relative (no dot-path prefix) since they are
   * scoped to the item's array index at runtime.
   */
  fields: ConfigField[];
}

// ---------------------------------------------------------------------------
// ConfigTabGroup — a dashboard tab containing one or more sections
// ---------------------------------------------------------------------------

/** A top-level dashboard tab grouping related configuration sections. */
export interface ConfigTabGroup {
  id: string;
  label: string;
  /** Lucide icon name for the tab (optional). */
  icon?: string;
  sections: (ConfigSection | RepeatableConfigSection)[];
}

// ---------------------------------------------------------------------------
// Theme schema sub-types
// ---------------------------------------------------------------------------

/** A single editable color token with its UI label and default hex value. */
export interface ThemeSchemaColor {
  /** Color token key matching a key in TemplateColorTokens (e.g. "primary"). */
  key: string;
  label: string;
  /** Default hex color value — e.g. "#6366F1". */
  default: string;
}

/** A single editable border-radius token with its UI label and range constraints. */
export interface ThemeSchemaRadius {
  /** Radius token key matching a key in TemplateRadiusTokens (e.g. "card"). */
  key: string;
  label: string;
  /** Default CSS value — e.g. "12px". */
  default: string;
  /** Maximum pixel value for the range slider. */
  max: number;
}

/** A typography pair (heading + body) that the merchant can select. */
export interface ThemeSchemaFontPair {
  /** Unique key — e.g. "modern", "warm", "elegant", "functional". */
  key: string;
  label: string;
  /** Body font family name. */
  body: string;
  /** Heading font family name. */
  heading: string;
  /** Preview text shown in the font picker. */
  preview?: string;
}

/** Aggregated theme schema — colors, radii, and font pairs a template exposes. */
export interface ThemeSchemaConfig {
  colors: ThemeSchemaColor[];
  radius: ThemeSchemaRadius[];
  fontPairs: ThemeSchemaFontPair[];
}

// ---------------------------------------------------------------------------
// TemplateConfigSchema — the root export each template provides
// ---------------------------------------------------------------------------

/** Complete schema a template exports from its config-schema.ts file. */
export interface TemplateConfigSchema {
  theme: ThemeSchemaConfig;
  content: {
    tabGroups: ConfigTabGroup[];
  };
}

// ---------------------------------------------------------------------------
// Type guard
// ---------------------------------------------------------------------------

/**
 * Returns true when the section is a RepeatableConfigSection.
 * Use this to branch between DynamicSection and RepeatableSection renderers.
 */
export function isRepeatableSection(
  section: ConfigSection | RepeatableConfigSection
): section is RepeatableConfigSection {
  return "kind" in section && section.kind === "repeatable";
}
