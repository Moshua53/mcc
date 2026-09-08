"use client";

import React from "react";
import { Printer } from "lucide-react";

export interface ReturnReceipt {
  id: number;
  returnCode: string;
  orderCode: string;
  storeName: string;
  clerkName: string;
  reason: string;
  productCondition: string;
  refundType: string;
  voucherCode: string | null;
  totalRefunded: number;
  status: string;
  message: string;
  items: Array<{
    id: number;
    productName: string;
    productSku: string;
    quantity: number;
    refundAmount: number;
    restocked: boolean;
  }>;
}

interface ReceiptModalProps {
  receipt: ReturnReceipt | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ receipt, onClose }) => {
  if (!receipt) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in duration-150">
        <div className="text-center">
          <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full uppercase">
            Devolución Exitosa
          </span>
          <h3 className="text-xl font-extrabold text-navy-900 mt-2">MERCADO VIVA</h3>
          <p className="text-xs text-gray-500">Comprobante de Devolución en Tienda Física</p>
        </div>

        {receipt.voucherCode ? (
          <div className="bg-emerald-50 border-2 border-dashed border-emerald-500 rounded-xl p-4 text-center">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">
              Vale de Compra Digital
            </span>
            <div className="text-2xl font-black text-emerald-900 tracking-wider my-1">
              {receipt.voucherCode}
            </div>
            <div className="text-lg font-extrabold text-emerald-700">
              ${receipt.totalRefunded.toLocaleString()} COP
            </div>
            <p className="text-[10px] text-emerald-600 mt-1">
              Redimible inmediatamente en cualquier caja física o compra web
            </p>
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
            <span className="text-xs font-bold text-blue-900">Reembolso Procesado</span>
            <div className="text-xl font-bold text-blue-800">
              ${receipt.totalRefunded.toLocaleString()} COP
            </div>
            <p className="text-[11px] text-blue-600">
              Aplicado al medio de pago original de la compra digital
            </p>
          </div>
        )}

        <div className="text-xs space-y-1 border-t border-gray-100 pt-3 text-gray-600">
          <p><span className="font-semibold">N° Devolución:</span> {receipt.returnCode}</p>
          <p><span className="font-semibold">Sucursal:</span> {receipt.storeName}</p>
          <p><span className="font-semibold">Atendido por:</span> {receipt.clerkName}</p>
          <div className="mt-2">
            <span className="font-semibold">Artículos Recibidos:</span>
            <ul className="mt-1 space-y-1">
              {receipt.items.map((it) => (
                <li key={it.id} className="flex justify-between items-center text-[11px] bg-slate-50 p-1.5 rounded">
                  <span><b>{it.productName}</b> x{it.quantity}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    it.restocked ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                  }`}>
                    {it.restocked ? "Reingresado a Góndola" : "Merma"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={() => window.print()}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" /> Imprimir
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-viva-600 hover:bg-viva-700 text-white font-bold py-2 rounded-lg text-xs"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};