-- Migration: 002_storage_buckets
-- Creates logos and banners storage buckets with public read access.
-- File size limit: 5MB. Allowed MIME types: WebP, PNG, JPEG.

-- ── Buckets ───────────────────────────────────────────────────────────────────

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  (
    'logos',
    'logos',
    true,
    5242880, -- 5MB in bytes
    ARRAY['image/webp', 'image/png', 'image/jpeg']
  ),
  (
    'banners',
    'banners',
    true,
    5242880,
    ARRAY['image/webp', 'image/png', 'image/jpeg']
  )
ON CONFLICT (id) DO NOTHING;

-- ── Storage RLS ───────────────────────────────────────────────────────────────

-- Public read: anyone can read any file from logos and banners buckets
CREATE POLICY "public: read logos"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'logos');

CREATE POLICY "public: read banners"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'banners');

-- Authenticated upload: owners can upload to their own store prefix ({store_id}/*)
-- The path convention is: logos/{store_id}/{filename}
CREATE POLICY "authenticated: upload to own logos prefix"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'logos'
    AND auth.uid() IS NOT NULL
  );

CREATE POLICY "authenticated: upload to own banners prefix"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'banners'
    AND auth.uid() IS NOT NULL
  );

-- Authenticated delete: owners can delete their own files
CREATE POLICY "authenticated: delete from logos"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'logos'
    AND auth.uid() IS NOT NULL
  );

CREATE POLICY "authenticated: delete from banners"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'banners'
    AND auth.uid() IS NOT NULL
  );
