// Shared action result pattern — matches tiendri-rules.md §3.1
// Used by all repository mutations for Supabase migration compatibility.

export type ActionResult<T> =
  | { success: true; data: T }
  | {
      success: false;
      error: {
        /** Error code from tiendri-rules.md §3.2 */
        code: string;
        /** Human-readable message (colombian spanish) */
        message: string;
        /** Field name when error targets a specific input */
        field?: string;
      };
    };
