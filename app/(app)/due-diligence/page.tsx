"use client";

import { useState } from "react";
import { motion, type Transition } from "framer-motion";
import {
  ClipboardCheck, CheckCircle2, Circle, AlertTriangle,
  Users, Store, UserCheck, RotateCcw, Download, TrendingUp,
} from "lucide-react";
import { defaultChecklist } from "@/lib/mockData";
import { ChecklistItem } from "@/lib/types";

const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.38, delay: d, ease: "easeOut" } as Transition,
});

export default function DueDiligencePage() {
  const [items, setItems] = useState<ChecklistItem[]>(defaultChecklist);
  const [dealName, setDealName] = useState("New Deal");

  const toggle = (id: string) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)));
  const reset = () => setItems(defaultChecklist.map((i) => ({ ...i, checked: false })));

  const buyer  = items.filter((i) => i.category === "buyer");
  const seller = items.filter((i) => i.category === "seller");
  const broker = items.filter((i) => i.category === "broker");

  const total   = items.length;
  const checked = items.filter((i) => i.checked).length;
  const critT   = items.filter((i) => i.critical).length;
  const critC   = items.filter((i) => i.critical && i.checked).length;
  const pct     = Math.round((checked / total) * 100);
  const critPct = Math.round((critC / critT) * 100);

  const status = critPct === 100
    ? { label: "Fully Verified", color: "#22c55e", bg: "rgba(34,197,94,0.08)" }
    : critPct >= 80
    ? { label: "Nearly Complete", color: "#3b82f6", bg: "rgba(59,130,246,0.08)" }
    : critPct >= 40
    ? { label: "In Progress",     color: "#f59e0b", bg: "rgba(245,158,11,0.08)" }
    : { label: "Incomplete",      color: "#ef4444", bg: "rgba(239,68,68,0.08)" };

  return (
    <div className="p-8 space-y-6 min-h-screen" style={{ background: "var(--bg)" }}>

      {/* Header */}
      <motion.div {...fadeUp(0)} className="flex items-start justify-between">
        <div>
          <h1 className="page-title flex items-center gap-2">
            <ClipboardCheck size={20} className="text-blue-500" strokeWidth={2} />
            Due Diligence
          </h1>
          <p className="page-subtitle">Structured verification for buyers, sellers and brokers</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={reset} className="btn-ghost">
            <RotateCcw size={12} />Reset
          </button>
          <button className="btn-ghost">
            <Download size={12} />Export
          </button>
        </div>
      </motion.div>

      {/* Deal name + status */}
      <motion.div {...fadeUp(0.08)} className="glass-card p-5 flex items-center gap-4">
        <div className="flex-1">
          <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
            Deal Name
          </label>
          <input className="input-field text-[14px] font-semibold" value={dealName}
            onChange={(e) => setDealName(e.target.value)} placeholder="Enter deal name…" />
        </div>
        <div className="px-4 py-2 rounded-lg text-[12.5px] font-semibold shrink-0"
          style={{ background: status.bg, color: status.color, border: `1px solid ${status.color}28` }}>
          {status.label}
        </div>
      </motion.div>

      {/* Progress row */}
      <motion.div {...fadeUp(0.14)} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Overall Progress",  pct, sub: `${checked}/${total} items`,          color: "#3b82f6" },
          { label: "Critical Items",    pct: critPct, sub: `${critC}/${critT} critical`, color: "#f97316" },
          { label: "Buyer Checks",      pct: Math.round((buyer.filter(i=>i.checked).length/buyer.length)*100),   sub: `${buyer.filter(i=>i.checked).length}/${buyer.length}`,   color: "#22c55e" },
          { label: "Seller Checks",     pct: Math.round((seller.filter(i=>i.checked).length/seller.length)*100), sub: `${seller.filter(i=>i.checked).length}/${seller.length}`, color: "#a78bfa" },
        ].map((c, i) => (
          <motion.div key={c.label} {...fadeUp(0.14 + i * 0.05)}
            className="metric-card"
            style={{ "--accent-color": c.color } as React.CSSProperties}
          >
            <div className="text-[11px] text-slate-600 font-medium mb-2">{c.label}</div>
            <div className="text-[26px] font-black tabular-nums leading-none" style={{ color: c.color }}>
              {c.pct}%
            </div>
            <div className="h-1.5 bg-slate-800/60 rounded-full overflow-hidden my-2.5">
              <motion.div initial={{ width: 0 }} animate={{ width: `${c.pct}%` }}
                transition={{ duration: 0.75, delay: 0.3 }}
                className="h-full rounded-full" style={{ background: c.color }} />
            </div>
            <div className="text-[11px] text-slate-700">{c.sub}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Checklist columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <CheckGroup title="Buyer Verification"  icon={<Users size={14} className="text-emerald-500" />}  color="#22c55e" items={buyer}  onToggle={toggle} delay={0.2} />
        <CheckGroup title="Seller Verification" icon={<Store size={14} className="text-purple-400" />}   color="#a78bfa" items={seller} onToggle={toggle} delay={0.27} />
        <CheckGroup title="Broker Verification" icon={<UserCheck size={14} className="text-blue-400" />} color="#3b82f6" items={broker} onToggle={toggle} delay={0.34} />
      </div>

      {/* Summary */}
      <motion.div {...fadeUp(0.4)} className="glass-card p-6">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp size={14} className="text-blue-500" />
          <h3 className="text-[13.5px] font-semibold text-slate-200">Due Diligence Summary</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          {[
            { label: "Items Verified",      val: `${checked} / ${total}`, sub: "Total checklist completion",       color: "#3b82f6" },
            { label: "Critical Compliance", val: `${critPct}%`,          sub: "All critical items must be 100%",  color: critPct === 100 ? "#22c55e" : "#f97316" },
            { label: "Pending Items",       val: `${total - checked}`,   sub: "Items requiring attention",        color: total - checked === 0 ? "#22c55e" : "#f59e0b" },
          ].map((s) => (
            <div key={s.label} className="glass-card-flat p-4 rounded-xl">
              <div className="text-[11px] text-slate-600 mb-1.5">{s.label}</div>
              <div className="text-[22px] font-black tabular-nums leading-none" style={{ color: s.color }}>{s.val}</div>
              <div className="text-[11px] text-slate-700 mt-1.5">{s.sub}</div>
            </div>
          ))}
        </div>

        {critPct < 100 && (
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl"
            style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.18)" }}>
            <AlertTriangle size={13} className="text-amber-400 shrink-0 mt-0.5" />
            <p className="text-[12px] text-amber-300 leading-relaxed">
              <strong>{critT - critC} critical item(s)</strong> remain unchecked. All critical
              verification items must be completed before advancing to negotiation.
            </p>
          </div>
        )}
        {critPct === 100 && checked === total && (
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl"
            style={{ background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.18)" }}>
            <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-[12px] text-emerald-300 leading-relaxed">
              <strong>All Clear.</strong> Complete due diligence achieved. This deal is cleared for
              advancement to negotiation stage.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function CheckGroup({ title, icon, color, items, onToggle, delay }: {
  title: string; icon: React.ReactNode; color: string;
  items: ChecklistItem[]; onToggle: (id: string) => void; delay: number;
}) {
  const done = items.filter((i) => i.checked).length;
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay, ease: "easeOut" }}
      className="glass-card overflow-hidden"
    >
      {/* Head */}
      <div className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: "1px solid rgba(148,163,184,0.06)" }}>
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-[13px] font-semibold text-slate-200">{title}</span>
        </div>
        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full"
          style={{ background: `${color}14`, color, border: `1px solid ${color}25` }}>
          {done}/{items.length}
        </span>
      </div>
      {/* Items */}
      <div className="p-4 space-y-2">
        {items.map((item) => (
          <motion.button key={item.id} onClick={() => onToggle(item.id)}
            whileHover={{ x: 1 }}
            className="w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left transition-all"
            style={{
              background: item.checked ? `${color}0a` : "rgba(4,10,25,0.5)",
              border: `1px solid ${item.checked ? `${color}22` : "rgba(148,163,184,0.06)"}`,
            }}
          >
            <div className="shrink-0 mt-0.5">
              {item.checked
                ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="w-5 h-5 rounded flex items-center justify-center"
                    style={{ background: color }}>
                    <CheckCircle2 size={11} className="text-white" />
                  </motion.div>
                )
                : <Circle size={20} className="text-slate-800" />
              }
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[12.5px] font-medium leading-snug"
                style={{ color: item.checked ? color : "#64748b" }}>
                {item.label}
              </span>
              {item.critical && (
                <div className="flex items-center gap-1 mt-0.5 text-[10px] font-semibold text-red-600">
                  <AlertTriangle size={9} />Critical
                </div>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
