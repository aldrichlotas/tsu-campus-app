"use client";

import { useState } from "react";
import { useDemo } from "@/context/DemoContext";
import { useRouter } from "next/navigation";
import { ArrowLeftRight, Check, AlertCircle } from "lucide-react";
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
    <div className="flex flex-col p-4 gap-6 pb-24">
      <div className="flex items-center gap-3 mb-2">
        <Link href="/" className="text-[#800000] font-bold text-sm uppercase">← Back</Link>
        <h1 className="font-heading font-bold text-2xl text-[#1B2336]">Campus Shuttle</h1>
      </div>

      {/* Route Switcher */}
      <div className="bg-white border border-[#E2E5EB] p-4 rounded-xl shadow-academic-sm flex items-center justify-between">
        <span className="font-bold text-[#1B2336] text-sm flex-1 text-center">{shuttleRoute.split(" → ")[0]}</span>
        <button onClick={toggleRoute} className="w-10 h-10 rounded-full bg-[#F4F5F7] flex items-center justify-center shrink-0">
          <ArrowLeftRight size={16} className="text-[#800000]" />
        </button>
        <span className="font-bold text-[#1B2336] text-sm flex-1 text-center">{shuttleRoute.split(" → ")[1]}</span>
      </div>

      {/* Seat Selector */}
      <div className="flex flex-col gap-3">
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
        <div className="bg-[#fef2f2] border border-[#f87171] p-3 rounded-md flex items-center gap-2">
          <AlertCircle size={16} className="text-[#ef4444]" />
          <span className="text-[#b91c1c] text-sm font-bold">{error}</span>
        </div>
      )}

      {/* Booking CTA */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-[#E2E5EB] p-4 flex justify-between items-center z-40">
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
