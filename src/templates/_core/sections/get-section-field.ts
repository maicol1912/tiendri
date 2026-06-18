/**
 * Dual-read fallback helper for section renderers.
 *
 * Priority: sectionConfig[field] → globalValue → defaultValue
 */
export function getSectionField<T>(
  field: string,
  sectionConfig: Record<string, unknown> | undefined,
  globalValue: T | undefined,
  defaultValue: T
): T {
  const sectionValue = sectionConfig?.[field];
  if (sectionValue !== undefined && sectionValue !== null) {
    return sectionValue as T;
  }
  if (globalValue !== undefined && globalValue !== null) {
    return globalValue;
  }
  return defaultValue;
}
