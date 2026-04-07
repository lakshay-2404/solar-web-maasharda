"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CalculatorIcon, Wallet } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import {
  LEAD_CAPTURE_EVENT,
  LEAD_CAPTURE_STORAGE_KEY,
  MAX_SUBSIDY,
} from "@/lib/constants";
import { calculate, type CalculatorResult } from "@/lib/calculator";
import type { SiteLanguage } from "@/lib/site-language";

interface CalculatorProps {
  showAdvancedFinancials?: boolean;
  language?: SiteLanguage;
}

function formatIndianNumber(value: number) {
  return value.toLocaleString("en-IN");
}

function storeLeadPrefill(monthlyBill: string, systemSize: string) {
  const payload = { monthlyBill, systemSize };
  window.sessionStorage.setItem(LEAD_CAPTURE_STORAGE_KEY, JSON.stringify(payload));
  window.dispatchEvent(new CustomEvent(LEAD_CAPTURE_EVENT, { detail: payload }));
}

export default function Calculator({
  showAdvancedFinancials = false,
  language = "hi",
}: CalculatorProps) {
  const copy = {
    hi: {
      eyebrow: "सौर गणक",
      title: "अपने मासिक बिल से सही सौर योजना देखें",
      description:
        "अपना मासिक बिजली बिल दर्ज कीजिए। हम उपयुक्त क्षमता, संभावित मासिक उत्पादन, सब्सिडी और अनुमानित लागत दिखाएंगे।",
      inputTitle: "मासिक बिल दर्ज करें",
      inputExample: "उदाहरण: 2500, 4200, 6500",
      inputPlaceholder: "अपना मासिक बिजली बिल",
      quickNote: "ध्यान दें",
      quickDescription:
        "यह अनुमान DCR रूफटॉप लागत और व्यवहारिक उत्पादन मानों पर आधारित है। अंतिम योजना छत के आकार और स्वीकृत लोड के अनुसार तय होती है।",
      resultTitle: "आपकी अनुमानित सौर योजना",
      resultSubtitle: "भारतीय संख्या पद्धति में सारांश",
      recommendedSystem: "उपयुक्त प्रणाली",
      monthlyGeneration: "मासिक उत्पादन",
      monthlySavings: "मासिक बचत",
      annualSavings: "वार्षिक बचत",
      subsidy: "सरकारी सब्सिडी",
      estimatedCost: "अनुमानित कुल लागत",
      maxSubsidyNote: "3kW के बाद सब्सिडी नहीं बढ़ती। 78,000 रुपये इसकी अधिकतम सीमा है।",
      financeNote: "90% तक वित्त सहायता की फाइल में मदद उपलब्ध है।*",
      cta: "इस योजना के लिए निःशुल्क परामर्श लें",
      emptyTitle: "परिणाम यहां दिखाई देगा",
      emptyDescription:
        "जैसे ही आप मासिक बिल भरेंगे, उपयुक्त क्षमता, उत्पादन और सब्सिडी का अनुमान यहां दिखाई देगा।",
      perMonth: "/माह",
      perYear: "/वर्ष",
      units: "यूनिट",
      maxPrefix: "अधिकतम - रु ",
    },
    en: {
      eyebrow: "Solar Savings Calculator",
      title: "See the right solar plan from your monthly bill",
      description:
        "Enter your monthly electricity bill and we will show the recommended system size, monthly generation, subsidy, and estimated system cost.",
      inputTitle: "Enter your monthly bill",
      inputExample: "Example: 2500, 4200, 6500",
      inputPlaceholder: "Your monthly electricity bill",
      quickNote: "Quick note",
      quickDescription:
        "This estimate is based on DCR rooftop pricing and practical generation assumptions. The final plan is confirmed against roof size and sanctioned load.",
      resultTitle: "Your estimated solar plan",
      resultSubtitle: "Summary in Indian number format",
      recommendedSystem: "Recommended system",
      monthlyGeneration: "Monthly generation",
      monthlySavings: "Monthly savings",
      annualSavings: "Annual savings",
      subsidy: "Government subsidy",
      estimatedCost: "Estimated system cost",
      maxSubsidyNote: "Subsidy does not increase after 3kW. Rs 78,000 is the maximum cap.",
      financeNote: "Up to 90% financing file support available.*",
      cta: "Get a free consultation for this plan",
      emptyTitle: "Your result will appear here",
      emptyDescription:
        "As soon as you enter the monthly bill, the system size, monthly generation, and subsidy estimate will appear here.",
      perMonth: "/month",
      perYear: "/year",
      units: "units",
      maxPrefix: "MAX - Rs ",
    },
  }[language];
  const [monthlyBill, setMonthlyBill] = useState("");
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const handleChange = (value: string) => {
    setMonthlyBill(value);

    const numericValue = Number(value);
    if (Number.isFinite(numericValue) && numericValue > 0) {
      setResult(calculate({ monthlyBill: numericValue }));
      return;
    }

    setResult(null);
  };

  const handleConsultationClick = () => {
    if (!result) {
      return;
    }

    storeLeadPrefill(monthlyBill, String(result.systemKw));
    document.getElementById("lead-capture")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="section-padding bg-cream">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-500">
            {copy.eyebrow}
          </p>
          <h2 className="section-headline mt-3 text-green-900">{copy.title}</h2>
          <p className="mt-4 text-neutral-600">{copy.description}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(340px,420px)] md:items-start">
          <div className="card space-y-6">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-900">
                <CalculatorIcon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-xl font-medium text-green-900">{copy.inputTitle}</h3>
                <p className="text-sm text-neutral-600">{copy.inputExample}</p>
              </div>
            </div>

            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg font-medium text-green-900">
                Rs
              </span>
              <Input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                value={monthlyBill}
                onChange={(event) => handleChange(event.target.value)}
                placeholder={copy.inputPlaceholder}
                className="h-14 border-border bg-white pl-14 text-lg"
              />
            </div>

            <div className="rounded-card border border-border bg-green-100/40 p-5 text-sm text-neutral-700">
              <p className="font-medium text-green-900">{copy.quickNote}</p>
              <p className="mt-2">{copy.quickDescription}</p>
            </div>
          </div>

          <div className="md:sticky md:top-28">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="card border-green-900/10 bg-white"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-500">
                      <Wallet className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="text-xl font-medium text-green-900">{copy.resultTitle}</h3>
                      <p className="text-sm text-neutral-600">{copy.resultSubtitle}</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
                      <span className="text-sm text-neutral-600">{copy.recommendedSystem}</span>
                      <span className="text-lg font-medium text-green-900">
                        {result.systemKw} kW
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
                      <span className="text-sm text-neutral-600">{copy.monthlyGeneration}</span>
                      <span className="font-medium text-green-900">
                        ~{formatIndianNumber(result.unitsPerMonth)} {copy.units}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
                      <span className="text-sm text-neutral-600">{copy.monthlySavings}</span>
                      <span className="font-medium text-green-900">
                        Rs {formatIndianNumber(result.monthlySavings)}
                        {copy.perMonth}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
                      <span className="text-sm text-neutral-600">{copy.annualSavings}</span>
                      <span className="font-medium text-green-900">
                        Rs {formatIndianNumber(result.annualSavings)}
                        {copy.perYear}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
                      <span className="text-sm text-neutral-600">{copy.subsidy}</span>
                      <span className="font-medium text-green-900">
                        {result.systemKw >= 3
                          ? `${copy.maxPrefix}${formatIndianNumber(MAX_SUBSIDY)}`
                          : `Rs ${formatIndianNumber(result.subsidy)}`}
                      </span>
                    </div>
                    {showAdvancedFinancials ? (
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm text-neutral-600">{copy.estimatedCost}</span>
                        <span className="font-medium text-green-900">
                          Rs {formatIndianNumber(result.estimatedSystemCost)}
                        </span>
                      </div>
                    ) : null}
                  </div>

                  {result.systemKw >= 3 ? (
                    <p className="mt-5 rounded-card bg-amber-100 px-4 py-3 text-sm text-amber-900">
                      {copy.maxSubsidyNote}
                    </p>
                  ) : null}

                  <p className="mt-5 text-sm text-neutral-600">{copy.financeNote}</p>

                  <button
                    type="button"
                    onClick={handleConsultationClick}
                    className="btn-primary mt-6 inline-flex items-center justify-center gap-2"
                  >
                    {copy.cta}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="card border-dashed border-border bg-white/70"
                >
                  <h3 className="text-xl font-medium text-green-900">{copy.emptyTitle}</h3>
                  <p className="mt-3 text-sm text-neutral-600">{copy.emptyDescription}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
