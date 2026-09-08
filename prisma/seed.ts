import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function runSeed() {
  console.log("Iniciando semillero de datos para Mercado VIVA...");

  // Limpiar datos existentes en cascada
  await prisma.returnItem.deleteMany();
  await prisma.returnRecord.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.storeInventory.deleteMany();
  await prisma.product.deleteMany();
  await prisma.store.deleteMany();

  const now = new Date();
  const daysAgo = (days: number) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

  // 1. Sucursales Físicas
  const stores = await Promise.all([
    prisma.store.create({
      data: { code: "TIENDA-01", name: "Mercado VIVA — Sede Norte", address: "Calle 127 #15-30", city: "Bogotá" }
    }),
    prisma.store.create({
      data: { code: "TIENDA-02", name: "Mercado VIVA — Sede Centro", address: "Carrera 7 #32-16", city: "Bogotá" }
    }),
    prisma.store.create({
      data: { code: "TIENDA-03", name: "Mercado VIVA — Sede Chapinero", address: "Carrera 13 #63-39", city: "Bogotá" }
    }),
  ]);

  // 2. Catálogo de Productos
  const products = await Promise.all([
    prisma.product.create({
      data: { sku: "MV-ALIM-001", name: "Café Especial Colombiano 500g", category: "Abarrotes", price: 24500.0, unit: "bolsa" }
    }),
    prisma.product.create({
      data: { sku: "MV-ALIM-002", name: "Aceite de Oliva Extra Virgen 1L", category: "Abarrotes", price: 38000.0, unit: "botella" }
    }),
    prisma.product.create({
      data: { sku: "MV-ALIM-003", name: "Arroz Premium Superior 5kg", category: "Granos", price: 21000.0, unit: "bolsa" }
    }),
    prisma.product.create({
      data: { sku: "MV-ASEO-001", name: "Detergente Líquido Concentrado 3L", category: "Aseo Hogar", price: 32900.0, unit: "galón" }
    }),
    prisma.product.create({
      data: { sku: "MV-LACT-001", name: "Leche Entera Larga Vida (Pack x6)", category: "Lácteos", price: 25800.0, unit: "pack" }
    }),
  ]);

  // 3. Inventario Inicial en Sucursales
  for (const store of stores) {
    for (const product of products) {
      const initialStock = store.code === "TIENDA-01" ? 10 : 15;
      await prisma.storeInventory.create({
        data: {
          storeId: store.id,
          productId: product.id,
          stock: initialStock,
          lastUpdated: now
        }
      });
    }
  }

  // 4. Pedidos Digitales de Prueba

  // Pedido 1: Válido y Elegible (Entregado hace 5 días)
  const o1 = await prisma.order.create({
    data: {
      orderCode: "ORD-2026-101",
      customerName: "Camila Restrepo",
      customerDocument: "10203040",
      customerEmail: "camila.restrepo@example.com",
      totalAmount: 87000.0,
      status: "ENTREGADO",
      createdAt: daysAgo(7),
      deliveredAt: daysAgo(5),
      items: {
        create: [
          { productId: products[0].id, quantity: 2, unitPrice: 24500.0, subtotal: 49000.0, returnedQuantity: 0 },
          { productId: products[1].id, quantity: 1, unitPrice: 38000.0, subtotal: 38000.0, returnedQuantity: 0 }
        ]
      }
    }
  });

  // Pedido 2: Vencido (Entregado hace 45 días > 30 días)
  const o2 = await prisma.order.create({
    data: {
      orderCode: "ORD-2026-102",
      customerName: "Juan Sebastián Gómez",
      customerDocument: "79854123",
      customerEmail: "juan.gomez@example.com",
      totalAmount: 67800.0,
      status: "ENTREGADO",
      createdAt: daysAgo(50),
      deliveredAt: daysAgo(45),
      items: {
        create: [
          { productId: products[2].id, quantity: 2, unitPrice: 21000.0, subtotal: 42000.0, returnedQuantity: 0 },
          { productId: products[4].id, quantity: 1, unitPrice: 25800.0, subtotal: 25800.0, returnedQuantity: 0 }
        ]
      }
    }
  });

  // Pedido 3: Ya Devuelto (DEVUELTO_TOTAL)
  const o3 = await prisma.order.create({
    data: {
      orderCode: "ORD-2026-103",
      customerName: "Valentina Morales",
      customerDocument: "52890123",
      customerEmail: "valentina.morales@example.com",
      totalAmount: 32900.0,
      status: "DEVUELTO_TOTAL",
      createdAt: daysAgo(12),
      deliveredAt: daysAgo(10),
      items: {
        create: [
          { productId: products[3].id, quantity: 1, unitPrice: 32900.0, subtotal: 32900.0, returnedQuantity: 1 }
        ]
      }
    }
  });

  // Pedido 4: En Camino (Sin entrega)
  const o4 = await prisma.order.create({
    data: {
      orderCode: "ORD-2026-104",
      customerName: "Andrés Felipe Castro",
      customerDocument: "80123456",
      customerEmail: "andres.castro@example.com",
      totalAmount: 45500.0,
      status: "EN_CAMINO",
      createdAt: daysAgo(1),
      deliveredAt: null,
      items: {
        create: [
          { productId: products[0].id, quantity: 1, unitPrice: 24500.0, subtotal: 24500.0, returnedQuantity: 0 },
          { productId: products[2].id, quantity: 1, unitPrice: 21000.0, subtotal: 21000.0, returnedQuantity: 0 }
        ]
      }
    }
  });

  // Pedido 5: Múltiples Artículos (Entregado hace 2 días)
  const o5 = await prisma.order.create({
    data: {
      orderCode: "ORD-2026-105",
      customerName: "Mariana Silva",
      customerDocument: "10145678",
      customerEmail: "mariana.silva@example.com",
      totalAmount: 160500.0,
      status: "ENTREGADO",
      createdAt: daysAgo(3),
      deliveredAt: daysAgo(2),
      items: {
        create: [
          { productId: products[4].id, quantity: 2, unitPrice: 25800.0, subtotal: 51600.0, returnedQuantity: 0 },
          { productId: products[1].id, quantity: 2, unitPrice: 38000.0, subtotal: 76000.0, returnedQuantity: 0 },
          { productId: products[3].id, quantity: 1, unitPrice: 32900.0, subtotal: 32900.0, returnedQuantity: 0 }
        ]
      }
    }
  });

  console.log("¡Semillero de base de datos completado exitosamente!");
}

if (require.main === module) {
  runSeed()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}