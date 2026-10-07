"use client";

import { useDemo } from "@/context/DemoContext";
import { CheckCircle2, Heart, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ORGS = ["ALL", "JPIA", "JFINEX", "YES", "JMA", "HTM", "JPES"];
const PRODUCTS = [
  { id: "p1", name: "JPIA Official Polo", price: 450.00, org: "JPIA", image: "https://via.placeholder.com/150/800000/FFFFFF?text=JPIA+Polo" },
  { id: "p2", name: "CBA Lanyard 2026", price: 120.00, org: "ALL", image: "https://via.placeholder.com/150/FFC632/1B2336?text=Lanyard" },
  { id: "p3", name: "JFINEX Department Shirt", price: 350.00, org: "JFINEX", image: "https://via.placeholder.com/150/1B2336/FFFFFF?text=JFINEX+Shirt" },
  { id: "p4", name: "YES Varsity Jacket", price: 850.00, org: "YES", image: "https://via.placeholder.com/150/F4F5F7/1B2336?text=Varsity" },
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
    <div className="flex flex-col gap-6 pb-24">
      <div className="flex items-center justify-between p-4 pb-0">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-[#800000] font-bold text-sm uppercase">← Back</Link>
          <h1 className="font-heading font-bold text-2xl text-[#1B2336]">Merch Store</h1>
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

      {/* Filter Chips */}
      <div className="flex overflow-x-auto px-4 pb-2 gap-2 snap-x hide-scrollbar">
        {ORGS.map(org => (
          <button
            key={org}
            onClick={() => setFilter(org)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-colors snap-start ${filter === org ? 'bg-[#1B2336] text-white' : 'bg-white border border-[#E2E5EB] text-[#4A4A4A]'}`}
          >
            {org}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4 px-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-xl overflow-hidden border border-[#E2E5EB] shadow-academic-sm flex flex-col">
            <div className="relative w-full aspect-square bg-[#F4F5F7]">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <button
                onClick={() => toggleFav(product.id)}
                className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur rounded-full shadow-sm"
              >
                <Heart size={16} className={favorites[product.id] ? "fill-[#ef4444] text-[#ef4444]" : "text-[#7A7A7A]"} />
              </button>
            </div>
            <div className="p-3 flex flex-col justify-between flex-1">
              <div>
                <span className="text-[9px] font-bold tracking-wider text-[#7A7A7A] uppercase">{product.org}</span>
                <h3 className="font-bold text-sm text-[#1B2336] leading-tight mt-1 line-clamp-2">{product.name}</h3>
              </div>
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#F4F5F7]">
                <span className="font-heading font-bold text-[#800000]">₱{product.price.toFixed(2)}</span>
                <button
                  onClick={() => openSizeModal(product)}
                  className="bg-[#1B2336] text-white w-6 h-6 rounded flex items-center justify-center font-bold text-lg leading-none"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Cart Drawer */}
      {merchCart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-[#E2E5EB] p-4 flex justify-between items-center z-30 shadow-[0_-4px_6px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col">
            <span className="text-xs text-[#7A7A7A]">Cart Total</span>
            <span className="font-heading font-bold text-xl text-[#800000]">₱{totalCart.toFixed(2)}</span>
          </div>
          <button onClick={handleCheckout} className="bg-[#800000] text-white px-6 py-3 rounded-lg font-bold shadow-academic-md">
            Checkout
          </button>
        </div>
      )}

      {/* Sizing Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-[#1B2336]/60 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-2xl p-6 animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-heading font-bold text-xl text-[#1B2336]">Select Size</h3>
              <button onClick={() => setSelectedProduct(null)} className="text-[#7A7A7A] hover:text-[#1B2336]">
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {SIZES.map(s => (
                <button
                  key={s}
                  onClick={() => { setSelectedSize(s); setSizeError(""); }}
                  className={`py-3 rounded-lg font-bold border-2 transition-colors ${selectedSize === s ? 'border-[#FFC632] bg-[#FFF7DB] text-[#785a00]' : 'border-[#E2E5EB] bg-white text-[#4A4A4A]'}`}
                >
                  {s}
                </button>
              ))}
            </div>

            {sizeError && <p className="text-[#ef4444] text-xs font-bold mb-4">{sizeError}</p>}

            <button
              onClick={confirmAddToCart}
              className="w-full bg-[#1B2336] text-white py-3 rounded-lg font-bold shadow-academic-md"
            >
              Add to Cart - ₱{selectedProduct.price.toFixed(2)}
            </button>
          </div>
        </div>
      )}

      {/* Checkout Success */}
      {showCheckout && (
        <div className="fixed inset-0 bg-[#1B2336]/60 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-xs p-6 flex flex-col items-center relative animate-in zoom-in-95 duration-200">
            <div className="bg-[#10B981]/10 p-4 rounded-full mb-4">
              <CheckCircle2 size={48} className="text-[#10B981]" />
            </div>
            <h3 className="font-heading font-bold text-xl text-[#1B2336] mb-2">Order Confirmed!</h3>
            <p className="text-sm text-[#4A4A4A] text-center mb-6">You can pick up your merch at the CBA Council Office.</p>
            <button
              onClick={() => setShowCheckout(false)}
              className="w-full bg-[#F4F5F7] border border-[#E2E5EB] text-[#1B2336] py-3 rounded-xl font-bold"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
