"use client";

import Link from "next/link";
import {
  BookOpen,
  Calculator,
  House,
  PhoneCall,
  Wrench,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import InstallAppButton from "@/components/app/InstallAppButton";
import LanguageSwitchButton from "@/components/app/LanguageSwitchButton";
import NotificationToggle from "@/components/app/NotificationToggle";
import BrandLockup from "@/components/layout/BrandLockup";
import {
  APP_TAGLINE,
  BUSINESS_HOURS_LABEL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  DEFAULT_WHATSAPP_NUMBER,
  WHATSAPP_NUMBER,
  getPrimaryNavLinks,
  getSecondaryNavLinks,
} from "@/lib/constants";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { stripLanguagePrefix, withLanguagePath } from "@/lib/site-language";
import { cn } from "@/lib/utils";
import { buildWhatsAppLeadMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";

function isActiveLink(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export default function MobileBottomNav() {
  const language = useSiteLanguage();
  const pathname = usePathname();
  const basePathname = stripLanguagePrefix(pathname);
  const [contactOpen, setContactOpen] = useState(false);
  const primaryNavLinks = getPrimaryNavLinks(language);
  const secondaryNavLinks = getSecondaryNavLinks(language);
  const bottomNavItems = [
    {
      href: primaryNavLinks[0].href,
      label: primaryNavLinks[0].label,
      compactLabel: language === "hi" ? "मुख्य" : "Home",
      icon: House,
    },
    {
      href: primaryNavLinks[1].href,
      label: primaryNavLinks[1].label,
      compactLabel: language === "hi" ? "गणक" : "Calc",
      icon: Calculator,
    },
    {
      href: primaryNavLinks[2].href,
      label: primaryNavLinks[2].label,
      compactLabel: language === "hi" ? "सेवा" : "Srv",
      icon: Wrench,
    },
    {
      href: primaryNavLinks[3].href,
      label: primaryNavLinks[3].label,
      compactLabel: language === "hi" ? "लेख" : primaryNavLinks[3].label,
      icon: BookOpen,
    },
  ] as const;
  const whatsappHref = buildWhatsAppUrl(
    WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER,
    buildWhatsAppLeadMessage({ source: "Mobile bottom nav" })
  );

  return (
    <>
      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-green-900/10 bg-white/96 px-3 pb-[calc(0.8rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-16px_40px_rgba(15,36,25,0.12)] backdrop-blur md:hidden"
        aria-label={language === "hi" ? "मोबाइल त्वरित नेविगेशन" : "Mobile quick navigation"}
      >
        <div className="mx-auto grid max-w-xl grid-cols-5 gap-2">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const active = isActiveLink(basePathname, item.href);

            return (
              <Link
                key={item.href}
                href={withLanguagePath(item.href, language)}
                aria-current={active ? "page" : undefined}
                aria-label={item.label}
                className={cn(
                  "flex min-w-0 flex-col items-center justify-center rounded-[22px] py-2 text-[11px] font-medium transition-all",
                  active
                    ? "bg-green-900 px-2 text-white shadow-sm"
                    : "bg-transparent px-3 text-neutral-600"
                )}
              >
                <Icon className="h-[18px] w-[18px]" />
                <span className="mt-1 truncate">
                  {active ? item.compactLabel : item.label}
                </span>
                {active ? <span className="sr-only">{item.label}</span> : null}
              </Link>
            );
          })}

          <button
            type="button"
            onClick={() => setContactOpen(true)}
            className="flex min-w-0 flex-col items-center justify-center rounded-[22px] px-3 py-2 text-[11px] font-medium text-neutral-600 transition-all"
            aria-label={language === "hi" ? "संपर्क विकल्प" : "Contact options"}
          >
            <PhoneCall className="h-[18px] w-[18px]" />
            <span className="mt-1 truncate">
              {language === "hi" ? "संपर्क" : "Contact"}
            </span>
          </button>
        </div>
      </nav>

      <Sheet open={contactOpen} onOpenChange={setContactOpen}>
        <SheetContent
          side="bottom"
          className="rounded-t-[28px] border-t border-border bg-cream px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-6"
        >
          <SheetTitle className="sr-only">
            {language === "hi" ? "त्वरित विकल्प" : "Quick actions"}
          </SheetTitle>
          <SheetDescription className="sr-only">
            {language === "hi"
              ? "कॉल करें, व्हाट्सऐप पर बात करें, ऐप स्थापित करें, सूचनाएं चालू करें या दूसरे पृष्ठ खोलें।"
              : "Call, WhatsApp, install the app, enable updates, or open secondary pages."}
          </SheetDescription>

          <div className="mx-auto flex max-w-xl flex-col gap-5">
            <BrandLockup
              size="mobile"
              detail={APP_TAGLINE[language]}
              className="justify-center text-center"
            />

            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={CONTACT_PHONE_HREF}
                className="inline-flex items-center justify-center gap-2 rounded-[20px] border border-border bg-white px-4 py-4 text-sm font-medium text-green-900 shadow-sm"
                onClick={() => setContactOpen(false)}
              >
                <PhoneCall className="h-4 w-4" />
                {CONTACT_PHONE_DISPLAY}
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-[20px] bg-green-900 px-4 py-4 text-sm font-medium text-white shadow-sm"
                onClick={() => setContactOpen(false)}
              >
                {language === "hi" ? "व्हाट्सऐप पर बात करें" : "Chat on WhatsApp"}
              </a>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <InstallAppButton
                className="w-full justify-center"
                label={language === "hi" ? "ऐप स्थापित करें" : "Install app"}
              />
              <NotificationToggle
                className="w-full justify-center"
                source="mobile_bottom_nav"
                consentContext="bottom_nav_quick_action"
                label={language === "hi" ? "फोन पर सूचना पाएं" : "Get phone alerts"}
                enabledLabel={language === "hi" ? "सूचनाएं चालू हैं" : "Status alerts on"}
              />
            </div>

            <LanguageSwitchButton className="w-full justify-center" />

            <div className="rounded-[22px] border border-border bg-white p-4">
              <p className="text-sm font-medium text-green-900">
                {language === "hi" ? "अन्य पृष्ठ" : "More pages"}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {secondaryNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={withLanguagePath(link.href, language)}
                    className="rounded-full border border-border bg-cream px-4 py-2 text-sm font-medium text-green-900"
                    onClick={() => setContactOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <p className="text-center text-xs text-neutral-500">
              {BUSINESS_HOURS_LABEL[language]}
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
