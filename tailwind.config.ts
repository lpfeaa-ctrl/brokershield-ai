import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Base backgrounds */
        bg:      "#020b18",
        surface: "#040f20",
        /* Navy scale */
        navy: {
          950: "#020b18",
          900: "#040f20",
          850: "#060f23",
          800: "#071526",
          750: "#0a1a30",
          700: "#0d2040",
          600: "#122648",
          500: "#1a3458",
          400: "#243f6a",
        },
        /* Brand */
        brand: {
          blue:   "#3b82f6",
          indigo: "#6366f1",
          dim:    "#2563eb",
        },
        /* Risk */
        risk: {
          strong:    "#22c55e",
          qualified: "#3b82f6",
          medium:    "#f59e0b",
          high:      "#f97316",
          critical:  "#ef4444",
        },
      },
      backgroundImage: {
        "page-bg":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(37,99,235,0.08) 0%, transparent 100%), linear-gradient(160deg, #020b18 0%, #030d1e 50%, #040f20 100%)",
        "sidebar-bg":
          "linear-gradient(180deg, rgba(3,8,22,0.98) 0%, rgba(2,8,18,0.99) 100%)",
        "card-gradient":
          "linear-gradient(145deg, rgba(10,22,48,0.6) 0%, rgba(6,14,32,0.7) 100%)",
        "blue-glow":
          "radial-gradient(ellipse at center, rgba(37,99,235,0.12) 0%, transparent 70%)",
        "hero-glow":
          "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(37,99,235,0.15) 0%, transparent 100%)",
      },
      boxShadow: {
        "glass":       "0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.02) inset",
        "glass-hover": "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(59,130,246,0.15)",
        "blue-glow":   "0 0 24px rgba(59,130,246,0.35), 0 0 48px rgba(59,130,246,0.1)",
        "blue-glow-sm":"0 0 12px rgba(59,130,246,0.2)",
        "card":        "0 2px 12px rgba(0,0,0,0.35)",
        "metric":      "0 4px 20px rgba(0,0,0,0.4)",
        "btn":         "0 4px 14px rgba(37,99,235,0.4), 0 0 0 1px rgba(37,99,235,0.2)",
      },
      borderColor: {
        glass:  "rgba(148,163,184,0.07)",
        active: "rgba(59,130,246,0.3)",
        subtle: "rgba(148,163,184,0.05)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "Consolas", "monospace"],
      },
      fontSize: {
        "2xs": ["10px", { lineHeight: "14px", letterSpacing: "0.08em" }],
        "xs":  ["11.5px", { lineHeight: "16px" }],
        "sm":  ["13.5px", { lineHeight: "20px" }],
      },
      borderRadius: {
        "xl":  "12px",
        "2xl": "16px",
        "3xl": "20px",
      },
      animation: {
        "pulse-slow":  "pulse 3s cubic-bezier(0.4,0,0.6,1) infinite",
        "float":       "float 6s ease-in-out infinite",
        "glow-pulse":  "glowPulse 2.5s ease-in-out infinite",
        "slide-in":    "slideIn 0.3s ease forwards",
        "fade-in":     "fadeIn 0.3s ease forwards",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-8px)" },
        },
        glowPulse: {
          "0%,100%": { opacity: "0.6" },
          "50%":     { opacity: "1" },
        },
        slideIn: {
          from: { opacity: "0", transform: "translateX(10px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
