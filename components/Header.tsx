"use client";

import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="bg-navy-900 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <div className="flex items-center gap-3">
        <span className="bg-viva-600 text-white font-bold text-xs px-2.5 py-1 rounded">
          MVP OMNICANAL
        </span>
        <div>
          <h1 className="text-xl font-extrabold tracking-tight">MERCADO VIVA</h1>
          <p className="text-xs text-slate-300">
            Devolución de Compra Digital en Tienda Física (BORIS)
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs">
        <span className="bg-viva-100 text-viva-800 font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-viva-500 animate-pulse"></span>
          React 18 + Node.js (Vercel Ready)
        </span>
      </div>
    </header>
  );
};