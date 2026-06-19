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
    sitemap: "https://tiendri.com/sitemap.xml",
  };
}
