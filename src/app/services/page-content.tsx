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
import {
  SERVICE_AREAS,
  getLocalizedServiceCatalog,
} from "@/lib/service-catalog";
import type { SiteLanguage } from "@/lib/site-language";
import { withLanguagePath } from "@/lib/site-language";

export function getServicesMetadata(language: SiteLanguage): Metadata {
  return language === "en"
    ? {
        title: "Solar Services | Maa Sharda Distributors",
        description:
          "Residential solar, commercial systems, hybrid backup, subsidy paperwork, financing support, and batteries by Maa Sharda Distributors.",
      }
    : {
        title: "सौर सेवाएं | Maa Sharda Distributors",
        description:
          "घरेलू सौर, व्यावसायिक प्रणाली, हाइब्रिड बैकअप, सब्सिडी कागजी कार्य, वित्त सहायता और बैटरी समाधान के लिए Maa Sharda Distributors की सेवाएं देखें।",
      };
}

const iconMap: Record<string, LucideIcon> = {
  "residential-solar": Home,
  "commercial-solar": Building2,
  "hybrid-systems": BatteryCharging,
  "subsidy-paperwork": FileText,
  "financing-support": WalletCards,
  batteries: HandCoins,
};

interface ServicesPageContentProps {
  language?: SiteLanguage;
}

export function ServicesPageContent({
  language = "hi",
}: ServicesPageContentProps) {
  const services = getLocalizedServiceCatalog(language);
  const copy = {
    hi: {
      eyebrow: "सेवाएं",
      title: "सौर परियोजना का हर जरूरी हिस्सा हम संभालते हैं",
      description:
        "दस्तावेज जुटाने, लोड पासिंग, पोर्टल आवेदन, मंजूरी, स्थापना, मीटर बदलने और वित्त सहायता फाइल तक पूरा क्रम एक साथ मिलता है।",
      coverageEyebrow: "सेवा क्षेत्र",
      coverageTitle: "हम इन जिलों में सेवा देते हैं",
      detailCta: "विवरण देखें →",
      leadHeading: "अपनी जरूरत के हिसाब से सही सेवा चुनें",
      leadDescription:
        "अपनी आवश्यकता बताइए। हम उपयुक्त सेवा दिशा और अगला साफ़ कदम समझाएंगे।",
    },
    en: {
      eyebrow: "Services",
      title: "We handle every essential part of the solar project",
      description:
        "You get one connected workflow for document collection, load passing, portal filing, approvals, installation, meter change, and financing file support.",
      coverageEyebrow: "Coverage",
      coverageTitle: "We serve these districts",
      detailCta: "View details →",
      leadHeading: "Choose the right service for your need",
      leadDescription:
        "Share your requirement and we will clarify the most suitable service direction and next practical step.",
    },
  }[language];

  return (
    <div className="bg-cream">
      <section className="section-padding bg-green-950 text-white">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="max-w-4xl">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-400">
              {copy.eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-medium leading-tight md:text-6xl">
              {copy.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg text-white/75">
              {copy.description}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl space-y-10">
          <ScrollReveal className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-500">
              {copy.coverageEyebrow}
            </p>
            <h2 className="section-headline mt-3 text-green-900">
              {copy.coverageTitle}
            </h2>
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
            {services.map((service) => {
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
                      href={withLanguagePath(`/services/${service.slug}`, language)}
                      className="mt-6 inline-flex text-sm font-medium text-amber-500 transition-opacity hover:opacity-80"
                    >
                      {copy.detailCta}
                    </Link>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <LeadCapture
        language={language}
        source="services_page"
        heading={copy.leadHeading}
        description={copy.leadDescription}
      />
    </div>
  );
}
