"use client";

import { CheckCircle2, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

import {
  LEAD_CAPTURE_EVENT,
  LEAD_CAPTURE_STORAGE_KEY,
} from "@/lib/constants";
import type { LeadResponse } from "@/types/lead";
import { Input } from "@/components/ui/input";

interface LeadCaptureProps {
  source?: string;
  heading?: string;
  description?: string;
}

interface LeadPrefillData {
  systemSize?: string;
  monthlyBill?: string;
}

function normalisePhoneNumber(value: string) {
  const digits = value.replace(/\D/g, "");

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: normalisePhoneNumber(phone.trim()),
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
    <section id="lead-capture" className="section-padding scroll-mt-24 bg-white">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-[28px] border border-border bg-cream shadow-[0_24px_60px_rgba(15,36,25,0.08)]">
          <div className="grid gap-0 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="bg-green-950 px-6 py-10 text-white md:px-8 md:py-12">
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-400">
                Maa Sharda Distributors
              </p>
              <h2 className="mt-4 text-3xl font-medium leading-tight md:text-4xl">
                {heading}
              </h2>
              <p className="mt-4 max-w-md text-white/75">{description}</p>

              <div className="mt-8 space-y-4 text-sm text-white/80">
                <p>Documents collection se portal filing tak poora kaam hum sambhalte hain.</p>
                <p>Load passing, approval follow-up, installation aur meter change hum manage karte hain.</p>
                <p>Financing file ready karke application support bhi humari side se hota hai.*</p>
              </div>
            </div>

            <div className="px-6 py-10 md:px-8 md:py-12">
              {submitted ? (
                <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
                  <CheckCircle2 className="h-16 w-16 text-green-800" />
                  <h3 className="mt-5 text-2xl font-medium text-green-900">
                    Shukriya! Hum aapko WhatsApp par sampark karenge.
                  </h3>
                  <p className="mt-3 max-w-md text-neutral-600">
                    Aapki enquiry receive ho gayi hai. Agar WhatsApp tab open nahi
                    hua ho to floating button se hume direct message bhi kar sakte hain.
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
                      type="tel"
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
                      सिस्टम साइज
                    </label>
                    <select
                      id={`${source}-system`}
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
                    Aapki details safe hain. Koi spam nahi.
                  </p>
                  <p className="text-xs text-neutral-500">
                    * Financing availability profile aur file approval par depend karti hai.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {error ? (
        <div className="fixed bottom-24 left-1/2 z-[70] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-card bg-red-600 px-4 py-3 text-sm font-medium text-white shadow-lg">
          {error}
        </div>
      ) : null}
    </section>
  );
}
