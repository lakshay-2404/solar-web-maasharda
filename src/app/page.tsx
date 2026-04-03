import type { Metadata } from "next";

import BenefitsGrid from "@/components/sections/BenefitsGrid";
import BrandsStrip from "@/components/sections/BrandsStrip";
import Calculator from "@/components/sections/Calculator";
import ExampleSystems from "@/components/sections/ExampleSystems";
import Hero from "@/components/sections/Hero";
import HybridSection from "@/components/sections/HybridSection";
import LeadCapture from "@/components/sections/LeadCapture";
import SubsidyHook from "@/components/sections/SubsidyHook";

export const metadata: Metadata = {
  title: "Solar Installation, Subsidy and Net Metering",
  description:
    "Documents collection, subsidy filing, UHBVN approvals, installation, meter change aur financing file support by Maa Sharda Distributors.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Calculator showAdvancedFinancials={false} />
      <ExampleSystems />
      <SubsidyHook />
      <HybridSection />
      <BenefitsGrid />
      <BrandsStrip />
      <LeadCapture />
    </>
  );
}
