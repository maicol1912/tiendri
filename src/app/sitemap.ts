import type { MetadataRoute } from "next";
import { createClient } from "@/infrastructure/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const { data: stores } = await supabase
    .from("stores")
    .select("slug, updated_at")
    .eq("onboarding_completed", true);

  const storePaths = (stores ?? []).map((store) => ({
    url: `https://tiendri.com/${store.slug}`,
    lastModified: new Date(store.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: "https://tiendri.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://tiendri.com/precios",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...storePaths,
  ];
}
