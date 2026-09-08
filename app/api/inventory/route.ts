import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const storeIdParam = searchParams.get("storeId") || searchParams.get("store_id");

    const where: any = {};
    if (storeIdParam) {
      where.storeId = parseInt(storeIdParam, 10);
    }

    const items = await prisma.storeInventory.findMany({
      where,
      include: {
        store: true,
        product: true,
      },
      orderBy: [{ storeId: "asc" }, { productId: "asc" }],
    });

    const formatted = items.map((it) => ({
      id: it.id,
      storeId: it.storeId,
      storeName: it.store.name,
      productId: it.productId,
      productName: it.product.name,
      productSku: it.product.sku,
      stock: it.stock,
      lastUpdated: it.lastUpdated,
    }));

    return NextResponse.json(formatted);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error al consultar inventario", detail: error.message },
      { status: 500 }
    );
  }
}