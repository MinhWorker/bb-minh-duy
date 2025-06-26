import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../db/drizzle";
import { count, desc } from "drizzle-orm";
import { products } from "../../../../../db/schema";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const page = Number(searchParams.get("page")) || 1;
  const limit = 7;
  const offset = (page - 1) * limit;

  const totalCountResult = await db
    .select({ count: count() })
    .from(products);

  const pagedProducts = await db.query.products.findMany({
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
    total: totalCountResult[0].count
  });
}
