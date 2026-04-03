import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

import SchemaMarkup from "./components/SchemaMarkup";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-poppins",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://maasharda.solar";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Maa Sharda Distributors",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <SchemaMarkup />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
