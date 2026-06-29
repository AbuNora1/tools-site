import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { TOOLS, CATEGORIES } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
    ...CATEGORIES.map((c) => ({
      url: `${SITE_URL}/categories/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...TOOLS.map((t) => ({
      url: `${SITE_URL}/tools/${t.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
