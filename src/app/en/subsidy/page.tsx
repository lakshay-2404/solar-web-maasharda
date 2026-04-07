import type { Metadata } from "next";

import { getSubsidyMetadata, SubsidyPageContent } from "@/app/subsidy/page-content";

export const metadata: Metadata = getSubsidyMetadata("en");

export default function EnglishSubsidyPage() {
  return <SubsidyPageContent language="en" />;
}
