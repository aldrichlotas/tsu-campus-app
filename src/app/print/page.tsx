"use client";

import { useDemo } from "@/context/DemoContext";
import { AlertCircle, CheckCircle2, FileText, Printer, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PrintHub() {
  const { queuePrintJob } = useDemo();

  const [pages, setPages] = useState(1);
  const [colorMode, setColorMode] = useState<"Grayscale" | "Color">("Grayscale");
  const [duplex, setDuplex] = useState(false);
  const [partner, setPartner] = useState<"Library Fleet" | "Tech Center">("Library Fleet");

  const [error, setError] = useState("");
  const [pin, setPin] = useState("");
  const [showModal, setShowModal] = useState(false);

  const rate = colorMode === "Grayscale" ? 2.0 : 8.0;
  const cost = pages * rate * (duplex ? 0.8 : 1.0); // Simple duplex logic: 20% discount or just pages. Wait, "Duplex factor". Let's assume 1.0 if not duplex, 0.8 if duplex.

  const handleSubmit = () => {
    if (pages <= 0) {
      setError("Please enter valid pages.");
      return;
    }
    const res = queuePrintJob(cost);
    if (res.success) {
      setPin(res.pin!);
      setShowModal(true);
      setError("");
    } else {
      setError(res.error || "Failed");
    }
  };

  return (
    <div className="flex flex-col p-4 gap-6 pb-24">
      <div className="flex items-center gap-3 mb-2">
        <Link href="/" className="text-[#800000] font-bold text-sm uppercase">← Back</Link>
        <h1 className="font-heading font-bold text-2xl text-[#1B2336]">Print Hub</h1>
      </div>

      {/* Directory */}
      <div className="flex flex-col gap-3">
        <h2 className="font-heading font-bold text-lg text-[#1B2336]">Verified Partners</h2>

        <button
          onClick={() => setPartner("Library Fleet")}
          className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${partner === 'Library Fleet' ? 'bg-[#FFF7DB] border-[#FFC632]' : 'bg-white border-[#E2E5EB]'}`}
        >
          <div className="bg-[#fce8e6] p-2 rounded-lg">
            <Printer size={20} className="text-[#800000]" />
          </div>
          <div className="flex flex-col items-start text-left flex-1">
            <span className="font-bold text-[#1B2336] flex items-center gap-2">
              TSU Main: Library Fleet
              <span className="text-[9px] font-bold tracking-widest uppercase bg-[#1B2336] text-white px-2 py-0.5 rounded-full">Verified</span>
            </span>
            <span className="text-xs text-[#7A7A7A] mt-1">Ground Floor East Wing • 50m away</span>
          </div>
        </button>

        <button
          onClick={() => setPartner("Tech Center")}
          className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${partner === 'Tech Center' ? 'bg-[#FFF7DB] border-[#FFC632]' : 'bg-white border-[#E2E5EB]'}`}
        >
          <div className="bg-[#fce8e6] p-2 rounded-lg">
            <Printer size={20} className="text-[#800000]" />
          </div>
          <div className="flex flex-col items-start text-left flex-1">
            <span className="font-bold text-[#1B2336] flex items-center gap-2">
              TSU Lucinda: Tech Center
              <span className="text-[9px] font-bold tracking-widest uppercase bg-[#1B2336] text-white px-2 py-0.5 rounded-full">Verified</span>
            </span>
            <span className="text-xs text-[#7A7A7A] mt-1">Open 8:00 AM - 5:00 PM • 1.2km away</span>
          </div>
        </button>
      </div>

      {/* Calculator */}
      <div className="flex flex-col gap-4 bg-white p-5 rounded-xl border border-[#E2E5EB] shadow-academic-sm">
        <h2 className="font-heading font-bold text-lg text-[#1B2336]">Job Details</h2>

        <div className="flex items-center justify-between border-b border-[#F4F5F7] pb-3">
          <span className="text-sm font-bold text-[#4A4A4A]">Pages</span>
          <input
            type="number"
            min="1"
            value={pages}
            onChange={(e) => setPages(Number(e.target.value) || 1)}
            className="w-20 bg-[#F4F5F7] border border-[#E2E5EB] rounded px-3 py-1 text-center font-bold outline-none focus:border-[#800000]"
          />
        </div>

        <div className="flex items-center justify-between border-b border-[#F4F5F7] pb-3">
          <span className="text-sm font-bold text-[#4A4A4A]">Color Mode</span>
          <div className="flex bg-[#F4F5F7] rounded-lg p-1">
            <button onClick={() => setColorMode("Grayscale")} className={`px-3 py-1 text-xs font-bold rounded-md ${colorMode === 'Grayscale' ? 'bg-white shadow-sm text-[#1B2336]' : 'text-[#7A7A7A]'}`}>Grayscale</button>
            <button onClick={() => setColorMode("Color")} className={`px-3 py-1 text-xs font-bold rounded-md ${colorMode === 'Color' ? 'bg-white shadow-sm text-[#1B2336]' : 'text-[#7A7A7A]'}`}>Color</button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-[#4A4A4A]">Duplex (Double-sided)</span>
          <button
            onClick={() => setDuplex(!duplex)}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${duplex ? 'bg-[#800000]' : 'bg-[#E2E5EB]'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${duplex ? 'translate-x-6' : ''}`}></div>
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-[#fef2f2] border border-[#f87171] p-3 rounded-md flex items-center gap-2">
          <AlertCircle size={16} className="text-[#ef4444]" />
          <span className="text-[#b91c1c] text-sm font-bold">{error}</span>
        </div>
      )}

      {/* Bottom Sticky Action */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-[#E2E5EB] p-4 flex justify-between items-center z-40">
        <div className="flex flex-col">
          <span className="text-xs text-[#7A7A7A]">Total Cost</span>
          <span className="font-heading font-bold text-xl text-[#800000]">₱{cost.toFixed(2)}</span>
        </div>
        <button onClick={handleSubmit} className="bg-[#800000] text-white px-6 py-3 rounded-lg font-bold shadow-academic-md flex items-center gap-2">
          <FileText size={18} />
          Submit Print Job
        </button>
      </div>

      {/* Modal Pass */}
      {showModal && (
        <div className="fixed inset-0 bg-[#1B2336]/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-xs p-6 flex flex-col items-center relative animate-in zoom-in-95 duration-200">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-[#7A7A7A] hover:text-[#1B2336]">
              <X size={20} />
            </button>
            <div className="bg-[#10B981]/10 p-4 rounded-full mb-4">
              <CheckCircle2 size={48} className="text-[#10B981]" />
            </div>
            <h3 className="font-heading font-bold text-xl text-[#1B2336] mb-2">Job Submitted!</h3>
            <p className="text-sm text-[#4A4A4A] text-center mb-6">Show this PIN to the operator at {partner}.</p>
            <div className="bg-[#F4F5F7] border border-[#E2E5EB] rounded-xl px-8 py-4 w-full">
              <span className="block text-center text-xs font-bold text-[#7A7A7A] uppercase tracking-widest mb-1">Queue PIN</span>
              <span className="block text-center font-heading font-bold text-3xl text-[#800000]">{pin}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
