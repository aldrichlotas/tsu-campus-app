import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import { DemoProvider } from "@/context/DemoContext";
import { BookOpen } from "lucide-react";
import Link from "next/link";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "TSU Campus Hub",
  description: "Collegiate Academic Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${manrope.variable} antialiased bg-[#F4F5F7] font-body text-[#1B2336]`}
      >
        <DemoProvider>
          <div className="max-w-md mx-auto min-h-screen bg-white shadow-xl border-x border-[#E2E5EB] relative flex flex-col">
            {/* Top App Bar */}
            <header className="h-16 shrink-0 flex items-center justify-between px-4 border-b border-[#E2E5EB] bg-white sticky top-0 z-50">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#800000] flex items-center justify-center">
                  <BookOpen size={16} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-[#800000] text-sm leading-tight">TARLAC STATE</span>
                  <span className="font-heading font-semibold text-[#1B2336] text-[10px] leading-tight">UNIVERSITY</span>
                </div>
              </Link>
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 bg-[#F4F5F7] rounded-full">
                  <span className="font-bold text-[11px] tracking-[0.08em] uppercase text-[#1B2336]">#2022-84910</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#E2E5EB] overflow-hidden">
                  {/* Placeholder Profile */}
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Profile" className="w-full h-full object-cover" />
                </div>
              </div>
            </header>
            
            <main className="flex-1 flex flex-col relative overflow-y-auto">
              {children}
            </main>
          </div>
        </DemoProvider>
      </body>
    </html>
  );
}
