"use client";

import Link from "next/link";
import { useDemo } from "@/context/DemoContext";
import { Bus, Utensils, Printer, ShoppingBag, ChevronRight, Wallet, MapPin } from "lucide-react";

export default function Home() {
  const { balance, activeCampus, setActiveCampus } = useDemo();

  return (
    <div className="flex flex-col p-4 gap-6 pb-8">
      {/* Greeting & Campus Toggle */}
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-heading font-bold text-2xl text-[#1B2336]">Hi, Alex!</h1>
            <p className="text-sm text-[#7A7A7A] mt-1">CBA • BS Accountancy</p>
          </div>
          
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => setActiveCampus("TSU Main Campus")}
              className={`px-3 py-1.5 rounded-md border text-xs font-bold transition-colors ${activeCampus === 'TSU Main Campus' ? 'bg-[#800000] text-white border-[#800000]' : 'bg-white text-[#4A4A4A] border-[#E2E5EB]'}`}
            >
              Main Campus
            </button>
            <button 
              onClick={() => setActiveCampus("TSU Lucinda Campus")}
              className={`px-3 py-1.5 rounded-md border text-xs font-bold transition-colors ${activeCampus === 'TSU Lucinda Campus' ? 'bg-[#800000] text-white border-[#800000]' : 'bg-white text-[#4A4A4A] border-[#E2E5EB]'}`}
            >
              Lucinda Campus
            </button>
          </div>
        </div>
      </div>

      {/* Ledger Balance Card */}
      <div className="bg-[#1B2336] rounded-xl p-5 shadow-academic-md relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
        <div className="flex justify-between items-center mb-4 relative z-10">
          <div className="flex items-center gap-2">
            <Wallet size={18} className="text-[#FFC632]" />
            <span className="text-[#E2E5EB] text-xs font-bold uppercase tracking-wider">Ledger Balance</span>
          </div>
          <span className="text-xs text-[#E2E5EB] bg-white/10 px-2 py-1 rounded">Good Standing</span>
        </div>
        <div className="relative z-10">
          <span className="text-white text-3xl font-heading font-bold">₱{balance.toFixed(2)}</span>
        </div>
      </div>

      {/* Services Grid */}
      <div className="flex flex-col gap-3">
        <h2 className="font-heading font-bold text-lg text-[#1B2336]">Express Services</h2>
        <div className="grid grid-cols-2 gap-3">
          
          {/* Shuttle */}
          <Link href="/shuttle" className="bg-white border border-[#E2E5EB] rounded-xl p-4 flex flex-col justify-between shadow-academic-sm hover:shadow-academic-md transition-shadow min-h-[140px]">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#fce8e6] flex items-center justify-center mb-3">
                <Bus size={20} className="text-[#800000]" />
              </div>
              <h3 className="font-bold text-sm text-[#1B2336] leading-tight mb-1">Campus Shuttle</h3>
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F4F5F7]">
              <span className="text-xs font-bold text-[#800000]">₱25 Fixed</span>
              <ChevronRight size={14} className="text-[#7A7A7A]" />
            </div>
          </Link>

          {/* Canteen */}
          <Link href="/canteen" className="bg-white border border-[#E2E5EB] rounded-xl p-4 flex flex-col justify-between shadow-academic-sm hover:shadow-academic-md transition-shadow min-h-[140px]">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#fef3c7] flex items-center justify-center mb-3">
                <Utensils size={20} className="text-[#92400e]" />
              </div>
              <h3 className="font-bold text-sm text-[#1B2336] leading-tight mb-1">Canteen Express</h3>
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F4F5F7]">
              <span className="text-xs font-bold text-[#92400e]">Pre-Order</span>
              <ChevronRight size={14} className="text-[#7A7A7A]" />
            </div>
          </Link>

          {/* Print Hub */}
          <Link href="/print" className="bg-white border border-[#E2E5EB] rounded-xl p-4 flex flex-col justify-between shadow-academic-sm hover:shadow-academic-md transition-shadow min-h-[140px]">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#fce8e6] flex items-center justify-center mb-3">
                <Printer size={20} className="text-[#800000]" />
              </div>
              <h3 className="font-bold text-sm text-[#1B2336] leading-tight mb-1">Print Hub</h3>
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F4F5F7]">
              <span className="text-xs font-bold text-[#800000]">Live Queue</span>
              <ChevronRight size={14} className="text-[#7A7A7A]" />
            </div>
          </Link>

          {/* Merch */}
          <Link href="/merch" className="bg-white border border-[#E2E5EB] rounded-xl p-4 flex flex-col justify-between shadow-academic-sm hover:shadow-academic-md transition-shadow min-h-[140px]">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#fef3c7] flex items-center justify-center mb-3">
                <ShoppingBag size={20} className="text-[#92400e]" />
              </div>
              <h3 className="font-bold text-sm text-[#1B2336] leading-tight mb-1">Dept Merch</h3>
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F4F5F7]">
              <span className="text-xs font-bold text-[#92400e]">Pickup</span>
              <ChevronRight size={14} className="text-[#7A7A7A]" />
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}
