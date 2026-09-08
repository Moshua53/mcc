import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { evaluateOrderEligibility } from "@/lib/services/boris";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim();
    const status = searchParams.get("status")?.trim();

    const where: any = {};
    if (search) {
      where.OR = [
        { orderCode: { contains: search } },
        { customerDocument: { contains: search } },
        { customerName: { contains: search } },
      ];
    }
    if (status) {
      where.status = status;
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        items: {
          include: { product: true },
        },
      },
      orderBy: { id: "desc" },
    });

    const formatted = orders.map((order) => {
      const eligibility = evaluateOrderEligibility(order);
      return {
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
      };
    });

    return NextResponse.json(formatted);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error al consultar pedidos", detail: error.message },
      { status: 500 }
    );
  }
}