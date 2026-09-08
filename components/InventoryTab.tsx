"use client";

import React, { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";

interface StoreItem {
  id: number;
  name: string;
}

interface InventoryTabProps {
  stores: StoreItem[];
}

export const InventoryTab: React.FC<InventoryTabProps> = ({ stores }) => {
  const [inventory, setInventory] = useState<any[]>([]);
  const [storeFilter, setStoreFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const loadInventory = async () => {
    setLoading(true);
    try {
      const url = storeFilter ? `/api/inventory?storeId=${storeFilter}` : "/api/inventory";
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setInventory(data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventory();
  }, [storeFilter]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-lg font-bold text-navy-900">Control de Inventario en Tiempo Real por Sucursal</h2>
          <p className="text-xs text-gray-500">
            Cuando se procesa una devolución en buen estado en caja, el stock de esta tabla se incrementa automáticamente.
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={storeFilter}
            onChange={(e) => setStoreFilter(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 text-xs"
          >
            <option value="">Todas las sucursales</option>
            {stores.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <button
            onClick={loadInventory}
            disabled={loading}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Actualizar
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-gray-200 text-gray-600">
              <th className="p-3">Sucursal</th>
              <th className="p-3">SKU</th>
              <th className="p-3">Producto</th>
              <th className="p-3 text-right">Stock en Góndola</th>
              <th className="p-3">Último Movimiento</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {inventory.map((it) => (
              <tr key={it.id} className="hover:bg-slate-50/70">
                <td className="p-3 font-semibold text-gray-800">{it.storeName}</td>
                <td className="p-3 font-mono text-gray-500">{it.productSku}</td>
                <td className="p-3 font-medium text-gray-800">{it.productName}</td>
                <td className="p-3 text-right font-extrabold text-viva-700 text-sm">{it.stock} uds</td>
                <td className="p-3 text-gray-400 text-[11px]">
                  {new Date(it.lastUpdated).toLocaleTimeString()}
                </td>
              </tr>
            ))}
            {inventory.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-400">
                  {loading ? "Cargando inventario..." : "No hay registros disponibles."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};