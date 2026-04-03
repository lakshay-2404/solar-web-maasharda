"use client";

import Link from "next/link";
import { BatteryCharging, HousePlus, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

import { fadeUpVariants, useScrollAnimation } from "@/hooks/useScrollAnimation";

const highlights = [
  {
    icon: BatteryCharging,
    title: "Battery backup ready",
    description:
      "Frequent power cuts wale homes aur shops ke liye hybrid + battery planning saath me.",
  },
  {
    icon: HousePlus,
    title: "Future expansion friendly",
    description:
      "Aaj on-grid aur kal battery add karna ho, system design uske hisaab se plan hota hai.",
  },
  {
    icon: ShieldCheck,
    title: "Critical loads prioritised",
    description:
      "Lights, Wi-Fi, CCTV, clinic equipment aur office essentials ko backup strategy ke saath map kiya jaata hai.",
  },
];

export default function HybridSection() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-7xl">
        <motion.div
          ref={ref}
          className="grid gap-8 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUpVariants}
        >
          <div className="rounded-[28px] bg-green-950 p-8 text-white md:p-10">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-400">
              Hybrid Solar
            </p>
            <h2 className="mt-4 text-3xl font-medium md:text-4xl">
              बिल बचत के साथ बैकअप भी चाहिए?
            </h2>
            <p className="mt-4 text-white/75">
              Agar aapko power cut ke time backup bhi chahiye to hybrid system sahi
              direction ho sakta hai. Battery selection, inverter matching aur load
              planning ko hum ek hi proposal me simplify karte hain.
            </p>

            <Link
              href="/services/hybrid-systems"
              className="btn-primary mt-8 inline-flex items-center justify-center"
            >
              हाइब्रिड विकल्प देखें
            </Link>
          </div>

          <div className="grid gap-5">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="card">
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-900">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="text-xl font-medium text-green-900">{item.title}</h3>
                      <p className="mt-2 text-sm text-neutral-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
