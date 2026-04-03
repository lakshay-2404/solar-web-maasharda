import nodemailer from "nodemailer";

import type { LeadFormData } from "@/types/lead";

function isPlaceholder(value?: string | null) {
  return !value || value.includes("your-") || value === "xxxxx";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getTransporter() {
  if (
    isPlaceholder(process.env.EMAIL_HOST) ||
    isPlaceholder(process.env.EMAIL_PORT) ||
    isPlaceholder(process.env.EMAIL_USER) ||
    isPlaceholder(process.env.EMAIL_PASS) ||
    isPlaceholder(process.env.EMAIL_TO)
  ) {
    throw new Error("Email delivery is not configured.");
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST!,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  });
}

export async function sendLeadEmail(lead: LeadFormData): Promise<void> {
  const transporter = getTransporter();

  await transporter.sendMail({
    from: `"Maa Sharda Solar Leads" <${process.env.EMAIL_USER!}>`,
    to: process.env.EMAIL_TO!,
    subject: `New Solar Lead - ${lead.name} (${lead.source})`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1B4332; color: white; padding: 24px; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0;">New Solar Lead</h2>
          <p style="margin: 4px 0 0; opacity: 0.8;">Maa Sharda Distributors</p>
        </div>
        <div style="background: white; padding: 24px; border: 1px solid #E5E0D8; border-radius: 0 0 8px 8px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; width: 140px;">Name</td>
                <td style="padding: 8px 0; font-weight: 500;">${escapeHtml(lead.name)}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Phone</td>
                <td style="padding: 8px 0; font-weight: 500;">${escapeHtml(lead.phone)}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Source</td>
                <td style="padding: 8px 0;">${escapeHtml(lead.source)}</td></tr>
            ${
              lead.monthlyBill
                ? `<tr><td style="padding: 8px 0; color: #666;">Monthly Bill</td>
                <td style="padding: 8px 0;">Rs ${escapeHtml(lead.monthlyBill)}</td></tr>`
                : ""
            }
            ${
              lead.systemSize
                ? `<tr><td style="padding: 8px 0; color: #666;">System Size</td>
                <td style="padding: 8px 0;">${escapeHtml(lead.systemSize)}</td></tr>`
                : ""
            }
            <tr><td style="padding: 8px 0; color: #666;">Time</td>
                <td style="padding: 8px 0;">${new Date(lead.timestamp).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td></tr>
          </table>
          <a href="https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(`Calling ${lead.name} re: solar enquiry`)}"
             style="display: inline-block; margin-top: 16px; background: #25D366; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500;">
            Reply on WhatsApp
          </a>
        </div>
      </div>
    `,
  });
}
