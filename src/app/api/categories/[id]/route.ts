// app/api/categories/[id]/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import db from '../../../../../db/drizzle'; // Adjust path as needed
import { categories } from '../../../../../db/schema'; // Adjust path as needed

// --- GET /api/categories/[id] ---
// Purpose: Get a single category by its ID.
// Access: Admin and normal users.
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const categoryId = url.pathname.split('/').pop();

    if (!categoryId) {
      return NextResponse.json({ message: 'Category ID is required.' }, { status: 400 });
    }

    const category = await db.query.categories.findFirst({
      where: eq(categories.id, categoryId),
    });

    if (!category) {
      return NextResponse.json({ message: `Category with ID '${categoryId}' not found.` }, { status: 404 });
    }

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error('API Error: Failed to retrieve category by ID.', error);
    return NextResponse.json({ message: 'Failed to retrieve category.' }, { status: 500 });
  }
}

// --- PUT /api/categories/[id] ---
// Purpose: Update a category's name.
// Access: Admin only (enforced by middleware).
export async function PUT(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const categoryId = url.pathname.split('/').pop();
    const { name } = await req.json();

    if (!categoryId) {
      return NextResponse.json({ message: 'Category ID is required.' }, { status: 400 });
    }

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ message: 'New category name is required and must be a non-empty string.' }, { status: 400 });
    }

    const trimmedName = name.trim();

    // Check if the category exists
    const existingCategory = await db.query.categories.findFirst({
      where: eq(categories.id, categoryId),
    });

    if (!existingCategory) {
      return NextResponse.json({ message: `Category with ID '${categoryId}' not found.` }, { status: 404 });
    }


    // Check for name conflict (different category with the same name)
    const nameConflict = await db.query.categories.findFirst({
      where: eq(categories.name, trimmedName),
    });

    if (nameConflict && nameConflict.id !== categoryId) {
      return NextResponse.json({ message: `Category with name '${trimmedName}' already exists.` }, { status: 409 });
    }


    const [updatedCategory] = await db
      .update(categories)
      .set({ name: trimmedName })
      .where(eq(categories.id, categoryId))
      .returning();

    if (!updatedCategory) {
      return NextResponse.json({ message: `Category with ID '${categoryId}' not found or update failed.` }, { status: 404 }); // Should not happen given the existence check above, but good to have
    }

    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    console.error('API Error: Failed to update category.', error);
    return NextResponse.json({ message: 'Failed to update category.' }, { status: 500 });
  }
}

// --- DELETE /api/categories/[id] ---
// Purpose: Delete a category.
// Access: Admin only (enforced by middleware).
export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const categoryId = url.pathname.split('/').pop();

    if (!categoryId) {
      return NextResponse.json({ message: 'Category ID is required.' }, { status: 400 });
    }

    const [deletedCategory] = await db
      .delete(categories)
      .where(eq(categories.id, categoryId))
      .returning();

    if (!deletedCategory) {
      return NextResponse.json({ message: `Category with ID '${categoryId}' not found.` }, { status: 404 });
    }

    return new NextResponse(null, { status: 204 }); // 204 No Content (successful deletion)
  } catch (error) {
    console.error('API Error: Failed to delete category.', error);
    return NextResponse.json({ message: 'Failed to delete category.' }, { status: 500 });
  }
}

