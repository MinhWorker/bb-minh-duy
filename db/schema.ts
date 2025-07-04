import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, varchar, primaryKey, numeric, serial } from "drizzle-orm/pg-core";

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
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
    .notNull()
    .defaultNow(),
  categoryId: serial("category_id").references(() => categories.id, { onDelete: "set null" })
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

  productId: serial("product_id")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  certificationId: serial("certification_id")
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
