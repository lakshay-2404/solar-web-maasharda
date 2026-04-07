import Link from "next/link";
import { ArrowRight, MessageCircle, PhoneCall } from "lucide-react";

import BrandLockup from "@/components/layout/BrandLockup";
import {
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  DEFAULT_WHATSAPP_NUMBER,
  NAV_LINKS,
  WHATSAPP_NUMBER,
} from "@/lib/constants";
import { SERVICE_AREAS, SERVICE_CATALOG } from "@/lib/service-catalog";
import { buildWhatsAppLeadMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export default function Footer() {
  const whatsappHref = buildWhatsAppUrl(
    WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER,
    buildWhatsAppLeadMessage({ source: "Footer contact" })
  );
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.12),_transparent_28%),linear-gradient(180deg,_#123020_0%,_#0F2419_100%)] text-[#F5F5F0]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,1fr))] md:px-8">
        <div className="space-y-5">
          <BrandLockup
            theme="dark"
            size="footer"
            detail="Solar, subsidy aur net metering support"
          />

          <p className="max-w-sm text-sm text-white/75">
            Documents collection se installation aur meter change tak poori solar journey ek hi team handle karti hai.
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
              href="/#lead-capture"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-400"
            >
              मुफ्त प्लान लें
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-medium uppercase tracking-[0.16em] text-white/60">Quick Links</h2>
          <div className="space-y-3 text-sm">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="block transition-colors hover:text-amber-400">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-medium uppercase tracking-[0.16em] text-white/60">Services</h2>
          <div className="space-y-3 text-sm">
            {SERVICE_CATALOG.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="block text-white/80 transition-colors hover:text-amber-400"
              >
                {service.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4 rounded-[24px] border border-white/10 bg-white/5 p-5">
          <h2 className="text-sm font-medium uppercase tracking-[0.16em] text-white/60">Contact</h2>
          <div className="space-y-3 text-sm text-white/80">
            <a
              href={CONTACT_PHONE_HREF}
              className="inline-flex items-center gap-2 transition-colors hover:text-amber-400"
            >
              <PhoneCall className="h-4 w-4" />
              {CONTACT_PHONE_DISPLAY}
            </a>
            <p>Office: Yamunanagar, Haryana</p>
            <p>Mon-Sat 9am-7pm</p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white transition-colors hover:text-amber-400"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp par sampark karein
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
