import type { Metadata } from "next";
import Link from "next/link";
import {
  BatteryCharging,
  Building2,
  FileText,
  HandCoins,
  Home,
  WalletCards,
  type LucideIcon,
} from "lucide-react";

import LeadCapture from "@/components/sections/LeadCapture";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { SERVICE_AREAS, SERVICE_CATALOG } from "@/lib/service-catalog";

export const metadata: Metadata = {
  title: "Solar Services | Maa Sharda Distributors",
  description:
    "Residential solar, commercial systems, hybrid backup, subsidy paperwork, financing support and batteries by Maa Sharda Distributors.",
};

const iconMap: Record<string, LucideIcon> = {
  "residential-solar": Home,
  "commercial-solar": Building2,
  "hybrid-systems": BatteryCharging,
  "subsidy-paperwork": FileText,
  "financing-support": WalletCards,
  batteries: HandCoins,
};

export default function ServicesPage() {
  return (
    <div className="bg-cream">
      <section className="section-padding bg-green-950 text-white">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="max-w-4xl">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-400">
              Services
            </p>
            <h1 className="mt-4 text-4xl font-medium leading-tight md:text-6xl">
              सोलर प्रोजेक्ट का हर जरूरी काम हम करते हैं
            </h1>
            <p className="mt-5 max-w-3xl text-lg text-white/75">
              Documents collection, load passing, portal filing, approvals, installation,
              meter change aur financing file support tak ek connected workflow milta hai.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl space-y-10">
          <ScrollReveal className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-500">
              Coverage
            </p>
            <h2 className="section-headline mt-3 text-green-900">हम इन जिलों में सेवा देते हैं</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {SERVICE_AREAS.map((area) => (
                <span
                  key={area}
                  className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-900"
                >
                  {area}
                </span>
              ))}
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {SERVICE_CATALOG.map((service) => {
              const Icon = iconMap[service.slug] ?? FileText;

              return (
                <ScrollReveal key={service.slug}>
                  <article className="card h-full">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-900">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h2 className="mt-5 text-2xl font-medium text-green-900">{service.title}</h2>
                    <p className="mt-3 text-sm text-neutral-600">{service.summary}</p>
                    <Link
                      href={`/services/${service.slug}`}
                      className="mt-6 inline-flex text-sm font-medium text-amber-500 transition-opacity hover:opacity-80"
                    >
                      Detail dekhein -&gt;
                    </Link>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <LeadCapture
        source="services_page"
        heading="अपनी जरूरत के हिसाब से सेवा चुनें"
        description="Apni requirement share kariye. Hum aapko suitable service direction aur practical next step clear kar denge."
      />
    </div>
  );
}
