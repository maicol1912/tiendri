-- ── Migration: 008_media_pages ───────────────────────────────────────────────
-- Phase 8: Media library (media_assets) + custom merchant pages (store_pages)
--
-- media_assets: uploaded files in the store's media library. Each asset has a
--   context enum (product/banner/logo/category/general), dimensions, and tags.
--   Plan-enforced limit: enforce_max_media_assets() trigger (defined separately).
--
-- store_pages: slug-based static pages per store (about, contact, policies, etc.)
--   Content is stored as typed JSONB blocks. Published flag controls visibility.
--   Plan limits: Free = max 3 pages, Pro/Negocio = unlimited (enforced at app layer).
--
-- Depends on: 001_enums (media_context), 003_stores (stores, set_updated_at)
-- Helper functions is_store_owner() / is_store_public() defined in rls_helpers migration.
-- ─────────────────────────────────────────────────────────────────────────────

-- ── 4.12 media_assets ────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.media_assets (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id   UUID        NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  filename   TEXT        NOT NULL,
  alt        TEXT        NOT NULL DEFAULT '',
  url        TEXT        NOT NULL,   -- CDN URL from Supabase Storage
  mimetype   TEXT        NOT NULL,
  size       INT         NOT NULL CHECK (size >= 0),    -- file size in bytes
  width      INT         NOT NULL CHECK (width > 0),    -- image width in pixels
  height     INT         NOT NULL CHECK (height > 0),   -- image height in pixels
  -- context enum: 'product' | 'banner' | 'logo' | 'category' | 'general'
  -- Controls which upload bucket the asset came from and how it's filtered in the media library.
  context    public.media_context NOT NULL DEFAULT 'general',
  -- Free-form tags for media library search / organization.
  -- E.g. ARRAY['hero', 'summer-2025', 'promocion']
  tags       TEXT[]      NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  -- NOTE: No updated_at — media assets are immutable once uploaded.
  -- To replace an asset, delete the old one and upload a new one.
);

-- ── Indexes ──────────────────────────────────────────────────────────────────

-- RLS performance: store ownership lookup
CREATE INDEX idx_media_assets_store         ON public.media_assets (store_id);
-- Media library: filter by context (product images, banners, logos, etc.)
CREATE INDEX idx_media_assets_store_context ON public.media_assets (store_id, context);
-- Media library: recent assets sorted by upload date
CREATE INDEX idx_media_assets_store_created ON public.media_assets (store_id, created_at DESC);
-- Media library: tag-based search — WHERE tags @> ARRAY['hero']
CREATE INDEX idx_media_assets_tags          ON public.media_assets USING GIN (tags);

-- ── Plan-aware limit trigger ──────────────────────────────────────────────────
-- Enforces plans.media_limit per store. Defined here alongside the table.

CREATE OR REPLACE FUNCTION public.enforce_max_media_assets()
RETURNS TRIGGER AS $$
DECLARE
  max_media     int;
  current_count int;
BEGIN
  SELECT p.media_limit INTO max_media
  FROM public.stores s
  JOIN public.plans p ON p.id = s.plan_id
  WHERE s.id = NEW.store_id;

  SELECT COUNT(*) INTO current_count
  FROM public.media_assets
  WHERE store_id = NEW.store_id;

  IF current_count >= max_media THEN
    RAISE EXCEPTION 'MEDIA_ASSET_LIMIT: Maximum % media assets reached for this plan', max_media
      USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_max_media_assets
  BEFORE INSERT ON public.media_assets
  FOR EACH ROW EXECUTE FUNCTION public.enforce_max_media_assets();

-- ── RLS ──────────────────────────────────────────────────────────────────────

ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;

-- Media assets are NOT publicly readable by default — only the store owner
-- accesses the media library via the dashboard. Public images are served via
-- Supabase Storage CDN URLs directly (no RLS needed at the DB row level for reads).
CREATE POLICY "authenticated: select own media"
  ON public.media_assets FOR SELECT TO authenticated
  USING (public.is_store_owner(store_id));

CREATE POLICY "authenticated: insert own media"
  ON public.media_assets FOR INSERT TO authenticated
  WITH CHECK (public.is_store_owner(store_id));

CREATE POLICY "authenticated: update own media"
  ON public.media_assets FOR UPDATE TO authenticated
  USING (public.is_store_owner(store_id))
  WITH CHECK (public.is_store_owner(store_id));

CREATE POLICY "authenticated: delete own media"
  ON public.media_assets FOR DELETE TO authenticated
  USING (public.is_store_owner(store_id));


-- ── 4.13 store_pages ─────────────────────────────────────────────────────────
-- Custom merchant pages: about, contact, policies, FAQs, etc.
-- Routing: served at /{store-slug}/{page-slug} or /{custom-domain}/{page-slug}.
-- Plan limits (enforced at app layer, NOT via trigger):
--   Free:           max 3 pages
--   Pro / Negocio:  unlimited

CREATE TABLE public.store_pages (
  id         UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id   UUID    NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,

  -- URL-safe slug for the page. Must be unique within the store.
  -- Regex: must start and end with a lowercase alphanumeric char; hyphens allowed in between.
  -- Examples: 'about', 'contacto', 'politica-de-envios'
  slug       TEXT    NOT NULL CHECK (slug ~ '^[a-z0-9][a-z0-9-]*[a-z0-9]$'),

  -- Page display title (shown in <h1> and browser tab)
  title      TEXT    NOT NULL CHECK (char_length(trim(title)) BETWEEN 2 AND 100),

  -- JSONB array of typed content blocks.
  -- Each block: { type: string, data: object }
  -- Current block types:
  --   { "type": "markdown", "data": { "text": "# Hello\n\nBody text..." } }
  -- Future block types (roadmap): "image", "gallery", "divider", "cta"
  content    JSONB   NOT NULL DEFAULT '[]',

  -- Visibility flag. Only published pages are rendered on the storefront.
  -- Unpublished pages are accessible to the store owner in the dashboard.
  published  BOOLEAN NOT NULL DEFAULT false,

  -- Per-page SEO metadata overrides.
  -- Structure: { "title"?: string, "description"?: string, "ogImage"?: string }
  -- If absent, the storefront falls back to the store-level SEO defaults.
  seo        JSONB   NOT NULL DEFAULT '{}',

  -- Display / sort order within the dashboard page list and potential nav links.
  sort_order INT     NOT NULL DEFAULT 0,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Slug must be unique within a store (two stores CAN share the same slug)
  UNIQUE(store_id, slug)
);

-- ── Indexes ──────────────────────────────────────────────────────────────────

-- Dashboard: list all pages for the store (published + drafts)
CREATE INDEX idx_store_pages_store     ON public.store_pages(store_id);
-- Storefront: only published pages are served to anonymous visitors (partial index)
CREATE INDEX idx_store_pages_published ON public.store_pages(store_id) WHERE published = true;
-- Note: the UNIQUE(store_id, slug) constraint above implicitly creates a unique index
-- covering the store+slug lookup used by the storefront route resolver.

-- ── updated_at trigger ───────────────────────────────────────────────────────

CREATE TRIGGER set_store_pages_updated_at
  BEFORE UPDATE ON public.store_pages
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ── RLS ──────────────────────────────────────────────────────────────────────

ALTER TABLE public.store_pages ENABLE ROW LEVEL SECURITY;

-- Anon: only published pages on publicly visible stores (onboarding_completed = true)
CREATE POLICY "anon: read published pages" ON public.store_pages FOR SELECT TO anon
  USING (published = true AND public.is_store_public(store_id));

-- Authenticated: store owner reads ALL pages (including drafts) via the dashboard
CREATE POLICY "auth: read own pages" ON public.store_pages FOR SELECT TO authenticated
  USING (public.is_store_owner(store_id));

-- Authenticated: store owner creates new pages
CREATE POLICY "auth: insert own pages" ON public.store_pages FOR INSERT TO authenticated
  WITH CHECK (public.is_store_owner(store_id));

-- Authenticated: store owner edits existing pages (content, slug, published flag, SEO)
CREATE POLICY "auth: update own pages" ON public.store_pages FOR UPDATE TO authenticated
  USING (public.is_store_owner(store_id));

-- Authenticated: store owner deletes pages
CREATE POLICY "auth: delete own pages" ON public.store_pages FOR DELETE TO authenticated
  USING (public.is_store_owner(store_id));
