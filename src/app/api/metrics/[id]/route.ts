import { NextResponse, NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import db from '../../../../../db/drizzle';
import { metrics } from '../../../../../db/schema';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const metricId = parseInt(id, 10);
    const fetchedMetric = await db.query.metrics.findFirst({
      where: eq(metrics.id, metricId),
    });

    if (!fetchedMetric) {
      return NextResponse.json({ message: "Metric not found." }, { status: 404 });
    }

    return NextResponse.json(fetchedMetric, { status: 200 });
  } catch (error) {
    console.error("API Error: Failed to retrieve metric.", error);
    return NextResponse.json({ message: "Failed to retrieve metric." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const metricId = parseInt(id, 10);
    const body = await req.json();

    const updatedMetric = await db
      .update(metrics)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(metrics.id, metricId))
      .returning();

    if (updatedMetric.length === 0) {
      return NextResponse.json({ message: "Metric not found." }, { status: 404 });
    }

    return NextResponse.json(updatedMetric[0], { status: 200 });
  } catch (error) {
    console.error("API Error: Failed to update metric.", error);
    return NextResponse.json({ message: "Failed to update metric." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const metricId = parseInt(id, 10);
    const deletedMetric = await db.delete(metrics).where(eq(metrics.id, metricId)).returning();

    if (deletedMetric.length === 0) {
      return NextResponse.json({ message: "Metric not found." }, { status: 404 });
    }

    return NextResponse.json(deletedMetric[0], { status: 200 });
  } catch (error) {
    console.error("API Error: Failed to delete metric.", error);
    return NextResponse.json({ message: "Failed to delete metric." }, { status: 500 });
  }
}
