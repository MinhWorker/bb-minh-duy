import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../db/drizzle";
import { certifications, claimRegistry, products, productsToCertifications } from "../../../../../db/schema";
import { apiError, parseId, requireAdmin } from "@/lib/cms/api";
import { parseProductPayload, readCertificationIds } from "@/lib/cms/product-validation";
import { InputValidationError, readObject } from "@/lib/cms/validation";
type Context = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, context: Context): Promise<NextResponse> {
  const unauthorized = await requireAdmin(req); if (unauthorized) return unauthorized;
  try {
    const id = parseId((await context.params).id);
    const record = await db.query.products.findFirst({ where: eq(products.id, id) });
    if (!record) return NextResponse.json({ message: "Không tìm thấy sản phẩm." }, { status: 404 });
    const links = await db.select({ id: certifications.id }).from(productsToCertifications)
      .innerJoin(certifications, eq(productsToCertifications.certificationId, certifications.id))
      .where(eq(productsToCertifications.productId, id));
    return NextResponse.json({ ...record, certifications: links.map((item) => item.id) });
  } catch (error) { return apiError(error, "Failed to get product"); }
}

export async function PUT(req: NextRequest, context: Context): Promise<NextResponse> {
  const unauthorized = await requireAdmin(req); if (unauthorized) return unauthorized;
  try {
    const id = parseId((await context.params).id); const body = readObject(await req.json());
    const values = parseProductPayload(body, true);
    if (values.status === "published") await assertCommercialEvidence(id);
    const duplicate = await db.query.products.findFirst({ where: eq(products.slug, values.slug) });
    if (duplicate && duplicate.id !== id) return NextResponse.json({ message: "Slug sản phẩm đã tồn tại." }, { status: 409 });
    const [record] = await db.update(products).set({ ...values, updatedAt: new Date() }).where(eq(products.id, id)).returning();
    if (!record) return NextResponse.json({ message: "Không tìm thấy sản phẩm." }, { status: 404 });
    await db.delete(productsToCertifications).where(eq(productsToCertifications.productId, id));
    const certificationIds = readCertificationIds(body.certificationIds ?? body.certifications);
    if (certificationIds.length) await db.insert(productsToCertifications).values(certificationIds.map((certificationId) => ({ productId: id, certificationId })));
    return NextResponse.json(record);
  } catch (error) { return apiError(error, "Failed to update product"); }
}

export async function DELETE(req: NextRequest, context: Context): Promise<NextResponse> {
  const unauthorized = await requireAdmin(req); if (unauthorized) return unauthorized;
  try {
    const id = parseId((await context.params).id);
    const [record] = await db.delete(products).where(eq(products.id, id)).returning();
    return record ? NextResponse.json(record) : NextResponse.json({ message: "Không tìm thấy sản phẩm." }, { status: 404 });
  } catch (error) { return apiError(error, "Failed to delete product"); }
}

async function assertCommercialEvidence(productId: number): Promise<void> {
  const evidence = await db.select({ kind: claimRegistry.evidenceKind }).from(claimRegistry).where(and(
    eq(claimRegistry.subjectType, "product"), eq(claimRegistry.subjectId, productId), eq(claimRegistry.verificationStatus, "verified"),
  ));
  const kinds = new Set(evidence.map((item) => item.kind));
  if (!kinds.has("internal-report") || !kinds.has("owner-confirmation")) {
    throw new InputValidationError("Sản phẩm cần claim đã kiểm chứng từ tài liệu bán hàng và xác nhận của chủ HTX trước khi publish.");
  }
}
