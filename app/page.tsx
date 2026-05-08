"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import {
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

/* ── Brand shield mark ─────────────────────────────────── */
function ShieldMark({ size = 28 }: { size?: number }) {
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
        <linearGradient id="landShield" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1D4E6B" />
          <stop offset="100%" stopColor="#1A6FA5" />
        </linearGradient>
      </defs>
      <path
        d="M16 2L28 7.5V18C28 23.8 22.8 28 16 30.5C9.2 28 4 23.8 4 18V7.5L16 2Z"
        fill="url(#landShield)"
      />
      <rect x="10" y="14.5" width="12" height="1.6" rx="0.8" fill="white" fillOpacity="0.9" />
      <rect x="12" y="19" width="8" height="1.1" rx="0.55" fill="white" fillOpacity="0.45" />
    </svg>
  );
}

/* ── Data ──────────────────────────────────────────────── */
const features = [
  { icon: TrendingUp,    title: "Deal Risk Analysis",    desc: "Structured risk scoring across 16 deal parameters",                      color: "#1A6FA5" },
  { icon: AlertTriangle, title: "Red Flag Detection",    desc: "Identify potential risk indicators and procedural gaps",                  color: "#f59e0b" },
  { icon: Users,         title: "Counterparty Review",   desc: "Preliminary qualification signals for each party in the transaction",    color: "#22c55e" },
  { icon: FileText,      title: "Due Diligence",         desc: "Structured verification checklists for buyer, seller and broker",        color: "#7ba8c4" },
  { icon: Bot,           title: "AI Assistant",          desc: "Draft professional communications and deal review summaries",            color: "#5ba8d4" },
  { icon: BarChart2,     title: "Deal Pipeline",         desc: "Track and manage OTC operations from qualification to close",            color: "#1D4E6B" },
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

      {/* Subtle background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div
          className="absolute rounded-full blur-[140px]"
          style={{
            width: 700, height: 450,
            background: "#1A6FA5",
            opacity: 0.045,
            top: -80, right: -160,
          }}
        />
        <div
          className="absolute rounded-full blur-[120px]"
          style={{
            width: 500, height: 400,
            background: "#1D4E6B",
            opacity: 0.04,
            bottom: "8%", left: -120,
          }}
        />
      </div>

      {/* ── Header ─────────────────────────────────────────── */}
      <header
        className="relative z-10 flex items-center justify-between px-6 sm:px-8 py-4"
        style={{ borderBottom: "1px solid rgba(92, 107, 122, 0.06)" }}
      >
        <motion.div
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3"
        >
          <ShieldMark size={28} />
          <div className="leading-none">
            <span className="font-bold text-[15px] text-white tracking-tight">
              BrokerShield
              <span style={{ color: "#1A6FA5", fontSize: "12px", fontWeight: 600 }}> AI</span>
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3"
        >
          <span
            className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
            style={{
              background: "rgba(245,158,11,0.07)",
              border: "1px solid rgba(245,158,11,0.2)",
              color: "#d4a017",
            }}
          >
            Private Beta MVP
          </span>
          <span className="text-[11.5px] hidden sm:flex items-center gap-1.5" style={{ color: "#3a5265" }}>
            <Globe size={11} />
            OTC · Trade Finance · Risk
          </span>
        </motion.div>
      </header>

      {/* ── Hero ───────────────────────────────────────────── */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 sm:px-6 pt-14 pb-20">

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.4 }}
          className="mb-6"
        >
          <span
            className="inline-flex items-center gap-2 text-[10.5px] font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(245,158,11,0.06)",
              border: "1px solid rgba(245,158,11,0.18)",
              color: "#d4a017",
            }}
          >
            <Zap size={10} strokeWidth={2.5} />
            Private Beta MVP · Early Access
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-center font-black tracking-tight leading-[1.08] mb-5"
          style={{ fontSize: "clamp(28px, 4.5vw, 54px)" }}
        >
          <span className="text-white">Analyze OTC transactions</span>
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #5ba8d4 0%, #1A6FA5 60%, #1D4E6B 100%)",
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
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.45 }}
          className="text-center leading-relaxed mb-4 max-w-xl"
          style={{ fontSize: "15px", color: "#4a5e6e" }}
        >
          BrokerShield AI helps brokers, intermediaries and institutional OTC participants identify
          risk indicators, qualify counterparties and review transaction structure before engaging.
        </motion.p>

        {/* Positioning line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.28, duration: 0.4 }}
          className="text-center text-[11.5px] font-medium tracking-wide mb-10"
          style={{ color: "#253545" }}
        >
          AI-powered OTC Counterparty Risk &amp; Deal Qualification Platform
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, duration: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-8 w-full sm:w-auto px-4 sm:px-0"
        >
          <a
            href="https://calendly.com/lpfeaa/reunion-gratuita-prospectalia-b2b"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <motion.button
              whileHover={{ scale: 1.025, y: -1 }}
              whileTap={{ scale: 0.975 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white text-[14px]"
              style={{
                background: "linear-gradient(135deg, #1D4E6B, #1A6FA5)",
                boxShadow: "0 0 24px rgba(26,111,165,0.3), 0 4px 16px rgba(0,0,0,0.35)",
              }}
            >
              <Calendar size={14} strokeWidth={2} />
              Request Demo
              <ChevronRight size={15} strokeWidth={2.5} />
            </motion.button>
          </a>
          <Link href="/analyze" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-[14px]"
              style={{
                background: "rgba(26,111,165,0.06)",
                border: "1px solid rgba(26,111,165,0.2)",
                color: "#5ba8d4",
              }}
            >
              View Risk Analysis Demo
            </motion.button>
          </Link>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.44 }}
          className="mb-14 text-center px-4"
        >
          <span
            className="text-[11px] px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(92,107,122,0.04)",
              border: "1px solid rgba(92,107,122,0.08)",
              color: "#2e4a60",
            }}
          >
            Early access prototype. Results are indicative and intended for structured review, not final decision-making.
          </span>
        </motion.div>

        {/* Target users */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.45 }}
          className="w-full max-w-3xl mb-12 px-2"
        >
          <p
            className="text-center text-[10.5px] font-semibold tracking-widest uppercase mb-5"
            style={{ color: "#2e4a60" }}
          >
            Built for OTC professionals
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {targetUsers.map((u) => (
              <div
                key={u.label}
                className="flex items-center gap-2.5 px-4 py-3 rounded-lg"
                style={{
                  background: "rgba(11, 28, 44, 0.55)",
                  border: "1px solid rgba(92, 107, 122, 0.07)",
                }}
              >
                <u.icon size={12} className="shrink-0" style={{ color: "#1A6FA5" }} strokeWidth={1.8} />
                <span className="text-[12px] font-medium" style={{ color: "#3a5a6e" }}>{u.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Problem patterns */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.58, duration: 0.45 }}
          className="w-full max-w-3xl mb-12 px-2"
        >
          <p
            className="text-center text-[10.5px] font-semibold tracking-widest uppercase mb-1.5"
            style={{ color: "#2e4a60" }}
          >
            Risk patterns this platform helps review
          </p>
          <p className="text-center text-[11px] mb-5" style={{ color: "#253545" }}>
            For preliminary operational assessment only — not a guarantee of fraud detection or legal verification.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {problems.map((p) => (
              <div
                key={p}
                className="flex items-start gap-2.5 px-4 py-3 rounded-lg"
                style={{
                  background: "rgba(11, 28, 44, 0.55)",
                  border: "1px solid rgba(92, 107, 122, 0.07)",
                }}
              >
                <AlertTriangle size={11} className="shrink-0 mt-0.5" style={{ color: "#8a6a20" }} strokeWidth={1.8} />
                <span className="text-[12px] leading-snug" style={{ color: "#3a5a6e" }}>{p}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-3xl px-2"
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
                  background: `${f.color}12`,
                  color: f.color,
                  border: `1px solid ${f.color}22`,
                }}
              >
                <f.icon size={15} strokeWidth={1.8} />
              </div>
              <div className="text-[13px] font-semibold mb-1" style={{ color: "#c8d8e4" }}>{f.title}</div>
              <div className="text-[11.5px] leading-relaxed" style={{ color: "#2e4a5e" }}>{f.desc}</div>
            </motion.div>
          ))}
        </motion.div>

      </main>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer
        className="relative z-10 py-7 px-6 text-center"
        style={{ borderTop: "1px solid rgba(92, 107, 122, 0.05)" }}
      >
        <div className="flex items-center justify-center gap-2.5 mb-2">
          <ShieldMark size={18} />
          <div className="text-[13px] font-bold text-white tracking-tight">
            BrokerShield
            <span style={{ color: "#1A6FA5", fontSize: "11px", fontWeight: 600 }}> AI</span>
          </div>
        </div>
        <div className="text-[10.5px] mb-0.5" style={{ color: "#253545" }}>Private Beta MVP</div>
        <div className="text-[10.5px] mb-1" style={{ color: "#1e3040" }}>Operated by Prospectalia B2B</div>
        <div className="text-[10.5px] mb-4" style={{ color: "#1e3040" }}>
          Contact:{" "}
          <a
            href="mailto:Info@prospectaliab2b.com"
            className="transition-colors hover:text-slate-400"
            style={{ color: "#2e4a60" }}
          >
            Info@prospectaliab2b.com
          </a>
        </div>
        <div
          className="text-[10.5px] max-w-2xl mx-auto leading-relaxed pt-4"
          style={{
            borderTop: "1px solid rgba(92, 107, 122, 0.05)",
            color: "#1a2d3e",
          }}
        >
          This MVP is for preliminary commercial and operational assessment only. It does not
          constitute legal, financial, investment or compliance advice.
        </div>
      </footer>
    </div>
  );
}
