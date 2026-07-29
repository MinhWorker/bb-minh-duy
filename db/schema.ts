import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  jsonb,
  numeric,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 256 }).notNull().unique(),
  password: text("password").notNull(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull().unique(),
  slug: varchar("slug", { length: 256 }).unique(),
  status: varchar("status", { length: 32 }).notNull().default("draft"),
  sortOrder: integer("sort_order").notNull().default(0),
  seoTitle: varchar("seo_title", { length: 256 }),
  seoDescription: text("seo_description"),
  publishedAt: timestamp("published_at", { withTimezone: true, mode: "date" }),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  slug: varchar("slug", { length: 256 }).unique(),
  price: numeric("price"),
  image: text("image").notNull(),
  imageAlt: text("image_alt"),
  gallery: jsonb("gallery").$type<Array<{ url: string; alt: string }>>().notNull().default([]),
  description: text("description"),
  unit: text("unit").notNull(),
  specifications: jsonb("specifications").$type<string[]>().notNull().default([]),
  storageInstructions: text("storage_instructions"),
  usageInstructions: text("usage_instructions"),
  marketplaceUrl: text("marketplace_url"),
  commercialStatus: varchar("commercial_status", { length: 32 }).notNull().default("core"),
  status: varchar("status", { length: 32 }).notNull().default("draft"),
  sortOrder: integer("sort_order").notNull().default(0),
  seoTitle: varchar("seo_title", { length: 256 }),
  seoDescription: text("seo_description"),
  publishedAt: timestamp("published_at", { withTimezone: true, mode: "date" }),
  ocopLevel: integer("ocop_level"),
  isFeatured: integer("is_featured").notNull().default(0),
  traceabilityId: varchar("traceability_id", { length: 256 }),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
  categoryId: integer("category_id").references(() => categories.id, { onDelete: "set null" }),
}, (table) => [index("products_status_sort_idx").on(table.status, table.sortOrder)]);

export const metrics = pgTable("metrics", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull().unique(),
  value: numeric("value").notNull(),
  unit: varchar("unit", { length: 50 }),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
});

export const certifications = pgTable("certifications", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull().unique(),
  slug: varchar("slug", { length: 256 }).unique(),
  image: text("image").notNull(),
  imageAlt: text("image_alt"),
  description: text("description"),
  status: varchar("status", { length: 32 }).notNull().default("draft"),
  sortOrder: integer("sort_order").notNull().default(0),
  seoTitle: varchar("seo_title", { length: 256 }),
  seoDescription: text("seo_description"),
  publishedAt: timestamp("published_at", { withTimezone: true, mode: "date" }),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
});

export const productsToCertifications = pgTable("products_to_certifications", {
  productId: integer("product_id").references(() => products.id, { onDelete: "cascade" }).notNull(),
  certificationId: integer("certification_id").references(() => certifications.id, { onDelete: "cascade" }).notNull(),
}, (table) => [primaryKey({ columns: [table.productId, table.certificationId] })]);

export const recipes = pgTable("recipes", {
  id: serial("id").primaryKey(),
  titleVi: varchar("title_vi", { length: 256 }).notNull(),
  titleEn: varchar("title_en", { length: 256 }),
  slug: varchar("slug", { length: 256 }).unique(),
  descriptionVi: text("description_vi"),
  descriptionEn: text("description_en"),
  image: text("image").notNull(),
  imageAlt: text("image_alt"),
  videoUrl: text("video_url"),
  difficulty: varchar("difficulty", { length: 50 }),
  prepTime: varchar("prep_time", { length: 50 }),
  cookTime: varchar("cook_time", { length: 50 }),
  servings: varchar("servings", { length: 100 }),
  ingredients: jsonb("ingredients").$type<string[]>().notNull().default([]),
  steps: jsonb("steps").$type<string[]>().notNull().default([]),
  contentVi: text("content_vi").notNull(),
  contentEn: text("content_en"),
  status: varchar("status", { length: 32 }).notNull().default("draft"),
  sortOrder: integer("sort_order").notNull().default(0),
  seoTitle: varchar("seo_title", { length: 256 }),
  seoDescription: text("seo_description"),
  publishedAt: timestamp("published_at", { withTimezone: true, mode: "date" }),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
}, (table) => [index("recipes_status_sort_idx").on(table.status, table.sortOrder)]);

export const memberStories = pgTable("member_stories", {
  id: serial("id").primaryKey(),
  nameVi: varchar("name_vi", { length: 256 }).notNull(),
  nameEn: varchar("name_en", { length: 256 }),
  slug: varchar("slug", { length: 256 }).unique(),
  roleVi: varchar("role_vi", { length: 256 }),
  roleEn: varchar("role_en", { length: 256 }),
  quoteVi: text("quote_vi").notNull(),
  quoteEn: text("quote_en"),
  contentVi: text("content_vi"),
  contentEn: text("content_en"),
  image: text("image").notNull(),
  imageAlt: text("image_alt"),
  order: integer("order").notNull().default(0),
  status: varchar("status", { length: 32 }).notNull().default("draft"),
  sortOrder: integer("sort_order").notNull().default(0),
  seoTitle: varchar("seo_title", { length: 256 }),
  seoDescription: text("seo_description"),
  publishedAt: timestamp("published_at", { withTimezone: true, mode: "date" }),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
}, (table) => [index("member_stories_status_sort_idx").on(table.status, table.sortOrder)]);

export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  cooperativeName: varchar("cooperative_name", { length: 256 }).notNull(),
  logo: text("logo"),
  phone: varchar("phone", { length: 64 }),
  zalo: varchar("zalo", { length: 256 }),
  email: varchar("email", { length: 256 }),
  address: text("address"),
  mapUrl: text("map_url"),
  marketplaceUrl: text("marketplace_url"),
  socialLinks: jsonb("social_links").$type<Record<string, string>>().notNull().default({}),
  defaultSeoTitle: varchar("default_seo_title", { length: 256 }),
  defaultSeoDescription: text("default_seo_description"),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
});

export const sitePages = pgTable("site_pages", {
  id: serial("id").primaryKey(),
  pageKey: varchar("page_key", { length: 64 }).notNull().unique(),
  title: varchar("title", { length: 256 }).notNull(),
  hero: jsonb("hero").$type<Record<string, unknown>>().notNull().default({}),
  sections: jsonb("sections").$type<Array<Record<string, unknown>>>().notNull().default([]),
  status: varchar("status", { length: 32 }).notNull().default("draft"),
  seoTitle: varchar("seo_title", { length: 256 }),
  seoDescription: text("seo_description"),
  publishedAt: timestamp("published_at", { withTimezone: true, mode: "date" }),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
});

export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 256 }).notNull().unique(),
  title: varchar("title", { length: 256 }).notNull(),
  summary: text("summary"),
  content: text("content").notNull(),
  image: text("image"),
  imageAlt: text("image_alt"),
  status: varchar("status", { length: 32 }).notNull().default("draft"),
  sortOrder: integer("sort_order").notNull().default(0),
  seoTitle: varchar("seo_title", { length: 256 }),
  seoDescription: text("seo_description"),
  publishedAt: timestamp("published_at", { withTimezone: true, mode: "date" }),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
}, (table) => [index("news_status_published_idx").on(table.status, table.publishedAt)]);

export const claimRegistry = pgTable("claim_registry", {
  id: serial("id").primaryKey(),
  claim: text("claim").notNull(),
  subjectType: varchar("subject_type", { length: 64 }),
  subjectId: integer("subject_id"),
  evidenceKind: varchar("evidence_kind", { length: 32 }).notNull(),
  sourceReference: text("source_reference").notNull(),
  sourceDate: timestamp("source_date", { withTimezone: true, mode: "date" }),
  sourceLocation: text("source_location"),
  verificationStatus: varchar("verification_status", { length: 32 }).notNull().default("pending"),
  reviewedBy: varchar("reviewed_by", { length: 256 }),
  reviewedAt: timestamp("reviewed_at", { withTimezone: true, mode: "date" }),
  conflictNotes: text("conflict_notes"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
}, (table) => [index("claim_registry_subject_idx").on(table.subjectType, table.subjectId)]);

export const mediaManifest = pgTable("media_manifest", {
  id: serial("id").primaryKey(),
  sourcePath: text("source_path").notNull(),
  assetUrl: text("asset_url"),
  mediaKind: varchar("media_kind", { length: 32 }).notNull().default("photo"),
  provenance: varchar("provenance", { length: 32 }).notNull(),
  usageRights: text("usage_rights"),
  altText: text("alt_text").notNull(),
  displayRole: varchar("display_role", { length: 128 }),
  isApproved: boolean("is_approved").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
}, (table) => [uniqueIndex("media_manifest_source_path_idx").on(table.sourcePath)]);

export const categoriesRelation = relations(categories, ({ many }) => ({ products: many(products) }));
export const productsRelation = relations(products, ({ one, many }) => ({
  category: one(categories, { fields: [products.categoryId], references: [categories.id] }),
  categories: one(categories, { fields: [products.categoryId], references: [categories.id] }),
  certifications: many(productsToCertifications),
}));
export const certificationsRelation = relations(certifications, ({ many }) => ({ products: many(productsToCertifications) }));
export const productsToCertificationsRelation = relations(productsToCertifications, ({ one }) => ({
  product: one(products, { fields: [productsToCertifications.productId], references: [products.id] }),
  certification: one(certifications, { fields: [productsToCertifications.certificationId], references: [certifications.id] }),
}));
