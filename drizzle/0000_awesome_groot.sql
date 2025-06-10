CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	CONSTRAINT "categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "certifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"image" text NOT NULL,
	CONSTRAINT "certifications_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"image" text NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"categories_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products_to_certifications" (
	"product_id" uuid NOT NULL,
	"certification_id" uuid NOT NULL,
	CONSTRAINT "products_to_certifications_product_id_certification_id_pk" PRIMARY KEY("product_id","certification_id")
);
--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_categories_id_categories_id_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products_to_certifications" ADD CONSTRAINT "products_to_certifications_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products_to_certifications" ADD CONSTRAINT "products_to_certifications_certification_id_certifications_id_fk" FOREIGN KEY ("certification_id") REFERENCES "public"."certifications"("id") ON DELETE cascade ON UPDATE no action;