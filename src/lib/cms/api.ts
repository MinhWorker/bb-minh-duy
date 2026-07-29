import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "../../../lib/auth";
import { InputValidationError } from "./validation";

export type ListRange = { start: number; end: number; limit: number; offset: number };

export function parseId(value: string): number {
  const id = Number(value);
  if (!Number.isSafeInteger(id) || id < 1) {
    throw new InputValidationError("ID phải là số nguyên dương.");
  }
  return id;
}

export function parseListRange(req: NextRequest): ListRange {
  const range = req.nextUrl.searchParams.get("range");
  if (!range || req.nextUrl.searchParams.get("_limit") === "Infinity") {
    return { start: 0, end: 9999, limit: 10_000, offset: 0 };
  }
  try {
    const parsed = JSON.parse(range) as unknown;
    if (!Array.isArray(parsed) || parsed.length !== 2) {
      throw new Error("invalid range");
    }
    const start = Number(parsed[0]);
    const end = Number(parsed[1]);
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start < 0 || end < start || end - start > 99) {
      throw new Error("invalid range");
    }
    return { start, end, limit: end - start + 1, offset: start };
  } catch {
    throw new InputValidationError("range không hợp lệ.");
  }
}

export function getSearchQuery(req: NextRequest): string {
  const filter = req.nextUrl.searchParams.get("filter");
  if (!filter) {
    return "";
  }
  try {
    const parsed = JSON.parse(filter) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return "";
    }
    const query = (parsed as Record<string, unknown>).q;
    return typeof query === "string" ? query.trim().slice(0, 200) : "";
  } catch {
    return "";
  }
}

export function listResponse(resource: string, records: unknown[], total: number, range: ListRange): NextResponse {
  const response = NextResponse.json(records);
  const end = records.length > 0 ? range.start + records.length - 1 : range.start;
  response.headers.set("X-Total-Count", total.toString());
  response.headers.set("Content-Range", `${resource} ${range.start}-${end}/${total}`);
  return response;
}

export async function requireAdmin(req: NextRequest): Promise<NextResponse | null> {
  const user = await getSessionUser(req);
  return user ? null : NextResponse.json({ message: "Hết phiên đăng nhập, vui lòng đăng nhập lại." }, { status: 401 });
}

export function apiError(error: unknown, context: string): NextResponse {
  if (error instanceof InputValidationError) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
  console.error(context, error);
  return NextResponse.json({ message: "Không thể xử lý yêu cầu." }, { status: 500 });
}
