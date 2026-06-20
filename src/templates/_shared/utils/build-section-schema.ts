import type { ConfigSection, ConfigField } from "@/types/templates/config-schema";

// ---------------------------------------------------------------------------
// Reusable field factories
// ---------------------------------------------------------------------------

const titleField = (placeholder?: string): ConfigField => ({
  key: "title",
  type: "text",
  label: "Titulo de la seccion",
  placeholder: placeholder ?? "Titulo de la seccion",
  maxLength: 80,
});

const subtitleField = (placeholder?: string): ConfigField => ({
  key: "subtitle",
  type: "textarea",
  label: "Subtitulo de la seccion",
  placeholder: placeholder ?? "Subtitulo",
  maxLength: 160,
});

const gridColumnsMobileField = (min = 1, max = 4, step = 1): ConfigField => ({
  key: "gridColumnsMobile",
  type: "range",
  label: "Columnas en movil",
  min,
  max,
  step,
});

const gridColumnsDesktopField = (min = 2, max = 6, step = 1): ConfigField => ({
  key: "gridColumnsDesktop",
  type: "range",
  label: "Columnas en escritorio",
  min,
  max,
  step,
});

const textAlignmentField: ConfigField = {
  key: "textAlignment",
  type: "select",
  label: "Alineacion del texto",
  options: [
    { value: "left", label: "Izquierda" },
    { value: "center", label: "Centro" },
    { value: "right", label: "Derecha" },
  ],
};

// ---------------------------------------------------------------------------
// Options interface
// ---------------------------------------------------------------------------

interface GridOptions {
  mobileMin?: number;
  mobileMax?: number;
  desktopMin?: number;
  desktopMax?: number;
}

interface TitleOptions {
  placeholder?: string;
}

interface BuildSectionSchemaOptions {
  /** Override the label passed as the second argument. */
  label?: string;
  /** Add a title text field. Pass `true` for defaults or an object with a custom placeholder. */
  withTitle?: boolean | TitleOptions;
  /** Add a subtitle textarea. Pass `true` for defaults or an object with a custom placeholder. */
  withSubtitle?: boolean | TitleOptions;
  /** Add mobile + desktop grid-column range sliders. Pass `true` for defaults or an object with custom min/max. */
  withGrid?: boolean | GridOptions;
  /** Add a text-alignment select field. */
  withTextAlignment?: boolean;
  /** Extra custom fields appended after the common ones. */
  fields?: ConfigField[];
}

// ---------------------------------------------------------------------------
// Main helper
// ---------------------------------------------------------------------------

/**
 * Builds a `ConfigSection` for use in a template's `sectionSchemas` map.
 *
 * Common fields (title, subtitle, grid columns, text alignment) are opt-in
 * via the options object. Custom extra fields are appended at the end.
 *
 * @example
 * buildSectionSchema("products", "Productos", {
 *   withTitle: { placeholder: "Nuestros productos" },
 *   withGrid: { mobileMin: 1, mobileMax: 2, desktopMin: 2, desktopMax: 4 },
 * })
 */
export function buildSectionSchema(
  sectionId: string,
  label: string,
  options: BuildSectionSchemaOptions = {}
): ConfigSection {
  const fields: ConfigField[] = [];

  if (options.withTitle) {
    const ph =
      typeof options.withTitle === "object"
        ? options.withTitle.placeholder
        : undefined;
    fields.push(titleField(ph));
  }

  if (options.withSubtitle) {
    const ph =
      typeof options.withSubtitle === "object"
        ? options.withSubtitle.placeholder
        : undefined;
    fields.push(subtitleField(ph));
  }

  if (options.withGrid) {
    const g = typeof options.withGrid === "object" ? options.withGrid : {};
    fields.push(gridColumnsMobileField(g.mobileMin, g.mobileMax));
    fields.push(gridColumnsDesktopField(g.desktopMin, g.desktopMax));
  }

  if (options.withTextAlignment) {
    fields.push(textAlignmentField);
  }

  if (options.fields?.length) {
    fields.push(...options.fields);
  }

  return {
    id: sectionId,
    label: options.label ?? label,
    fields,
  };
}
