import { NextResponse, NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import db from '../../../../../db/drizzle';
import { recipes } from '../../../../../db/schema';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const recipeId = parseInt(id, 10);
    const fetchedRecipe = await db.query.recipes.findFirst({
      where: eq(recipes.id, recipeId),
    });

    if (!fetchedRecipe) {
      return NextResponse.json({ message: "Recipe not found." }, { status: 404 });
    }

    return NextResponse.json(fetchedRecipe, { status: 200 });
  } catch (error) {
    console.error("API Error: Failed to retrieve recipe.", error);
    return NextResponse.json({ message: "Failed to retrieve recipe." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const recipeId = parseInt(id, 10);
    const body = await req.json();

    const updatedRecipe = await db
      .update(recipes)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(recipes.id, recipeId))
      .returning();

    if (updatedRecipe.length === 0) {
      return NextResponse.json({ message: "Recipe not found." }, { status: 404 });
    }

    return NextResponse.json(updatedRecipe[0], { status: 200 });
  } catch (error) {
    console.error("API Error: Failed to update recipe.", error);
    return NextResponse.json({ message: "Failed to update recipe." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const recipeId = parseInt(id, 10);
    const deletedRecipe = await db.delete(recipes).where(eq(recipes.id, recipeId)).returning();

    if (deletedRecipe.length === 0) {
      return NextResponse.json({ message: "Recipe not found." }, { status: 404 });
    }

    return NextResponse.json(deletedRecipe[0], { status: 200 });
  } catch (error) {
    console.error("API Error: Failed to delete recipe.", error);
    return NextResponse.json({ message: "Failed to delete recipe." }, { status: 500 });
  }
}
