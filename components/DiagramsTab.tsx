"use client";

import React from "react";
import { ArrowRight, FileText, Globe } from "lucide-react";

export const DiagramsTab: React.FC = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
      <div>
        <h2 className="text-lg font-bold text-navy-900">Entregables de Diagramación de Arquitectura y Proceso</h2>
        <p className="text-xs text-gray-500 mt-1">
          La solución cuenta con diagramas tanto en formato <b>editable Draw.io (.drawio)</b> como en 
          <b> diagramas interactivos HTML con Archify</b> (con navegación de rutas, modo oscuro/claro y trazas).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card Draw.io */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 space-y-3">
          <h3 className="font-bold text-sm text-amber-900 flex items-center gap-2">
            <FileText className="w-4 h-4" /> 1. Archivo Editable Draw.io (.drawio)
          </h3>
          <p className="text-xs text-amber-800">
            Archivo XML compatible con diagrams.net con 3 páginas completas actualizadas al nuevo stack:
          </p>
          <ul className="text-xs text-amber-900/80 space-y-1 list-disc list-inside">
            <li><b>Página 1:</b> Arquitectura del Sistema (React, Next.js, Node.js y Vercel Free Tier).</li>
            <li><b>Página 2:</b> Diagrama de Proceso de Negocio BPMN con Swimlanes.</li>
            <li><b>Página 3:</b> Ficha Técnica, Instrucciones de Ejecución e Integrantes del Equipo.</li>
          </ul>
          <a
            href="/diagrams/mercado_viva_arquitectura.drawio"
            download
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm transition"
          >
            ⬇️ Descargar archivo .drawio
          </a>
        </div>

        {/* Card Archify Interactivos */}
        <div className="bg-navy-50 border border-navy-200 rounded-xl p-5 space-y-3">
          <h3 className="font-bold text-sm text-navy-900 flex items-center gap-2">
            <Globe className="w-4 h-4" /> 2. Diagramas Interactivos HTML (Archify)
          </h3>
          <p className="text-xs text-navy-800">
            Visualizadores autónomos de calidad Showcase con validación formal de 9 controles:
          </p>
          <div className="flex flex-col gap-2">
            <a
              href="/diagrams/mercado_viva_arquitectura.html"
              target="_blank"
              className="bg-white hover:bg-slate-50 border border-navy-200 text-navy-900 text-xs font-semibold px-3 py-2 rounded-lg flex items-center justify-between transition"
            >
              <span>📐 Ver Diagrama de Arquitectura (React + Node.js)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="/diagrams/mercado_viva_proceso.html"
              target="_blank"
              className="bg-white hover:bg-slate-50 border border-navy-200 text-navy-900 text-xs font-semibold px-3 py-2 rounded-lg flex items-center justify-between transition"
            >
              <span>🔄 Ver Diagrama de Flujo de Proceso (Workflow)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="/diagrams/mercado_viva_secuencia.html"
              target="_blank"
              className="bg-white hover:bg-slate-50 border border-navy-200 text-navy-900 text-xs font-semibold px-3 py-2 rounded-lg flex items-center justify-between transition"
            >
              <span>⏱️ Ver Diagrama de Secuencia de Llamadas API</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-1">
        <span className="font-bold text-navy-900">Arquitectura de Endpoints REST (Serverless en Vercel):</span>
        <p className="text-gray-600 font-mono">
          GET /api/stores | GET /api/orders | GET /api/orders/[code] | POST /api/returns | GET /api/returns | GET /api/inventory | GET /api/health
        </p>
      </div>
    </div>
  );
};