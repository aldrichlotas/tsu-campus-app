"use client";

import { useDemo } from "@/context/DemoContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Plus, Minus, AlertCircle, ShoppingCart, Info, Clock, Utensils } from "lucide-react";

const CATEGORIES = ["All", "Rice Meals", "Drinks", "Snacks", "Halal", "Vegan"];

const MENU = [
  { id: "m1", name: "Pork Sisig w/ Egg", price: 65.00, stall: "Ate Joy's Eatery", prepTime: "10-15m", category: "Rice Meals", img: "https://via.placeholder.com/100/1B2336/FFFFFF?text=Sisig" },
  { id: "m2", name: "Chicken Inasal", price: 85.00, stall: "Manok ni San Pedro", prepTime: "15-20m", category: "Rice Meals", img: "https://via.placeholder.com/100/800000/FFFFFF?text=Inasal" },
  { id: "m3", name: "Iced Caramel Macchiato", price: 45.00, stall: "Kape TSU", prepTime: "5m", category: "Drinks", img: "https://via.placeholder.com/100/FFC632/1B2336?text=Coffee" },
  { id: "m4", name: "Cheese Shawarma", price: 55.00, stall: "Habibi's", prepTime: "8m", category: "Halal", img: "https://via.placeholder.com/100/10B981/FFFFFF?text=Shawarma" },
];

export default function CanteenExpress() {
  const { activeCampus, canteenCart, addToCanteenCart, removeFromCanteenCart, placeCanteenOrder } = useDemo();
  const [error, setError] = useState("");
  const [activeCat, setActiveCat] = useState("All");
  const router = useRouter();

  const subtotal = canteenCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal > 0 ? subtotal + 5.0 : 0;

  const handleCheckout = () => {
    if (canteenCart.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    const res = placeCanteenOrder();
    if (res.success) {
      router.push("/canteen/tracker");
    } else {
      setError(res.error || "Checkout failed");
    }
  };

  const filteredMenu = activeCat === "All" ? MENU : MENU.filter(m => m.category === activeCat);

  return (
    <div className="flex flex-col gap-6 pb-44">
      {/* Header Sticky */}
      <div className="sticky top-0 bg-white/90 backdrop-blur z-20 p-4 border-b border-[#E2E5EB]">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-[#800000] font-bold text-sm uppercase">← Back</Link>
          <h1 className="font-heading font-bold text-2xl text-[#1B2336]">Canteen Express</h1>
        </div>
      </div>

      <div className="px-4 flex flex-col gap-5">
        {/* Campus Context & Callout */}
        <div className="bg-[#FFF8E7] border border-[#FFC632] p-3 rounded-lg flex items-start gap-3 shadow-sm">
          <Info size={20} className="text-[#FFC632] shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-sm text-[#785a00] uppercase tracking-wider">{activeCampus} Canteen</h3>
            <p className="text-xs text-[#4A4A4A] mt-1">Peak Hours Alert: Expect a 10-15 minute delay on all rice meals.</p>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar -mx-4 px-4">
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-colors border ${activeCat === cat ? 'bg-[#1B2336] text-white border-[#1B2336] shadow-academic-sm' : 'bg-white text-[#4A4A4A] border-[#E2E5EB]'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="flex flex-col gap-4">
          {filteredMenu.map(item => {
            const cartItem = canteenCart.find(i => i.id === item.id);
            const quantity = cartItem ? cartItem.quantity : 0;
            return (
              <div key={item.id} className="bg-white border border-[#E2E5EB] p-3 rounded-xl shadow-academic-sm flex gap-4">
                {/* Photo Slot */}
                <div className="w-24 h-24 bg-[#F4F5F7] rounded-lg shrink-0 overflow-hidden relative">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[9px] font-bold p-1 flex items-center justify-center gap-1 backdrop-blur-sm">
                    <Clock size={10} /> {item.prepTime}
                  </div>
                </div>

                <div className="flex flex-col justify-between flex-1 py-1">
                  <div>
                    <span className="text-[10px] font-bold text-[#800000] uppercase tracking-wider">{item.stall}</span>
                    <h3 className="font-bold text-sm text-[#1B2336] leading-tight line-clamp-2 mt-0.5">{item.name}</h3>
                  </div>
                  
                  <div className="flex justify-between items-end mt-2">
                    <span className="font-heading font-bold text-[#1B2336] text-lg">₱{item.price.toFixed(2)}</span>
                    
                    <div className="flex items-center gap-2 bg-[#F4F5F7] rounded-lg p-1 border border-[#E2E5EB]">
                      <button onClick={() => removeFromCanteenCart(item.id)} className="w-7 h-7 flex items-center justify-center rounded bg-white text-[#1B2336] shadow-sm disabled:opacity-50" disabled={quantity === 0}>
                        <Minus size={14} />
                      </button>
                      <span className="font-bold w-4 text-center text-sm">{quantity}</span>
                      <button onClick={() => addToCanteenCart(item)} className="w-7 h-7 flex items-center justify-center rounded bg-white text-[#1B2336] shadow-sm">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {error && (
          <div className="bg-[#fef2f2] border border-[#f87171] p-3 rounded-md flex items-center gap-2">
            <AlertCircle size={16} className="text-[#ef4444]" />
            <span className="text-[#b91c1c] text-sm font-bold">{error}</span>
          </div>
        )}
      </div>

      {/* Bottom Cart Drawer */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-[#E2E5EB] p-4 flex flex-col gap-3 shadow-[0_-8px_15px_rgba(0,0,0,0.05)] z-40">
        
        {/* Live Preview Sheet Handle */}
        <div className="w-12 h-1.5 bg-[#E2E5EB] rounded-full mx-auto mb-1"></div>
        
        <div className="flex justify-between items-center text-sm px-1">
          <span className="text-[#4A4A4A]">Subtotal ({canteenCart.reduce((a,b)=>a+b.quantity,0)} items)</span>
          <span className="font-bold">₱{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-sm px-1">
          <span className="text-[#4A4A4A]">Platform Service Fee</span>
          <span className="font-bold">₱5.00</span>
        </div>
        <div className="border-t border-[#E2E5EB] my-1"></div>
        <div className="flex justify-between items-center mb-2 px-1">
          <span className="font-bold text-[#1B2336]">Total Pay</span>
          <span className="font-heading font-bold text-2xl text-[#800000]">₱{total.toFixed(2)}</span>
        </div>
        
        <button onClick={handleCheckout} className="bg-[#800000] text-white py-3.5 rounded-xl font-bold shadow-academic-md flex items-center justify-center gap-2 text-lg">
          <Utensils size={20} />
          Place Pre-Order
        </button>
      </div>
    </div>
  );
}
