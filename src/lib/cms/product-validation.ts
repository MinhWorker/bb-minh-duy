import {
  InputValidationError, readCommercialStatus, readInteger, readNumericString, readObject, readPublishStatus,
  readRecordArray, readString, readStringArray, readUrl, slugify,
} from "./validation";

export function parseProductPayload(body: Record<string, unknown>, allowPublished: boolean) {
  const name = readString(body.name, "name", true) ?? "";
  const status = readPublishStatus(body.status);
  const marketplaceUrl = readUrl(body.marketplaceUrl, "marketplaceUrl");
  const commercialStatus = readCommercialStatus(body.commercialStatus);
  const slug = readString(body.slug, "slug") || slugify(name);
  if (!allowPublished && status === "published") throw new InputValidationError("Hãy tạo bản nháp, bổ sung bằng chứng rồi mới publish.");
  if (status === "published" && (commercialStatus !== "core" || !marketplaceUrl || !slug)) {
    throw new InputValidationError("Sản phẩm public phải là sản phẩm lõi, có slug và URL gian hàng.");
  }
  const gallery = readRecordArray(body.gallery, "gallery").map((item) => ({
    url: readUrl(item.url, "gallery.url", true) ?? "", alt: readString(item.alt, "gallery.alt", true) ?? "",
  }));
  return {
    name, slug, price: readNumericString(body.price, "price"), image: readString(body.image, "image", true) ?? "",
    imageAlt: readString(body.imageAlt, "imageAlt"), gallery, description: readString(body.description, "description"),
    unit: readString(body.unit, "unit", true) ?? "", specifications: readStringArray(body.specifications, "specifications"),
    storageInstructions: readString(body.storageInstructions, "storageInstructions"), usageInstructions: readString(body.usageInstructions, "usageInstructions"),
    marketplaceUrl, commercialStatus, status, sortOrder: readInteger(body.sortOrder, "sortOrder") ?? 0,
    seoTitle: readString(body.seoTitle, "seoTitle"), seoDescription: readString(body.seoDescription, "seoDescription"),
    publishedAt: status === "published" ? new Date() : null, ocopLevel: readInteger(body.ocopLevel, "ocopLevel"),
    isFeatured: readInteger(body.isFeatured, "isFeatured") ?? 0, traceabilityId: readString(body.traceabilityId, "traceabilityId"),
    categoryId: readInteger(body.categoryId, "categoryId"),
  };
}

export function readCertificationIds(value: unknown): number[] {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value)) throw new InputValidationError("certifications phải là mảng ID.");
  return value.map((item) => {
    const raw = typeof item === "object" && item !== null && !Array.isArray(item) ? readObject(item).certificationId : item;
    const id = readInteger(raw, "certificationId", true);
    if (!id) throw new InputValidationError("certificationId không hợp lệ.");
    return id;
  });
}
