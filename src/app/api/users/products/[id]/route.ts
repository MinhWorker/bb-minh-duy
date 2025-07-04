import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../../db/drizzle";
import { products } from "../../../../../../db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const productIdParam = url.pathname.split('/').pop();

    if (!productIdParam) {
      return NextResponse.json({ message: "Product ID is required." }, { status: 400 });
    }

    const productId = Number(productIdParam);
    if (isNaN(productId)) {
      return NextResponse.json({ message: "Product ID must be a valid number." }, { status: 400 });
    }

    const product = await db.query.products.findFirst({
      with: {
        categories: true,
        certifications: {
          with: {
            certification: true
          }
        }
      },
      where: eq(products.id, productId)
    });

    if (!product) {
      return NextResponse.json({ message: `Product with ID '${productId}' not found.` }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("API Error: Failed to retrieve product by ID.", error);
    return NextResponse.json({ message: "Failed to retrieve product." }, { status: 500 });
  }
}

