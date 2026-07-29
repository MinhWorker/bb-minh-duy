import { and, asc, desc, eq, isNotNull } from "drizzle-orm";
import db from "../../../db/drizzle";
import {
  certifications,
  claimRegistry,
  memberStories,
  news,
  products,
  recipes,
  sitePages,
  siteSettings,
} from "../../../db/schema";
import type { NewsDetail, PublicProduct, RecipeDetail, SitePageKey, SiteSettings, StoryDetail } from "./types";

export async function getPublicSiteSettings(): Promise<SiteSettings | null> {
  const [record] = await db.select({
    id: siteSettings.id,
    cooperativeName: siteSettings.cooperativeName,
    logo: siteSettings.logo,
    phone: siteSettings.phone,
    zalo: siteSettings.zalo,
    email: siteSettings.email,
    address: siteSettings.address,
    mapUrl: siteSettings.mapUrl,
    marketplaceUrl: siteSettings.marketplaceUrl,
    socialLinks: siteSettings.socialLinks,
    defaultSeoTitle: siteSettings.defaultSeoTitle,
    defaultSeoDescription: siteSettings.defaultSeoDescription,
  }).from(siteSettings).limit(1);
  return record ?? null;
}

export async function getPublishedSitePage(pageKey: SitePageKey) {
  const [record] = await db.select({
    id: sitePages.id,
    pageKey: sitePages.pageKey,
    title: sitePages.title,
    hero: sitePages.hero,
    sections: sitePages.sections,
    seoTitle: sitePages.seoTitle,
    seoDescription: sitePages.seoDescription,
    publishedAt: sitePages.publishedAt,
  }).from(sitePages).where(and(eq(sitePages.pageKey, pageKey), eq(sitePages.status, "published"))).limit(1);
  return record ?? null;
}

export async function listPublishedProducts(): Promise<PublicProduct[]> {
  const records = await db.select(publicProductSelection).from(products).where(and(
    eq(products.status, "published"),
    eq(products.commercialStatus, "core"),
    isNotNull(products.slug),
    isNotNull(products.marketplaceUrl),
  )).orderBy(asc(products.sortOrder), desc(products.id));
  return records.map(mapPublicProduct);
}

export async function getPublishedProduct(slug: string): Promise<PublicProduct | null> {
  const [record] = await db.select(publicProductSelection).from(products).where(and(
    eq(products.slug, slug),
    eq(products.status, "published"),
    eq(products.commercialStatus, "core"),
    isNotNull(products.marketplaceUrl),
  )).limit(1);
  return record ? mapPublicProduct(record) : null;
}

export async function listPublishedRecipes(): Promise<RecipeDetail[]> {
  const records = await db.select(recipeSelection).from(recipes).where(and(eq(recipes.status, "published"), isNotNull(recipes.slug)))
    .orderBy(asc(recipes.sortOrder), desc(recipes.id));
  return records.map(mapRecipe);
}

export async function getPublishedRecipe(slug: string): Promise<RecipeDetail | null> {
  const [record] = await db.select(recipeSelection).from(recipes).where(and(eq(recipes.slug, slug), eq(recipes.status, "published"))).limit(1);
  return record ? mapRecipe(record) : null;
}

export async function listPublishedStories(): Promise<StoryDetail[]> {
  const records = await db.select(storySelection).from(memberStories).where(and(eq(memberStories.status, "published"), isNotNull(memberStories.slug)))
    .orderBy(asc(memberStories.sortOrder), desc(memberStories.id));
  return records.map(mapStory);
}

export async function getPublishedStory(slug: string): Promise<StoryDetail | null> {
  const [record] = await db.select(storySelection).from(memberStories).where(and(eq(memberStories.slug, slug), eq(memberStories.status, "published"))).limit(1);
  return record ? mapStory(record) : null;
}

export async function listPublishedNews(): Promise<NewsDetail[]> {
  const records = await db.select(newsSelection).from(news).where(eq(news.status, "published"))
    .orderBy(asc(news.sortOrder), desc(news.publishedAt), desc(news.id));
  return records.map(mapNews);
}

export async function getPublishedNews(slug: string): Promise<NewsDetail | null> {
  const [record] = await db.select(newsSelection).from(news).where(and(eq(news.slug, slug), eq(news.status, "published"))).limit(1);
  return record ? mapNews(record) : null;
}

export async function listVerifiedCertifications() {
  return db.selectDistinct({
    id: certifications.id,
    name: certifications.name,
    slug: certifications.slug,
    image: certifications.image,
    imageAlt: certifications.imageAlt,
    description: certifications.description,
  }).from(certifications).innerJoin(claimRegistry, and(
    eq(claimRegistry.subjectType, "certification"),
    eq(claimRegistry.subjectId, certifications.id),
    eq(claimRegistry.evidenceKind, "official-document"),
    eq(claimRegistry.verificationStatus, "verified"),
  )).where(eq(certifications.status, "published")).orderBy(asc(certifications.sortOrder));
}

const publicProductSelection = {
  id: products.id,
  name: products.name,
  slug: products.slug,
  image: products.image,
  imageAlt: products.imageAlt,
  gallery: products.gallery,
  description: products.description,
  unit: products.unit,
  specifications: products.specifications,
  storageInstructions: products.storageInstructions,
  usageInstructions: products.usageInstructions,
  marketplaceUrl: products.marketplaceUrl,
  categoryId: products.categoryId,
  isFeatured: products.isFeatured,
  seoTitle: products.seoTitle,
  seoDescription: products.seoDescription,
};

const recipeSelection = {
  id: recipes.id, slug: recipes.slug, title: recipes.titleVi, description: recipes.descriptionVi,
  image: recipes.image, imageAlt: recipes.imageAlt, difficulty: recipes.difficulty, prepTime: recipes.prepTime,
  cookTime: recipes.cookTime, servings: recipes.servings, ingredients: recipes.ingredients, steps: recipes.steps,
  content: recipes.contentVi, seoTitle: recipes.seoTitle, seoDescription: recipes.seoDescription,
};

const storySelection = {
  id: memberStories.id, slug: memberStories.slug, title: memberStories.nameVi, role: memberStories.roleVi,
  quote: memberStories.quoteVi, content: memberStories.contentVi, image: memberStories.image,
  imageAlt: memberStories.imageAlt, seoTitle: memberStories.seoTitle, seoDescription: memberStories.seoDescription,
};

const newsSelection = {
  id: news.id, slug: news.slug, title: news.title, summary: news.summary, content: news.content,
  image: news.image, imageAlt: news.imageAlt, publishedAt: news.publishedAt,
  seoTitle: news.seoTitle, seoDescription: news.seoDescription,
};

type PublicProductRow = {
  id: number; name: string; slug: string | null; image: string; imageAlt: string | null;
  gallery: Array<{ url: string; alt: string }>; description: string | null; unit: string; specifications: string[];
  storageInstructions: string | null; usageInstructions: string | null; marketplaceUrl: string | null;
  categoryId: number | null; isFeatured: number; seoTitle: string | null; seoDescription: string | null;
};

function mapPublicProduct(record: PublicProductRow): PublicProduct {
  return {
    id: record.id as number, name: record.name as string, slug: (record.slug as string | null) ?? "",
    image: record.image as string, imageAlt: (record.imageAlt as string | null) ?? "",
    gallery: record.gallery as Array<{ url: string; alt: string }>, description: (record.description as string | null) ?? "",
    unit: record.unit as string, specifications: record.specifications as string[],
    storageInstructions: (record.storageInstructions as string | null) ?? "", usageInstructions: (record.usageInstructions as string | null) ?? "",
    marketplaceUrl: (record.marketplaceUrl as string | null) ?? "", categoryId: record.categoryId as number | null,
    isFeatured: record.isFeatured === 1, seoTitle: record.seoTitle as string | null, seoDescription: record.seoDescription as string | null,
  };
}

type RecipeRow = {
  id: number; slug: string | null; title: string; description: string | null; image: string; imageAlt: string | null;
  difficulty: string | null; prepTime: string | null; cookTime: string | null; servings: string | null;
  ingredients: string[]; steps: string[]; content: string; seoTitle: string | null; seoDescription: string | null;
};
type StoryRow = {
  id: number; slug: string | null; title: string; role: string | null; quote: string; content: string | null;
  image: string; imageAlt: string | null; seoTitle: string | null; seoDescription: string | null;
};
type NewsRow = {
  id: number; slug: string; title: string; summary: string | null; content: string; image: string | null;
  imageAlt: string | null; publishedAt: Date | null; seoTitle: string | null; seoDescription: string | null;
};

function mapRecipe(record: RecipeRow): RecipeDetail {
  return { ...record, slug: record.slug ?? "", description: record.description ?? "", imageAlt: record.imageAlt ?? "", difficulty: record.difficulty ?? "", prepTime: record.prepTime ?? "", cookTime: record.cookTime ?? "", servings: record.servings ?? "" };
}

function mapStory(record: StoryRow): StoryDetail {
  return { ...record, slug: record.slug ?? "", role: record.role ?? "", content: record.content ?? "", imageAlt: record.imageAlt ?? "" };
}

function mapNews(record: NewsRow): NewsDetail {
  return { ...record, summary: record.summary ?? "", image: record.image ?? "", imageAlt: record.imageAlt ?? "" };
}
