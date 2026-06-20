-- ══════════════════════════════════════════════════════════════════
-- Migration 011: Enhance product_variants with type + metadata
-- ══════════════════════════════════════════════════════════════════
--
-- Adds two columns to product_variants:
--   type     TEXT NOT NULL DEFAULT 'option'
--             Valid values: 'color' | 'size' | 'storage' | 'option'
--   metadata JSONB DEFAULT '{}'
--             Type-specific payload:
--               color   → {"hex": "#RRGGBB", "label": "Nombre"}
--               size    → {"label": "XL", "order": 5}
--               storage → {"label": "128GB", "order": 2}
--               option  → {} (generic, no enforced shape)
--
-- Also adds a composite index on (product_id, type) for efficient
-- variant-type lookups per product.
-- ──────────────────────────────────────────────────────────────────

ALTER TABLE public.product_variants
  ADD COLUMN type     TEXT    NOT NULL DEFAULT 'option',
  ADD COLUMN metadata JSONB            DEFAULT '{}';

CREATE INDEX idx_product_variants_type
  ON public.product_variants (product_id, type);
