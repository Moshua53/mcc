"use client";

import React from "react";
import { Store, ShieldCheck, Sparkles, Activity } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 text-white px-6 py-3.5 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/30">
            <Store className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                MERCADO <span className="text-emerald-400">VIVA</span>
              </h1>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> BORIS OMNICANAL
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Devolución de Compras Digitales en Tienda Física &bull; Punto de Venta (POS)
            </p>
          </div>
        </div>

        {/* Live System Status Badges */}
        <div className="flex items-center gap-3 text-xs">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-medium text-[11px]">Política: 30 días máx.</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 font-semibold text-[11px] shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Vercel Serverless &bull; React 18</span>
          </div>
        </div>
      </div>
    </header>
  );
};