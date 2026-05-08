"use client";

import { useState, useCallback } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

/* Inline shield SVG for the mobile topbar */
function ShieldIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="msh" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1D4E6B" />
          <stop offset="100%" stopColor="#1A6FA5" />
        </linearGradient>
      </defs>
      <path d="M16 2L28 7.5V18C28 23.8 22.8 28 16 30.5C9.2 28 4 23.8 4 18V7.5L16 2Z" fill="url(#msh)" />
      <rect x="10" y="14.5" width="12" height="1.6" rx="0.8" fill="white" fillOpacity="0.9" />
      <rect x="12" y="19" width="8" height="1.1" rx="0.55" fill="white" fillOpacity="0.45" />
    </svg>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const close = useCallback(() => setSidebarOpen(false), []);

  return (
    <div className="flex min-h-screen relative">
      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay lg:hidden"
          onClick={close}
          aria-hidden
        />
      )}

      {/* Sidebar — always visible on lg+, drawer on mobile */}
      <div
        className={`
          fixed lg:static top-0 left-0 h-full z-40
          transition-transform duration-200 ease-in-out
          lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        style={{ willChange: "transform" }}
      >
        <Sidebar onClose={close} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        {/* Mobile top bar */}
        <div className="mobile-topbar lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg transition-colors"
            style={{ color: "#5C6B7A" }}
            aria-label="Open menu"
          >
            <Menu size={20} strokeWidth={1.8} />
          </button>

          <div className="flex items-center gap-2.5">
            <ShieldIcon size={22} />
            <span
              className="font-bold text-[14px] text-white tracking-tight"
            >
              BrokerShield
              <span style={{ color: "#1A6FA5", fontSize: "11px", fontWeight: 600 }}> AI</span>
            </span>
          </div>

          <div style={{ width: 36 }} />
        </div>

        {/* Page content */}
        <main
          className="flex-1 overflow-auto"
          style={{ background: "var(--bg)" }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
