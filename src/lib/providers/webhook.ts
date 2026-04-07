import type { LeadFormData } from "@/types/lead";
import type { StoredPushSubscription } from "@/types/push";

import {
  getAutomationWebhookSecret,
  getLeadWebhookUrl,
  getPushWebhookUrl,
} from "./config";

interface WebhookEnvelope<TPayload> {
  event: string;
  sentAt: string;
  payload: TPayload;
}

async function sendWebhookEvent<TPayload>(
  url: string,
  event: string,
  payload: TPayload
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "User-Agent": "Maa-Sharda-Web-App",
  };
  const webhookSecret = getAutomationWebhookSecret();

  if (webhookSecret) {
    headers["x-maa-sharda-secret"] = webhookSecret;
  }

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      event,
      sentAt: new Date().toISOString(),
      payload,
    } satisfies WebhookEnvelope<TPayload>),
  });

  if (!response.ok) {
    throw new Error(`Webhook request failed with status ${response.status}.`);
  }
}

export async function mirrorLeadToWebhook(lead: LeadFormData) {
  const url = getLeadWebhookUrl();

  if (!url) {
    throw new Error("Lead webhook is not configured.");
  }

  await sendWebhookEvent(url, "lead.created", { lead });
}

export async function upsertPushSubscriptionInWebhook(
  subscription: StoredPushSubscription
) {
  const url = getPushWebhookUrl();

  if (!url) {
    throw new Error("Push webhook is not configured.");
  }

  await sendWebhookEvent(url, "push.subscription.upserted", {
    subscription,
  });
}

export async function deactivatePushSubscriptionInWebhook(endpoint: string) {
  const url = getPushWebhookUrl();

  if (!url) {
    throw new Error("Push webhook is not configured.");
  }

  await sendWebhookEvent(url, "push.subscription.deactivated", {
    endpoint,
  });
}
