import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, varchar, primaryKey, numeric, serial, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial('id').notNull().primaryKey(),
  username: varchar("username", { length: 256 }).notNull().unique(),
  password: text("password").notNull(),
})

export const categories = pgTable("categories", {
  id: serial('id').notNull().primaryKey(),
  name: varchar("name", { length: 256 }).notNull().unique()
})

// categories 1..n products
export const categoriesRelation = relations(categories, ({ many }) => ({
  products: many(products)
}))

export const products = pgTable("products", {
  id: serial('id').notNull().primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  price: numeric("price").notNull(),
  image: text("image").notNull(), // Store cloudinary public image id
  description: text("description"),
  unit: text("unit").notNull(),
  ocopLevel: integer("ocop_level").default(3),
  isFeatured: integer("is_featured").default(0), // 0: no, 1: yes
  traceabilityId: varchar("traceability_id", { length: 256 }),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
    .notNull()
    .defaultNow(),
  categoryId: integer("category_id").references(() => categories.id, { onDelete: "set null" })
})

// products n..1 categories
// products n..m certifications
export const productsRelation = relations(products, ({ one, many }) => ({
  categories: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  certifications: many(productsToCertifications)
}))

export const metrics = pgTable("metrics", {
  id: serial('id').notNull().primaryKey(),
  name: varchar("name", { length: 256 }).notNull().unique(),
  value: numeric("value").notNull(), // Changed to numeric for decimals (e.g., 2.5 hectares)
  unit: varchar("unit", { length: 50 }), // e.g., '%', 'giờ', 'ha'
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
    .notNull()
    .defaultNow(),
})

export const certifications = pgTable("certifications", {
  id: serial('id').notNull().primaryKey(),
  name: varchar("name", { length: 256 }).notNull().unique(),
  image: text("image").notNull() // Store cloudinary public image id
})

// certifications n..m products
export const certificationsRelation = relations(certifications, ({ many }) => ({
  products: many(productsToCertifications)
}))

export const productsToCertifications = pgTable("products_to_certifications", {
  productId: integer("product_id")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  certificationId: integer("certification_id")
    .references(() => certifications.id, { onDelete: "cascade" })
    .notNull(),
},
  (table) => [
    primaryKey({ columns: [table.productId, table.certificationId] })
  ]
)

export const productsToCertificationsRelation = relations(productsToCertifications, ({ one }) => {
  return {
    product: one(products, {
      fields: [productsToCertifications.productId],
      references: [products.id],
    }),
    certification: one(certifications, {
      fields: [productsToCertifications.certificationId],
      references: [certifications.id],
    }),
  }
})

// 3. Recipes Repository (NEW)
export const recipes = pgTable("recipes", {
  id: serial('id').notNull().primaryKey(),
  titleVi: varchar("title_vi", { length: 256 }).notNull(),
  titleEn: varchar("title_en", { length: 256 }),
  descriptionVi: text("description_vi"),
  descriptionEn: text("description_en"),
  image: text("image").notNull(),
  videoUrl: text("video_url"), // YouTube/TikTok link
  difficulty: varchar("difficulty", { length: 50 }), // Dễ, Trung bình, Khó
  prepTime: varchar("prep_time", { length: 50 }),
  contentVi: text("content_vi").notNull(), // Step-by-step instructions
  contentEn: text("content_en"),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
    .notNull()
    .defaultNow(),
});

// 4. Member Stories (NEW)
export const memberStories = pgTable("member_stories", {
  id: serial('id').notNull().primaryKey(),
  nameVi: varchar("name_vi", { length: 256 }).notNull(),
  nameEn: varchar("name_en", { length: 256 }),
  roleVi: varchar("role_vi", { length: 256 }),
  roleEn: varchar("role_en", { length: 256 }),
  quoteVi: text("quote_vi").notNull(),
  quoteEn: text("quote_en"),
  contentVi: text("content_vi"),
  contentEn: text("content_en"),
  image: text("image").notNull(),
  order: integer("order").default(0),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
    .notNull()
    .defaultNow(),
});
