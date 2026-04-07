"use client";

import Link from "next/link";
import { Menu, PhoneCall } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import LanguageSwitchButton from "@/components/app/LanguageSwitchButton";
import BrandLockup from "@/components/layout/BrandLockup";
import {
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  getNavLinks,
} from "@/lib/constants";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { stripLanguagePrefix, withLanguagePath } from "@/lib/site-language";
import { cn } from "@/lib/utils";

import MobileNav from "./MobileNav";

function isActiveLink(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export default function Header() {
  const language = useSiteLanguage();
  const pathname = usePathname();
  const basePathname = stripLanguagePrefix(pathname);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navLinks = getNavLinks(language);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/92",
          scrolled && "shadow-[0_12px_34px_rgba(15,36,25,0.09)]"
        )}
      >
        <div className="mx-auto flex h-[82px] max-w-7xl items-center justify-between gap-3 px-4 md:h-[94px] md:px-8">
          <BrandLockup size="header" className="shrink-0" />

          <nav className="hidden flex-1 items-center justify-center gap-2 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={withLanguagePath(link.href, language)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all",
                  isActiveLink(basePathname, link.href)
                    ? "bg-green-100 text-green-900 shadow-sm"
                    : "text-neutral-700 hover:bg-green-50 hover:text-green-900"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitchButton />
            <a
              href={CONTACT_PHONE_HREF}
              className="hidden items-center gap-2 rounded-full border border-border bg-white px-4 py-3 text-sm font-medium text-green-900 transition-colors hover:border-green-900/10 hover:bg-green-50 lg:inline-flex"
            >
              <PhoneCall className="h-4 w-4" />
              {CONTACT_PHONE_DISPLAY}
            </a>
            <Link
              href={withLanguagePath("/#lead-capture", language)}
              className="btn-primary inline-flex !h-12 !w-auto items-center justify-center !px-5 text-sm"
            >
              {language === "hi" ? "मुफ्त योजना लें" : "Get free plan"}
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitchButton compact className="px-3 py-2.5 text-xs" />
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border text-green-900 transition-colors hover:bg-green-100"
              aria-label={language === "hi" ? "नेविगेशन खोलें" : "Open navigation"}
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={open} onOpenChange={setOpen} />
    </>
  );
}
