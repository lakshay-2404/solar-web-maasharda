import type { Metadata } from "next";

import { AboutPageContent, getAboutMetadata } from "./page-content";

export const metadata: Metadata = getAboutMetadata("hi");

export default function AboutPage() {
  return <AboutPageContent language="hi" />;
}
