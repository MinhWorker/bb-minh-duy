import { count, desc, eq, ilike } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import db from "../../../../db/drizzle";
import { products, productsToCertifications } from "../../../../db/schema";
import { apiError, getSearchQuery, listResponse, parseListRange, requireAdmin } from "@/lib/cms/api";
import { parseProductPayload, readCertificationIds } from "@/lib/cms/product-validation";
import { readObject } from "@/lib/cms/validation";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const unauthorized = await requireAdmin(req); if (unauthorized) return unauthorized;
  try {
    const range = parseListRange(req); const query = getSearchQuery(req);
    const where = query ? ilike(products.name, `%${query}%`) : undefined;
    const [{ value }] = await db.select({ value: count() }).from(products).where(where);
    const records = await db.query.products.findMany({
      where, limit: range.limit, offset: range.offset, orderBy: [desc(products.id)],
      with: { certifications: { with: { certification: true } } },
    });
    return listResponse("products", records, value, range);
  } catch (error) { return apiError(error, "Failed to list products"); }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const unauthorized = await requireAdmin(req); if (unauthorized) return unauthorized;
  try {
    const body = readObject(await req.json());
    const values = parseProductPayload(body, false);
    const duplicate = await db.query.products.findFirst({ where: eq(products.slug, values.slug) });
    if (duplicate) return NextResponse.json({ message: "Slug sản phẩm đã tồn tại." }, { status: 409 });
    const [record] = await db.insert(products).values(values).returning();
    const certificationIds = readCertificationIds(body.certificationIds ?? body.certifications);
    if (certificationIds.length) await db.insert(productsToCertifications).values(certificationIds.map((certificationId) => ({ productId: record.id, certificationId })));
    return NextResponse.json(record, { status: 201 });
  } catch (error) { return apiError(error, "Failed to create product"); }
}
