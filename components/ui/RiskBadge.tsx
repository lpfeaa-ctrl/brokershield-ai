import { RiskLevel } from "@/lib/types";

/* ── Color maps ──────────────────────────────────────────── */
const COLORS: Record<RiskLevel, { text: string; bg: string; border: string; dot: string }> = {
  strong:    { text: "#22c55e", bg: "rgba(34,197,94,0.1)",    border: "rgba(34,197,94,0.22)",    dot: "#22c55e" },
  qualified: { text: "#60a5fa", bg: "rgba(59,130,246,0.1)",   border: "rgba(59,130,246,0.22)",   dot: "#3b82f6" },
  medium:    { text: "#fbbf24", bg: "rgba(245,158,11,0.1)",   border: "rgba(245,158,11,0.22)",   dot: "#f59e0b" },
  high:      { text: "#fb923c", bg: "rgba(249,115,22,0.1)",   border: "rgba(249,115,22,0.22)",   dot: "#f97316" },
  critical:  { text: "#f87171", bg: "rgba(239,68,68,0.1)",    border: "rgba(239,68,68,0.22)",    dot: "#ef4444" },
};

const LABELS: Record<RiskLevel, string> = {
  strong:    "Strong",
  qualified: "Qualified",
  medium:    "Medium Risk",
  high:      "High Risk",
  critical:  "Critical",
};

/* ── RiskBadge ───────────────────────────────────────────── */
interface RiskBadgeProps {
  level: RiskLevel;
  size?: "sm" | "md" | "lg";
  showScore?: boolean;
  score?: number;
}

export function RiskBadge({ level, size = "md", showScore = false, score }: RiskBadgeProps) {
  const c = COLORS[level];
  const label = LABELS[level];

  const sizeStyles = {
    sm: { fontSize: "9.5px",  padding: "2px 7px",  gap: "4px", dotSize: "5px" },
    md: { fontSize: "10.5px", padding: "3px 9px",  gap: "5px", dotSize: "6px" },
    lg: { fontSize: "12px",   padding: "4px 12px", gap: "6px", dotSize: "7px" },
  }[size];

  return (
    <span
      className="inline-flex items-center font-bold uppercase tracking-[0.05em] rounded-full whitespace-nowrap"
      style={{
        fontSize: sizeStyles.fontSize,
        padding: sizeStyles.padding,
        gap: sizeStyles.gap,
        color: c.text,
        background: c.bg,
        border: `1px solid ${c.border}`,
      }}
    >
      <span
        className="rounded-full shrink-0"
        style={{
          width: sizeStyles.dotSize,
          height: sizeStyles.dotSize,
          background: c.dot,
          boxShadow: `0 0 4px ${c.dot}`,
        }}
      />
      {showScore && score !== undefined ? `${score} · ` : ""}
      {label}
    </span>
  );
}

/* ── ScoreCircle ─────────────────────────────────────────── */
interface ScoreCircleProps {
  score: number;
  level: RiskLevel;
  size?: number;
}

export function ScoreCircle({ score, level, size = 80 }: ScoreCircleProps) {
  const c = COLORS[level];
  const strokeW = size < 70 ? 4.5 : 5.5;
  const radius = (size - strokeW * 2) / 2;
  const circ   = 2 * Math.PI * radius;
  const dash   = (score / 100) * circ;

  return (
    <div
      className="relative inline-flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className="-rotate-90"
        style={{ overflow: "visible" }}
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(148,163,184,0.08)"
          strokeWidth={strokeW}
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={c.dot}
          strokeWidth={strokeW}
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 5px ${c.dot}80)` }}
        />
      </svg>
      {/* Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
        <span
          className="font-black tabular-nums leading-none"
          style={{ fontSize: size * 0.235, color: "#f1f5f9" }}
        >
          {score}
        </span>
        <span
          className="font-semibold leading-none mt-0.5"
          style={{ fontSize: size * 0.115, color: "#475569" }}
        >
          /100
        </span>
      </div>
    </div>
  );
}

/* ── ScoreBar ────────────────────────────────────────────── */
interface ScoreBarProps {
  score: number;
  level: RiskLevel;
  width?: number | string;
}

export function ScoreBar({ score, level, width = 80 }: ScoreBarProps) {
  const c = COLORS[level];
  return (
    <div className="flex items-center gap-2">
      <div
        className="score-bar-track"
        style={{ width, flexShrink: 0 }}
      >
        <div
          className="score-bar-fill"
          style={{
            width: `${score}%`,
            background: `linear-gradient(90deg, ${c.dot}cc, ${c.dot})`,
          }}
        />
      </div>
      <span
        className="font-mono font-semibold tabular-nums"
        style={{ fontSize: 12, color: c.text, minWidth: 24 }}
      >
        {score}
      </span>
    </div>
  );
}

/* ── StatusBadge (deal pipeline status) ─────────────────── */
const STATUS_MAP: Record<string, { bg: string; color: string }> = {
  "New Lead":      { bg: "rgba(100,116,139,0.1)", color: "#94a3b8" },
  "Under Review":  { bg: "rgba(59,130,246,0.1)",  color: "#60a5fa" },
  "Qualified":     { bg: "rgba(34,197,94,0.1)",   color: "#4ade80" },
  "Negotiation":   { bg: "rgba(139,92,246,0.1)",  color: "#c084fc" },
  "High Risk":     { bg: "rgba(249,115,22,0.1)",  color: "#fb923c" },
  "Closed Won":    { bg: "rgba(34,197,94,0.12)",  color: "#22c55e" },
  "Rejected":      { bg: "rgba(239,68,68,0.1)",   color: "#f87171" },
};

export function StatusBadge({ status }: { status: string }) {
  const c = STATUS_MAP[status] ?? STATUS_MAP["New Lead"];
  return (
    <span
      className="inline-flex items-center text-[10.5px] font-semibold px-2.5 py-[3px] rounded-full whitespace-nowrap"
      style={{ background: c.bg, color: c.color }}
    >
      {status}
    </span>
  );
}

/* ── Type badge (counterparty type) ─────────────────────── */
const TYPE_COLORS: Record<string, string> = {
  Buyer:   "#3b82f6",
  Seller:  "#22c55e",
  Broker:  "#a78bfa",
  Mandate: "#fbbf24",
};
export function TypeBadge({ type }: { type: string }) {
  const color = TYPE_COLORS[type] ?? "#94a3b8";
  return (
    <span
      className="text-[10.5px] font-semibold px-2 py-[2px] rounded-md"
      style={{
        background: `${color}18`,
        color,
        border: `1px solid ${color}28`,
      }}
    >
      {type}
    </span>
  );
}

/* ── Helper exports ─────────────────────────────────────── */
export function getRiskTextColor(level: RiskLevel): string { return COLORS[level].text; }
export function getRiskDotColor(level: RiskLevel):  string { return COLORS[level].dot;  }
