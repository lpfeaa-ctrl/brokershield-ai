"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Search, Plus, ChevronDown, ChevronUp,
  Briefcase, FileText, X,
} from "lucide-react";
import { mockCounterparties } from "@/lib/mockData";
import { Counterparty, CounterpartyType, RiskLevel } from "@/lib/types";
import { RiskBadge, ScoreCircle, TypeBadge } from "@/components/ui/RiskBadge";
import { getInitials } from "@/lib/utils";

const TYPE_FILTERS: (CounterpartyType | "All")[] = ["All","Buyer","Seller","Broker","Mandate"];
const TYPE_COLORS: Record<CounterpartyType, string> = {
  Buyer: "#3b82f6", Seller: "#22c55e", Broker: "#a78bfa", Mandate: "#fbbf24",
};

const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.38, delay: d },
});

export default function CounterpartiesPage() {
  const [search,    setSearch]    = useState("");
  const [typeFilter,setTypeFilter]= useState<CounterpartyType | "All">("All");
  const [selected,  setSelected]  = useState<Counterparty | null>(null);
  const [sortBy,    setSortBy]    = useState<"name"|"score"|"deals">("score");
  const [sortAsc,   setSortAsc]   = useState(false);

  const data = mockCounterparties
    .filter((cp) => {
      const mt = typeFilter === "All" || cp.type === typeFilter;
      const ms = !search || [cp.name, cp.company, cp.country]
        .some((s) => s.toLowerCase().includes(search.toLowerCase()));
      return mt && ms;
    })
    .sort((a, b) => {
      const cmp =
        sortBy === "name"  ? a.name.localeCompare(b.name) :
        sortBy === "score" ? a.trustScore - b.trustScore :
        a.previousDeals - b.previousDeals;
      return sortAsc ? cmp : -cmp;
    });

  const toggleSort = (k: "name"|"score"|"deals") => {
    if (sortBy === k) setSortAsc(!sortAsc); else { setSortBy(k); setSortAsc(false); }
  };

  const stats = [
    { label: "Total",     value: mockCounterparties.length,                                    color: "#3b82f6" },
    { label: "Buyers",    value: mockCounterparties.filter((c) => c.type === "Buyer").length,  color: "#22c55e" },
    { label: "Sellers",   value: mockCounterparties.filter((c) => c.type === "Seller").length, color: "#a78bfa" },
    { label: "High Risk", value: mockCounterparties.filter((c) => c.riskLevel === "high" || c.riskLevel === "critical").length, color: "#f97316" },
  ];

  return (
    <div className="p-8 space-y-6 min-h-screen" style={{ background: "var(--bg)" }}>

      {/* Header */}
      <motion.div {...fadeUp(0)} className="flex items-start justify-between">
        <div>
          <h1 className="page-title flex items-center gap-2">
            <Users size={20} className="text-blue-500" strokeWidth={2} />
            Counterparties
          </h1>
          <p className="page-subtitle">Trust profiles for buyers, sellers, brokers and mandates</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="btn-primary text-[13px]">
          <Plus size={14} />Add Counterparty
        </motion.button>
      </motion.div>

      {/* Stats */}
      <motion.div {...fadeUp(0.08)} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} {...fadeUp(0.08 + i * 0.05)}
            className="metric-card"
            style={{ "--accent-color": s.color } as React.CSSProperties}
          >
            <div className="text-[26px] font-black tabular-nums" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[11px] text-slate-600 mt-0.5">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div {...fadeUp(0.18)} className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl flex-1 min-w-52"
          style={{ background: "rgba(8,20,42,0.65)", border: "1px solid rgba(148,163,184,0.08)" }}>
          <Search size={13} className="text-slate-700 shrink-0" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search counterparties…"
            className="bg-transparent text-[13px] text-slate-300 placeholder-slate-700 outline-none flex-1" />
          {search && (
            <button onClick={() => setSearch("")} className="text-slate-700 hover:text-slate-500">
              <X size={12} />
            </button>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          {TYPE_FILTERS.map((t) => {
            const active = typeFilter === t;
            const color  = t !== "All" ? TYPE_COLORS[t as CounterpartyType] : "#3b82f6";
            return (
              <button key={t} onClick={() => setTypeFilter(t)}
                className="text-[11.5px] font-medium px-3 py-1.5 rounded-lg transition-all"
                style={{
                  background: active ? `${color}12` : "rgba(8,20,42,0.5)",
                  color: active ? color : "#475569",
                  border: `1px solid ${active ? `${color}28` : "rgba(148,163,184,0.08)"}`,
                }}>
                {t}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Table */}
      <motion.div {...fadeUp(0.24)} className="glass-card overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>
                <button onClick={() => toggleSort("name")} className="flex items-center gap-1 hover:text-slate-300 transition-colors">
                  Name {sortBy === "name" && (sortAsc ? <ChevronUp size={10}/> : <ChevronDown size={10}/>)}
                </button>
              </th>
              <th>Type</th>
              <th>Country</th>
              <th>
                <button onClick={() => toggleSort("score")} className="flex items-center gap-1 hover:text-slate-300 transition-colors">
                  Trust Score {sortBy === "score" && (sortAsc ? <ChevronUp size={10}/> : <ChevronDown size={10}/>)}
                </button>
              </th>
              <th>Risk Level</th>
              <th>
                <button onClick={() => toggleSort("deals")} className="flex items-center gap-1 hover:text-slate-300 transition-colors">
                  Deals {sortBy === "deals" && (sortAsc ? <ChevronUp size={10}/> : <ChevronDown size={10}/>)}
                </button>
              </th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {data.map((cp, i) => (
              <motion.tr key={cp.id}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.03 }}
                onClick={() => setSelected(cp)} className="cursor-pointer"
              >
                <td>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold text-white shrink-0"
                      style={{ background: `${TYPE_COLORS[cp.type]}20`, color: TYPE_COLORS[cp.type] }}>
                      {getInitials(cp.name)}
                    </div>
                    <div>
                      <div className="text-slate-200 font-medium text-[13px]">{cp.name}</div>
                      <div className="text-[11px] text-slate-700">{cp.company}</div>
                    </div>
                  </div>
                </td>
                <td><TypeBadge type={cp.type} /></td>
                <td className="text-[12.5px] text-slate-600">{cp.flag} {cp.country}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full bg-slate-800">
                      <div className="h-full rounded-full" style={{
                        width: `${cp.trustScore}%`,
                        background: cp.trustScore >= 70 ? "#22c55e" : cp.trustScore >= 50 ? "#3b82f6" : cp.trustScore >= 30 ? "#f59e0b" : "#ef4444",
                      }} />
                    </div>
                    <span className="font-mono text-[12px] font-semibold text-slate-300 tabular-nums">{cp.trustScore}</span>
                  </div>
                </td>
                <td><RiskBadge level={cp.riskLevel as RiskLevel} /></td>
                <td>
                  <div className="flex items-center gap-1 text-[12px] text-slate-600">
                    <Briefcase size={11} className="text-slate-700" />
                    {cp.previousDeals}
                  </div>
                </td>
                <td>
                  <p className="text-[11.5px] text-slate-700 truncate max-w-[200px]">{cp.notes}</p>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && (
          <div className="py-14 text-center text-[13px] text-slate-700">
            No counterparties match your search
          </div>
        )}
      </motion.div>

      {/* Profile Drawer */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 z-40" style={{ background: "rgba(1,5,14,0.7)", backdropFilter: "blur(4px)" }}
            />
            <motion.div
              initial={{ opacity: 0, x: 48 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 48 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed right-0 top-0 h-full w-96 z-50 overflow-y-auto"
              style={{
                background: "rgba(4,9,22,0.97)",
                backdropFilter: "blur(20px)",
                borderLeft: "1px solid rgba(148,163,184,0.07)",
              }}
            >
              <div className="p-6 space-y-5">
                {/* Top */}
                <div className="flex items-center justify-between">
                  <span className="section-label">Counterparty Profile</span>
                  <button onClick={() => setSelected(null)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 hover:text-slate-300 hover:bg-slate-800 transition-all">
                    <X size={15} />
                  </button>
                </div>

                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-[18px] font-black text-white shrink-0"
                    style={{ background: `linear-gradient(135deg,${TYPE_COLORS[selected.type]},${TYPE_COLORS[selected.type]}88)` }}
                  >
                    {getInitials(selected.name)}
                  </div>
                  <div>
                    <div className="text-white font-bold text-[16px] leading-tight">{selected.name}</div>
                    <div className="text-slate-500 text-[13px] mt-0.5">{selected.company}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <TypeBadge type={selected.type} />
                      <span className="text-[11.5px] text-slate-700">{selected.flag} {selected.country}</span>
                    </div>
                  </div>
                </div>

                {/* Score */}
                <div className="glass-card-flat p-4 rounded-xl flex items-center gap-4">
                  <ScoreCircle score={selected.trustScore} level={selected.riskLevel as RiskLevel} size={72} />
                  <div className="space-y-1.5">
                    <div className="text-[11px] text-slate-600">Trust Score</div>
                    <RiskBadge level={selected.riskLevel as RiskLevel} size="md" />
                    <div className="text-[11.5px] text-slate-600 flex items-center gap-1">
                      <Briefcase size={11} />
                      {selected.previousDeals} previous deal{selected.previousDeals !== 1 ? "s" : ""}
                    </div>
                  </div>
                </div>

                {/* Email */}
                {selected.email && (
                  <div className="glass-card-flat p-3.5 rounded-xl">
                    <div className="text-[10.5px] text-slate-700 mb-1">Email</div>
                    <div className="text-[13px] text-blue-400 font-mono break-all">{selected.email}</div>
                  </div>
                )}

                {/* Notes */}
                <div className="glass-card-flat p-4 rounded-xl">
                  <div className="flex items-center gap-1.5 section-label mb-2.5">
                    <FileText size={11} />Analyst Notes
                  </div>
                  <p className="text-[12.5px] text-slate-400 leading-relaxed">{selected.notes}</p>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-1">
                  <button className="w-full py-3 rounded-xl text-[13.5px] font-semibold text-white btn-primary justify-center">
                    Generate Risk Report
                  </button>
                  <button className="w-full py-2.5 rounded-xl text-[13px] font-medium btn-ghost justify-center">
                    Add to Active Deal
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
