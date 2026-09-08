"use client";

import React, { useState, useEffect } from "react";
import { ShoppingCart, User, Package, History, FileCode2, Github, ExternalLink, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { PosTab, OrderDetail } from "@/components/PosTab";
import { CustomerTab } from "@/components/CustomerTab";
import { InventoryTab } from "@/components/InventoryTab";
import { HistoryTab } from "@/components/HistoryTab";
import { DiagramsTab } from "@/components/DiagramsTab";
import { ReceiptModal, ReturnReceipt } from "@/components/ReceiptModal";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"pos" | "customer" | "inventory" | "history" | "diagrams">("pos");
  
  const [stores, setStores] = useState<Array<{ id: number; code: string; name: string; address: string; city: string }>>([]);
  const [selectedStoreId, setSelectedStoreId] = useState<number>(1);
  const [searchCode, setSearchCode] = useState<string>("ORD-2026-101");
  const [currentOrder, setCurrentOrder] = useState<OrderDetail | null>(null);
  const [loadingOrder, setLoadingOrder] = useState<boolean>(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  const [selectedItems, setSelectedItems] = useState<{ [itemId: number]: { checked: boolean; quantity: number } }>({});
  const [clerkName, setClerkName] = useState<string>("Carlos Mendoza (Caja 03)");
  const [reason, setReason] = useState<string>("Error de compra del cliente");
  const [condition, setCondition] = useState<"OPTIMO" | "DANADO">("OPTIMO");
  const [refundType, setRefundType] = useState<"VALE_COMPRA" | "REEMBOLSO_MEDIO_ORIGINAL">("VALE_COMPRA");
  const [submittingReturn, setSubmittingReturn] = useState<boolean>(false);
  const [receiptModal, setReceiptModal] = useState<ReturnReceipt | null>(null);

  useEffect(() => {
    fetch("/api/stores")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setStores(data);
          setSelectedStoreId(data[0].id);
        }
      })
      .catch(console.error);
  }, []);

  const handleSearchOrder = async (codeOverride?: string) => {
    const code = codeOverride !== undefined ? codeOverride : searchCode;
    if (!code.trim()) return;

    setLoadingOrder(true);
    setOrderError(null);
    setCurrentOrder(null);

    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(code.trim())}`);
      const data = await res.json();
      if (!res.ok) {
        setOrderError(data.detail || "Pedido no encontrado");
      } else {
        setCurrentOrder(data);
        const initialSelection: { [id: number]: { checked: boolean; quantity: number } } = {};
        data.items.forEach((it: any) => {
          if (it.eligibleQuantity > 0) {
            initialSelection[it.id] = { checked: true, quantity: 1 };
          }
        });
        setSelectedItems(initialSelection);
      }
    } catch (e: any) {
      setOrderError("Error de conexión con el servidor: " + e.message);
    } finally {
      setLoadingOrder(false);
    }
  };

  const calculateTotalRefund = () => {
    if (!currentOrder) return 0;
    let sum = 0;
    currentOrder.items.forEach((it) => {
      const sel = selectedItems[it.id];
      if (sel && sel.checked) {
        sum += sel.quantity * it.unitPrice;
      }
    });
    return sum;
  };

  const handleProcessReturn = async () => {
    if (!currentOrder) return;

    const itemsPayload = Object.entries(selectedItems)
      .filter(([_, sel]) => sel.checked && sel.quantity > 0)
      .map(([idStr, sel]) => ({
        orderItemId: parseInt(idStr, 10),
        quantity: sel.quantity,
      }));

    if (itemsPayload.length === 0) {
      alert("Debes seleccionar al menos un artículo para procesar la devolución.");
      return;
    }

    setSubmittingReturn(true);
    try {
      const res = await fetch("/api/returns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderCode: currentOrder.orderCode,
          storeId: selectedStoreId,
          clerkName,
          reason,
          productCondition: condition,
          refundType,
          items: itemsPayload,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert("Error al procesar: " + (data.detail || "Fallo en la transacción"));
      } else {
        setReceiptModal(data);
        handleSearchOrder(currentOrder.orderCode);
      }
    } catch (e: any) {
      alert("Error de red: " + e.message);
    } finally {
      setSubmittingReturn(false);
    }
  };

  const navItems = [
    { id: "pos", label: "Mostrador / Caja POS", icon: ShoppingCart, count: "BORIS" },
    { id: "customer", label: "Portal del Cliente", icon: User },
    { id: "inventory", label: "Inventario en Góndola", icon: Package },
    { id: "history", label: "Historial de Auditoría", icon: History },
    { id: "diagrams", label: "Arquitectura & Diagramas", icon: FileCode2 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/70 bg-grid-pattern">
      <Header />

      {/* Modern Navigation Segment Bar */}
      <nav className="sticky top-[69px] z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/90 shadow-sm px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/60">
            {navItems.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    isActive
                      ? "bg-white text-emerald-950 shadow-md shadow-slate-200/60 ring-1 ring-slate-200/80 font-black"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-emerald-600" : "text-slate-400"}`} />
                  <span>{tab.label}</span>
                  {tab.count && (
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>Cero Latencia</span>
            </span>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl w-full mx-auto p-4 sm:p-6 flex-1">
        {activeTab === "pos" && (
          <PosTab
            stores={stores}
            selectedStoreId={selectedStoreId}
            setSelectedStoreId={setSelectedStoreId}
            searchCode={searchCode}
            setSearchCode={setSearchCode}
            onSearch={handleSearchOrder}
            loadingOrder={loadingOrder}
            orderError={orderError}
            currentOrder={currentOrder}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            clerkName={clerkName}
            setClerkName={setClerkName}
            reason={reason}
            setReason={setReason}
            condition={condition}
            setCondition={setCondition}
            refundType={refundType}
            setRefundType={setRefundType}
            onProcessReturn={handleProcessReturn}
            submittingReturn={submittingReturn}
            totalRefund={calculateTotalRefund()}
          />
        )}

        {activeTab === "customer" && (
          <CustomerTab
            onSearch={(code) => {
              setSearchCode(code);
              setActiveTab("pos");
              handleSearchOrder(code);
            }}
          />
        )}

        {activeTab === "inventory" && <InventoryTab stores={stores} />}
        {activeTab === "history" && <HistoryTab />}
        {activeTab === "diagrams" && <DiagramsTab />}
      </main>

      {/* Modern Academic & Tech Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white text-slate-500 text-xs py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-bold text-slate-800">
              Mercado VIVA &bull; Taller de Arquitectura e Implementación de MVP
            </p>
            <p className="text-[11px] text-slate-400">
              Proceso Omnicanal: Devolución de Compra Digital en Tienda Física (BORIS) &bull; Capas 100% Gratuitas
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-mono text-[11px] font-semibold">
              React 18
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-mono text-[11px] font-semibold">
              Next.js 14
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-mono text-[11px] font-semibold">
              Node.js Serverless
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-mono text-[11px] font-semibold">
              Prisma ORM
            </span>
            <a
              href="https://github.com/Moshua53/mcc"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 text-white font-bold hover:bg-slate-800 transition ml-2"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Return Receipt Modal */}
      <ReceiptModal receipt={receiptModal} onClose={() => setReceiptModal(null)} />
    </div>
  );
}