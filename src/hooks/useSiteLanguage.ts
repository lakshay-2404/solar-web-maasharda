"use client";

import { usePathname } from "next/navigation";

import { getLanguageFromPathname } from "@/lib/site-language";

export function useSiteLanguage() {
  const pathname = usePathname();
  return getLanguageFromPathname(pathname);
}
