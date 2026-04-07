import type { SiteLanguage } from "@/lib/site-language";

interface SolarStockImage {
  src: string;
  alt: Record<SiteLanguage, string>;
  sourceLabel: string;
  sourceUrl: string;
}

export const SOLAR_STOCK_IMAGES = {
  installationTeam: {
    src: "/images/solar/installation-team.jpg",
    alt: {
      hi: "छत पर सोलर पैनल लगाती टीम",
      en: "A team installing solar panels on a rooftop",
    },
    sourceLabel: "Pexels",
    sourceUrl:
      "https://www.pexels.com/photo/solar-technicians-installing-solar-panels-8853536/",
  },
  rooftopWorkers: {
    src: "/images/solar/rooftop-workers.jpg",
    alt: {
      hi: "रूफटॉप सोलर पर काम करते तकनीशियन",
      en: "Technicians working across a rooftop solar installation",
    },
    sourceLabel: "Pexels",
    sourceUrl:
      "https://www.pexels.com/photo/solar-technicians-installing-solar-panels-6961120/",
  },
  houseRoof: {
    src: "/images/solar/house-roof.jpg",
    alt: {
      hi: "घर की छत पर लगे सोलर पैनल",
      en: "Solar panels installed on a house roof",
    },
    sourceLabel: "Pexels",
    sourceUrl:
      "https://www.pexels.com/photo/solar-panels-on-house-roof-17762230/",
  },
  panelCloseup: {
    src: "/images/solar/panel-closeup.jpg",
    alt: {
      hi: "सोलर पैनलों का क्लोज़-अप दृश्य",
      en: "A close-up view of solar panels",
    },
    sourceLabel: "Pexels",
    sourceUrl:
      "https://www.pexels.com/photo/close-up-of-solar-panels-15751136/",
  },
} satisfies Record<string, SolarStockImage>;
