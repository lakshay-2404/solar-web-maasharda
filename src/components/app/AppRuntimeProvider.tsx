"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  flushQueuedLeadSubmissions,
  requestLeadBackgroundSync,
} from "@/lib/lead-queue";
import {
  getLanguageFromPathname,
  type SiteLanguage,
} from "@/lib/site-language";

interface SubscribeNotificationOptions {
  phone?: string;
  source?: string;
  consentContext?: string;
}

interface AppRuntimeActionResult {
  success: boolean;
  message: string;
}

interface AppRuntimeContextValue {
  canInstall: boolean;
  isInstalled: boolean;
  isSubscribed: boolean;
  notificationsSupported: boolean;
  notificationPermission: NotificationPermission | "unsupported";
  promptInstall: () => Promise<boolean>;
  subscribeToNotifications: (
    options?: SubscribeNotificationOptions
  ) => Promise<AppRuntimeActionResult>;
  unsubscribeFromNotifications: () => Promise<AppRuntimeActionResult>;
  flushQueuedLeads: () => Promise<{
    sentCount: number;
    remainingCount: number;
  }>;
}

const AppRuntimeContext = createContext<AppRuntimeContextValue | null>(null);

function getRuntimeCopy(language: SiteLanguage) {
  if (language === "en") {
    return {
      notificationsUnsupported:
        "Notifications are not available on this device or browser.",
      notificationsAllow: "Allow notifications to receive updates.",
      notificationsEnabled: "Notifications enabled.",
      notificationsLinked:
        "Status updates are linked to this phone number.",
      notificationsFailed: "Notifications could not be enabled.",
      notificationsDisabled: "Notifications disabled.",
      notificationsDisableFailed:
        "Notifications could not be disabled.",
    };
  }

  return {
    notificationsUnsupported:
      "इस डिवाइस या ब्राउज़र पर notifications उपलब्ध नहीं हैं।",
    notificationsAllow:
      "अपडेट पाने के लिए notifications allow करें।",
    notificationsEnabled: "Notifications चालू हो गई हैं।",
    notificationsLinked:
      "स्थिति अपडेट इस फोन नंबर से जोड़ दिए गए हैं।",
    notificationsFailed: "Notifications चालू नहीं हो पाईं।",
    notificationsDisabled: "Notifications बंद कर दी गई हैं।",
    notificationsDisableFailed:
      "Notifications बंद नहीं हो पाईं।",
  };
}

function urlBase64ToUint8Array(value: string) {
  const padding = "=".repeat((4 - (value.length % 4)) % 4);
  const base64 = (value + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);

  return Uint8Array.from(rawData, (character) => character.charCodeAt(0));
}

function isStandaloneMode() {
  if (typeof window === "undefined") {
    return false;
  }

  const navigatorWithStandalone = navigator as Navigator & {
    standalone?: boolean;
  };

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    navigatorWithStandalone.standalone === true
  );
}

const publicWebPushKey = process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY;

export function AppRuntimeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const language = getLanguageFromPathname(pathname);
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [canInstall, setCanInstall] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [notificationsSupported, setNotificationsSupported] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<
    NotificationPermission | "unsupported"
  >("unsupported");

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.setAttribute("data-language", language);
  }, [language]);

  useEffect(() => {
    const supportsNotifications =
      Boolean(publicWebPushKey) &&
      "Notification" in window &&
      "serviceWorker" in navigator &&
      "PushManager" in window;

    setNotificationsSupported(supportsNotifications);
    setNotificationPermission(
      "Notification" in window ? Notification.permission : "unsupported"
    );
    setIsInstalled(isStandaloneMode());

    const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
      event.preventDefault();
      setInstallPrompt(event);
      setCanInstall(true);
    };

    const handleAppInstalled = () => {
      setInstallPrompt(null);
      setCanInstall(false);
      setIsInstalled(true);
    };

    const handleOnline = () => {
      void flushQueuedLeadSubmissions();
      void requestLeadBackgroundSync();
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    window.addEventListener("online", handleOnline);

    let cancelled = false;

    async function initialiseRuntime() {
      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.register("/sw.js", {
            scope: "/",
          });

          if (!cancelled && supportsNotifications) {
            const subscription = await registration.pushManager.getSubscription();
            setIsSubscribed(Boolean(subscription));
          }
        } catch (error) {
          console.error("[PWA] Service worker registration failed:", error);
        }
      }

      if (!cancelled) {
        await flushQueuedLeadSubmissions();
      }
    }

    void initialiseRuntime();

    return () => {
      cancelled = true;
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  async function promptInstall() {
    if (!installPrompt) {
      return false;
    }

    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;

    setInstallPrompt(null);
    setCanInstall(false);

    if (choice.outcome === "accepted") {
      setIsInstalled(true);
      return true;
    }

    return false;
  }

  async function subscribeToNotifications(
    options: SubscribeNotificationOptions = {}
  ): Promise<AppRuntimeActionResult> {
    const copy = getRuntimeCopy(language);

    if (!notificationsSupported || !publicWebPushKey) {
      return {
        success: false,
        message: copy.notificationsUnsupported,
      };
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);

      if (permission !== "granted") {
        return {
          success: false,
          message: copy.notificationsAllow,
        };
      }

      const registration = await navigator.serviceWorker.ready;
      const existingSubscription =
        await registration.pushManager.getSubscription();
      const subscription =
        existingSubscription ||
        (await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicWebPushKey),
        }));

      const response = await fetch("/api/push/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscription: subscription.toJSON(),
          phone: options.phone,
          locale: navigator.language,
          source: options.source || window.location.pathname,
          consentContext: options.consentContext || "manual_opt_in",
          userAgent: navigator.userAgent,
        }),
      });
      const data = (await response.json()) as AppRuntimeActionResult;

      if (!response.ok || !data.success) {
        throw new Error(data.message || copy.notificationsFailed);
      }

      setIsSubscribed(true);

      return {
        success: true,
        message: options.phone
          ? copy.notificationsLinked
          : copy.notificationsEnabled,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : copy.notificationsFailed,
      };
    }
  }

  async function unsubscribeFromNotifications(): Promise<AppRuntimeActionResult> {
    const copy = getRuntimeCopy(language);

    if (!notificationsSupported) {
      return {
        success: false,
        message: copy.notificationsUnsupported,
      };
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        await subscription.unsubscribe();
        await fetch("/api/push/unsubscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            endpoint: subscription.endpoint,
          }),
        });
      }

      setIsSubscribed(false);

      return {
        success: true,
        message: copy.notificationsDisabled,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error ? error.message : copy.notificationsDisableFailed,
      };
    }
  }

  const value: AppRuntimeContextValue = {
    canInstall,
    isInstalled,
    isSubscribed,
    notificationsSupported,
    notificationPermission,
    promptInstall,
    subscribeToNotifications,
    unsubscribeFromNotifications,
    flushQueuedLeads: flushQueuedLeadSubmissions,
  };

  return (
    <AppRuntimeContext.Provider value={value}>
      {children}
    </AppRuntimeContext.Provider>
  );
}

export function useAppRuntime() {
  const context = useContext(AppRuntimeContext);

  if (!context) {
    throw new Error("useAppRuntime must be used within AppRuntimeProvider.");
  }

  return context;
}

export default AppRuntimeProvider;
