"use client";

import { useState } from "react";
import { useDemo } from "@/context/DemoContext";
import { useRouter } from "next/navigation";
import { ArrowLeftRight, Check, AlertCircle, MapPin, QrCode, Bus, Navigation } from "lucide-react";
import Link from "next/link";

export default function ShuttleBooking() {
  const { shuttleRoute, setShuttleRoute, bookShuttle } = useDemo();
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const toggleRoute = () => {
    setShuttleRoute(shuttleRoute === "Main Campus → Lucinda Campus" 
      ? "Lucinda Campus → Main Campus" 
      : "Main Campus → Lucinda Campus");
  };

  const handleBook = () => {
    if (!selectedSeat) {
      setError("Please select a seat.");
      return;
    }
    const res = bookShuttle();
    if (res.success) {
      router.push("/shuttle/ticket");
    } else {
      setError(res.error || "Failed to book");
    }
  };

  return (
    <div className="flex flex-col p-4 gap-6 pb-28">
      {/* GPS Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-[#800000] font-bold text-sm uppercase">← Back</Link>
          <h1 className="font-heading font-bold text-2xl text-[#1B2336]">Campus Shuttle</h1>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="bg-[#10B981] w-2 h-2 rounded-full animate-pulse"></span>
          <span className="text-xs text-[#4A4A4A] font-bold uppercase tracking-wider">GPS Active • 3 Vehicles online</span>
        </div>
      </div>

      {/* Cashless Warning */}
      <div className="bg-[#FFF8E7] border border-[#FFC632] rounded-lg p-3 shadow-sm flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <AlertCircle size={16} className="text-[#FFC632]" />
          <span className="text-sm font-bold text-[#1B2336]">Cashless Implementation</span>
        </div>
        <p className="text-xs text-[#4A4A4A]">Shuttles no longer accept cash. Fare is fixed at ₱25.00.</p>
        <div className="flex gap-2 mt-1">
          <span className="bg-white border border-[#E2E5EB] px-2 py-0.5 rounded text-[10px] font-bold text-[#800000]">CASHLESS ONLY</span>
          <span className="bg-white border border-[#E2E5EB] px-2 py-0.5 rounded text-[10px] font-bold text-[#4A4A4A]">NON-REFUNDABLE</span>
        </div>
      </div>

      {/* Active Pass Card (If applicable, wait, user said "Priority boarding pass card layout with Show QR drawer trigger" - I'll mock an active pass here) */}
      <div className="bg-gradient-to-br from-[#800000] to-[#570000] rounded-xl p-4 shadow-academic-md text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        <div className="flex justify-between items-start relative z-10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#FFC632]">Priority Pass</span>
            <h3 className="font-heading font-bold text-lg leading-tight mt-1">Lane A Boarding</h3>
          </div>
          <button className="bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-lg flex items-center justify-center">
            <QrCode size={20} className="text-white" />
          </button>
        </div>
        <div className="mt-4 flex gap-4 text-xs font-bold text-[#E2E5EB] relative z-10">
          <div>
            <span className="opacity-70 block text-[10px]">LANE</span>
            <span>A</span>
          </div>
          <div>
            <span className="opacity-70 block text-[10px]">TIME</span>
            <span>08:15 AM</span>
          </div>
        </div>
      </div>

      {/* Route Switcher */}
      <div className="bg-white border border-[#E2E5EB] p-4 rounded-xl shadow-academic-sm flex items-center justify-between">
        <span className="font-bold text-[#1B2336] text-sm flex-1 text-center">{shuttleRoute.split(" → ")[0]}</span>
        <button onClick={toggleRoute} className="w-10 h-10 rounded-full bg-[#F4F5F7] flex items-center justify-center shrink-0">
          <ArrowLeftRight size={16} className="text-[#800000]" />
        </button>
        <span className="font-bold text-[#1B2336] text-sm flex-1 text-center">{shuttleRoute.split(" → ")[1]}</span>
      </div>

      {/* Live Shuttle Vehicles */}
      <div className="flex flex-col gap-3">
        <h2 className="font-heading font-bold text-lg text-[#1B2336]">Live Vehicles</h2>
        
        <div className="bg-white border border-[#E2E5EB] rounded-xl p-4 shadow-academic-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#F4F5F7] rounded-lg"><Bus size={16} className="text-[#1B2336]" /></div>
              <div>
                <h3 className="font-bold text-sm text-[#1B2336]">Electric Tram 01</h3>
                <span className="text-[10px] font-bold text-[#10B981] uppercase">Arriving in 2m</span>
              </div>
            </div>
            <span className="bg-[#FFF8E7] text-[#785a00] border border-[#FFC632] px-2 py-1 rounded text-[10px] font-bold">12/24 SEATS</span>
          </div>
          <div className="w-full bg-[#F4F5F7] h-2 rounded-full overflow-hidden">
            <div className="bg-[#10B981] h-full w-[90%]"></div>
          </div>
        </div>

        <div className="bg-white border border-[#E2E5EB] rounded-xl p-4 shadow-academic-sm opacity-60">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#F4F5F7] rounded-lg"><Bus size={16} className="text-[#1B2336]" /></div>
              <div>
                <h3 className="font-bold text-sm text-[#1B2336]">Coaster Bus</h3>
                <span className="text-[10px] font-bold text-[#4A4A4A] uppercase">ETA: 15m</span>
              </div>
            </div>
            <span className="bg-[#F4F5F7] text-[#4A4A4A] border border-[#E2E5EB] px-2 py-1 rounded text-[10px] font-bold">FULL</span>
          </div>
          <div className="w-full bg-[#F4F5F7] h-2 rounded-full overflow-hidden">
            <div className="bg-[#4A4A4A] h-full w-[45%]"></div>
          </div>
        </div>

        <div className="bg-white border border-[#E2E5EB] rounded-xl p-4 shadow-academic-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#F4F5F7] rounded-lg"><Navigation size={16} className="text-[#1B2336]" /></div>
              <div>
                <h3 className="font-bold text-sm text-[#1B2336]">Campus Van</h3>
                <span className="text-[10px] font-bold text-[#800000] uppercase">ETA: 8m</span>
              </div>
            </div>
            <span className="bg-white border border-[#E2E5EB] text-[#4A4A4A] px-2 py-1 rounded text-[10px] font-bold">3/10 SEATS</span>
          </div>
          <div className="w-full bg-[#F4F5F7] h-2 rounded-full overflow-hidden">
            <div className="bg-[#800000] h-full w-[70%]"></div>
          </div>
        </div>
      </div>

      {/* Seat Selector */}
      <div className="flex flex-col gap-3 mt-2">
        <h2 className="font-heading font-bold text-lg text-[#1B2336]">Select Seat</h2>
        <div className="grid grid-cols-4 gap-3 bg-white p-5 rounded-xl border border-[#E2E5EB] shadow-academic-sm">
          {Array.from({ length: 24 }).map((_, i) => {
            const seat = i + 1;
            const isSelected = selectedSeat === seat;
            return (
              <button
                key={seat}
                onClick={() => { setSelectedSeat(seat); setError(""); }}
                className={`h-12 rounded-lg border-2 flex items-center justify-center font-bold text-sm transition-colors ${isSelected ? 'border-[#FFC632] bg-[#FFF7DB] text-[#785a00]' : 'border-[#E2E5EB] bg-white text-[#4A4A4A]'}`}
              >
                {seat < 10 ? `0${seat}` : seat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Error Toast */}
      {error && (
        <div className="bg-[#fef2f2] border border-[#f87171] p-3 rounded-md flex items-center gap-2 mb-4">
          <AlertCircle size={16} className="text-[#ef4444]" />
          <span className="text-[#b91c1c] text-sm font-bold">{error}</span>
        </div>
      )}

      {/* Booking CTA */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-[#E2E5EB] p-4 flex justify-between items-center z-40 shadow-[0_-4px_6px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col">
          <span className="text-xs text-[#7A7A7A]">Total Fare</span>
          <span className="font-heading font-bold text-xl text-[#800000]">₱25.00</span>
        </div>
        <button onClick={handleBook} className="bg-[#800000] text-white px-6 py-3 rounded-lg font-bold shadow-academic-md flex items-center gap-2">
          Confirm Booking
          <Check size={18} />
        </button>
      </div>
    </div>
  );
}
