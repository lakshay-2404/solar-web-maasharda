import Link from "next/link";

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
    svg: string;
    text: string;
    detail: string;
  }
> = {
  header: {
    container: "gap-3.5",
    icon: "h-12 w-12 md:h-14 md:w-14",
    svg: "h-6 w-6 md:h-7 md:w-7",
    text: "text-base md:text-[1.24rem]",
    detail: "text-[0.72rem] md:text-xs",
  },
  mobile: {
    container: "gap-3.5",
    icon: "h-12 w-12",
    svg: "h-6 w-6",
    text: "text-[1.12rem]",
    detail: "text-xs",
  },
  footer: {
    container: "gap-4",
    icon: "h-14 w-14",
    svg: "h-7 w-7",
    text: "text-[1.22rem]",
    detail: "text-sm",
  },
};

const themeClasses: Record<
  BrandLockupTheme,
  {
    icon: string;
    primary: string;
    secondary: string;
    detail: string;
  }
> = {
  light: {
    icon: "bg-green-100 text-green-900 ring-1 ring-green-900/5",
    primary: "text-green-950",
    secondary: "text-amber-500",
    detail: "text-neutral-500",
  },
  dark: {
    icon: "bg-white/10 text-amber-300 ring-1 ring-white/10",
    primary: "text-white",
    secondary: "text-amber-400",
    detail: "text-white/65",
  },
};

export default function BrandLockup({
  theme = "light",
  size = "header",
  detail,
  className,
  detailClassName,
}: BrandLockupProps) {
  const sizing = sizeClasses[size];
  const palette = themeClasses[theme];

  return (
    <Link
      href="/"
      className={cn("inline-flex items-center", sizing.container, className)}
      aria-label="Maa Sharda Distributors home"
    >
      <span
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full shadow-[0_12px_28px_rgba(15,36,25,0.08)]",
          sizing.icon,
          palette.icon
        )}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={sizing.svg}>
          <circle cx="12" cy="12" r="4" fill="currentColor" />
          <path
            d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.7 4.7l2.1 2.1M17.2 17.2l2.1 2.1M19.3 4.7l-2.1 2.1M6.8 17.2l-2.1 2.1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>

      <span className="flex min-w-0 flex-col">
        <span
          className={cn(
            "flex flex-col font-semibold leading-[0.98] tracking-[-0.03em]",
            sizing.text
          )}
        >
          <span className={palette.primary}>Maa Sharda</span>
          <span className={cn("mt-1", palette.secondary)}>Distributors</span>
        </span>

        {detail ? (
          <span
            className={cn(
              "mt-1.5 leading-5",
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
