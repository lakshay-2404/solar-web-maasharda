"use client";

import { motion } from "framer-motion";

import {
  fadeUpVariants,
  staggerContainerVariants,
  useScrollAnimation,
} from "@/hooks/useScrollAnimation";
import { calculate } from "@/lib/calculator";
import { SUBSIDY_RATES } from "@/lib/constants";
import type { SiteLanguage } from "@/lib/site-language";

interface ExampleSystemsProps {
  language?: SiteLanguage;
}

const systemResults = {
  "1kW": calculate({ monthlyBill: 1120 }),
  "3kW": calculate({ monthlyBill: 3360 }),
  "5kW": calculate({ monthlyBill: 5600 }),
};

function formatIndianNumber(value: number) {
  return value.toLocaleString("en-IN");
}

export default function ExampleSystems({
  language = "hi",
}: ExampleSystemsProps) {
  const copy = {
    hi: {
      eyebrow: "उदाहरण योजनाएं",
      title: "लोकप्रिय रूफटॉप सौर क्षमताएं",
      description:
        "ये उदाहरण आपको लागत और सब्सिडी का सीधा अंदाज़ा देते हैं। अंतिम प्रस्ताव छत के आकार, मीटर के प्रकार और स्वीकृत लोड के अनुसार तय होता है।",
      systems: [
        {
          size: "1kW",
          badge: "शुरुआत",
          description: "छोटे घर, हल्के दिन के लोड और कम खर्च में शुरुआत के लिए।",
          subsidy: SUBSIDY_RATES[1],
        },
        {
          size: "3kW",
          badge: "सबसे लोकप्रिय",
          description: "ऐसे परिवारों के लिए उपयुक्त जहां पंखे, फ्रिज और दिन के सामान्य उपकरण चलते हों।",
          subsidy: SUBSIDY_RATES[3],
          featured: true,
        },
        {
          size: "5kW",
          badge: "अधिक बचत",
          description: "जब एसी लोड, बड़ा परिवार या मिला-जुला उपयोग हो, तब यह क्षमता उपयोगी रहती है।",
          subsidy: SUBSIDY_RATES[3],
        },
      ],
      mostPopular: "सबसे लोकप्रिय",
      monthlyGeneration: "मासिक उत्पादन",
      monthlySavings: "मासिक बचत",
      subsidy: "सब्सिडी",
      postBudget: "सब्सिडी के बाद खर्च",
      units: "यूनिट",
    },
    en: {
      eyebrow: "Example Systems",
      title: "Popular rooftop solar sizes",
      description:
        "These reference plans give a quick idea of pricing and subsidy. The final proposal is confirmed based on roof size, meter type, and sanctioned load.",
      systems: [
        {
          size: "1kW",
          badge: "Starter",
          description: "For small homes, light daytime loads, and the fastest low-budget entry.",
          subsidy: SUBSIDY_RATES[1],
        },
        {
          size: "3kW",
          badge: "Most Popular",
          description: "Ideal for family homes with fans, a fridge, and steady daytime appliances.",
          subsidy: SUBSIDY_RATES[3],
          featured: true,
        },
        {
          size: "5kW",
          badge: "High Savings",
          description: "Best when AC load, bigger households, or mixed usage is involved.",
          subsidy: SUBSIDY_RATES[3],
        },
      ],
      mostPopular: "Most Popular",
      monthlyGeneration: "Monthly generation",
      monthlySavings: "Monthly savings",
      subsidy: "Subsidy",
      postBudget: "Post-subsidy budget",
      units: "units",
    },
  }[language];
  const { ref, inView } = useScrollAnimation();

  return (
    <section className="section-padding bg-green-950 text-white">
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-400">
            {copy.eyebrow}
          </p>
          <h2 className="section-headline mt-3">{copy.title}</h2>
          <p className="mt-4 text-white/75">{copy.description}</p>
        </div>

        <motion.div
          ref={ref}
          className="grid gap-6 md:grid-cols-3"
          variants={staggerContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {copy.systems.map((system) => {
            const result = systemResults[system.size as keyof typeof systemResults];
            return (
              <motion.article
                key={system.size}
                variants={fadeUpVariants}
                className={`rounded-[24px] border p-6 ${
                  system.featured
                    ? "border-amber-400 bg-white text-green-900 shadow-[0_20px_50px_rgba(245,158,11,0.18)]"
                    : "border-white/10 bg-white/5 text-white"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p
                      className={`text-xs font-medium uppercase tracking-[0.16em] ${
                        system.featured ? "text-amber-500" : "text-white/55"
                      }`}
                    >
                      {system.badge}
                    </p>
                    <h3 className="mt-2 text-3xl font-medium">{system.size}</h3>
                  </div>
                  {system.featured ? (
                    <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-white">
                      {copy.mostPopular}
                    </span>
                  ) : null}
                </div>

                <p
                  className={`mt-4 text-sm ${
                    system.featured ? "text-neutral-600" : "text-white/75"
                  }`}
                >
                  {system.description}
                </p>

                <div
                  className={`mt-6 space-y-3 rounded-card border p-4 ${
                    system.featured
                      ? "border-border bg-cream"
                      : "border-white/10 bg-black/10"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className={system.featured ? "text-neutral-600" : "text-white/65"}>
                      {copy.monthlyGeneration}
                    </span>
                    <span className="font-medium">
                      ~{formatIndianNumber(result.unitsPerMonth)} {copy.units}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className={system.featured ? "text-neutral-600" : "text-white/65"}>
                      {copy.monthlySavings}
                    </span>
                    <span className="font-medium">
                      Rs {formatIndianNumber(result.monthlySavings)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className={system.featured ? "text-neutral-600" : "text-white/65"}>
                      {copy.subsidy}
                    </span>
                    <span className="font-medium">Rs {formatIndianNumber(system.subsidy)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className={system.featured ? "text-neutral-600" : "text-white/65"}>
                      {copy.postBudget}
                    </span>
                    <span className="font-medium">
                      Rs {formatIndianNumber(result.postSubsidyCost)}
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
