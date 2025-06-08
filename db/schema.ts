import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
})

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull()
})

export const certifications = pgTable("certifications", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  image: text("image").notNull()
})
