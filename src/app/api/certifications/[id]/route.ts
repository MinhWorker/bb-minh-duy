import { NextRequest, NextResponse } from "next/server";
import { certifications, } from "../../../../../db/schema";
import db from "../../../../../db/drizzle";
import { eq } from "drizzle-orm";
import cloudinary from "../../../../../cloudinary.config";
import { extractPublicIdFromUrl } from "../../../../../lib/upload";

// Access: Admin and normal users.
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const certificationId = url.pathname.split('/').pop();

    if (!certificationId) {
      return NextResponse.json({ message: 'Category ID is required.' }, { status: 400 });
    }

    const certification = await db.query.certifications.findFirst({
      where: eq(certifications.id, certificationId),
    });

    if (!certification) {
      return NextResponse.json({ message: `Category with ID '${certificationId}' not found.` }, { status: 404 });
    }

    return NextResponse.json(certification, { status: 200 });
  } catch (error) {
    console.error('API Error: Failed to retrieve category by ID.', error);
    return NextResponse.json({ message: 'Failed to retrieve category.' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
) {
  try {
    const url = new URL(req.url);
    const certificationId = url.pathname.split('/').pop();

    if (!certificationId) {
      return NextResponse.json({ message: 'Certification ID is required' }, { status: 400 });
    }

    const body = await req.json();
    const { name, image } = body;

    if (!name || !image) {
      return NextResponse.json({ message: "Missing 'name' or 'image" }, { status: 400 });
    }

    // Fetch the existing certification
    const record = await db.query.certifications.findFirst({
      where: eq(certifications.id, certificationId)
    })

    if (!record) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const existingCertifcation = await db.query.certifications.findFirst({
      where: eq(certifications.name, name)
    });

    if (existingCertifcation && existingCertifcation.id !== certificationId) {
      const newPublicId = extractPublicIdFromUrl(image);

      if (newPublicId) {
        await cloudinary.uploader.destroy(newPublicId);
      }

      return NextResponse.json({ message: `Certification with name '${name}' already exists.` }, { status: 409 })
    }

    const current = record;

    let newImage = current.image;

    // If new image URL is provided, delete the old one and update
    if (image && image !== current.image) {
      const oldPublicId = extractPublicIdFromUrl(current.image);
      if (oldPublicId) {
        await cloudinary.uploader.destroy(oldPublicId);
      }
      newImage = image;
    }

    // Update record
    const updated = await db
      .update(certifications)
      .set({ name, image: newImage })
      .where(eq(certifications.id, certificationId))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json({ message: 'Certification not found or no changes applied.' }, { status: 404 });
    }

    return NextResponse.json(updated[0], { status: 200 });

  } catch (error) {
    console.error(`API Error: `, error);
    return NextResponse.json({ message: 'Failed to update certification.' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
) {
  try {
    const url = new URL(req.url);
    const certificationId = url.pathname.split('/').pop();

    if (!certificationId) {
      return NextResponse.json({ message: 'Certification ID is required' }, { status: 400 })
    }

    // 1. Look up the certification
    const record = await db.query.certifications.findFirst({
      where: eq(certifications.id, certificationId)
    })

    if (!record) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const certification = record;
    const imageUrl = certification.image;

    // 2. Extract public_id from image URL
    const publicId = extractPublicIdFromUrl(imageUrl);

    // 3. Delete image from Cloudinary
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    // 4. Delete from database
    await db.delete(certifications).where(eq(certifications.id, certificationId));

    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting certification:", error);
    return NextResponse.json({ message: "Failed to delete certification" }, { status: 500 });
  }
}
