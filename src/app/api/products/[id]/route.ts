import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../db/drizzle";
import { eq } from "drizzle-orm";
import { certifications, products, productsToCertifications } from "../../../../../db/schema";
import { extractPublicIdFromUrl } from "../../../../../lib/upload";
import cloudinary from "../../../../../cloudinary.config";

// --- GET /api/products/[id] ---
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const idParam = url.pathname.split("/").pop();
    const productId = Number(idParam);

    if (!idParam || isNaN(productId)) {
      return NextResponse.json({ message: "Product ID must be a valid number." }, { status: 400 });
    }

    const product = await db.query.products.findFirst({
      where: eq(products.id, productId),
    });

    if (!product) {
      return NextResponse.json({ message: `Product with ID '${productId}' not found.` }, { status: 404 });
    }

    const relatedCertifications = await db
      .select({
        id: certifications.id,
      })
      .from(productsToCertifications)
      .innerJoin(certifications, eq(productsToCertifications.certificationId, certifications.id))
      .where(eq(productsToCertifications.productId, productId));

    const certificationIds = relatedCertifications.map((cert) => cert.id);

    return NextResponse.json({ ...product, certifications: certificationIds }, { status: 200 });
  } catch (error) {
    console.error("API Error: Failed to retrieve product by ID.", error);
    return NextResponse.json({ message: "Failed to retrieve product." }, { status: 500 });
  }
}

// --- PUT /api/products/[id] ---
export async function PUT(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const idParam = url.pathname.split("/").pop();
    const productId = Number(idParam);

    if (!idParam || isNaN(productId)) {
      return NextResponse.json({ message: "Product ID must be a valid number." }, { status: 400 });
    }

    const body = await req.json();
    const { name, description, price, image, categoryId, certificationIds, unit } = body;

    if (!name || !description || !price || !image || !unit) {
      return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
    }

    const record = await db.query.products.findFirst({
      where: eq(products.id, productId),
    });

    if (!record) {
      return NextResponse.json({ message: "Product not found." }, { status: 404 });
    }

    const existingProduct = await db.query.products.findFirst({
      where: eq(products.name, name),
    });

    if (existingProduct && existingProduct.id !== productId) {
      const newPublicId = extractPublicIdFromUrl(image);
      if (newPublicId) await cloudinary.uploader.destroy(newPublicId);
      return NextResponse.json({ message: `Product with name '${name}' already exists.` }, { status: 409 });
    }

    // Replace image if different
    if (image !== record.image) {
      const oldPublicId = extractPublicIdFromUrl(record.image);
      if (oldPublicId) await cloudinary.uploader.destroy(oldPublicId);
    }

    const [updated] = await db
      .update(products)
      .set({ name, description, price, image, categoryId, unit })
      .where(eq(products.id, productId))
      .returning();

    // Update join table
    await db.delete(productsToCertifications).where(eq(productsToCertifications.productId, productId));

    if (Array.isArray(certificationIds) && certificationIds.length > 0) {
      await db.insert(productsToCertifications).values(
        certificationIds.map((certId: number) => ({
          productId,
          certificationId: certId,
        }))
      );
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ message: "Failed to update product." }, { status: 500 });
  }
}

// --- DELETE /api/products/[id] ---
export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const idParam = url.pathname.split("/").pop();
    const productId = Number(idParam);

    if (!idParam || isNaN(productId)) {
      return NextResponse.json({ message: "Product ID must be a valid number." }, { status: 400 });
    }

    const record = await db.query.products.findFirst({
      where: eq(products.id, productId),
    });

    if (!record) {
      return NextResponse.json({ message: "Product not found." }, { status: 404 });
    }

    const publicId = extractPublicIdFromUrl(record.image);
    if (publicId) await cloudinary.uploader.destroy(publicId);

    await db.delete(products).where(eq(products.id, productId));

    return NextResponse.json({ message: "Product deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ message: "Failed to delete product." }, { status: 500 });
  }
}

