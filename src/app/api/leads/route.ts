import { NextRequest, NextResponse } from "next/server";

import { sendLeadEmail } from "@/lib/mailer";
import { appendLeadToNotion } from "@/lib/notion";
import { appendLeadToSheet } from "@/lib/sheets";
import { buildWhatsAppLeadMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import type { LeadFormData, LeadResponse } from "@/types/lead";

export async function POST(req: NextRequest) {
  try {
    const body: LeadFormData = await req.json();

    if (!body.name?.trim() || !body.phone?.trim()) {
      return NextResponse.json(
        { success: false, message: "Name and phone are required" },
        { status: 400 }
      );
    }

    const lead: LeadFormData = {
      ...body,
      name: body.name.trim(),
      phone: body.phone.trim(),
      timestamp: new Date().toISOString(),
    };

    console.log("[NEW LEAD]", lead);

    const results = await Promise.allSettled([
      sendLeadEmail(lead),
      appendLeadToSheet(lead),
      appendLeadToNotion(lead),
    ]);

    results.forEach((result, index) => {
      const destination = ["Email", "Google Sheets", "Notion"][index];
      if (result.status === "rejected") {
        console.error(`[LEAD] ${destination} failed:`, result.reason);
      } else {
        console.log(`[LEAD] ${destination} success`);
      }
    });

    const whatsappUrl = buildWhatsAppUrl(
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919355570048",
      buildWhatsAppLeadMessage(lead)
    );

    return NextResponse.json({
      success: true,
      message: "Lead received",
      whatsappUrl,
    } satisfies LeadResponse);
  } catch (error) {
    console.error("[LEAD API ERROR]", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
