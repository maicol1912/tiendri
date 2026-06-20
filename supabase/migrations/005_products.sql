-- ── Migration: 005_products ───────────────────────────────────────────────────
-- Phase 5: products + product_images + product_variants tables
--
-- products: core catalog entity with FTS (search_vector GENERATED ALWAYS AS STORED),
--           tags GIN index, compare_at_price > price constraint, stock tracking.
-- product_images: max 4 per product, enforced by trigger.
-- product_variants: price modifiers (offset from base price, can be negative).
--
-- Also includes:
--   - search_products() function: FTS with ILIKE fallback for short queries
--   - enforce_max_products() trigger: plan-aware product limit
--
-- Depends on:
--   - 001_enums
--   - 002_reference_tables (stores, plans, currencies)
--   - 003_stores (set_updated_at() function)
--   - 004_categories (categories, subcategories)
--   - 006_rls_helpers (is_store_public, is_store_owner)
--
-- Key design notes (v9):
--   - No discount columns on products — offers managed via offers + offer_items tables
--   - compare_at_price is a display-only reference price (strikethrough UI), NOT an offer
--   - stock: NULL=unlimited, 0=out of stock, N=units available
--   - tags TEXT[]: system tags use '_' prefix (_new, _popular, _sale); custom tags free-form
--   - subtitle: short tagline used in search and product cards
--   - specs JSONB: key-value product characteristics (Material, Peso, Dimensiones, etc.)
--   - search_vector: plain tsvector updated by BEFORE INSERT OR UPDATE trigger (to_tsvector is not immutable)
-- ─────────────────────────────────────────────────────────────────────────────

-- ── products ──────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.products (
  id                uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id          uuid        NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  category_id       uuid        NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
  -- subcategory_id is optional: NULL when catalog_mode='simple', set when catalog_mode='nested'
  subcategory_id    uuid        REFERENCES public.subcategories(id) ON DELETE SET NULL,
  name              text        NOT NULL CHECK (char_length(trim(name)) BETWEEN 2 AND 120),
  slug              text        NOT NULL CHECK (slug ~ '^[a-z0-9][a-z0-9-]*[a-z0-9]$'),
  subtitle          text,       -- used in search and product cards; optional short tagline
  description       text        NOT NULL DEFAULT '' CHECK (char_length(description) <= 300),
  price             int         NOT NULL CHECK (price >= 0),
  -- compare_at_price: display-only reference price (strikethrough). NOT an offer.
  -- Must be > price when set, and must be > 0.
  compare_at_price  int         CHECK (compare_at_price IS NULL OR compare_at_price > 0),
  available         boolean     NOT NULL DEFAULT true,
  featured          boolean     NOT NULL DEFAULT false,
  is_best_seller    boolean     NOT NULL DEFAULT false,
  -- Tags: system tags use '_' prefix: _new, _popular, _sale, _featured.
  -- Custom tags are free-form strings set by the merchant (e.g. 'verano', 'oferta').
  -- available boolean can be derived from stock: NULL or > 0 = available, 0 = out of stock.
  tags              text[]      NOT NULL DEFAULT '{}',
  -- Specs: key-value product characteristics displayed in product detail.
  -- Example: {"Material": "Algodón", "Peso": "250g", "Dimensiones": "30x20x10 cm"}
  specs             jsonb       NOT NULL DEFAULT '{}',
  -- Stock: NULL = unlimited (don't track); 0 = out of stock; N = units available.
  -- NOTE: available boolean can be derived: stock IS NULL OR stock > 0 = available.
  -- Both columns may coexist; available takes precedence for display if explicitly set false.
  stock             int,
  sort_order        int         NOT NULL DEFAULT 0 CHECK (sort_order >= 0),
  -- NOTE: No discount columns (removed in v7).
  -- Offers managed via offers + offer_items tables.
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),

  -- ── Constraints ─────────────────────────────────────────────────────────────
  -- Slug unique per store
  UNIQUE (store_id, slug),

  -- compare_at_price must be strictly greater than price when set
  CONSTRAINT chk_compare_gt_price CHECK (
    compare_at_price IS NULL OR compare_at_price > price
  )
);

-- ── Full-text search column + trigger ────────────────────────────────────────
-- Weights: name=A (highest), description+subtitle=B, tags=C (supplementary)
-- to_tsvector('spanish', ...) is NOT immutable (depends on the text search
-- configuration), so GENERATED ALWAYS AS STORED cannot be used here.
-- Instead: plain tsvector column updated by a BEFORE INSERT OR UPDATE trigger.

ALTER TABLE public.products ADD COLUMN search_vector tsvector;

CREATE OR REPLACE FUNCTION public.update_products_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('spanish', coalesce(NEW.name, '')), 'A') ||
    setweight(to_tsvector('spanish', coalesce(NEW.description, '')), 'B') ||
    setweight(to_tsvector('spanish', coalesce(NEW.subtitle, '')), 'B') ||
    setweight(to_tsvector('spanish', coalesce(array_to_string(NEW.tags, ' '), '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_update_search_vector
  BEFORE INSERT OR UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_products_search_vector();

-- ── Indexes ───────────────────────────────────────────────────────────────────

-- RLS performance
CREATE INDEX idx_products_store_id    ON public.products (store_id);

-- Catalog filter: products by category / subcategory
CREATE INDEX idx_products_category    ON public.products (store_id, category_id);
CREATE INDEX idx_products_subcategory ON public.products (store_id, subcategory_id)
  WHERE subcategory_id IS NOT NULL;

-- Product listing: sort order
CREATE INDEX idx_products_store_sort  ON public.products (store_id, sort_order);

-- Catalog filter: availability, price range
CREATE INDEX idx_products_available   ON public.products (store_id, available);
CREATE INDEX idx_products_price       ON public.products (store_id, price);

-- Home sections: featured and best-seller (partial indexes — only matching rows)
CREATE INDEX idx_products_featured    ON public.products (store_id) WHERE featured = true;
CREATE INDEX idx_products_best_seller ON public.products (store_id) WHERE is_best_seller = true;

-- Product detail: lookup by slug
CREATE INDEX idx_products_slug        ON public.products (store_id, slug);

-- Catalog sort: most recent first
CREATE INDEX idx_products_created     ON public.products (store_id, created_at DESC);

-- Full-text search: GIN index on the generated tsvector column
CREATE INDEX idx_products_search      ON public.products USING GIN (search_vector);

-- Tag-based filtering: WHERE tags @> ARRAY['_new'] AND store_id = $1
CREATE INDEX idx_products_tags        ON public.products USING GIN (tags);

-- ── updated_at trigger ────────────────────────────────────────────────────────

CREATE TRIGGER products_set_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ── RLS ───────────────────────────────────────────────────────────────────────

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon: select products of public stores"
  ON public.products FOR SELECT TO anon
  USING (public.is_store_public(store_id));

CREATE POLICY "authenticated: select own products"
  ON public.products FOR SELECT TO authenticated
  USING (public.is_store_owner(store_id));

CREATE POLICY "authenticated: insert own products"
  ON public.products FOR INSERT TO authenticated
  WITH CHECK (public.is_store_owner(store_id));

CREATE POLICY "authenticated: update own products"
  ON public.products FOR UPDATE TO authenticated
  USING (public.is_store_owner(store_id))
  WITH CHECK (public.is_store_owner(store_id));

CREATE POLICY "authenticated: delete own products"
  ON public.products FOR DELETE TO authenticated
  USING (public.is_store_owner(store_id));

-- ── Plan-aware product limit trigger ─────────────────────────────────────────
-- NULL product_limit = unlimited (Pro / Negocio plans)

CREATE OR REPLACE FUNCTION public.enforce_max_products()
RETURNS TRIGGER AS $$
DECLARE
  max_products  int;
  current_count int;
BEGIN
  SELECT p.product_limit INTO max_products
  FROM public.stores s
  JOIN public.plans p ON p.id = s.plan_id
  WHERE s.id = NEW.store_id;

  -- NULL product_limit = unlimited
  IF max_products IS NULL THEN
    RETURN NEW;
  END IF;

  SELECT COUNT(*) INTO current_count
  FROM public.products
  WHERE store_id = NEW.store_id;

  IF current_count >= max_products THEN
    RAISE EXCEPTION 'PRODUCT_LIMIT: Maximum % products reached for this plan', max_products
      USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_max_products
  BEFORE INSERT ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.enforce_max_products();

-- ─────────────────────────────────────────────────────────────────────────────
-- ── product_images ────────────────────────────────────────────────────────────
-- Max 4 images per product, enforced by a BEFORE INSERT trigger.
-- store_id is denormalized here to simplify RLS without a JOIN to products.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.product_images (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id  uuid        NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  store_id    uuid        NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  url         text        NOT NULL,  -- CDN URL from Supabase Storage
  sort_order  int         NOT NULL DEFAULT 0 CHECK (sort_order >= 0),
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- ── Indexes ───────────────────────────────────────────────────────────────────

CREATE INDEX idx_product_images_product ON public.product_images (product_id, sort_order);
CREATE INDEX idx_product_images_store   ON public.product_images (store_id);

-- ── Max 4 images per product trigger ─────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.enforce_max_product_images()
RETURNS TRIGGER AS $$
BEGIN
  IF (
    SELECT COUNT(*) FROM public.product_images
    WHERE product_id = NEW.product_id
  ) >= 4 THEN
    RAISE EXCEPTION 'PRODUCT_IMAGE_LIMIT: A product cannot have more than 4 images'
      USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_max_product_images
  BEFORE INSERT ON public.product_images
  FOR EACH ROW EXECUTE FUNCTION public.enforce_max_product_images();

-- ── RLS ───────────────────────────────────────────────────────────────────────

ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon: select product images of public stores"
  ON public.product_images FOR SELECT TO anon
  USING (public.is_store_public(store_id));

CREATE POLICY "authenticated: select own product images"
  ON public.product_images FOR SELECT TO authenticated
  USING (public.is_store_owner(store_id));

CREATE POLICY "authenticated: insert own product images"
  ON public.product_images FOR INSERT TO authenticated
  WITH CHECK (public.is_store_owner(store_id));

CREATE POLICY "authenticated: delete own product images"
  ON public.product_images FOR DELETE TO authenticated
  USING (public.is_store_owner(store_id));

-- ─────────────────────────────────────────────────────────────────────────────
-- ── product_variants ──────────────────────────────────────────────────────────
-- Price modifiers: offset from base product.price (can be negative for discounts).
-- Example: base price = 100000 COP, variant "XL" has price_modifier = 10000
-- → effective price = 110000 COP
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.product_variants (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id      uuid        NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  name            text        NOT NULL CHECK (char_length(trim(name)) BETWEEN 1 AND 60),
  -- Offset from base price; can be negative (e.g. discount on a smaller size)
  price_modifier  int         NOT NULL DEFAULT 0,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- ── Indexes ───────────────────────────────────────────────────────────────────

CREATE INDEX idx_product_variants_product ON public.product_variants (product_id);

-- ── RLS ───────────────────────────────────────────────────────────────────────

ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;

-- Ownership resolved through product -> store_id
CREATE POLICY "anon: select variants of public stores"
  ON public.product_variants FOR SELECT TO anon
  USING (
    EXISTS (
      SELECT 1 FROM public.products p
      WHERE p.id = product_variants.product_id
      AND public.is_store_public(p.store_id)
    )
  );

CREATE POLICY "authenticated: select own variants"
  ON public.product_variants FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.products p
      WHERE p.id = product_variants.product_id
      AND public.is_store_owner(p.store_id)
    )
  );

CREATE POLICY "authenticated: insert own variants"
  ON public.product_variants FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.products p
      WHERE p.id = product_variants.product_id
      AND public.is_store_owner(p.store_id)
    )
  );

CREATE POLICY "authenticated: update own variants"
  ON public.product_variants FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.products p
      WHERE p.id = product_variants.product_id
      AND public.is_store_owner(p.store_id)
    )
  );

CREATE POLICY "authenticated: delete own variants"
  ON public.product_variants FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.products p
      WHERE p.id = product_variants.product_id
      AND public.is_store_owner(p.store_id)
    )
  );

-- ─────────────────────────────────────────────────────────────────────────────
-- ── Full-text search function ────────────────────────────────────────────────
-- search_products(): FTS for queries >= 3 chars, ILIKE fallback for short queries.
-- Uses the generated search_vector column (GIN indexed).
-- Short queries (<3 chars): ILIKE on name and description, ordered by prefix match.
-- Long queries (>=3 chars): plainto_tsquery('spanish') ranked by ts_rank.
-- SECURITY DEFINER: runs as owner to bypass RLS on products for the search path.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.search_products(
  target_store_id uuid,
  search_query    text,
  result_limit    int DEFAULT 50
)
RETURNS SETOF public.products AS $$
BEGIN
  IF char_length(trim(search_query)) < 3 THEN
    RETURN QUERY
      SELECT * FROM public.products
      WHERE store_id = target_store_id
        AND (
          name        ILIKE '%' || search_query || '%'
          OR description ILIKE '%' || search_query || '%'
        )
      ORDER BY
        CASE WHEN name ILIKE search_query || '%' THEN 0 ELSE 1 END,
        sort_order
      LIMIT result_limit;
  ELSE
    RETURN QUERY
      SELECT p.* FROM public.products p
      WHERE p.store_id = target_store_id
        AND p.search_vector @@ plainto_tsquery('spanish', search_query)
      ORDER BY ts_rank(p.search_vector, plainto_tsquery('spanish', search_query)) DESC
      LIMIT result_limit;
  END IF;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;
