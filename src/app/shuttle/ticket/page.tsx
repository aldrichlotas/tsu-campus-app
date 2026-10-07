"use client";

import { useDemo } from "@/context/DemoContext";
import Link from "next/link";
import { QrCode, Home } from "lucide-react";

export default function ShuttleTicket() {
  const { shuttleRoute } = useDemo();

  return (
    <div className="flex flex-col p-4 gap-6 items-center justify-center min-h-[80vh]">
      <h1 className="font-heading font-bold text-2xl text-[#1B2336] mb-4">Boarding Pass</h1>
      
      <div className="bg-white border-2 border-[#800000] rounded-2xl shadow-academic-md p-6 flex flex-col items-center w-full max-w-[320px] relative overflow-hidden">
        {/* Ticket Notches */}
        <div className="absolute top-1/2 -left-4 w-8 h-8 bg-[#F4F5F7] rounded-full border-r-2 border-[#800000] -translate-y-1/2"></div>
        <div className="absolute top-1/2 -right-4 w-8 h-8 bg-[#F4F5F7] rounded-full border-l-2 border-[#800000] -translate-y-1/2"></div>
        
        <span className="text-xs font-bold text-[#800000] mb-2 uppercase tracking-widest">#TSU-SHT-2026-X8F2</span>
        <h2 className="font-heading font-bold text-lg text-center text-[#1B2336] mb-6">{shuttleRoute}</h2>
        
        <div className="border-t-2 border-dashed border-[#E2E5EB] w-full my-6"></div>
        
        <div className="bg-[#F4F5F7] p-4 rounded-xl mb-6">
          <QrCode size={120} className="text-[#1B2336]" />
        </div>
        
        <div className="bg-[#FFF7DB] border border-[#FFC632] py-2 px-3 rounded text-center w-full">
          <span className="text-[10px] font-bold text-[#785a00] uppercase tracking-wide">NON-REFUNDABLE • VALID FOR SCHEDULED TRIP ONLY</span>
        </div>
      </div>

      <Link href="/" className="mt-6 flex items-center gap-2 font-bold text-[#1B2336] bg-white border border-[#E2E5EB] px-6 py-3 rounded-full shadow-academic-sm hover:shadow-academic-md transition-shadow">
        <Home size={18} />
        Return to Hub
      </Link>
    </div>
  );
}
