import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Manrope, Geist } from "next/font/google";
import Link from 'next/link';
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maa Sharda Distributors",
  description: "Yamunanagar's #1 Solar Distributor. Cut Your Electricity Bill by Up to 80% with Solar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("light", "font-sans", geist.variable)}>
      <body
        className={`${jakarta.variable} ${manrope.variable} antialiased bg-background text-on-background selection:bg-secondary-container selection:text-on-secondary-container`}
      >
        <header className="w-full top-0 sticky z-50 bg-[#FAFAF7] dark:bg-[#012d1d] transition-all duration-300 shadow-sm">
          <nav className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#1B4332] dark:text-[#FAFAF7]">
                Maa Sharda
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8 font-['Plus_Jakarta_Sans'] text-base tracking-tight">
              <Link
                href="/"
                className="text-[#D97706] border-b-2 border-[#D97706] pb-1 hover:text-[#D97706] transition-colors duration-300"
              >
                Home
              </Link>
              <Link
                href="/services"
                className="text-[#1B4332] dark:text-[#FAFAF7] opacity-80 hover:text-[#D97706] transition-colors duration-300"
              >
                Solar Solutions
              </Link>
              <Link
                href="/calculator"
                className="text-[#1B4332] dark:text-[#FAFAF7] opacity-80 hover:text-[#D97706] transition-colors duration-300"
              >
                Price Guide
              </Link>
              <Link
                href="/about"
                className="text-[#1B4332] dark:text-[#FAFAF7] opacity-80 hover:text-[#D97706] transition-colors duration-300"
              >
                About Us
              </Link>
              <Link
                href="/blog"
                className="text-[#1B4332] dark:text-[#FAFAF7] opacity-80 hover:text-[#D97706] transition-colors duration-300"
              >
                Contact
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-secondary text-on-secondary px-6 py-2.5 rounded-lg font-semibold hover:brightness-110 active:scale-95 transition-all">
                Free Plan
              </button>
            </div>
          </nav>
        </header>

        {children}

        <footer className="bg-[#1B4332] dark:bg-[#011a11] w-full pt-12 pb-8 px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <span className="text-lg font-bold text-white block mb-2">
                Maa Sharda Distributors
              </span>
              <p className="font-['Manrope'] text-sm text-[#FAFAF7] opacity-70">
                © 2024 Maa Sharda Distributors Yamunanagar. All rights
                reserved.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-8 font-['Manrope'] text-sm">
              <Link href="#" className="text-[#FAFAF7]/70 hover:text-white transition-opacity">
                Privacy Policy
              </Link>
              <Link href="#" className="text-[#FAFAF7]/70 hover:text-white transition-opacity">
                Terms of Service
              </Link>
              <Link href="#" className="text-[#FAFAF7]/70 hover:text-white transition-opacity">
                Local Support
              </Link>
              <Link href="/subsidy" className="text-[#D97706] underline hover:text-white transition-opacity">
                Solar Subsidy Info
              </Link>
            </div>
          </div>
        </footer>

        {/* WhatsApp Button */}
        <a
          className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-50"
          href="https://wa.me/yournumber"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            fill="currentColor"
            height="32"
            viewBox="0 0 16 16"
            width="32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93a7.898 7.898 0 0 0-2.327-5.607zM7.994 14.52a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"></path>
          </svg>
        </a>
      </body>
    </html>
  );
}
