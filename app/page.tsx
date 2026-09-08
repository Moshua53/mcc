"use client";

import React, { useState, useEffect } from "react";
import { ShoppingCart, User, Package, History, FileCode2 } from "lucide-react";
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <nav className="bg-white border-b border-gray-200 px-6 py-2 flex gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("pos")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition ${
            activeTab === "pos" ? "bg-viva-600 text-white shadow" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <ShoppingCart className="w-4 h-4" /> Mostrador / Caja en Tienda
        </button>
        <button
          onClick={() => setActiveTab("customer")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition ${
            activeTab === "customer" ? "bg-viva-600 text-white shadow" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <User className="w-4 h-4" /> Portal del Cliente
        </button>
        <button
          onClick={() => setActiveTab("inventory")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition ${
            activeTab === "inventory" ? "bg-viva-600 text-white shadow" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Package className="w-4 h-4" /> Inventario en Góndola
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition ${
            activeTab === "history" ? "bg-viva-600 text-white shadow" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <History className="w-4 h-4" /> Historial de Devoluciones
        </button>
        <button
          onClick={() => setActiveTab("diagrams")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition ${
            activeTab === "diagrams" ? "bg-viva-600 text-white shadow" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <FileCode2 className="w-4 h-4" /> Arquitectura & Diagramas
        </button>
      </nav>

      <main className="max-w-6xl w-full mx-auto p-6 flex-1">
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

      <ReceiptModal receipt={receiptModal} onClose={() => setReceiptModal(null)} />
    </div>
  );
}