import { NextResponse, NextRequest } from 'next/server';
import { count, desc, ilike } from 'drizzle-orm';
import db from '../../../../db/drizzle';
import { recipes } from '../../../../db/schema';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const getAllRecords = searchParams.toString() === '' || (searchParams.get('_limit') === 'Infinity');

    let start = 0;
    let end = 9;
    let limit: number | undefined;
    let offset = 0;

    if (!getAllRecords) {
      const rangeParam = searchParams.get('range');
      if (rangeParam) {
        try {
          const parsedRange = JSON.parse(rangeParam);
          if (Array.isArray(parsedRange) && parsedRange.length === 2) {
            start = parseInt(parsedRange[0], 10);
            end = parseInt(parsedRange[1], 10);
          }
        } catch (e) {
          console.error('Failed to parse range parameter:', e);
        }
      }
      offset = start;
      limit = end - start + 1;
    }

    const filterParam = searchParams.get("filter");
    let searchQuery = "";

    if (filterParam) {
      try {
        const parsedFilter = JSON.parse(filterParam);
        if (typeof parsedFilter.q === "string") {
          searchQuery = parsedFilter.q.trim();
        }
      } catch (e) {
        console.error("Failed to parse filter parameter:", e);
      }
    }

    const whereClause = searchQuery
      ? ilike(recipes.titleVi, `%${searchQuery}%`)
      : undefined;

    const totalCountResult = await db
      .select({ count: count() })
      .from(recipes)
      .where(whereClause);
    const totalCount = totalCountResult[0].count;

    const fetchedRecipes = await db.query.recipes.findMany({
      where: whereClause,
      limit,
      offset,
      orderBy: [desc(recipes.id)],
    });

    const response = NextResponse.json(fetchedRecipes, { status: 200 });
    response.headers.set("X-Total-Count", totalCount.toString());

    const contentRangeStart = getAllRecords ? 0 : start;
    const contentRangeEnd = getAllRecords ? (totalCount > 0 ? totalCount - 1 : 0) : end;
    response.headers.set("Content-Range", `recipes ${contentRangeStart}-${contentRangeEnd}/${totalCount}`);

    return response;
  } catch (error) {
    console.error("API Error: Failed to retrieve recipes.", error);
    return NextResponse.json({ message: "Failed to retrieve recipes." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newRecipe = await db.insert(recipes).values(body).returning();
    return NextResponse.json(newRecipe[0], { status: 201 });
  } catch (error) {
    console.error("API Error: Failed to create recipe.", error);
    return NextResponse.json({ message: "Failed to create recipe." }, { status: 500 });
  }
}
