"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import {
  Shield,
  TrendingUp,
  AlertTriangle,
  Users,
  FileText,
  Bot,
  ChevronRight,
  Lock,
  BarChart2,
  CheckCircle2,
  Globe,
  Zap,
} from "lucide-react";

const features = [
  { icon: TrendingUp,    title: "Deal Analysis",      desc: "AI-powered risk scoring in seconds",                color: "#3b82f6" },
  { icon: AlertTriangle, title: "Fraud Detection",     desc: "Identify red flags and scam patterns",             color: "#f59e0b" },
  { icon: Users,         title: "Counterparty Risk",   desc: "Trust profiles for every party",                   color: "#22c55e" },
  { icon: FileText,      title: "Due Diligence",       desc: "Structured verification checklists",               color: "#a78bfa" },
  { icon: Bot,           title: "AI Assistant",        desc: "Generate professional communications",             color: "#06b6d4" },
  { icon: BarChart2,     title: "Pipeline CRM",        desc: "Kanban deal tracking from lead to close",          color: "#f97316" },
];

const stats = [
  { value: "2,400+", label: "Deals Analyzed" },
  { value: "6h",     label: "Saved Per Deal" },
  { value: "94%",    label: "Fraud Detected" },
  { value: "340+",   label: "Active Brokers" },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div
          className="absolute rounded-full blur-[120px] opacity-[0.07]"
          style={{ width: 800, height: 500, background: "#2563eb", top: -100, right: -200 }}
        />
        <div
          className="absolute rounded-full blur-[100px] opacity-[0.05]"
          style={{ width: 500, height: 500, background: "#4f46e5", bottom: "5%", left: -150 }}
        />
      </div>

      {/* Header */}
      <header
        className="relative z-10 flex items-center justify-between px-8 py-4"
        style={{ borderBottom: "1px solid rgba(148,163,184,0.05)" }}
      >
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="flex items-center gap-3"
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #2563eb, #4f46e5)",
              boxShadow: "0 0 16px rgba(37,99,235,0.45)",
            }}
          >
            <Shield size={15} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-[15px] text-white tracking-tight">
            BrokerShield<span className="text-blue-400 font-semibold text-[13px] ml-0.5">AI</span>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="flex items-center gap-2 text-[12px] text-slate-600"
        >
          <Globe size={12} />
          International Trade Intelligence
        </motion.div>
      </header>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-20">
        {/* Pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="mb-6"
        >
          <span
            className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(37,99,235,0.08)",
              border: "1px solid rgba(37,99,235,0.2)",
              color: "#60a5fa",
            }}
          >
            <Zap size={10} strokeWidth={2.5} />
            Demo Platform · v1.0
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.55 }}
          className="text-center font-black tracking-tight leading-[1.08] mb-5"
          style={{ fontSize: "clamp(40px, 6vw, 68px)" }}
        >
          <span className="text-white">Protect Every</span>
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #60a5fa 0%, #818cf8 55%, #c084fc 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Trade Operation
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.5 }}
          className="text-center text-slate-500 leading-relaxed mb-10 max-w-xl"
          style={{ fontSize: "15px" }}
        >
          The intelligence platform for international brokers, mandates and
          commercial intermediaries. Qualify deals, detect fraud, assess
          counterparty risk — in seconds.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, duration: 0.45 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-14"
        >
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.025, y: -2 }}
              whileTap={{ scale: 0.975 }}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white text-[14px]"
              style={{
                background: "linear-gradient(135deg, #2563eb, #4f46e5)",
                boxShadow: "0 0 28px rgba(37,99,235,0.45), 0 4px 16px rgba(0,0,0,0.35)",
              }}
            >
              Enter Demo Platform
              <ChevronRight size={16} strokeWidth={2.5} />
            </motion.button>
          </Link>
          <span className="flex items-center gap-1.5 text-[12px] text-slate-600">
            <Lock size={11} />
            No login required
          </span>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-10 mb-14"
        >
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-[22px] font-black text-white leading-none">{s.value}</div>
              <div className="text-[11px] text-slate-600 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Feature grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-3xl"
          style={{ transition: "none" }}
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              className="glass-card p-5 cursor-default"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{
                  background: `${f.color}14`,
                  color: f.color,
                  border: `1px solid ${f.color}25`,
                }}
              >
                <f.icon size={16} strokeWidth={1.8} />
              </div>
              <div className="text-[13px] font-semibold text-slate-200 mb-1">{f.title}</div>
              <div className="text-[12px] text-slate-600 leading-relaxed">{f.desc}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex flex-wrap justify-center gap-6 mt-12"
        >
          {["Compliance-Ready", "Bank-Grade Security", "ISO 27001 Ready", "GDPR Compliant"].map((b) => (
            <span key={b} className="flex items-center gap-1.5 text-[11px] text-slate-700">
              <CheckCircle2 size={11} className="text-emerald-700" />
              {b}
            </span>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <footer
        className="relative z-10 py-5 text-center text-[11px] text-slate-700"
        style={{ borderTop: "1px solid rgba(148,163,184,0.05)" }}
      >
        © 2024 BrokerShield AI &nbsp;·&nbsp; International Trade Intelligence &nbsp;·&nbsp;
        <span className="text-slate-800">Demo</span>
      </footer>
    </div>
  );
}
