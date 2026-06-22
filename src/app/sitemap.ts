import type { MetadataRoute } from "next";
import { createClient } from "@/infrastructure/supabase/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tiendri.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const { data: stores } = await supabase
    .from("stores")
    .select("slug, updated_at")
    .eq("onboarding_completed", true);

  const storePaths = (stores ?? []).map((store) => ({
    url: `${SITE_URL}/${store.slug}`,
    lastModified: new Date(store.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/precios`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...storePaths,
  ];
}
