import { prisma } from "@/lib/prisma";
import crypto from "crypto";

const MAX_RETURN_DAYS = parseInt(process.env.MAX_RETURN_DAYS || "30", 10);

export interface EligibilityResult {
  isEligible: boolean;
  reason: string;
  daysSinceDelivery: number | null;
}

export function evaluateOrderEligibility(order: {
  status: string;
  deliveredAt: Date | null;
  items: Array<{ quantity: number; returnedQuantity: number }>;
}): EligibilityResult {
  if (!order.deliveredAt) {
    return {
      isEligible: false,
      reason: "El pedido aún no ha sido marcado como ENTREGADO.",
      daysSinceDelivery: null,
    };
  }

  const now = new Date();
  const delivered = new Date(order.deliveredAt);
  const diffTime = now.getTime() - delivered.getTime();
  const daysDiff = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (order.status === "CANCELADO") {
    return {
      isEligible: false,
      reason: "El pedido fue cancelado y no admite devoluciones.",
      daysSinceDelivery: daysDiff,
    };
  }

  if (order.status === "DEVUELTO_TOTAL") {
    return {
      isEligible: false,
      reason: "Todos los artículos de este pedido ya fueron devueltos previamente.",
      daysSinceDelivery: daysDiff,
    };
  }

  if (order.status !== "ENTREGADO" && order.status !== "DEVUELTO_PARCIAL") {
    return {
      isEligible: false,
      reason: `El estado actual del pedido ('${order.status}') no permite devoluciones en tienda física.`,
      daysSinceDelivery: daysDiff,
    };
  }

  if (daysDiff > MAX_RETURN_DAYS) {
    return {
      isEligible: false,
      reason: `El plazo de devolución ha expirado (${daysDiff} días desde la entrega. Máximo permitido: ${MAX_RETURN_DAYS} días).`,
      daysSinceDelivery: daysDiff,
    };
  }

  const availableItems = order.items.reduce(
    (acc, it) => acc + Math.max(0, it.quantity - it.returnedQuantity),
    0
  );

  if (availableItems <= 0) {
    return {
      isEligible: false,
      reason: "No quedan artículos disponibles para devolver en este pedido.",
      daysSinceDelivery: daysDiff,
    };
  }

  return {
    isEligible: true,
    reason: "Pedido elegible para devolución en tienda física.",
    daysSinceDelivery: daysDiff,
  };
}

export interface ReturnRequestInput {
  orderCode: string;
  storeId: number;
  clerkName: string;
  reason: string;
  productCondition?: "OPTIMO" | "DANADO";
  refundType?: "VALE_COMPRA" | "REEMBOLSO_MEDIO_ORIGINAL";
  items: Array<{ orderItemId: number; quantity: number }>;
}

export async function processReturnTransaction(input: ReturnRequestInput) {
  const store = await prisma.store.findUnique({
    where: { id: input.storeId },
  });
  if (!store) {
    throw new Error(`La tienda física con ID ${input.storeId} no existe.`);
  }

  const order = await prisma.order.findUnique({
    where: { orderCode: input.orderCode },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  if (!order) {
    throw new Error(`El pedido digital '${input.orderCode}' no fue encontrado.`);
  }

  const eligibility = evaluateOrderEligibility(order);
  if (!eligibility.isEligible) {
    throw new Error(`Devolución rechazada: ${eligibility.reason}`);
  }

  const orderItemsMap = new Map(order.items.map((it) => [it.id, it]));
  let totalRefund = 0;
  const itemsToProcess: Array<{
    orderItem: (typeof order.items)[0];
    quantity: number;
    subtotalRefund: number;
  }> = [];

  for (const reqItem of input.items) {
    const oItem = orderItemsMap.get(reqItem.orderItemId);
    if (!oItem) {
      throw new Error(`El artículo con ID ${reqItem.orderItemId} no pertenece al pedido ${order.orderCode}.`);
    }

    const availableQty = oItem.quantity - oItem.returnedQuantity;
    if (reqItem.quantity > availableQty) {
      throw new Error(
        `Cantidad inválida para '${oItem.product.name}'. Solicitado: ${reqItem.quantity}, Disponible: ${availableQty}.`
      );
    }

    const subtotal = reqItem.quantity * oItem.unitPrice;
    totalRefund += subtotal;
    itemsToProcess.push({
      orderItem: oItem,
      quantity: reqItem.quantity,
      subtotalRefund: subtotal,
    });
  }

  const uniqueHex = crypto.randomBytes(3).toString("hex").toUpperCase();
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const returnCode = `RET-${dateStr}-${uniqueHex}`;
  const voucherCode = input.refundType === "REEMBOLSO_MEDIO_ORIGINAL" ? null : `VALE-MV-${uniqueHex}`;
  const isApt = (input.productCondition || "OPTIMO") === "OPTIMO";

  // Transacción atómica
  const result = await prisma.$transaction(async (tx) => {
    // 1. Crear registro de devolución
    const returnRecord = await tx.returnRecord.create({
      data: {
        returnCode,
        orderId: order.id,
        storeId: store.id,
        clerkName: input.clerkName || "Cajero Mostrador",
        reason: input.reason,
        productCondition: input.productCondition || "OPTIMO",
        refundType: input.refundType || "VALE_COMPRA",
        voucherCode,
        totalRefunded: Math.round(totalRefund * 100) / 100,
        status: "APROBADO",
      },
    });

    // 2. Procesar ítems y actualizar inventario en sucursal
    const createdReturnItems = [];
    for (const item of itemsToProcess) {
      const retItem = await tx.returnItem.create({
        data: {
          returnId: returnRecord.id,
          orderItemId: item.orderItem.id,
          productId: item.orderItem.productId,
          quantity: item.quantity,
          refundAmount: item.subtotalRefund,
          restocked: isApt,
        },
        include: { product: true },
      });
      createdReturnItems.push(retItem);

      // Actualizar cantidad devuelta en pedido
      await tx.orderItem.update({
        where: { id: item.orderItem.id },
        data: {
          returnedQuantity: item.orderItem.returnedQuantity + item.quantity,
        },
      });

      // Si el producto está en estado óptimo, reingresar a stock de la sucursal
      if (isApt) {
        await tx.storeInventory.upsert({
          where: {
            storeId_productId: {
              storeId: store.id,
              productId: item.orderItem.productId,
            },
          },
          update: {
            stock: { increment: item.quantity },
          },
          create: {
            storeId: store.id,
            productId: item.orderItem.productId,
            stock: item.quantity,
          },
        });
      }
    }

    // 3. Evaluar estado final del pedido
    const updatedOrderItems = await tx.orderItem.findMany({
      where: { orderId: order.id },
    });
    const allReturned = updatedOrderItems.every((it) => it.quantity === it.returnedQuantity);
    const newStatus = allReturned ? "DEVUELTO_TOTAL" : "DEVUELTO_PARCIAL";

    await tx.order.update({
      where: { id: order.id },
      data: { status: newStatus },
    });

    return {
      returnRecord,
      createdReturnItems,
      store,
      order,
    };
  });

  const message = result.returnRecord.voucherCode
    ? `Devolución procesada con éxito en ${result.store.name}. Se emitió vale de compra '${result.returnRecord.voucherCode}' por $${result.returnRecord.totalRefunded.toLocaleString()} COP.`
    : `Devolución procesada con éxito en ${result.store.name}. Reembolso por $${result.returnRecord.totalRefunded.toLocaleString()} COP aplicado al medio original.`;

  return {
    id: result.returnRecord.id,
    returnCode: result.returnRecord.returnCode,
    orderCode: result.order.orderCode,
    storeName: result.store.name,
    clerkName: result.returnRecord.clerkName,
    reason: result.returnRecord.reason,
    productCondition: result.returnRecord.productCondition,
    refundType: result.returnRecord.refundType,
    voucherCode: result.returnRecord.voucherCode,
    totalRefunded: result.returnRecord.totalRefunded,
    status: result.returnRecord.status,
    createdAt: result.returnRecord.createdAt,
    items: result.createdReturnItems.map((it) => ({
      id: it.id,
      productName: it.product.name,
      productSku: it.product.sku,
      quantity: it.quantity,
      refundAmount: it.refundAmount,
      restocked: it.restocked,
    })),
    message,
  };
}