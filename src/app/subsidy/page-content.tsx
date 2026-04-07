import type { Metadata } from "next";
import Script from "next/script";

import LeadCapture from "@/components/sections/LeadCapture";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { MAX_SUBSIDY, SUBSIDY_RATES } from "@/lib/constants";
import { SERVICE_AREAS } from "@/lib/service-catalog";
import type { SiteLanguage } from "@/lib/site-language";

export function getSubsidyMetadata(language: SiteLanguage): Metadata {
  return language === "en"
    ? {
        title: "Solar Subsidy Support | Maa Sharda Distributors",
        description:
          "PM Surya Ghar subsidy support with document collection, load passing, portal filing, approvals, installation, and meter change coordination.",
      }
    : {
        title: "सौर सब्सिडी सहायता | Maa Sharda Distributors",
        description:
          "PM Surya Ghar सब्सिडी के लिए दस्तावेज, लोड पासिंग, पोर्टल आवेदन, मंजूरी, स्थापना और मीटर बदलने की पूरी सहायता।",
      };
}

interface SubsidyPageContentProps {
  language?: SiteLanguage;
}

export function SubsidyPageContent({
  language = "hi",
}: SubsidyPageContentProps) {
  const copy = {
    hi: {
      eyebrow: "PM Surya Ghar मार्गदर्शिका",
      title: "सब्सिडी की पूरी प्रक्रिया हम अपनी तरफ से कराते हैं",
      description:
        "ग्राहक से ज़रूरी दस्तावेज लेने के बाद हम लोड पासिंग, पोर्टल आवेदन, UHBVN मंजूरी, स्थापना और मीटर परिवर्तन तक पूरा क्रम संभालते हैं।",
      eligibilityEyebrow: "योग्यता सूची",
      eligibilityTitle: "कौन पात्र हो सकता है?",
      eligibilityPoints: [
        "घरेलू छत वाला मकान या पात्र घरेलू बिजली कनेक्शन",
        "मान्य आधार, बैंक विवरण और बिजली बिल",
        "उपयुक्त छत और पर्याप्त स्थापना स्थान",
        "नियमों के अनुसार DCR रूफटॉप योजना",
      ],
      maximumNote: "अधिकतम सब्सिडी यहीं तक सीमित रहती है।",
      uspEyebrow: "मुख्य विशेषता",
      uspTitle: "दस्तावेज से मीटर परिवर्तन तक एक ही टीम",
      uspDescription:
        "हमारी टीम दस्तावेज लेती है, लोड पासिंग चलाती है, पोर्टल पर आवेदन करती है, UHBVN मंजूरी का अनुसरण करती है, स्थापना तय कराती है और नया मीटर लगने तक पूरी प्रक्रिया देखती रहती है।",
      processEyebrow: "पूरी प्रक्रिया",
      processTitle: "हमारा सीधा कार्य क्रम",
      processSteps: [
        "ज़रूरी दस्तावेज हम लेते हैं",
        "लोड पासिंग और फाइल तैयारी हम संभालते हैं",
        "पोर्टल आवेदन और UHBVN मंजूरी हमारी तरफ से होती है",
        "स्थापना और मीटर परिवर्तन तय क्रम में पूरा होता है",
      ],
      financingEyebrow: "वित्त सहायता",
      financingTitle: "वित्त सहायता की फाइल भी हम तैयार कराते हैं",
      financingDescription:
        "90% तक वित्त सहायता के लिए फाइल तैयारी और बैंक आवेदन में हमारी तरफ से व्यवस्थित मदद मिलती है।*",
      leadHeading: "सब्सिडी जानकारी के लिए संपर्क करें",
      leadDescription:
        "अपना बिल, पसंद की क्षमता और बुनियादी जानकारी बताइए। हम अगला साफ़ कदम समझाएंगे।",
      faqOneQuestion: "3kW के बाद कितनी सब्सिडी मिलती है?",
      faqOneAnswer:
        "घरेलू रूफटॉप सब्सिडी 3kW पर सीमित हो जाती है। 3kW और उससे ऊपर की प्रणालियों के लिए अधिकतम सब्सिडी Rs 78,000 होती है।",
      faqTwoQuestion: "आप पूरी प्रक्रिया में क्या-क्या संभालते हैं?",
      faqTwoAnswer:
        "हम दस्तावेज जुटाने, लोड पासिंग, पोर्टल आवेदन, UHBVN मंजूरी के अनुसरण, स्थापना समन्वय और मीटर परिवर्तन तक पूरा काम संभालते हैं।",
      systemLabelOne: "1kW प्रणाली",
      systemLabelTwo: "2kW प्रणाली",
      systemLabelThree: "3kW और उससे ऊपर",
    },
    en: {
      eyebrow: "PM Surya Ghar Guide",
      title: "We complete the subsidy process from our end",
      description:
        "After collecting the documents from the client, we manage the full workflow from load passing and portal filing to UHBVN approval, installation, and meter change.",
      eligibilityEyebrow: "Eligibility Checklist",
      eligibilityTitle: "Who can be eligible?",
      eligibilityPoints: [
        "Residential rooftop property or an eligible domestic connection",
        "Valid Aadhaar, bank details, and electricity bill",
        "Suitable rooftop and feasible installation space",
        "Compliant DCR rooftop system planning",
      ],
      maximumNote: "The maximum subsidy is capped here.",
      uspEyebrow: "Core USP",
      uspTitle: "One team from documents to meter change",
      uspDescription:
        "Our team collects documents, drives the load-passing flow, files on the portal, follows up on UHBVN approval, schedules installation, and tracks the process until the new meter change is completed.",
      processEyebrow: "Complete Process",
      processTitle: "Our practical workflow",
      processSteps: [
        "We collect the required documents",
        "We handle load passing and file preparation",
        "Portal filing and UHBVN approval happen from our side",
        "Installation and meter change happen on a coordinated timeline",
      ],
      financingEyebrow: "Financing Support",
      financingTitle: "We also prepare the financing file",
      financingDescription:
        "For up to 90% financing support, file preparation and bank application support are organised from our side.*",
      leadHeading: "Contact us for subsidy guidance",
      leadDescription:
        "Share your bill, preferred system, and basic details. We will explain the next clear step.",
      faqOneQuestion: "How much subsidy is available after 3kW?",
      faqOneAnswer:
        "Residential rooftop subsidy is capped at 3kW. For 3kW and larger systems, the maximum subsidy is Rs 78,000.",
      faqTwoQuestion: "What do you handle in the process?",
      faqTwoAnswer:
        "We handle the full workflow from document collection, load passing, and portal filing to UHBVN approval follow-up, installation coordination, and meter change.",
      systemLabelOne: "1kW system",
      systemLabelTwo: "2kW system",
      systemLabelThree: "3kW and above",
    },
  }[language];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: copy.faqOneQuestion,
        acceptedAnswer: {
          "@type": "Answer",
          text: copy.faqOneAnswer,
        },
      },
      {
        "@type": "Question",
        name: copy.faqTwoQuestion,
        acceptedAnswer: {
          "@type": "Answer",
          text: copy.faqTwoAnswer,
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

  return (
    <div className="bg-cream">
      <Script
        id={`subsidy-page-schema-${language}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([localBusinessSchema, faqSchema]),
        }}
      />

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
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <ScrollReveal className="card">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-500">
              {copy.eligibilityEyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-medium text-green-900">
              {copy.eligibilityTitle}
            </h2>
            <div className="mt-6 space-y-4 text-sm text-neutral-700">
              {copy.eligibilityPoints.map((point) => (
                <div key={point} className="rounded-card bg-cream px-4 py-3">
                  {point}
                </div>
              ))}
            </div>
          </ScrollReveal>

          <div className="grid gap-5 md:grid-cols-3">
            <ScrollReveal className="card">
              <p className="text-sm text-neutral-500">{copy.systemLabelOne}</p>
              <h3 className="mt-2 text-3xl font-medium text-green-900">
                Rs {SUBSIDY_RATES[1].toLocaleString("en-IN")}
              </h3>
            </ScrollReveal>
            <ScrollReveal className="card border-amber-400">
              <p className="text-sm text-neutral-500">{copy.systemLabelTwo}</p>
              <h3 className="mt-2 text-3xl font-medium text-green-900">
                Rs {SUBSIDY_RATES[2].toLocaleString("en-IN")}
              </h3>
            </ScrollReveal>
            <ScrollReveal className="card">
              <p className="text-sm text-neutral-500">{copy.systemLabelThree}</p>
              <h3 className="mt-2 text-3xl font-medium text-green-900">
                Rs {MAX_SUBSIDY.toLocaleString("en-IN")}
              </h3>
              <p className="mt-3 text-sm text-neutral-600">{copy.maximumNote}</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="rounded-[28px] bg-amber-100 px-6 py-8 md:px-8">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-900">
              {copy.uspEyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-medium text-green-900">
              {copy.uspTitle}
            </h2>
            <p className="mt-4 text-neutral-700">{copy.uspDescription}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-500">
              {copy.processEyebrow}
            </p>
            <h2 className="section-headline mt-3 text-green-900">
              {copy.processTitle}
            </h2>
          </ScrollReveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {copy.processSteps.map((step, index) => (
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
              {copy.financingEyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-medium">{copy.financingTitle}</h2>
            <p className="mt-4 max-w-2xl text-white/75">
              {copy.financingDescription}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <LeadCapture
        language={language}
        source="subsidy_page"
        heading={copy.leadHeading}
        description={copy.leadDescription}
      />
    </div>
  );
}
