import Link from "next/link";

import { NAV_LINKS } from "@/lib/constants";
import { SERVICE_AREAS, SERVICE_CATALOG } from "@/lib/service-catalog";

function BrandLockup() {
  return (
    <Link href="/" className="inline-flex items-center gap-3" aria-label="Maa Sharda Distributors home">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-amber-400">
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
      <span className="text-base font-medium leading-tight">
        <span className="block text-white">Maa Sharda</span>
        <span className="block text-amber-400">Distributors</span>
      </span>
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="bg-green-950 text-[#F5F5F0]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4 md:px-8">
        <div className="space-y-4">
          <BrandLockup />
          <p className="max-w-xs text-sm text-white/75">
            Documents collection se installation aur meter change tak poori solar journey ek hi team handle karti hai.
          </p>
          <p className="text-sm text-white/60">Service areas: {SERVICE_AREAS.join(", ")}</p>
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

        <div className="space-y-4">
          <h2 className="text-sm font-medium uppercase tracking-[0.16em] text-white/60">Contact</h2>
          <div className="space-y-3 text-sm text-white/80">
            <a href="tel:+919355570048" className="block transition-colors hover:text-amber-400">
              +91 93555 70048
            </a>
            <p>Office: Yamunanagar, Haryana</p>
            <p>Mon-Sat 9am-7pm</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-4 text-sm text-white/60 md:px-8">
          Copyright 2025 Maa Sharda Distributors, Haryana
        </div>
      </div>
    </footer>
  );
}
