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

interface CalculatorProps {
  showAdvancedFinancials?: boolean;
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
}: CalculatorProps) {
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
            Solar Savings Calculator
          </p>
          <h2 className="section-headline mt-3 text-green-900">
            अपने मासिक बिल से सोलर योजना देखें
          </h2>
          <p className="mt-4 text-neutral-600">
            Bas apna monthly bijli bill daliye. Hum aapko recommended system size,
            monthly generation, subsidy aur estimated system cost ka quick view dikhayenge.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(340px,420px)] md:items-start">
          <div className="card space-y-6">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-900">
                <CalculatorIcon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-xl font-medium text-green-900">मासिक बिल दर्ज करें</h3>
                <p className="text-sm text-neutral-600">Example: 2500, 4200, 6500</p>
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
                placeholder="Aapka monthly bijli bill"
                className="h-14 border-border bg-white pl-14 text-lg"
              />
            </div>

            <div className="rounded-card border border-border bg-green-100/40 p-5 text-sm text-neutral-700">
              <p className="font-medium text-green-900">Quick note</p>
              <p className="mt-2">
                DCR rooftop pricing aur practical generation assumption ke hisaab se
                estimate dikhaya ja raha hai. Final plan roof size aur sanctioned load
                ke hisaab se confirm hota hai.
              </p>
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
                      <h3 className="text-xl font-medium text-green-900">आपकी अनुमानित सोलर योजना</h3>
                      <p className="text-sm text-neutral-600">Indian number format me summary</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
                      <span className="text-sm text-neutral-600">Recommended system</span>
                      <span className="text-lg font-medium text-green-900">{result.systemKw} kW</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
                      <span className="text-sm text-neutral-600">Monthly generation</span>
                      <span className="font-medium text-green-900">
                        ~{formatIndianNumber(result.unitsPerMonth)} units
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
                      <span className="text-sm text-neutral-600">Monthly savings</span>
                      <span className="font-medium text-green-900">
                        Rs {formatIndianNumber(result.monthlySavings)}/month
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
                      <span className="text-sm text-neutral-600">Annual savings</span>
                      <span className="font-medium text-green-900">
                        Rs {formatIndianNumber(result.annualSavings)}/year
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
                      <span className="text-sm text-neutral-600">Govt. subsidy</span>
                      <span className="font-medium text-green-900">
                        {result.systemKw >= 3
                          ? `MAX - Rs ${formatIndianNumber(MAX_SUBSIDY)}`
                          : `Rs ${formatIndianNumber(result.subsidy)}`}
                      </span>
                    </div>
                    {showAdvancedFinancials ? (
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm text-neutral-600">Estimated system cost</span>
                        <span className="font-medium text-green-900">
                          Rs {formatIndianNumber(result.estimatedSystemCost)}
                        </span>
                      </div>
                    ) : null}
                  </div>

                  {result.systemKw >= 3 ? (
                    <p className="mt-5 rounded-card bg-amber-100 px-4 py-3 text-sm text-amber-900">
                      3kW ke baad subsidy nahi badhti - Rs 78,000 maximum cap hai.
                    </p>
                  ) : null}

                  <p className="mt-5 text-sm text-neutral-600">Up to 90% financing support available.*</p>

                  <button
                    type="button"
                    onClick={handleConsultationClick}
                    className="btn-primary mt-6 inline-flex items-center justify-center gap-2"
                  >
                    इस योजना के लिए मुफ्त परामर्श लें
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
                  <h3 className="text-xl font-medium text-green-900">रिज़ल्ट यहाँ दिखाई देगा</h3>
                  <p className="mt-3 text-sm text-neutral-600">
                    Jaise hi aap monthly bill enter karenge, system size, monthly generation
                    aur subsidy estimate yahin generate ho jayega.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
