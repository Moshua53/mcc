import { describe, it, expect, beforeEach } from "vitest";
import { prisma } from "@/lib/prisma";
import { runSeed } from "@/prisma/seed";
import { processReturnTransaction, evaluateOrderEligibility } from "@/lib/services/boris";

describe("Mercado VIVA — Motor de Reglas BORIS y Transacciones", () => {
  beforeEach(async () => {
    await runSeed();
  });

  it("1. Flujo Exitoso: Debe procesar devolución, reingresar stock y generar vale", async () => {
    const store = await prisma.store.findFirst({ where: { code: "TIENDA-01" } });
    const order = await prisma.order.findUnique({
      where: { orderCode: "ORD-2026-101" },
      include: { items: true },
    });

    expect(store).toBeDefined();
    expect(order).toBeDefined();

    const itemToReturn = order!.items[0];

    // Verificar stock inicial en sucursal
    const invBefore = await prisma.storeInventory.findUnique({
      where: {
        storeId_productId: {
          storeId: store!.id,
          productId: itemToReturn.productId,
        },
      },
    });
    const initialStock = invBefore?.stock ?? 10;

    // Procesar devolución de 1 unidad
    const result = await processReturnTransaction({
      orderCode: "ORD-2026-101",
      storeId: store!.id,
      clerkName: "Cajero Test",
      reason: "Error de compra",
      productCondition: "OPTIMO",
      refundType: "VALE_COMPRA",
      items: [{ orderItemId: itemToReturn.id, quantity: 1 }],
    });

    expect(result.status).toBe("APROBADO");
    expect(result.voucherCode).toMatch(/^VALE-MV-/);
    expect(result.totalRefunded).toBe(24500);
    expect(result.items[0].restocked).toBe(true);

    // Verificar que el inventario de la tienda física aumentó exactamente en 1
    const invAfter = await prisma.storeInventory.findUnique({
      where: {
        storeId_productId: {
          storeId: store!.id,
          productId: itemToReturn.productId,
        },
      },
    });
    expect(invAfter?.stock).toBe(initialStock + 1);

    // Verificar que el pedido cambió a DEVUELTO_PARCIAL
    const updatedOrder = await prisma.order.findUnique({
      where: { orderCode: "ORD-2026-101" },
    });
    expect(updatedOrder?.status).toBe("DEVUELTO_PARCIAL");
  });

  it("2. Caso Excepcional: Debe rechazar pedido vencido (> 30 días)", async () => {
    const store = await prisma.store.findFirst({ where: { code: "TIENDA-01" } });
    const order = await prisma.order.findUnique({
      where: { orderCode: "ORD-2026-102" },
      include: { items: true },
    });

    await expect(
      processReturnTransaction({
        orderCode: "ORD-2026-102",
        storeId: store!.id,
        clerkName: "Cajero Test",
        reason: "No deseado",
        productCondition: "OPTIMO",
        items: [{ orderItemId: order!.items[0].id, quantity: 1 }],
      })
    ).rejects.toThrow(/ha expirado/i);
  });

  it("3. Caso Excepcional: Debe rechazar pedido ya devuelto en su totalidad", async () => {
    const store = await prisma.store.findFirst({ where: { code: "TIENDA-01" } });
    const order = await prisma.order.findUnique({
      where: { orderCode: "ORD-2026-103" },
      include: { items: true },
    });

    await expect(
      processReturnTransaction({
        orderCode: "ORD-2026-103",
        storeId: store!.id,
        clerkName: "Cajero Test",
        reason: "Reintento",
        productCondition: "OPTIMO",
        items: [{ orderItemId: order!.items[0].id, quantity: 1 }],
      })
    ).rejects.toThrow(/ya fueron devueltos previamente/i);
  });

  it("4. Caso Excepcional: Debe rechazar pedido no entregado (en camino)", async () => {
    const store = await prisma.store.findFirst({ where: { code: "TIENDA-01" } });
    const order = await prisma.order.findUnique({
      where: { orderCode: "ORD-2026-104" },
      include: { items: true },
    });

    await expect(
      processReturnTransaction({
        orderCode: "ORD-2026-104",
        storeId: store!.id,
        clerkName: "Cajero Test",
        reason: "Devolución antes de tiempo",
        productCondition: "OPTIMO",
        items: [{ orderItemId: order!.items[0].id, quantity: 1 }],
      })
    ).rejects.toThrow(/no ha sido marcado como ENTREGADO/i);
  });

  it("5. Caso Especial: Producto dañado no debe reingresar a stock de venta", async () => {
    const store = await prisma.store.findFirst({ where: { code: "TIENDA-01" } });
    const order = await prisma.order.findUnique({
      where: { orderCode: "ORD-2026-101" },
      include: { items: true },
    });

    const itemToReturn = order!.items[0];
    const invBefore = await prisma.storeInventory.findUnique({
      where: {
        storeId_productId: {
          storeId: store!.id,
          productId: itemToReturn.productId,
        },
      },
    });
    const initialStock = invBefore?.stock ?? 10;

    const result = await processReturnTransaction({
      orderCode: "ORD-2026-101",
      storeId: store!.id,
      clerkName: "Supervisor Tienda",
      reason: "Empaque roto",
      productCondition: "DANADO",
      refundType: "REEMBOLSO_MEDIO_ORIGINAL",
      items: [{ orderItemId: itemToReturn.id, quantity: 1 }],
    });

    expect(result.status).toBe("APROBADO");
    expect(result.items[0].restocked).toBe(false);

    // El stock en góndola NO debe haber aumentado
    const invAfter = await prisma.storeInventory.findUnique({
      where: {
        storeId_productId: {
          storeId: store!.id,
          productId: itemToReturn.productId,
        },
      },
    });
    expect(invAfter?.stock).toBe(initialStock);
  });
});