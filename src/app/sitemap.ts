import type { MetadataRoute } from "next";
import {
  listPublishedNews,
  listPublishedProducts,
  listPublishedRecipes,
  listPublishedStories,
} from "@/lib/cms/public-queries";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/gioi-thieu", "/san-pham", "/goc-bon-bon", "/lien-he"];
  let contentRoutes: MetadataRoute.Sitemap = [];

  try {
    const [products, recipes, stories, news] = await Promise.all([
      listPublishedProducts(),
      listPublishedRecipes(),
      listPublishedStories(),
      listPublishedNews(),
    ]);
    contentRoutes = [
      ...products.map(({ slug }) => ({ url: `${baseUrl}/san-pham/${slug}`, changeFrequency: "weekly" as const, priority: 0.7 })),
      ...recipes.map(({ slug }) => ({ url: `${baseUrl}/goc-bon-bon/cong-thuc/${slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
      ...stories.map(({ slug }) => ({ url: `${baseUrl}/goc-bon-bon/cau-chuyen/${slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
      ...news.map(({ slug }) => ({ url: `${baseUrl}/goc-bon-bon/tin-tuc/${slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ];
  } catch {
    // Missing migrations or unavailable storage must not expose draft fallbacks.
  }

  return [
    ...staticRoutes.map((path) => ({ url: `${baseUrl}${path}`, changeFrequency: "monthly" as const, priority: path === "" ? 1 : 0.8 })),
    ...contentRoutes,
  ];
}
