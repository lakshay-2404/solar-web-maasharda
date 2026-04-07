"use client";

import Link from "next/link";
import { MessageCircle, PhoneCall } from "lucide-react";
import { usePathname } from "next/navigation";

import BrandLockup from "@/components/layout/BrandLockup";
import {
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  DEFAULT_WHATSAPP_NUMBER,
  NAV_LINKS,
  WHATSAPP_NUMBER,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { buildWhatsAppLeadMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";

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
  const pathname = usePathname();
  const whatsappHref = buildWhatsAppUrl(
    WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER,
    buildWhatsAppLeadMessage({ source: "Mobile navigation" })
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[min(100vw,360px)] border-l border-border bg-cream px-5 py-6 sm:px-6"
      >
        <SheetTitle className="sr-only">Mobile navigation</SheetTitle>
        <SheetDescription className="sr-only">
          Browse Maa Sharda Distributors pages and quick contact actions.
        </SheetDescription>
        <div className="flex h-full flex-col">
          <BrandLockup
            size="mobile"
            detail="Solar, subsidy aur net metering support"
            className="shrink-0"
          />

          <div className="mt-6 rounded-[24px] border border-border bg-white p-4 text-sm text-neutral-600 shadow-sm">
            <p className="font-medium text-green-900">Service areas</p>
            <p className="mt-2">Yamunanagar, Ambala, Karnal aur Kurukshetra</p>
          </div>

          <nav className="mt-6 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-[18px] border px-4 py-4 text-lg font-medium transition-colors",
                  isActiveLink(pathname, link.href)
                    ? "border-green-900/10 bg-green-100 text-green-900"
                    : "border-border bg-white text-green-900 hover:bg-green-100"
                )}
                onClick={() => onOpenChange(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto space-y-3 pt-6">
            <Link
              href="/#lead-capture"
              className="btn-primary inline-flex items-center justify-center"
              onClick={() => onOpenChange(false)}
            >
              मुफ्त प्लान लें
            </Link>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={CONTACT_PHONE_HREF}
                className="inline-flex items-center justify-center gap-2 rounded-[18px] border border-border bg-white px-4 py-3 text-sm font-medium text-green-900 shadow-sm transition-colors hover:bg-green-50"
                onClick={() => onOpenChange(false)}
              >
                <PhoneCall className="h-4 w-4" />
                कॉल करें
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-[18px] border border-green-900/10 bg-green-900 px-4 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-800"
                onClick={() => onOpenChange(false)}
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>

            <p className="text-center text-xs text-neutral-500">
              {CONTACT_PHONE_DISPLAY} | Mon-Sat, 9am-7pm
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
