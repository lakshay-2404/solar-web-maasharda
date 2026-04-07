import type { Metadata } from "next";

import {
  CalculatorPageContent,
  getCalculatorMetadata,
} from "@/app/calculator/page-content";

export const metadata: Metadata = getCalculatorMetadata("en");

export default function EnglishCalculatorPage() {
  return <CalculatorPageContent language="en" />;
}
