import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { processReturnTransaction } from "@/lib/services/boris";
import { z } from "zod";

const returnSchema = z.object({
  orderCode: z.string().min(3),
  storeId: z.number().int().positive(),
  clerkName: z.string().min(2),
  reason: z.string().min(3),
  productCondition: z.enum(["OPTIMO", "DANADO"]).default("OPTIMO"),
  refundType: z.enum(["VALE_COMPRA", "REEMBOLSO_MEDIO_ORIGINAL"]).default("VALE_COMPRA"),
  items: z.array(
    z.object({
      orderItemId: z.number().int().positive(),
      quantity: z.number().int().positive(),
    })
  ).min(1, "Debes incluir al menos un artículo para devolución"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parseResult = returnSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Datos de entrada inválidos",
          detail: parseResult.error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", "),
        },
        { status: 400 }
      );
    }

    const result = await processReturnTransaction(parseResult.data);
    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { detail: error.message || "Error al procesar la devolución" },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    const returns = await prisma.returnRecord.findMany({
      include: {
        store: true,
        order: true,
        items: {
          include: { product: true },
        },
      },
      orderBy: { id: "desc" },
    });

    const formatted = returns.map((r) => ({
      id: r.id,
      returnCode: r.returnCode,
      orderCode: r.order.orderCode,
      storeName: r.store.name,
      clerkName: r.clerkName,
      reason: r.reason,
      productCondition: r.productCondition,
      refundType: r.refundType,
      voucherCode: r.voucherCode,
      totalRefunded: r.totalRefunded,
      status: r.status,
      createdAt: r.createdAt,
      items: r.items.map((it) => ({
        id: it.id,
        productName: it.product.name,
        productSku: it.product.sku,
        quantity: it.quantity,
        refundAmount: it.refundAmount,
        restocked: it.restocked,
      })),
    }));

    return NextResponse.json(formatted);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error al consultar devoluciones", detail: error.message },
      { status: 500 }
    );
  }
}