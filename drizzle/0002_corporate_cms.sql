ALTER TABLE "products" ALTER COLUMN "price" DROP NOT NULL;
ALTER TABLE "products" ALTER COLUMN "ocop_level" DROP DEFAULT;

ALTER TABLE "categories" ADD COLUMN IF NOT EXISTS "slug" varchar(256);
ALTER TABLE "categories" ADD COLUMN IF NOT EXISTS "status" varchar(32) DEFAULT 'draft' NOT NULL;
ALTER TABLE "categories" ADD COLUMN IF NOT EXISTS "sort_order" integer DEFAULT 0 NOT NULL;
ALTER TABLE "categories" ADD COLUMN IF NOT EXISTS "seo_title" varchar(256);
ALTER TABLE "categories" ADD COLUMN IF NOT EXISTS "seo_description" text;
ALTER TABLE "categories" ADD COLUMN IF NOT EXISTS "published_at" timestamp with time zone;
ALTER TABLE "categories" ADD COLUMN IF NOT EXISTS "updated_at" timestamp with time zone DEFAULT now() NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS "categories_slug_unique" ON "categories" ("slug");

ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "slug" varchar(256);
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "image_alt" text;
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "gallery" jsonb DEFAULT '[]'::jsonb NOT NULL;
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "specifications" jsonb DEFAULT '[]'::jsonb NOT NULL;
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "storage_instructions" text;
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "usage_instructions" text;
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "marketplace_url" text;
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "commercial_status" varchar(32) DEFAULT 'core' NOT NULL;
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "status" varchar(32) DEFAULT 'draft' NOT NULL;
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "sort_order" integer DEFAULT 0 NOT NULL;
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "seo_title" varchar(256);
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "seo_description" text;
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "published_at" timestamp with time zone;
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "updated_at" timestamp with time zone DEFAULT now() NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS "products_slug_unique" ON "products" ("slug");
CREATE INDEX IF NOT EXISTS "products_status_sort_idx" ON "products" ("status", "sort_order");

ALTER TABLE "certifications" ADD COLUMN IF NOT EXISTS "slug" varchar(256);
ALTER TABLE "certifications" ADD COLUMN IF NOT EXISTS "image_alt" text;
ALTER TABLE "certifications" ADD COLUMN IF NOT EXISTS "description" text;
ALTER TABLE "certifications" ADD COLUMN IF NOT EXISTS "status" varchar(32) DEFAULT 'draft' NOT NULL;
ALTER TABLE "certifications" ADD COLUMN IF NOT EXISTS "sort_order" integer DEFAULT 0 NOT NULL;
ALTER TABLE "certifications" ADD COLUMN IF NOT EXISTS "seo_title" varchar(256);
ALTER TABLE "certifications" ADD COLUMN IF NOT EXISTS "seo_description" text;
ALTER TABLE "certifications" ADD COLUMN IF NOT EXISTS "published_at" timestamp with time zone;
ALTER TABLE "certifications" ADD COLUMN IF NOT EXISTS "created_at" timestamp with time zone DEFAULT now() NOT NULL;
ALTER TABLE "certifications" ADD COLUMN IF NOT EXISTS "updated_at" timestamp with time zone DEFAULT now() NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS "certifications_slug_unique" ON "certifications" ("slug");

ALTER TABLE "recipes" ADD COLUMN IF NOT EXISTS "slug" varchar(256);
ALTER TABLE "recipes" ADD COLUMN IF NOT EXISTS "image_alt" text;
ALTER TABLE "recipes" ADD COLUMN IF NOT EXISTS "cook_time" varchar(50);
ALTER TABLE "recipes" ADD COLUMN IF NOT EXISTS "servings" varchar(100);
ALTER TABLE "recipes" ADD COLUMN IF NOT EXISTS "ingredients" jsonb DEFAULT '[]'::jsonb NOT NULL;
ALTER TABLE "recipes" ADD COLUMN IF NOT EXISTS "steps" jsonb DEFAULT '[]'::jsonb NOT NULL;
ALTER TABLE "recipes" ADD COLUMN IF NOT EXISTS "status" varchar(32) DEFAULT 'draft' NOT NULL;
ALTER TABLE "recipes" ADD COLUMN IF NOT EXISTS "sort_order" integer DEFAULT 0 NOT NULL;
ALTER TABLE "recipes" ADD COLUMN IF NOT EXISTS "seo_title" varchar(256);
ALTER TABLE "recipes" ADD COLUMN IF NOT EXISTS "seo_description" text;
ALTER TABLE "recipes" ADD COLUMN IF NOT EXISTS "published_at" timestamp with time zone;
ALTER TABLE "recipes" ADD COLUMN IF NOT EXISTS "updated_at" timestamp with time zone DEFAULT now() NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS "recipes_slug_unique" ON "recipes" ("slug");
CREATE INDEX IF NOT EXISTS "recipes_status_sort_idx" ON "recipes" ("status", "sort_order");

ALTER TABLE "member_stories" ADD COLUMN IF NOT EXISTS "slug" varchar(256);
ALTER TABLE "member_stories" ADD COLUMN IF NOT EXISTS "image_alt" text;
ALTER TABLE "member_stories" ADD COLUMN IF NOT EXISTS "status" varchar(32) DEFAULT 'draft' NOT NULL;
ALTER TABLE "member_stories" ADD COLUMN IF NOT EXISTS "sort_order" integer DEFAULT 0 NOT NULL;
ALTER TABLE "member_stories" ADD COLUMN IF NOT EXISTS "seo_title" varchar(256);
ALTER TABLE "member_stories" ADD COLUMN IF NOT EXISTS "seo_description" text;
ALTER TABLE "member_stories" ADD COLUMN IF NOT EXISTS "published_at" timestamp with time zone;
ALTER TABLE "member_stories" ADD COLUMN IF NOT EXISTS "updated_at" timestamp with time zone DEFAULT now() NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS "member_stories_slug_unique" ON "member_stories" ("slug");
CREATE INDEX IF NOT EXISTS "member_stories_status_sort_idx" ON "member_stories" ("status", "sort_order");

CREATE TABLE IF NOT EXISTS "site_settings" (
  "id" serial PRIMARY KEY,
  "cooperative_name" varchar(256) NOT NULL,
  "logo" text,
  "phone" varchar(64),
  "zalo" varchar(256),
  "email" varchar(256),
  "address" text,
  "map_url" text,
  "marketplace_url" text,
  "social_links" jsonb DEFAULT '{}'::jsonb NOT NULL,
  "default_seo_title" varchar(256),
  "default_seo_description" text,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "site_pages" (
  "id" serial PRIMARY KEY,
  "page_key" varchar(64) NOT NULL UNIQUE,
  "title" varchar(256) NOT NULL,
  "hero" jsonb DEFAULT '{}'::jsonb NOT NULL,
  "sections" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "status" varchar(32) DEFAULT 'draft' NOT NULL,
  "seo_title" varchar(256),
  "seo_description" text,
  "published_at" timestamp with time zone,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "news" (
  "id" serial PRIMARY KEY,
  "slug" varchar(256) NOT NULL UNIQUE,
  "title" varchar(256) NOT NULL,
  "summary" text,
  "content" text NOT NULL,
  "image" text,
  "image_alt" text,
  "status" varchar(32) DEFAULT 'draft' NOT NULL,
  "sort_order" integer DEFAULT 0 NOT NULL,
  "seo_title" varchar(256),
  "seo_description" text,
  "published_at" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "news_status_published_idx" ON "news" ("status", "published_at");

CREATE TABLE IF NOT EXISTS "claim_registry" (
  "id" serial PRIMARY KEY,
  "claim" text NOT NULL,
  "subject_type" varchar(64),
  "subject_id" integer,
  "evidence_kind" varchar(32) NOT NULL,
  "source_reference" text NOT NULL,
  "source_date" timestamp with time zone,
  "source_location" text,
  "verification_status" varchar(32) DEFAULT 'pending' NOT NULL,
  "reviewed_by" varchar(256),
  "reviewed_at" timestamp with time zone,
  "conflict_notes" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "claim_registry_subject_idx" ON "claim_registry" ("subject_type", "subject_id");

CREATE TABLE IF NOT EXISTS "media_manifest" (
  "id" serial PRIMARY KEY,
  "source_path" text NOT NULL,
  "asset_url" text,
  "media_kind" varchar(32) DEFAULT 'photo' NOT NULL,
  "provenance" varchar(32) NOT NULL,
  "usage_rights" text,
  "alt_text" text NOT NULL,
  "display_role" varchar(128),
  "is_approved" boolean DEFAULT false NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "media_manifest_source_path_idx" ON "media_manifest" ("source_path");

-- Existing content is intentionally retained as draft until it passes content review.
