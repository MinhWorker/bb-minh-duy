import type { JournalEntry, JournalKind, Product } from "@/content/site";
import { journalEntries as previewJournalEntries, products as previewProducts } from "@/content/site";
import {
  getPublishedNews,
  getPublishedProduct,
  getPublishedRecipe,
  getPublishedStory,
  listPublishedNews,
  listPublishedProducts,
  listPublishedRecipes,
  listPublishedStories,
} from "./public-queries";
import type { NewsDetail, PublicProduct, RecipeDetail, StoryDetail } from "./types";

// Draft preview is intentionally confined to local development or an explicit
// staging flag. Production always reads the publication-gated CMS queries.
const previewEnabled = process.env.NODE_ENV === "development" || process.env.CONTENT_PREVIEW === "true";

function productFromCms(product: PublicProduct): Product {
  return {
    slug: product.slug,
    name: product.name,
    summary: product.description,
    description: product.description,
    image: product.image,
    imageAlt: product.imageAlt,
    gallery: product.gallery,
    formats: product.specifications.length ? product.specifications : [product.unit],
    storage: product.storageInstructions,
    usage: product.usageInstructions,
    marketplaceUrl: product.marketplaceUrl,
  };
}

function paragraphs(content: string) {
  return content.split(/\n\s*\n/).map((value) => value.trim()).filter(Boolean);
}

function minutes(content: string) {
  return `${Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 220))} phút đọc`;
}

function recipeFromCms(entry: RecipeDetail): JournalEntry {
  return {
    slug: entry.slug,
    kind: "cong-thuc",
    title: entry.title,
    excerpt: entry.description,
    image: entry.image,
    imageAlt: entry.imageAlt,
    publishedLabel: "Công thức từ HTX",
    readingTime: minutes(entry.content),
    body: paragraphs(entry.content),
  };
}

function storyFromCms(entry: StoryDetail): JournalEntry {
  return {
    slug: entry.slug,
    kind: "cau-chuyen",
    title: entry.title,
    excerpt: entry.role,
    image: entry.image,
    imageAlt: entry.imageAlt,
    publishedLabel: "Câu chuyện HTX",
    readingTime: minutes(entry.content),
    body: paragraphs(entry.content),
  };
}

function newsFromCms(entry: NewsDetail): JournalEntry {
  return {
    slug: entry.slug,
    kind: "tin-tuc",
    title: entry.title,
    excerpt: entry.summary,
    image: entry.image,
    imageAlt: entry.imageAlt,
    publishedLabel: entry.publishedAt
      ? new Intl.DateTimeFormat("vi-VN", { dateStyle: "long" }).format(entry.publishedAt)
      : "Tin tức HTX",
    readingTime: minutes(entry.content),
    body: paragraphs(entry.content),
  };
}

export async function listVisibleProducts(): Promise<Product[]> {
  if (previewEnabled) return previewProducts;
  try {
    const records = (await listPublishedProducts()).map(productFromCms);
    return records.length ? records : previewProducts;
  } catch {
    return previewProducts;
  }
}

export async function getVisibleProduct(slug: string): Promise<Product | undefined> {
  if (previewEnabled) return previewProducts.find((product) => product.slug === slug);
  try {
    const record = await getPublishedProduct(slug);
    if (record) return productFromCms(record);
  } catch {
    // Missing DB fallback
  }
  return previewProducts.find((product) => product.slug === slug);
}

export async function listVisibleJournalEntries(): Promise<JournalEntry[]> {
  if (previewEnabled) return previewJournalEntries;
  try {
    const [recipes, stories, news] = await Promise.all([
      listPublishedRecipes(),
      listPublishedStories(),
      listPublishedNews(),
    ]);
    const records = [
      ...recipes.map(recipeFromCms),
      ...stories.map(storyFromCms),
      ...news.map(newsFromCms),
    ];
    return records.length ? records : previewJournalEntries;
  } catch {
    return previewJournalEntries;
  }
}

export async function getVisibleJournalEntry(kind: JournalKind, slug: string): Promise<JournalEntry | undefined> {
  if (previewEnabled) return previewJournalEntries.find((entry) => entry.kind === kind && entry.slug === slug);
  try {
    if (kind === "cong-thuc") {
      const record = await getPublishedRecipe(slug);
      if (record) return recipeFromCms(record);
    } else if (kind === "cau-chuyen") {
      const record = await getPublishedStory(slug);
      if (record) return storyFromCms(record);
    } else {
      const record = await getPublishedNews(slug);
      if (record) return newsFromCms(record);
    }
  } catch {
    // Missing DB fallback
  }
  return previewJournalEntries.find((entry) => entry.kind === kind && entry.slug === slug);
}
