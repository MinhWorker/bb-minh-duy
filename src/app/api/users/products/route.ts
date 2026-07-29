import { NextRequest, NextResponse } from "next/server";
import { listPublishedProducts } from "@/lib/cms/public-queries";

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const body = await req.json().catch(() => ({}));
    const rawCategoryIds = Array.isArray(body.categoryIds) ? body.categoryIds : [];
    const categoryIds = rawCategoryIds
      .map((id: unknown) => Number(id))
      .filter((id: number) => Number.isInteger(id));

    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = 7;
    const published = await listPublishedProducts();
    const filtered = categoryIds.length
      ? published.filter((product) => product.categoryId !== null && categoryIds.includes(product.categoryId))
      : published;
    const offset = (page - 1) * limit;

    return NextResponse.json({
      products: filtered.slice(offset, offset + limit),
      page,
      limit,
      total: filtered.length,
    });
  } catch {
    return NextResponse.json({ error: "Không thể tải danh mục sản phẩm." }, { status: 503 });
  }
}
