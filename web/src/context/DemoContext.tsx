"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  image?: string;
  stall?: string;
}

interface DemoContextType {
  balance: number;
  setBalance: (v: number) => void;
  activeCampus: "TSU Main Campus" | "TSU Lucinda Campus";
  setActiveCampus: (c: "TSU Main Campus" | "TSU Lucinda Campus") => void;
  
  // Shuttle
  shuttleRoute: "Main Campus → Lucinda Campus" | "Lucinda Campus → Main Campus";
  setShuttleRoute: (r: "Main Campus → Lucinda Campus" | "Lucinda Campus → Main Campus") => void;
  bookShuttle: () => { success: boolean; error?: string; ticketId?: string };
  
  // Canteen
  canteenCart: CartItem[];
  addToCanteenCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCanteenCart: (id: string) => void;
  canteenOrderStatus: "Idle" | "Order Sent" | "Preparing" | "Ready for Pickup";
  placeCanteenOrder: () => { success: boolean; error?: string; orderId?: string };
  
  // Print
  queuePrintJob: (cost: number) => { success: boolean; error?: string; pin?: string };
  
  // Merch
  merchCart: CartItem[];
  addToMerchCart: (item: Omit<CartItem, 'quantity'>, size: string) => void;
  removeFromMerchCart: (id: string, size: string) => void;
  checkoutMerch: () => { success: boolean; error?: string };
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState(1450.00);
  const [activeCampus, setActiveCampus] = useState<"TSU Main Campus" | "TSU Lucinda Campus">("TSU Main Campus");
  
  const [shuttleRoute, setShuttleRoute] = useState<"Main Campus → Lucinda Campus" | "Lucinda Campus → Main Campus">("Main Campus → Lucinda Campus");
  
  const [canteenCart, setCanteenCart] = useState<CartItem[]>([]);
  const [canteenOrderStatus, setCanteenOrderStatus] = useState<"Idle" | "Order Sent" | "Preparing" | "Ready for Pickup">("Idle");
  
  const [merchCart, setMerchCart] = useState<CartItem[]>([]);

  const bookShuttle = () => {
    if (balance < 25) return { success: false, error: "Insufficient balance." };
    setBalance(b => b - 25);
    return { success: true, ticketId: "#TSU-SHT-2026-X8F2" };
  };

  const addToCanteenCart = (item: Omit<CartItem, 'quantity'>) => {
    setCanteenCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCanteenCart = (id: string) => {
    setCanteenCart(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.id !== id);
    });
  };

  const placeCanteenOrder = () => {
    const subtotal = canteenCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const total = subtotal + 5.0; // 5.00 service fee
    if (balance < total) return { success: false, error: "Insufficient balance." };
    setBalance(b => b - total);
    setCanteenCart([]);
    
    setCanteenOrderStatus("Order Sent");
    setTimeout(() => setCanteenOrderStatus("Preparing"), 4000);
    setTimeout(() => setCanteenOrderStatus("Ready for Pickup"), 10000);
    
    return { success: true, orderId: "#8921" };
  };

  const queuePrintJob = (cost: number) => {
    if (balance < cost) return { success: false, error: "Insufficient balance." };
    setBalance(b => b - cost);
    return { success: true, pin: "#PR-492" };
  };

  const addToMerchCart = (item: Omit<CartItem, 'quantity'>, size: string) => {
    setMerchCart(prev => {
      const existing = prev.find(i => i.id === item.id && i.size === size);
      if (existing) {
        return prev.map(i => i.id === item.id && i.size === size ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, size, quantity: 1 }];
    });
  };

  const removeFromMerchCart = (id: string, size: string) => {
    setMerchCart(prev => {
      const existing = prev.find(i => i.id === id && i.size === size);
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.id === id && i.size === size ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => !(i.id === id && i.size === size));
    });
  };

  const checkoutMerch = () => {
    const total = merchCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    if (balance < total) return { success: false, error: "Insufficient balance." };
    setBalance(b => b - total);
    setMerchCart([]);
    return { success: true };
  };

  return (
    <DemoContext.Provider value={{
      balance, setBalance,
      activeCampus, setActiveCampus,
      shuttleRoute, setShuttleRoute, bookShuttle,
      canteenCart, addToCanteenCart, removeFromCanteenCart, canteenOrderStatus, placeCanteenOrder,
      queuePrintJob,
      merchCart, addToMerchCart, removeFromMerchCart, checkoutMerch
    }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error("useDemo must be used within a DemoProvider");
  }
  return context;
}
