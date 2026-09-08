"use client";

import React, { useState, useEffect } from "react";
import { RefreshCw, Package, Search, Layers, Building2, CheckCircle2 } from "lucide-react";

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
  const [searchQuery, setSearchQuery] = useState<string>("");
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

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = 
      item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.productSku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const totalUnits = inventory.reduce((acc, it) => acc + it.stock, 0);

  return (
    <div className="space-y-6">
      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Stock Total en Góndola
            </span>
            <span className="text-xl font-black text-slate-900">{totalUnits} unidades</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Sucursales Vinculadas
            </span>
            <span className="text-xl font-black text-slate-900">{stores.length} Tiendas</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Sincronización BORIS
            </span>
            <span className="text-xs font-black text-emerald-600">Reingreso Atómico Activo</span>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Control de Inventario Físico en Góndola</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Reflejo en tiempo real de los artículos reincorporados tras devoluciones aprobadas en caja.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            {/* Search filter */}
            <div className="relative flex-1 sm:w-48">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filtrar por SKU o nombre..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 outline-none focus:border-emerald-600 focus:bg-white"
              />
            </div>

            {/* Store filter */}
            <select
              value={storeFilter}
              onChange={(e) => setStoreFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 outline-none focus:border-emerald-600 focus:bg-white"
            >
              <option value="">Todas las sucursales</option>
              {stores.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>

            {/* Refresh button */}
            <button
              onClick={loadInventory}
              disabled={loading}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Actualizar
            </button>
          </div>
        </div>

        {/* Modern Table */}
        <div className="overflow-x-auto border border-slate-200/80 rounded-xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-3.5">Sucursal</th>
                <th className="p-3.5">SKU</th>
                <th className="p-3.5">Producto</th>
                <th className="p-3.5 text-right">Existencias</th>
                <th className="p-3.5 text-right">Estado</th>
                <th className="p-3.5 text-right">Última Actualización</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInventory.map((it) => (
                <tr key={it.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900">{it.storeName}</td>
                  <td className="p-3.5 font-mono text-slate-500">{it.productSku}</td>
                  <td className="p-3.5 font-semibold text-slate-800">{it.productName}</td>
                  <td className="p-3.5 text-right font-black text-slate-900 text-sm">
                    {it.stock} <span className="text-[11px] font-normal text-slate-400">uds</span>
                  </td>
                  <td className="p-3.5 text-right">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${
                      it.stock > 12 
                        ? "bg-emerald-100 text-emerald-800" 
                        : it.stock > 5 
                        ? "bg-blue-100 text-blue-800" 
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      {it.stock > 12 ? "Óptimo" : it.stock > 5 ? "Normal" : "Bajo"}
                    </span>
                  </td>
                  <td className="p-3.5 text-right text-slate-400 font-mono text-[11px]">
                    {new Date(it.lastUpdated).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
              {filteredInventory.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    {loading ? "Cargando inventario..." : "No se encontraron artículos con los filtros seleccionados."}
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