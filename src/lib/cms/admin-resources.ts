import { asc, count, desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import db from "../../../db/drizzle";
import { claimRegistry, mediaManifest, news, sitePages, siteSettings } from "../../../db/schema";
import { apiError, listResponse, parseId, parseListRange, requireAdmin } from "./api";
import {
  readBoolean, readDate, readEvidenceKind, readInteger, readObject, readPublishStatus,
  InputValidationError, readRecord, readRecordArray, readSitePageKey, readString, readUrl, readVerificationStatus, slugify,
} from "./validation";

export const ADMIN_RESOURCES = ["siteSettings", "sitePages", "news", "claimRegistry", "mediaManifest"] as const;
export type AdminResource = (typeof ADMIN_RESOURCES)[number];

export async function listAdminResource(req: NextRequest, resource: AdminResource): Promise<NextResponse> {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;
  try {
    const range = parseListRange(req);
    switch (resource) {
      case "siteSettings": {
        const [{ value }] = await db.select({ value: count() }).from(siteSettings);
        const records = await db.select().from(siteSettings).orderBy(desc(siteSettings.id)).limit(range.limit).offset(range.offset);
        return listResponse(resource, records, value, range);
      }
      case "sitePages": {
        const [{ value }] = await db.select({ value: count() }).from(sitePages);
        const records = await db.select().from(sitePages).orderBy(asc(sitePages.pageKey)).limit(range.limit).offset(range.offset);
        return listResponse(resource, records, value, range);
      }
      case "news": {
        const [{ value }] = await db.select({ value: count() }).from(news);
        const records = await db.select().from(news).orderBy(desc(news.id)).limit(range.limit).offset(range.offset);
        return listResponse(resource, records, value, range);
      }
      case "claimRegistry": {
        const [{ value }] = await db.select({ value: count() }).from(claimRegistry);
        const records = await db.select().from(claimRegistry).orderBy(desc(claimRegistry.id)).limit(range.limit).offset(range.offset);
        return listResponse(resource, records, value, range);
      }
      case "mediaManifest": {
        const [{ value }] = await db.select({ value: count() }).from(mediaManifest);
        const records = await db.select().from(mediaManifest).orderBy(desc(mediaManifest.id)).limit(range.limit).offset(range.offset);
        return listResponse(resource, records, value, range);
      }
    }
  } catch (error) {
    return apiError(error, `Failed to list ${resource}`);
  }
}

export async function createAdminResource(req: NextRequest, resource: AdminResource): Promise<NextResponse> {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;
  try {
    const body = readObject(await req.json());
    switch (resource) {
      case "siteSettings": {
        const [record] = await db.insert(siteSettings).values(parseSiteSettings(body)).returning();
        return NextResponse.json(record, { status: 201 });
      }
      case "sitePages": {
        const [record] = await db.insert(sitePages).values(parseSitePage(body)).returning();
        return NextResponse.json(record, { status: 201 });
      }
      case "news": {
        const [record] = await db.insert(news).values(parseNews(body)).returning();
        return NextResponse.json(record, { status: 201 });
      }
      case "claimRegistry": {
        const [record] = await db.insert(claimRegistry).values(parseClaim(body)).returning();
        return NextResponse.json(record, { status: 201 });
      }
      case "mediaManifest": {
        const [record] = await db.insert(mediaManifest).values(parseMedia(body)).returning();
        return NextResponse.json(record, { status: 201 });
      }
    }
  } catch (error) {
    return apiError(error, `Failed to create ${resource}`);
  }
}

export async function getAdminResource(req: NextRequest, resource: AdminResource, rawId: string): Promise<NextResponse> {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;
  try {
    const id = parseId(rawId);
    const record = await findById(resource, id);
    return record ? NextResponse.json(record) : NextResponse.json({ message: "Không tìm thấy dữ liệu." }, { status: 404 });
  } catch (error) {
    return apiError(error, `Failed to get ${resource}`);
  }
}

export async function updateAdminResource(req: NextRequest, resource: AdminResource, rawId: string): Promise<NextResponse> {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;
  try {
    const id = parseId(rawId);
    const body = readObject(await req.json());
    const updatedAt = new Date();
    switch (resource) {
      case "siteSettings": {
        const [record] = await db.update(siteSettings).set({ ...parseSiteSettings(body), updatedAt }).where(eq(siteSettings.id, id)).returning();
        return itemResponse(record);
      }
      case "sitePages": {
        const [record] = await db.update(sitePages).set({ ...parseSitePage(body), updatedAt }).where(eq(sitePages.id, id)).returning();
        return itemResponse(record);
      }
      case "news": {
        const [record] = await db.update(news).set({ ...parseNews(body), updatedAt }).where(eq(news.id, id)).returning();
        return itemResponse(record);
      }
      case "claimRegistry": {
        const [record] = await db.update(claimRegistry).set({ ...parseClaim(body), updatedAt }).where(eq(claimRegistry.id, id)).returning();
        return itemResponse(record);
      }
      case "mediaManifest": {
        const [record] = await db.update(mediaManifest).set({ ...parseMedia(body), updatedAt }).where(eq(mediaManifest.id, id)).returning();
        return itemResponse(record);
      }
    }
  } catch (error) {
    return apiError(error, `Failed to update ${resource}`);
  }
}

export async function deleteAdminResource(req: NextRequest, resource: AdminResource, rawId: string): Promise<NextResponse> {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;
  try {
    const id = parseId(rawId);
    switch (resource) {
      case "siteSettings": return itemResponse((await db.delete(siteSettings).where(eq(siteSettings.id, id)).returning())[0]);
      case "sitePages": return itemResponse((await db.delete(sitePages).where(eq(sitePages.id, id)).returning())[0]);
      case "news": return itemResponse((await db.delete(news).where(eq(news.id, id)).returning())[0]);
      case "claimRegistry": return itemResponse((await db.delete(claimRegistry).where(eq(claimRegistry.id, id)).returning())[0]);
      case "mediaManifest": return itemResponse((await db.delete(mediaManifest).where(eq(mediaManifest.id, id)).returning())[0]);
    }
  } catch (error) {
    return apiError(error, `Failed to delete ${resource}`);
  }
}

async function findById(resource: AdminResource, id: number): Promise<unknown> {
  switch (resource) {
    case "siteSettings": return (await db.select().from(siteSettings).where(eq(siteSettings.id, id)).limit(1))[0];
    case "sitePages": return (await db.select().from(sitePages).where(eq(sitePages.id, id)).limit(1))[0];
    case "news": return (await db.select().from(news).where(eq(news.id, id)).limit(1))[0];
    case "claimRegistry": return (await db.select().from(claimRegistry).where(eq(claimRegistry.id, id)).limit(1))[0];
    case "mediaManifest": return (await db.select().from(mediaManifest).where(eq(mediaManifest.id, id)).limit(1))[0];
  }
}

function itemResponse(record: unknown): NextResponse {
  return record ? NextResponse.json(record) : NextResponse.json({ message: "Không tìm thấy dữ liệu." }, { status: 404 });
}

function parseSiteSettings(body: Record<string, unknown>) {
  const socialLinks = readRecord(body.socialLinks, "socialLinks");
  const normalizedLinks = Object.fromEntries(Object.entries(socialLinks).map(([key, value]) => [key, readUrl(value, `socialLinks.${key}`, true) ?? ""]));
  return {
    cooperativeName: readString(body.cooperativeName, "cooperativeName", true) ?? "",
    logo: readString(body.logo, "logo"), phone: readString(body.phone, "phone"), zalo: readString(body.zalo, "zalo"),
    email: readString(body.email, "email"), address: readString(body.address, "address"),
    mapUrl: readUrl(body.mapUrl, "mapUrl"), marketplaceUrl: readUrl(body.marketplaceUrl, "marketplaceUrl"),
    socialLinks: normalizedLinks, defaultSeoTitle: readString(body.defaultSeoTitle, "defaultSeoTitle"),
    defaultSeoDescription: readString(body.defaultSeoDescription, "defaultSeoDescription"),
  };
}

function parseSitePage(body: Record<string, unknown>) {
  const status = readPublishStatus(body.status);
  return {
    pageKey: readSitePageKey(body.pageKey), title: readString(body.title, "title", true) ?? "",
    hero: readRecord(body.hero, "hero"), sections: readRecordArray(body.sections, "sections"), status,
    seoTitle: readString(body.seoTitle, "seoTitle"), seoDescription: readString(body.seoDescription, "seoDescription"),
    publishedAt: status === "published" ? readDate(body.publishedAt, "publishedAt") ?? new Date() : null,
  };
}

function parseNews(body: Record<string, unknown>) {
  const title = readString(body.title, "title", true) ?? "";
  const status = readPublishStatus(body.status);
  return {
    slug: readString(body.slug, "slug") || slugify(title), title, summary: readString(body.summary, "summary"),
    content: readString(body.content, "content", true) ?? "", image: readString(body.image, "image"),
    imageAlt: readString(body.imageAlt, "imageAlt"), status, sortOrder: readInteger(body.sortOrder, "sortOrder") ?? 0,
    seoTitle: readString(body.seoTitle, "seoTitle"), seoDescription: readString(body.seoDescription, "seoDescription"),
    publishedAt: status === "published" ? readDate(body.publishedAt, "publishedAt") ?? new Date() : null,
  };
}

function parseClaim(body: Record<string, unknown>) {
  const verificationStatus = readVerificationStatus(body.verificationStatus);
  const evidenceKind = readEvidenceKind(body.evidenceKind);
  if (verificationStatus === "verified" && evidenceKind !== "official-document" && body.subjectType === "certification") {
    throw new InputValidationError("Chứng nhận chỉ được verified bằng official-document.");
  }
  return {
    claim: readString(body.claim, "claim", true) ?? "", subjectType: readString(body.subjectType, "subjectType"),
    subjectId: readInteger(body.subjectId, "subjectId"), evidenceKind,
    sourceReference: readString(body.sourceReference, "sourceReference", true) ?? "",
    sourceDate: readDate(body.sourceDate, "sourceDate"), sourceLocation: readString(body.sourceLocation, "sourceLocation"),
    verificationStatus, reviewedBy: readString(body.reviewedBy, "reviewedBy"),
    reviewedAt: verificationStatus === "pending" ? null : readDate(body.reviewedAt, "reviewedAt") ?? new Date(),
    conflictNotes: readString(body.conflictNotes, "conflictNotes"),
  };
}

function parseMedia(body: Record<string, unknown>) {
  const mediaKind = readString(body.mediaKind ?? "photo", "mediaKind", true);
  if (mediaKind !== "photo") throw new InputValidationError("Phiên bản này chỉ cho phép ảnh.");
  return {
    sourcePath: readString(body.sourcePath, "sourcePath", true) ?? "", assetUrl: readUrl(body.assetUrl, "assetUrl"),
    mediaKind, provenance: readString(body.provenance, "provenance", true) ?? "",
    usageRights: readString(body.usageRights, "usageRights"), altText: readString(body.altText, "altText", true) ?? "",
    displayRole: readString(body.displayRole, "displayRole"), isApproved: readBoolean(body.isApproved ?? false, "isApproved"),
  };
}
