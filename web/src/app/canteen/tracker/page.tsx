"use client";

import { useDemo } from "@/context/DemoContext";
import Link from "next/link";
import { QrCode, Home, Clock, CheckCircle2 } from "lucide-react";

export default function CanteenTracker() {
  const { canteenOrderStatus } = useDemo();

  const getStatusColor = () => {
    if (canteenOrderStatus === "Ready for Pickup") return "text-[#10B981]";
    if (canteenOrderStatus === "Preparing") return "text-[#D97706]";
    return "text-[#7A7A7A]";
  };

  return (
    <div className="flex flex-col p-4 gap-6 items-center justify-center min-h-[80vh] bg-white">
      <h1 className="font-heading font-bold text-2xl text-[#1B2336] mb-2">Order Status</h1>
      
      <div className="bg-white border border-[#E2E5EB] rounded-2xl shadow-academic-md p-6 flex flex-col items-center w-full max-w-[320px]">
        <span className="text-xs font-bold text-[#7A7A7A] uppercase tracking-widest mb-1">Order ID</span>
        <span className="font-heading font-bold text-3xl text-[#1B2336] mb-6">#8921</span>
        
        <div className="flex flex-col items-center justify-center mb-6">
          {canteenOrderStatus === "Ready for Pickup" ? (
            <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
              <div className="bg-[#10B981]/10 p-4 rounded-full mb-3">
                <CheckCircle2 size={48} className="text-[#10B981]" />
              </div>
              <h2 className="font-bold text-[#10B981] text-xl">Ready for Pickup</h2>
              <p className="text-sm text-[#4A4A4A] mt-2 text-center">Scan this QR code at the counter.</p>
              <div className="mt-4 bg-[#F4F5F7] p-3 rounded-xl border border-[#E2E5EB]">
                <QrCode size={120} className="text-[#1B2336]" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="bg-[#FFF7DB] p-4 rounded-full mb-3 animate-pulse">
                <Clock size={48} className="text-[#D97706]" />
              </div>
              <h2 className={`font-bold text-xl ${getStatusColor()}`}>{canteenOrderStatus}</h2>
              <p className="text-sm text-[#4A4A4A] mt-2 text-center">Please wait for your order to be prepared.</p>
            </div>
          )}
        </div>
      </div>

      <Link href="/" className="mt-4 flex items-center gap-2 font-bold text-[#1B2336] bg-[#F4F5F7] border border-[#E2E5EB] px-6 py-3 rounded-full hover:bg-[#E2E5EB] transition-colors">
        <Home size={18} />
        Return to Hub
      </Link>
    </div>
  );
}
