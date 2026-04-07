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
import type { SiteLanguage } from "@/lib/site-language";

interface BenefitsGridProps {
  language?: SiteLanguage;
}

export default function BenefitsGrid({
  language = "hi",
}: BenefitsGridProps) {
  const copy = {
    hi: {
      eyebrow: "क्यों चुनें",
      title: "हम सौर काम को सरल और भरोसेमंद बनाते हैं",
      benefits: [
        {
          icon: BadgePercent,
          title: "सब्सिडी की पूरी सहायता",
          description:
            "ज़रूरी दस्तावेज मिलते ही पोर्टल आवेदन से मंजूरी तक पूरा क्रम हम संभालते हैं।",
        },
        {
          icon: IndianRupee,
          title: "वित्त सहायता फाइल में मदद",
          description:
            "90% तक की वित्त सहायता के लिए फाइल तैयार करने और आवेदन में हमारी टीम साथ रहती है।",
        },
        {
          icon: Wrench,
          title: "लोड पासिंग से मीटर परिवर्तन तक",
          description:
            "लोड पासिंग, स्थापना समन्वय और मीटर परिवर्तन का काम एक ही क्रम में पूरा होता है।",
        },
        {
          icon: ShieldCheck,
          title: "भरोसेमंद ब्रांड चयन",
          description:
            "पैनल, इन्वर्टर, बैटरी और जरूरी सामान परखी हुई ब्रांड श्रेणी से चुने जाते हैं।",
        },
        {
          icon: Clock3,
          title: "तेज़ अगला कदम",
          description:
            "पूछताछ मिलते ही व्हाट्सऐप और कॉल पर अगला साफ़ कदम जल्दी बताया जाता है।",
        },
      ],
    },
    en: {
      eyebrow: "Why Maa Sharda",
      title: "How we make solar projects simpler and more dependable",
      benefits: [
        {
          icon: BadgePercent,
          title: "End-to-end subsidy support",
          description:
            "Once the required documents are collected, we handle everything from portal filing to approvals.",
        },
        {
          icon: IndianRupee,
          title: "Financing file support",
          description:
            "For up to 90% financing, we help prepare the file and support the application process.",
        },
        {
          icon: Wrench,
          title: "From load passing to meter change",
          description:
            "Load passing, installation coordination, and meter change are handled as one connected workflow.",
        },
        {
          icon: ShieldCheck,
          title: "Reliable brand mix",
          description:
            "Panels, inverters, batteries, and accessories are planned from a tested brand mix.",
        },
        {
          icon: Clock3,
          title: "Fast follow-up",
          description:
            "After a lead comes in, we share the next clear step quickly on WhatsApp and call.",
        },
      ],
    },
  }[language];
  const { ref, inView } = useScrollAnimation();

  return (
    <section className="section-padding bg-cream">
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-500">
            {copy.eyebrow}
          </p>
          <h2 className="section-headline mt-3 text-green-900">{copy.title}</h2>
        </div>

        <motion.div
          ref={ref}
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-5"
          variants={staggerContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {copy.benefits.map((benefit) => {
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
