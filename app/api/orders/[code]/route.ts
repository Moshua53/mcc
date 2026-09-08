import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { evaluateOrderEligibility } from "@/lib/services/boris";

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const code = params.code?.trim();
    if (!code) {
      return NextResponse.json({ detail: "Código de pedido requerido" }, { status: 400 });
    }

    // Permitir buscar por código exacto o por documento
    const order = await prisma.order.findFirst({
      where: {
        OR: [{ orderCode: code }, { customerDocument: code }],
      },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { detail: `Pedido con código o documento '${code}' no fue encontrado.` },
        { status: 404 }
      );
    }

    const eligibility = evaluateOrderEligibility(order);

    return NextResponse.json({
      id: order.id,
      orderCode: order.orderCode,
      customerName: order.customerName,
      customerDocument: order.customerDocument,
      customerEmail: order.customerEmail,
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
      deliveredAt: order.deliveredAt,
      daysSinceDelivery: eligibility.daysSinceDelivery,
      isEligibleForReturn: eligibility.isEligible,
      eligibilityReason: eligibility.reason,
      items: order.items.map((it) => ({
        id: it.id,
        productId: it.productId,
        productName: it.product.name,
        productSku: it.product.sku,
        quantity: it.quantity,
        unitPrice: it.unitPrice,
        subtotal: it.subtotal,
        returnedQuantity: it.returnedQuantity,
        eligibleQuantity: Math.max(0, it.quantity - it.returnedQuantity),
      })),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error al consultar pedido", detail: error.message },
      { status: 500 }
    );
  }
}