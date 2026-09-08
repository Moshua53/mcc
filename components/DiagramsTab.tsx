"use client";

import React from "react";
import { Download, ExternalLink, FileCode2, Layers, GitBranch, ArrowRight, CheckCircle2 } from "lucide-react";

export const DiagramsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <FileCode2 className="w-5 h-5 text-emerald-600" />
              Entregables de Diagramación de Arquitectura y Proceso
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Archivos editables estándar en formato <b>Draw.io (.drawio)</b> y <b>visualizadores interactivos HTML (Archify)</b> con soporte para navegación, modo claro/oscuro y trazas.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
            Showcase Quality &bull; 100%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Draw.io Editable Card */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50/40 border border-amber-200/80 rounded-2xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-200/80 text-amber-900">
                Archivo Editable
              </span>
              <span className="text-[11px] text-amber-700 font-bold">XML Diagrams.net</span>
            </div>
            <h3 className="font-extrabold text-base text-amber-950">
              mercado_viva_arquitectura.drawio
            </h3>
            <p className="text-xs text-amber-900/80 leading-relaxed">
              Archivo maestro multi-página compatible con <a href="https://app.diagrams.net" target="_blank" rel="noreferrer" className="underline font-bold">diagrams.net</a> que contiene:
            </p>
            <ul className="text-xs text-amber-900/80 space-y-1.5 list-disc list-inside">
              <li><b>Página 1:</b> Arquitectura del Sistema (React, Next.js, Node.js, Vercel Free Tier, Prisma ORM).</li>
              <li><b>Página 2:</b> Diagrama de Proceso de Negocio BPMN con Swimlanes.</li>
              <li><b>Página 3:</b> Ficha Técnica con URLs, comandos de ejecución e integrantes del equipo.</li>
            </ul>
          </div>

          <a
            href="/diagrams/mercado_viva_arquitectura.drawio"
            download
            className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-black px-5 py-3 rounded-xl shadow-md shadow-amber-600/20 transition-all active:scale-[0.99]"
          >
            <Download className="w-4 h-4" />
            <span>Descargar Archivo Editable (.drawio)</span>
          </a>
        </div>

        {/* Archify Interactive Visualizers */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Archify Interactive Suite
              </span>
              <span className="text-[11px] text-slate-400 font-medium">SVG + Micro-Motion</span>
            </div>
            <h3 className="font-extrabold text-base text-white">
              Visualizadores Autónomos HTML
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Diagramas interactivos autónomos renderizados con calidad Showcase (9 de 9 validaciones formales aprobadas):
            </p>

            <div className="space-y-2 pt-1">
              <a
                href="/diagrams/mercado_viva_arquitectura.html"
                target="_blank"
                rel="noreferrer"
                className="group p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 flex items-center justify-between text-xs font-bold text-slate-200 transition"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>1. Arquitectura de Componentes (React + Node.js)</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 transition" />
              </a>

              <a
                href="/diagrams/mercado_viva_proceso.html"
                target="_blank"
                rel="noreferrer"
                className="group p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 flex items-center justify-between text-xs font-bold text-slate-200 transition"
              >
                <div className="flex items-center gap-2.5">
                  <GitBranch className="w-4 h-4 text-emerald-400" />
                  <span>2. Diagrama de Flujo del Proceso Omnicanal (Workflow)</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 transition" />
              </a>

              <a
                href="/diagrams/mercado_viva_secuencia.html"
                target="_blank"
                rel="noreferrer"
                className="group p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 flex items-center justify-between text-xs font-bold text-slate-200 transition"
              >
                <div className="flex items-center gap-2.5">
                  <FileCode2 className="w-4 h-4 text-emerald-400" />
                  <span>3. Diagrama de Secuencia de Llamadas API REST</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 transition" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* API Reference Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
        <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
          Endpoints REST Serverless Disponibles en Vercel:
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-[11px] font-mono">
          <div className="bg-slate-50 border border-slate-200 p-2 rounded-lg text-slate-800 font-semibold">
            GET /api/stores
          </div>
          <div className="bg-slate-50 border border-slate-200 p-2 rounded-lg text-slate-800 font-semibold">
            GET /api/orders
          </div>
          <div className="bg-slate-50 border border-slate-200 p-2 rounded-lg text-slate-800 font-semibold">
            GET /api/orders/[c]
          </div>
          <div className="bg-slate-50 border border-slate-200 p-2 rounded-lg text-slate-800 font-semibold">
            POST /api/returns
          </div>
          <div className="bg-slate-50 border border-slate-200 p-2 rounded-lg text-slate-800 font-semibold">
            GET /api/inventory
          </div>
          <div className="bg-slate-50 border border-slate-200 p-2 rounded-lg text-slate-800 font-semibold">
            GET /api/health
          </div>
        </div>
      </div>
    </div>
  );
};