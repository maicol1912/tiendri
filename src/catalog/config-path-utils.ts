// Config path utilities — dot-path read/write for StoreCustomization blob.
// All operations are immutable: setByPath returns a new root object.
// Array access via index notation is NOT supported — all segments are object keys.

/**
 * Read a value from a nested object using a dot-separated path.
 *
 * @example
 * getByPath({ content: { heroBanner: { title: "Hola" } } }, "content.heroBanner.title")
 * // → "Hola"
 *
 * getByPath({ content: {} }, "content.heroBanner.title")
 * // → undefined  (missing intermediate — no error thrown)
 */
export function getByPath(
  obj: Record<string, unknown>,
  path: string
): unknown {
  if (!path) return undefined;

  const segments = path.split(".");
  let current: unknown = obj;

  for (const segment of segments) {
    if (
      current === null ||
      current === undefined ||
      typeof current !== "object" ||
      Array.isArray(current)
    ) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[segment];
  }

  return current;
}

/**
 * Immutably set a value at a dot-separated path in a nested object.
 * Missing intermediate objects are created automatically.
 * The original object is NOT mutated — a new root object is returned.
 *
 * @example
 * setByPath({}, "content.heroBanner.title", "Hola")
 * // → { content: { heroBanner: { title: "Hola" } } }
 *
 * setByPath({ content: { heroBanner: { title: "Viejo" } } }, "content.heroBanner.title", "Nuevo")
 * // → { content: { heroBanner: { title: "Nuevo" } } }  (original unchanged)
 */
export function setByPath(
  obj: Record<string, unknown>,
  path: string,
  value: unknown
): Record<string, unknown> {
  if (!path) return { ...obj };

  const segments = path.split(".");

  // Recursive immutable update — returns a new object at every level.
  function setNested(
    current: Record<string, unknown>,
    remainingSegments: string[]
  ): Record<string, unknown> {
    const [head, ...tail] = remainingSegments;

    if (tail.length === 0) {
      // Base case: set the value at this level.
      return { ...current, [head]: value };
    }

    // Recurse into the next level, creating an empty object if it doesn't exist.
    const nextLevel = current[head];
    const nextObj: Record<string, unknown> =
      nextLevel !== null &&
      nextLevel !== undefined &&
      typeof nextLevel === "object" &&
      !Array.isArray(nextLevel)
        ? (nextLevel as Record<string, unknown>)
        : {};

    return {
      ...current,
      [head]: setNested(nextObj, tail),
    };
  }

  return setNested(obj, segments);
}
