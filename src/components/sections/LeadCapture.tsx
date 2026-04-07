"use client";

import { CheckCircle2, LoaderCircle, MessageCircle, PhoneCall } from "lucide-react";
import { useEffect, useState } from "react";

import {
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  DEFAULT_WHATSAPP_NUMBER,
  LEAD_CAPTURE_EVENT,
  LEAD_CAPTURE_STORAGE_KEY,
  WHATSAPP_NUMBER,
} from "@/lib/constants";
import { Input } from "@/components/ui/input";
import type { LeadResponse } from "@/types/lead";
import { buildWhatsAppLeadMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

interface LeadCaptureProps {
  source?: string;
  heading?: string;
  description?: string;
}

interface LeadPrefillData {
  systemSize?: string;
  monthlyBill?: string;
}

function extractPhoneDigits(value: string) {
  return value.replace(/\D/g, "");
}

function normalisePhoneNumber(value: string) {
  const digits = extractPhoneDigits(value);

  if (digits.length === 10) {
    return `+91${digits}`;
  }

  if (digits.length === 12 && digits.startsWith("91")) {
    return `+${digits}`;
  }

  if (value.startsWith("+")) {
    return value;
  }

  return value;
}

function hasValidPhoneNumber(value: string) {
  const digits = extractPhoneDigits(value);
  return digits.length === 10 || (digits.length === 12 && digits.startsWith("91"));
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

export default function LeadCapture({
  source = "landing_page",
  heading = "मुफ्त परामर्श लें",
  description = "Naam, phone, preferred system aur monthly bill share kariye. Hum WhatsApp par clear next step bhej denge.",
}: LeadCaptureProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [systemSize, setSystemSize] = useState("");
  const [monthlyBill, setMonthlyBill] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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

  const formattedSystemSize = prefill.systemSize
    ? prefill.systemSize.includes("kW") || prefill.systemSize.includes("मार्गदर्शन")
      ? prefill.systemSize
      : `${prefill.systemSize} kW`
    : null;

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
      setError("कृपया अपना नाम भरें।");
      return;
    }

    if (!hasValidPhoneNumber(normalisedPhone)) {
      setError("कृपया 10 अंकों का सही फोन नंबर भरें।");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          phone: normalisedPhone,
          source,
          systemSize: systemSize
            ? systemSize.includes("kW")
              ? systemSize
              : `${systemSize} kW`
            : undefined,
          monthlyBill: monthlyBill || undefined,
          timestamp: new Date().toISOString(),
        }),
      });

      const data = (await response.json()) as LeadResponse;

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Lead submit nahi ho paya.");
      }

      setSubmitted(true);
      if (data.whatsappUrl) {
        window.open(data.whatsappUrl, "_blank", "noopener,noreferrer");
      }
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Kuch galat ho gaya. Dobara try kariye."
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
                {heading}
              </h2>
              <p className="mt-4 max-w-md text-white/75">{description}</p>

              {formattedSystemSize || prefill.monthlyBill ? (
                <div className="mt-6 rounded-[20px] border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                  <p className="font-medium text-white">Calculator se details aa gayi hain</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {formattedSystemSize ? (
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
                        {formattedSystemSize}
                      </span>
                    ) : null}
                    {prefill.monthlyBill ? (
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
                        Monthly bill: Rs {prefill.monthlyBill}
                      </span>
                    ) : null}
                  </div>
                </div>
              ) : null}

              <div className="mt-8 space-y-4 text-sm text-white/80">
                <p>Documents collection se portal filing tak poora kaam hum sambhalte hain.</p>
                <p>Load passing, approval follow-up, installation aur meter change hum manage karte hain.</p>
                <p>Financing file ready karke application support bhi humari side se hota hai.*</p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <a
                  href={CONTACT_PHONE_HREF}
                  className="inline-flex items-center justify-center gap-2 rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  <PhoneCall className="h-4 w-4" />
                  अभी कॉल करें
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-[18px] bg-amber-500 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-400"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>

              <p className="mt-3 text-xs text-white/60">{CONTACT_PHONE_DISPLAY} | Mon-Sat, 9am-7pm</p>
            </div>

            <div className="px-6 py-10 md:px-8 md:py-12">
              {submitted ? (
                <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
                  <CheckCircle2 className="h-16 w-16 text-green-800" />
                  <h3 className="mt-5 text-2xl font-medium text-green-900">
                    शुक्रिया! हम आपको WhatsApp पर संपर्क करेंगे।
                  </h3>
                  <p className="mt-3 max-w-md text-neutral-600">
                    आपकी enquiry receive हो गई है। अगर WhatsApp tab open नहीं हुआ
                    हो तो floating button से हमें direct message भी कर सकते हैं।
                  </p>
                </div>
              ) : (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label htmlFor={`${source}-name`} className="text-sm font-medium text-green-900">
                      नाम
                    </label>
                    <Input
                      id={`${source}-name`}
                      name="name"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Aapka naam"
                      className="h-14 border-border bg-white px-4"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor={`${source}-phone`} className="text-sm font-medium text-green-900">
                      फ़ोन
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
                      सिस्टम साइज़
                    </label>
                    <select
                      id={`${source}-system`}
                      name="system-size"
                      value={systemSize}
                      onChange={(event) => setSystemSize(event.target.value)}
                      className="h-14 w-full rounded-md border border-border bg-white px-4 text-lg text-neutral-900"
                    >
                      <option value="">अपना सिस्टम चुनें</option>
                      <option value="1">1 kW</option>
                      <option value="2">2 kW</option>
                      <option value="3">3 kW</option>
                      <option value="5">5 kW</option>
                      <option value="10">10 kW</option>
                      <option value="मार्गदर्शन चाहिए">मार्गदर्शन चाहिए</option>
                      {systemSize &&
                      !["1", "2", "3", "5", "10", "मार्गदर्शन चाहिए"].includes(systemSize) ? (
                        <option value={systemSize}>{systemSize} kW</option>
                      ) : null}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor={`${source}-bill`} className="text-sm font-medium text-green-900">
                      मासिक बिल
                    </label>
                    <Input
                      id={`${source}-bill`}
                      name="monthly-bill"
                      type="number"
                      inputMode="numeric"
                      value={monthlyBill}
                      onChange={(event) => setMonthlyBill(event.target.value)}
                      placeholder="Udaharan: 3500"
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
                        Processing...
                      </>
                    ) : (
                      "मुफ्त परामर्श लें"
                    )}
                  </button>

                  <p className="text-sm text-neutral-500">
                    आपकी details safe हैं। कोई spam नहीं।
                  </p>
                  <p className="text-xs text-neutral-500">
                    * Financing availability profile aur file approval par depend करती है।
                  </p>
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
          className="fixed bottom-24 left-1/2 z-[70] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-card bg-red-600 px-4 py-3 text-sm font-medium text-white shadow-lg"
        >
          {error}
        </div>
      ) : null}
    </section>
  );
}
