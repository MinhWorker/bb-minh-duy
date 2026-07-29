import {
  COMMERCIAL_STATUSES,
  EVIDENCE_KINDS,
  PUBLISH_STATUSES,
  SITE_PAGE_KEYS,
  VERIFICATION_STATUSES,
} from "./types";

export class InputValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InputValidationError";
  }
}

export function readObject(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new InputValidationError("Dữ liệu gửi lên phải là một object JSON.");
  }
  return value as Record<string, unknown>;
}

export function readString(value: unknown, field: string, required = false): string | null {
  if (value === undefined || value === null || value === "") {
    if (required) {
      throw new InputValidationError(`${field} là trường bắt buộc.`);
    }
    return null;
  }
  if (typeof value !== "string") {
    throw new InputValidationError(`${field} phải là chuỗi.`);
  }
  const normalized = value.trim();
  if (required && normalized.length === 0) {
    throw new InputValidationError(`${field} là trường bắt buộc.`);
  }
  return normalized;
}

export function readInteger(value: unknown, field: string, required = false): number | null {
  if (value === undefined || value === null || value === "") {
    if (required) {
      throw new InputValidationError(`${field} là trường bắt buộc.`);
    }
    return null;
  }
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isSafeInteger(parsed)) {
    throw new InputValidationError(`${field} phải là số nguyên hợp lệ.`);
  }
  return parsed;
}

export function readNumericString(value: unknown, field: string): string | null {
  if (value === undefined || value === null || value === "") return null;
  const candidate = typeof value === "number" ? value.toString() : readString(value, field, true);
  if (!candidate || !Number.isFinite(Number(candidate)) || Number(candidate) < 0) {
    throw new InputValidationError(`${field} phải là số không âm.`);
  }
  return candidate;
}

export function readBoolean(value: unknown, field: string): boolean {
  if (typeof value !== "boolean") {
    throw new InputValidationError(`${field} phải là boolean.`);
  }
  return value;
}

export function readStringArray(value: unknown, field: string): string[] {
  if (value === undefined || value === null || value === "") {
    return [];
  }
  const candidate = typeof value === "string" ? safelyParseJson(value, field) : value;
  if (!Array.isArray(candidate) || !candidate.every((item) => typeof item === "string")) {
    throw new InputValidationError(`${field} phải là mảng chuỗi.`);
  }
  return candidate.map((item) => item.trim()).filter(Boolean);
}

export function readRecord(value: unknown, field: string): Record<string, unknown> {
  if (value === undefined || value === null || value === "") {
    return {};
  }
  const candidate = typeof value === "string" ? safelyParseJson(value, field) : value;
  return readObject(candidate);
}

export function readRecordArray(value: unknown, field: string): Array<Record<string, unknown>> {
  if (value === undefined || value === null || value === "") {
    return [];
  }
  const candidate = typeof value === "string" ? safelyParseJson(value, field) : value;
  if (!Array.isArray(candidate)) {
    throw new InputValidationError(`${field} phải là mảng JSON.`);
  }
  return candidate.map(readObject);
}

export function readDate(value: unknown, field: string): Date | null {
  const input = readString(value, field);
  if (!input) {
    return null;
  }
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) {
    throw new InputValidationError(`${field} phải là ngày hợp lệ.`);
  }
  return date;
}

export function readUrl(value: unknown, field: string, required = false): string | null {
  const input = readString(value, field, required);
  if (!input) {
    return null;
  }
  try {
    const url = new URL(input);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      throw new Error("unsupported protocol");
    }
    return url.toString();
  } catch {
    throw new InputValidationError(`${field} phải là URL HTTP(S) hợp lệ.`);
  }
}

export function readPublishStatus(value: unknown): "draft" | "published" {
  return readChoice(value ?? "draft", "status", PUBLISH_STATUSES);
}

export function readCommercialStatus(value: unknown): "core" | "experimental" | "research" {
  return readChoice(value ?? "core", "commercialStatus", COMMERCIAL_STATUSES);
}

export function readSitePageKey(value: unknown): "home" | "about" | "contact" {
  return readChoice(value, "pageKey", SITE_PAGE_KEYS);
}

export function readEvidenceKind(value: unknown): "official-document" | "internal-report" | "owner-confirmation" {
  return readChoice(value, "evidenceKind", EVIDENCE_KINDS);
}

export function readVerificationStatus(value: unknown): "verified" | "internal-only" | "pending" | "rejected" {
  return readChoice(value ?? "pending", "verificationStatus", VERIFICATION_STATUSES);
}

export function slugify(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function readChoice<const T extends readonly string[]>(value: unknown, field: string, choices: T): T[number] {
  const candidate = readString(value, field, true);
  if (!candidate || !choices.includes(candidate)) {
    throw new InputValidationError(`${field} không thuộc tập giá trị cho phép.`);
  }
  return candidate as T[number];
}

function safelyParseJson(value: string, field: string): unknown {
  try {
    return JSON.parse(value) as unknown;
  } catch {
    throw new InputValidationError(`${field} phải là JSON hợp lệ.`);
  }
}
