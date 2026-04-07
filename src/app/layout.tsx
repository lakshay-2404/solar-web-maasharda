import type { Metadata, Viewport } from "next";
import { Noto_Sans_Devanagari, Poppins } from "next/font/google";

import AppRuntimeProvider from "@/components/app/AppRuntimeProvider";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import {
  APP_BACKGROUND_COLOR,
  APP_BUSINESS_NAME,
  APP_NAME,
  APP_THEME_COLOR,
} from "@/lib/constants";

import SchemaMarkup from "./components/SchemaMarkup";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-devanagari",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://maasharda.solar";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: APP_THEME_COLOR,
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: APP_NAME,
  manifest: "/manifest.webmanifest",
  title: {
    default: "Solar Installation, Subsidy and Net Metering | Maa Sharda Distributors",
    template: "%s | Maa Sharda Distributors",
  },
  description:
    "Documents collection, subsidy filing, UHBVN approvals, installation, meter change aur financing file support across Yamunanagar, Ambala, Karnal aur Kurukshetra.",
  keywords: [
    "solar panel haryana",
    "solar subsidy haryana",
    "pm surya ghar subsidy support",
    "solar installation ambala",
    "solar installation karnal",
    "solar installation kurukshetra",
    "solar installation haryana",
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: APP_NAME,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/api/app-icon?size=192", type: "image/png", sizes: "192x192" },
      { url: "/api/app-icon?size=512", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      {
        url: "/api/app-icon?size=180",
        type: "image/png",
        sizes: "180x180",
      },
    ],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: APP_BUSINESS_NAME,
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="hi"
      suppressHydrationWarning
      className={`${poppins.variable} ${notoSansDevanagari.variable}`}
    >
      <head>
        <SchemaMarkup />
      </head>
      <body
        style={{ backgroundColor: APP_BACKGROUND_COLOR }}
        className="min-h-screen bg-cream text-neutral-950 antialiased"
      >
        <AppRuntimeProvider>
          <a
            href="#main-content"
            className="sr-only fixed left-4 top-4 z-[100] rounded-full bg-green-900 px-4 py-2 text-sm font-medium text-white focus:not-sr-only"
          >
            Skip to content
          </a>
          <Header />
          <main
            id="main-content"
            className="pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-0"
          >
            {children}
          </main>
          <Footer />
          <MobileBottomNav />
          <WhatsAppButton />
        </AppRuntimeProvider>
      </body>
    </html>
  );
}
