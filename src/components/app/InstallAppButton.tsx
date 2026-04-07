"use client";

import { CheckCircle2, Download, LoaderCircle } from "lucide-react";
import { useState } from "react";

import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { cn } from "@/lib/utils";

import { useAppRuntime } from "./AppRuntimeProvider";

interface InstallAppButtonProps {
  className?: string;
  label?: string;
}

export default function InstallAppButton({
  className,
  label,
}: InstallAppButtonProps) {
  const language = useSiteLanguage();
  const { canInstall, isInstalled, promptInstall } = useAppRuntime();
  const [pending, setPending] = useState(false);
  const resolvedLabel = label ?? (language === "hi" ? "ऐप इंस्टॉल करें" : "Install app");
  const readyLabel = language === "hi" ? "ऐप तैयार" : "App ready";

  if (!canInstall && !isInstalled) {
    return null;
  }

  const handleClick = async () => {
    if (!canInstall) {
      return;
    }

    setPending(true);

    try {
      await promptInstall();
    } finally {
      setPending(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!canInstall || pending}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[18px] border px-4 py-3 text-sm font-medium transition-colors",
        isInstalled
          ? "border-green-900/10 bg-green-100 text-green-900"
          : "border-border bg-white text-green-900 hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-70",
        className
      )}
    >
      {pending ? (
        <LoaderCircle className="h-4 w-4 animate-spin" />
      ) : isInstalled ? (
        <CheckCircle2 className="h-4 w-4" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      {isInstalled ? readyLabel : resolvedLabel}
    </button>
  );
}
