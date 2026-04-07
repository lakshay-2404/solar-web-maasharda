"use client";

import { BellRing, CheckCircle2, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { cn } from "@/lib/utils";

import { useAppRuntime } from "./AppRuntimeProvider";

interface NotificationToggleProps {
  className?: string;
  phone?: string;
  source?: string;
  consentContext?: string;
  label?: string;
  enabledLabel?: string;
  subscribeOnly?: boolean;
}

export default function NotificationToggle({
  className,
  phone,
  source,
  consentContext,
  label,
  enabledLabel,
  subscribeOnly = false,
}: NotificationToggleProps) {
  const language = useSiteLanguage();
  const {
    isSubscribed,
    notificationsSupported,
    subscribeToNotifications,
    unsubscribeFromNotifications,
  } = useAppRuntime();
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState("");
  const resolvedLabel =
    label ?? (language === "hi" ? "फोन पर अपडेट्स पाएं" : "Get updates on your phone");
  const resolvedEnabledLabel =
    enabledLabel ?? (language === "hi" ? "नोटिफिकेशन ऑन" : "Notifications on");

  useEffect(() => {
    if (!feedback) {
      return;
    }

    const timeout = window.setTimeout(() => setFeedback(""), 4500);
    return () => window.clearTimeout(timeout);
  }, [feedback]);

  if (!notificationsSupported) {
    return null;
  }

  const handleClick = async () => {
    setPending(true);

    try {
      const result =
        isSubscribed && !subscribeOnly
          ? await unsubscribeFromNotifications()
          : await subscribeToNotifications({
              phone,
              source,
              consentContext,
            });

      setFeedback(result.message);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={pending}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-[18px] border px-4 py-3 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-70",
          isSubscribed
            ? "border-green-900/10 bg-green-100 text-green-900 hover:bg-green-200"
            : "border-border bg-white text-green-900 hover:bg-green-50",
          className
        )}
      >
        {pending ? (
          <LoaderCircle className="h-4 w-4 animate-spin" />
        ) : isSubscribed ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : (
          <BellRing className="h-4 w-4" />
        )}
        {isSubscribed && !subscribeOnly ? resolvedEnabledLabel : resolvedLabel}
      </button>

      {feedback ? (
        <p className="text-xs text-neutral-500">{feedback}</p>
      ) : null}
    </div>
  );
}
