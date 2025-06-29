import { NextResponse, NextRequest } from 'next/server';
import { count, eq } from 'drizzle-orm'; // Used for `where` clause if needed
import db from '../../../../db/drizzle'; // Adjust path as per your project structure
import { categories } from '../../../../db/schema'; // Adjust path as per your project structure

// --- GET /api/categories ---
// Purpose: Fetch all categories with pagination and sorting.
// Access: Both admin and normal users.
/// --- GET /api/categories ---
// Purpose: Fetch all categories with pagination and sorting (React Admin format).
// Access: Both admin and normal users.
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    // --- Determine 'Get All' Mode ---
    // True if NO parameters are provided, OR if _limit=Infinity is explicitly sent.
    const getAllRecords = searchParams.toString() === '' || (searchParams.get('_limit') === 'Infinity');

    let start = 0;
    let end = 9; // Default range if parameters are present but no 'range'
    let limit: number | undefined; // Will be undefined if getAllRecords is true
    let offset = 0;

    // --- Pagination Logic (only if not in 'get all' mode) ---
    if (!getAllRecords) {
      const rangeParam = searchParams.get('range'); // e.g., "[0,4]"
      if (rangeParam) { // If 'range' parameter is present
        try {
          const parsedRange = JSON.parse(rangeParam);
          if (Array.isArray(parsedRange) && parsedRange.length === 2) {
            start = parseInt(parsedRange[0], 10);
            end = parseInt(parsedRange[1], 10);
          }
        } catch (e) {
          console.error('Failed to parse range parameter:', e);
          // Fallback to default range if parsing fails
          start = 0;
          end = 9;
        }
      }
      offset = start;
      limit = end - start + 1; // Calculate limit for pagination
    }

    // --- DEBUGGING LOGS ---
    console.log('--- Categories API GET Request ---');
    console.log('Received Query Params:', searchParams.toString());
    console.log(`Request has no params: ${searchParams.toString() === ''}`);
    console.log(`Get All Mode: ${getAllRecords}`);
    if (!getAllRecords) {
      console.log(`Parsed Range: start=${start}, end=${end}`);
      console.log(`Calculated Pagination: limit=${limit}, offset=${offset}`);
    }
    // --- END DEBUGGING LOGS ---


    // 1. Get total count for X-Total-Count header (always needed for the header)
    const totalCountResult = await db
      .select({ count: count() })
      .from(categories);
    const totalCount = totalCountResult[0].count;

    console.log('Total Count:', totalCount);

    // 2. Prepare findMany options
    const findManyOptions: { limit?: number; offset?: number; } = {}; // No orderBy property needed

    // Apply limit and offset ONLY if NOT in 'get all' mode
    if (!getAllRecords) {
      findManyOptions.limit = limit;
      findManyOptions.offset = offset;
    }

    const fetchedCategories = await db.query.categories.findMany(findManyOptions); // Removed orderBy

    console.log('Returned Categories Count (actual data length):', fetchedCategories.length);

    // 3. Set the X-Total-Count header and Content-Range
    const response = NextResponse.json(fetchedCategories, { status: 200 });
    response.headers.set('X-Total-Count', totalCount.toString());

    // Content-Range should reflect the actual returned range if paginated, or all if not.
    const contentRangeStart = getAllRecords ? 0 : start;
    const contentRangeEnd = getAllRecords ? (totalCount > 0 ? totalCount - 1 : 0) : end;
    response.headers.set('Content-Range', `categories ${contentRangeStart}-${contentRangeEnd}/${totalCount}`);

    return response;

  } catch (error) {
    console.error('API Error: Failed to retrieve categories.', error);
    return NextResponse.json({ message: 'Failed to retrieve categories.' }, { status: 500 });
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
