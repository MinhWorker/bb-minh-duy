import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../db/drizzle";
import { count, desc, inArray, isNull, or } from "drizzle-orm";
import { products } from "../../../../../db/schema";

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const body = await req.json();

    // Parse categoryIds as numbers (from string or number array)
    const rawCategoryIds = body.categoryIds ?? [];
    const categoryIds: number[] = rawCategoryIds
      .filter((id: unknown) => id !== undefined && id !== null)
      .map((id: string | number) => Number(id))
      .filter((id: number) => !isNaN(id));

    const page = Number(searchParams.get("page")) || 1;
    const limit = 7;
    const offset = (page - 1) * limit;

    // -- Build filter condition --
    let whereClause;
    const includesNone = rawCategoryIds.includes("none");

    if (includesNone && categoryIds.length > 0) {
      whereClause = or(
        inArray(products.categoryId, categoryIds),
        isNull(products.categoryId)
      );
    } else if (includesNone) {
      whereClause = isNull(products.categoryId);
    } else if (categoryIds.length > 0) {
      whereClause = inArray(products.categoryId, categoryIds);
    }

    // -- Get total count --
    const totalResult = await db
      .select({ count: count() })
      .from(products)
      .where(whereClause);

    // -- Get filtered + paginated products --
    const pagedProducts = await db.query.products.findMany({
      where: whereClause,
      limit,
      offset,
      orderBy: [desc(products.id)],
      columns: {
        id: true,
        name: true,
        price: true,
        image: true,
      },
    });

    return NextResponse.json({
      products: pagedProducts,
      page,
      limit,
      total: totalResult[0].count,
    });
  } catch (error) {
    console.error("Error in /api/products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products." },
      { status: 500 }
    );
  }
}

