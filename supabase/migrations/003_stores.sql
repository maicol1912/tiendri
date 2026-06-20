-- ── Migration: 003_stores ────────────────────────────────────────────────────
-- Phase 3: stores + store_appearance (1:1) + store_infrastructure (1:1)
--          + helper functions (is_store_owner, is_store_public, slugify)
--          + set_updated_at() trigger function
--
-- Key design decisions (v10):
-- - stores = business identity (name, slug, plan, template, social_media, business_info)
-- - store_appearance = all merchant visual customizations (1:1 with stores)
-- - store_infrastructure = technical/platform config: custom domain, DNS (1:1 with stores)
-- - stores.customization JSONB was REMOVED in v8 → replaced by store_appearance
-- - stores.custom_domain + stores.domain_verified REMOVED in v10 → moved to store_infrastructure
-- - Multi-store: owner_id is NOT unique — a user can own multiple stores
--
-- Depends on: 001_enums, 002_reference_tables (templates, plans, currencies)
-- ─────────────────────────────────────────────────────────────────────────────

-- moddatetime extension is NOT used here — we use a custom set_updated_at() function instead.
-- This avoids the need for the moddatetime extension and works identically.

-- ── Helper functions (no table dependency) ───────────────────────────────────

-- set_updated_at: reusable trigger function for all tables with updated_at
-- Applied to: stores, store_appearance, store_infrastructure, categories,
--             subcategories, products, offers (and store_pages in later migrations)
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- slugify: utility to generate URL-safe slugs from text
-- IMMUTABLE: safe to use in generated columns and expressions
CREATE OR REPLACE FUNCTION public.slugify(input_text text)
RETURNS text AS $$
BEGIN
  RETURN lower(
    regexp_replace(
      regexp_replace(
        trim(input_text),
        '[^a-zA-Z0-9\s-]', '', 'g'
      ),
      '[\s-]+', '-', 'g'
    )
  );
END;
$$ LANGUAGE plpgsql IMMUTABLE;


-- ── stores ────────────────────────────────────────────────────────────────────
-- The central entity. A user can own multiple stores; each store has its own plan.
-- social_media JSONB column stores all platform links (replaces stores.whatsapp, removed in v6).
-- business_info JSONB stores city, address, hours, shippingInfo (replaces customization.business, removed in v8).

CREATE TABLE IF NOT EXISTS public.stores (
  id                    uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id              uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name                  text        NOT NULL CHECK (char_length(trim(name)) >= 2),
  slug                  text        UNIQUE NOT NULL CHECK (slug ~ '^[a-z0-9][a-z0-9-]*[a-z0-9]$'),
  description           text        CHECK (char_length(description) <= 120),

  -- Social media links: array of {platform: social_media_platform, value: text}
  -- Example: [{"platform": "whatsapp", "value": "573001234567"}, {"platform": "instagram", "value": "@mitienda"}]
  -- Platform values validated at app layer via Zod (social_media_platform enum).
  -- Replaces stores.whatsapp TEXT (removed in v6).
  social_media          jsonb       NOT NULL DEFAULT '[]',

  -- ── FK references ─────────────────────────────────────────────────────────
  -- NOTE: app layer resolves UUIDs for 'tech-premium', 'free', 'COP' from seeded data.
  template_id           uuid        NOT NULL
                                    REFERENCES public.templates(id) ON DELETE RESTRICT,
  plan_id               uuid        NOT NULL
                                    REFERENCES public.plans(id) ON DELETE RESTRICT,
  currency_id           uuid        NOT NULL
                                    REFERENCES public.currencies(id) ON DELETE RESTRICT,
  catalog_mode          public.catalog_mode NOT NULL DEFAULT 'simple',

  -- Palette reference (by ID within the template's JSONB palettes array).
  -- When NULL, the template's first palette is used as default.
  -- Validated at app layer: palette_id must match an entry in templates.palettes[].id.
  -- NOTE: palette_id also exists on store_appearance; this column on stores is the canonical source.
  palette_id            text,

  -- Payment methods accepted by this store (enum array).
  -- Replaces the junction table store_payment_methods from v2.
  payment_methods       public.payment_method[] NOT NULL DEFAULT '{}',

  -- ── Store state ───────────────────────────────────────────────────────────
  onboarding_completed  boolean     NOT NULL DEFAULT false,

  -- Business info (JSONB — merchant contact / logistics).
  -- Replaces customization.business (removed in v8).
  -- Structure: { city?, address?, hours?, shippingInfo?: { cost?, estimatedTime?, freeAbove? } }
  business_info         jsonb       NOT NULL DEFAULT '{}',

  -- NOTE: stores.customization JSONB was REMOVED in v8.
  -- All visual customizations are now in the store_appearance table (1:1 with stores).
  -- Queries that previously read s.customization now JOIN store_appearance:
  --   SELECT s.*, sa.* FROM stores s JOIN store_appearance sa ON sa.store_id = s.id WHERE s.slug = $1

  -- NOTE: custom_domain + domain_verified were on stores in v9.
  -- They were MOVED to store_infrastructure table in v10.
  -- See store_infrastructure table below for the current location.

  created_at            timestamptz NOT NULL DEFAULT now(),
  updated_at            timestamptz NOT NULL DEFAULT now()
);

-- ── Indexes ──────────────────────────────────────────────────────────────────

-- Non-unique: a user can own multiple stores (multi-store, v5)
CREATE INDEX idx_stores_owner_id  ON public.stores (owner_id);
CREATE INDEX idx_stores_slug      ON public.stores (slug);
CREATE INDEX idx_stores_template  ON public.stores (template_id);
CREATE INDEX idx_stores_plan      ON public.stores (plan_id);
CREATE INDEX idx_stores_currency  ON public.stores (currency_id);
-- NOTE: idx_stores_custom_domain was here in v9 — REMOVED in v10.
-- Custom domain index now lives on store_infrastructure (idx_store_infrastructure_domain).

-- ── updated_at trigger ────────────────────────────────────────────────────────
CREATE TRIGGER stores_set_updated_at
  BEFORE UPDATE ON public.stores
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- ── store_appearance ──────────────────────────────────────────────────────────
-- Replaces stores.customization JSONB (removed in v8).
-- 1:1 with stores. Created during onboarding (or lazily on first dashboard save).
-- All merchant visual customizations split into:
--   - typed columns: palette_id, font_pair (queryable)
--   - JSONB by domain: theme, layout, variants, sections, content, branding (scalable)

CREATE TABLE public.store_appearance (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id    uuid        NOT NULL UNIQUE REFERENCES public.stores(id) ON DELETE CASCADE,

  -- Typed columns (queryable, rarely change)
  palette_id  text,
  font_pair   text        DEFAULT 'minimalista',

  -- JSONB by domain (scalable, backwards-compatible)

  -- theme: colors, radius, typography, colorStrategy, backgroundTreatment, etc.
  -- { colors: { primary?, secondary?, background?, foreground?, card?, border?, muted?, accent?, onPrimary? },
  --   radius: { card?, category?, button? },
  --   typography: { headingWeight?, headingScale?, headingSpacing?, headingTransform? },
  --   bodyFontSize?, bodyFontWeight?, fontSizeContrast?,
  --   colorStrategy?, backgroundTreatment?, cardBackground?, imageOverlayHover?, accentDistribution? }
  theme       jsonb       NOT NULL DEFAULT '{}',

  -- layout: grid config, card image ratio, density
  -- { grid: { products: {mobile,desktop}, categories: {mobile,desktop}, listing: {mobile,desktop}, search: {mobile,desktop} },
  --   cardImageRatio?, gridDensity?, spacingDensity?, density? }
  layout      jsonb       NOT NULL DEFAULT '{}',

  -- variants: merchant OVERRIDES of template defaults — only present if merchant changed them
  -- { cardContentLayout?, heroVariant?, categoryNavStyle?, addToCartStyle?, categoryDisplayType? }
  variants    jsonb       NOT NULL DEFAULT '{}',

  -- sections: array of { type: SectionId, position: int, visible: boolean, settings: {} }
  -- Order = render order. settings varies by section type:
  -- hero: { title, subtitle, ctaText, image, tag, textAlignment, fontFamily }
  -- categories: { gridColumnsMobile, gridColumnsDesktop, textAlignment }
  -- products: { heading, gridColumnsMobile, gridColumnsDesktop, curatedProductIds[], textAlignment }
  -- banners: { promotionalBanners: [{image, title, subtitle, ctaText, link}] }
  -- editorial: { heading, subheading, body, image }
  -- video: { posterImage, url, title }
  sections    jsonb       NOT NULL DEFAULT '[]',

  -- content: global content not tied to a specific section
  -- { navLinks: [{label, href}], footerServices: [string], footerAssistance: [string],
  --   productTabs: [{id, label}], productDetailTabs: [{id, label, content}],
  --   popularSearches: [string],
  --   featuredProductIds: [uuid], popularProductIds: [uuid], discountProductIds: [uuid] }
  content     jsonb       NOT NULL DEFAULT '{}',

  -- branding: logo, storeName, description, favicon
  branding    jsonb       NOT NULL DEFAULT '{}',

  -- version: enables optimistic concurrency control for concurrent dashboard saves
  version     int         NOT NULL DEFAULT 1,

  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX idx_store_appearance_store ON public.store_appearance(store_id);

CREATE TRIGGER set_store_appearance_updated_at BEFORE UPDATE ON public.store_appearance
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- ── store_infrastructure ──────────────────────────────────────────────────────
-- New in v10. Technical/platform config separated from stores identity + store_appearance visual.
-- 1:1 with stores. Created lazily when a merchant first configures a custom domain.
-- Extensible: future integrations (Analytics, GTM, robots.txt, redirects) go here, NOT on stores.
--
-- Separation principle:
--   stores              = business identity (name, slug, plan, template)
--   store_appearance    = visual config (theme, layout, variants, sections, content, branding)
--   store_infrastructure = technical/platform config (custom domain, DNS, future integrations)

CREATE TABLE public.store_infrastructure (
  id                  uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id            uuid        NOT NULL UNIQUE REFERENCES public.stores(id) ON DELETE CASCADE,

  -- Domain configuration
  -- NULL = store uses default tiendri.co/{slug} URL
  -- Set for Pro/Negocio stores only; enforced at application layer
  custom_domain       text        UNIQUE,
  domain_verified     boolean     NOT NULL DEFAULT false,
  -- DNS record instructions for the merchant to configure in their registrar
  -- Structure: { type: "CNAME", name: "www", value: "cname.vercel-dns.com" }
  domain_dns_records  jsonb       NOT NULL DEFAULT '{}',

  -- Future: Integrations (uncomment when needed)
  -- google_analytics_id       text,
  -- facebook_pixel_id         text,
  -- google_tag_manager_id     text,

  -- Future: Technical config (uncomment when needed)
  -- custom_head_scripts       jsonb DEFAULT '[]',
  -- robots_txt                text,
  -- redirect_rules            jsonb DEFAULT '[]',

  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

-- Unique index on store_id (1:1 enforcement, also used for JOIN performance)
CREATE UNIQUE INDEX idx_store_infrastructure_store  ON public.store_infrastructure(store_id);
-- Partial unique index: only non-NULL custom domains (NULL is not a conflict)
-- Used by Vercel middleware to resolve incoming custom domain to a store slug
CREATE UNIQUE INDEX idx_store_infrastructure_domain ON public.store_infrastructure(custom_domain)
  WHERE custom_domain IS NOT NULL;

CREATE TRIGGER set_store_infrastructure_updated_at BEFORE UPDATE ON public.store_infrastructure
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- ── RLS helper functions (AFTER stores table exists) ─────────────────────────

-- is_store_owner: RLS helper — returns true if current user owns the store
CREATE OR REPLACE FUNCTION public.is_store_owner(check_store_id uuid)
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.stores
    WHERE id = check_store_id AND owner_id = auth.uid()
  );
$$ LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public;

-- is_store_public: RLS helper — returns true if the store has completed onboarding
CREATE OR REPLACE FUNCTION public.is_store_public(check_store_id uuid)
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.stores
    WHERE id = check_store_id AND onboarding_completed = true
  );
$$ LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public;


-- ── RLS: stores ───────────────────────────────────────────────────────────────
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;

-- Public storefront: anyone can read published stores
CREATE POLICY "anon: select public stores"
  ON public.stores FOR SELECT TO anon
  USING (onboarding_completed = true);

-- Owner: full access to their own stores (multi-store supported)
CREATE POLICY "authenticated: select own stores"
  ON public.stores FOR SELECT TO authenticated
  USING (owner_id = auth.uid());

-- No max-store-per-user limit — a user can own multiple stores
CREATE POLICY "authenticated: insert own store"
  ON public.stores FOR INSERT TO authenticated
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "authenticated: update own store"
  ON public.stores FOR UPDATE TO authenticated
  USING (owner_id = auth.uid())
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "authenticated: delete own store"
  ON public.stores FOR DELETE TO authenticated
  USING (owner_id = auth.uid());


-- ── RLS: store_appearance ─────────────────────────────────────────────────────
ALTER TABLE public.store_appearance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon: read public store appearance" ON public.store_appearance FOR SELECT TO anon
  USING (EXISTS (SELECT 1 FROM public.stores WHERE id = store_id AND onboarding_completed = true));

CREATE POLICY "auth: read own store appearance" ON public.store_appearance FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.stores WHERE id = store_id AND owner_id = auth.uid()));

CREATE POLICY "auth: insert own store appearance" ON public.store_appearance FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.stores WHERE id = store_id AND owner_id = auth.uid()));

CREATE POLICY "auth: update own store appearance" ON public.store_appearance FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.stores WHERE id = store_id AND owner_id = auth.uid()));

CREATE POLICY "auth: delete own store appearance" ON public.store_appearance FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.stores WHERE id = store_id AND owner_id = auth.uid()));


-- ── RLS: store_infrastructure ─────────────────────────────────────────────────
ALTER TABLE public.store_infrastructure ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon: read public store infra" ON public.store_infrastructure FOR SELECT TO anon
  USING (EXISTS (SELECT 1 FROM public.stores WHERE id = store_id AND onboarding_completed = true));

CREATE POLICY "auth: read own store infra" ON public.store_infrastructure FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.stores WHERE id = store_id AND owner_id = auth.uid()));

CREATE POLICY "auth: insert own store infra" ON public.store_infrastructure FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.stores WHERE id = store_id AND owner_id = auth.uid()));

CREATE POLICY "auth: update own store infra" ON public.store_infrastructure FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.stores WHERE id = store_id AND owner_id = auth.uid()));

CREATE POLICY "auth: delete own store infra" ON public.store_infrastructure FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.stores WHERE id = store_id AND owner_id = auth.uid()));
