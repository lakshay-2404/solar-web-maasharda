"use client";

import Link from "next/link";
import { MessageCircle, PhoneCall } from "lucide-react";
import { usePathname } from "next/navigation";

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

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function isActiveLink(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export default function MobileNav({ open, onOpenChange }: MobileNavProps) {
  const language = useSiteLanguage();
  const pathname = usePathname();
  const basePathname = stripLanguagePrefix(pathname);
  const primaryNavLinks = getPrimaryNavLinks(language);
  const secondaryNavLinks = getSecondaryNavLinks(language);
  const whatsappHref = buildWhatsAppUrl(
    WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER,
    buildWhatsAppLeadMessage({ source: "Mobile navigation" })
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[min(100vw,380px)] border-l border-border bg-cream px-5 py-6 sm:px-6"
      >
        <SheetTitle className="sr-only">
          {language === "hi" ? "मोबाइल नेविगेशन" : "Mobile navigation"}
        </SheetTitle>
        <SheetDescription className="sr-only">
          {language === "hi"
            ? "पेज देखें, संपर्क विकल्प खोलें, ऐप स्थापित करें और सूचनाएं चालू करें।"
            : "Browse pages, open contact options, install the app, and enable updates."}
        </SheetDescription>

        <div className="flex h-full flex-col">
          <BrandLockup
            size="mobile"
            detail={APP_TAGLINE[language]}
            className="shrink-0"
          />

          <div className="mt-6 rounded-[24px] border border-border bg-white p-4 text-sm text-neutral-600 shadow-sm">
            <p className="font-medium text-green-900">{CONTACT_ADDRESS}</p>
            <p className="mt-2">{BUSINESS_HOURS_LABEL[language]}</p>
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
              {language === "hi" ? "मुख्य पृष्ठ" : "Main pages"}
            </p>
            <nav className="mt-3 flex flex-col gap-3">
              {primaryNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={withLanguagePath(link.href, language)}
                  className={cn(
                    "rounded-[18px] border px-4 py-4 text-lg font-medium transition-colors",
                    isActiveLink(basePathname, link.href)
                      ? "border-green-900/10 bg-green-100 text-green-900"
                      : "border-border bg-white text-green-900 hover:bg-green-100"
                  )}
                  onClick={() => onOpenChange(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
              {language === "hi" ? "अन्य पृष्ठ" : "More"}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {secondaryNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={withLanguagePath(link.href, language)}
                  className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-green-900"
                  onClick={() => onOpenChange(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <InstallAppButton
              className="w-full justify-center"
              label={language === "hi" ? "ऐप स्थापित करें" : "Install app"}
            />
            <NotificationToggle
              className="w-full justify-center"
              source="mobile_navigation"
              consentContext="mobile_nav_action"
              label={language === "hi" ? "सूचनाएं चालू करें" : "Turn on updates"}
            />
          </div>

          <div className="mt-6">
            <LanguageSwitchButton className="w-full justify-center" />
          </div>

          <div className="mt-auto space-y-3 pt-6">
            <Link
              href={withLanguagePath("/#lead-capture", language)}
              className="btn-primary inline-flex items-center justify-center"
              onClick={() => onOpenChange(false)}
            >
              {language === "hi" ? "मुफ्त योजना लें" : "Get free plan"}
            </Link>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={CONTACT_PHONE_HREF}
                className="inline-flex items-center justify-center gap-2 rounded-[18px] border border-border bg-white px-4 py-3 text-sm font-medium text-green-900 shadow-sm transition-colors hover:bg-green-50"
                onClick={() => onOpenChange(false)}
              >
                <PhoneCall className="h-4 w-4" />
                {language === "hi" ? "कॉल करें" : "Call now"}
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-[18px] border border-green-900/10 bg-green-900 px-4 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-800"
                onClick={() => onOpenChange(false)}
              >
                <MessageCircle className="h-4 w-4" />
                {language === "hi" ? "व्हाट्सऐप" : "WhatsApp"}
              </a>
            </div>

            <p className="text-center text-xs text-neutral-500">
              {CONTACT_PHONE_DISPLAY} | {BUSINESS_HOURS_LABEL[language]}
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
