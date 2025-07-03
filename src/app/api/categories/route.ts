import { NextResponse, NextRequest } from 'next/server';
import { count, desc, eq, ilike } from 'drizzle-orm'; // Used for `where` clause if needed
import db from '../../../../db/drizzle'; // Adjust path as per your project structure
import { categories } from '../../../../db/schema'; // Adjust path as per your project structure

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    // --- Determine 'Get All' Mode ---
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

    // --- Filter/Search Support ---
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
      ? ilike(categories.name, `%${searchQuery}%`)
      : undefined;

    // --- Total Count with Filter Applied ---
    const totalCountResult = await db
      .select({ count: count() })
      .from(categories)
      .where(whereClause);
    const totalCount = totalCountResult[0].count;

    // --- Fetch Data ---
    const fetchedCategories = await db.query.categories.findMany({
      where: whereClause,
      limit,
      offset,
      orderBy: (desc(categories.id)),
    });

    const response = NextResponse.json(fetchedCategories, { status: 200 });

    response.headers.set("X-Total-Count", totalCount.toString());
    const contentRangeStart = getAllRecords ? 0 : start;
    const contentRangeEnd = getAllRecords ? (totalCount > 0 ? totalCount - 1 : 0) : end;
    response.headers.set("Content-Range", `categories ${contentRangeStart}-${contentRangeEnd}/${totalCount}`);

    return response;

  } catch (error) {
    console.error("API Error: Failed to retrieve categories.", error);
    return NextResponse.json({ message: "Failed to retrieve categories." }, { status: 500 });
  }
}

// Access: Admin only (this is enforced by your `middleware.ts`).
// The request will only reach this handler if a valid admin session exists.
export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();

    // 1. Input Validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { message: 'Category name is required and must be a non-empty string.' },
        { status: 400 } // Bad Request
      );
    }

    const trimmedName = name.trim();

    // 2. Check for Existing Category (to provide a more specific error than DB unique constraint)
    const existingCategory = await db.query.categories.findFirst({
      where: eq(categories.name, trimmedName),
    });

    if (existingCategory) {
      return NextResponse.json(
        { message: `Category with name '${trimmedName}' already exists.` },
        { status: 409 } // Conflict
      );
    }

    // 3. Insert New Category
    const [newCategory] = await db.insert(categories).values({ name: trimmedName }).returning();

    // 4. Return Success Response
    return NextResponse.json(newCategory, { status: 201 }); // 201 Created
  } catch (error) {
    console.error('API Error: Failed to create category.', error);
    // Generic 500 for other unexpected database or server errors
    return NextResponse.json({ message: 'Failed to create category due to a server error.' }, { status: 500 });
  }
}
