import { NextResponse } from "next/server";
import { asc, eq } from "drizzle-orm";
import db from "../../../../../db/drizzle";
import { categories } from "../../../../../db/schema";

export async function GET() {
  try {
    const records = await db.select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
      description: categories.seoDescription,
    }).from(categories).where(eq(categories.status, "published")).orderBy(asc(categories.sortOrder));

    return NextResponse.json({ categories: records });
  } catch {
    return NextResponse.json({ error: "Không thể tải danh mục." }, { status: 503 });
  }
}
