import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BrokerShield AI — AI-powered OTC Counterparty Risk & Deal Qualification Platform",
  description:
    "BrokerShield AI helps brokers, intermediaries and institutional OTC participants identify risk indicators, qualify counterparties and review transaction structure before engaging. Private Beta MVP.",
  keywords: "OTC broker, counterparty risk, deal qualification, trade finance, intermediary, mandate, risk assessment, due diligence",
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
