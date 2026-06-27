-- ── Migration: 015_media_assets_anon_access ──────────────────────────────────
-- Fix: allow anon users to read media_assets for public stores.
-- Needed for the storefront to resolve media_xxx tokens to CDN URLs
-- (logo, banners, category images, product images, etc.)

GRANT SELECT ON public.media_assets TO anon;

CREATE POLICY "anon: select media of public stores"
  ON public.media_assets FOR SELECT TO anon
  USING (public.is_store_public(store_id));
