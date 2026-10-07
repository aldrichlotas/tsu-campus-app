"use client";

import { useState } from "react";
import { useDemo } from "@/context/DemoContext";
import Link from "next/link";
import { ShoppingBag, Heart, CheckCircle2, X, Star, SlidersHorizontal, ArrowUpDown, ShieldCheck, Info } from "lucide-react";

const ORGS = ["ALL", "JPIA", "JFINEX", "YES", "JMA", "HTM", "JPES"];
const PRODUCTS = [
  { id: "p1", name: "JPIA Official Polo", price: 450.00, org: "JPIA", rating: "5.0", reviews: 188, features: ["HONEYCOMB FABRIC", "XS-2XL"], image: "https://via.placeholder.com/150/800000/FFFFFF?text=JPIA+Polo" },
  { id: "p2", name: "CBA Lanyard 2026", price: 120.00, org: "ALL", rating: "4.8", reviews: 412, features: ["WOVEN", "WITH BUCKLE"], image: "https://via.placeholder.com/150/FFC632/1B2336?text=Lanyard" },
  { id: "p3", name: "JFINEX Department Shirt", price: 350.00, org: "JFINEX", rating: "4.9", reviews: 95, features: ["100% COTTON", "3 COLORS"], image: "https://via.placeholder.com/150/1B2336/FFFFFF?text=JFINEX+Shirt" },
  { id: "p4", name: "YES Varsity Jacket", price: 850.00, org: "YES", rating: "5.0", reviews: 42, features: ["EMBROIDERED", "PRE-ORDER"], image: "https://via.placeholder.com/150/F4F5F7/1B2336?text=Varsity" },
];
const SIZES = ["XS", "S", "M", "L", "XL", "2XL"];

export default function MerchStore() {
  const { addToMerchCart, checkoutMerch, merchCart } = useDemo();
  const [filter, setFilter] = useState("ALL");
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  
  const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeError, setSizeError] = useState("");
  
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const toggleFav = (id: string) => {
    setFavorites(p => ({ ...p, [id]: !p[id] }));
  };

  const filteredProducts = PRODUCTS.filter(p => filter === "ALL" || p.org === filter || p.org === "ALL");

  const openSizeModal = (product: typeof PRODUCTS[0]) => {
    setSelectedProduct(product);
    setSelectedSize("");
    setSizeError("");
  };

  const confirmAddToCart = () => {
    if (!selectedSize) {
      setSizeError("Please select a size");
      return;
    }
    addToMerchCart({ id: selectedProduct!.id, name: selectedProduct!.name, price: selectedProduct!.price }, selectedSize);
    setSelectedProduct(null);
  };

  const totalCart = merchCart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (merchCart.length === 0) return;
    const res = checkoutMerch();
    if (res.success) {
      setShowCheckout(true);
      setCheckoutError("");
    } else {
      setCheckoutError(res.error || "Failed");
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-28">
      {/* Header Sticky */}
      <div className="sticky top-0 bg-white/90 backdrop-blur z-20 p-4 border-b border-[#E2E5EB] flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-[#800000] font-bold text-sm uppercase">← Back</Link>
            <h1 className="font-heading font-bold text-2xl text-[#1B2336]">CBA Merch</h1>
          </div>
          <div className="relative">
            <ShoppingBag size={24} className="text-[#1B2336]" />
            {merchCart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#800000] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {merchCart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            )}
          </div>
        </div>
        
        {/* Verification & Sub-header */}
        <div className="flex items-center gap-2 mt-1">
          <ShieldCheck size={14} className="text-[#10B981]" />
          <span className="text-[10px] font-bold text-[#4A4A4A] uppercase tracking-widest">Official CBA Student Portal • Semester 1</span>
        </div>
      </div>

      <div className="px-4 flex flex-col gap-5">
        
        {/* Drop #2 Pre-Order Card */}
        <div className="bg-[#1B2336] rounded-xl p-5 shadow-academic-md relative overflow-hidden flex flex-col gap-2">
          <div className="absolute right-0 top-0 w-32 h-32 bg-[#FFC632]/10 rounded-full blur-2xl"></div>
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <span className="bg-[#FFC632] text-[#785a00] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Drop #2 Pre-Order</span>
              <h3 className="font-heading font-bold text-lg text-white mt-2">CBA Official Varsity</h3>
              <p className="text-xs text-[#E2E5EB] mt-1">Claim window: Nov 24–28 at CBA Council Office.</p>
            </div>
          </div>
          <button className="relative z-10 bg-white text-[#1B2336] text-xs font-bold py-2 rounded-lg mt-2 w-max px-4 shadow-sm">
            Claim Slot
          </button>
        </div>

        {/* Catalog Header Control Bar */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h2 className="font-heading font-bold text-base text-[#1B2336]">Organization Catalog</h2>
              <span className="bg-[#F4F5F7] text-[#4A4A4A] border border-[#E2E5EB] text-[9px] font-bold px-2 py-0.5 rounded-full">10 ITEMS</span>
            </div>
            <div className="flex gap-2">
              <button className="p-1.5 border border-[#E2E5EB] rounded-lg text-[#1B2336] bg-white"><SlidersHorizontal size={14} /></button>
              <button className="p-1.5 border border-[#E2E5EB] rounded-lg text-[#1B2336] bg-white"><ArrowUpDown size={14} /></button>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar -mx-4 px-4">
            {ORGS.map(org => (
              <button
                key={org}
                onClick={() => setFilter(org)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-colors border ${filter === org ? 'bg-[#1B2336] text-white border-[#1B2336] shadow-academic-sm' : 'bg-white border-[#E2E5EB] text-[#4A4A4A]'}`}
              >
                {org}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-xl overflow-hidden border border-[#E2E5EB] shadow-academic-sm flex flex-col group">
              <div className="relative w-full aspect-square bg-[#F4F5F7]">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply" />
                <button 
                  onClick={() => toggleFav(product.id)}
                  className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur rounded-full shadow-sm hover:scale-110 transition-transform"
                >
                  <Heart size={14} className={favorites[product.id] ? "fill-[#ef4444] text-[#ef4444]" : "text-[#7A7A7A]"} />
                </button>
              </div>
              <div className="p-3 flex flex-col justify-between flex-1 gap-2">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[9px] font-bold tracking-wider text-[#7A7A7A] uppercase">{product.org}</span>
                    <div className="flex items-center gap-0.5">
                      <Star size={10} className="fill-[#FFC632] text-[#FFC632]" />
                      <span className="text-[9px] font-bold text-[#1B2336]">{product.rating}</span>
                      <span className="text-[9px] text-[#7A7A7A]">({product.reviews})</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-sm text-[#1B2336] leading-tight line-clamp-2">{product.name}</h3>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {product.features.map(f => (
                    <span key={f} className="text-[8px] font-bold text-[#4A4A4A] bg-[#F4F5F7] border border-[#E2E5EB] px-1.5 py-0.5 rounded uppercase tracking-wider">{f}</span>
                  ))}
                </div>

                <div className="mt-1 flex flex-col gap-2">
                  <span className="font-heading font-bold text-[#800000] text-lg">₱{product.price.toFixed(2)}</span>
                  <button 
                    onClick={() => openSizeModal(product)}
                    className="w-full bg-white border border-[#E2E5EB] text-[#1B2336] py-1.5 rounded-lg text-xs font-bold shadow-sm hover:bg-[#F4F5F7] transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Campus Fulfillment Policy Card */}
        <div className="bg-[#fce8e6] border border-[#800000]/20 rounded-xl p-4 mt-2 flex items-start gap-3">
          <Info size={18} className="text-[#800000] shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold text-[#800000]">Campus Fulfillment Policy</span>
            <p className="text-xs text-[#800000]/80 leading-relaxed">
              All items are for pick-up only at the CBA Council Office (3rd Floor, Main Bldg) during your designated claim window. Please bring your TSU ID and the digital receipt.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Cart Drawer */}
      {merchCart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-[#E2E5EB] p-4 flex justify-between items-center z-40 shadow-[0_-4px_15px_rgba(0,0,0,0.1)]">
          <div className="flex flex-col">
            <span className="text-xs text-[#7A7A7A] font-bold uppercase tracking-wider">Cart Total</span>
            <span className="font-heading font-bold text-xl text-[#800000]">₱{totalCart.toFixed(2)}</span>
          </div>
          <button onClick={handleCheckout} className="bg-[#800000] text-white px-8 py-3.5 rounded-xl font-bold shadow-academic-md flex items-center gap-2">
            Checkout
          </button>
        </div>
      )}

      {/* Sizing Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-[#1B2336]/60 z-50 flex items-end justify-center backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 animate-in slide-in-from-bottom duration-300 shadow-2xl">
            <div className="w-12 h-1.5 bg-[#E2E5EB] rounded-full mx-auto mb-4"></div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-heading font-bold text-xl text-[#1B2336]">{selectedProduct.name}</h3>
                <span className="text-sm font-bold text-[#800000]">₱{selectedProduct.price.toFixed(2)}</span>
              </div>
              <button onClick={() => setSelectedProduct(null)} className="text-[#7A7A7A] hover:text-[#1B2336] p-1 bg-[#F4F5F7] rounded-full">
                <X size={18} />
              </button>
            </div>
            
            <span className="block text-xs font-bold text-[#4A4A4A] uppercase tracking-wider mb-3">Select Size</span>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {SIZES.map(s => (
                <button
                  key={s}
                  onClick={() => { setSelectedSize(s); setSizeError(""); }}
                  className={`py-3 rounded-xl font-bold border-2 transition-all ${selectedSize === s ? 'border-[#800000] bg-[#fce8e6] text-[#800000] shadow-sm scale-95' : 'border-[#E2E5EB] bg-white text-[#4A4A4A] hover:border-[#4A4A4A]'}`}
                >
                  {s}
                </button>
              ))}
            </div>

            {sizeError && <p className="text-[#ef4444] text-xs font-bold mb-4 bg-[#fef2f2] p-2 rounded-lg text-center border border-[#f87171]">{sizeError}</p>}

            <button 
              onClick={confirmAddToCart}
              className="w-full bg-[#1B2336] text-white py-4 rounded-xl font-bold shadow-academic-md flex items-center justify-center gap-2 text-lg hover:bg-[#1B2336]/90 transition-colors"
            >
              <ShoppingBag size={20} />
              Add to Cart
            </button>
          </div>
        </div>
      )}

      {/* Checkout Success */}
      {showCheckout && (
        <div className="fixed inset-0 bg-[#1B2336]/80 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-xs p-8 flex flex-col items-center relative animate-in zoom-in-95 duration-200 shadow-2xl">
            <div className="bg-[#10B981]/10 p-5 rounded-full mb-5 border border-[#10B981]/20">
              <CheckCircle2 size={48} className="text-[#10B981]" />
            </div>
            <h3 className="font-heading font-bold text-2xl text-[#1B2336] mb-2">Order Confirmed!</h3>
            <p className="text-sm text-[#4A4A4A] text-center mb-8">You can pick up your merch at the CBA Council Office during your claim window.</p>
            <button 
              onClick={() => setShowCheckout(false)}
              className="w-full bg-[#F4F5F7] border border-[#E2E5EB] text-[#1B2336] py-3.5 rounded-xl font-bold shadow-sm hover:bg-[#E2E5EB] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
