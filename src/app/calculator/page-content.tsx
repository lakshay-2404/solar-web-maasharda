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
import type { SiteLanguage } from "@/lib/site-language";

export function getCalculatorMetadata(language: SiteLanguage): Metadata {
  return language === "en"
    ? {
        title: "Solar Calculator | Maa Sharda Distributors",
        description:
          "Estimate solar system size, subsidy, and practical savings based on your monthly electricity bill.",
      }
    : {
        title: "सौर गणक | Maa Sharda Distributors",
        description:
          "अपने मासिक बिजली बिल के आधार पर सौर प्रणाली की क्षमता, सब्सिडी और संभावित बचत का अनुमान लगाइए।",
      };
}

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

interface CalculatorPageContentProps {
  language?: SiteLanguage;
}

export function CalculatorPageContent({
  language = "hi",
}: CalculatorPageContentProps) {
  const copy = {
    hi: {
      eyebrow: "पूरा गणक",
      title: "अपने बिल के हिसाब से सही सौर प्रणाली समझें",
      description:
        "यह गणक प्रणाली की क्षमता, सब्सिडी और अनुमानित DCR रूफटॉप लागत को आसान रूप में दिखाता है।",
      comparisonEyebrow: "क्षमता तुलना",
      comparisonTitle: "1kW से 10kW तक तुलना",
      comparisonText: `यह तुलना लगभग Rs ${formatIndianNumber(
        DCR_SYSTEM_COST_PER_KW
      )} प्रति kW की DCR रूफटॉप कीमत और Rs ${formatIndianNumber(
        MAX_SUBSIDY
      )} की अधिकतम सब्सिडी को ध्यान में रखकर बनाई गई है।`,
      leadHeading: "गणक के बाद अगला कदम लें",
      leadDescription:
        "हम आपके अनुमान को वास्तविक छत की स्थिति के साथ मिलाकर व्यक्तिगत योजना भेजेंगे।",
      tableHeaders: [
        "प्रणाली क्षमता",
        "मासिक यूनिट",
        "मासिक बचत",
        "वार्षिक बचत",
        "सब्सिडी",
        "अनुमानित खर्च",
        "सब्सिडी के बाद खर्च",
      ],
    },
    en: {
      eyebrow: "Full Calculator",
      title: "Understand the right system from your bill",
      description:
        "This calculator shows system sizing, subsidy, and estimated DCR rooftop cost in a simple format.",
      comparisonEyebrow: "Size Comparison",
      comparisonTitle: "Comparison from 1kW to 10kW",
      comparisonText: `Using a DCR rooftop pricing reference of around Rs ${formatIndianNumber(
        DCR_SYSTEM_COST_PER_KW
      )} per kW and a subsidy cap of Rs ${formatIndianNumber(MAX_SUBSIDY)}.`,
      leadHeading: "Take the next step after the calculator",
      leadDescription:
        "We will verify your estimate against actual roof conditions and send a personalised plan.",
      tableHeaders: [
        "System Size",
        "Units/Month",
        "Monthly Savings",
        "Annual Savings",
        "Subsidy",
        "Est. Cost",
        "Post-Subsidy Cost",
      ],
    },
  }[language];

  return (
    <div className="bg-cream">
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="max-w-4xl">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-500">
              {copy.eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-medium leading-tight text-green-900 md:text-6xl">
              {copy.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg text-neutral-600">
              {copy.description}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Calculator language={language} showAdvancedFinancials />

      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-500">
              {copy.comparisonEyebrow}
            </p>
            <h2 className="section-headline mt-3 text-green-900">
              {copy.comparisonTitle}
            </h2>
            <p className="mt-4 text-neutral-600">{copy.comparisonText}</p>
          </ScrollReveal>

          <div className="mt-8 overflow-x-auto rounded-card border border-border">
            <table className="min-w-[900px] w-full bg-white text-left text-sm">
              <thead className="bg-green-950 text-white">
                <tr>
                  {copy.tableHeaders.map((header) => (
                    <th key={header} className="px-4 py-4 font-medium">
                      {header}
                    </th>
                  ))}
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
        language={language}
        source="calculator_page"
        heading={copy.leadHeading}
        description={copy.leadDescription}
      />
    </div>
  );
}
