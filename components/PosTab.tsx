"use client";

import React from "react";
import { Store, Search, XCircle, CheckCircle2, AlertTriangle, ShieldCheck, Tag } from "lucide-react";

export interface OrderItemDetail {
  id: number;
  productId: number;
  productName: string;
  productSku: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  returnedQuantity: number;
  eligibleQuantity: number;
}

export interface OrderDetail {
  id: number;
  orderCode: string;
  customerName: string;
  customerDocument: string;
  customerEmail: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  deliveredAt: string | null;
  daysSinceDelivery: number | null;
  isEligibleForReturn: boolean;
  eligibilityReason: string;
  items: OrderItemDetail[];
}

interface PosTabProps {
  stores: Array<{ id: number; name: string; city: string }>;
  selectedStoreId: number;
  setSelectedStoreId: (id: number) => void;
  searchCode: string;
  setSearchCode: (c: string) => void;
  onSearch: (c?: string) => void;
  loadingOrder: boolean;
  orderError: string | null;
  currentOrder: OrderDetail | null;
  selectedItems: { [id: number]: { checked: boolean; quantity: number } };
  setSelectedItems: React.Dispatch<React.SetStateAction<{ [id: number]: { checked: boolean; quantity: number } }>>;
  clerkName: string;
  setClerkName: (n: string) => void;
  reason: string;
  setReason: (r: string) => void;
  condition: "OPTIMO" | "DANADO";
  setCondition: (c: "OPTIMO" | "DANADO") => void;
  refundType: "VALE_COMPRA" | "REEMBOLSO_MEDIO_ORIGINAL";
  setRefundType: (t: "VALE_COMPRA" | "REEMBOLSO_MEDIO_ORIGINAL") => void;
  onProcessReturn: () => void;
  submittingReturn: boolean;
  totalRefund: number;
}

export const PosTab: React.FC<PosTabProps> = ({
  stores,
  selectedStoreId,
  setSelectedStoreId,
  searchCode,
  setSearchCode,
  onSearch,
  loadingOrder,
  orderError,
  currentOrder,
  selectedItems,
  setSelectedItems,
  clerkName,
  setClerkName,
  reason,
  setReason,
  condition,
  setCondition,
  refundType,
  setRefundType,
  onProcessReturn,
  submittingReturn,
  totalRefund,
}) => {
  return (
    <div className="space-y-6">
      {/* Demo Quick Pills */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Casos Rápidos para Demo:</span>
        <button
          onClick={() => { setSearchCode("ORD-2026-101"); onSearch("ORD-2026-101"); }}
          className="bg-white border border-slate-300 hover:border-viva-600 hover:text-viva-700 text-xs px-3 py-1.5 rounded-full shadow-sm font-medium transition"
        >
          ✅ ORD-2026-101 (Válido: 5 días)
        </button>
        <button
          onClick={() => { setSearchCode("ORD-2026-105"); onSearch("ORD-2026-105"); }}
          className="bg-white border border-slate-300 hover:border-viva-600 hover:text-viva-700 text-xs px-3 py-1.5 rounded-full shadow-sm font-medium transition"
        >
          ✅ ORD-2026-105 (Válido: 2 días)
        </button>
        <button
          onClick={() => { setSearchCode("ORD-2026-102"); onSearch("ORD-2026-102"); }}
          className="bg-amber-50 border border-amber-300 hover:border-amber-500 text-amber-900 text-xs px-3 py-1.5 rounded-full shadow-sm font-medium transition"
        >
          ⚠️ ORD-2026-102 (Excepcional: Vencido 45 días)
        </button>
        <button
          onClick={() => { setSearchCode("ORD-2026-103"); onSearch("ORD-2026-103"); }}
          className="bg-amber-50 border border-amber-300 hover:border-amber-500 text-amber-900 text-xs px-3 py-1.5 rounded-full shadow-sm font-medium transition"
        >
          ⚠️ ORD-2026-103 (Excepcional: Ya devuelto)
        </button>
        <button
          onClick={() => { setSearchCode("ORD-2026-104"); onSearch("ORD-2026-104"); }}
          className="bg-amber-50 border border-amber-300 hover:border-amber-500 text-amber-900 text-xs px-3 py-1.5 rounded-full shadow-sm font-medium transition"
        >
          ⚠️ ORD-2026-104 (Excepcional: En camino)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Search & Order Details */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-navy-900 flex items-center gap-2">
              <Store className="w-5 h-5 text-viva-600" />
              1. Búsqueda y Validación de Compra Digital
            </h2>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Sucursal Física Receptora:
              </label>
              <select
                value={selectedStoreId}
                onChange={(e) => setSelectedStoreId(parseInt(e.target.value, 10))}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-viva-500 focus:outline-none"
              >
                {stores.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.city})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Código de Pedido o Cédula del Cliente:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  placeholder="Ej: ORD-2026-101 o 10203040"
                  className="flex-1 border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-viva-500 focus:outline-none"
                  onKeyDown={(e) => e.key === "Enter" && onSearch()}
                />
                <button
                  onClick={() => onSearch()}
                  disabled={loadingOrder}
                  className="bg-viva-600 hover:bg-viva-700 text-white font-semibold px-4 py-2.5 rounded-lg text-sm transition flex items-center gap-1 shadow-sm"
                >
                  <Search className="w-4 h-4" /> {loadingOrder ? "Buscando..." : "Consultar"}
                </button>
              </div>
            </div>
          </div>

          {orderError && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-red-800">No elegible para devolución</h4>
                <p className="text-xs text-red-700 mt-1">{orderError}</p>
              </div>
            </div>
          )}

          {currentOrder && (
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-gray-400">PEDIDO DIGITAL</span>
                  <h3 className="text-lg font-extrabold text-navy-900">{currentOrder.orderCode}</h3>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase ${
                  currentOrder.status === "ENTREGADO" ? "bg-emerald-100 text-emerald-800" :
                  currentOrder.status === "DEVUELTO_PARCIAL" ? "bg-blue-100 text-blue-800" :
                  "bg-red-100 text-red-800"
                }`}>
                  {currentOrder.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs border-y border-gray-100 py-3 text-gray-600">
                <div><span className="font-semibold">Cliente:</span> {currentOrder.customerName}</div>
                <div><span className="font-semibold">Documento:</span> {currentOrder.customerDocument}</div>
                <div><span className="font-semibold">Email:</span> {currentOrder.customerEmail}</div>
                <div><span className="font-semibold">Total Compra:</span> ${currentOrder.totalAmount.toLocaleString()} COP</div>
                <div className="col-span-2">
                  <span className="font-semibold">Antigüedad:</span>{" "}
                  {currentOrder.daysSinceDelivery !== null ? (
                    <span>{currentOrder.daysSinceDelivery} días desde entrega (Límite: 30 días)</span>
                  ) : (
                    "Sin entrega registrada"
                  )}
                </div>
              </div>

              <div className={`p-3.5 rounded-lg text-xs flex items-start gap-2.5 ${
                currentOrder.isEligibleForReturn 
                  ? "bg-emerald-50 text-emerald-900 border border-emerald-200" 
                  : "bg-amber-50 text-amber-900 border border-amber-200"
              }`}>
                {currentOrder.isEligibleForReturn ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                )}
                <div>
                  <b className="font-bold">Diagnóstico de Reglas BORIS:</b> {currentOrder.eligibilityReason}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Return Form */}
        <div>
          {currentOrder && currentOrder.isEligibleForReturn ? (
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-5">
              <h2 className="text-base font-bold text-navy-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-viva-600" />
                2. Inspección Física y Selección de Artículos
              </h2>

              <div className="space-y-3">
                <label className="block text-xs font-semibold text-gray-700">
                  Selecciona los artículos a recibir en caja:
                </label>

                <div className="divide-y divide-gray-100 border border-gray-200 rounded-lg p-3 bg-slate-50/50">
                  {currentOrder.items
                    .filter((it) => it.eligibleQuantity > 0)
                    .map((it) => {
                      const isChecked = selectedItems[it.id]?.checked ?? false;
                      const qty = selectedItems[it.id]?.quantity ?? 1;

                      return (
                        <div key={it.id} className="py-2.5 flex items-center justify-between gap-3">
                          <div className="flex items-start gap-2.5 flex-1">
                            <input
                              type="checkbox"
                              id={`check-${it.id}`}
                              checked={isChecked}
                              onChange={(e) =>
                                setSelectedItems({
                                  ...selectedItems,
                                  [it.id]: { checked: e.target.checked, quantity: qty },
                                })
                              }
                              className="mt-1 rounded text-viva-600 focus:ring-viva-500"
                            />
                            <label htmlFor={`check-${it.id}`} className="text-xs cursor-pointer">
                              <div className="font-bold text-gray-800">{it.productName}</div>
                              <div className="text-gray-500 text-[11px]">
                                SKU: {it.productSku} | Unitario: ${it.unitPrice.toLocaleString()} COP | Disp: {it.eligibleQuantity}
                              </div>
                            </label>
                          </div>

                          {isChecked && (
                            <div className="flex items-center gap-1.5">
                              <span className="text-[11px] text-gray-500">Cant:</span>
                              <input
                                type="number"
                                min={1}
                                max={it.eligibleQuantity}
                                value={qty}
                                onChange={(e) => {
                                  const val = Math.max(1, Math.min(it.eligibleQuantity, parseInt(e.target.value, 10) || 1));
                                  setSelectedItems({
                                    ...selectedItems,
                                    [it.id]: { checked: true, quantity: val },
                                  });
                                }}
                                className="w-14 border border-gray-300 rounded p-1 text-center text-xs font-bold"
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Cajero / Asesor:</label>
                  <input
                    type="text"
                    value={clerkName}
                    onChange={(e) => setClerkName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-viva-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Motivo:</label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-viva-500"
                  >
                    <option value="Error de compra del cliente">Error de compra del cliente</option>
                    <option value="Producto duplicado">Producto duplicado</option>
                    <option value="No corresponde con la foto digital">No corresponde con la foto digital</option>
                    <option value="Cambio por otra referencia">Cambio por otra referencia</option>
                    <option value="Garantía de calidad">Garantía de calidad</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Inspección Física:</label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value as any)}
                    className="w-full border border-gray-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-viva-500 font-semibold"
                  >
                    <option value="OPTIMO">ÓPTIMO (Reingresa a Góndola)</option>
                    <option value="DANADO">DAÑADO / ABIERTO (Merma / Descarte)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Compensación:</label>
                  <select
                    value={refundType}
                    onChange={(e) => setRefundType(e.target.value as any)}
                    className="w-full border border-gray-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-viva-500"
                  >
                    <option value="VALE_COMPRA">Vale Inmediato (Store Credit)</option>
                    <option value="REEMBOLSO_MEDIO_ORIGINAL">Reembolso a Tarjeta / Medio Original</option>
                  </select>
                </div>
              </div>

              <div className="bg-navy-50 border border-navy-100 rounded-xl p-4 flex justify-between items-center">
                <span className="text-sm font-bold text-navy-900">Total a Reembolsar:</span>
                <span className="text-2xl font-extrabold text-viva-700">
                  ${totalRefund.toLocaleString()} COP
                </span>
              </div>

              <button
                onClick={onProcessReturn}
                disabled={submittingReturn || totalRefund <= 0}
                className="w-full bg-viva-600 hover:bg-viva-700 text-white font-bold py-3 px-4 rounded-xl shadow transition disabled:opacity-50 text-sm flex items-center justify-center gap-2"
              >
                {submittingReturn ? "Procesando en Vercel..." : "Procesar Devolución en Tienda"}
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center text-gray-400">
              <Tag className="w-12 h-12 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium">Consulta un pedido válido para habilitar el formulario de devolución</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};