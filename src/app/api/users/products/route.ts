import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../db/drizzle";
import { count, desc, inArray, isNull, or } from "drizzle-orm";
import { products } from "../../../../../db/schema";

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const body = await req.json();
    const categoryIds: string[] = body.categoryIds ?? [];

    const page = Number(searchParams.get("page")) || 1;
    const limit = 7;
    const offset = (page - 1) * limit;

    // -- Build filter condition --
    let whereClause;
    if (categoryIds.length > 0) {
      const includesNone = categoryIds.includes("none");
      const filteredIds = categoryIds.filter((id) => id !== "none");

      if (includesNone && filteredIds.length > 0) {
        whereClause = or(
          inArray(products.categoryId, filteredIds),
          isNull(products.categoryId)
        );
      } else if (includesNone) {
        whereClause = isNull(products.categoryId);
      } else {
        whereClause = inArray(products.categoryId, filteredIds);
      }
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
      orderBy: [desc(products.createdAt)],
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
