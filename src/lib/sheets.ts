import { google } from "googleapis";

import { phonesMatch } from "@/lib/phone";
import type { LeadFormData } from "@/types/lead";
import type { StoredPushSubscription } from "@/types/push";

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

const LEAD_HEADERS = [
  "Timestamp",
  "Name",
  "Phone",
  "Source",
  "Monthly Bill",
  "System Size",
  "WhatsApp",
  "Status",
];

const PUSH_HEADERS = [
  "Endpoint",
  "P256DH",
  "Auth",
  "Phone",
  "Locale",
  "Source",
  "Consent Context",
  "User Agent",
  "Active",
  "Created At",
  "Updated At",
];

function getLeadSheetName() {
  return process.env.GOOGLE_SHEETS_LEADS_SHEET || "Leads";
}

function getPushSheetName() {
  return process.env.GOOGLE_SHEETS_PUSH_SHEET || "PushSubscriptions";
}

function columnName(index: number) {
  let current = index;
  let result = "";

  while (current > 0) {
    const remainder = (current - 1) % 26;
    result = String.fromCharCode(65 + remainder) + result;
    current = Math.floor((current - 1) / 26);
  }

  return result;
}

async function listSheetTitles() {
  const { sheets, spreadsheetId } = getSheetsClient();
  const response = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "sheets.properties.title",
  });

  return (response.data.sheets || [])
    .map((sheet) => sheet.properties?.title)
    .filter((title): title is string => Boolean(title));
}

async function ensureSheetExists(title: string, headers: string[]) {
  const { sheets, spreadsheetId } = getSheetsClient();
  const existingTitles = await listSheetTitles();

  if (!existingTitles.includes(title)) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [{ addSheet: { properties: { title } } }],
      },
    });
  }

  const headerRange = `${title}!A1:${columnName(headers.length)}1`;
  const currentHeaders = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: headerRange,
  });

  if (!currentHeaders.data.values?.[0]?.length) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: headerRange,
      valueInputOption: "RAW",
      requestBody: {
        values: [headers],
      },
    });
  }
}

async function getSheetValues(title: string, headers: string[]) {
  const { sheets, spreadsheetId } = getSheetsClient();
  await ensureSheetExists(title, headers);

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${title}!A:${columnName(headers.length)}`,
  });

  return response.data.values || [];
}

export async function appendLeadToSheet(lead: LeadFormData): Promise<void> {
  const { sheets, spreadsheetId } = getSheetsClient();
  const sheetTitle = getLeadSheetName();
  await ensureSheetExists(sheetTitle, LEAD_HEADERS);

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetTitle}!A:H`,
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

function serialisePushRecord(record: StoredPushSubscription) {
  return [
    record.endpoint,
    record.p256dh,
    record.auth,
    record.phone || "",
    record.locale || "",
    record.source || "",
    record.consentContext || "",
    record.userAgent || "",
    record.active ? "TRUE" : "FALSE",
    record.createdAt,
    record.updatedAt,
  ];
}

function parsePushRow(row: string[]): StoredPushSubscription | null {
  const [endpoint, p256dh, auth, phone, locale, source, consentContext, userAgent, active, createdAt, updatedAt] =
    row;

  if (!endpoint || !p256dh || !auth) {
    return null;
  }

  return {
    endpoint,
    p256dh,
    auth,
    phone: phone || undefined,
    locale: locale || undefined,
    source: source || undefined,
    consentContext: consentContext || undefined,
    userAgent: userAgent || undefined,
    active: active !== "FALSE",
    createdAt: createdAt || new Date().toISOString(),
    updatedAt: updatedAt || createdAt || new Date().toISOString(),
  };
}

export async function upsertPushSubscriptionInSheet(
  record: StoredPushSubscription
): Promise<void> {
  const { sheets, spreadsheetId } = getSheetsClient();
  const sheetTitle = getPushSheetName();
  const rows = await getSheetValues(sheetTitle, PUSH_HEADERS);
  const existingIndex = rows.findIndex((row, index) => index > 0 && row[0] === record.endpoint);
  const values = [serialisePushRecord(record)];

  if (existingIndex > 0) {
    const rowNumber = existingIndex + 1;
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetTitle}!A${rowNumber}:${columnName(PUSH_HEADERS.length)}${rowNumber}`,
      valueInputOption: "RAW",
      requestBody: { values },
    });
    return;
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetTitle}!A:${columnName(PUSH_HEADERS.length)}`,
    valueInputOption: "RAW",
    requestBody: { values },
  });
}

export async function deactivatePushSubscriptionInSheet(endpoint: string): Promise<void> {
  const { sheets, spreadsheetId } = getSheetsClient();
  const sheetTitle = getPushSheetName();
  const rows = await getSheetValues(sheetTitle, PUSH_HEADERS);
  const existingIndex = rows.findIndex((row, index) => index > 0 && row[0] === endpoint);

  if (existingIndex <= 0) {
    return;
  }

  const row = rows[existingIndex];
  const parsed = parsePushRow(row);

  if (!parsed) {
    return;
  }

  parsed.active = false;
  parsed.updatedAt = new Date().toISOString();

  const rowNumber = existingIndex + 1;
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${sheetTitle}!A${rowNumber}:${columnName(PUSH_HEADERS.length)}${rowNumber}`,
    valueInputOption: "RAW",
    requestBody: {
      values: [serialisePushRecord(parsed)],
    },
  });
}

export async function listActivePushSubscriptionsFromSheet() {
  const rows = await getSheetValues(getPushSheetName(), PUSH_HEADERS);

  return rows
    .slice(1)
    .map((row) => parsePushRow(row))
    .filter((record): record is StoredPushSubscription => Boolean(record?.active));
}

export async function findPushSubscriptionsByPhoneFromSheet(phone: string) {
  const subscriptions = await listActivePushSubscriptionsFromSheet();

  return subscriptions.filter((record) => phonesMatch(record.phone, phone));
}
