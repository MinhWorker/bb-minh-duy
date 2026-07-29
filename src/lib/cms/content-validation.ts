import { readInteger, readPublishStatus, readString, readStringArray, slugify } from "./validation";

export function parseRecipePayload(body: Record<string, unknown>) {
  const titleVi = readString(body.titleVi, "titleVi", true) ?? ""; const status = readPublishStatus(body.status);
  return {
    titleVi, titleEn: readString(body.titleEn, "titleEn"), slug: readString(body.slug, "slug") || slugify(titleVi),
    descriptionVi: readString(body.descriptionVi, "descriptionVi"), descriptionEn: readString(body.descriptionEn, "descriptionEn"),
    image: readString(body.image, "image", true) ?? "", imageAlt: readString(body.imageAlt, "imageAlt"), videoUrl: null,
    difficulty: readString(body.difficulty, "difficulty"), prepTime: readString(body.prepTime, "prepTime"), cookTime: readString(body.cookTime, "cookTime"),
    servings: readString(body.servings, "servings"), ingredients: readStringArray(body.ingredients, "ingredients"), steps: readStringArray(body.steps, "steps"),
    contentVi: readString(body.contentVi, "contentVi", true) ?? "", contentEn: readString(body.contentEn, "contentEn"),
    status, sortOrder: readInteger(body.sortOrder, "sortOrder") ?? 0, seoTitle: readString(body.seoTitle, "seoTitle"),
    seoDescription: readString(body.seoDescription, "seoDescription"), publishedAt: status === "published" ? new Date() : null,
  };
}

export function parseStoryPayload(body: Record<string, unknown>) {
  const nameVi = readString(body.nameVi, "nameVi", true) ?? ""; const status = readPublishStatus(body.status);
  return {
    nameVi, nameEn: readString(body.nameEn, "nameEn"), slug: readString(body.slug, "slug") || slugify(nameVi),
    roleVi: readString(body.roleVi, "roleVi"), roleEn: readString(body.roleEn, "roleEn"),
    quoteVi: readString(body.quoteVi, "quoteVi", true) ?? "", quoteEn: readString(body.quoteEn, "quoteEn"),
    contentVi: readString(body.contentVi, "contentVi"), contentEn: readString(body.contentEn, "contentEn"),
    image: readString(body.image, "image", true) ?? "", imageAlt: readString(body.imageAlt, "imageAlt"),
    order: readInteger(body.order, "order") ?? 0, status, sortOrder: readInteger(body.sortOrder, "sortOrder") ?? 0,
    seoTitle: readString(body.seoTitle, "seoTitle"), seoDescription: readString(body.seoDescription, "seoDescription"),
    publishedAt: status === "published" ? new Date() : null,
  };
}
