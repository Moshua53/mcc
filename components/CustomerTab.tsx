"use client";

import React, { useState } from "react";
import { Search, ShoppingBag, Clock, Store, CheckCircle, ArrowRight, HelpCircle, ShieldCheck } from "lucide-react";

interface CustomerTabProps {
  onSearch: (code: string) => void;
}

export const CustomerTab: React.FC<CustomerTabProps> = ({ onSearch }) => {
  const [code, setCode] = useState("");

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-950 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-[11px] font-extrabold uppercase px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 inline-block">
            Portal de Autogestión Omnicanal
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            ¿Compraste online y necesitas hacer un cambio?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Ahora puedes devolver tus compras de la web o app móvil en cualquiera de nuestras sucursales físicas de <b>Mercado VIVA</b> en menos de 3 minutos, sin costos de envío ni esperas de paquetería.
          </p>

          {/* Quick Search Bar */}
          <div className="pt-3 flex flex-col sm:flex-row gap-2 max-w-lg">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Ingresa tu cédula o código de orden (Ej: ORD-2026-101)"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSearch(code)}
                className="w-full pl-9 pr-3 py-3 bg-white/10 hover:bg-white/15 focus:bg-white text-slate-900 placeholder:text-slate-300 focus:placeholder:text-slate-400 focus:ring-4 focus:ring-emerald-400/30 rounded-xl text-xs font-semibold backdrop-blur transition outline-none"
              />
            </div>
            <button
              onClick={() => onSearch(code)}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-3 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30"
            >
              <span>Consultar en Caja</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Decorative backdrop elements */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* 3 Step Process Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-sm">
            01
          </div>
          <h3 className="font-extrabold text-sm text-slate-900">1. Consulta tu Pedido</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Verifica que tu compra esté en estado entregado y dentro del plazo de 30 días calendario con tu código de orden o cédula.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-sm">
            02
          </div>
          <h3 className="font-extrabold text-sm text-slate-900">2. Acércate al Mostrador</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Lleva el producto con sus sellos y empaque original a cualquiera de nuestras 3 sucursales (Norte, Centro o Chapinero).
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-sm">
            03
          </div>
          <h3 className="font-extrabold text-sm text-slate-900">3. Saldo Inmediato</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Recibe un Vale de Compra Digital redimible de inmediato en cualquier caja o producto del supermercado.
          </p>
        </div>
      </div>

      {/* Policy Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Condiciones de Aceptación BORIS
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-600">
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span><b>Plazo Comercial:</b> 30 días continuos contados desde la recepción física del pedido.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span><b>Estado del Producto:</b> Empaque original, sellos íntegros y sin señales de consumo para artículos de góndola.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span><b>Trazabilidad:</b> No se admiten órdenes sin entrega certificada o previamente devueltas en su totalidad.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <Store className="w-4 h-4 text-emerald-600" />
            Red de Tiendas Físicas
          </h3>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-800">Sede Norte</span>
                <span className="text-[11px] text-slate-500 block">Calle 127 #15-30, Bogotá</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Activa</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-800">Sede Centro</span>
                <span className="text-[11px] text-slate-500 block">Carrera 7 #32-16, Bogotá</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Activa</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-800">Sede Chapinero</span>
                <span className="text-[11px] text-slate-500 block">Carrera 13 #63-39, Bogotá</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Activa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};