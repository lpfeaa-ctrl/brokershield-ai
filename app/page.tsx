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
  BarChart2,
  Globe,
  Zap,
  Building2,
  Briefcase,
  DollarSign,
  Network,
  Calendar,
} from "lucide-react";

const features = [
  { icon: TrendingUp,    title: "Deal Risk Analysis",    desc: "Structured risk scoring across 16 deal parameters",                      color: "#3b82f6" },
  { icon: AlertTriangle, title: "Red Flag Detection",    desc: "Identify potential risk indicators and procedural gaps",                  color: "#f59e0b" },
  { icon: Users,         title: "Counterparty Review",   desc: "Preliminary qualification signals for each party in the transaction",    color: "#22c55e" },
  { icon: FileText,      title: "Due Diligence",         desc: "Structured verification checklists for buyer, seller and broker",        color: "#a78bfa" },
  { icon: Bot,           title: "AI Assistant",          desc: "Draft professional communications and deal review summaries",            color: "#06b6d4" },
  { icon: BarChart2,     title: "Deal Pipeline",         desc: "Track and manage OTC operations from qualification to close",            color: "#f97316" },
];

const targetUsers = [
  { icon: Briefcase,  label: "OTC Brokers" },
  { icon: Network,    label: "Intermediaries & Mandates" },
  { icon: Building2,  label: "Digital Asset Desks" },
  { icon: DollarSign, label: "Family Offices" },
  { icon: Users,      label: "Institutional Participants" },
  { icon: Globe,      label: "Transaction Coordinators" },
];

const problems = [
  "Fake mandates and unverifiable counterparties",
  "Non-executable transactions with missing procedure details",
  "Broker chains with unclear buyer or seller position",
  "Unrealistic conditions or below-market pricing claims",
  "Poor or inconsistent documentation",
  "Weak counterparties who refuse KYC or compliance steps",
  "High urgency pressure tactics from unknown parties",
  "Unclear commission structures across multiple layers",
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
          <div className="leading-none">
            <span className="font-bold text-[15px] text-white tracking-tight">
              BrokerShield<span className="text-blue-400 font-semibold text-[13px] ml-0.5">AI</span>
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="flex items-center gap-3"
        >
          <span
            className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
            style={{
              background: "rgba(245,158,11,0.08)",
              border: "1px solid rgba(245,158,11,0.25)",
              color: "#fbbf24",
            }}
          >
            Private Beta MVP
          </span>
          <span className="text-[12px] text-slate-600 hidden sm:flex items-center gap-1.5">
            <Globe size={12} />
            OTC · Trade Finance · Risk
          </span>
        </motion.div>
      </header>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-20">

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="mb-6"
        >
          <span
            className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(245,158,11,0.07)",
              border: "1px solid rgba(245,158,11,0.2)",
              color: "#fbbf24",
            }}
          >
            <Zap size={10} strokeWidth={2.5} />
            Private Beta MVP · Early Access
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.55 }}
          className="text-center font-black tracking-tight leading-[1.08] mb-5"
          style={{ fontSize: "clamp(32px, 5vw, 58px)" }}
        >
          <span className="text-white">Analyze OTC transactions</span>
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #60a5fa 0%, #818cf8 55%, #c084fc 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            before you waste time or money.
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.5 }}
          className="text-center text-slate-500 leading-relaxed mb-4 max-w-xl"
          style={{ fontSize: "15px" }}
        >
          BrokerShield AI helps brokers, intermediaries and institutional OTC participants identify
          risk indicators, qualify counterparties and review transaction structure before engaging.
        </motion.p>

        {/* Positioning line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.32, duration: 0.45 }}
          className="text-center text-[12px] text-slate-700 mb-10 font-medium tracking-wide"
        >
          AI-powered OTC Counterparty Risk &amp; Deal Qualification Platform
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.45 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-8"
        >
          <a
            href="https://calendly.com/lpfeaa/reunion-gratuita-prospectalia-b2b"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              whileHover={{ scale: 1.025, y: -2 }}
              whileTap={{ scale: 0.975 }}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white text-[14px]"
              style={{
                background: "linear-gradient(135deg, #2563eb, #4f46e5)",
                boxShadow: "0 0 28px rgba(37,99,235,0.45), 0 4px 16px rgba(0,0,0,0.35)",
              }}
            >
              <Calendar size={15} strokeWidth={2} />
              Request Demo
              <ChevronRight size={16} strokeWidth={2.5} />
            </motion.button>
          </a>
          <Link href="/analyze">
            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-[14px]"
              style={{
                background: "rgba(37,99,235,0.07)",
                border: "1px solid rgba(37,99,235,0.22)",
                color: "#93c5fd",
              }}
            >
              View Risk Analysis Demo
            </motion.button>
          </Link>
        </motion.div>

        {/* Early access disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.48 }}
          className="mb-14 text-center"
        >
          <span
            className="text-[11px] px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(148,163,184,0.04)",
              border: "1px solid rgba(148,163,184,0.09)",
              color: "#475569",
            }}
          >
            Early access prototype. Results are indicative and intended for structured review, not final decision-making.
          </span>
        </motion.div>

        {/* Who it&apos;s for */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.54, duration: 0.5 }}
          className="w-full max-w-3xl mb-12"
        >
          <p className="text-center text-[11px] font-semibold tracking-widest uppercase text-slate-600 mb-5">
            Built for OTC professionals
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {targetUsers.map((u) => (
              <div
                key={u.label}
                className="flex items-center gap-2.5 px-4 py-3 rounded-lg"
                style={{
                  background: "rgba(8,20,42,0.5)",
                  border: "1px solid rgba(148,163,184,0.07)",
                }}
              >
                <u.icon size={13} className="text-blue-500 shrink-0" strokeWidth={1.8} />
                <span className="text-[12px] text-slate-400 font-medium">{u.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Problem patterns */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 0.5 }}
          className="w-full max-w-3xl mb-12"
        >
          <p className="text-center text-[11px] font-semibold tracking-widest uppercase text-slate-600 mb-2">
            Risk patterns this platform helps review
          </p>
          <p className="text-center text-[11.5px] text-slate-700 mb-5">
            For preliminary operational assessment only — not a guarantee of fraud detection or legal verification.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {problems.map((p) => (
              <div
                key={p}
                className="flex items-start gap-2.5 px-4 py-3 rounded-lg"
                style={{
                  background: "rgba(8,20,42,0.5)",
                  border: "1px solid rgba(148,163,184,0.07)",
                }}
              >
                <AlertTriangle size={12} className="text-amber-600 shrink-0 mt-0.5" strokeWidth={1.8} />
                <span className="text-[12px] text-slate-400 leading-snug">{p}</span>
              </div>
            ))}
          </div>
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

      </main>

      {/* Footer */}
      <footer
        className="relative z-10 py-7 px-6 text-center"
        style={{ borderTop: "1px solid rgba(148,163,184,0.05)" }}
      >
        <div className="text-[13px] text-slate-400 font-semibold mb-0.5">BrokerShield AI</div>
        <div className="text-[11px] text-slate-600 mb-0.5">Private Beta MVP</div>
        <div className="text-[11px] text-slate-700 mb-1">Operated by Prospectalia B2B</div>
        <div className="text-[11px] text-slate-700 mb-4">
          Contact:{" "}
          <a
            href="mailto:Info@prospectaliab2b.com"
            className="text-slate-500 hover:text-slate-300 transition-colors"
          >
            Info@prospectaliab2b.com
          </a>
        </div>
        <div
          className="text-[10.5px] text-slate-800 max-w-2xl mx-auto leading-relaxed pt-4"
          style={{ borderTop: "1px solid rgba(148,163,184,0.05)" }}
        >
          This MVP is for preliminary commercial and operational assessment only. It does not
          constitute legal, financial, investment or compliance advice.
        </div>
      </footer>
    </div>
  );
}
