import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
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
        heading: ["var(--font-poppins)", "sans-serif"],
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
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        card: "12px",
        btn: "8px",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

export default config;
