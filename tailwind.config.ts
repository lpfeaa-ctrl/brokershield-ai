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
        bg:      "#0a1a28",
        surface: "#0d2035",
        /* Navy scale */
        navy: {
          950: "#0a1a28",
          900: "#0d2035",
          850: "#0f2540",
          800: "#122c48",
          750: "#163350",
          700: "#1a3d5c",
          600: "#1D4E6B",
          500: "#1A6FA5",
          400: "#3a8fc0",
        },
        /* Brand */
        brand: {
          primary:   "#0B1C2C",
          secondary: "#1D4E6B",
          accent:    "#1A6FA5",
          neutral:   "#5C6B7A",
          light:     "#F4F6F8",
        },
        /* Risk */
        risk: {
          strong:    "#22c55e",
          qualified: "#1A6FA5",
          medium:    "#f59e0b",
          high:      "#f97316",
          critical:  "#ef4444",
        },
      },
      backgroundImage: {
        "page-bg":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(26,111,165,0.07) 0%, transparent 100%), linear-gradient(160deg, #0a1a28 0%, #0c1e30 50%, #0d2035 100%)",
        "sidebar-bg":
          "linear-gradient(180deg, rgba(10,26,40,0.99) 0%, rgba(10,24,38,0.99) 100%)",
        "card-gradient":
          "linear-gradient(145deg, rgba(11,28,44,0.65) 0%, rgba(10,22,38,0.72) 100%)",
        "brand-glow":
          "radial-gradient(ellipse at center, rgba(26,111,165,0.1) 0%, transparent 70%)",
        "hero-glow":
          "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(26,111,165,0.12) 0%, transparent 100%)",
      },
      boxShadow: {
        "glass":        "0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.02) inset",
        "glass-hover":  "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(26,111,165,0.14)",
        "brand-glow":   "0 0 24px rgba(26,111,165,0.3), 0 0 48px rgba(26,111,165,0.08)",
        "brand-glow-sm":"0 0 12px rgba(26,111,165,0.18)",
        "card":         "0 2px 12px rgba(0,0,0,0.35)",
        "metric":       "0 4px 20px rgba(0,0,0,0.4)",
        "btn":          "0 4px 14px rgba(26,111,165,0.35), 0 0 0 1px rgba(26,111,165,0.18)",
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
