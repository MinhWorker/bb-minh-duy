import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../db/drizzle";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  const categories = await db.query.categories.findMany();

  return NextResponse.json({ categories }, { status: 200 })
}
