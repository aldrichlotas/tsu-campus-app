"use client";

import { useDemo } from "@/context/DemoContext";
import { useState } from "react";
import Link from "next/link";
import { Printer, AlertCircle, FileText, CheckCircle2, X, UploadCloud, ChevronDown } from "lucide-react";

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
  const cost = pages * rate * (duplex ? 0.8 : 1.0); 

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
    <div className="flex flex-col p-4 gap-6 pb-28">
      <div className="flex items-center gap-3 mb-2">
        <Link href="/" className="text-[#800000] font-bold text-sm uppercase">← Back</Link>
        <h1 className="font-heading font-bold text-2xl text-[#1B2336]">Print Hub</h1>
      </div>

      {/* Directory */}
      <div className="flex flex-col gap-3">
        <h2 className="font-heading font-bold text-lg text-[#1B2336]">Verified Partners</h2>
        
        <button 
          onClick={() => setPartner("Library Fleet")}
          className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${partner === 'Library Fleet' ? 'bg-[#FFF7DB] border-[#FFC632]' : 'bg-white border-[#E2E5EB] shadow-academic-sm'}`}
        >
          <div className="bg-[#fce8e6] p-3 rounded-lg shrink-0">
            <Printer size={24} className="text-[#800000]" />
          </div>
          <div className="flex flex-col items-start text-left flex-1">
            <div className="flex w-full justify-between items-center mb-1">
              <span className="font-bold text-[#1B2336] text-sm">Library Fleet</span>
              <span className="text-[9px] font-bold tracking-widest uppercase bg-[#10B981]/10 text-[#10B981] px-2 py-0.5 rounded-full border border-[#10B981]/20">Verified</span>
            </div>
            <span className="text-[11px] text-[#4A4A4A] mb-1">Ground Floor East Wing • 50m away</span>
            <span className="text-[10px] font-bold text-[#800000] bg-[#fce8e6] px-2 py-1 rounded">Queue: 4 jobs ahead • ~15 mins</span>
          </div>
        </button>

        <button 
          onClick={() => setPartner("Tech Center")}
          className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${partner === 'Tech Center' ? 'bg-[#FFF7DB] border-[#FFC632]' : 'bg-white border-[#E2E5EB] shadow-academic-sm'}`}
        >
          <div className="bg-[#fce8e6] p-3 rounded-lg shrink-0">
            <Printer size={24} className="text-[#800000]" />
          </div>
          <div className="flex flex-col items-start text-left flex-1">
            <div className="flex w-full justify-between items-center mb-1">
              <span className="font-bold text-[#1B2336] text-sm">Tech Center</span>
              <span className="text-[9px] font-bold tracking-widest uppercase bg-[#10B981]/10 text-[#10B981] px-2 py-0.5 rounded-full border border-[#10B981]/20">Verified</span>
            </div>
            <span className="text-[11px] text-[#4A4A4A] mb-1">Open 8:00 AM - 5:00 PM • 1.2km away</span>
            <span className="text-[10px] font-bold text-[#1B2336] bg-[#F4F5F7] px-2 py-1 rounded">Queue: 1 job ahead • ~2 mins</span>
          </div>
        </button>
      </div>

      {/* Remote Document Upload Card */}
      <div className="flex flex-col gap-4 bg-white p-5 rounded-xl border border-[#E2E5EB] shadow-academic-md">
        <h2 className="font-heading font-bold text-lg text-[#1B2336]">Remote Document Upload</h2>
        
        {/* Upload Dropzone */}
        <div className="border-2 border-dashed border-[#E2E5EB] bg-[#F4F5F7] rounded-xl p-6 flex flex-col items-center justify-center text-center">
          <div className="bg-white p-3 rounded-full shadow-sm mb-3">
            <UploadCloud size={24} className="text-[#800000]" />
          </div>
          <span className="font-bold text-[#1B2336] text-sm">Tap to upload document</span>
          <span className="text-[11px] text-[#7A7A7A] mt-1">PDF, DOCX, PPTX up to 25MB</span>
        </div>

        {/* Sender & Subject (Mock Form) */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-[#4A4A4A] uppercase tracking-wider">Sender Name</label>
            <input type="text" value="Jelo Lopez (2022-84910)" disabled className="bg-[#F4F5F7] border border-[#E2E5EB] rounded-lg px-3 py-2 text-sm text-[#4A4A4A] font-bold cursor-not-allowed" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-[#4A4A4A] uppercase tracking-wider">Document Subject</label>
            <input type="text" placeholder="e.g. Chapter 1 Thesis..." className="bg-white border border-[#E2E5EB] rounded-lg px-3 py-2 text-sm text-[#1B2336] focus:outline-none focus:border-[#800000]" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-[#4A4A4A] uppercase tracking-wider">Special Instructions</label>
            <textarea placeholder="e.g. Bind with clear folder..." className="bg-white border border-[#E2E5EB] rounded-lg px-3 py-2 text-sm text-[#1B2336] focus:outline-none focus:border-[#800000] min-h-[60px]" />
          </div>
        </div>

        <hr className="border-[#E2E5EB]" />

        {/* Print Settings (Calculator) */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-[#4A4A4A]">Pages to Print</span>
          <div className="flex items-center bg-white border border-[#E2E5EB] rounded-lg overflow-hidden">
            <button onClick={() => setPages(Math.max(1, pages - 1))} className="px-3 py-1.5 bg-[#F4F5F7] text-[#4A4A4A] font-bold border-r border-[#E2E5EB] hover:bg-[#E2E5EB]">-</button>
            <span className="px-4 py-1.5 font-bold text-[#1B2336] min-w-[3rem] text-center">{pages}</span>
            <button onClick={() => setPages(pages + 1)} className="px-3 py-1.5 bg-[#F4F5F7] text-[#4A4A4A] font-bold border-l border-[#E2E5EB] hover:bg-[#E2E5EB]">+</button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-[#4A4A4A]">Color Mode</span>
          <div className="flex bg-[#F4F5F7] rounded-lg p-1 border border-[#E2E5EB]">
            <button onClick={() => setColorMode("Grayscale")} className={`px-4 py-1.5 text-xs font-bold rounded-md transition-colors ${colorMode === 'Grayscale' ? 'bg-white shadow-sm text-[#1B2336]' : 'text-[#7A7A7A] hover:text-[#4A4A4A]'}`}>Grayscale</button>
            <button onClick={() => setColorMode("Color")} className={`px-4 py-1.5 text-xs font-bold rounded-md transition-colors ${colorMode === 'Color' ? 'bg-white shadow-sm text-[#1B2336]' : 'text-[#7A7A7A] hover:text-[#4A4A4A]'}`}>Color</button>
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
        <div className="bg-[#fef2f2] border border-[#f87171] p-3 rounded-md flex items-center gap-2 mb-4">
          <AlertCircle size={16} className="text-[#ef4444]" />
          <span className="text-[#b91c1c] text-sm font-bold">{error}</span>
        </div>
      )}

      {/* Bottom Sticky Action */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-[#E2E5EB] p-4 flex justify-between items-center z-40 shadow-[0_-4px_6px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col">
          <span className="text-xs text-[#7A7A7A] font-bold uppercase tracking-wider">Total Est. Cost</span>
          <span className="font-heading font-bold text-xl text-[#800000]">₱{cost.toFixed(2)}</span>
        </div>
        <button onClick={handleSubmit} className="bg-[#800000] text-white px-6 py-3.5 rounded-lg font-bold shadow-academic-md flex items-center gap-2 text-sm">
          <FileText size={18} />
          Submit Print Job
        </button>
      </div>

      {/* Modal Pass */}
      {showModal && (
        <div className="fixed inset-0 bg-[#1B2336]/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-xs p-6 flex flex-col items-center relative animate-in zoom-in-95 duration-200 shadow-xl">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-[#7A7A7A] hover:text-[#1B2336]">
              <X size={20} />
            </button>
            <div className="bg-[#10B981]/10 p-4 rounded-full mb-4">
              <CheckCircle2 size={48} className="text-[#10B981]" />
            </div>
            <h3 className="font-heading font-bold text-xl text-[#1B2336] mb-2">Job Submitted!</h3>
            <p className="text-sm text-[#4A4A4A] text-center mb-6">Show this PIN to the operator at <strong>{partner}</strong>.</p>
            <div className="bg-[#F4F5F7] border border-[#E2E5EB] rounded-xl px-8 py-4 w-full">
              <span className="block text-center text-[10px] font-bold text-[#7A7A7A] uppercase tracking-widest mb-1">Queue PIN</span>
              <span className="block text-center font-heading font-bold text-4xl text-[#800000] tracking-widest">{pin}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
