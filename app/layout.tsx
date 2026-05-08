import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://brokershield.ai"),
  title: "BrokerShield AI — OTC Counterparty Risk & Deal Qualification",
  description:
    "BrokerShield AI helps OTC brokers, institutional intermediaries and mandate holders identify risk indicators, qualify counterparties and review transaction structure before engaging. Private Beta MVP.",
  keywords: "OTC broker, counterparty risk, deal qualification, trade finance, mandate, risk assessment, due diligence, digital asset desk, family office",
  authors: [{ name: "Prospectalia B2B" }],
  openGraph: {
    title: "BrokerShield AI — OTC Counterparty Risk Platform",
    description:
      "AI-powered OTC Counterparty Risk & Deal Qualification Platform. Private Beta MVP for brokers, mandates and institutional participants.",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "BrokerShield AI — OTC Counterparty Risk Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BrokerShield AI",
    description: "AI-powered OTC Counterparty Risk & Deal Qualification Platform",
    images: ["/og-image.svg"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen`}
        style={{ background: "var(--bg)", color: "var(--text-primary)" }}
      >
        {children}
      </body>
    </html>
  );
}
