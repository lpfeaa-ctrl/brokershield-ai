import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BrokerShield AI — Intelligence Platform for International Trade",
  description:
    "Professional AI-powered platform for international brokers, mandates, traders and commercial intermediaries. Qualify deals, detect fraud, assess risk.",
  keywords: "trade finance, broker, due diligence, risk assessment, commodities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-[#03071a] text-slate-100 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
