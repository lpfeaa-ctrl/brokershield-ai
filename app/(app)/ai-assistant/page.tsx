"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, Sparkles, Copy, Check, RefreshCw,
  MessageSquare, FileText, Send, ChevronRight, Zap,
} from "lucide-react";

interface Action {
  id: string; label: string; desc: string; icon: React.ReactNode; color: string; tpl: string;
}

const ACTIONS: Action[] = [
  { id: "first-reply",   label: "Generate First Reply",    desc: "Professional response to a new inquiry", icon: <MessageSquare size={15}/>, color: "#3b82f6", tpl: "first_reply" },
  { id: "request-pof",   label: "Request Proof of Funds",  desc: "Formal POF request letter",              icon: <FileText size={15}/>,      color: "#22c55e", tpl: "request_pof" },
  { id: "request-pop",   label: "Request Proof of Product",desc: "POP / SGS documentation request",        icon: <FileText size={15}/>,      color: "#a78bfa", tpl: "request_pop" },
  { id: "ask-kyc",       label: "Ask for KYC",             desc: "Compliance & KYC request letter",        icon: <FileText size={15}/>,      color: "#f59e0b", tpl: "ask_kyc" },
  { id: "polite-reject", label: "Reject Politely",         desc: "Professional deal declination",          icon: <FileText size={15}/>,      color: "#f97316", tpl: "polite_reject" },
  { id: "summarize",     label: "Summarize Deal",          desc: "Executive summary of an operation",      icon: <Sparkles size={15}/>,      color: "#06b6d4", tpl: "summarize_deal" },
  { id: "risk-report",   label: "Generate Risk Report",    desc: "Full risk assessment report text",       icon: <FileText size={15}/>,      color: "#6366f1", tpl: "risk_report" },
  { id: "ncnda",         label: "NCNDA Reminder",          desc: "Non-circumvention agreement reminder",   icon: <FileText size={15}/>,      color: "#ec4899", tpl: "ncnda_reminder" },
];

const TEMPLATES: Record<string, string> = {
  first_reply:
`Dear [Counterparty Name],

Thank you for reaching out regarding this trade opportunity. We have reviewed the initial information and are cautiously interested in exploring further.

Before proceeding, our compliance process requires:

1. Full KYC package (corporate registration, directors ID, proof of address)
2. Proof of Funds — bank comfort letter or verified financial statement
3. Proof of Product — current, valid and third-party verified
4. A clear written procedure outlining the transaction flow

We operate strictly on a first-come, first-served basis and do not engage in "show me yours, I'll show you mine" procedures.

We look forward to your prompt response.

With professional regards,
[Your Name] · BrokerShield AI`,

  request_pof:
`Dear [Buyer Representative],

As part of our standard compliance process, we kindly request official Proof of Funds for this transaction.

Requirements:
— Issued by a Tier 1 or Tier 2 regulated bank
— Addressed to our compliance officer
— States funds sufficient to cover the full transaction value
— Dated within the last 5 banking days
— Signed and stamped by an authorised bank officer

Screenshots, PDFs of screenshots, or unverified wallet balances will not be accepted.

This is a non-negotiable requirement for all transactions above $500,000 USD.

We await your response within 2 business days.

Regards,
[Your Name] · BrokerShield AI — Private Beta`,

  request_pop:
`Dear [Seller Representative],

To advance to the next phase, we require a formal and verifiable Proof of Product.

Required documentation:
1. Certificate of Origin — from a recognised certifying authority
2. Product Analysis / Quality Certificate — recent lab results
3. SGS / Intertek / Bureau Veritas Inspection Certificate
4. Export License — valid government authority
5. Title / Ownership Documents

All documents must be legible, unaltered, from a recognised third-party, and current (not older than 30 days).

Please send directly to our trade verification team.

Regards,
[Your Name]`,

  ask_kyc:
`Dear [Counterparty Name],

Our compliance framework requires formal KYC verification before further engagement.

Corporate KYC:
— Certificate of Incorporation
— Articles of Association
— Directors and Beneficial Owners (UBO) list
— Proof of registered address (< 3 months)
— Audited financials or bank reference

Individual KYC:
— Government-issued photo ID (passport preferred)
— Proof of address (< 3 months)

Refusal to provide KYC will result in immediate termination of engagement.

Compliance Team · BrokerShield AI`,

  polite_reject:
`Dear [Counterparty Name],

Thank you for presenting this opportunity. We appreciate the time you invested in sharing the details with our team.

After careful review, we have decided not to proceed with this opportunity at this time.

This decision is based on our current risk parameters and internal compliance requirements, and does not reflect on your professional standing.

We wish you every success and hope to collaborate on future opportunities that better align with our criteria.

With professional regards,
[Your Name] · BrokerShield AI`,

  summarize_deal:
`TRANSACTION EXECUTIVE SUMMARY
${"─".repeat(50)}
Reference: [Deal ID] · ${new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"long",year:"numeric"})}
Status:    Under Active Review

PRODUCT:     [Product Name]
QUANTITY:    [Volume / Weight]
ORIGIN:      [Country]
DESTINATION: [Country]
INCOTERM:    [Incoterm]
PRICE:       [Price per unit / Total]
PAYMENT:     [Payment Terms]

BUYER:       [Buyer Name / Company]
SELLER:      [Seller Name / Company]
CHAIN:       [Broker Chain]

DOCUMENTS RECEIVED:
□ Proof of Funds   □ Proof of Product
□ KYC Package      □ Export License

RISK SCORE: [X]/100 · [Risk Level]
CLOSING PROBABILITY: [X]%

NEXT STEP: [Action to be taken]
${"─".repeat(50)}
Prepared by BrokerShield AI`,

  risk_report:
`CONFIDENTIAL RISK ASSESSMENT REPORT
${"═".repeat(50)}
BrokerShield AI — Trade Intelligence
${new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"long",year:"numeric"})}

PRODUCT:  [Commodity / Product]
VALUE:    [Estimated Value]
ROUTE:    [Origin] → [Destination]
PARTIES:  [Buyer] / [Seller]

RISK SCORE:     [XX] / 100
CLASSIFICATION: [LEVEL]
PROBABILITY:    [XX]%

RED FLAGS:
▶ [Red flag 1]
▶ [Red flag 2]

STRENGTHS:
✓ [Strength 1]
✓ [Strength 2]

MISSING:
○ [Required item 1]
○ [Required item 2]

RECOMMENDATION:
[Detailed recommendation]

FINAL ASSESSMENT:
[Professional conclusion]
${"═".repeat(50)}
Confidential — BrokerShield AI`,

  ncnda_reminder:
`Dear [Counterparty Name],

Before exchanging any confidential information, client names or business intelligence, we require a signed NCNDA/IMFPA.

The agreement covers:
1. Non-Circumvention — No party shall bypass others once introduced
2. Non-Disclosure — All information remains strictly confidential
3. Commission Protection — Agreed fee structures are binding
4. IMFPA — Irrevocable Master Fee Protection for all intermediaries

We accept: ICC-format NCNDA or custom agreements reviewed by our legal team.

No client names, POF, POP or transaction details will be shared prior to execution.

Regards,
[Your Name] · BrokerShield AI — Private Beta`,
};

export default function AIAssistantPage() {
  const [active,       setActive]       = useState<Action | null>(null);
  const [output,       setOutput]       = useState<string | null>(null);
  const [generating,   setGenerating]   = useState(false);
  const [copied,       setCopied]       = useState(false);
  const [chatInput,    setChatInput]    = useState("");
  const [context,      setContext]      = useState("");
  const [sessionCount, setSessionCount] = useState(0);

  const generate = async (action: Action) => {
    setActive(action);
    setGenerating(true);
    setOutput(null);
    await new Promise((r) => setTimeout(r, 1100));
    setOutput(TEMPLATES[action.tpl]);
    setSessionCount((c) => c + 1);
    setGenerating(false);
  };

  const handleCopy = () => {
    if (output) { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }
  };

  const handleChat = async () => {
    if (!chatInput.trim()) return;
    setChatInput("");
    setGenerating(true);
    setOutput(null);
    await new Promise((r) => setTimeout(r, 900));
    setOutput(`Regarding your query: "${chatInput.trim()}"\n\nBased on standard trade intelligence practices, I recommend requesting full KYC documentation and a current Proof of Funds before proceeding. Would you like me to generate a formal request letter, or a risk assessment summary for this situation?`);
    setSessionCount((c) => c + 1);
    setGenerating(false);
  };

  return (
    <div className="p-8 space-y-6 min-h-screen" style={{ background: "var(--bg)" }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="page-title flex items-center gap-2">
          <Bot size={20} className="text-blue-500" strokeWidth={2} />
          AI Assistant
        </h1>
        <p className="page-subtitle">Generate professional trade communications instantly</p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Quick Actions */}
        <motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.08 }} className="space-y-2">
          <p className="section-label px-1 mb-3 flex items-center gap-1.5">
            <Zap size={10} />Quick Actions
          </p>
          {ACTIONS.map((action, i) => (
            <motion.button key={action.id}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              onClick={() => generate(action)} disabled={generating}
              whileHover={{ x: 2 }} whileTap={{ scale: 0.98 }}
              className="w-full flex items-center gap-3 p-3.5 rounded-xl text-left transition-all disabled:opacity-50"
              style={{
                background: active?.id === action.id ? `${action.color}0e` : "rgba(8,20,42,0.6)",
                border: `1px solid ${active?.id === action.id ? `${action.color}28` : "rgba(148,163,184,0.07)"}`,
              }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: `${action.color}14`, color: action.color, border: `1px solid ${action.color}22` }}>
                {action.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[12.5px] font-semibold text-slate-200">{action.label}</div>
                <div className="text-[11px] text-slate-600 mt-0.5">{action.desc}</div>
              </div>
              <ChevronRight size={13} className="text-slate-700 shrink-0" />
            </motion.button>
          ))}
        </motion.div>

        {/* Output Panel */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.16 }} className="xl:col-span-2 flex flex-col gap-4">

          {/* Optional context */}
          <div className="glass-card p-4">
            <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              Optional Context
            </label>
            <input className="input-field" value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="e.g. Copper cathodes 500MT, buyer: Gulf Metals FZE, seller: Katanga Mining DRC…" />
          </div>

          {/* Output */}
          <div className="glass-card flex-1 overflow-hidden flex flex-col" style={{ minHeight: 380 }}>
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 py-3.5"
              style={{ borderBottom: "1px solid rgba(148,163,184,0.06)" }}>
              <div className="flex items-center gap-2">
                <Sparkles size={13} className="text-blue-500" />
                <span className="text-[13px] font-semibold text-slate-300">
                  {active?.label ?? "Generated Output"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {output && (
                  <>
                    <button onClick={() => active && generate(active)}
                      className="text-slate-700 hover:text-slate-400 transition-colors p-1">
                      <RefreshCw size={12} />
                    </button>
                    <button onClick={handleCopy}
                      className="flex items-center gap-1.5 text-[11.5px] px-3 py-1.5 rounded-lg font-medium transition-all"
                      style={{
                        background: copied ? "rgba(34,197,94,0.1)"  : "rgba(59,130,246,0.1)",
                        color:      copied ? "#4ade80" : "#60a5fa",
                        border:     `1px solid ${copied ? "rgba(34,197,94,0.22)" : "rgba(59,130,246,0.22)"}`,
                      }}>
                      {copied ? <Check size={11}/> : <Copy size={11}/>}
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 p-5 overflow-y-auto">
              <AnimatePresence mode="wait">
                {generating && (
                  <motion.div key="spin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-48 gap-4">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent" />
                    <span className="text-[12.5px] text-slate-600">Generating…</span>
                  </motion.div>
                )}
                {!generating && !output && (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-48 text-center">
                    <Bot size={30} className="text-slate-800 mb-3" />
                    <p className="text-[13px] text-slate-600">
                      Select a quick action to generate professional content
                    </p>
                  </motion.div>
                )}
                {!generating && output && (
                  <motion.pre key="output"
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className="text-[12.5px] text-slate-400 font-mono leading-relaxed whitespace-pre-wrap">
                    {output}
                  </motion.pre>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Chat input */}
          <div className="glass-card flex items-center gap-3 px-4 py-3">
            <input value={chatInput} onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleChat()}
              placeholder="Ask anything or request a custom document…"
              className="flex-1 bg-transparent text-[13px] text-slate-300 placeholder-slate-700 outline-none" />
            <motion.button onClick={handleChat}
              disabled={!chatInput.trim() || generating}
              whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 disabled:opacity-40 transition-all"
              style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)" }}>
              <Send size={13} className="text-white" />
            </motion.button>
          </div>

          {sessionCount > 0 && (
            <p className="text-[11px] text-slate-700 text-right">
              {sessionCount} document{sessionCount !== 1 ? "s" : ""} generated this session
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
