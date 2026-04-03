"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

import MobileNav from "./MobileNav";

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
      <span className="text-sm font-medium leading-tight md:text-base">
        <span className="block text-green-900">Maa Sharda</span>
        <span className="block text-amber-500">Distributors</span>
      </span>
    </Link>
  );
}

export default function Header() {
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
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 md:h-[72px] md:px-8">
          <BrandLockup />

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-neutral-700 transition-colors hover:text-green-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link href="/#lead-capture" className="btn-primary inline-flex items-center justify-center">
              Free Plan
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-green-900 transition-colors hover:bg-green-100 md:hidden"
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
