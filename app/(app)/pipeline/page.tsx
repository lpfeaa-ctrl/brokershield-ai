"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Kanban, Plus, MoreHorizontal, DollarSign } from "lucide-react";
import { mockPipelineDeals } from "@/lib/mockData";
import { PipelineDeal, DealStatus, RiskLevel } from "@/lib/types";
import { RiskBadge, ScoreBar } from "@/components/ui/RiskBadge";

const COLS: { status: DealStatus; color: string }[] = [
  { status: "New Lead",     color: "#64748b" },
  { status: "Under Review", color: "#1A6FA5" },
  { status: "Qualified",    color: "#22c55e" },
  { status: "Negotiation",  color: "#a78bfa" },
  { status: "High Risk",    color: "#f97316" },
  { status: "Closed Won",   color: "#22c55e" },
  { status: "Rejected",     color: "#ef4444" },
];

export default function PipelinePage() {
  const [deals] = useState<PipelineDeal[]>(mockPipelineDeals);

  const get = (s: DealStatus) => deals.filter((d) => d.status === s);

  const totalValue = deals
    .filter((d) => d.status !== "Rejected")
    .reduce((acc, d) => {
      const n = parseFloat(d.value.replace(/[$MK]/g, ""));
      const m = d.value.includes("M") ? 1e6 : d.value.includes("K") ? 1e3 : 1;
      return acc + n * m;
    }, 0);

  return (
    <div className="p-8 space-y-6 min-h-screen" style={{ background: "var(--bg)" }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between">
        <div>
          <h1 className="page-title flex items-center gap-2">
            <Kanban size={20} className="text-blue-500" strokeWidth={2} />
            Pipeline CRM
          </h1>
          <p className="page-subtitle">Kanban deal tracking from lead to close</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="btn-ghost text-[13px]">
            <DollarSign size={13} className="text-blue-400" />
            <span className="text-slate-500">Pipeline:</span>
            <span className="text-white font-bold">${(totalValue / 1e6).toFixed(1)}M</span>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="btn-primary text-[13px]">
            <Plus size={14} />Add Deal
          </motion.button>
        </div>
      </motion.div>

      {/* Stage pills */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.08 }}
        className="flex items-center gap-4 overflow-x-auto pb-1 scroll-x">
        {COLS.map((c) => {
          const count = get(c.status).length;
          return (
            <div key={c.status} className="flex items-center gap-1.5 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.color }} />
              <span className="text-[11.5px] text-slate-600">{c.status}</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                style={{ background: `${c.color}16`, color: c.color }}>
                {count}
              </span>
            </div>
          );
        })}
      </motion.div>

      {/* Board */}
      <div className="flex gap-4 overflow-x-auto pb-4 scroll-x" style={{ minHeight: "calc(100vh - 300px)" }}>
        {COLS.map((col, ci) => {
          const colDeals = get(col.status);
          return (
            <motion.div key={col.status}
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + ci * 0.055, duration: 0.38 }}
              className="shrink-0 flex flex-col"
              style={{ width: 248 }}
            >
              {/* Column header */}
              <div
                className="flex items-center justify-between px-3.5 py-3 rounded-t-2xl"
                style={{
                  background: "rgba(6,14,32,0.85)",
                  borderTop: `2px solid ${col.color}`,
                  border: `1px solid rgba(148,163,184,0.07)`,
                  borderBottom: "none",
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: col.color }} />
                  <span className="text-[12px] font-semibold text-slate-300">{col.status}</span>
                </div>
                <span className="text-[10.5px] font-bold w-5 h-5 rounded flex items-center justify-center"
                  style={{ background: `${col.color}1a`, color: col.color }}>
                  {colDeals.length}
                </span>
              </div>

              {/* Cards */}
              <div className="flex-1 p-2.5 space-y-2 rounded-b-2xl overflow-y-auto"
                style={{
                  background: "rgba(4,10,24,0.5)",
                  border: "1px solid rgba(148,163,184,0.06)",
                  borderTop: "none",
                  minHeight: 180,
                  maxHeight: 580,
                }}
              >
                <AnimatePresence>
                  {colDeals.map((deal, i) => (
                    <KanbanCard key={deal.id} deal={deal} delay={i * 0.04} />
                  ))}
                </AnimatePresence>
                {colDeals.length === 0 && (
                  <div className="h-20 flex items-center justify-center">
                    <p className="text-[11px] text-slate-800">Empty</p>
                  </div>
                )}
                <button
                  className="w-full py-2 rounded-xl flex items-center justify-center gap-1 text-[11px] text-slate-800 hover:text-slate-600 transition-colors"
                  style={{ border: "1px dashed rgba(148,163,184,0.1)" }}>
                  <Plus size={11} />Add
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function KanbanCard({ deal, delay }: { deal: PipelineDeal; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }} transition={{ delay }}
      className="kanban-card group"
    >
      <div className="flex items-start justify-between mb-2.5">
        <div className="flex-1 min-w-0 pr-1">
          <div className="text-[12.5px] font-semibold text-slate-200 truncate leading-snug">{deal.product}</div>
          <div className="text-[11px] text-slate-600 mt-0.5 truncate">{deal.company}</div>
        </div>
        <button className="text-slate-800 hover:text-slate-500 transition-colors opacity-0 group-hover:opacity-100 shrink-0">
          <MoreHorizontal size={13} />
        </button>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1 text-[12px]">
          <DollarSign size={11} className="text-emerald-600" />
          <span className="font-semibold text-slate-300">{deal.value}</span>
        </div>
        <span className="text-[11px] text-slate-700">
          {deal.flag} {deal.country}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <RiskBadge level={deal.riskLevel as RiskLevel} size="sm" />
        <ScoreBar score={deal.score} level={deal.riskLevel as RiskLevel} width={48} />
      </div>
    </motion.div>
  );
}
