"use client";

import React, { useState, useEffect } from "react";
import { RefreshCw, History, Ticket, ArrowUpRight, Search, FileText } from "lucide-react";

export const HistoryTab: React.FC = () => {
  const [returnsHistory, setReturnsHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

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

  const filtered = returnsHistory.filter((r) => 
    r.returnCode.toLowerCase().includes(search.toLowerCase()) ||
    r.orderCode.toLowerCase().includes(search.toLowerCase()) ||
    (r.voucherCode && r.voucherCode.toLowerCase().includes(search.toLowerCase()))
  );

  const totalRefundedSum = returnsHistory.reduce((acc, r) => acc + (r.totalRefunded || 0), 0);

  return (
    <div className="space-y-6">
      {/* KPI Header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Ticket className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Total Reembolsado en Caja
            </span>
            <span className="text-xl font-black text-emerald-700">
              ${totalRefundedSum.toLocaleString()} COP
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Transacciones Registradas
            </span>
            <span className="text-xl font-black text-slate-900">{returnsHistory.length} Devoluciones</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
            <History className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Trazabilidad Inmutable
            </span>
            <span className="text-xs font-black text-purple-700">Auditoría 100% Completa</span>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Historial de Auditoría de Devoluciones</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Registro secuencial de devoluciones tramitadas en puntos de venta físicos.
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por código o vale..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 outline-none focus:border-emerald-600 focus:bg-white"
              />
            </div>
            <button
              onClick={loadHistory}
              disabled={loading}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Actualizar
            </button>
          </div>
        </div>

        <div className="overflow-x-auto border border-slate-200/80 rounded-xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-3.5">Código Devolución</th>
                <th className="p-3.5">Pedido Digital</th>
                <th className="p-3.5">Sucursal</th>
                <th className="p-3.5">Total Reembolsado</th>
                <th className="p-3.5">Vale / Modalidad</th>
                <th className="p-3.5">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-slate-900">{r.returnCode}</td>
                  <td className="p-3.5 font-semibold text-slate-700">{r.orderCode}</td>
                  <td className="p-3.5 text-slate-600">{r.storeName}</td>
                  <td className="p-3.5 font-black text-emerald-700">${r.totalRefunded.toLocaleString()} COP</td>
                  <td className="p-3.5">
                    {r.voucherCode ? (
                      <span className="font-mono bg-emerald-50 text-emerald-900 border border-emerald-300 px-2 py-0.5 rounded-lg text-[11px] font-bold">
                        {r.voucherCode}
                      </span>
                    ) : (
                      <span className="text-slate-500 text-[11px]">{r.refundType}</span>
                    )}
                  </td>
                  <td className="p-3.5">
                    <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-black text-[10px] uppercase tracking-wider">
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    {loading ? "Cargando historial..." : "Aún no se han registrado devoluciones."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};