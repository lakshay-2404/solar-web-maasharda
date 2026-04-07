import type { Metadata } from "next";

import { getHomeMetadata, HomePageContent } from "./page-content";

export const metadata: Metadata = getHomeMetadata("hi");

export default function HomePage() {
  return <HomePageContent language="hi" />;
}
