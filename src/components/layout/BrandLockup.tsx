"use client";

import Link from "next/link";

import SolarBadgeMark from "@/components/graphics/SolarBadgeMark";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { APP_BUSINESS_NAME } from "@/lib/constants";
import { withLanguagePath } from "@/lib/site-language";
import { cn } from "@/lib/utils";

type BrandLockupTheme = "light" | "dark";
type BrandLockupSize = "header" | "mobile" | "footer";

interface BrandLockupProps {
  theme?: BrandLockupTheme;
  size?: BrandLockupSize;
  detail?: string;
  className?: string;
  detailClassName?: string;
}

const sizeClasses: Record<
  BrandLockupSize,
  {
    container: string;
    icon: string;
    text: string;
    detail: string;
    wordGap: string;
  }
> = {
  header: {
    container: "gap-3 md:gap-3.5",
    icon: "h-[3.55rem] w-[3.55rem] md:h-[4.35rem] md:w-[4.35rem]",
    text: "text-[1.34rem] md:text-[1.7rem] lg:text-[1.84rem]",
    detail: "text-[0.76rem] md:text-[0.84rem]",
    wordGap: "-mt-1 md:-mt-1.5",
  },
  mobile: {
    container: "gap-3.5",
    icon: "h-14 w-14",
    text: "text-[1.22rem]",
    detail: "text-sm",
    wordGap: "-mt-0.5",
  },
  footer: {
    container: "gap-4",
    icon: "h-16 w-16",
    text: "text-[1.35rem]",
    detail: "text-sm",
    wordGap: "-mt-0.5",
  },
};

const themeClasses: Record<
  BrandLockupTheme,
  {
    primary: string;
    secondary: string;
    detail: string;
    badgeTone: "brand" | "light";
    badgeWrap: string;
  }
> = {
  light: {
    primary: "text-green-950",
    secondary: "text-amber-600",
    detail: "text-neutral-500",
    badgeTone: "brand",
    badgeWrap:
      "bg-white ring-1 ring-green-900/8 shadow-[0_18px_42px_rgba(15,36,25,0.1)]",
  },
  dark: {
    primary: "text-white",
    secondary: "text-amber-300",
    detail: "text-white/70",
    badgeTone: "light",
    badgeWrap:
      "bg-white/10 ring-1 ring-white/10 shadow-[0_18px_42px_rgba(0,0,0,0.22)]",
  },
};

export default function BrandLockup({
  theme = "light",
  size = "header",
  detail,
  className,
  detailClassName,
}: BrandLockupProps) {
  const language = useSiteLanguage();
  const sizing = sizeClasses[size];
  const palette = themeClasses[theme];

  return (
    <Link
      href={withLanguagePath("/", language)}
      className={cn("inline-flex items-center", sizing.container, className)}
      aria-label={
        language === "hi"
          ? `${APP_BUSINESS_NAME} मुखपृष्ठ`
          : `${APP_BUSINESS_NAME} home`
      }
    >
      <span
        className={cn(
          "flex shrink-0 items-center justify-center rounded-[24px] p-2.5",
          sizing.icon,
          palette.badgeWrap
        )}
      >
        <SolarBadgeMark tone={palette.badgeTone} className="h-full w-full" />
      </span>

      <span className="flex min-w-0 flex-col">
        <span
          className={cn(
            "flex flex-col font-semibold leading-[0.86] tracking-[-0.05em]",
            sizing.text
          )}
        >
          <span className={palette.primary}>Maa Sharda</span>
          <span className={cn(palette.secondary, sizing.wordGap)}>
            Distributors
          </span>
        </span>

        {detail ? (
          <span
            className={cn(
              "mt-2 leading-5",
              sizing.detail,
              palette.detail,
              detailClassName
            )}
          >
            {detail}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
