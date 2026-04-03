"use client";

import {
  BadgePercent,
  Clock3,
  IndianRupee,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { motion } from "framer-motion";

import {
  fadeUpVariants,
  staggerContainerVariants,
  useScrollAnimation,
} from "@/hooks/useScrollAnimation";

const benefits = [
  {
    icon: BadgePercent,
    title: "सब्सिडी end-to-end",
    description: "Required documents lene ke baad portal filing se approval tak poora kaam hum sambhalte hain.",
  },
  {
    icon: IndianRupee,
    title: "फाइनेंसिंग file support",
    description: "Up to 90% financing ke liye file ready karke application support humari side se hota hai.",
  },
  {
    icon: Wrench,
    title: "लोड पासिंग से meter change",
    description: "Load passing, installation coordination aur meter change ek connected workflow me handle hota hai.",
  },
  {
    icon: ShieldCheck,
    title: "विश्वसनीय ब्रांड",
    description: "Panels, inverters, batteries aur accessories tested brand mix se plan kiye jaate hain.",
  },
  {
    icon: Clock3,
    title: "तेज़ follow-up",
    description: "Lead aane ke baad WhatsApp aur call par clear next step jaldi share kiya jaata hai.",
  },
];

export default function BenefitsGrid() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section className="section-padding bg-cream">
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-500">
            Why Maa Sharda
          </p>
          <h2 className="section-headline mt-3 text-green-900">
            सोलर प्रोजेक्ट को सरल और भरोसेमंद बनाने का तरीका
          </h2>
        </div>

        <motion.div
          ref={ref}
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-5"
          variants={staggerContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <motion.article key={benefit.title} variants={fadeUpVariants} className="card">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-900">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-medium text-green-900">{benefit.title}</h3>
                <p className="mt-3 text-sm text-neutral-600">{benefit.description}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
