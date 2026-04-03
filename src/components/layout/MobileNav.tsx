"use client";

import Link from "next/link";

import { NAV_LINKS } from "@/lib/constants";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function BrandLockup() {
  return (
    <Link href="/" className="inline-flex items-center gap-3" aria-label="Maa Sharda Distributors home">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-900">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="4" fill="currentColor" />
          <path
            d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.7 4.7l2.1 2.1M17.2 17.2l2.1 2.1M19.3 4.7l-2.1 2.1M6.8 17.2l-2.1 2.1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="text-lg font-medium leading-tight">
        <span className="text-green-900">Maa Sharda</span>
        <span className="block text-amber-500">Distributors</span>
      </span>
    </Link>
  );
}

export default function MobileNav({ open, onOpenChange }: MobileNavProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[320px] border-l border-border bg-cream px-6 py-8">
        <SheetTitle className="sr-only">Mobile navigation</SheetTitle>
        <div className="flex h-full flex-col gap-10">
          <BrandLockup />
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-card border border-border bg-white px-4 py-4 text-lg font-medium text-green-900 transition-colors hover:bg-green-100"
                onClick={() => onOpenChange(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto space-y-4">
            <Link
              href="/#lead-capture"
              className="btn-primary inline-flex items-center justify-center"
              onClick={() => onOpenChange(false)}
            >
              Free Plan
            </Link>
            <a href="tel:+919355570048" className="block text-center text-sm text-neutral-600">
              Mon-Sat, 9am-7pm
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
