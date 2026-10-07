"use client";

import { useState } from "react";
import Link from "next/link";
import { useDemo } from "@/context/DemoContext";
import { Bus, Utensils, Printer, ShoppingBag, ChevronRight, Wallet, MapPin, AlertCircle, Clock, Zap, Smartphone, CreditCard, ChevronLeft } from "lucide-react";

export default function Home() {
  const { balance, activeCampus, setActiveCampus } = useDemo();
  const [carouselIndex, setCarouselIndex] = useState(0);

  const carouselItems = [
    { type: 'shuttle', title: 'Live Shuttle Pass', desc: 'Arriving in 4 mins at Main Gate', icon: Bus, color: '#800000' },
    { type: 'canteen', title: 'Kitchen Preparing', desc: 'Order #8822 • Canteen Express', icon: Utensils, color: '#92400e' }
  ];

  return (
    <div className="flex flex-col p-4 gap-6 pb-8">
      {/* Midterm Week Advisory */}
      <div className="bg-[#FFF8E7] border border-[#FFC632] rounded-lg p-3 flex items-start gap-3 shadow-sm">
        <AlertCircle size={20} className="text-[#FFC632] shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-sm text-[#1B2336] leading-tight">Midterm Week Advisory</h3>
          <p className="text-xs text-[#4A4A4A] mt-0.5">Library extended hours until 10PM. Shuttle services running at 15m intervals.</p>
        </div>
      </div>

      {/* Greeting & Metadata Pills */}
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-heading font-bold text-2xl text-[#1B2336]">Good morning, Alex 👋</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-[#F4F5F7] border border-[#E2E5EB] text-[#4A4A4A] text-[11px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">BS Computer Science</span>
              <span className="bg-[#F4F5F7] border border-[#E2E5EB] text-[#4A4A4A] text-[11px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">#2022-84910</span>
            </div>
          </div>
        </div>

        {/* Campus Toggle */}
        <div className="flex gap-2 mt-1">
          <button 
            onClick={() => setActiveCampus("TSU Main Campus")}
            className={`flex-1 py-2 rounded-lg border text-xs font-bold transition-colors ${activeCampus === 'TSU Main Campus' ? 'bg-[#800000] text-white border-[#800000] shadow-academic-sm' : 'bg-white text-[#4A4A4A] border-[#E2E5EB]'}`}
          >
            TSU Main
          </button>
          <button 
            onClick={() => setActiveCampus("TSU Lucinda Campus")}
            className={`flex-1 py-2 rounded-lg border text-xs font-bold transition-colors ${activeCampus === 'TSU Lucinda Campus' ? 'bg-[#800000] text-white border-[#800000] shadow-academic-sm' : 'bg-white text-[#4A4A4A] border-[#E2E5EB]'}`}
          >
            Lucinda Campus
          </button>
        </div>
      </div>

      {/* Queue Statistics Strip */}
      <div className="bg-white border border-[#E2E5EB] rounded-xl p-3 flex justify-between items-center shadow-academic-sm">
        <div className="flex items-center gap-2">
          <div className="bg-[#F4F5F7] p-1.5 rounded-full">
            <Zap size={14} className="text-[#FFC632]" />
          </div>
          <span className="text-sm font-bold text-[#1B2336]">18 queues bypassed</span>
        </div>
        <div className="bg-[#800000] text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
          <Clock size={12} />
          4m avg wait
        </div>
      </div>

      {/* Ledger Balance Card */}
      <div className="bg-[#1B2336] rounded-xl p-5 shadow-academic-md relative overflow-hidden flex flex-col gap-4">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
        <div className="flex justify-between items-center relative z-10">
          <div className="flex items-center gap-2">
            <Wallet size={18} className="text-[#FFC632]" />
            <span className="text-[#E2E5EB] text-xs font-bold uppercase tracking-wider">Student Ledger</span>
          </div>
          <span className="text-xs text-[#E2E5EB] bg-white/10 px-2 py-1 rounded">Good Standing</span>
        </div>
        <div className="relative z-10">
          <span className="text-white text-3xl font-heading font-bold">₱{balance.toFixed(2)}</span>
        </div>
        <div className="flex gap-2 relative z-10 overflow-x-auto hide-scrollbar">
          <button className="bg-white/10 hover:bg-white/20 transition-colors px-3 py-1.5 rounded-full text-xs text-white flex items-center gap-1.5 shrink-0">
            <Smartphone size={12} /> GCash
          </button>
          <button className="bg-white/10 hover:bg-white/20 transition-colors px-3 py-1.5 rounded-full text-xs text-white flex items-center gap-1.5 shrink-0">
            <CreditCard size={12} /> Maya
          </button>
          <button className="bg-white/10 hover:bg-white/20 transition-colors px-3 py-1.5 rounded-full text-xs text-white flex items-center gap-1.5 shrink-0">
            <CreditCard size={12} /> TSU ID Tap Ready
          </button>
        </div>
      </div>

      {/* Live Service Tracker Carousel */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-lg text-[#1B2336]">Live Trackers</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => setCarouselIndex(0)} 
              className={`p-1 rounded-full border transition-colors ${carouselIndex === 0 ? 'bg-[#1B2336] text-white border-[#1B2336]' : 'bg-white text-[#7A7A7A] border-[#E2E5EB]'}`}
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={() => setCarouselIndex(1)}
              className={`p-1 rounded-full border transition-colors ${carouselIndex === 1 ? 'bg-[#1B2336] text-white border-[#1B2336]' : 'bg-white text-[#7A7A7A] border-[#E2E5EB]'}`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        
        <div className="bg-white border border-[#E2E5EB] rounded-xl p-4 flex items-center gap-4 shadow-academic-sm">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-opacity-10 shrink-0" style={{ backgroundColor: `${carouselItems[carouselIndex].color}20` }}>
            <carouselItems[carouselIndex].icon size={24} color={carouselItems[carouselIndex].color} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-sm text-[#1B2336]">{carouselItems[carouselIndex].title}</h3>
            <p className="text-xs text-[#7A7A7A] mt-0.5">{carouselItems[carouselIndex].desc}</p>
          </div>
          <ChevronRight size={18} className="text-[#1B2336]" />
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
              <span className="text-[11px] font-bold text-[#800000] uppercase tracking-wider">₱25 Fixed</span>
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
              <span className="text-[11px] font-bold text-[#92400e] uppercase tracking-wider">Pre-Order</span>
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
              <span className="text-[11px] font-bold text-[#800000] uppercase tracking-wider">Live Queue</span>
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
              <span className="text-[11px] font-bold text-[#92400e] uppercase tracking-wider">Pickup</span>
              <ChevronRight size={14} className="text-[#7A7A7A]" />
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}
