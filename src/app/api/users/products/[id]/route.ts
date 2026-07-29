import { NextRequest, NextResponse } from "next/server";
import { listPublishedProducts } from "@/lib/cms/public-queries";

export async function GET(req: NextRequest) {
  const id = Number(new URL(req.url).pathname.split("/").pop());
  if (!Number.isInteger(id)) {
    return NextResponse.json({ message: "Mã sản phẩm không hợp lệ." }, { status: 400 });
  }

  try {
    const product = (await listPublishedProducts()).find((record) => record.id === id);
    return product
      ? NextResponse.json(product)
      : NextResponse.json({ message: "Không tìm thấy sản phẩm đã xuất bản." }, { status: 404 });
  } catch {
    return NextResponse.json({ message: "Không thể tải sản phẩm." }, { status: 503 });
  }
}
