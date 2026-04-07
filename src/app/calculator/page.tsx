import type { Metadata } from "next";

import { CalculatorPageContent, getCalculatorMetadata } from "./page-content";

export const metadata: Metadata = getCalculatorMetadata("hi");

export default function CalculatorPage() {
  return <CalculatorPageContent language="hi" />;
}
