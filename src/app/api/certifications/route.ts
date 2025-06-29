import { NextResponse, NextRequest } from 'next/server';
import { count, eq } from 'drizzle-orm'; // Used for `where` clause if needed
import db from '../../../../db/drizzle'; // Adjust path as per your project structure
import { certifications } from '../../../../db/schema'; // Adjust path as per your project structure
import cloudinary from '../../../../cloudinary.config';
import { extractPublicIdFromUrl } from '../../../../lib/upload';

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
      .from(certifications);
    const totalCount = totalCountResult[0].count;

    console.log('Total Count:', totalCount);

    // 2. Prepare findMany options
    const findManyOptions: { limit?: number; offset?: number; } = {}; // No orderBy property needed

    // Apply limit and offset ONLY if NOT in 'get all' mode
    if (!getAllRecords) {
      findManyOptions.limit = limit;
      findManyOptions.offset = offset;
    }

    const fetchedcertifications = await db.query.certifications.findMany(findManyOptions); // Removed orderBy

    console.log('Returned certifications Count (actual data length):', fetchedcertifications.length);

    // 3. Set the X-Total-Count header and Content-Range
    const response = NextResponse.json(fetchedcertifications, { status: 200 });
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
{/* eslint-disable  @typescript-eslint/no-explicit-any */ }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();


    // Validate incoming data
    // Expect 'name' for the certification and 'image' which will be the Cloudinary public_id
    if (!body.name || !body.image) {
      return NextResponse.json({ message: 'Missing required fields: name and image.' }, { status: 400 });
    }

    const existingCertification = await db.query.certifications.findFirst({
      where: eq(certifications.name, body.name)
    })

    if (existingCertification) {
      const publicId = extractPublicIdFromUrl(body.image);

      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }

      return NextResponse.json(
        { message: `Certification with name ${body.name} already exists` },
        { status: 409 }
      )
    }

    // Insert the new certification into the database
    // Drizzle will generate UUID for 'id' as per your schema defaultRandom
    const newCertification = await db.insert(certifications).values({
      name: body.name,
      image: body.image // This is the Cloudinary public_id received from dataProvider
    }).returning(); // Use .returning() to get the newly inserted record

    // React Admin expects the created record back in the response
    return NextResponse.json(newCertification[0], { status: 201 });

  }
  catch (error: any) {
    console.error('API Error: Failed to create certification.', error);
    return NextResponse.json({ message: 'Failed to create certification.' }, { status: 500 });
  }
}

