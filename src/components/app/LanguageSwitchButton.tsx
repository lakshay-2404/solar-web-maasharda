"use client";

import Link from "next/link";
import { Languages } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  getLanguageFromPathname,
  toggleLanguagePath,
} from "@/lib/site-language";
import { cn } from "@/lib/utils";

interface LanguageSwitchButtonProps {
  className?: string;
  compact?: boolean;
}

export default function LanguageSwitchButton({
  className,
  compact = false,
}: LanguageSwitchButtonProps) {
  const pathname = usePathname();
  const language = getLanguageFromPathname(pathname);
  const label =
    language === "hi"
      ? compact
        ? "English"
        : "Translate to English"
      : compact
        ? "हिंदी"
        : "हिंदी में देखें";

  return (
    <Link
      href={toggleLanguagePath(pathname)}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-4 py-3 text-sm font-medium text-green-900 transition-colors hover:bg-green-50",
        className
      )}
      aria-label={
        language === "hi"
          ? "Switch the website to English"
          : "वेबसाइट को हिंदी में देखें"
      }
    >
      <Languages className="h-4 w-4" />
      {label}
    </Link>
  );
}
