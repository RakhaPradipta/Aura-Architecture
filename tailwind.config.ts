import type { Config } from "tailwindcss";

/** Cyanotype / drafting-paper palette for an architecture studio. */
const ink = {
  50: "#f5f7f9",
  100: "#e6ebf0",
  200: "#ccd6de",
  300: "#a9b8c4",
  400: "#7f93a3",
  500: "#5a6f80",
  600: "#4f6374",
  700: "#415261",
  800: "#2f3d49",
  900: "#1e2933",
  950: "#0b1926",
};

/** Blueprint accent — cyanotype blue. 400/300 glow on dark, 600 reads on paper. */
const blueprint = {
  50: "#f0f8fe",
  100: "#dceffc",
  200: "#bfe4fa",
  300: "#93d2f5",
  400: "#5fb6ea",
  500: "#2f8fd0",
  600: "#1e74b8",
  700: "#1a5e97",
  800: "#1c4e7d",
  900: "#1b4167",
  950: "#122b47",
};

/** Brass — classical architectural metal: keystones, plaques, inlay. */
const brass = {
  100: "#faf3e3",
  200: "#f2e3c0",
  300: "#e8cf95",
  400: "#dcb86a",
  500: "#c9a86a",
  600: "#b08d4f",
  700: "#8a6d3c",
  800: "#6b5430",
  900: "#4a3a22",
};

/** Travertine / stone surfaces */
const travertine = {
  100: "#faf8f3",
  200: "#f1ece1",
  300: "#e3d9c6",
  400: "#d0c0a3",
};
const clay = {
  50: "#fbf5f0",
  100: "#f6e8dd",
  200: "#ecd3bf",
  300: "#ddb595",
  400: "#cc9670",
  500: "#b97c51",
  600: "#a0643f",
  700: "#834f33",
  800: "#6a412c",
  900: "#563627",
  950: "#2e1b14",
};

/** Sage — context & nature. */
const sage = {
  50: "#f2f6f2",
  100: "#e0e9e1",
  200: "#c3d4c6",
  300: "#9db8a1",
  400: "#74977a",
  500: "#557c5c",
  600: "#416348",
  700: "#354f3b",
  800: "#2d4031",
  900: "#273529",
  950: "#131c15",
};

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink,
        blueprint,
        brass,
        travertine,
        clay,
        sage,
        /** Drafting vellum — the light page surface. */
        paper: "#F2F0EA",
        /** Alternating section surface, a half-shade cooler. */
        ash: "#E7E3DA",
        /** Deep basalt for monumental dark surfaces */
        basalt: "#0E141B",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.8s ease-out forwards",
        "slide-in-left": "slideInLeft 0.8s ease-out forwards",
        "draw-line": "drawLine 1.1s cubic-bezier(0.25,0.4,0.25,1) forwards",
        "scan-line": "scanLine 6s linear infinite",
        "float-slow": "floatSlow 7s ease-in-out infinite",
        "float-slower": "floatSlow 11s ease-in-out infinite",
        "spin-slower": "spin 28s linear infinite",
        "marquee": "marquee 32s linear infinite",
        "rise": "rise 0.9s cubic-bezier(0.22,1,0.36,1) forwards",
        "brass-shimmer": "brassShimmer 5s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        drawLine: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        scanLine: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(44px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        brassShimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
