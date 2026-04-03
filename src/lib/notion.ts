import { Client } from "@notionhq/client";

import type { LeadFormData } from "@/types/lead";

function isPlaceholder(value?: string | null) {
  return !value || value === "xxxxx" || value.startsWith("secret_xxxxx");
}

function getNotionClient() {
  const auth = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_LEADS_DATABASE_ID;

  if (isPlaceholder(auth) || isPlaceholder(databaseId)) {
    throw new Error("Notion integration is not configured.");
  }

  return {
    databaseId: databaseId!,
    notion: new Client({ auth: auth! }),
  };
}

export async function appendLeadToNotion(lead: LeadFormData): Promise<void> {
  const { notion, databaseId } = getNotionClient();

  await notion.pages.create({
    parent: { database_id: databaseId },
    properties: {
      Name: {
        title: [{ text: { content: lead.name } }],
      },
      Phone: {
        phone_number: lead.phone,
      },
      Source: {
        rich_text: [{ text: { content: lead.source } }],
      },
      "Monthly Bill": {
        number: lead.monthlyBill ? Number(lead.monthlyBill) : 0,
      },
      "System Size (kW)": {
        number: lead.systemSize ? Number(lead.systemSize) : 0,
      },
      Status: {
        select: { name: "New" },
      },
      Timestamp: {
        date: { start: lead.timestamp },
      },
    },
  });
}
