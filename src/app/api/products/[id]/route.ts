import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../db/drizzle";
import { desc, eq } from "drizzle-orm";
import { certifications, products, productsToCertifications } from "../../../../../db/schema";
import { extractPublicIdFromUrl } from "../../../../../lib/upload";
import cloudinary from "../../../../../cloudinary.config";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const productId = url.pathname.split("/").pop();

    if (!productId) {
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }

    const product = await db.query.products.findFirst({
      where: eq(products.id, productId)
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

    // Attach certifications to the product
    const productWithCerts = {
      ...product,
      certifications: certificationIds,
    };

    return NextResponse.json(productWithCerts, { status: 200 });
  } catch (error) {
    console.error("API Error: Failed to retrieve product by ID.", error);
    return NextResponse.json({ message: "Failed to retrieve product." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const productId = url.pathname.split("/").pop();

    if (!productId) {
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }

    const body = await req.json();
    const { name, description, price, image, categoryId, certificationIds } = body;

    if (!name
      || !description
      || !price
      || !image
      || !categoryId
      || !certificationIds
    ) {
      return NextResponse.json({ message: 'All field is required' }, { status: 400 });
    }

    const record = await db.query.products.findFirst({
      where: eq(products.id, productId)
    });

    if (!record) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const existingProduct = await db.query.products.findFirst({
      where: eq(products.name, name)
    });

    if (existingProduct && existingProduct.id !== productId) {
      const newPublicId = extractPublicIdFromUrl(image);

      if (newPublicId) {
        await cloudinary.uploader.destroy(newPublicId);
      }

      return NextResponse.json({ message: `Product with name '${name}' already exists.` }, { status: 409 })
    }

    const current = record;
    let newImage = current.image;

    if (image && image !== current.image) {
      const oldPublicId = extractPublicIdFromUrl(current.image);
      if (oldPublicId) {
        await cloudinary.uploader.destroy(oldPublicId);
      }

      newImage = image;
    }

    const updated = await db
      .update(products)
      .set({
        name,
        description,
        price,
        image,
        categoryId,
      })
      .where(eq(products.id, productId))
      .returning();

    await db.delete(productsToCertifications).where(eq(productsToCertifications.productId, productId));

    if (certificationIds && certificationIds.length > 0) {
      await db.insert(productsToCertifications).values(
        certificationIds.map((certId: string) => ({
          productId,
          certificationId: certId,
        }))
      );
    }

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error(`API Error: `, error);
    return NextResponse.json({ message: "Failed to update products." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const productId = url.pathname.split("/").pop();

    if (!productId) {
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }

    const record = await db.query.products.findFirst({
      where: eq(products.id, productId),
    });

    if (!record) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    const product = record;
    const imageUrl = product.image;

    const publicId = extractPublicIdFromUrl(imageUrl);

    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    // Delete the product (related join rows will be deleted via cascade)
    await db.delete(products).where(eq(products.id, productId));

    return NextResponse.json({ message: "Product deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ message: "Failed to delete product" }, { status: 500 });
  }
}
