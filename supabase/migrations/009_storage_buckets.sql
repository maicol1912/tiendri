-- ── Migration: 009_storage_buckets ───────────────────────────────────────────
-- Phase 9: Storage buckets + RLS policies
-- 4 public buckets: logos, banners, products, categories
-- All buckets: 5MB limit, image/webp + image/png + image/jpeg MIME types
-- Path conventions:
--   logos:      {store_id}/{filename}.webp
--   banners:    {store_id}/{banner_id}.webp
--   products:   {store_id}/{product_id}/{sort_order}.webp
--   categories: {store_id}/{category_id}/{filename}.webp
-- Ownership enforced via (storage.foldername(name))[1]::uuid = store_id, verified against stores table

-- ── Buckets ──────────────────────────────────────────────────────────────────

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('logos',      'logos',      true, 5242880, ARRAY['image/webp', 'image/png', 'image/jpeg']),
  ('banners',    'banners',    true, 5242880, ARRAY['image/webp', 'image/png', 'image/jpeg']),
  ('products',   'products',   true, 5242880, ARRAY['image/webp', 'image/png', 'image/jpeg']),
  ('categories', 'categories', true, 5242880, ARRAY['image/webp', 'image/png', 'image/jpeg'])
ON CONFLICT (id) DO NOTHING;

-- ── logos ────────────────────────────────────────────────────────────────────

CREATE POLICY "public: read logos"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'logos');

CREATE POLICY "authenticated: upload to own logos"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'logos'
    AND EXISTS (
      SELECT 1 FROM public.stores
      WHERE id = (storage.foldername(name))[1]::uuid
      AND owner_id = auth.uid()
    )
  );

CREATE POLICY "authenticated: delete own logos"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'logos'
    AND EXISTS (
      SELECT 1 FROM public.stores
      WHERE id = (storage.foldername(name))[1]::uuid
      AND owner_id = auth.uid()
    )
  );

-- ── banners ──────────────────────────────────────────────────────────────────

CREATE POLICY "public: read banners"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'banners');

CREATE POLICY "authenticated: upload to own banners"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'banners'
    AND EXISTS (
      SELECT 1 FROM public.stores
      WHERE id = (storage.foldername(name))[1]::uuid
      AND owner_id = auth.uid()
    )
  );

CREATE POLICY "authenticated: delete own banners"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'banners'
    AND EXISTS (
      SELECT 1 FROM public.stores
      WHERE id = (storage.foldername(name))[1]::uuid
      AND owner_id = auth.uid()
    )
  );

-- ── products ─────────────────────────────────────────────────────────────────

CREATE POLICY "public: read products"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'products');

CREATE POLICY "authenticated: upload to products"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'products'
    AND EXISTS (
      SELECT 1 FROM public.stores
      WHERE id = (storage.foldername(name))[1]::uuid
      AND owner_id = auth.uid()
    )
  );

CREATE POLICY "authenticated: delete from products"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'products'
    AND EXISTS (
      SELECT 1 FROM public.stores
      WHERE id = (storage.foldername(name))[1]::uuid
      AND owner_id = auth.uid()
    )
  );

-- ── categories ───────────────────────────────────────────────────────────────

CREATE POLICY "public: read categories"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'categories');

CREATE POLICY "authenticated: upload to categories"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'categories'
    AND EXISTS (
      SELECT 1 FROM public.stores
      WHERE id = (storage.foldername(name))[1]::uuid
      AND owner_id = auth.uid()
    )
  );

CREATE POLICY "authenticated: delete from categories"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'categories'
    AND EXISTS (
      SELECT 1 FROM public.stores
      WHERE id = (storage.foldername(name))[1]::uuid
      AND owner_id = auth.uid()
    )
  );
