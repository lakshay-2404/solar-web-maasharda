"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle, PhoneCall } from "lucide-react";

import InstallAppButton from "@/components/app/InstallAppButton";
import LanguageSwitchButton from "@/components/app/LanguageSwitchButton";
import NotificationToggle from "@/components/app/NotificationToggle";
import BrandLockup from "@/components/layout/BrandLockup";
import {
  APP_TAGLINE,
  BUSINESS_HOURS_LABEL,
  CONTACT_ADDRESS,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  DEFAULT_WHATSAPP_NUMBER,
  WHATSAPP_NUMBER,
  getNavLinks,
} from "@/lib/constants";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { withLanguagePath } from "@/lib/site-language";
import {
  SERVICE_AREAS,
  getLocalizedServiceCatalog,
} from "@/lib/service-catalog";
import { buildWhatsAppLeadMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export default function Footer() {
  const language = useSiteLanguage();
  const navLinks = getNavLinks(language);
  const services = getLocalizedServiceCatalog(language);
  const whatsappHref = buildWhatsAppUrl(
    WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER,
    buildWhatsAppLeadMessage({ source: "Footer contact" })
  );
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.13),_transparent_28%),linear-gradient(180deg,_#123020_0%,_#0F2419_100%)] text-[#F5F5F0]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,1fr))] md:px-8">
        <div className="space-y-5">
          <BrandLockup theme="dark" size="footer" detail={APP_TAGLINE[language]} />

          <p className="max-w-sm text-sm text-white/75">
            {language === "hi"
              ? "दस्तावेज जुटाने से स्थापना, सब्सिडी के अनुसरण और मीटर परिवर्तन तक पूरी सौर यात्रा एक ही भरोसेमंद टीम संभालती है।"
              : "From document collection to installation, subsidy follow-up, and meter change, one grounded team handles the full solar journey."}
          </p>

          <div className="flex flex-wrap gap-2">
            {SERVICE_AREAS.map((area) => (
              <span
                key={area}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75"
              >
                {area}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={withLanguagePath("/#lead-capture", language)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-400"
            >
              {language === "hi" ? "मुफ्त योजना लें" : "Get free plan"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" />
              {language === "hi" ? "व्हाट्सऐप" : "WhatsApp"}
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <InstallAppButton
              className="w-full justify-center border-white/10 bg-white/5 text-white hover:bg-white/10"
              label={language === "hi" ? "ऐप स्थापित करें" : "Install app"}
            />
            <NotificationToggle
              className="w-full justify-center border-white/10 bg-white/5 text-white hover:bg-white/10"
              source="footer"
              consentContext="footer_action"
              label={language === "hi" ? "फोन पर सूचना चालू करें" : "Turn on phone alerts"}
              enabledLabel={language === "hi" ? "सूचनाएं चालू" : "Alerts on"}
            />
          </div>

          <LanguageSwitchButton className="border-white/10 bg-white/5 text-white hover:bg-white/10" />
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-medium uppercase tracking-[0.16em] text-white/60">
            {language === "hi" ? "त्वरित लिंक" : "Quick links"}
          </h2>
          <div className="space-y-3 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={withLanguagePath(link.href, language)}
                className="block transition-colors hover:text-amber-400"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-medium uppercase tracking-[0.16em] text-white/60">
            {language === "hi" ? "सेवाएं" : "Services"}
          </h2>
          <div className="space-y-3 text-sm">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={withLanguagePath(`/services/${service.slug}`, language)}
                className="block text-white/80 transition-colors hover:text-amber-400"
              >
                {service.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4 rounded-[24px] border border-white/10 bg-white/5 p-5">
          <h2 className="text-sm font-medium uppercase tracking-[0.16em] text-white/60">
            {language === "hi" ? "संपर्क" : "Contact"}
          </h2>
          <div className="space-y-3 text-sm text-white/80">
            <a
              href={CONTACT_PHONE_HREF}
              className="inline-flex items-center gap-2 transition-colors hover:text-amber-400"
            >
              <PhoneCall className="h-4 w-4" />
              {CONTACT_PHONE_DISPLAY}
            </a>
            <p>{CONTACT_ADDRESS}</p>
            <p>{BUSINESS_HOURS_LABEL[language]}</p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white transition-colors hover:text-amber-400"
            >
              <MessageCircle className="h-4 w-4" />
              {language === "hi" ? "व्हाट्सऐप पर संपर्क करें" : "Chat on WhatsApp"}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-4 text-sm text-white/60 md:px-8">
          Copyright {currentYear} Maa Sharda Distributors, Haryana
        </div>
      </div>
    </footer>
  );
}
