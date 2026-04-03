import type { Metadata } from "next";

import Calculator from "@/components/sections/Calculator";
import LeadCapture from "@/components/sections/LeadCapture";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  DCR_SYSTEM_COST_PER_KW,
  ELECTRICITY_RATE,
  MAX_SUBSIDY,
  UNITS_PER_KW_PER_MONTH,
} from "@/lib/constants";
import { calculate } from "@/lib/calculator";

export const metadata: Metadata = {
  title: "Solar Calculator | Maa Sharda Distributors",
  description:
    "Estimate solar system size, subsidy and practical savings based on your monthly electricity bill.",
};

const comparisonRows = [1, 3, 5, 10].map((systemSize) => {
  const monthlyBill = systemSize * ELECTRICITY_RATE * UNITS_PER_KW_PER_MONTH;
  return {
    systemSize,
    ...calculate({ monthlyBill }),
  };
});

function formatIndianNumber(value: number) {
  return value.toLocaleString("en-IN");
}

export default function CalculatorPage() {
  return (
    <div className="bg-cream">
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="max-w-4xl">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-500">
              Full Calculator
            </p>
            <h1 className="mt-4 text-4xl font-medium leading-tight text-green-900 md:text-6xl">
              अपने बिल के हिसाब से सही सिस्टम समझें
            </h1>
            <p className="mt-5 max-w-3xl text-lg text-neutral-600">
              Yeh calculator system sizing, subsidy aur estimated DCR rooftop cost ko
              easy format me dikhata hai.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Calculator showAdvancedFinancials />

      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-500">
              Size Comparison
            </p>
            <h2 className="section-headline mt-3 text-green-900">
              1kW से 10kW तक तुलना
            </h2>
            <p className="mt-4 text-neutral-600">
              DCR rooftop pricing reference around Rs {formatIndianNumber(DCR_SYSTEM_COST_PER_KW)} per kW
              aur subsidy cap Rs {formatIndianNumber(MAX_SUBSIDY)} ko dhyan me rakhkar.
            </p>
          </ScrollReveal>

          <div className="mt-8 overflow-x-auto rounded-card border border-border">
            <table className="min-w-[900px] w-full bg-white text-left text-sm">
              <thead className="bg-green-950 text-white">
                <tr>
                  <th className="px-4 py-4 font-medium">System Size</th>
                  <th className="px-4 py-4 font-medium">Units/Month</th>
                  <th className="px-4 py-4 font-medium">Monthly Savings</th>
                  <th className="px-4 py-4 font-medium">Annual Savings</th>
                  <th className="px-4 py-4 font-medium">Subsidy</th>
                  <th className="px-4 py-4 font-medium">Est. Cost</th>
                  <th className="px-4 py-4 font-medium">Post-Subsidy Cost</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr key={row.systemSize} className={index % 2 === 0 ? "bg-cream" : "bg-white"}>
                    <td className="px-4 py-4 font-medium text-green-900">{row.systemSize} kW</td>
                    <td className="px-4 py-4">{formatIndianNumber(row.unitsPerMonth)}</td>
                    <td className="px-4 py-4">Rs {formatIndianNumber(row.monthlySavings)}</td>
                    <td className="px-4 py-4">Rs {formatIndianNumber(row.annualSavings)}</td>
                    <td className="px-4 py-4">Rs {formatIndianNumber(row.subsidy)}</td>
                    <td className="px-4 py-4">Rs {formatIndianNumber(row.estimatedSystemCost)}</td>
                    <td className="px-4 py-4">Rs {formatIndianNumber(row.postSubsidyCost)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <LeadCapture
        source="calculator_page"
        heading="कैलकुलेटर के बाद अगला कदम लें"
        description="Hum aapke estimate ko actual roof conditions ke saath verify karke personalised plan bhej denge."
      />
    </div>
  );
}
