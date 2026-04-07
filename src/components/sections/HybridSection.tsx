"use client";

import Image from "next/image";
import Link from "next/link";
import { BatteryCharging, HousePlus, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

import { fadeUpVariants, useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { SiteLanguage } from "@/lib/site-language";
import { withLanguagePath } from "@/lib/site-language";
import { SOLAR_STOCK_IMAGES } from "@/lib/solar-stock-images";

interface HybridSectionProps {
  language?: SiteLanguage;
}

export default function HybridSection({
  language = "hi",
}: HybridSectionProps) {
  const copy = {
    hi: {
      eyebrow: "हाइब्रिड सौर",
      title: "क्या बिल बचत के साथ बैकअप भी चाहिए?",
      description:
        "यदि बिजली कटने पर बैकअप भी चाहिए, तो हाइब्रिड प्रणाली सही दिशा हो सकती है। बैटरी चयन, इन्वर्टर का मेल और लोड योजना को हम एक ही प्रस्ताव में स्पष्ट रखते हैं।",
      cta: "हाइब्रिड विकल्प देखें",
      highlights: [
        {
          icon: BatteryCharging,
          title: "बैटरी बैकअप तैयार",
          description:
            "बार-बार बिजली कटने वाले घरों और दुकानों के लिए हाइब्रिड और बैटरी की संयुक्त योजना बनाई जाती है।",
        },
        {
          icon: HousePlus,
          title: "भविष्य में विस्तार के योग्य",
          description:
            "आज ऑन-ग्रिड और आगे चलकर बैटरी जोड़नी हो, तो डिजाइन उसी सोच के साथ तय किया जाता है।",
        },
        {
          icon: ShieldCheck,
          title: "ज़रूरी लोड पहले",
          description:
            "लाइट, वाई-फाई, सीसीटीवी, क्लिनिक उपकरण और दफ्तर की जरूरी चीजें बैकअप योजना में पहले शामिल की जाती हैं।",
        },
      ],
    },
    en: {
      eyebrow: "Hybrid Solar",
      title: "Need backup along with bill savings?",
      description:
        "If you also need backup during power cuts, a hybrid system may be the right direction. We simplify battery selection, inverter matching, and load planning into one proposal.",
      cta: "Explore hybrid options",
      highlights: [
        {
          icon: BatteryCharging,
          title: "Battery backup ready",
          description:
            "Hybrid plus battery planning for homes and shops facing frequent power cuts.",
        },
        {
          icon: HousePlus,
          title: "Future expansion friendly",
          description:
            "If you want on-grid today and battery support later, the design is planned accordingly.",
        },
        {
          icon: ShieldCheck,
          title: "Critical loads prioritised",
          description:
            "Lights, Wi-Fi, CCTV, clinic equipment, and office essentials are mapped into the backup strategy.",
        },
      ],
    },
  }[language];
  const { ref, inView } = useScrollAnimation();

  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-7xl">
        <motion.div
          ref={ref}
          className="grid gap-8 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUpVariants}
        >
          <div className="rounded-[28px] bg-green-950 p-8 text-white md:p-10">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-400">
              {copy.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-medium md:text-4xl">{copy.title}</h2>
            <p className="mt-4 text-white/75">{copy.description}</p>

            <div className="mt-8 overflow-hidden rounded-[24px] border border-white/10 bg-white/5">
              <div className="relative aspect-[16/11]">
                <Image
                  src={SOLAR_STOCK_IMAGES.rooftopWorkers.src}
                  alt={SOLAR_STOCK_IMAGES.rooftopWorkers.alt[language]}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 32vw, 100vw"
                />
              </div>
            </div>

            <Link
              href={withLanguagePath("/services/hybrid-systems", language)}
              className="btn-primary mt-8 inline-flex items-center justify-center"
            >
              {copy.cta}
            </Link>
          </div>

          <div className="grid gap-5">
            {copy.highlights.map((item) => {
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
