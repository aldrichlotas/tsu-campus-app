"use client";

import { useDemo } from "@/context/DemoContext";
import { AlertCircle, Minus, Plus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MENU = [
  { id: "m1", name: "Pork Sisig w/ Egg", price: 65.00, stall: "Ate Joy's Eatery" },
  { id: "m2", name: "Chicken Inasal", price: 85.00, stall: "Manok ni San Pedro" },
  { id: "m3", name: "Iced Caramel Macchiato", price: 45.00, stall: "Kape TSU" },
];

export default function CanteenExpress() {
  const { activeCampus, canteenCart, addToCanteenCart, removeFromCanteenCart, placeCanteenOrder } = useDemo();
  const [error, setError] = useState("");
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

  return (
    <div className="flex flex-col p-4 gap-6 pb-32">
      <div className="flex items-center gap-3 mb-2">
        <Link href="/" className="text-[#800000] font-bold text-sm uppercase">← Back</Link>
        <h1 className="font-heading font-bold text-2xl text-[#1B2336]">Canteen Express</h1>
      </div>

      {/* Campus Context Banner */}
      <div className="bg-[#FFF7DB] border border-[#FFC632] p-3 rounded-lg flex items-center justify-center">
        <span className="font-bold text-[#785a00] text-sm uppercase">{activeCampus} Canteen</span>
      </div>

      {/* Menu Grid */}
      <div className="flex flex-col gap-4">
        {MENU.map(item => {
          const cartItem = canteenCart.find(i => i.id === item.id);
          const quantity = cartItem ? cartItem.quantity : 0;
          return (
            <div key={item.id} className="bg-white border border-[#E2E5EB] p-4 rounded-xl shadow-academic-sm flex justify-between items-center">
              <div>
                <h3 className="font-bold text-[#1B2336]">{item.name}</h3>
                <p className="text-xs text-[#7A7A7A]">{item.stall}</p>
                <span className="font-heading font-bold text-[#800000] mt-1 block">₱{item.price.toFixed(2)}</span>
              </div>

              <div className="flex items-center gap-3 bg-[#F4F5F7] rounded-lg p-1">
                <button onClick={() => removeFromCanteenCart(item.id)} className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-[#1B2336] shadow-sm disabled:opacity-50" disabled={quantity === 0}>
                  <Minus size={16} />
                </button>
                <span className="font-bold w-4 text-center">{quantity}</span>
                <button onClick={() => addToCanteenCart(item)} className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-[#1B2336] shadow-sm">
                  <Plus size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {error && (
        <div className="bg-[#fef2f2] border border-[#f87171] p-3 rounded-md flex items-center gap-2 mt-2">
          <AlertCircle size={16} className="text-[#ef4444]" />
          <span className="text-[#b91c1c] text-sm font-bold">{error}</span>
        </div>
      )}

      {/* Bottom Cart Drawer */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-[#E2E5EB] p-4 flex flex-col gap-3 shadow-[0_-4px_6px_rgba(0,0,0,0.05)] z-40">
        <div className="flex justify-between items-center text-sm">
          <span className="text-[#4A4A4A]">Subtotal</span>
          <span className="font-bold">₱{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-[#4A4A4A]">Service Fee</span>
          <span className="font-bold">₱5.00</span>
        </div>
        <div className="border-t border-[#E2E5EB] my-1"></div>
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-[#1B2336]">Total</span>
          <span className="font-heading font-bold text-xl text-[#800000]">₱{total.toFixed(2)}</span>
        </div>

        <button onClick={handleCheckout} className="bg-[#800000] text-white py-3 rounded-lg font-bold shadow-academic-md flex items-center justify-center gap-2">
          <ShoppingCart size={18} />
          Place Order
        </button>
      </div>
    </div>
  );
}
