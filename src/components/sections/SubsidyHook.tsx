"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { fadeUpVariants, useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { SiteLanguage } from "@/lib/site-language";
import { withLanguagePath } from "@/lib/site-language";
import { SOLAR_STOCK_IMAGES } from "@/lib/solar-stock-images";

interface SubsidyHookProps {
  language?: SiteLanguage;
}

export default function SubsidyHook({
  language = "hi",
}: SubsidyHookProps) {
  const copy = {
    hi: {
      eyebrow: "सब्सिडी प्रक्रिया",
      title: "आपको पोर्टल और मंजूरी के चक्कर खुद नहीं लगाने पड़ते",
      description:
        "कागजी काम, लोड पासिंग, पोर्टल आवेदन, मंजूरी के अनुसरण और मीटर परिवर्तन का क्रम हम संभालते हैं, इसलिए अगला कदम साफ़ रहता है।",
      steps: [
        "ज़रूरी दस्तावेज हम एकत्र करते हैं",
        "लोड पासिंग और फाइल तैयारी हम संभालते हैं",
        "पोर्टल आवेदन और UHBVN मंजूरी का अनुसरण हम करते हैं",
        "स्थापना और मीटर परिवर्तन हम पूरा करवाते हैं",
      ],
      cta: "सब्सिडी मार्गदर्शिका देखें",
    },
    en: {
      eyebrow: "Subsidy Process",
      title: "You do not have to run around portals and approvals",
      description:
        "We handle paperwork, load passing, portal filing, approval follow-up, and meter change in sequence, so the next step stays clear for the customer.",
      steps: [
        "We collect the documents",
        "We handle load passing and file preparation",
        "We manage portal filing and UHBVN approval",
        "We complete installation and meter change",
      ],
      cta: "See subsidy guide",
    },
  }[language];
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
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-400">
                {copy.eyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-medium text-amber-300 md:text-5xl">
                {copy.title}
              </h2>
              <p className="mt-4 text-white/75">{copy.description}</p>
            </div>

            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5">
              <div className="relative aspect-[16/10]">
                <Image
                  src={SOLAR_STOCK_IMAGES.houseRoof.src}
                  alt={SOLAR_STOCK_IMAGES.houseRoof.alt[language]}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 36vw, 100vw"
                />
              </div>
            </div>
          </div>

          <div className="relative grid gap-5 md:grid-cols-4 md:gap-8">
            <div className="absolute left-[12.5%] right-[12.5%] top-6 hidden h-px bg-white/15 md:block" />
            {copy.steps.map((step, index) => (
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
            <Link
              href={withLanguagePath("/subsidy", language)}
              className="btn-primary inline-flex items-center justify-center"
            >
              {copy.cta}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
