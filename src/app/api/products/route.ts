import { NextResponse, NextRequest } from 'next/server';
import { count, desc, ilike } from 'drizzle-orm'; // Used for `where` clause if needed
import db from '../../../../db/drizzle'; // Adjust path as per your project structure
import { products, productsToCertifications } from '../../../../db/schema'; // Adjust path as per your project structure

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
      ? ilike(products.name, `%${searchQuery}%`)
      : undefined;

    // --- Total Count (with filter if exists) ---
    const totalCountResult = await db
      .select({ count: count() })
      .from(products)
      .where(whereClause);
    const totalCount = totalCountResult[0].count;

    // --- Product Fetch ---
    const fetchedProducts = await db.query.products.findMany({
      where: whereClause,
      limit,
      offset,
      orderBy: [desc(products.id)],
      with: {
        certifications: {
          with: {
            certification: true,
          },
        },
      },
    });

    // --- Response with Headers ---
    const response = NextResponse.json(fetchedProducts, { status: 200 });
    response.headers.set("X-Total-Count", totalCount.toString());

    const contentRangeStart = getAllRecords ? 0 : start;
    const contentRangeEnd = getAllRecords ? (totalCount > 0 ? totalCount - 1 : 0) : end;
    response.headers.set("Content-Range", `certifications ${contentRangeStart}-${contentRangeEnd}/${totalCount}`);

    return response;
  } catch (error) {
    console.error("API Error: Failed to retrieve certifications.", error);
    return NextResponse.json({ message: "Failed to retrieve certifications." }, { status: 500 });
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
      unit
    } = body;

    if (!name || !price || !image || !categoryId) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const [newProduct] = await db
      .insert(products)
      .values({
        unit,
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
