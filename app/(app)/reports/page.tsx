"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileBarChart, Copy, Check, AlertTriangle, CheckCircle2, Info,
  Target, ChevronDown, ChevronUp, Shield, Calendar, Globe,
  Package, TrendingUp, Printer,
} from "lucide-react";
import { RiskBadge, ScoreCircle } from "@/components/ui/RiskBadge";
import { RiskLevel } from "@/lib/types";
import { getRiskColor, getRiskLabel } from "@/lib/scoring";

interface MockReport {
  id: string; operationId: string; product: string;
  buyer: string; seller: string; country: string;
  generatedAt: string; score: number; riskLevel: RiskLevel;
  value: string; summary: string; redFlags: string[];
  missingInfo: string[]; strengths: string[];
  recommendedAction: string; conclusion: string;
}

const mockReports: MockReport[] = [
  {
    id: "RPT-001", operationId: "OP-001", product: "Copper Cathodes",
    buyer: "Gulf Metals FZE", seller: "Katanga Mining DRC",
    country: "UAE / DRC", generatedAt: "2024-12-10",
    score: 52, riskLevel: "medium", value: "$4,200,000",
    summary: "Copper cathode transaction between a UAE-based buyer and a DRC mining seller. Trade route raises standard compliance concerns. POF has been requested but not yet received. Seller documentation is partially available.",
    redFlags: [
      "POF not received from buyer despite multiple requests",
      "DRC origin requires enhanced compliance screening",
      "Broker chain contains 2 unknown intermediaries",
    ],
    missingInfo: ["Proof of Funds from Gulf Metals FZE", "Full KYC package from buyer side", "Export license confirmation from DRC"],
    strengths: ["Seller is a registered mining company", "CIF Dubai procedure is standard", "LC at sight is a credible payment term"],
    recommendedAction: "Request POF within 48 hours or pause engagement. Initiate enhanced due diligence on DRC export chain. Verify broker mandate before proceeding.",
    conclusion: "This transaction shows moderate potential but carries elevated risk due to unresolved documentation and the DRC origin. Proceed only after POF confirmation and enhanced compliance clearance. Risk classification: MEDIUM. Not recommended for immediate commitment.",
  },
  {
    id: "RPT-002", operationId: "OP-002", product: "BTC OTC Block",
    buyer: "Alpine Digital SA", seller: "MENA Crypto LLC",
    country: "Switzerland / Dubai", generatedAt: "2024-12-08",
    score: 28, riskLevel: "high", value: "$8,500,000",
    summary: "Large OTC cryptocurrency block deal. Buyer uses a generic email and refuses standard KYC procedures. No verifiable POF. Significant compliance and fraud indicators present.",
    redFlags: [
      "Buyer refuses KYC — CRITICAL compliance red flag",
      "Generic email address (not corporate domain)",
      "No verifiable Proof of Funds provided",
      "High urgency pressure from buyer side",
      "Payment via MT103 — unusual for legitimate OTC block",
    ],
    missingInfo: ["KYC from both buyer and seller", "POF from buyer", "Clear OTC procedure documentation", "Company registration for Alpine Digital SA"],
    strengths: ["Deal size could justify resources if legitimate"],
    recommendedAction: "DO NOT PROCEED. Immediately request full KYC compliance before any further engagement. If refused, reject and document this interaction.",
    conclusion: "This transaction presents multiple critical risk indicators that individually and collectively justify immediate disengagement. The refusal of KYC, generic email, absence of POF, and MT103 payment terms are each serious operational red flags. Rejection and documentation of this interaction is recommended.",
  },
  {
    id: "RPT-003", operationId: "OP-003", product: "Sugar ICUMSA 45",
    buyer: "Iberian Foods SL", seller: "Canavieiras Export Ltda",
    country: "Spain / Brazil", generatedAt: "2024-12-05",
    score: 74, riskLevel: "qualified", value: "$1,850,000",
    summary: "Sugar ICUMSA 45 transaction between an established Spanish food importer and a Brazilian exporter. Both parties have verified corporate documentation. SBLC confirmed. Procedure follows standard FOB Santos terms.",
    redFlags: ["Commission structure between broker layers not fully defined"],
    missingInfo: ["Final inspection certificate (post-loading)", "Written commission agreement between all parties"],
    strengths: [
      "SBLC confirmed from reputable Spanish bank",
      "KYC fully accepted by both parties",
      "Seller has 7 previous verified transactions",
      "Procedure is standard and industry-compliant",
      "Corporate emails verified for both entities",
    ],
    recommendedAction: "Advance to formal negotiation. Obtain written commission agreement before signing LOI. Request final SGS inspection terms. Deal is viable.",
    conclusion: "This is a qualified trade opportunity with strong fundamentals. Both counterparties demonstrate institutional credibility and compliance willingness. Risk classification: QUALIFIED. Recommended for advancement.",
  },
  {
    id: "RPT-004", operationId: "OP-004", product: "Stainless Steel Coils",
    buyer: "Atlas Steel Morocco", seller: "Baosteel Group",
    country: "Morocco / China", generatedAt: "2024-12-03",
    score: 88, riskLevel: "strong", value: "$3,100,000",
    summary: "Premium stainless steel coil transaction between Atlas Steel Morocco and Baosteel Group (Chinese state-owned enterprise). Full documentation received. LC confirmed. All compliance requirements met.",
    redFlags: [],
    missingInfo: [],
    strengths: [
      "Direct buyer and seller confirmed — no chain risk",
      "Baosteel is a state-owned enterprise with global credibility",
      "Full KYC received from both sides",
      "LC 60 days from Attijariwafa Bank confirmed",
      "SGS inspection pre-shipment included in procedure",
      "All documents consistent and verified",
      "Corporate emails and websites confirmed",
    ],
    recommendedAction: "Proceed to final agreement execution. All documentation is in order. Prepare LC review with your bank and schedule SGS pre-shipment inspection.",
    conclusion: "This transaction represents an exemplary trade opportunity with the highest confidence rating. All critical verification criteria have been satisfied. Both counterparties are established institutional entities with verified track records. Risk classification: STRONG OPPORTUNITY. Full commitment is recommended.",
  },
  {
    id: "RPT-005", operationId: "OP-005", product: "Gold Doré Bars",
    buyer: "Ankara Precious Metals", seller: "GoldFields Ghana",
    country: "Turkey / Ghana", generatedAt: "2024-12-01",
    score: 22, riskLevel: "high", value: "$12,750,000",
    summary: "Gold doré bar transaction of significant value. Multiple compliance and documentation issues identified. EXW Accra terms are unusual and place undue risk on the buyer. MT103 payment terms are a known fraud indicator in gold transactions.",
    redFlags: [
      "EXW Accra for gold is an unusual and high-risk procedure",
      "MT103 payment terms are a major red flag for gold transactions",
      "Seller documentation disputed — origin certificate contested",
      "Export documentation from Ghana is incomplete",
      "Buyer has shown urgency pressure behavior",
    ],
    missingInfo: ["Valid and uncontested export license from Ghana", "Third-party certification (BV/SGS) for gold purity and weight", "Full KYC from Ankara Precious Metals", "Bank guarantee or LC from Turkish bank"],
    strengths: ["Deal size is commercially attractive if legitimate"],
    recommendedAction: "Do not commit any resources or capital. Require full documentation overhaul: switch to CIF terms, replace MT103 with LC or BG from a Turkish bank, and obtain contested export documents.",
    conclusion: "This gold transaction presents a high-risk profile with multiple procedural and documentation red flags. Platform assessment indicates suspension of engagement pending complete documentation resolution. Legal and compliance consultation is recommended before any further steps.",
  },
];

const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.38, delay: d },
});

export default function ReportsPage() {
  const [selected, setSelected] = useState<MockReport>(mockReports[0]);
  const [copied,   setCopied]   = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    redFlags: true, strengths: true, missing: true, action: true, conclusion: true,
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(generateReportText(selected));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggle = (key: string) => setExpanded((p) => ({ ...p, [key]: !p[key] }));

  const stats = [
    { label: "Total Reports",  value: mockReports.length,                                              color: "#1A6FA5" },
    { label: "Strong",         value: mockReports.filter((r) => r.riskLevel === "strong").length,      color: "#22c55e" },
    { label: "Qualified",      value: mockReports.filter((r) => r.riskLevel === "qualified").length,   color: "#1A6FA5" },
    { label: "High Risk",      value: mockReports.filter((r) => r.riskLevel === "high" || r.riskLevel === "critical").length, color: "#ef4444" },
  ];

  return (
    <div className="p-8 space-y-6 min-h-screen" style={{ background: "var(--bg)" }}>

      {/* Header */}
      <motion.div {...fadeUp(0)} className="flex items-start justify-between">
        <div>
          <h1 className="page-title flex items-center gap-2">
            <FileBarChart size={20} className="text-blue-500" strokeWidth={2} />
            Risk Reports
          </h1>
          <p className="page-subtitle">Indicative risk assessments for structured deal review — for operational reference only</p>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div {...fadeUp(0.06)} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} {...fadeUp(0.06 + i * 0.05)}
            className="metric-card"
            style={{ "--accent-color": s.color } as React.CSSProperties}
          >
            <div className="text-[26px] font-black tabular-nums" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[11px] text-slate-600 mt-0.5">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

        {/* Report List */}
        <motion.div {...fadeUp(0.14)} className="xl:col-span-1 space-y-2">
          <p className="section-label px-1 mb-3">Available Reports</p>
          {mockReports.map((report, i) => (
            <motion.button key={report.id}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.06 }}
              onClick={() => setSelected(report)}
              whileHover={{ x: 2 }} whileTap={{ scale: 0.98 }}
              className="w-full p-3.5 rounded-xl text-left transition-all"
              style={{
                background: selected.id === report.id ? `${getRiskColor(report.riskLevel)}0e` : "rgba(8,20,42,0.6)",
                border: `1px solid ${selected.id === report.id ? `${getRiskColor(report.riskLevel)}28` : "rgba(148,163,184,0.07)"}`,
              }}
            >
              <div className="text-[12.5px] font-semibold text-slate-200 truncate">{report.product}</div>
              <div className="text-[11px] text-slate-600 mt-0.5 truncate">{report.buyer}</div>
              <div className="flex items-center justify-between mt-2.5">
                <RiskBadge level={report.riskLevel} size="sm" />
                <span className="text-[10px] font-mono text-slate-700">{report.id}</span>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Report Detail */}
        <AnimatePresence mode="wait">
          <motion.div key={selected.id}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28 }}
            className="xl:col-span-3 space-y-4"
          >
            {/* Header Card */}
            <div className="glass-card p-6 relative overflow-hidden"
              style={{ borderColor: `${getRiskColor(selected.riskLevel)}20` }}>
              <div className="absolute top-0 right-0 w-56 h-56 rounded-full blur-3xl pointer-events-none"
                style={{ background: getRiskColor(selected.riskLevel), opacity: 0.04 }} />

              <div className="relative">
                {/* Top bar */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "linear-gradient(135deg,#1D4E6B,#1A6FA5)" }}>
                      <Shield size={17} className="text-white" />
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold text-slate-700 uppercase tracking-widest mb-0.5">
                        BrokerShield AI — Risk Assessment
                      </div>
                      <div className="text-white font-bold text-[17px] leading-tight">{selected.product}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={handleCopy}
                      className="flex items-center gap-1.5 text-[11.5px] px-3 py-1.5 rounded-lg font-medium transition-all"
                      style={{
                        background: copied ? "rgba(34,197,94,0.1)"  : "rgba(59,130,246,0.1)",
                        color:      copied ? "#4ade80" : "#5ba8d4",
                        border:     `1px solid ${copied ? "rgba(34,197,94,0.22)" : "rgba(59,130,246,0.22)"}`,
                      }}>
                      {copied ? <Check size={11}/> : <Copy size={11}/>}
                      {copied ? "Copied!" : "Copy"}
                    </button>
                    <button className="flex items-center gap-1.5 text-[11.5px] px-3 py-1.5 rounded-lg font-medium btn-ghost">
                      <Printer size={11} />Export
                    </button>
                  </div>
                </div>

                {/* Meta grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                  {[
                    { icon: <Package size={11}/>,    label: "Product", value: selected.product },
                    { icon: <Globe size={11}/>,      label: "Route",   value: selected.country },
                    { icon: <TrendingUp size={11}/>, label: "Value",   value: selected.value },
                    { icon: <Calendar size={11}/>,   label: "Date",    value: selected.generatedAt },
                  ].map((item) => (
                    <div key={item.label} className="glass-card-flat p-3 rounded-xl">
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-700 mb-1">
                        {item.icon}{item.label}
                      </div>
                      <div className="text-[13px] text-slate-300 font-medium truncate">{item.value}</div>
                    </div>
                  ))}
                </div>

                {/* Score row */}
                <div className="flex items-center gap-6">
                  <ScoreCircle score={selected.score} level={selected.riskLevel} size={84} />
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <RiskBadge level={selected.riskLevel} size="lg" />
                      <span className="text-[13px] text-slate-500">
                        {selected.score >= 80 ? "Strong Opportunity"
                          : selected.score >= 60 ? "Qualified — Needs Verification"
                          : selected.score >= 40 ? "Proceed with Caution"
                          : selected.score >= 20 ? "High Risk — Do Not Commit"
                          : "Not Recommended — Reject"}
                      </span>
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-600 mb-1.5">Closing Probability</div>
                      <div className="flex items-center gap-2.5">
                        <div className="score-bar-track" style={{ width: 160 }}>
                          <motion.div className="score-bar-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.round((selected.score / 100) * 85 + 5)}%` }}
                            transition={{ duration: 0.75 }}
                            style={{ background: `linear-gradient(90deg,${getRiskColor(selected.riskLevel)},${getRiskColor(selected.riskLevel)}cc)` }}
                          />
                        </div>
                        <span className="text-white font-bold text-[13px] tabular-nums">
                          {Math.round((selected.score / 100) * 85 + 5)}%
                        </span>
                      </div>
                    </div>
                    <div className="text-[11.5px] text-slate-600 leading-relaxed">
                      Buyer: <span className="text-slate-300">{selected.buyer}</span>
                      <span className="mx-1.5 text-slate-800">·</span>
                      Seller: <span className="text-slate-300">{selected.seller}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="glass-card p-5">
              <p className="section-label flex items-center gap-1.5 mb-3">
                <FileBarChart size={11} />Operation Summary
              </p>
              <p className="text-[13px] text-slate-400 leading-relaxed">{selected.summary}</p>
            </div>

            {/* Collapsible sections */}
            {selected.redFlags.length > 0 && (
              <CollapsibleSection title="Red Flags Identified" icon={<AlertTriangle size={12} className="text-red-400"/>}
                color="#ef4444" count={selected.redFlags.length}
                expanded={expanded.redFlags} onToggle={() => toggle("redFlags")}>
                <ul className="space-y-2">
                  {selected.redFlags.map((flag, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[12.5px] text-red-300">
                      <span className="text-red-500 shrink-0 mt-0.5">▶</span>{flag}
                    </li>
                  ))}
                </ul>
              </CollapsibleSection>
            )}

            {selected.strengths.length > 0 && (
              <CollapsibleSection title="Verified Strengths" icon={<CheckCircle2 size={12} className="text-emerald-400"/>}
                color="#22c55e" count={selected.strengths.length}
                expanded={expanded.strengths} onToggle={() => toggle("strengths")}>
                <ul className="space-y-2">
                  {selected.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[12.5px] text-emerald-300">
                      <span className="text-emerald-500 shrink-0 mt-0.5">✓</span>{s}
                    </li>
                  ))}
                </ul>
              </CollapsibleSection>
            )}

            {selected.missingInfo.length > 0 && (
              <CollapsibleSection title="Missing Information" icon={<Info size={12} className="text-amber-400"/>}
                color="#f59e0b" count={selected.missingInfo.length}
                expanded={expanded.missing} onToggle={() => toggle("missing")}>
                <ul className="space-y-2">
                  {selected.missingInfo.map((m, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[12.5px] text-amber-300">
                      <span className="text-amber-500 shrink-0 mt-0.5">○</span>{m}
                    </li>
                  ))}
                </ul>
              </CollapsibleSection>
            )}

            <CollapsibleSection title="Recommended Action" icon={<Target size={12} className="text-blue-400"/>}
              color="#1A6FA5" expanded={expanded.action} onToggle={() => toggle("action")}>
              <p className="text-[13px] text-slate-400 leading-relaxed">{selected.recommendedAction}</p>
            </CollapsibleSection>

            <CollapsibleSection title="Final Professional Conclusion" icon={<Shield size={12} className="text-indigo-400"/>}
              color="#6366f1" expanded={expanded.conclusion} onToggle={() => toggle("conclusion")}>
              <p className="text-[13px] text-slate-400 leading-relaxed">{selected.conclusion}</p>
              <div className="mt-4 pt-4 flex items-center justify-between"
                style={{ borderTop: "1px solid rgba(148,163,184,0.06)" }}>
                <span className="text-[10.5px] font-mono text-slate-700">Report ID: {selected.id}</span>
                <span className="text-[10.5px] text-slate-700">
                  Generated by BrokerShield AI · {selected.generatedAt}
                </span>
              </div>
            </CollapsibleSection>

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function CollapsibleSection({ title, icon, color, count, expanded, onToggle, children }: {
  title: string; icon: React.ReactNode; color: string;
  count?: number; expanded: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div className="glass-card overflow-hidden" style={{ borderColor: `${color}18` }}>
      <button onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-white/[0.01] transition-colors">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color }}>{title}</span>
          {count !== undefined && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
              style={{ background: `${color}14`, color }}>
              {count}
            </span>
          )}
        </div>
        {expanded ? <ChevronUp size={13} className="text-slate-700"/> : <ChevronDown size={13} className="text-slate-700"/>}
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
            className="overflow-hidden">
            <div className="px-5 pb-5 pt-2" style={{ borderTop: `1px solid ${color}10` }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function generateReportText(report: MockReport): string {
  return `BROKERSHIELD AI — CONFIDENTIAL RISK ASSESSMENT REPORT
${"=".repeat(60)}
Report ID: ${report.id}
Date: ${report.generatedAt}
Product: ${report.product}
Buyer: ${report.buyer}
Seller: ${report.seller}
Route: ${report.country}
Estimated Value: ${report.value}

RISK SCORE: ${report.score}/100
RISK LEVEL: ${getRiskLabel(report.riskLevel).toUpperCase()}
CLOSING PROBABILITY: ${Math.round((report.score / 100) * 85 + 5)}%

OPERATION SUMMARY:
${report.summary}

RED FLAGS:
${report.redFlags.map((f) => `▶ ${f}`).join("\n")}

STRENGTHS:
${report.strengths.map((s) => `✓ ${s}`).join("\n")}

MISSING INFORMATION:
${report.missingInfo.map((m) => `○ ${m}`).join("\n")}

RECOMMENDED ACTION:
${report.recommendedAction}

FINAL CONCLUSION:
${report.conclusion}

${"=".repeat(60)}
This report is confidential. Generated by BrokerShield AI Trade Intelligence Platform.`;
}
