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
          orange: "#FE7F32",
          "orange-dark": "#E06A20",
          blue: "#294C72",
          dark: "#1A2F45",
          light: "#F8F4EF",
          subtle: "#6B7280",
          success: "#22C55E",
          danger: "#EF4444",
        },
      },
      fontFamily: {
        display: ["Astonpoliz", "Georgia", "serif"],
        body: ["Avec", "Inter", "system-ui", "sans-serif"],
        sans: ["Avec", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
