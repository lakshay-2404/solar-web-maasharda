import type { SiteLanguage } from "@/lib/site-language";

export const APP_NAME = "Maa Sharda";
export const APP_BUSINESS_NAME = "Maa Sharda Distributors";
export const APP_THEME_COLOR = "#1B4332";
export const APP_BACKGROUND_COLOR = "#FAFAF7";

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
export const DEFAULT_WHATSAPP_NUMBER = "919355570048";
export const CONTACT_PHONE_HREF = "tel:+919355570048";
export const CONTACT_PHONE_DISPLAY = "+91 93555 70048";
export const CONTACT_ADDRESS = "Yamunanagar, Haryana";
export const BUSINESS_HOURS = "Mon-Sat, 9am-7pm";
export const BUSINESS_HOURS_LABEL: Record<SiteLanguage, string> = {
  hi: "सोमवार से शनिवार, सुबह 9 बजे से शाम 7 बजे तक",
  en: BUSINESS_HOURS,
};

export const APP_TAGLINE: Record<SiteLanguage, string> = {
  hi: "सोलर, सब्सिडी और नेट मीटरिंग सहायता",
  en: "Solar, subsidy, and net metering support",
};

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

const PRIMARY_NAV_LINKS: Record<
  SiteLanguage,
  { label: string; href: string }[]
> = {
  hi: [
    { label: "मुखपृष्ठ", href: "/" },
    { label: "सौर गणक", href: "/calculator" },
    { label: "सेवाएं", href: "/services" },
    { label: "लेख", href: "/blog" },
  ],
  en: [
    { label: "Home", href: "/" },
    { label: "Calculator", href: "/calculator" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
  ],
};

const SECONDARY_NAV_LINKS: Record<
  SiteLanguage,
  { label: string; href: string }[]
> = {
  hi: [
    { label: "सब्सिडी", href: "/subsidy" },
    { label: "परिचय", href: "/about" },
  ],
  en: [
    { label: "Subsidy", href: "/subsidy" },
    { label: "About", href: "/about" },
  ],
};

export function getPrimaryNavLinks(language: SiteLanguage) {
  return PRIMARY_NAV_LINKS[language];
}

export function getSecondaryNavLinks(language: SiteLanguage) {
  return SECONDARY_NAV_LINKS[language];
}

export function getNavLinks(language: SiteLanguage) {
  return [
    getPrimaryNavLinks(language)[0],
    getPrimaryNavLinks(language)[1],
    getSecondaryNavLinks(language)[0],
    getPrimaryNavLinks(language)[2],
    getPrimaryNavLinks(language)[3],
    getSecondaryNavLinks(language)[1],
  ];
}

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
