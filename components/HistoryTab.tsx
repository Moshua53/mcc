"use client";

import React, { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";

export const HistoryTab: React.FC = () => {
  const [returnsHistory, setReturnsHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/returns");
      if (res.ok) {
        const data = await res.json();
        setReturnsHistory(data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-navy-900">Historial de Devoluciones y Auditoría</h2>
          <p className="text-xs text-gray-500">
            Registro inmutable de transacciones BORIS procesadas en tiendas físicas.
          </p>
        </div>
        <button
          onClick={loadHistory}
          disabled={loading}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Actualizar
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-gray-200 text-gray-600">
              <th className="p-3">N° Devolución</th>
              <th className="p-3">Pedido</th>
              <th className="p-3">Sucursal</th>
              <th className="p-3">Total Reembolsado</th>
              <th className="p-3">Vale Emitido / Medio</th>
              <th className="p-3">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {returnsHistory.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50/70">
                <td className="p-3 font-mono font-bold text-navy-900">{r.returnCode}</td>
                <td className="p-3 font-semibold text-gray-700">{r.orderCode}</td>
                <td className="p-3 text-gray-600">{r.storeName}</td>
                <td className="p-3 font-bold text-viva-700">${r.totalRefunded.toLocaleString()} COP</td>
                <td className="p-3 font-mono text-viva-800 font-semibold">{r.voucherCode || r.refundType}</td>
                <td className="p-3">
                  <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
            {returnsHistory.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-400">
                  {loading ? "Cargando historial..." : "Aún no hay devoluciones registradas."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};