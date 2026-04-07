"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  FileCheck2,
  Landmark,
  PhoneCall,
} from "lucide-react";

import {
  APP_BUSINESS_NAME,
  BUSINESS_HOURS_LABEL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
} from "@/lib/constants";
import type { SiteLanguage } from "@/lib/site-language";
import { SOLAR_STOCK_IMAGES } from "@/lib/solar-stock-images";

function scrollToLeadCapture() {
  document.getElementById("lead-capture")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

interface HeroProps {
  language?: SiteLanguage;
}

export default function Hero({ language = "hi" }: HeroProps) {
  const copy = {
    hi: {
      eyebrow: "यमुनानगर, अंबाला, करनाल और कुरुक्षेत्र में सेवा",
      title: "बिजली का बिल घटाइए,",
      titleAccent: "छत पर सौर योजना को सरल भाषा में समझिए",
      description:
        "घर, दुकान या क्लिनिक के लिए सही सौर व्यवस्था चुननी हो, तो क्षमता तय करने, सब्सिडी के कागजी काम, पोर्टल आवेदन, स्थापना और नेट मीटरिंग तक हम साथ रहते हैं।",
      primaryCta: "मुफ्त योजना लें",
      secondaryCta: "अभी कॉल करें",
      supportPill: "आज ही बातचीत संभव",
      floatingLeft: "छत की योजना",
      floatingRight: "सीधी सहायता",
      cardLabel: "लोकप्रिय 3kW योजना",
      cardValueLabel: "संभावित मासिक बचत",
      cardNote: "सब्सिडी के बाद अनुमानित खर्च: Rs 1,00,000",
      trustItems: [
        {
          icon: BadgeCheck,
          text: "अधिकृत वितरक से साफ़ और व्यवहारिक सलाह",
        },
        {
          icon: FileCheck2,
          text: "दस्तावेज से मीटर परिवर्तन तक पूरा काम एक ही क्रम में",
        },
        {
          icon: Landmark,
          text: "90% तक वित्त सहायता की फाइल में मदद उपलब्ध*",
        },
      ],
    },
    en: {
      eyebrow: "Serving Yamunanagar, Ambala, Karnal, and Kurukshetra",
      title: "Cut your electricity bill,",
      titleAccent: "and understand rooftop solar without confusion",
      description:
        "Whether it is a home, shop, or clinic, we stay with you through sizing, subsidy paperwork, portal filing, installation, and net metering.",
      primaryCta: "Get free plan",
      secondaryCta: "Call now",
      supportPill: "Same-day callback available",
      floatingLeft: "Rooftop planning",
      floatingRight: "Human support",
      cardLabel: "Typical 3kW plan",
      cardValueLabel: "Approx. monthly savings",
      cardNote: "Approx. post-subsidy budget: Rs 1,00,000",
      trustItems: [
        {
          icon: BadgeCheck,
          text: "Authorised distributor guidance with grounded product advice",
        },
        {
          icon: FileCheck2,
          text: "One workflow from documents and subsidy filing to meter change",
        },
        {
          icon: Landmark,
          text: "Up to 90% financing file support available*",
        },
      ],
    },
  }[language];

  return (
    <section className="overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(245,158,11,0.14),_transparent_24%),linear-gradient(180deg,_#FAFAF7_0%,_#F2F1EA_100%)]">
      <div className="section-padding mx-auto flex min-h-[calc(100svh-82px)] max-w-7xl items-center md:min-h-[calc(100svh-94px)]">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] lg:gap-16">
          <div className="text-center md:text-left">
            <motion.span
              className="inline-flex items-center rounded-full bg-green-900 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-green-100"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {copy.eyebrow}
            </motion.span>

            <motion.p
              className="mt-5 text-sm font-medium uppercase tracking-[0.16em] text-green-800/80"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            >
              {APP_BUSINESS_NAME}
            </motion.p>

            <motion.h1
              className="mt-6 text-hero-mobile font-medium text-green-950 md:text-hero-desktop"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {copy.title}
              <span className="block text-amber-600">{copy.titleAccent}</span>
            </motion.h1>

            <motion.p
              className="mx-auto mt-5 max-w-2xl text-base text-neutral-700 md:mx-0 md:text-lg"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            >
              {copy.description}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col gap-4 md:flex-row"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            >
              <button
                type="button"
                className="btn-primary inline-flex items-center justify-center gap-2"
                onClick={scrollToLeadCapture}
              >
                {copy.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href={CONTACT_PHONE_HREF}
                className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-btn border border-green-900/10 bg-white px-6 text-base font-medium text-green-900 shadow-sm transition-colors hover:bg-green-50 md:w-auto"
              >
                <PhoneCall className="h-4 w-4" />
                {copy.secondaryCta}
              </a>
            </motion.div>

            <motion.div
              className="mt-4 flex flex-col gap-3 text-sm text-neutral-600 sm:flex-row sm:items-center"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            >
              <span className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-green-900/5 sm:justify-start">
                {copy.supportPill}
              </span>
              <span className="text-neutral-500">
                {CONTACT_PHONE_DISPLAY} | {BUSINESS_HOURS_LABEL[language]}
              </span>
            </motion.div>

            <motion.div
              className="mt-10 grid gap-3 rounded-[26px] bg-[#F2EFE3] p-4 text-left md:grid-cols-3"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            >
              {copy.trustItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.text}
                    className="flex items-start gap-3 rounded-[20px] bg-white p-4 shadow-[0_12px_32px_rgba(27,67,50,0.06)]"
                  >
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-amber-500">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="text-sm leading-6 text-neutral-700">{item.text}</p>
                  </div>
                );
              })}
            </motion.div>
          </div>

          <motion.div
            className="block"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
          >
            <div className="relative mx-auto max-w-[430px] md:max-w-[500px]">
              <div className="absolute inset-x-6 top-4 z-10 flex items-center justify-between rounded-full bg-white/90 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-green-900 shadow-sm backdrop-blur">
                <span>{copy.floatingLeft}</span>
                <span className="text-green-800">{copy.floatingRight}</span>
              </div>

              <div className="overflow-hidden rounded-[34px] shadow-[0_24px_60px_rgba(15,36,25,0.16)]">
                <div className="relative aspect-[4/5] overflow-hidden bg-white">
                  <Image
                    src={SOLAR_STOCK_IMAGES.installationTeam.src}
                    alt={SOLAR_STOCK_IMAGES.installationTeam.alt[language]}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 42vw, 100vw"
                    priority
                  />
                </div>
              </div>

              <div className="mt-4 rounded-[22px] bg-white p-5 shadow-[0_18px_48px_rgba(15,36,25,0.14)] md:absolute md:-bottom-7 md:-left-6 md:mt-0">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
                  {copy.cardLabel}
                </p>
                <div className="mt-2 flex items-end justify-between gap-5">
                  <div>
                    <p className="text-3xl font-medium text-green-900">Rs 3,360</p>
                    <p className="text-sm text-neutral-600">{copy.cardValueLabel}</p>
                  </div>
                  <p className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-900">
                    {copy.cardNote}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
