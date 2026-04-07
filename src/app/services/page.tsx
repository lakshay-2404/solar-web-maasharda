import type { Metadata } from "next";

import { getServicesMetadata, ServicesPageContent } from "./page-content";

export const metadata: Metadata = getServicesMetadata("hi");

export default function ServicesPage() {
  return <ServicesPageContent language="hi" />;
}
