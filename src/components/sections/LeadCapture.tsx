"use client";

import {
  CheckCircle2,
  LoaderCircle,
  MessageCircle,
  PhoneCall,
  WifiOff,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import NotificationToggle from "@/components/app/NotificationToggle";
import { Input } from "@/components/ui/input";
import {
  BUSINESS_HOURS_LABEL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  DEFAULT_WHATSAPP_NUMBER,
  LEAD_CAPTURE_EVENT,
  LEAD_CAPTURE_STORAGE_KEY,
  WHATSAPP_NUMBER,
} from "@/lib/constants";
import {
  flushQueuedLeadSubmissions,
  queueLeadSubmission,
  requestLeadBackgroundSync,
} from "@/lib/lead-queue";
import { hasValidPhoneNumber, normalisePhoneNumber } from "@/lib/phone";
import type { SiteLanguage } from "@/lib/site-language";
import { buildWhatsAppLeadMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import type { LeadResponse } from "@/types/lead";

interface LeadCaptureProps {
  source?: string;
  heading?: string;
  description?: string;
  language?: SiteLanguage;
}

interface LeadPrefillData {
  systemSize?: string;
  monthlyBill?: string;
}

function readStoredPrefill(): LeadPrefillData {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const rawValue = window.sessionStorage.getItem(LEAD_CAPTURE_STORAGE_KEY);
    return rawValue ? (JSON.parse(rawValue) as LeadPrefillData) : {};
  } catch {
    return {};
  }
}

function formatSystemValue(value?: string) {
  if (!value) {
    return null;
  }

  return /^\d+(\.\d+)?$/.test(value) ? `${value} kW` : value;
}

export default function LeadCapture({
  source = "landing_page",
  heading,
  description,
  language = "hi",
}: LeadCaptureProps) {
  const copy = {
    hi: {
      defaultHeading: "निःशुल्क परामर्श लें",
      defaultDescription:
        "नाम, फोन, मनचाही क्षमता और मासिक बिल बताइए। हम व्हाट्सऐप पर अगला साफ़ कदम भेजेंगे।",
      calculatorReady: "गणक से आपकी जानकारी तैयार है",
      monthlyBillLabel: "मासिक बिल",
      leftPoints: [
        "दस्तावेज जुटाने से पोर्टल आवेदन तक पूरा काम हम संभालते हैं।",
        "लोड पासिंग, मंजूरी का अनुसरण, स्थापना और मीटर परिवर्तन भी हम ही देखते हैं।",
        "ऐप स्थापित रखने और सूचनाएं चालू रखने से आगे की जानकारी पाना और आसान हो जाता है।",
      ],
      callNow: "अभी कॉल करें",
      queuedTitle: "आपकी पूछताछ सुरक्षित है और अपने आप भेज दी जाएगी।",
      queuedDescription:
        "जैसे ही इंटरनेट वापस आएगा, फॉर्म जमा हो जाएगा। अगर बात जरूरी हो, तो कॉल या व्हाट्सऐप से सीधे संपर्क करें।",
      successTitle: "धन्यवाद! हम आपसे व्हाट्सऐप पर संपर्क करेंगे।",
      successDescription:
        "आपकी पूछताछ मिल गई है। अगर व्हाट्सऐप विंडो न खुले, तो नीचे दिए गए विकल्पों से सीधे बात कर सकते हैं।",
      callShort: "कॉल करें",
      notificationLabel: "स्थिति की सूचना फोन पर पाएं",
      notificationEnabled: "स्थिति सूचनाएं चालू",
      name: "नाम",
      namePlaceholder: "आपका नाम",
      phone: "फोन",
      system: "प्रणाली क्षमता",
      systemPlaceholder: "अपनी क्षमता चुनें",
      needGuidance: "मार्गदर्शन चाहिए",
      bill: "मासिक बिल",
      billPlaceholder: "उदाहरण: 3500",
      submit: "निःशुल्क परामर्श लें",
      processing: "प्रक्रिया जारी है...",
      privacy: "आपकी जानकारी सुरक्षित रहती है। कोई अनचाहा संदेश नहीं।",
      financeNote: "* वित्त सहायता उपलब्धता आपकी प्रोफ़ाइल और फाइल स्वीकृति पर निर्भर करती है।",
      emptyName: "कृपया अपना नाम भरें।",
      invalidPhone: "कृपया 10 अंकों का सही फोन नंबर भरें।",
      genericError: "कुछ गलत हो गया। कृपया दोबारा कोशिश करें।",
      whatsappLabel: "व्हाट्सऐप",
    },
    en: {
      defaultHeading: "Get a free consultation",
      defaultDescription:
        "Share your name, phone, preferred system, and monthly bill. We will send a clear next step on WhatsApp.",
      calculatorReady: "Your calculator details are ready",
      monthlyBillLabel: "Monthly bill",
      leftPoints: [
        "We handle the full process from document collection to portal filing.",
        "We manage load passing, approval follow-up, installation, and meter change.",
        "Installing the app and turning on notifications makes follow-up easier.",
      ],
      callNow: "Call now",
      queuedTitle: "Your enquiry is safe and will auto-sync.",
      queuedDescription:
        "The form will submit as soon as the connection is back. If it is urgent, you can also call or message us directly on WhatsApp.",
      successTitle: "Thank you. We will contact you on WhatsApp.",
      successDescription:
        "Your enquiry has been received. If WhatsApp did not open, you can still reach us directly with the options below.",
      callShort: "Call now",
      notificationLabel: "Get status updates on your phone",
      notificationEnabled: "Status alerts on",
      name: "Name",
      namePlaceholder: "Your name",
      phone: "Phone",
      system: "System size",
      systemPlaceholder: "Choose your system",
      needGuidance: "Need guidance",
      bill: "Monthly bill",
      billPlaceholder: "Example: 3500",
      submit: "Get free consultation",
      processing: "Processing...",
      privacy: "Your details stay safe. No spam.",
      financeNote: "* Financing availability depends on profile and file approval.",
      emptyName: "Please enter your name.",
      invalidPhone: "Please enter a valid 10-digit phone number.",
      genericError: "Something went wrong. Please try again.",
      whatsappLabel: "WhatsApp",
    },
  }[language];

  const finalHeading = heading ?? copy.defaultHeading;
  const finalDescription = description ?? copy.defaultDescription;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [systemSize, setSystemSize] = useState("");
  const [monthlyBill, setMonthlyBill] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [queued, setQueued] = useState(false);
  const [error, setError] = useState("");
  const [prefill, setPrefill] = useState<LeadPrefillData>({});

  useEffect(() => {
    const syncPrefill = () => setPrefill(readStoredPrefill());
    syncPrefill();
    window.addEventListener(LEAD_CAPTURE_EVENT, syncPrefill as EventListener);

    return () => {
      window.removeEventListener(LEAD_CAPTURE_EVENT, syncPrefill as EventListener);
    };
  }, []);

  useEffect(() => {
    if (prefill.systemSize && !systemSize) {
      setSystemSize(prefill.systemSize);
    }

    if (prefill.monthlyBill && !monthlyBill) {
      setMonthlyBill(prefill.monthlyBill);
    }
  }, [monthlyBill, prefill.monthlyBill, prefill.systemSize, systemSize]);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timeout = window.setTimeout(() => setError(""), 4000);
    return () => window.clearTimeout(timeout);
  }, [error]);

  const formattedSystemSize = formatSystemValue(prefill.systemSize);
  const systemChoices = useMemo(
    () => ["1", "2", "3", "5", "10", copy.needGuidance],
    [copy.needGuidance]
  );

  const whatsappHref = buildWhatsAppUrl(
    WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER,
    buildWhatsAppLeadMessage({
      source: "Lead capture card",
      systemSize: formattedSystemSize || undefined,
      monthlyBill: prefill.monthlyBill,
    })
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const normalisedPhone = normalisePhoneNumber(phone.trim());

    if (!trimmedName) {
      setError(copy.emptyName);
      return;
    }

    if (!hasValidPhoneNumber(normalisedPhone)) {
      setError(copy.invalidPhone);
      return;
    }

    const payload = {
      name: trimmedName,
      phone: normalisedPhone,
      source,
      systemSize: formatSystemValue(systemSize) || undefined,
      monthlyBill: monthlyBill || undefined,
      timestamp: new Date().toISOString(),
    };

    setLoading(true);
    setError("");

    const queueForRetry = async () => {
      await queueLeadSubmission(payload);
      await requestLeadBackgroundSync();
      setSubmitted(true);
      setQueued(true);
    };

    try {
      if (!navigator.onLine) {
        await queueForRetry();
        return;
      }

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as LeadResponse;

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Lead submit failed.");
      }

      setSubmitted(true);
      setQueued(Boolean(data.queued));

      if (data.whatsappUrl) {
        window.open(data.whatsappUrl, "_blank", "noopener,noreferrer");
      }

      void flushQueuedLeadSubmissions();
    } catch (submitError) {
      const networkLikeFailure =
        !navigator.onLine ||
        (submitError instanceof TypeError &&
          submitError.message.toLowerCase().includes("fetch"));

      if (networkLikeFailure) {
        try {
          await queueForRetry();
          return;
        } catch (queueError) {
          console.error("[LEAD] Queue fallback failed:", queueError);
        }
      }

      setError(
        submitError instanceof Error ? submitError.message : copy.genericError
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="lead-capture" className="section-padding scroll-mt-28 bg-white">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-[28px] border border-border bg-cream shadow-[0_24px_60px_rgba(15,36,25,0.08)]">
          <div className="grid gap-0 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="bg-green-950 px-6 py-10 text-white md:px-8 md:py-12">
              <p className="text-base font-semibold uppercase tracking-[0.16em] text-amber-400">
                Maa Sharda Distributors
              </p>
              <h2 className="mt-4 text-3xl font-medium leading-tight md:text-4xl">
                {finalHeading}
              </h2>
              <p className="mt-4 max-w-md text-white/75">{finalDescription}</p>

              {formattedSystemSize || prefill.monthlyBill ? (
                <div className="mt-6 rounded-[20px] border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                  <p className="font-medium text-white">{copy.calculatorReady}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {formattedSystemSize ? (
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
                        {formattedSystemSize}
                      </span>
                    ) : null}
                    {prefill.monthlyBill ? (
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
                        {copy.monthlyBillLabel}: Rs {prefill.monthlyBill}
                      </span>
                    ) : null}
                  </div>
                </div>
              ) : null}

              <div className="mt-8 space-y-4 text-sm text-white/80">
                {copy.leftPoints.map((point) => (
                  <p key={point}>{point}</p>
                ))}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <a
                  href={CONTACT_PHONE_HREF}
                  className="inline-flex items-center justify-center gap-2 rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  <PhoneCall className="h-4 w-4" />
                  {copy.callNow}
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-[18px] bg-amber-500 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-400"
                >
                  <MessageCircle className="h-4 w-4" />
                  {copy.whatsappLabel}
                </a>
              </div>

              <p className="mt-3 text-xs text-white/60">
                {CONTACT_PHONE_DISPLAY} | {BUSINESS_HOURS_LABEL[language]}
              </p>
            </div>

            <div className="px-6 py-10 md:px-8 md:py-12">
              {submitted ? (
                <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
                  {queued ? (
                    <WifiOff className="h-16 w-16 text-amber-500" />
                  ) : (
                    <CheckCircle2 className="h-16 w-16 text-green-800" />
                  )}
                  <h3 className="mt-5 text-2xl font-medium text-green-900">
                    {queued ? copy.queuedTitle : copy.successTitle}
                  </h3>
                  <p className="mt-3 max-w-md text-neutral-600">
                    {queued ? copy.queuedDescription : copy.successDescription}
                  </p>

                  <div className="mt-6 grid w-full max-w-md gap-3 sm:grid-cols-2">
                    <a
                      href={CONTACT_PHONE_HREF}
                      className="inline-flex items-center justify-center gap-2 rounded-[18px] border border-border bg-white px-4 py-3 text-sm font-medium text-green-900 shadow-sm"
                    >
                      <PhoneCall className="h-4 w-4" />
                      {copy.callShort}
                    </a>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-[18px] bg-green-900 px-4 py-3 text-sm font-medium text-white shadow-sm"
                    >
                      <MessageCircle className="h-4 w-4" />
                      {copy.whatsappLabel}
                    </a>
                  </div>

                  {!queued ? (
                    <NotificationToggle
                      className="mt-4 w-full max-w-md justify-center"
                      phone={normalisePhoneNumber(phone)}
                      source="lead_capture_success"
                      consentContext="lead_submitted"
                      label={copy.notificationLabel}
                      enabledLabel={copy.notificationEnabled}
                      subscribeOnly
                    />
                  ) : null}
                </div>
              ) : (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label htmlFor={`${source}-name`} className="text-sm font-medium text-green-900">
                      {copy.name}
                    </label>
                    <Input
                      id={`${source}-name`}
                      name="name"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder={copy.namePlaceholder}
                      className="h-14 border-border bg-white px-4"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor={`${source}-phone`} className="text-sm font-medium text-green-900">
                      {copy.phone}
                    </label>
                    <Input
                      id={`${source}-phone`}
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      inputMode="numeric"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      onBlur={() => setPhone((currentValue) => normalisePhoneNumber(currentValue))}
                      placeholder="+91 XXXXX XXXXX"
                      className="h-14 border-border bg-white px-4"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor={`${source}-system`} className="text-sm font-medium text-green-900">
                      {copy.system}
                    </label>
                    <select
                      id={`${source}-system`}
                      name="system-size"
                      value={systemSize}
                      onChange={(event) => setSystemSize(event.target.value)}
                      className="h-14 w-full rounded-md border border-border bg-white px-4 text-lg text-neutral-900"
                    >
                      <option value="">{copy.systemPlaceholder}</option>
                      {systemChoices.map((choice) => (
                        <option key={choice} value={choice}>
                          {/^\d+(\.\d+)?$/.test(choice) ? `${choice} kW` : choice}
                        </option>
                      ))}
                      {systemSize && !systemChoices.includes(systemSize) ? (
                        <option value={systemSize}>{formatSystemValue(systemSize)}</option>
                      ) : null}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor={`${source}-bill`} className="text-sm font-medium text-green-900">
                      {copy.bill}
                    </label>
                    <Input
                      id={`${source}-bill`}
                      name="monthly-bill"
                      type="number"
                      inputMode="numeric"
                      value={monthlyBill}
                      onChange={(event) => setMonthlyBill(event.target.value)}
                      placeholder={copy.billPlaceholder}
                      className="h-14 border-border bg-white px-4"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <LoaderCircle className="h-5 w-5 animate-spin" />
                        {copy.processing}
                      </>
                    ) : (
                      copy.submit
                    )}
                  </button>

                  <p className="text-sm text-neutral-500">{copy.privacy}</p>
                  <p className="text-xs text-neutral-500">{copy.financeNote}</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {error ? (
        <div
          role="alert"
          aria-live="polite"
          className="fixed bottom-[calc(7.5rem+env(safe-area-inset-bottom))] left-1/2 z-[70] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-card bg-red-600 px-4 py-3 text-sm font-medium text-white shadow-lg md:bottom-24"
        >
          {error}
        </div>
      ) : null}
    </section>
  );
}
