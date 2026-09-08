"use client";

import React, { useState } from "react";
import { Printer, Check, Copy, Ticket, Store, ShieldCheck, X } from "lucide-react";

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
  const [copied, setCopied] = useState(false);

  if (!receipt) return null;

  const handleCopyCode = () => {
    if (receipt.voucherCode) {
      navigator.clipboard.writeText(receipt.voucherCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5 border border-slate-100 relative animate-in zoom-in-95 duration-200 print-area">
        {/* Close icon for non-print */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition print:hidden"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" /> Devolución Autorizada
          </div>
          <h3 className="text-2xl font-black tracking-tight text-slate-900 mt-2">
            MERCADO <span className="text-emerald-600">VIVA</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Comprobante de Devolución en Tienda Física &bull; BORIS
          </p>
        </div>

        {/* Voucher Ticket Box */}
        {receipt.voucherCode ? (
          <div className="bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-emerald-500/10 border-2 border-dashed border-emerald-500/80 rounded-2xl p-5 text-center space-y-2 relative overflow-hidden">
            <span className="text-[10px] font-black tracking-widest text-emerald-800 uppercase block">
              VALE DE COMPRA DIGITAL (STORE CREDIT)
            </span>

            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl sm:text-3xl font-mono font-black text-emerald-950 tracking-wider">
                {receipt.voucherCode}
              </span>
              <button
                onClick={handleCopyCode}
                title="Copiar código"
                className="p-1.5 rounded-lg bg-white/80 hover:bg-white text-emerald-700 shadow-sm border border-emerald-200 transition print:hidden"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="text-xl font-black text-emerald-700">
              ${receipt.totalRefunded.toLocaleString()} COP
            </div>

            <p className="text-[11px] text-emerald-700 font-medium">
              Redimible de inmediato en cualquier caja de la tienda o compra online
            </p>
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center space-y-1">
            <span className="text-xs font-black text-blue-900 uppercase tracking-wider block">
              Reembolso al Medio de Pago Original
            </span>
            <div className="text-2xl font-black text-blue-800">
              ${receipt.totalRefunded.toLocaleString()} COP
            </div>
            <p className="text-[11px] text-blue-600">
              Se ha emitido la orden de reversión hacia la tarjeta o medio utilizado en la compra digital
            </p>
          </div>
        )}

        {/* Transaction Metadata */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs space-y-2 text-slate-600">
          <div className="flex justify-between">
            <span className="text-slate-400">N° Transacción:</span>
            <span className="font-mono font-bold text-slate-800">{receipt.returnCode}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Pedido Digital:</span>
            <span className="font-bold text-slate-800">{receipt.orderCode}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Sucursal Receptora:</span>
            <span className="font-bold text-slate-800">{receipt.storeName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Atendido por:</span>
            <span className="font-bold text-slate-800">{receipt.clerkName}</span>
          </div>

          <div className="border-t border-slate-200 pt-2 mt-2">
            <span className="text-[11px] font-bold text-slate-700 block mb-1.5">Artículos Devueltos:</span>
            <div className="space-y-1.5">
              {receipt.items.map((it) => (
                <div key={it.id} className="flex justify-between items-center text-[11px] bg-white p-2 rounded-lg border border-slate-200">
                  <span><b>{it.productName}</b> (x{it.quantity})</span>
                  <span className={`px-2 py-0.5 rounded-full font-black text-[10px] uppercase ${
                    it.restocked ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                  }`}>
                    {it.restocked ? "Reingresado a Góndola" : "Merma"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-1 print:hidden">
          <button
            onClick={() => window.print()}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition"
          >
            <Printer className="w-4 h-4" /> Imprimir Comprobante
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs shadow-lg shadow-emerald-600/20 transition"
          >
            Aceptar y Continuar
          </button>
        </div>
      </div>
    </div>
  );
};