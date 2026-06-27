-- ── Migration: 013_logos_user_id_policy ───────────────────────────────────────
-- Adds RLS policies for logos bucket using user_id as path prefix.
-- Required for onboarding: users upload their logo before a store record exists.
-- Path convention: logos/{user_id}/{timestamp}-{filename}
--
-- The existing policy in 009 allows uploads where the first folder is a store_id
-- owned by the user. That policy continues to work for post-onboarding uploads.
-- This migration adds a complementary policy so that either condition passes.

CREATE POLICY "authenticated: upload to own logos by user_id"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'logos'
    AND (storage.foldername(name))[1]::uuid = auth.uid()
  );

CREATE POLICY "authenticated: delete own logos by user_id"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'logos'
    AND (storage.foldername(name))[1]::uuid = auth.uid()
  );
