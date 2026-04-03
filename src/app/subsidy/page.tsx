import type { Metadata } from "next";
import Script from "next/script";

import LeadCapture from "@/components/sections/LeadCapture";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { MAX_SUBSIDY, SUBSIDY_RATES } from "@/lib/constants";
import { SERVICE_AREAS } from "@/lib/service-catalog";

export const metadata: Metadata = {
  title: "Solar Subsidy Support | Maa Sharda Distributors",
  description:
    "PM Surya Ghar subsidy support with document collection, load passing, portal filing, approvals, installation and meter change coordination.",
};

const eligibilityPoints = [
  "Residential rooftop property ya eligible domestic connection",
  "Valid Aadhaar, bank details aur electricity bill",
  "Rooftop suitability aur feasible installation space",
  "Compliant DCR rooftop system planning",
];

const processSteps = [
  "Required documents hum collect karte hain",
  "Load passing aur file preparation hum sambhalte hain",
  "Portal filing aur UHBVN approval humari side se hota hai",
  "Installation aur meter change coordinated timeline me hota hai",
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "3kW ke baad subsidy kitni milti hai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Residential rooftop subsidy 3kW par capped hoti hai. 3kW aur usse upar ke systems ke liye maximum subsidy Rs 78,000 hoti hai.",
      },
    },
    {
      "@type": "Question",
      name: "Aap process me kya handle karte ho?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hum documents collection, load passing, portal filing, UHBVN approval follow-up, installation coordination aur meter change tak poora workflow handle karte hain.",
      },
    },
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Maa Sharda Distributors",
  telephone: "+919355570048",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Yamunanagar",
    addressRegion: "Haryana",
    addressCountry: "IN",
  },
  areaServed: SERVICE_AREAS,
};

export default function SubsidyPage() {
  return (
    <div className="bg-cream">
      <Script
        id="subsidy-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([localBusinessSchema, faqSchema]),
        }}
      />

      <section className="section-padding bg-green-950 text-white">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="max-w-4xl">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-400">
              PM Surya Ghar Guide
            </p>
            <h1 className="mt-4 text-4xl font-medium leading-tight md:text-6xl">
              सब्सिडी प्रक्रिया हम अपने end se पूरी करते हैं
            </h1>
            <p className="mt-5 max-w-3xl text-lg text-white/75">
              Client se documents lene ke baad hum load passing, portal filing, UHBVN
              approval, installation aur meter change tak poora workflow manage karte hain.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <ScrollReveal className="card">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-500">
              Eligibility Checklist
            </p>
            <h2 className="mt-3 text-3xl font-medium text-green-900">
              कौन eligible हो सकता है?
            </h2>
            <div className="mt-6 space-y-4 text-sm text-neutral-700">
              {eligibilityPoints.map((point) => (
                <div key={point} className="rounded-card bg-cream px-4 py-3">
                  {point}
                </div>
              ))}
            </div>
          </ScrollReveal>

          <div className="grid gap-5 md:grid-cols-3">
            <ScrollReveal className="card">
              <p className="text-sm text-neutral-500">1kW system</p>
              <h3 className="mt-2 text-3xl font-medium text-green-900">
                Rs {SUBSIDY_RATES[1].toLocaleString("en-IN")}
              </h3>
            </ScrollReveal>
            <ScrollReveal className="card border-amber-400">
              <p className="text-sm text-neutral-500">2kW system</p>
              <h3 className="mt-2 text-3xl font-medium text-green-900">
                Rs {SUBSIDY_RATES[2].toLocaleString("en-IN")}
              </h3>
            </ScrollReveal>
            <ScrollReveal className="card">
              <p className="text-sm text-neutral-500">3kW and above</p>
              <h3 className="mt-2 text-3xl font-medium text-green-900">
                Rs {MAX_SUBSIDY.toLocaleString("en-IN")}
              </h3>
              <p className="mt-3 text-sm text-neutral-600">Maximum subsidy yahin par cap ho jaati hai.</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="rounded-[28px] bg-amber-100 px-6 py-8 md:px-8">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-900">
              Core USP
            </p>
            <h2 className="mt-3 text-3xl font-medium text-green-900">
              दस्तावेज़ से meter change तक एक ही टीम
            </h2>
            <p className="mt-4 text-neutral-700">
              Humari team documents collect karti hai, load passing ka flow chalati hai,
              portal par file karti hai, UHBVN approval follow-up leti hai, installation
              schedule karti hai aur naya meter change hone tak process ko track karti hai.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-500">
              Complete Process
            </p>
            <h2 className="section-headline mt-3 text-green-900">
              हमारा practical workflow
            </h2>
          </ScrollReveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, index) => (
              <ScrollReveal key={step} className="card">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-green-100 text-lg font-medium text-green-900">
                  {index + 1}
                </span>
                <p className="mt-4 text-sm text-neutral-700">{step}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="rounded-[28px] bg-green-950 px-6 py-10 text-white md:px-8">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-400">
              Financing Support
            </p>
            <h2 className="mt-4 text-3xl font-medium">फाइनेंसिंग file bhi hum ready karte hain</h2>
            <p className="mt-4 max-w-2xl text-white/75">
              Up to 90% financing support ke liye file preparation aur bank application
              support humari side se organise kiya jaata hai.*
            </p>
          </ScrollReveal>
        </div>
      </section>

      <LeadCapture
        source="subsidy_page"
        heading="सब्सिडी जानकारी के लिए संपर्क करें"
        description="Apna bill, preferred system aur basic details share kariye. Hum aapko clear next step samjhayenge."
      />
    </div>
  );
}
