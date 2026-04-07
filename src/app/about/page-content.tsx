import type { Metadata } from "next";

import LeadCapture from "@/components/sections/LeadCapture";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { BUSINESS_HOURS_LABEL } from "@/lib/constants";
import { SERVICE_AREAS } from "@/lib/service-catalog";
import type { SiteLanguage } from "@/lib/site-language";

export function getAboutMetadata(language: SiteLanguage): Metadata {
  return language === "en"
    ? {
        title: "About Maa Sharda Distributors",
        description:
          "Learn how Maa Sharda Distributors handles subsidy paperwork, approvals, financing support, and solar installation across multiple districts in Haryana.",
      }
    : {
        title: "Maa Sharda Distributors के बारे में",
        description:
          "जानिए कैसे Maa Sharda Distributors हरियाणा के कई जिलों में सब्सिडी, कागजी कार्य, वित्त सहायता और सौर स्थापना का काम संभालता है।",
      };
}

interface AboutPageContentProps {
  language?: SiteLanguage;
}

export function AboutPageContent({
  language = "hi",
}: AboutPageContentProps) {
  const copy = {
    hi: {
      eyebrow: "परिचय",
      title: "हम पूरी सौर यात्रा अपनी तरफ से संभालते हैं",
      description:
        "Maa Sharda Distributors का काम सिर्फ सामान देना नहीं, बल्कि ग्राहक को दस्तावेज से स्थापना और मीटर परिवर्तन तक एक भरोसेमंद अनुभव देना है।",
      uspTitle: "हमारी सबसे बड़ी ताकत",
      uspParagraphOne:
        "ज़रूरी दस्तावेज मिलते ही हम लोड पासिंग, पोर्टल आवेदन, मंजूरी का अनुसरण, स्थापना का समय तय करना और मीटर परिवर्तन तक पूरा क्रम संभालते हैं। ग्राहक को अलग-अलग जगह भागना नहीं पड़ता।",
      uspParagraphTwo:
        "अगर वित्त सहायता की जरूरत हो, तो फाइल की तैयारी और आवेदन में मदद भी हम व्यवस्थित कर देते हैं, ताकि योजना और काम दोनों एक ही दिशा में चलें।",
      trustColumns: [
        {
          title: "दस्तावेज से मंजूरी तक",
          description:
            "ज़रूरी कागज़ मिलते ही फाइल का प्रवाह और मंजूरी की जिम्मेदारी हमारी टीम संभाल लेती है।",
        },
        {
          title: "लोड पासिंग से मीटर परिवर्तन तक",
          description:
            "हम प्रक्रिया को टूटने नहीं देते, इसलिए हर चरण एक क्रम में आगे बढ़ता है।",
        },
        {
          title: "वित्त सहायता फाइल में मदद",
          description:
            "अगर ग्राहक ऋण या वित्त सहायता चाहता है, तो फाइल तैयार करने और आवेदन में भी हमारी टीम साथ रहती है।",
        },
      ],
      mapTitle: "हमारा कार्यालय और सेवा क्षेत्र",
      contact: "संपर्क",
      coverage: "सेवा क्षेत्र",
      timing: "समय",
      leadHeading: "हमसे सीधे बात करें",
      leadDescription:
        "अपनी जरूरत बताइए। हम व्हाट्सऐप पर अगला साफ़ कदम भेजेंगे।",
    },
    en: {
      eyebrow: "About Us",
      title: "We manage the full solar journey from our end",
      description:
        "Maa Sharda Distributors is focused not just on products, but on giving clients an organised experience from documents to installation and meter change.",
      uspTitle: "Our biggest strength",
      uspParagraphOne:
        "Once the required documents are collected, we coordinate load passing, portal filing, approval follow-up, installation scheduling, and meter change. The customer does not need to chase fragmented follow-up.",
      uspParagraphTwo:
        "If financing is needed, we also organise file readiness and application support so planning and execution do not move in different directions.",
      trustColumns: [
        {
          title: "From documents to approvals",
          description:
            "After collecting the required documents, our team owns the file flow and approvals.",
        },
        {
          title: "From load passing to meter change",
          description:
            "We do not let load passing, installation scheduling, and final meter change become disconnected processes.",
        },
        {
          title: "Financing file support",
          description:
            "If the customer wants financing, we help prepare the file and support the application process too.",
        },
      ],
      mapTitle: "Our office and service coverage",
      contact: "Contact",
      coverage: "Coverage",
      timing: "Timing",
      leadHeading: "Talk to us directly",
      leadDescription:
        "Share your query and we will send the next clear step on WhatsApp.",
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
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <ScrollReveal className="space-y-6">
            <h2 className="section-headline text-green-900">{copy.uspTitle}</h2>
            <p className="text-neutral-600">{copy.uspParagraphOne}</p>
            <p className="text-neutral-600">{copy.uspParagraphTwo}</p>
          </ScrollReveal>

          <div className="grid gap-5">
            {copy.trustColumns.map((item) => (
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
            <h2 className="section-headline text-green-900">{copy.mapTitle}</h2>
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
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          <ScrollReveal className="card">
            <h2 className="text-xl font-medium text-green-900">{copy.contact}</h2>
            <a href="tel:+919355570048" className="mt-3 block text-sm text-neutral-600">
              +91 93555 70048
            </a>
          </ScrollReveal>
          <ScrollReveal className="card">
            <h2 className="text-xl font-medium text-green-900">{copy.coverage}</h2>
            <p className="mt-3 text-sm text-neutral-600">{SERVICE_AREAS.join(", ")}</p>
          </ScrollReveal>
          <ScrollReveal className="card">
            <h2 className="text-xl font-medium text-green-900">{copy.timing}</h2>
            <p className="mt-3 text-sm text-neutral-600">
              {BUSINESS_HOURS_LABEL[language]}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <LeadCapture
        language={language}
        source="about_page"
        heading={copy.leadHeading}
        description={copy.leadDescription}
      />
    </div>
  );
}
