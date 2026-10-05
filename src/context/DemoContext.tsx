import React, { createContext, useContext, useEffect, useState } from 'react';

export type Campus = 'TSU Main Campus' | 'TSU Lucinda Campus';

export interface MerchItem {
    id: string;
    name: string;
    org: 'JPIA' | 'JFINEX' | 'YES' | 'JMA' | 'HTM' | 'JPES' | 'ALL';
    price: number;
    rating: number;
    reviews: number;
    badge: string;
    image: string;
}

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    size?: string;
    type: 'canteen' | 'merch';
}

export interface ShuttlePass {
    ticketId: string;
    origin: Campus;
    destination: Campus;
    unit: string;
    departureTime: string;
    seat: string;
    lane: 'Lane A (Priority)' | 'Lane B (Walk-in)';
    fare: number;
    qrPayload: string;
}

export interface CanteenOrder {
    orderId: string;
    stall: string;
    campus: Campus;
    items: CartItem[];
    subtotal: number;
    fee: number;
    total: number;
    status: 'Order Sent' | 'Preparing' | 'Ready for Pickup';
    paymentMode: 'Student Account Ledger' | 'Cash on Pickup';
}

export interface PrintJob {
    pin: string;
    shopName: string;
    fileName: string;
    colorMode: 'Grayscale' | 'Full Color';
    pages: number;
    duplex: boolean;
    totalCost: number;
}

interface DemoContextType {
    // Student Profile
    studentName: string;
    studentId: string;
    balance: number;
    activeCampus: Campus;
    setActiveCampus: (campus: Campus) => void;
    deductBalance: (amount: number) => boolean;

    // Shuttle Engine
    activePass: ShuttlePass | null;
    bookShuttle: (origin: Campus, destination: Campus, unit: string, seat: string) => boolean;

    // Canteen Engine
    foodCart: CartItem[];
    addFoodItem: (item: { id: string; name: string; price: number }) => void;
    removeFoodItem: (id: string) => void;
    clearFoodCart: () => void;
    canteenOrder: CanteenOrder | null;
    submitCanteenOrder: (stall: string, paymentMode: 'Student Account Ledger' | 'Cash on Pickup') => boolean;

    // Print Engine
    activePrintJob: PrintJob | null;
    submitPrintOrder: (job: Omit<PrintJob, 'pin' | 'totalCost'>) => boolean;

    // Merch Engine
    selectedOrg: string;
    setSelectedOrg: (org: string) => void;
    merchCatalog: MerchItem[];
    favorites: string[];
    toggleFavorite: (id: string) => void;
    merchCart: CartItem[];
    addMerchToCart: (item: MerchItem, size: string) => void;
    removeMerchItem: (id: string, size?: string) => void;
    checkoutMerch: (paymentMode: 'Student Account Ledger' | 'Cash on Claim') => boolean;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [balance, setBalance] = useState<number>(1450.0);
    const [activeCampus, setActiveCampus] = useState<Campus>('TSU Main Campus');
    const [favorites, setFavorites] = useState<string[]>(['m-1', 'm-3']);
    const [selectedOrg, setSelectedOrg] = useState<string>('ALL');

    // Shuttle State
    const [activePass, setActivePass] = useState<ShuttlePass | null>({
        ticketId: '#TSU-SHT-2026-9812',
        origin: 'TSU Main Campus',
        destination: 'TSU Lucinda Campus',
        unit: 'Unit #04 (Coaster Bus)',
        departureTime: '10:15 AM',
        seat: 'Seat #12',
        lane: 'Lane A (Priority)',
        fare: 25.0,
        qrPayload: 'TSU-PASS-9812',
    });

    // Food Cart & Order State
    const [foodCart, setFoodCart] = useState<CartItem[]>([]);
    const [canteenOrder, setCanteenOrder] = useState<CanteenOrder | null>({
        orderId: '#8921',
        stall: "Mang Ben's Sizzling & Rice Bowls",
        campus: 'TSU Main Campus',
        items: [
            { id: 'f-1', name: 'Crispy Sisig Rice Bowl', price: 95.0, quantity: 1, type: 'canteen' },
            { id: 'f-2', name: 'Calamansi Juice (Large)', price: 25.0, quantity: 1, type: 'canteen' },
        ],
        subtotal: 120.0,
        fee: 5.0,
        total: 125.0,
        status: 'Preparing',
        paymentMode: 'Student Account Ledger',
    });

    // Print State
    const [activePrintJob, setActivePrintJob] = useState<PrintJob | null>(null);

    // Merch State
    const [merchCart, setMerchCart] = useState<CartItem[]>([]);
    const merchCatalog: MerchItem[] = [
        { id: 'm-1', name: 'JPIA Official Classic Lanyard', org: 'JPIA', price: 150.0, rating: 5.0, reviews: 142, badge: 'OFFICIAL MERCH', image: 'https://via.placeholder.com/150' },
        { id: 'm-2', name: 'JPIA Premium Polo Shirt', org: 'JPIA', price: 450.0, rating: 4.9, reviews: 88, badge: 'HONEYCOMB FABRIC', image: 'https://via.placeholder.com/150' },
        { id: 'm-3', name: 'JFINEX Minimalist Gold Pin', org: 'JFINEX', price: 120.0, rating: 4.8, reviews: 62, badge: 'METAL CLASP', image: 'https://via.placeholder.com/150' },
        { id: 'm-4', name: 'YES Oversized Pitch Hoodie', org: 'YES', price: 750.0, rating: 5.0, reviews: 204, badge: 'HEAVYWEIGHT FLEECE', image: 'https://via.placeholder.com/150' },
        { id: 'm-5', name: 'JMA Creative Canvas Tote', org: 'JMA', price: 220.0, rating: 4.7, reviews: 45, badge: 'HEAVY CANVAS', image: 'https://via.placeholder.com/150' },
        { id: 'm-6', name: 'HTM Hospitality Executive Vest', org: 'HTM', price: 650.0, rating: 4.9, reviews: 93, badge: 'TAILORED CUT', image: 'https://via.placeholder.com/150' },
        { id: 'm-7', name: 'JPES Fiscal Policy Tee', org: 'JPES', price: 380.0, rating: 4.8, reviews: 31, badge: 'COTTON SPANDEX', image: 'https://via.placeholder.com/150' },
    ];

    // Automated Kitchen Stepper Timer
    useEffect(() => {
        if (!canteenOrder) return;
        if (canteenOrder.status === 'Order Sent') {
            const timer = setTimeout(() => {
                setCanteenOrder((prev) => (prev ? { ...prev, status: 'Preparing' } : null));
            }, 5000);
            return () => clearTimeout(timer);
        }
        if (canteenOrder.status === 'Preparing') {
            const timer = setTimeout(() => {
                setCanteenOrder((prev) => (prev ? { ...prev, status: 'Ready for Pickup' } : null));
            }, 8000);
            return () => clearTimeout(timer);
        }
    }, [canteenOrder?.status]);

    const deductBalance = (amount: number): boolean => {
        if (balance >= amount) {
            setBalance((prev) => Number((prev - amount).toFixed(2)));
            return true;
        }
        return false;
    };

    const bookShuttle = (origin: Campus, destination: Campus, unit: string, seat: string): boolean => {
        if (!deductBalance(25.0)) return false;
        const ticketId = `#TSU-SHT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        setActivePass({
            ticketId,
            origin,
            destination,
            unit,
            departureTime: 'Express Boarding Now',
            seat,
            lane: 'Lane A (Priority)',
            fare: 25.0,
            qrPayload: ticketId,
        });
        return true;
    };

    const addFoodItem = (item: { id: string; name: string; price: number }) => {
        setFoodCart((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
            }
            return [...prev, { ...item, quantity: 1, type: 'canteen' }];
        });
    };

    const removeFoodItem = (id: string) => {
        setFoodCart((prev) =>
            prev
                .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
                .filter((i) => i.quantity > 0)
        );
    };

    const clearFoodCart = () => setFoodCart([]);

    const submitCanteenOrder = (stall: string, paymentMode: 'Student Account Ledger' | 'Cash on Pickup'): boolean => {
        if (foodCart.length === 0) return false;
        const subtotal = foodCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const fee = 5.0;
        const total = subtotal + fee;

        if (paymentMode === 'Student Account Ledger' && !deductBalance(total)) {
            return false;
        }

        const newOrder: CanteenOrder = {
            orderId: `#${Math.floor(1000 + Math.random() * 9000)}`,
            stall,
            campus: activeCampus,
            items: [...foodCart],
            subtotal,
            fee,
            total,
            status: 'Order Sent',
            paymentMode,
        };
        setCanteenOrder(newOrder);
        clearFoodCart();
        return true;
    };

    const submitPrintOrder = (job: Omit<PrintJob, 'pin' | 'totalCost'>): boolean => {
        const ratePerPage = job.colorMode === 'Full Color' ? 8.0 : 2.0;
        const calculatedCost = job.pages * ratePerPage;
        if (!deductBalance(calculatedCost)) return false;

        setActivePrintJob({
            ...job,
            pin: `PR-${Math.floor(100 + Math.random() * 900)}`,
            totalCost: calculatedCost,
        });
        return true;
    };

    const toggleFavorite = (id: string) => {
        setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
    };

    const addMerchToCart = (item: MerchItem, size: string) => {
        setMerchCart((prev) => {
            const existing = prev.find((i) => i.id === item.id && i.size === size);
            if (existing) {
                return prev.map((i) => (i.id === item.id && i.size === size ? { ...i, quantity: i.quantity + 1 } : i));
            }
            return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1, size, type: 'merch' }];
        });
    };

    const removeMerchItem = (id: string, size?: string) => {
        setMerchCart((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
    };

    const checkoutMerch = (paymentMode: 'Student Account Ledger' | 'Cash on Claim'): boolean => {
        const total = merchCart.reduce((sum, i) => sum + i.price * i.quantity, 0);
        if (paymentMode === 'Student Account Ledger' && !deductBalance(total)) {
            return false;
        }
        setMerchCart([]);
        return true;
    };

    return (
        <DemoContext.Provider
            value={{
                studentName: 'Alex Gonzaga',
                studentId: '#2022-84910',
                balance,
                activeCampus,
                setActiveCampus,
                deductBalance,
                activePass,
                bookShuttle,
                foodCart,
                addFoodItem,
                removeFoodItem,
                clearFoodCart,
                canteenOrder,
                submitCanteenOrder,
                activePrintJob,
                submitPrintOrder,
                selectedOrg,
                setSelectedOrg,
                merchCatalog,
                favorites,
                toggleFavorite,
                merchCart,
                addMerchToCart,
                removeMerchItem,
                checkoutMerch,
            }}
        >
            {children}
        </DemoContext.Provider>
    );
};

export const useDemo = () => {
    const context = useContext(DemoContext);
    if (!context) throw new Error('useDemo must be used within a DemoProvider');
    return context;
};