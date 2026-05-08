"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Search,
  ClipboardCheck,
  Kanban,
  Users,
  Bot,
  FileBarChart,
  Bell,
  Settings,
  ChevronRight,
  X,
} from "lucide-react";

/* ── Shield logo mark ─────────────────────────────────── */
function ShieldMark({ size = 30 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="sidebarShield" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1D4E6B" />
          <stop offset="100%" stopColor="#1A6FA5" />
        </linearGradient>
      </defs>
      <path
        d="M16 2L28 7.5V18C28 23.8 22.8 28 16 30.5C9.2 28 4 23.8 4 18V7.5L16 2Z"
        fill="url(#sidebarShield)"
      />
      <rect x="10" y="14.5" width="12" height="1.6" rx="0.8" fill="white" fillOpacity="0.9" />
      <rect x="12" y="19" width="8" height="1.1" rx="0.55" fill="white" fillOpacity="0.45" />
    </svg>
  );
}

/* ── Nav items ────────────────────────────────────────── */
const navItems = [
  { href: "/dashboard",      icon: LayoutDashboard, label: "Dashboard",      badge: null },
  { href: "/analyze",        icon: Search,          label: "Analyze Deal",   badge: "AI" },
  { href: "/due-diligence",  icon: ClipboardCheck,  label: "Due Diligence",  badge: null },
  { href: "/pipeline",       icon: Kanban,          label: "Pipeline",       badge: "9" },
  { href: "/counterparties", icon: Users,           label: "Counterparties", badge: null },
  { href: "/ai-assistant",   icon: Bot,             label: "AI Assistant",   badge: "NEW" },
  { href: "/reports",        icon: FileBarChart,    label: "Reports",        badge: null },
];

/* ── Component ────────────────────────────────────────── */
interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className="flex flex-col w-[230px] shrink-0 h-full min-h-screen relative z-40"
      style={{
        background: "rgba(10, 24, 38, 0.99)",
        borderRight: "1px solid rgba(92, 107, 122, 0.08)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Logo header */}
      <div className="px-5 pt-6 pb-4 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-3 group" onClick={onClose}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="shrink-0"
          >
            <ShieldMark size={30} />
          </motion.div>
          <div className="leading-none min-w-0">
            <div className="text-[14px] font-bold text-white tracking-tight leading-none">
              BrokerShield
              <span style={{ color: "#1A6FA5", fontSize: "11.5px", fontWeight: 600 }}> AI</span>
            </div>
            <div
              className="text-[9px] font-semibold tracking-[0.14em] uppercase mt-1"
              style={{ color: "#3a5265" }}
            >
              OTC Risk &amp; Deal Review
            </div>
          </div>
        </Link>

        {/* Close button — only on mobile */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg transition-colors"
            style={{ color: "#3a5265" }}
            aria-label="Close sidebar"
          >
            <X size={16} strokeWidth={1.8} />
          </button>
        )}
      </div>

      {/* Beta status pill */}
      <div className="px-5 mb-4">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{
            background: "rgba(26, 111, 165, 0.06)",
            border: "1px solid rgba(26, 111, 165, 0.14)",
          }}
        >
          <span className="status-dot-live shrink-0" />
          <span className="text-[10.5px] font-semibold" style={{ color: "#5ba8d4" }}>
            Private Beta Active
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 overflow-y-auto">
        <p className="section-label px-3 mb-2.5">Operations</p>
        <div className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link key={item.href} href={item.href} onClick={onClose}>
                <motion.div
                  whileHover={{ x: 1 }}
                  whileTap={{ scale: 0.98 }}
                  className={`sidebar-nav-item ${isActive ? "active" : ""}`}
                >
                  <Icon
                    size={15}
                    strokeWidth={isActive ? 2.2 : 1.8}
                    className="shrink-0"
                    style={{ color: isActive ? "#5ba8d4" : "#2e4a60" }}
                  />
                  <span className="flex-1 text-[13px]">{item.label}</span>
                  {item.badge && (
                    <span
                      className="text-[9.5px] font-bold px-1.5 py-[2px] rounded-[4px] shrink-0"
                      style={
                        item.badge === "AI" || item.badge === "NEW"
                          ? {
                              background: "rgba(26, 111, 165, 0.1)",
                              color: "#5ba8d4",
                              border: "1px solid rgba(26, 111, 165, 0.18)",
                            }
                          : {
                              background: "rgba(92, 107, 122, 0.08)",
                              color: "#3a5265",
                              border: "1px solid rgba(92, 107, 122, 0.1)",
                            }
                      }
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <ChevronRight
                      size={11}
                      className="shrink-0 opacity-40"
                      style={{ color: "#1A6FA5" }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer section */}
      <div
        className="px-3 pt-3 pb-4 mt-4"
        style={{ borderTop: "1px solid rgba(92, 107, 122, 0.06)" }}
      >
        <div className="space-y-0.5 mb-3">
          {[
            { icon: Bell,     label: "Notifications", extra: "3" },
            { icon: Settings, label: "Settings",      extra: null },
          ].map(({ icon: Icon, label, extra }) => (
            <div key={label} className="sidebar-nav-item cursor-pointer">
              <Icon size={14} strokeWidth={1.8} style={{ color: "#253545" }} />
              <span className="flex-1 text-[13px]">{label}</span>
              {extra && (
                <span
                  className="text-[9.5px] font-bold px-1.5 py-[2px] rounded-full shrink-0"
                  style={{
                    background: "rgba(239, 68, 68, 0.08)",
                    color: "#f87171",
                    border: "1px solid rgba(239, 68, 68, 0.15)",
                  }}
                >
                  {extra}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* User card */}
        <div
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
          style={{
            background: "rgba(11, 28, 44, 0.7)",
            border: "1px solid rgba(92, 107, 122, 0.08)",
          }}
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shrink-0"
            style={{ background: "linear-gradient(135deg, #1D4E6B, #1A6FA5)" }}
          >
            BS
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-semibold text-slate-300 truncate leading-none">
              Demo User
            </div>
            <div className="text-[10px] mt-0.5" style={{ color: "#2e4a60" }}>
              Int. Broker
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
