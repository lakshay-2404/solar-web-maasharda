import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import LeadCapture from "@/components/sections/LeadCapture";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  SERVICE_AREAS,
  getLocalizedServiceBySlug,
} from "@/lib/service-catalog";
import type { SiteLanguage } from "@/lib/site-language";
import { withLanguagePath } from "@/lib/site-language";

export async function buildServiceMetadata(
  slug: string,
  language: SiteLanguage
): Promise<Metadata> {
  const service = getLocalizedServiceBySlug(slug, language);

  if (!service) {
    return {};
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
  };
}

interface ServiceDetailPageContentProps {
  slug: string;
  language?: SiteLanguage;
}

export function ServiceDetailPageContent({
  slug,
  language = "hi",
}: ServiceDetailPageContentProps) {
  const service = getLocalizedServiceBySlug(slug, language);

  if (!service) {
    notFound();
  }

  const copy = {
    hi: {
      eyebrow: "सेवा विवरण",
      benefits: "मुख्य लाभ",
      workflow: "हमारा कार्य क्रम",
      serviceArea: "सेवा क्षेत्र",
      serviceAreaTitle: "हम इन जिलों में सेवा देते हैं",
      allServices: "सभी सेवाएं देखें",
      stepPrefix: "चरण",
    },
    en: {
      eyebrow: "Service Detail",
      benefits: "Key benefits",
      workflow: "Our workflow",
      serviceArea: "Service area",
      serviceAreaTitle: "We serve these districts",
      allServices: "View all services",
      stepPrefix: "Step",
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
              {service.heroTitle}
            </h1>
            <p className="mt-5 max-w-3xl text-lg text-white/75">
              {service.heroDescription}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <ScrollReveal className="card">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-500">
              {copy.benefits}
            </p>
            <div className="mt-6 space-y-4">
              {service.bullets.map((bullet) => (
                <div key={bullet} className="rounded-card bg-cream px-4 py-3 text-sm text-neutral-700">
                  {bullet}
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal className="rounded-[28px] bg-[#f4f4f1] p-6 md:p-8">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-500">
              {copy.workflow}
            </p>
            <div className="mt-6 grid gap-4">
              {service.detailPoints.map((point, index) => (
                <div key={point} className="rounded-card bg-white px-4 py-4 shadow-[0_12px_32px_rgba(27,67,50,0.06)]">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
                    {copy.stepPrefix} {index + 1}
                  </p>
                  <p className="mt-2 text-sm text-neutral-700">{point}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="rounded-[28px] bg-green-950 px-6 py-10 text-white md:px-8">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-400">
              {copy.serviceArea}
            </p>
            <h2 className="mt-4 text-3xl font-medium">{copy.serviceAreaTitle}</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {SERVICE_AREAS.map((area) => (
                <span
                  key={area}
                  className="rounded-full bg-white/10 px-4 py-2 text-sm text-white"
                >
                  {area}
                </span>
              ))}
            </div>
            <Link
              href={withLanguagePath("/services", language)}
              className="btn-secondary mt-8 inline-flex items-center justify-center"
            >
              {copy.allServices}
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <LeadCapture
        language={language}
        source={`service_${service.slug}`}
        heading={service.leadHeading}
        description={service.leadDescription}
      />
    </div>
  );
}
