"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Shield,
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
} from "lucide-react";

const navItems = [
  { href: "/dashboard",      icon: LayoutDashboard, label: "Dashboard",      badge: null },
  { href: "/analyze",        icon: Search,          label: "Analyze Deal",   badge: "AI" },
  { href: "/due-diligence",  icon: ClipboardCheck,  label: "Due Diligence",  badge: null },
  { href: "/pipeline",       icon: Kanban,          label: "Pipeline",       badge: "9" },
  { href: "/counterparties", icon: Users,           label: "Counterparties", badge: null },
  { href: "/ai-assistant",   icon: Bot,             label: "AI Assistant",   badge: "NEW" },
  { href: "/reports",        icon: FileBarChart,    label: "Reports",        badge: null },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="flex flex-col w-[230px] shrink-0 min-h-screen relative z-20"
      style={{
        background: "rgba(2, 8, 20, 0.97)",
        borderRight: "1px solid rgba(148,163,184,0.06)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Logo */}
      <div className="px-5 pt-6 pb-5">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.06 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{
              background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
              boxShadow: "0 0 14px rgba(37,99,235,0.5), 0 2px 8px rgba(0,0,0,0.4)",
            }}
          >
            <Shield size={15} className="text-white" strokeWidth={2.5} />
          </motion.div>
          <div className="leading-none">
            <div className="text-[14px] font-bold text-white tracking-tight">
              BrokerShield
              <span className="text-blue-400 text-[12px] font-semibold ml-0.5">AI</span>
            </div>
            <div className="text-[9.5px] font-semibold tracking-[0.15em] uppercase text-slate-600 mt-0.5">
              Trade Intelligence
            </div>
          </div>
        </Link>
      </div>

      {/* Live status */}
      <div className="px-5 mb-5">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{
            background: "rgba(34,197,94,0.06)",
            border: "1px solid rgba(34,197,94,0.15)",
          }}
        >
          <span className="status-dot-live shrink-0" />
          <span className="text-[11px] font-semibold text-emerald-400">Intelligence Active</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 overflow-y-auto">
        <p className="section-label px-3 mb-2.5">Operations</p>
        <div className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 1 }}
                  whileTap={{ scale: 0.98 }}
                  className={`sidebar-nav-item ${isActive ? "active" : ""}`}
                >
                  <Icon
                    size={15}
                    strokeWidth={isActive ? 2.2 : 1.8}
                    className="shrink-0"
                    style={{ color: isActive ? "#60a5fa" : "#3d5470" }}
                  />
                  <span className="flex-1 text-[13px]">{item.label}</span>
                  {item.badge && (
                    <span
                      className="text-[9.5px] font-bold px-1.5 py-[2px] rounded-[4px] shrink-0"
                      style={
                        item.badge === "AI" || item.badge === "NEW"
                          ? {
                              background: "rgba(59,130,246,0.12)",
                              color: "#60a5fa",
                              border: "1px solid rgba(59,130,246,0.2)",
                            }
                          : {
                              background: "rgba(148,163,184,0.08)",
                              color: "#64748b",
                              border: "1px solid rgba(148,163,184,0.1)",
                            }
                      }
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <ChevronRight
                      size={11}
                      className="shrink-0 text-blue-500 opacity-50"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div
        className="px-3 pt-3 pb-4 mt-4"
        style={{ borderTop: "1px solid rgba(148,163,184,0.05)" }}
      >
        <div className="space-y-0.5 mb-3">
          {[
            { icon: Bell,     label: "Notifications", extra: "3" },
            { icon: Settings, label: "Settings",      extra: null },
          ].map(({ icon: Icon, label, extra }) => (
            <div
              key={label}
              className="sidebar-nav-item cursor-pointer"
            >
              <Icon size={14} strokeWidth={1.8} style={{ color: "#2d3f58" }} />
              <span className="flex-1 text-[13px]">{label}</span>
              {extra && (
                <span
                  className="text-[9.5px] font-bold px-1.5 py-[2px] rounded-full shrink-0"
                  style={{
                    background: "rgba(239,68,68,0.1)",
                    color: "#f87171",
                    border: "1px solid rgba(239,68,68,0.18)",
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
            background: "rgba(8,20,42,0.7)",
            border: "1px solid rgba(148,163,184,0.07)",
          }}
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shrink-0"
            style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)" }}
          >
            BS
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-semibold text-slate-300 truncate leading-none">
              Demo User
            </div>
            <div className="text-[10px] text-slate-600 mt-0.5">Int. Broker</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
