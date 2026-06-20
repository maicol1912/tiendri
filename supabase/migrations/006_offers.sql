-- ── Migration: 006_offers ────────────────────────────────────────────────────
-- Phase 6: Unified offer system + offer_items junction table
-- Replaces: combos, combo_items tables (v7) and roadmap coupons table.
-- Each offer type stores its specific configuration in the `rules` JSONB column.
-- Depends on: 001_enums (offer_type), 003_stores (stores), 004_categories (categories),
--             prior product migrations (products)
-- set_updated_at() function defined in 003_stores migration.
-- ─────────────────────────────────────────────────────────────────────────────

-- ── 4.9 offers ───────────────────────────────────────────────────────────────

CREATE TABLE public.offers (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id    UUID        NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  code        TEXT        NOT NULL,
  name        TEXT        NOT NULL,
  description TEXT,
  type        public.offer_type NOT NULL,
  active      BOOLEAN     NOT NULL DEFAULT true,
  start_date  TIMESTAMPTZ,
  end_date    TIMESTAMPTZ,
  priority    INT         NOT NULL DEFAULT 0,
  rules       JSONB       NOT NULL DEFAULT '{}',
  -- rules JSONB structure per offer_type:
  -- percentage:    {"value": 20}
  -- fixed_amount:  {"value": 10000}
  -- bogo:          {"buy": 2, "pay": 1}
  -- free_shipping: {"min_purchase": 50000}
  -- combo:         {"combo_price": 89000, "combo_image": "url"}
  -- coupon:        {"code": "VERANO25", "value": 15, "discount_type": "percentage", "max_uses": 100, "uses": 0}
  -- flash_sale:    {"value": 30, "discount_type": "percentage"}
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(store_id, code)
);

-- ── Indexes ──────────────────────────────────────────────────────────────────

CREATE INDEX idx_offers_store_id ON public.offers(store_id);
CREATE INDEX idx_offers_type    ON public.offers(type);
-- Partial index: only active offers (most common query path)
CREATE INDEX idx_offers_active  ON public.offers(store_id, active) WHERE active = true;
-- Partial index: date-bounded active offers (for storefront rendering)
CREATE INDEX idx_offers_dates   ON public.offers(start_date, end_date) WHERE active = true;

-- ── updated_at trigger ───────────────────────────────────────────────────────

CREATE TRIGGER set_offers_updated_at
  BEFORE UPDATE ON public.offers
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ── RLS ──────────────────────────────────────────────────────────────────────

ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;

-- Anon: public read for published (onboarding_completed) stores
CREATE POLICY "anon: read offers" ON public.offers FOR SELECT TO anon
  USING (EXISTS (
    SELECT 1 FROM public.stores
    WHERE id = store_id AND onboarding_completed = true
  ));

-- Authenticated: owner reads their own store's offers
CREATE POLICY "auth: read own offers" ON public.offers FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.stores
    WHERE id = store_id AND owner_id = auth.uid()
  ));

-- Authenticated: owner inserts offers into their own store
CREATE POLICY "auth: insert own offers" ON public.offers FOR INSERT TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.stores
    WHERE id = store_id AND owner_id = auth.uid()
  ));

-- Authenticated: owner updates their own store's offers
CREATE POLICY "auth: update own offers" ON public.offers FOR UPDATE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.stores
    WHERE id = store_id AND owner_id = auth.uid()
  ));

-- Authenticated: owner deletes their own store's offers
CREATE POLICY "auth: delete own offers" ON public.offers FOR DELETE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.stores
    WHERE id = store_id AND owner_id = auth.uid()
  ));


-- ── 4.10 offer_items ─────────────────────────────────────────────────────────
-- Junction table linking offers to the products and/or categories they apply to.
-- An offer_item must target at least one of: product_id OR category_id.
-- quantity: how many units of the product/category are required (used for bogo/combo).

CREATE TABLE public.offer_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  offer_id    UUID NOT NULL REFERENCES public.offers(id) ON DELETE CASCADE,
  product_id  UUID REFERENCES public.products(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
  quantity    INT  NOT NULL DEFAULT 1,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  -- At least one of product_id or category_id must be set
  CHECK (product_id IS NOT NULL OR category_id IS NOT NULL)
);

-- ── Indexes ──────────────────────────────────────────────────────────────────

-- Items per offer (join path: offer -> items)
CREATE INDEX idx_offer_items_offer    ON public.offer_items(offer_id);
-- Offers for a specific product (reverse lookup: product -> applicable offers)
CREATE INDEX idx_offer_items_product  ON public.offer_items(product_id);
-- Offers for a specific category (reverse lookup: category -> applicable offers)
CREATE INDEX idx_offer_items_category ON public.offer_items(category_id);

-- ── RLS ──────────────────────────────────────────────────────────────────────

ALTER TABLE public.offer_items ENABLE ROW LEVEL SECURITY;

-- Anon: public read — ownership resolved through offer -> store
CREATE POLICY "anon: read offer items" ON public.offer_items FOR SELECT TO anon
  USING (EXISTS (
    SELECT 1 FROM public.offers o
    JOIN public.stores s ON s.id = o.store_id
    WHERE o.id = offer_id AND s.onboarding_completed = true
  ));

-- Authenticated: owner manages all operations on their own offer items
-- Single ALL policy (vs. granular per-operation) because ownership check is identical.
CREATE POLICY "auth: manage own offer items" ON public.offer_items FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.offers o
    JOIN public.stores s ON s.id = o.store_id
    WHERE o.id = offer_id AND s.owner_id = auth.uid()
  ));
