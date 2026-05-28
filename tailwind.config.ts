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
        hubbs: {
          primary: "#F97316",
          dark: "#0F172A",
          card: "#1E293B",
          text: "#F8FAFC",
          subtle: "#94A3B8",
          success: "#22C55E",
          danger: "#EF4444",
          purple: "#8B5CF6",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
