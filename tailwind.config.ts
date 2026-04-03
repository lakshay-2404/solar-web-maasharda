import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        green: {
          950: "#0F2419",
          900: "#1B4332",
          800: "#2D6A4F",
          100: "#D8F3DC",
        },
        amber: {
          500: "#D97706",
          400: "#F59E0B",
          100: "#FEF3C7",
        },
        cream: "#FAFAF7",
        border: "#E5E0D8",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
      },
      fontSize: {
        "hero-mobile": ["36px", { lineHeight: "1.2", fontWeight: "500" }],
        "hero-desktop": ["56px", { lineHeight: "1.1", fontWeight: "500" }],
        "section-mobile": ["28px", { lineHeight: "1.3", fontWeight: "500" }],
        "section-desktop": ["40px", { lineHeight: "1.2", fontWeight: "500" }],
      },
      spacing: {
        section: "48px",
        "section-desktop": "96px",
      },
      borderRadius: {
        card: "12px",
        btn: "8px",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

export default config;
