import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import ScrollReveal from "@/components/ui/ScrollReveal";
import LeadCapture from "@/components/sections/LeadCapture";
import { getServiceBySlug, SERVICE_AREAS, SERVICE_CATALOG } from "@/lib/service-catalog";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICE_CATALOG.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {};
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-cream">
      <section className="section-padding bg-green-950 text-white">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="max-w-4xl">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-400">
              सेवा विवरण
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
              मुख्य लाभ
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
              हमारा कार्य-प्रवाह
            </p>
            <div className="mt-6 grid gap-4">
              {service.detailPoints.map((point, index) => (
                <div key={point} className="rounded-card bg-white px-4 py-4 shadow-[0_12px_32px_rgba(27,67,50,0.06)]">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
                    Step {index + 1}
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
              सेवा क्षेत्र
            </p>
            <h2 className="mt-4 text-3xl font-medium">हम इन जिलों में सेवा देते हैं</h2>
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
              href="/services"
              className="btn-secondary mt-8 inline-flex items-center justify-center"
            >
              सभी सेवाएँ देखें
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <LeadCapture
        source={`service_${service.slug}`}
        heading={service.leadHeading}
        description={service.leadDescription}
      />
    </div>
  );
}
