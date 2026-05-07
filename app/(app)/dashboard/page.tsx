"use client";

import { motion, type Transition } from "framer-motion";
import {
  Activity, AlertTriangle, Users, DollarSign, TrendingUp,
  ArrowUpRight, ArrowDownRight, MoreHorizontal, RefreshCw,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  mockOperations, riskDistributionData, pipelineValueData, dealTrendData,
} from "@/lib/mockData";
import { RiskBadge, StatusBadge, ScoreBar } from "@/components/ui/RiskBadge";
import { RiskLevel } from "@/lib/types";

/* ── Animation helpers ─────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: "easeOut" } as Transition,
});

/* ── Tooltip ───────────────────────────────────────────── */
interface TP { active?: boolean; payload?: { name: string; value: number }[]; label?: string }
const ChartTooltip = ({ active, payload, label }: TP) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="text-slate-500 text-[11px] mb-1.5">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-slate-200 font-semibold text-[12px]">
          {p.name?.includes("value") ? `$${p.value}M` : p.value}
        </p>
      ))}
    </div>
  );
};

/* ── Stat cards config ─────────────────────────────────── */
const STATS = [
  { label: "Active Deals",            value: "9",       change: "+2 this week",       up: true,  icon: Activity,      color: "#3b82f6" },
  { label: "High Risk Deals",         value: "3",       change: "+1 flagged",         up: false, icon: AlertTriangle, color: "#f97316" },
  { label: "Qualified Counterparties",value: "6",       change: "+1 verified",        up: true,  icon: Users,         color: "#22c55e" },
  { label: "Est. Deal Volume",        value: "$58.7M",  change: "+12% vs last month", up: true,  icon: DollarSign,    color: "#a78bfa" },
  { label: "Avg. Risk Score",         value: "57",      change: "Moderate",           up: null,  icon: TrendingUp,    color: "#f59e0b" },
];

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-7 min-h-screen" style={{ background: "var(--bg)" }}>

      {/* Page header */}
      <motion.div {...fadeUp(0)} className="flex items-start justify-between">
        <div>
          <h1 className="page-title">Intelligence Dashboard</h1>
          <p className="page-subtitle">Real-time overview of your trade operations and risk exposure</p>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="btn-ghost">
            <RefreshCw size={12} />
            Refresh
          </button>
          <div
            className="text-[11.5px] px-3 py-2 rounded-lg"
            style={{ background: "rgba(8,20,42,0.6)", border: "1px solid rgba(148,163,184,0.07)", color: "#475569" }}
          >
            Updated <span className="text-slate-400">just now</span>
          </div>
        </div>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {STATS.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              {...fadeUp(i * 0.06)}
              className="metric-card"
              style={{ "--accent-color": s.color } as React.CSSProperties}
            >
              {/* Radial glow */}
              <div
                className="absolute top-0 right-0 w-28 h-28 rounded-full blur-2xl pointer-events-none"
                style={{ background: s.color, opacity: 0.08 }}
              />
              {/* Icon */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: `${s.color}16`, color: s.color }}
                >
                  <Icon size={15} strokeWidth={1.8} />
                </div>
                <ArrowUpRight size={13} className="text-slate-800" />
              </div>
              {/* Value */}
              <div
                className="font-black text-white mb-0.5 tabular-nums"
                style={{ fontSize: s.value.length > 4 ? "22px" : "28px" }}
              >
                {s.value}
              </div>
              <div className="text-[11px] text-slate-600 font-medium mb-3">{s.label}</div>
              {/* Trend */}
              <div
                className="text-[11px] font-semibold flex items-center gap-1"
                style={{
                  color: s.up === true ? "#22c55e" : s.up === false ? "#f97316" : "#64748b",
                }}
              >
                {s.up === true  && <ArrowUpRight size={10} strokeWidth={2.5} />}
                {s.up === false && <ArrowDownRight size={10} strokeWidth={2.5} />}
                {s.change}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Area – volume trend */}
        <motion.div {...fadeUp(0.35)} className="glass-card lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-[13.5px] font-semibold text-slate-200">Deal Volume Trend</h3>
              <p className="text-[11.5px] text-slate-600 mt-0.5">Monthly pipeline value · USD millions</p>
            </div>
            <span
              className="text-[10.5px] font-semibold px-2.5 py-1 rounded-full"
              style={{ background: "rgba(34,197,94,0.09)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.18)" }}
            >
              +38% YTD
            </span>
          </div>
          <ResponsiveContainer width="100%" height={190}>
            <AreaChart data={dealTrendData} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#3b82f6" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 4" stroke="rgba(148,163,184,0.06)" />
              <XAxis dataKey="month" tick={{ fill: "#475569", fontSize: 10.5 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#475569", fontSize: 10.5 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}M`} />
              <Tooltip content={<ChartTooltip />} />
              <Area
                type="monotone" dataKey="value" name="value"
                stroke="#3b82f6" strokeWidth={2}
                fill="url(#areaGrad)"
                dot={false}
                activeDot={{ r: 4, fill: "#60a5fa", strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie – risk distribution */}
        <motion.div {...fadeUp(0.42)} className="glass-card p-6">
          <div className="mb-4">
            <h3 className="text-[13.5px] font-semibold text-slate-200">Risk Distribution</h3>
            <p className="text-[11.5px] text-slate-600 mt-0.5">Current portfolio</p>
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={riskDistributionData} cx="50%" cy="50%" innerRadius={42} outerRadius={65}
                paddingAngle={3} dataKey="value" strokeWidth={0}
              >
                {riskDistributionData.map((d, i) => (
                  <Cell key={i} fill={d.color} opacity={0.9} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v) => [`${v} deals`, ""]}
                contentStyle={{
                  background: "rgba(6,16,40,0.95)", border: "1px solid rgba(59,130,246,0.18)",
                  borderRadius: 10, fontSize: 11.5, color: "#e2e8f0",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {riskDistributionData.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-[11.5px]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                  <span className="text-slate-500">{d.name}</span>
                </div>
                <span className="text-slate-400 font-semibold tabular-nums">{d.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bar – pipeline by stage */}
      <motion.div {...fadeUp(0.48)} className="glass-card p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-[13.5px] font-semibold text-slate-200">Pipeline Value by Stage</h3>
            <p className="text-[11.5px] text-slate-600 mt-0.5">USD millions · active pipeline</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={170}>
          <BarChart data={pipelineValueData} barSize={28} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
            <CartesianGrid strokeDasharray="2 4" stroke="rgba(148,163,184,0.06)" vertical={false} />
            <XAxis dataKey="stage" tick={{ fill: "#475569", fontSize: 10.5 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#475569", fontSize: 10.5 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}M`} />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="value" name="value" radius={[4, 4, 0, 0]}>
              {pipelineValueData.map((_, i) => {
                const cols = ["#3b82f6","#60a5fa","#22c55e","#a78bfa","#f97316","#22c55e"];
                return <Cell key={i} fill={cols[i % cols.length]} fillOpacity={0.8} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Operations table */}
      <motion.div {...fadeUp(0.54)} className="glass-card overflow-hidden">
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid rgba(148,163,184,0.06)" }}
        >
          <div>
            <h3 className="text-[13.5px] font-semibold text-slate-200">Recent Operations</h3>
            <p className="text-[11.5px] text-slate-600 mt-0.5">{mockOperations.length} operations tracked</p>
          </div>
          <button className="btn-ghost text-[12px]">View all</button>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Buyer</th>
                <th>Seller</th>
                <th>Route</th>
                <th>Status</th>
                <th>Value</th>
                <th>Score</th>
                <th>Risk</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {mockOperations.map((op, i) => (
                <motion.tr
                  key={op.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 + i * 0.04 }}
                >
                  <td>
                    <div className="text-slate-200 font-medium text-[13px]">{op.product}</div>
                    <div className="text-[10.5px] text-slate-700 mt-0.5 font-mono">{op.id}</div>
                  </td>
                  <td className="text-[13px]">{op.buyer}</td>
                  <td className="text-[13px]">{op.seller}</td>
                  <td className="text-[12px] text-slate-600">{op.country}</td>
                  <td><StatusBadge status={op.status} /></td>
                  <td>
                    <span className="text-slate-200 font-semibold text-[13px]">{op.value}</span>
                  </td>
                  <td>
                    <ScoreBar score={op.riskScore} level={op.riskLevel as RiskLevel} width={56} />
                  </td>
                  <td><RiskBadge level={op.riskLevel as RiskLevel} /></td>
                  <td>
                    <button className="text-slate-700 hover:text-slate-500 transition-colors p-1 rounded">
                      <MoreHorizontal size={13} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
