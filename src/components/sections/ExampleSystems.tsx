"use client";

import { motion } from "framer-motion";

import {
  fadeUpVariants,
  staggerContainerVariants,
  useScrollAnimation,
} from "@/hooks/useScrollAnimation";
import { calculate } from "@/lib/calculator";
import { SUBSIDY_RATES } from "@/lib/constants";

const referenceSystems = [
  {
    size: "1kW",
    badge: "Starter",
    description: "Small homes, light daytime load, and fastest low-budget entry.",
    result: calculate({ monthlyBill: 1120 }),
    subsidy: SUBSIDY_RATES[1],
  },
  {
    size: "3kW",
    badge: "Most Popular",
    description: "Ideal for family homes with fans, fridge aur daytime appliances.",
    result: calculate({ monthlyBill: 3360 }),
    subsidy: SUBSIDY_RATES[3],
    featured: true,
  },
  {
    size: "5kW",
    badge: "High Savings",
    description: "Best when AC load, bigger households, or mixed residential-commercial use is involved.",
    result: calculate({ monthlyBill: 5600 }),
    subsidy: SUBSIDY_RATES[3],
  },
];

function formatIndianNumber(value: number) {
  return value.toLocaleString("en-IN");
}

export default function ExampleSystems() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section className="section-padding bg-green-950 text-white">
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-400">
            Example Systems
          </p>
          <h2 className="section-headline mt-3">लोकप्रिय रूफटॉप सोलर साइज</h2>
          <p className="mt-4 text-white/75">
            Yeh reference plans aapko pricing aur subsidy ka quick idea dete hain.
            Final proposal roof size, meter type, aur sanctioned load ke basis par confirm hota hai.
          </p>
        </div>

        <motion.div
          ref={ref}
          className="grid gap-6 md:grid-cols-3"
          variants={staggerContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {referenceSystems.map((system) => (
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
                    Most Popular
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
                    Monthly generation
                  </span>
                  <span className="font-medium">
                    ~{formatIndianNumber(system.result.unitsPerMonth)} units
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className={system.featured ? "text-neutral-600" : "text-white/65"}>
                    Monthly savings
                  </span>
                  <span className="font-medium">Rs {formatIndianNumber(system.result.monthlySavings)}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className={system.featured ? "text-neutral-600" : "text-white/65"}>
                    Subsidy
                  </span>
                  <span className="font-medium">Rs {formatIndianNumber(system.subsidy)}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className={system.featured ? "text-neutral-600" : "text-white/65"}>
                    Subsidy ke baad budget
                  </span>
                  <span className="font-medium">
                    Rs {formatIndianNumber(system.result.postSubsidyCost)}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
