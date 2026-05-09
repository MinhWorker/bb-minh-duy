import { NextResponse, NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import db from '../../../../../db/drizzle';
import { memberStories } from '../../../../../db/schema';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const storyId = parseInt(id, 10);
    const fetchedStory = await db.query.memberStories.findFirst({
      where: eq(memberStories.id, storyId),
    });

    if (!fetchedStory) {
      return NextResponse.json({ message: "Member story not found." }, { status: 404 });
    }

    return NextResponse.json(fetchedStory, { status: 200 });
  } catch (error) {
    console.error("API Error: Failed to retrieve member story.", error);
    return NextResponse.json({ message: "Failed to retrieve member story." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const storyId = parseInt(id, 10);
    const body = await req.json();

    const updatedStory = await db
      .update(memberStories)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(memberStories.id, storyId))
      .returning();

    if (updatedStory.length === 0) {
      return NextResponse.json({ message: "Member story not found." }, { status: 404 });
    }

    return NextResponse.json(updatedStory[0], { status: 200 });
  } catch (error) {
    console.error("API Error: Failed to update member story.", error);
    return NextResponse.json({ message: "Failed to update member story." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const storyId = parseInt(id, 10);
    const deletedStory = await db.delete(memberStories).where(eq(memberStories.id, storyId)).returning();

    if (deletedStory.length === 0) {
      return NextResponse.json({ message: "Member story not found." }, { status: 404 });
    }

    return NextResponse.json(deletedStory[0], { status: 200 });
  } catch (error) {
    console.error("API Error: Failed to delete member story.", error);
    return NextResponse.json({ message: "Failed to delete member story." }, { status: 500 });
  }
}
