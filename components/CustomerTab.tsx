"use client";

import React, { useState } from "react";

interface CustomerTabProps {
  onSearch: (code: string) => void;
}

export const CustomerTab: React.FC<CustomerTabProps> = ({ onSearch }) => {
  const [code, setCode] = useState("");

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
      <div>
        <h2 className="text-lg font-bold text-navy-900">Portal de Autogestión Omnicanal — Mercado VIVA</h2>
        <p className="text-sm text-gray-600 mt-1">
          ¿Compraste por la web o app móvil? Ahora puedes devolver tus productos en cualquiera de nuestras tiendas físicas 
          sin esperas de paquetería y con saldo inmediato para tus compras.
        </p>
      </div>

      <div className="flex gap-2 max-w-md">
        <input
          type="text"
          placeholder="Ingresa tu cédula o código de orden (Ej: ORD-2026-101)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg p-2.5 text-sm"
        />
        <button
          onClick={() => onSearch(code)}
          className="bg-viva-600 hover:bg-viva-700 text-white font-semibold px-4 py-2.5 rounded-lg text-sm transition"
        >
          Consultar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
          <h4 className="font-bold text-sm text-navy-900">📌 Reglas del Servicio BORIS:</h4>
          <ul className="text-xs text-gray-600 space-y-1.5 list-disc list-inside">
            <li>Plazo de <b>30 días calendario</b> a partir de la entrega del pedido.</li>
            <li>Presenta el código de pedido o QR en el mostrador de servicio al cliente.</li>
            <li>El producto debe encontrarse con su empaque y sellos íntegros.</li>
            <li>Obtén un <b>Vale de Compra instantáneo</b> sin cobros por paquetería.</li>
          </ul>
        </div>

        <div className="bg-viva-50 border border-viva-200 rounded-xl p-4 space-y-2">
          <h4 className="font-bold text-sm text-viva-900">🏬 Sucursales Habilitadas:</h4>
          <p className="text-xs text-viva-800">
            Todas nuestras sedes (Sede Norte, Centro y Chapinero) cuentan con sistema integrado para reingreso inmediato de stock en góndola.
          </p>
        </div>
      </div>
    </div>
  );
};