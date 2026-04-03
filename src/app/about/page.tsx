import type { Metadata } from "next";

import LeadCapture from "@/components/sections/LeadCapture";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { SERVICE_AREAS } from "@/lib/service-catalog";

export const metadata: Metadata = {
  title: "About Maa Sharda Distributors",
  description:
    "Learn how Maa Sharda Distributors handles subsidy paperwork, approvals, financing support and solar installation across multiple districts in Haryana.",
};

const trustColumns = [
  {
    title: "दस्तावेज़ से approval तक",
    description:
      "Required documents collect karne ke baad file flow aur approvals ko humari team own karti hai.",
  },
  {
    title: "लोड पासिंग से meter change",
    description:
      "Load passing, installation scheduling aur final meter change ko disconnected process nahi banne dete.",
  },
  {
    title: "फाइनेंसिंग file support",
    description:
      "Customer financing lena chahe to file ready karke application support bhi humari side se hota hai.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-cream">
      <section className="section-padding bg-green-950 text-white">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="max-w-4xl">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-400">
              About Us
            </p>
            <h1 className="mt-4 text-4xl font-medium leading-tight md:text-6xl">
              हम पूरी solar journey को अपने end se manage करते हैं
            </h1>
            <p className="mt-5 max-w-3xl text-lg text-white/75">
              Maa Sharda Distributors ka focus sirf products dena nahi, balki client ko
              documents se installation aur meter change tak ek organised experience dena hai.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <ScrollReveal className="space-y-6">
            <h2 className="section-headline text-green-900">
              हमारा core USP साफ़ है
            </h2>
            <p className="text-neutral-600">
              Client se required documents lene ke baad hum load passing, portal filing,
              approval follow-up, installation scheduling aur meter change tak poori process
              ko internally coordinate karte hain. Customer ko fragmented follow-up ka load
              lene ki zarurat nahi padti.
            </p>
            <p className="text-neutral-600">
              Agar financing ki requirement ho to file readiness aur application support bhi
              hum organise karte hain, taaki planning aur execution alag-alag directions me na chale.
            </p>
          </ScrollReveal>

          <div className="grid gap-5">
            {trustColumns.map((item) => (
              <ScrollReveal key={item.title}>
                <div className="card">
                  <h3 className="text-xl font-medium text-green-900">{item.title}</h3>
                  <p className="mt-3 text-sm text-neutral-600">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-7xl space-y-6">
          <ScrollReveal>
            <h2 className="section-headline text-green-900">हमारा कार्यालय और service coverage</h2>
          </ScrollReveal>
          <ScrollReveal className="overflow-hidden rounded-card border border-border">
            <iframe
              src="https://www.google.com/maps?q=Yamunanagar%20Haryana&z=12&output=embed"
              className="h-[300px] w-full md:h-[450px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Maa Sharda Distributors location map"
            />
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl grid gap-6 md:grid-cols-3">
          <ScrollReveal className="card">
            <h2 className="text-xl font-medium text-green-900">संपर्क</h2>
            <a href="tel:+919355570048" className="mt-3 block text-sm text-neutral-600">
              +91 93555 70048
            </a>
          </ScrollReveal>
          <ScrollReveal className="card">
            <h2 className="text-xl font-medium text-green-900">कवरेज</h2>
            <p className="mt-3 text-sm text-neutral-600">{SERVICE_AREAS.join(", ")}</p>
          </ScrollReveal>
          <ScrollReveal className="card">
            <h2 className="text-xl font-medium text-green-900">समय</h2>
            <p className="mt-3 text-sm text-neutral-600">Mon-Sat, 9am-7pm</p>
          </ScrollReveal>
        </div>
      </section>

      <LeadCapture
        source="about_page"
        heading="हमसे सीधे बात करें"
        description="Apni query share kariye. Hum WhatsApp par clear next step bhej denge."
      />
    </div>
  );
}
