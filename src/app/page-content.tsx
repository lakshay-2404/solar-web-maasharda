import type { Metadata } from "next";

import BenefitsGrid from "@/components/sections/BenefitsGrid";
import BrandsStrip from "@/components/sections/BrandsStrip";
import Calculator from "@/components/sections/Calculator";
import ExampleSystems from "@/components/sections/ExampleSystems";
import Hero from "@/components/sections/Hero";
import HomeImageWall from "@/components/sections/HomeImageWall";
import HybridSection from "@/components/sections/HybridSection";
import LeadCapture from "@/components/sections/LeadCapture";
import SubsidyHook from "@/components/sections/SubsidyHook";
import TestimonialsMarquee from "@/components/sections/TestimonialsMarquee";
import { ENABLE_HOME_COMMUNITY_SECTIONS } from "@/lib/feature-flags";
import type { SiteLanguage } from "@/lib/site-language";

export function getHomeMetadata(language: SiteLanguage): Metadata {
  if (language === "en") {
    return {
      title: "Solar Installation, Subsidy and Net Metering",
      description:
        "Document collection, subsidy filing, UHBVN approvals, installation, meter change, and financing file support by Maa Sharda Distributors.",
    };
  }

  return {
    title: "सोलर इंस्टॉलेशन, सब्सिडी और नेट मीटरिंग",
    description:
      "दस्तावेज़ संग्रह, सब्सिडी फाइलिंग, UHBVN approval, इंस्टॉलेशन, मीटर बदलने और financing file support के लिए Maa Sharda Distributors के साथ जुड़ें।",
  };
}

interface HomePageContentProps {
  language?: SiteLanguage;
}

export function HomePageContent({
  language = "hi",
}: HomePageContentProps) {
  return (
    <>
      <Hero language={language} />
      <Calculator language={language} showAdvancedFinancials={false} />
      {ENABLE_HOME_COMMUNITY_SECTIONS ? (
        <>
          <HomeImageWall language={language} />
          <TestimonialsMarquee language={language} />
        </>
      ) : null}
      <ExampleSystems language={language} />
      <SubsidyHook language={language} />
      <HybridSection language={language} />
      <BenefitsGrid language={language} />
      <BrandsStrip language={language} />
      <LeadCapture language={language} />
    </>
  );
}
