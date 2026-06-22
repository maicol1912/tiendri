import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/carrito", "/checkout", "/template/", "/api/", "/dashboard/", "/auth/", "/onboarding/", "/clone/"],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://tiendri.com"}/sitemap.xml`,
  };
}
