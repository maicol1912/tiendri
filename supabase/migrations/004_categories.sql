-- ── Migration: 004_categories ────────────────────────────────────────────────
-- Phase 4: categories + subcategories tables
--
-- categories: store-owned, sortable, slug unique per store, Lucide icon (app-validated)
-- subcategories: child of category, slug unique per category, optional (catalog_mode='nested' only)
--
-- Depends on:
--   - 001_enums (catalog_mode enum, used by stores)
--   - 002_reference_tables (templates, plans, currencies)
--   - 003_stores (stores table, set_updated_at() function)
--   - 006_rls_helpers (is_store_public, is_store_owner) — RLS policies below depend on these
--
-- Note: set_updated_at() trigger function is defined in migration 003_stores.
-- ─────────────────────────────────────────────────────────────────────────────

-- ── categories ───────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.categories (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id    uuid        NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  name        text        NOT NULL CHECK (char_length(trim(name)) BETWEEN 2 AND 60),
  slug        text        NOT NULL CHECK (slug ~ '^[a-z0-9][a-z0-9-]*[a-z0-9]$'),
  description text        CHECK (char_length(description) <= 120),
  image       text,       -- URL from Supabase Storage or media library
  -- Icon: Lucide icon name. Validated at app layer by Zod (z.enum(CATEGORY_ICONS)).
  -- NOT a FK — the 20 icon names are fixed strings in the frontend code.
  -- A table for 20 icon names that never change is over-normalization.
  icon        text        NOT NULL DEFAULT 'ShoppingBag'
                          CHECK (char_length(icon) BETWEEN 1 AND 30),
  sort_order  int         NOT NULL DEFAULT 0 CHECK (sort_order >= 0),
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),

  -- Slug must be unique within a store
  UNIQUE (store_id, slug)
);

-- ── Indexes ───────────────────────────────────────────────────────────────────

CREATE INDEX idx_categories_store_id   ON public.categories (store_id);
CREATE INDEX idx_categories_store_sort ON public.categories (store_id, sort_order);

-- ── updated_at trigger ────────────────────────────────────────────────────────

CREATE TRIGGER categories_set_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ── RLS ───────────────────────────────────────────────────────────────────────

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon: select categories of public stores"
  ON public.categories FOR SELECT TO anon
  USING (public.is_store_public(store_id));

CREATE POLICY "authenticated: select own categories"
  ON public.categories FOR SELECT TO authenticated
  USING (public.is_store_owner(store_id));

CREATE POLICY "authenticated: insert own categories"
  ON public.categories FOR INSERT TO authenticated
  WITH CHECK (public.is_store_owner(store_id));

CREATE POLICY "authenticated: update own categories"
  ON public.categories FOR UPDATE TO authenticated
  USING (public.is_store_owner(store_id))
  WITH CHECK (public.is_store_owner(store_id));

CREATE POLICY "authenticated: delete own categories"
  ON public.categories FOR DELETE TO authenticated
  USING (public.is_store_owner(store_id));

-- ── Plan-aware category limit trigger ────────────────────────────────────────
-- Enforces plans.category_limit (default 50 for all plans in MVP)

CREATE OR REPLACE FUNCTION public.enforce_max_categories()
RETURNS TRIGGER AS $$
DECLARE
  max_categories int;
  current_count  int;
BEGIN
  SELECT p.category_limit INTO max_categories
  FROM public.stores s
  JOIN public.plans p ON p.id = s.plan_id
  WHERE s.id = NEW.store_id;

  SELECT COUNT(*) INTO current_count
  FROM public.categories
  WHERE store_id = NEW.store_id;

  IF current_count >= max_categories THEN
    RAISE EXCEPTION 'CATEGORY_LIMIT: Maximum % categories reached for this plan', max_categories
      USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_max_categories
  BEFORE INSERT ON public.categories
  FOR EACH ROW EXECUTE FUNCTION public.enforce_max_categories();

-- ─────────────────────────────────────────────────────────────────────────────
-- ── subcategories ─────────────────────────────────────────────────────────────
-- Optional — only used when stores.catalog_mode = 'nested'.
-- For 'simple' stores subcategory_id on products is always NULL.
-- switch_catalog_mode_to_simple() (migration 016) nukes this table for a store.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.subcategories (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id    uuid        NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  category_id uuid        NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  name        text        NOT NULL CHECK (char_length(trim(name)) BETWEEN 2 AND 60),
  slug        text        NOT NULL CHECK (slug ~ '^[a-z0-9][a-z0-9-]*[a-z0-9]$'),
  description text        CHECK (char_length(description) <= 120),
  image       text,
  sort_order  int         NOT NULL DEFAULT 0 CHECK (sort_order >= 0),
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),

  -- Slug must be unique within a category
  UNIQUE (category_id, slug)
);

-- ── Indexes ───────────────────────────────────────────────────────────────────

CREATE INDEX idx_subcategories_store_id      ON public.subcategories (store_id);
CREATE INDEX idx_subcategories_category_id   ON public.subcategories (category_id);
CREATE INDEX idx_subcategories_category_sort ON public.subcategories (category_id, sort_order);

-- ── updated_at trigger ────────────────────────────────────────────────────────

CREATE TRIGGER subcategories_set_updated_at
  BEFORE UPDATE ON public.subcategories
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ── RLS ───────────────────────────────────────────────────────────────────────

ALTER TABLE public.subcategories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon: select subcategories of public stores"
  ON public.subcategories FOR SELECT TO anon
  USING (public.is_store_public(store_id));

CREATE POLICY "authenticated: select own subcategories"
  ON public.subcategories FOR SELECT TO authenticated
  USING (public.is_store_owner(store_id));

CREATE POLICY "authenticated: insert own subcategories"
  ON public.subcategories FOR INSERT TO authenticated
  WITH CHECK (public.is_store_owner(store_id));

CREATE POLICY "authenticated: update own subcategories"
  ON public.subcategories FOR UPDATE TO authenticated
  USING (public.is_store_owner(store_id))
  WITH CHECK (public.is_store_owner(store_id));

CREATE POLICY "authenticated: delete own subcategories"
  ON public.subcategories FOR DELETE TO authenticated
  USING (public.is_store_owner(store_id));

-- ── Max 20 subcategories per category trigger ─────────────────────────────────

CREATE OR REPLACE FUNCTION public.enforce_max_subcategories()
RETURNS TRIGGER AS $$
BEGIN
  IF (
    SELECT COUNT(*) FROM public.subcategories
    WHERE category_id = NEW.category_id
  ) >= 20 THEN
    RAISE EXCEPTION 'SUBCATEGORY_LIMIT: A category cannot have more than 20 subcategories'
      USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_max_subcategories
  BEFORE INSERT ON public.subcategories
  FOR EACH ROW EXECUTE FUNCTION public.enforce_max_subcategories();
