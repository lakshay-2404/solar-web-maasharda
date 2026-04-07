"use client";

import Link from "next/link";
import { Menu, PhoneCall } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_HREF, NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

import BrandLockup from "./BrandLockup";
import MobileNav from "./MobileNav";

function isActiveLink(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
          "sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90",
          scrolled && "shadow-[0_10px_30px_rgba(15,36,25,0.08)]"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 md:h-20 md:px-8">
          <BrandLockup
            size="header"
            detail="Solar, subsidy aur net metering support"
            detailClassName="hidden lg:block"
            className="shrink-0"
          />

          <nav className="hidden flex-1 items-center justify-center gap-2 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all",
                  isActiveLink(pathname, link.href)
                    ? "bg-green-100 text-green-900 shadow-sm"
                    : "text-neutral-700 hover:bg-white hover:text-green-900"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={CONTACT_PHONE_HREF}
              className="hidden items-center gap-2 rounded-full border border-border bg-white px-4 py-3 text-sm font-medium text-green-900 transition-colors hover:border-green-900/10 hover:bg-green-50 lg:inline-flex"
            >
              <PhoneCall className="h-4 w-4" />
              {CONTACT_PHONE_DISPLAY}
            </a>
            <Link
              href="/#lead-capture"
              className="btn-primary inline-flex !h-12 !w-auto items-center justify-center !px-5 text-sm"
            >
              मुफ्त प्लान लें
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-green-900 transition-colors hover:bg-green-100 md:hidden"
            aria-label="Open navigation"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <MobileNav open={open} onOpenChange={setOpen} />
    </>
  );
}
