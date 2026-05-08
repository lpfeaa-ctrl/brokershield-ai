"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ChevronRight, AlertTriangle, CheckCircle2, XCircle,
  Info, Zap, Package, Users, FileText, ClipboardList, Target, RefreshCw,
} from "lucide-react";
import { DealFormData, AnalysisResult as AR } from "@/lib/types";
import { calculateDealScore } from "@/lib/scoring";
import { RiskBadge, ScoreCircle } from "@/components/ui/RiskBadge";
import { getRiskColor } from "@/lib/scoring";

/* ── Defaults ──────────────────────────────────────────── */
const DEFAULT: DealFormData = {
  product:"",quantity:"",origin:"",destination:"",incoterm:"",price:"",
  buyerName:"",sellerName:"",brokerChain:"",paymentTerms:"",procedure:"",
  documentsAvailable:[],notes:"",
  directBuyer:false,directSeller:false,corporateEmail:false,pofAvailable:false,
  popAvailable:false,kycAccepted:false,clearProcedure:false,realisticPrice:false,
  documentsConsistent:false,tooManyIntermediaries:false,genericEmail:false,
  unrealisticPrice:false,refusesKyc:false,noCompanyWebsite:false,
  highUrgencyPressure:false,unclearCommission:false,
};

const INCOTERMS = ["FOB","CIF","CFR","EXW","DDP","DAP","FCA","CPT","CIP"];
const PAYMENT_TERMS = ["LC at sight","LC 30 days","LC 60 days","SBLC","MT103","Wire Transfer","BG","TT 30%+70%"];
const DOCUMENTS = ["Commercial Invoice","Packing List","Bill of Lading","SGS/Intertek","Certificate of Origin","Export License","POF","POP","KYC Package"];

/* ── Sub-components ────────────────────────────────────── */
function SectionTitle({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div
      className="flex items-center gap-2 pb-3 mb-4"
      style={{ borderBottom: "1px solid rgba(148,163,184,0.06)" }}
    >
      <span className="text-blue-500 opacity-80">{icon}</span>
      <span className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
    </div>
  );
}

function Field({ label, children, span2 = false }: { label: string; children: React.ReactNode; span2?: boolean }) {
  return (
    <div className={span2 ? "col-span-2" : ""}>
      <label className="block text-[11.5px] font-semibold text-slate-600 mb-1.5 tracking-wide">{label}</label>
      {children}
    </div>
  );
}

function FactorCheck({
  label, hint, checked, onChange, positive,
}: { label: string; hint: string; checked: boolean; onChange: (v: boolean) => void; positive: boolean }) {
  const activeColor = positive ? "#22c55e" : "#ef4444";
  return (
    <label
      className="flex items-start gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all"
      style={{
        background: checked ? `${activeColor}08` : "rgba(4,10,25,0.5)",
        border: `1px solid ${checked ? `${activeColor}22` : "rgba(148,163,184,0.07)"}`,
      }}
    >
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only" />
      <div
        className="w-4 h-4 rounded flex items-center justify-center shrink-0 mt-0.5 transition-all"
        style={{
          background: checked ? activeColor : "transparent",
          border: `1.5px solid ${checked ? activeColor : "rgba(71,85,105,0.4)"}`,
        }}
      >
        {checked && <CheckCircle2 size={9} className="text-white" strokeWidth={3} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[12px] font-medium leading-snug" style={{ color: checked ? activeColor : "#64748b" }}>
          {label}
          <span className="ml-1.5 text-[9.5px] font-bold" style={{ color: positive ? "#22c55e" : "#ef4444" }}>
            {positive ? "▲" : "▼"}
          </span>
        </div>
        <div className="text-[10.5px] text-slate-700 mt-0.5">{hint}</div>
      </div>
    </label>
  );
}

/* ── Main Page ─────────────────────────────────────────── */
export default function AnalyzePage() {
  const [form, setForm] = useState<DealFormData>(DEFAULT);
  const [result, setResult] = useState<AR | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const set = (k: keyof DealFormData, v: string | boolean | string[]) =>
    setForm((p) => ({ ...p, [k]: v }));

  const toggleDoc = (d: string) =>
    set("documentsAvailable",
      form.documentsAvailable.includes(d)
        ? form.documentsAvailable.filter((x) => x !== d)
        : [...form.documentsAvailable, d]
    );

  const handleAnalyze = async () => {
    setAnalyzing(true);
    await new Promise((r) => setTimeout(r, 1700));
    setResult(calculateDealScore(form));
    setAnalyzing(false);
  };

  return (
    <div className="p-8 space-y-6 min-h-screen" style={{ background: "var(--bg)" }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between"
      >
        <div>
          <h1 className="page-title flex items-center gap-2">
            <Search size={20} className="text-blue-500" strokeWidth={2} />
            Analyze Operation
          </h1>
          <p className="page-subtitle">Submit deal parameters for structured risk indicator analysis — results are indicative, not conclusive</p>
        </div>
        {result && (
          <motion.button
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            onClick={() => { setForm(DEFAULT); setResult(null); }}
            className="btn-ghost"
          >
            <RefreshCw size={12} />
            New Analysis
          </motion.button>
        )}
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">

        {/* ── Form ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.08 }}
          className="xl:col-span-3 space-y-5"
        >
          {/* Product Info */}
          <div className="glass-card p-6">
            <SectionTitle icon={<Package size={14} />} label="Product Information" />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Product / Commodity *" span2>
                <input className="input-field" value={form.product}
                  onChange={(e) => set("product", e.target.value)}
                  placeholder="e.g. Copper Cathodes Grade A" />
              </Field>
              <Field label="Quantity / Volume">
                <input className="input-field" value={form.quantity}
                  onChange={(e) => set("quantity", e.target.value)}
                  placeholder="e.g. 500 MT" />
              </Field>
              <Field label="Price / Unit">
                <input className="input-field" value={form.price}
                  onChange={(e) => set("price", e.target.value)}
                  placeholder="e.g. $7,200/MT" />
              </Field>
              <Field label="Origin Country">
                <input className="input-field" value={form.origin}
                  onChange={(e) => set("origin", e.target.value)}
                  placeholder="e.g. DRC" />
              </Field>
              <Field label="Destination Country">
                <input className="input-field" value={form.destination}
                  onChange={(e) => set("destination", e.target.value)}
                  placeholder="e.g. UAE" />
              </Field>
              <Field label="Incoterm">
                <select className="input-field" value={form.incoterm}
                  onChange={(e) => set("incoterm", e.target.value)}>
                  <option value="">Select…</option>
                  {INCOTERMS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </Field>
            </div>
          </div>

          {/* Parties */}
          <div className="glass-card p-6">
            <SectionTitle icon={<Users size={14} />} label="Parties & Structure" />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Buyer Name / Company *">
                <input className="input-field" value={form.buyerName}
                  onChange={(e) => set("buyerName", e.target.value)}
                  placeholder="e.g. Gulf Metals FZE" />
              </Field>
              <Field label="Seller Name / Company *">
                <input className="input-field" value={form.sellerName}
                  onChange={(e) => set("sellerName", e.target.value)}
                  placeholder="e.g. Katanga Mining DRC" />
              </Field>
              <Field label="Broker / Intermediary Chain" span2>
                <input className="input-field" value={form.brokerChain}
                  onChange={(e) => set("brokerChain", e.target.value)}
                  placeholder="e.g. Broker A → Mandate B → us (3 links)" />
              </Field>
              <Field label="Payment Terms">
                <select className="input-field" value={form.paymentTerms}
                  onChange={(e) => set("paymentTerms", e.target.value)}>
                  <option value="">Select…</option>
                  {PAYMENT_TERMS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Procedure">
                <input className="input-field" value={form.procedure}
                  onChange={(e) => set("procedure", e.target.value)}
                  placeholder="e.g. ICPO → POP → LC → Shipment" />
              </Field>
            </div>
          </div>

          {/* Documents */}
          <div className="glass-card p-6">
            <SectionTitle icon={<FileText size={14} />} label="Documents Available" />
            <div className="flex flex-wrap gap-2 mb-4">
              {DOCUMENTS.map((d) => {
                const active = form.documentsAvailable.includes(d);
                return (
                  <button key={d} onClick={() => toggleDoc(d)}
                    className="text-[11.5px] font-medium px-3 py-1.5 rounded-lg transition-all"
                    style={{
                      background: active ? "rgba(59,130,246,0.12)" : "rgba(4,10,25,0.6)",
                      color: active ? "#5ba8d4" : "#475569",
                      border: `1px solid ${active ? "rgba(59,130,246,0.28)" : "rgba(148,163,184,0.08)"}`,
                    }}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
            <Field label="Additional Notes">
              <textarea className="input-field resize-none" rows={3} value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
                placeholder="Context, concerns or observations about this deal…" />
            </Field>
          </div>

          {/* Risk Factors */}
          <div className="glass-card p-6">
            <SectionTitle icon={<ClipboardList size={14} />} label="Risk Factor Assessment" />
            <p className="text-[11.5px] text-slate-600 mb-4">
              Check all factors that apply. Each directly impacts the AI risk score.
            </p>

            {/* Positive */}
            <div className="mb-5">
              <div className="flex items-center gap-1.5 mb-2.5">
                <CheckCircle2 size={11} className="text-emerald-500" />
                <span className="section-label text-emerald-700">Positive Signals</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                {[
                  ["directBuyer",        "Direct buyer confirmed",    "+20 pts · No additional chain risk", true],
                  ["directSeller",       "Direct seller confirmed",   "+20 pts · Source of product is clear", true],
                  ["corporateEmail",     "Corporate email",           "+10 pts · Verified business domain", true],
                  ["pofAvailable",       "POF available",             "+15 pts · Proof of funds provided", true],
                  ["popAvailable",       "POP available",             "+15 pts · Proof of product provided", true],
                  ["kycAccepted",        "KYC accepted",              "+10 pts · Compliance willingness", true],
                  ["clearProcedure",     "Clear procedure",           "+10 pts · Industry-standard flow", true],
                  ["realisticPrice",     "Realistic price",           "+10 pts · Within market range", true],
                  ["documentsConsistent","Documents consistent",      "+10 pts · No contradictions", true],
                ].map(([key, label, hint, pos]) => (
                  <FactorCheck key={key as string} label={label as string} hint={hint as string}
                    checked={form[key as keyof DealFormData] as boolean}
                    onChange={(v) => set(key as keyof DealFormData, v)}
                    positive={pos as boolean}
                  />
                ))}
              </div>
            </div>

            {/* Negative */}
            <div>
              <div className="flex items-center gap-1.5 mb-2.5">
                <XCircle size={11} className="text-red-500" />
                <span className="section-label text-red-700">Red Flag Indicators</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                {[
                  ["tooManyIntermediaries","Too many intermediaries",   "-25 pts · 3+ broker layers", false],
                  ["genericEmail",         "Generic email (Gmail/Yahoo)","-10 pts · Non-professional", false],
                  ["unrealisticPrice",     "Unrealistic price/discount","-25 pts · Below market", false],
                  ["refusesKyc",           "Refuses KYC",               "-30 pts · Critical red flag", false],
                  ["noCompanyWebsite",     "No company website",        "-10 pts · Unverifiable entity", false],
                  ["highUrgencyPressure",  "High urgency pressure",     "-15 pts · Manipulation tactic", false],
                  ["unclearCommission",    "Unclear commission",         "-10 pts · Dispute risk", false],
                ].map(([key, label, hint, pos]) => (
                  <FactorCheck key={key as string} label={label as string} hint={hint as string}
                    checked={form[key as keyof DealFormData] as boolean}
                    onChange={(v) => set(key as keyof DealFormData, v)}
                    positive={pos as boolean}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Submit */}
          <motion.button
            onClick={handleAnalyze}
            disabled={analyzing || !form.product}
            whileHover={!analyzing ? { scale: 1.015, y: -2 } : {}}
            whileTap={!analyzing ? { scale: 0.985 } : {}}
            className="w-full py-3.5 rounded-xl font-bold text-white text-[14px] flex items-center justify-center gap-2.5 transition-all disabled:opacity-40"
            style={{
              background: "linear-gradient(135deg,#1D4E6B,#1A6FA5)",
              boxShadow: analyzing ? "none" : "0 0 28px rgba(37,99,235,0.4), 0 4px 16px rgba(0,0,0,0.3)",
            }}
          >
            {analyzing ? (
              <>
                <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                  <Zap size={16} />
                </motion.span>
                Analyzing Operation…
              </>
            ) : (
              <><Zap size={16} />Analyze Operation<ChevronRight size={16} /></>
            )}
          </motion.button>
        </motion.div>

        {/* ── Result Panel ──────────────────────────────────── */}
        <div className="xl:col-span-2">
          <AnimatePresence mode="wait">
            {!result && !analyzing && (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="glass-card flex flex-col items-center justify-center text-center p-10"
                style={{ minHeight: 420 }}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.14)" }}>
                  <Target size={26} className="text-blue-600 opacity-60" />
                </div>
                <p className="text-slate-400 font-semibold text-[14px] mb-2">Ready to Analyze</p>
                <p className="text-slate-600 text-[12.5px] leading-relaxed max-w-[240px]">
                  Fill in the deal parameters and scoring factors, then click{" "}
                  <span className="text-blue-500">Analyze Operation</span>.
                </p>
              </motion.div>
            )}

            {analyzing && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="glass-card flex flex-col items-center justify-center text-center p-10"
                style={{ minHeight: 420 }}
              >
                <motion.div
                  animate={{ boxShadow: ["0 0 12px rgba(37,99,235,0.3)","0 0 32px rgba(37,99,235,0.65)","0 0 12px rgba(37,99,235,0.3)"] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: "linear-gradient(135deg,#1D4E6B,#1A6FA5)" }}
                >
                  <Zap size={24} className="text-white" />
                </motion.div>
                <p className="text-white font-semibold text-[14px] mb-4">Processing Analysis</p>
                <div className="space-y-2">
                  {["Evaluating signals…","Calculating risk factors…","Generating assessment…"].map((m, i) => (
                    <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.5 }}
                      className="flex items-center gap-2 text-[11.5px] text-slate-600"
                    >
                      <motion.span animate={{ opacity: [0.3,1,0.3] }}
                        transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.3 }}
                        className="w-1.5 h-1.5 rounded-full bg-blue-500"
                      />
                      {m}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {result && !analyzing && (
              <ResultPanel result={result} product={form.product} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ── Result Panel ──────────────────────────────────────── */
function ResultPanel({ result, product }: { result: AR; product: string }) {
  const rColor = getRiskColor(result.riskLevel);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className="space-y-4"
    >
      {/* Score card */}
      <div
        className="glass-card p-5 relative overflow-hidden"
        style={{ borderColor: `${rColor}28` }}
      >
        <div className="absolute top-0 right-0 w-40 h-40 blur-3xl pointer-events-none rounded-full"
          style={{ background: rColor, opacity: 0.06 }} />
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="section-label">Risk Assessment</p>
            <p className="text-[14px] font-semibold text-white mt-0.5 truncate max-w-[170px]">
              {product || "Operation"}
            </p>
          </div>
          <RiskBadge level={result.riskLevel} size="lg" />
        </div>
        <div className="flex items-center gap-5">
          <ScoreCircle score={result.score} level={result.riskLevel} size={88} />
          <div className="flex-1 space-y-3">
            <div>
              <p className="text-[11px] text-slate-600 mb-1.5">Closing Probability</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-slate-800">
                  <motion.div initial={{ width: 0 }}
                    animate={{ width: `${result.closingProbability}%` }}
                    transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg,${rColor}99,${rColor})` }}
                  />
                </div>
                <span className="text-white font-bold text-[13px] tabular-nums">{result.closingProbability}%</span>
              </div>
            </div>
            <p className="text-[11.5px] text-slate-500">{result.riskLabel}</p>
          </div>
        </div>
      </div>

      {/* Red flags */}
      {result.redFlags.length > 0 && (
        <ResultList
          icon={<AlertTriangle size={12} />} title="Red Flags" color="#ef4444"
          items={result.redFlags} bullet="▶"
        />
      )}

      {/* Strengths */}
      {result.strengths.length > 0 && (
        <ResultList
          icon={<CheckCircle2 size={12} />} title="Strengths" color="#22c55e"
          items={result.strengths} bullet="✓"
        />
      )}

      {/* Missing */}
      {result.missingInfo.length > 0 && (
        <ResultList
          icon={<Info size={12} />} title="Missing Information" color="#f59e0b"
          items={result.missingInfo} bullet="○"
        />
      )}

      {/* Recommendation */}
      <div className="glass-card p-4"
        style={{ background: "rgba(59,130,246,0.05)", borderColor: "rgba(59,130,246,0.15)" }}>
        <p className="section-label text-blue-600 mb-2 flex items-center gap-1.5">
          <Target size={11} />Recommended Action
        </p>
        <p className="text-[12.5px] text-slate-400 leading-relaxed">{result.recommendedAction}</p>
      </div>

      {/* Assessment */}
      <div className="glass-card p-4">
        <p className="section-label mb-2 flex items-center gap-1.5">
          <FileText size={11} />Professional Assessment
        </p>
        <p className="text-[12px] text-slate-500 leading-relaxed">{result.professionalAssessment}</p>
      </div>
    </motion.div>
  );
}

function ResultList({ icon, title, color, items, bullet }: {
  icon: React.ReactNode; title: string; color: string; items: string[]; bullet: string;
}) {
  return (
    <div
      className="glass-card p-4"
      style={{
        background: `${color}06`,
        borderColor: `${color}18`,
      }}
    >
      <p className="flex items-center gap-1.5 mb-2.5 section-label" style={{ color }}>
        {icon}{title}
        <span className="ml-auto text-[9.5px] px-1.5 py-0.5 rounded-full" style={{ background: `${color}15` }}>
          {items.length}
        </span>
      </p>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="text-[12px] flex items-start gap-1.5" style={{ color: `${color}cc` }}>
            <span className="opacity-60 shrink-0 mt-0.5">{bullet}</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
