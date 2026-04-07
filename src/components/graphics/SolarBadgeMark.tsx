import type { SVGProps } from "react";

interface SolarBadgeMarkProps extends SVGProps<SVGSVGElement> {
  tone?: "brand" | "light" | "badge";
}

const palettes = {
  brand: {
    background: "#F8F7F2",
    backgroundAccent: "#EAF4EC",
    panel: "#1B4332",
    panelAccent: "#2D6A4F",
    line: "#FFF8E7",
    roof: "#D97706",
    roofAccent: "#F59E0B",
    sun: "#F59E0B",
    sunAccent: "#FDE68A",
  },
  light: {
    background: "#1B4332",
    backgroundAccent: "#2D6A4F",
    panel: "#F8F7F2",
    panelAccent: "#EAF4EC",
    line: "#1B4332",
    roof: "#F59E0B",
    roofAccent: "#FDE68A",
    sun: "#F8B44C",
    sunAccent: "#FFF4CF",
  },
  badge: {
    background: "#F8F7F2",
    backgroundAccent: "#EAF4EC",
    panel: "#1B4332",
    panelAccent: "#2D6A4F",
    line: "#F8F7F2",
    roof: "#D97706",
    roofAccent: "#F8B44C",
    sun: "#D97706",
    sunAccent: "#FDE68A",
  },
} as const;

export default function SolarBadgeMark({
  tone = "brand",
  ...props
}: SolarBadgeMarkProps) {
  const palette = palettes[tone];

  return (
    <svg viewBox="0 0 96 96" fill="none" aria-hidden="true" {...props}>
      <circle cx="48" cy="48" r="48" fill={palette.background} />
      <circle cx="48" cy="48" r="40" fill={palette.backgroundAccent} />
      <circle cx="67" cy="28" r="11" fill={palette.sun} />
      <path
        d="M67 11v6M67 39v6M50 28h6M78 28h6M55.5 16.5l4.2 4.2M74.3 35.3l4.2 4.2M78.5 16.5l-4.2 4.2M59.7 35.3l-4.2 4.2"
        stroke={palette.sunAccent}
        strokeLinecap="round"
        strokeWidth="2.6"
      />
      <path
        d="M20 55.5L47 38L74 55.5"
        stroke={palette.roof}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4.5"
      />
      <path
        d="M47.5 38V22"
        stroke={palette.roofAccent}
        strokeLinecap="round"
        strokeWidth="3.5"
      />
      <rect
        x="23"
        y="55"
        width="50"
        height="22"
        rx="7"
        fill={palette.panel}
      />
      <path
        d="M31 55v22M40.5 55v22M50 55v22M59.5 55v22M24.5 63h47M24.5 70.5h47"
        stroke={palette.line}
        strokeLinecap="round"
        strokeWidth="2"
      />
      <path
        d="M18 70.5h6M72 70.5h6"
        stroke={palette.panelAccent}
        strokeLinecap="round"
        strokeWidth="3.5"
      />
      <circle cx="30" cy="28" r="4" fill={palette.panelAccent} />
      <path
        d="M30 18v4M30 34v4M20 28h4M36 28h4"
        stroke={palette.panelAccent}
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}
