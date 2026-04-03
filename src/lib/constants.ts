export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

export const SUBSIDY_RATES = {
  1: 30000,
  2: 60000,
  3: 78000,
} as const;

export const MAX_SUBSIDY = 78000;

export const ELECTRICITY_RATE = 8;
export const UNITS_PER_KW_PER_MONTH = 140;
export const SELLBACK_RATE = 2;
export const DCR_SYSTEM_COST_PER_KW = 59333.33;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Calculator", href: "/calculator" },
  { label: "Subsidy", href: "/subsidy" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export const BRANDS = [
  "SunEnergy",
  "Luminous",
  "Adani Solar",
  "UTL",
  "Sukam",
  "Microtek",
  "LivSuper",
];

export const LEAD_CAPTURE_STORAGE_KEY = "maa-sharda-lead-prefill";
export const LEAD_CAPTURE_EVENT = "maa-sharda-lead-prefill-update";
