import type { MetadataRoute } from "next";
import { getJournalHref } from "@/content/site";
import { listVisibleJournalEntries, listVisibleProducts } from "@/lib/cms/site-content";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bonbonmd.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/gioi-thieu", "/san-pham", "/goc-bon-bon", "/lien-he"];
  const [products, journalEntries] = await Promise.all([
    listVisibleProducts(),
    listVisibleJournalEntries(),
  ]);
  const contentRoutes: MetadataRoute.Sitemap = [
    ...products.map(({ slug }) => ({ url: `${baseUrl}/san-pham/${slug}`, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...journalEntries.map((entry) => ({ url: `${baseUrl}${getJournalHref(entry)}`, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];

  return [
    ...staticRoutes.map((path) => ({ url: `${baseUrl}${path}`, changeFrequency: "monthly" as const, priority: path === "" ? 1 : 0.8 })),
    ...contentRoutes,
  ];
}
