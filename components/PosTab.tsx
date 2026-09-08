"use client";

import React from "react";
import { 
  Store, Search, XCircle, CheckCircle2, AlertTriangle, ShieldCheck, 
  Package, User, Calendar, CreditCard, Ticket, ArrowRight, Sparkles, 
  RotateCcw, Minus, Plus, AlertCircle, Check
} from "lucide-react";

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
      {/* Demo Quick Pills / Casos Académicos */}
      <div className="bg-white/80 backdrop-blur border border-slate-200/90 rounded-2xl p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-black text-slate-700 uppercase tracking-wider">
              Casos Rápidos para Demostración:
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => { setSearchCode("ORD-2026-101"); onSearch("ORD-2026-101"); }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                searchCode === "ORD-2026-101" 
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20 ring-2 ring-emerald-400" 
                  : "bg-slate-100 hover:bg-slate-200/80 text-slate-700"
              }`}
            >
              <Check className="w-3.5 h-3.5" /> ORD-2026-101 <span className="opacity-70 text-[11px]">(5 días)</span>
            </button>
            <button
              onClick={() => { setSearchCode("ORD-2026-105"); onSearch("ORD-2026-105"); }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                searchCode === "ORD-2026-105" 
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20 ring-2 ring-emerald-400" 
                  : "bg-slate-100 hover:bg-slate-200/80 text-slate-700"
              }`}
            >
              <Check className="w-3.5 h-3.5" /> ORD-2026-105 <span className="opacity-70 text-[11px]">(2 días &bull; Multi)</span>
            </button>
            <button
              onClick={() => { setSearchCode("ORD-2026-102"); onSearch("ORD-2026-102"); }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                searchCode === "ORD-2026-102" 
                  ? "bg-amber-600 text-white shadow-md shadow-amber-600/20 ring-2 ring-amber-400" 
                  : "bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80"
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> ORD-2026-102 <span className="opacity-70 text-[11px]">(45d Vencido)</span>
            </button>
            <button
              onClick={() => { setSearchCode("ORD-2026-103"); onSearch("ORD-2026-103"); }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                searchCode === "ORD-2026-103" 
                  ? "bg-rose-600 text-white shadow-md shadow-rose-600/20 ring-2 ring-rose-400" 
                  : "bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200/80"
              }`}
            >
              <XCircle className="w-3.5 h-3.5 text-rose-600" /> ORD-2026-103 <span className="opacity-70 text-[11px]">(Ya Devuelto)</span>
            </button>
            <button
              onClick={() => { setSearchCode("ORD-2026-104"); onSearch("ORD-2026-104"); }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                searchCode === "ORD-2026-104" 
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20 ring-2 ring-blue-400" 
                  : "bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200/80"
              }`}
            >
              <Package className="w-3.5 h-3.5 text-blue-600" /> ORD-2026-104 <span className="opacity-70 text-[11px]">(En Camino)</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 cols): Lookup & Order Card */}
        <div className="lg:col-span-5 space-y-6">
          {/* Lookup Panel */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <Store className="w-4 h-4 text-emerald-600" />
                1. Selección de Sucursal y Búsqueda
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                Paso 1
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Sucursal Física Receptora de Devolución:
              </label>
              <select
                value={selectedStoreId}
                onChange={(e) => setSelectedStoreId(parseInt(e.target.value, 10))}
                className="w-full bg-slate-50 border border-slate-300 hover:border-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 rounded-xl p-2.5 text-xs font-semibold text-slate-800 transition outline-none"
              >
                {stores.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.city})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Código de Pedido o Cédula del Cliente:
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchCode}
                    onChange={(e) => setSearchCode(e.target.value)}
                    placeholder="ORD-2026-101 o 10203040"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 hover:border-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 rounded-xl text-xs font-medium text-slate-900 transition outline-none"
                    onKeyDown={(e) => e.key === "Enter" && onSearch()}
                  />
                </div>
                <button
                  onClick={() => onSearch()}
                  disabled={loadingOrder}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition shadow-md shadow-emerald-600/20 flex items-center gap-1.5 disabled:opacity-50"
                >
                  {loadingOrder ? (
                    <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                  ) : (
                    <>Consultar</>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {orderError && (
            <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl flex items-start gap-3 shadow-sm animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-rose-900">Validación Rechazada</h4>
                <p className="text-xs text-rose-700 mt-0.5">{orderError}</p>
              </div>
            </div>
          )}

          {/* Order Details Card */}
          {currentOrder && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Compra Digital
                  </span>
                  <h3 className="text-base font-black text-slate-900 tracking-tight">
                    {currentOrder.orderCode}
                  </h3>
                </div>
                <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                  currentOrder.status === "ENTREGADO" 
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300" 
                    : currentOrder.status === "DEVUELTO_PARCIAL" 
                    ? "bg-blue-100 text-blue-800 border border-blue-300" 
                    : "bg-rose-100 text-rose-800 border border-rose-300"
                }`}>
                  {currentOrder.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50/80 rounded-xl p-3.5 border border-slate-100">
                <div>
                  <span className="text-[11px] text-slate-500 block">Cliente:</span>
                  <span className="font-bold text-slate-800">{currentOrder.customerName}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">Identificación:</span>
                  <span className="font-bold text-slate-800">{currentOrder.customerDocument}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">Monto Original:</span>
                  <span className="font-bold text-slate-800">${currentOrder.totalAmount.toLocaleString()} COP</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">Antigüedad:</span>
                  <span className="font-bold text-slate-800">
                    {currentOrder.daysSinceDelivery !== null ? `${currentOrder.daysSinceDelivery} días` : "N/D"}
                  </span>
                </div>
              </div>

              {/* Policy Diagnostic Alert */}
              <div className={`p-4 rounded-xl text-xs flex items-start gap-3 border ${
                currentOrder.isEligibleForReturn 
                  ? "bg-emerald-50/80 text-emerald-950 border-emerald-200" 
                  : "bg-amber-50/80 text-amber-950 border-amber-200"
              }`}>
                {currentOrder.isEligibleForReturn ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-extrabold uppercase tracking-wide text-[10px] text-slate-500">
                    Diagnóstico de Reglas BORIS
                  </div>
                  <div className="font-semibold text-xs mt-0.5 leading-relaxed">
                    {currentOrder.eligibilityReason}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column (7 cols): Return Form & Checklist */}
        <div className="lg:col-span-7">
          {currentOrder && currentOrder.isEligibleForReturn ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 animate-in fade-in slide-in-from-right-2 duration-150">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  2. Inspección Física y Selección de Artículos
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Paso 2 &bull; Caja POS
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                  <span>Artículos del pedido:</span>
                  <span className="text-[11px] text-slate-500 font-normal">Marca los artículos que el cliente entrega</span>
                </div>

                <div className="space-y-2.5">
                  {currentOrder.items
                    .filter((it) => it.eligibleQuantity > 0)
                    .map((it) => {
                      const isChecked = selectedItems[it.id]?.checked ?? false;
                      const qty = selectedItems[it.id]?.quantity ?? 1;

                      return (
                        <div
                          key={it.id}
                          className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                            isChecked 
                              ? "border-emerald-500 bg-emerald-50/40 shadow-sm ring-1 ring-emerald-500/20" 
                              : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
                          }`}
                        >
                          <div className="flex items-start gap-3 flex-1">
                            <input
                              type="checkbox"
                              id={`item-${it.id}`}
                              checked={isChecked}
                              onChange={(e) =>
                                setSelectedItems({
                                  ...selectedItems,
                                  [it.id]: { checked: e.target.checked, quantity: qty },
                                })
                              }
                              className="w-4 h-4 mt-1 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                            />
                            <label htmlFor={`item-${it.id}`} className="cursor-pointer">
                              <div className="text-xs font-bold text-slate-900">{it.productName}</div>
                              <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                                <span className="font-mono bg-slate-200/70 px-1.5 py-0.2 rounded text-[10px]">{it.productSku}</span>
                                <span>&bull;</span>
                                <span className="font-semibold text-slate-700">${it.unitPrice.toLocaleString()} COP c/u</span>
                                <span>&bull;</span>
                                <span className="text-emerald-700 font-bold">Disp: {it.eligibleQuantity}</span>
                              </div>
                            </label>
                          </div>

                          {/* Stepper Quantity Control */}
                          {isChecked && (
                            <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-lg p-1 shadow-sm">
                              <button
                                type="button"
                                onClick={() => {
                                  const n = Math.max(1, qty - 1);
                                  setSelectedItems({ ...selectedItems, [it.id]: { checked: true, quantity: n } });
                                }}
                                className="w-6 h-6 rounded flex items-center justify-center hover:bg-slate-100 text-slate-600 transition"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-7 text-center text-xs font-black text-slate-800">{qty}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  const n = Math.min(it.eligibleQuantity, qty + 1);
                                  setSelectedItems({ ...selectedItems, [it.id]: { checked: true, quantity: n } });
                                }}
                                className="w-6 h-6 rounded flex items-center justify-center hover:bg-slate-100 text-slate-600 transition"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Form Options: Inspection & Refund Mode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Inspección Física del Empaque:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCondition("OPTIMO")}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                        condition === "OPTIMO"
                          ? "border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20"
                          : "border-slate-200 text-slate-600 hover:border-slate-300 bg-slate-50"
                      }`}
                    >
                      <span className="block font-bold">ÓPTIMO</span>
                      <span className="text-[10px] opacity-75 block font-normal mt-0.5">Reingresa a Góndola (+stock)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCondition("DANADO")}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                        condition === "DANADO"
                          ? "border-amber-600 bg-amber-50 text-amber-950 font-bold ring-2 ring-amber-500/20"
                          : "border-slate-200 text-slate-600 hover:border-slate-300 bg-slate-50"
                      }`}
                    >
                      <span className="block font-bold">DAÑADO</span>
                      <span className="text-[10px] opacity-75 block font-normal mt-0.5">Registro de Merma / Descarte</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Modalidad de Compensación:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRefundType("VALE_COMPRA")}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                        refundType === "VALE_COMPRA"
                          ? "border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20"
                          : "border-slate-200 text-slate-600 hover:border-slate-300 bg-slate-50"
                      }`}
                    >
                      <Ticket className="w-3.5 h-3.5 text-emerald-600 mb-0.5" />
                      <span className="block font-bold">Vale Digital</span>
                      <span className="text-[10px] opacity-75 block font-normal">Store Credit Inmediato</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRefundType("REEMBOLSO_MEDIO_ORIGINAL")}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                        refundType === "REEMBOLSO_MEDIO_ORIGINAL"
                          ? "border-blue-600 bg-blue-50 text-blue-950 font-bold ring-2 ring-blue-500/20"
                          : "border-slate-200 text-slate-600 hover:border-slate-300 bg-slate-50"
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5 text-blue-600 mb-0.5" />
                      <span className="block font-bold">Medio Original</span>
                      <span className="text-[10px] opacity-75 block font-normal">Reversión a Tarjeta</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Operational Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Cajero / Asesor:</label>
                  <input
                    type="text"
                    value={clerkName}
                    onChange={(e) => setClerkName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:border-emerald-600 focus:bg-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Motivo de Devolución:</label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:border-emerald-600 focus:bg-white outline-none"
                  >
                    <option value="Error de compra del cliente">Error de compra del cliente</option>
                    <option value="Producto duplicado">Producto duplicado</option>
                    <option value="No corresponde con la foto digital">No corresponde con la foto digital</option>
                    <option value="Cambio por otra referencia">Cambio por otra referencia</option>
                    <option value="Garantía de calidad">Garantía de calidad</option>
                  </select>
                </div>
              </div>

              {/* Total Refund Banner */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-4 flex items-center justify-between shadow-md">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">
                    Total a Reembolsar al Cliente:
                  </span>
                  <span className="text-2xl font-black text-emerald-400 tracking-tight">
                    ${totalRefund.toLocaleString()} COP
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Sincronización:</span>
                  <span className="text-xs font-bold text-emerald-300 flex items-center gap-1 justify-end">
                    <Sparkles className="w-3 h-3" /> Transacción ACID
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={onProcessReturn}
                disabled={submittingReturn || totalRefund <= 0}
                className="w-full py-3.5 px-6 rounded-xl font-black text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-600/30 transition-all transform active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
              >
                {submittingReturn ? (
                  <>
                    <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                    Procesando Transacción en Vercel...
                  </>
                ) : (
                  <>
                    <span>Confirmar Devolución y Emitir Comprobante</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center text-slate-400 flex flex-col items-center justify-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                <RotateCcw className="w-7 h-7" />
              </div>
              <h3 className="text-sm font-bold text-slate-700">Esperando Selección de Pedido</h3>
              <p className="text-xs text-slate-500 max-w-sm">
                Consulta un pedido digital elegible o presiona uno de los botones de demo rápida en la parte superior para habilitar el mostrador de recepción física.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};