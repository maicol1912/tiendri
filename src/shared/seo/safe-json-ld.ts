/**
 * Serializes a JSON-LD object to a string safe for injection into <script> tags.
 *
 * JSON.stringify does NOT escape `</script>` sequences — a user-controlled string
 * like `</script><script>alert(1)</script>` would break out of the script tag and
 * execute arbitrary code (stored XSS).
 *
 * Replacing `<` with its Unicode escape `<` prevents the browser parser from
 * seeing a closing `</script>` tag, while remaining valid JSON.
 */
export function safeJsonLdStringify(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
