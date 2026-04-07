"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, FileCheck2, Landmark, PhoneCall } from "lucide-react";

import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_HREF } from "@/lib/constants";

function scrollToLeadCapture() {
  document.getElementById("lead-capture")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

const trustItems = [
  {
    icon: BadgeCheck,
    text: "SunEnergy authorised distributor",
  },
  {
    icon: FileCheck2,
    text: "Documents se subsidy aur meter change tak poora kaam hum sambhalte hain",
  },
  {
    icon: Landmark,
    text: "Up to 90% financing support available*",
  },
];

export default function Hero() {
  return (
    <section className="overflow-hidden bg-cream">
      <div className="section-padding mx-auto flex min-h-[calc(100svh-64px)] max-w-7xl items-center md:min-h-[calc(100svh-80px)]">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-14">
          <div className="text-center md:text-left">
            <motion.span
              className="inline-block rounded-full bg-green-900 px-4 py-2 text-xs font-medium tracking-[0.18em] text-green-100 uppercase"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Yamunanagar, Ambala, Karnal aur Kurukshetra mein seva
            </motion.span>

            <motion.p
              className="mt-5 text-sm font-medium uppercase tracking-[0.16em] text-green-800/80"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            >
              Maa Sharda Distributors
            </motion.p>

            <motion.h1
              className="mt-6 text-hero-mobile font-medium text-green-900 md:text-hero-desktop"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              बिजली का बिल 80% तक कम करें, सही सोलर प्लान के साथ
            </motion.h1>

            <motion.p
              className="mx-auto mt-4 max-w-xl text-base text-neutral-600 md:mx-0 md:text-lg"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            >
              Subsidy application, required documents, load passing, portal filing,
              UHBVN approval, installation aur meter change tak poora kaam hum apni
              taraf se karte hain.
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
                मुफ्त सोलर प्लान लें
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href={CONTACT_PHONE_HREF}
                className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-btn border border-green-900/10 bg-white px-6 text-base font-medium text-green-900 shadow-sm transition-colors hover:bg-green-50 md:w-auto"
              >
                <PhoneCall className="h-4 w-4" />
                अभी कॉल करें
              </a>
            </motion.div>

            <motion.div
              className="mt-4 flex flex-col gap-3 text-sm text-neutral-600 sm:flex-row sm:items-center"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            >
              <span className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-green-900/5 sm:justify-start">
                Same-day callback available
              </span>
              <span className="text-neutral-500">{CONTACT_PHONE_DISPLAY} | Mon-Sat, 9am-7pm</span>
            </motion.div>

            <motion.div
              className="mt-10 grid gap-3 rounded-[24px] bg-[#f4f4f1] p-4 text-left md:grid-cols-3"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            >
              {trustItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.text}
                    className="flex items-start gap-3 rounded-[18px] bg-white p-4 shadow-[0_12px_32px_rgba(27,67,50,0.06)]"
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
            <div className="relative mx-auto max-w-[420px] md:max-w-[460px]">
              <div className="absolute inset-x-6 top-4 z-10 flex items-center justify-between rounded-full bg-white/90 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-green-900 shadow-sm backdrop-blur">
                <span>Rooftop planning</span>
                <span className="text-green-800">Free site assessment</span>
              </div>

              <div className="overflow-hidden rounded-[32px] shadow-[0_24px_60px_rgba(15,36,25,0.16)]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=1200&q=80"
                    alt="Technician inspecting rooftop solar panels"
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 40vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-950/35 via-transparent to-transparent" />
                </div>
              </div>

              <div className="mt-4 rounded-[20px] bg-white p-5 shadow-[0_18px_48px_rgba(15,36,25,0.14)] md:absolute md:-bottom-6 md:-left-6 md:mt-0">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
                  आम 3kW योजना
                </p>
                <div className="mt-2 flex items-end justify-between gap-5">
                  <div>
                    <p className="text-3xl font-medium text-green-900">Rs 3,360</p>
                    <p className="text-sm text-neutral-600">लगभग मासिक बचत</p>
                  </div>
                  <p className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-900">
                    सब्सिडी के बाद लगभग Rs 1,00,000
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
