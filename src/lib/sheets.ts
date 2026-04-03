import { google } from "googleapis";

import type { LeadFormData } from "@/types/lead";

function isPlaceholder(value?: string | null) {
  return !value || value.includes("your-") || value === "xxxxx" || value === "...";
}

function getSheetsClient() {
  const email = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const key = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (
    isPlaceholder(email) ||
    isPlaceholder(key) ||
    isPlaceholder(spreadsheetId)
  ) {
    throw new Error("Google Sheets integration is not configured.");
  }

  const auth = new google.auth.JWT({
    email: email!,
    key: key!,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return {
    spreadsheetId: spreadsheetId!,
    sheets: google.sheets({ version: "v4", auth }),
  };
}

export async function appendLeadToSheet(lead: LeadFormData): Promise<void> {
  const { sheets, spreadsheetId } = getSheetsClient();

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Leads!A:H",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          new Date(lead.timestamp).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          }),
          lead.name,
          lead.phone,
          lead.source,
          lead.monthlyBill || "",
          lead.systemSize || "",
          `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`,
          "New",
        ],
      ],
    },
  });
}
