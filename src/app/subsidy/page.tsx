import type { Metadata } from "next";

import { getSubsidyMetadata, SubsidyPageContent } from "./page-content";

export const metadata: Metadata = getSubsidyMetadata("hi");

export default function SubsidyPage() {
  return <SubsidyPageContent language="hi" />;
}
