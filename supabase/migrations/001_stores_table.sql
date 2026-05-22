-- Migration: 001_stores_table
-- Creates the stores table with customization JSONB column and RLS policies.
-- Each authenticated user can own at most 1 store (enforced via CHECK policy).

-- ── Table ─────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.stores (
  id                  uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id            uuid          NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name                text          NOT NULL CHECK (char_length(trim(name)) >= 2),
  slug                text          UNIQUE NOT NULL CHECK (slug ~ '^[a-z0-9][a-z0-9-]*[a-z0-9]$'),
  description         text          CHECK (char_length(description) <= 120),
  whatsapp            text,
  template_id         text          NOT NULL DEFAULT 'tech-premium',
  catalog_mode        text          NOT NULL DEFAULT 'simple' CHECK (catalog_mode IN ('simple', 'nested')),
  currency            text          NOT NULL DEFAULT 'COP',
  onboarding_completed boolean      NOT NULL DEFAULT false,
  customization       jsonb         NOT NULL DEFAULT '{}'::jsonb,
  created_at          timestamptz   NOT NULL DEFAULT now(),
  updated_at          timestamptz   NOT NULL DEFAULT now()
);

-- ── Indexes ───────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_stores_owner_id ON public.stores (owner_id);

-- ── updated_at trigger ────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER stores_set_updated_at
  BEFORE UPDATE ON public.stores
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ── RLS ───────────────────────────────────────────────────────────────────────

ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;

-- Owners can read their own store (including draft stores)
CREATE POLICY "authenticated: select own store"
  ON public.stores
  FOR SELECT
  TO authenticated
  USING (auth.uid() = owner_id);

-- Anonymous users can only read stores that completed onboarding
CREATE POLICY "anon: select public stores"
  ON public.stores
  FOR SELECT
  TO anon
  USING (onboarding_completed = true);

-- Owners can update their own store
CREATE POLICY "authenticated: update own store"
  ON public.stores
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

-- Owners can delete their own store
CREATE POLICY "authenticated: delete own store"
  ON public.stores
  FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_id);

-- Authenticated users can insert exactly 1 store (MVP limit)
-- The sub-select ensures no existing store exists for this user before inserting.
CREATE POLICY "authenticated: insert own store (max 1)"
  ON public.stores
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = owner_id
    AND (
      SELECT COUNT(*) FROM public.stores WHERE owner_id = auth.uid()
    ) = 0
  );
