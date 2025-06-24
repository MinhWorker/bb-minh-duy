import { NextResponse, NextRequest } from 'next/server';
import { count, desc } from 'drizzle-orm'; // Used for `where` clause if needed
import db from '../../../../db/drizzle'; // Adjust path as per your project structure
import { products, productsToCertifications } from '../../../../db/schema'; // Adjust path as per your project structure


// --- GET /api/certifications ---
// Purpose: Fetch all certifications with pagination and sorting.
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
    console.log('--- certifications API GET Request ---');
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
      .from(products);
    const totalCount = totalCountResult[0].count;

    console.log('Total Count:', totalCount);

    // 2. Prepare findMany options
    const findManyOptions: { limit?: number; offset?: number; } = {}; // No orderBy property needed

    // Apply limit and offset ONLY if NOT in 'get all' mode
    if (!getAllRecords) {
      findManyOptions.limit = limit;
      findManyOptions.offset = offset;
    }

    const fetchedProducts = await db.query.products.findMany({
      limit: limit,
      offset: offset,
      orderBy: [desc(products.createdAt)],
      with: {
        // categories: true, // Fetch the related category
        certifications: {
          with: {
            certification: true, // Fetch the related certification details
          }
        }
      },
    });
    console.log('Returned certifications Count (actual data length):', fetchedProducts.length);

    // 3. Set the X-Total-Count header and Content-Range
    const response = NextResponse.json(fetchedProducts, { status: 200 });
    response.headers.set('X-Total-Count', totalCount.toString());

    // Content-Range should reflect the actual returned range if paginated, or all if not.
    const contentRangeStart = getAllRecords ? 0 : start;
    const contentRangeEnd = getAllRecords ? (totalCount > 0 ? totalCount - 1 : 0) : end;
    response.headers.set('Content-Range', `certifications ${contentRangeStart}-${contentRangeEnd}/${totalCount}`);

    return response;

  } catch (error) {
    console.error('API Error: Failed to retrieve certifications.', error);
    return NextResponse.json({ message: 'Failed to retrieve certifications.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      price,
      image,
      description,
      categoryId,
      certificationIds = [],
    } = body;

    if (!name || !price || !image || !categoryId) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const [newProduct] = await db
      .insert(products)
      .values({
        name,
        price,
        image,
        description,
        categoryId,
      })
      .returning();

    // Insert certifications into join table
    if (certificationIds.length > 0) {
      await db.insert(productsToCertifications).values(
        certificationIds.map((id: string) => ({
          productId: newProduct.id,
          certificationId: id,
        }))
      );
    }

    return NextResponse.json(newProduct, { status: 201 });
  } catch (err) {
    console.error("API Error: Failed to create product.", err);
    return NextResponse.json({ message: "Failed to create product." }, { status: 500 });
  }
}
