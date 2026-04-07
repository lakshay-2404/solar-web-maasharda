import type { Metadata } from "next";

import { getHomeMetadata, HomePageContent } from "@/app/page-content";

export const metadata: Metadata = getHomeMetadata("en");

export default function EnglishHomePage() {
  return <HomePageContent language="en" />;
}
