# Project Overview: HTX Bồn Bồn Minh Duy

HTX Bồn Bồn Minh Duy is a professional landing page and product showcase for the **Minh Duy Cattail Cooperative** (Hợp tác xã Bồn Bồn Minh Duy) based in Cà Mau, Vietnam. The cooperative specializes in "dưa bồn bồn" (pickled cattail), a recognized OCOP (One Commune One Product) specialty.

The primary goal of this application is to showcase the cooperative's products, heritage, production procedures, and goals to potential customers and partners. It also includes a secure administrative dashboard for managing the content (products, categories, certifications) displayed on the landing page.

## Key Features

- **Product Showcase:** Interactive display of cattail products with filtering and details.
- **Brand Storytelling:** Sections dedicated to "About Us", "Goals", and "Production Procedures".
- **Customer Engagement:** "Cook Guide" and integrated contact information (Zalo, Gmail).
- **Content Management:** A React Admin dashboard for managing the landing page's dynamic content.

## Tech Stack

- **Frontend:** [Next.js 15](https://nextjs.org/) (App Router), [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/)
- **Admin UI:** [React Admin](https://marmelab.com/react-admin/)
- **Database/ORM:** [Drizzle ORM](https://orm.drizzle.team/), [PostgreSQL](https://www.postgresql.org/) (hosted on [Neon](https://neon.tech/))
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Authentication:** Custom JWT sessions using `jose` and `bcryptjs`
- **Image Hosting:** [Cloudinary](https://cloudinary.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

## Project Structure

- `src/app`: Next.js App Router pages and layouts.
  - `page.tsx`: The main landing page with sections (About Us, Products, Cook Guide, etc.).
  - `admin/`: Admin dashboard (React Admin implementation).
  - `api/`: Backend API routes supporting both the landing page and admin dashboard.
- `components/`: Reusable UI components.
  - `AboutUsSection.tsx`, `ProductsSection.tsx`, `ProceduresSection.tsx`, etc.: Landing page sections.
  - `ui/`: Radix-based UI primitives.
- `db/`: Database configuration and schema definitions.
  - `schema.ts`: Drizzle ORM schema (Users, Products, Categories, Certifications).
- `lib/`: Shared utilities for Auth and Cloudinary uploads.
- `i18n/`: Localization files for English (`en.ts`) and Vietnamese (`vi.ts`).

## Building and Running

### Development

```bash
npm install
npm run dev
```

### Database Management

- **Push Schema:** `npm run db:push` (Syncs schema to database)
- **Generate Migrations:** `npm run db:generate`
- **Database Studio:** `npm run db:studio` (Visual DB explorer)
- **Seed Data:** `npm run db:seed`

### Production

```bash
npm run build
npm run start
```

## Development Conventions

- **Type Safety:** The project uses TypeScript extensively. Always define types for props, API responses, and database models.
- **Drizzle ORM:** Use Drizzle's `relations` API for defining and querying table relationships.
- **Authentication:** Admin routes are protected via Next.js Middleware (`middleware.ts`). Any new admin API or page should be added to the `protectedAdminPaths` in the middleware.
- **Styling:** Follow Tailwind CSS 4 conventions. Use Radix UI components for complex interactive elements.
- **Internationalization:** Support both English and Vietnamese. Use the `i18n` configuration for any user-facing text.
- **Images:** All product/certification images are stored in Cloudinary. Store only the `public_id` in the database.
