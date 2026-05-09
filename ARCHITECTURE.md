# Project Architecture: HTX Bồn Bồn Minh Duy

## 1. Tech Stack
- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 19, Tailwind CSS 4, Lucide React (Icons)
- **Admin Panel:** React Admin (Integrated in `/src/app/admin`)
- **Database:** PostgreSQL (Hosted on Neon)
- **ORM:** Drizzle ORM
- **Authentication:** Custom JWT sessions (Jose + Bcryptjs)
- **Image Management:** Cloudinary (Storage and Optimization)
- **State Management:** Zustand (Client-side state)

---

## 2. Directory Structure
```text
/
├── components/          # Reusable UI components
│   ├── ui/              # Radix/Shadcn-like primitives
│   ├── products/        # Product-specific components
│   ├── recipes/         # NEW: Recipe-specific components
│   └── stories/         # NEW: Story-specific components
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── (public)/    # Public pages (Landing, OCOP Journey, Recipes)
│   │   ├── admin/       # React Admin implementation
│   │   └── api/         # Backend API routes
│   ├── lib/             # Shared utilities (Auth, Upload, Traceability logic)
│   └── db/              # Drizzle Schema & Configuration
├── i18n/                # Localization (vi.ts, en.ts)
└── public/              # Static assets (Logos, Icons)
```

---

## 3. Database Schema (Drizzle ORM)

Below are the NEW and UPDATED tables to support the OCOP 4-star vision.

```typescript
import { pgTable, text, timestamp, varchar, serial, integer, numeric } from "drizzle-orm/pg-core";

// 1. Existing Tables (Updated)
// - products: Added 'is_featured' and 'traceability_id'
export const products = pgTable("products", {
  id: serial('id').notNull().primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  price: numeric("price").notNull(),
  image: text("image").notNull(), 
  description: text("description"),
  unit: text("unit").notNull(),
  ocopLevel: integer("ocop_level").default(3),
  isFeatured: integer("is_featured").default(0), // 0: no, 1: yes
  createdAt: timestamp('created_at').defaultNow(),
});

// 2. Social Impact Metrics (Reuse existing table but define standard names)
// Standard Names: 'women_workers', 'training_hours', 'clean_area_ha', 'households_supported'
export const metrics = pgTable("metrics", {
  id: serial('id').notNull().primaryKey(),
  name: varchar("name", { length: 256 }).notNull().unique(),
  value: numeric("value").notNull(), // Changed to numeric for decimals (e.g., 2.5 hectares)
  unit: varchar("unit", { length: 50 }), // e.g., '%', 'giờ', 'ha'
  updatedAt: timestamp('updated_at').defaultNow(),
});

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
  createdAt: timestamp('created_at').defaultNow(),
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
  createdAt: timestamp('created_at').defaultNow(),
});
```

---

## 4. Key Architectural Patterns

### Traceability Simulation
Instead of a complex blockchain, we will use a batch-based lookup. Each product can be assigned a `batch_id`. A public API route `/api/traceability/[batchId]` will return harvest dates, processing location, and quality check results, which the frontend displays in a "Live Diary" format.

### "Modern-Rustic" CSS Strategy
- Use **Tailwind 4** variables for the color palette (`--color-rustic-green`, `--color-earth-brown`).
- Implement a custom `glass-morphism` variant for interactive cards to keep the "Modern" feel.
- Use **Typography** that mixes a classic Serif (for headings) with a clean Sans-serif (for body) to represent the blend of tradition and modernity.
