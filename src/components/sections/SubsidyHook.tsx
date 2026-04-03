"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { fadeUpVariants, useScrollAnimation } from "@/hooks/useScrollAnimation";

const steps = [
  "Documents hum collect karte hain",
  "Load passing aur file taiyar hum karte hain",
  "Portal filing aur UHBVN approval hum lete hain",
  "Installation aur meter change hum complete karte hain",
];

export default function SubsidyHook() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section className="section-padding bg-green-950 text-white">
      <div className="mx-auto max-w-7xl">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUpVariants}
          className="space-y-10"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-400">
              Subsidy Process
            </p>
            <h2 className="mt-4 text-3xl font-medium text-amber-400 md:text-5xl">
              आपको कुछ नहीं करना, हम सब संभालते हैं
            </h2>
          </div>

          <div className="relative grid gap-5 md:grid-cols-4 md:gap-8">
            <div className="absolute left-[12.5%] right-[12.5%] top-6 hidden h-px bg-white/15 md:block" />
            {steps.map((step, index) => (
              <div
                key={step}
                className="relative rounded-card border border-white/10 bg-white/5 p-5 md:bg-transparent md:p-0"
              >
                <div className="relative z-10 flex items-start gap-4 md:flex-col md:items-center md:text-center">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-500 text-lg font-medium text-white">
                    {index + 1}
                  </span>
                  <p className="pt-2 text-sm text-white/90 md:max-w-[220px] md:pt-4">
                    {step}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/subsidy" className="btn-primary inline-flex items-center justify-center">
              सब्सिडी जानकारी देखें
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
