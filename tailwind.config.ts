import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hextech: {
          bg: "#010A13",
          surface: "#091428",
          card: "rgba(10, 20, 40, 0.85)",
          border: "#1E282D",
          gold: {
            DEFAULT: "#C8AA6E",
            light: "#F0E6D2",
            dark: "#785A28",
            accent: "#463714",
          },
          blue: {
            DEFAULT: "#0AC8B9",
            glow: "#005A82",
            deep: "#0397AB",
            dark: "#091428",
          },
          red: "#E84057",
          green: "#00BD9D",
          purple: "#A055FF",
        },
      },
      fontFamily: {
        serif: ["Cinzel", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        hextech: "0 0 15px rgba(200, 170, 110, 0.25)",
        "hextech-blue": "0 0 20px rgba(10, 200, 185, 0.3)",
        "hextech-inset": "inset 0 0 12px rgba(200, 170, 110, 0.15)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #F0E6D2 0%, #C8AA6E 50%, #785A28 100%)",
        "gold-border-gradient": "linear-gradient(to bottom, #C8AA6E, #785A28, #463714)",
        "hextech-gradient": "linear-gradient(180deg, #091428 0%, #010A13 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
