import { NextRequest, NextResponse } from "next/server";
import { certifications } from "../../../../../db/schema";
import db from "../../../../../db/drizzle";
import { eq } from "drizzle-orm";
import cloudinary from "../../../../../cloudinary.config";
import { extractPublicIdFromUrl } from "../../../../../lib/upload";

// --- GET /api/certifications/[id] ---
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const idParam = url.pathname.split("/").pop();
    const certificationId = Number(idParam);

    if (!idParam || isNaN(certificationId)) {
      return NextResponse.json({ message: "Certification ID must be a valid number." }, { status: 400 });
    }

    const certification = await db.query.certifications.findFirst({
      where: eq(certifications.id, certificationId),
    });

    if (!certification) {
      return NextResponse.json({ message: `Certification with ID '${certificationId}' not found.` }, { status: 404 });
    }

    return NextResponse.json(certification, { status: 200 });
  } catch (error) {
    console.error("API Error: Failed to retrieve certification by ID.", error);
    return NextResponse.json({ message: "Failed to retrieve certification." }, { status: 500 });
  }
}

// --- PUT /api/certifications/[id] ---
export async function PUT(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const idParam = url.pathname.split("/").pop();
    const certificationId = Number(idParam);

    if (!idParam || isNaN(certificationId)) {
      return NextResponse.json({ message: "Certification ID must be a valid number." }, { status: 400 });
    }

    const body = await req.json();
    const { name, image } = body;

    if (!name || !image) {
      return NextResponse.json({ message: "Missing 'name' or 'image'" }, { status: 400 });
    }

    const existing = await db.query.certifications.findFirst({
      where: eq(certifications.id, certificationId),
    });

    if (!existing) {
      return NextResponse.json({ message: "Certification not found." }, { status: 404 });
    }

    const nameConflict = await db.query.certifications.findFirst({
      where: eq(certifications.name, name),
    });

    if (nameConflict && nameConflict.id !== certificationId) {
      const newPublicId = extractPublicIdFromUrl(image);
      if (newPublicId) {
        await cloudinary.uploader.destroy(newPublicId);
      }

      return NextResponse.json(
        { message: `Certification with name '${name}' already exists.` },
        { status: 409 }
      );
    }

    let newImage = existing.image;

    if (image !== existing.image) {
      const oldPublicId = extractPublicIdFromUrl(existing.image);
      if (oldPublicId) {
        await cloudinary.uploader.destroy(oldPublicId);
      }
      newImage = image;
    }

    const [updated] = await db
      .update(certifications)
      .set({ name, image: newImage })
      .where(eq(certifications.id, certificationId))
      .returning();

    if (!updated) {
      return NextResponse.json({ message: "Update failed." }, { status: 500 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("API Error: Failed to update certification.", error);
    return NextResponse.json({ message: "Failed to update certification." }, { status: 500 });
  }
}

// --- DELETE /api/certifications/[id] ---
export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const idParam = url.pathname.split("/").pop();
    const certificationId = Number(idParam);

    if (!idParam || isNaN(certificationId)) {
      return NextResponse.json({ message: "Certification ID must be a valid number." }, { status: 400 });
    }

    const existing = await db.query.certifications.findFirst({
      where: eq(certifications.id, certificationId),
    });

    if (!existing) {
      return NextResponse.json({ message: "Certification not found." }, { status: 404 });
    }

    const publicId = extractPublicIdFromUrl(existing.image);
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    await db.delete(certifications).where(eq(certifications.id, certificationId));

    return NextResponse.json({ message: "Deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("API Error: Failed to delete certification.", error);
    return NextResponse.json({ message: "Failed to delete certification." }, { status: 500 });
  }
}

