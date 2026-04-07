import type { Metadata } from "next";

import { getServicesMetadata, ServicesPageContent } from "@/app/services/page-content";

export const metadata: Metadata = getServicesMetadata("en");

export default function EnglishServicesPage() {
  return <ServicesPageContent language="en" />;
}
