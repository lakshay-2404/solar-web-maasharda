import type { Metadata } from "next";

import { AboutPageContent, getAboutMetadata } from "@/app/about/page-content";

export const metadata: Metadata = getAboutMetadata("en");

export default function EnglishAboutPage() {
  return <AboutPageContent language="en" />;
}
