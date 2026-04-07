import type { SiteLanguage } from "@/lib/site-language";

import { SOLAR_STOCK_IMAGES } from "./solar-stock-images";

export interface HomeImageWallItem {
  src: string;
  alt: string;
  title: Record<SiteLanguage, string>;
}

export const HOME_IMAGE_WALL_ITEMS: HomeImageWallItem[] = [
  {
    src: SOLAR_STOCK_IMAGES.installationTeam.src,
    alt: SOLAR_STOCK_IMAGES.installationTeam.alt.en,
    title: {
      hi: "छत पर स्थापना",
      en: "Rooftop installation",
    },
  },
  {
    src: SOLAR_STOCK_IMAGES.houseRoof.src,
    alt: SOLAR_STOCK_IMAGES.houseRoof.alt.en,
    title: {
      hi: "घर की छत पर सौर",
      en: "Home rooftop solar",
    },
  },
  {
    src: SOLAR_STOCK_IMAGES.panelCloseup.src,
    alt: SOLAR_STOCK_IMAGES.panelCloseup.alt.en,
    title: {
      hi: "पैनल की गुणवत्ता",
      en: "Panel quality",
    },
  },
  {
    src: SOLAR_STOCK_IMAGES.rooftopWorkers.src,
    alt: SOLAR_STOCK_IMAGES.rooftopWorkers.alt.en,
    title: {
      hi: "स्थल पर काम करती टीम",
      en: "On-site installation team",
    },
  },
];

export const HOME_TESTIMONIAL_ITEMS: Record<
  SiteLanguage,
  { quote: string; label: string }[]
> = {
  hi: [
    {
      quote:
        "हमें ऐसी व्यवस्था चाहिए जो बिल भी घटाए और कागजी काम भी सरल रखे।",
      label: "सामान्य घरेलू आवश्यकता",
    },
    {
      quote:
        "क्लिनिक और दुकान के जरूरी लोड बिजली कटने पर भी चलते रहें, इसलिए बैकअप योजना जरूरी थी।",
      label: "सामान्य व्यावसायिक आवश्यकता",
    },
    {
      quote:
        "कोटेशन के साथ मंजूरी की प्रक्रिया भी साफ़ समझ आ जाए, यही सबसे बड़ी मदद होती है।",
      label: "पहली बार खरीदने वाले की चिंता",
    },
    {
      quote:
        "जल्दी जवाब और अगला साफ़ कदम मिलने से फैसला लेना आसान हो जाता है।",
      label: "सामान्य सेवा अपेक्षा",
    },
  ],
  en: [
    {
      quote:
        "We need a system that reduces the bill and keeps the paperwork simple.",
      label: "Typical household need",
    },
    {
      quote:
        "Critical clinic and shop loads should stay on during power cuts, so backup planning matters.",
      label: "Typical business need",
    },
    {
      quote:
        "The approval process should feel clear alongside the quotation.",
      label: "First-time buyer concern",
    },
    {
      quote:
        "Fast replies and a clear next step make the decision easier.",
      label: "Typical service expectation",
    },
  ],
};
