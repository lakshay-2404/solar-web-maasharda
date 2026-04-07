import { NextRequest, NextResponse } from "next/server";

import { sendLeadEmail } from "@/lib/mailer";
import { hasValidPhoneNumber, normalisePhoneNumber } from "@/lib/phone";
import { storeLeadWithProviders } from "@/lib/providers/leads";
import { buildWhatsAppLeadMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import type { LeadFormData, LeadResponse } from "@/types/lead";

export async function POST(req: NextRequest) {
  try {
    const body: LeadFormData = await req.json();

    if (!body.name?.trim() || !body.phone?.trim()) {
      return NextResponse.json(
        { success: false, message: "Name and phone are required." },
        { status: 400 }
      );
    }

    const phone = normalisePhoneNumber(body.phone.trim());

    if (!hasValidPhoneNumber(phone)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid phone number." },
        { status: 400 }
      );
    }

    const lead: LeadFormData = {
      ...body,
      name: body.name.trim(),
      phone,
      source: body.source?.trim() || "website",
      timestamp: new Date().toISOString(),
    };

    console.log("[NEW LEAD]", lead);

    const [storageResult, emailResult] = await Promise.allSettled([
      storeLeadWithProviders(lead),
      sendLeadEmail(lead),
    ]);

    if (storageResult.status === "rejected") {
      console.error("[LEAD] Storage failed:", storageResult.reason);

      return NextResponse.json(
        {
          success: false,
          message:
            "Lead save nahi ho paya. Connection wapas aane par dobara try kariye.",
        } satisfies LeadResponse,
        { status: 503 }
      );
    }

    storageResult.value.results.forEach((result) => {
      if (result.success) {
        console.log(`[LEAD] ${result.provider} success`);
        return;
      }

      console.error(`[LEAD] ${result.provider} failed:`, result.error);
    });

    if (storageResult.value.successCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Lead save nahi ho paya. Connection wapas aane par dobara try kariye.",
        } satisfies LeadResponse,
        { status: 503 }
      );
    }

    if (emailResult.status === "rejected") {
      console.error("[LEAD] Email failed:", emailResult.reason);
    } else {
      console.log("[LEAD] Email success");
    }

    const whatsappUrl = buildWhatsAppUrl(
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919355570048",
      buildWhatsAppLeadMessage(lead)
    );

    return NextResponse.json({
      success: true,
      message: "Lead received",
      whatsappUrl,
      queued: false,
    } satisfies LeadResponse);
  } catch (error) {
    console.error("[LEAD API ERROR]", error);
    return NextResponse.json(
      { success: false, message: "Server error." },
      { status: 500 }
    );
  }
}
