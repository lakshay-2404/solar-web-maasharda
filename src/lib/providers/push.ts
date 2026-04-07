import { normalisePhoneNumber } from "@/lib/phone";
import {
  deactivatePushSubscriptionInSheet,
  findPushSubscriptionsByPhoneFromSheet,
  listActivePushSubscriptionsFromSheet,
  upsertPushSubscriptionInSheet,
} from "@/lib/sheets";
import type {
  PushSubscriptionPayload,
  PushSubscriptionRequest,
  StoredPushSubscription,
} from "@/types/push";

import {
  getPushStorageProviders,
  type PushStorageProviderName,
} from "./config";
import {
  deactivatePushSubscriptionInWebhook,
  upsertPushSubscriptionInWebhook,
} from "./webhook";
import type { ProviderWriteSummary } from "./leads";

function requirePushSubscriptionKeys(
  subscription: PushSubscriptionPayload
) {
  if (
    !subscription.endpoint ||
    !subscription.keys?.auth ||
    !subscription.keys?.p256dh
  ) {
    throw new Error("Push subscription payload is incomplete.");
  }
}

export function createStoredPushSubscription(
  payload: PushSubscriptionRequest
): StoredPushSubscription {
  requirePushSubscriptionKeys(payload.subscription);

  const timestamp = new Date().toISOString();

  return {
    endpoint: payload.subscription.endpoint,
    p256dh: payload.subscription.keys!.p256dh!,
    auth: payload.subscription.keys!.auth!,
    phone: payload.phone ? normalisePhoneNumber(payload.phone) : undefined,
    locale: payload.locale,
    source: payload.source,
    consentContext: payload.consentContext,
    userAgent: payload.userAgent,
    active: true,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

const pushUpsertHandlers: Record<
  PushStorageProviderName,
  (record: StoredPushSubscription) => Promise<void>
> = {
  sheets: upsertPushSubscriptionInSheet,
  webhook: upsertPushSubscriptionInWebhook,
};

const pushDeactivateHandlers: Record<
  PushStorageProviderName,
  (endpoint: string) => Promise<void>
> = {
  sheets: deactivatePushSubscriptionInSheet,
  webhook: deactivatePushSubscriptionInWebhook,
};

function summarisePushWrites(
  providers: PushStorageProviderName[],
  settledResults: PromiseSettledResult<void>[]
): ProviderWriteSummary<PushStorageProviderName> {
  const results = settledResults.map((result, index) => {
    const provider = providers[index];

    if (result.status === "fulfilled") {
      return {
        provider,
        success: true,
      };
    }

    return {
      provider,
      success: false,
      error:
        result.reason instanceof Error
          ? result.reason.message
          : "Unknown provider error",
    };
  });

  return {
    successCount: results.filter((result) => result.success).length,
    failureCount: results.filter((result) => !result.success).length,
    results,
  };
}

export async function storePushSubscriptionWithProviders(
  payload: PushSubscriptionRequest
) {
  const providers = getPushStorageProviders();

  if (!providers.length) {
    throw new Error("No push storage providers are enabled.");
  }

  const storedSubscription = createStoredPushSubscription(payload);
  const settledResults = await Promise.allSettled(
    providers.map((provider) => pushUpsertHandlers[provider](storedSubscription))
  );

  return {
    storedSubscription,
    ...summarisePushWrites(providers, settledResults),
  };
}

export async function deactivatePushSubscriptionWithProviders(endpoint: string) {
  const providers = getPushStorageProviders();

  if (!providers.length) {
    throw new Error("No push storage providers are enabled.");
  }

  const settledResults = await Promise.allSettled(
    providers.map((provider) => pushDeactivateHandlers[provider](endpoint))
  );

  return summarisePushWrites(providers, settledResults);
}

export async function listActivePushSubscriptions() {
  if (!getPushStorageProviders().includes("sheets")) {
    return [];
  }

  try {
    return await listActivePushSubscriptionsFromSheet();
  } catch (error) {
    console.error("[PUSH] Unable to list active subscriptions from Sheets:", error);
    return [];
  }
}

export async function findPushSubscriptionsByPhone(phone: string) {
  if (!getPushStorageProviders().includes("sheets")) {
    return [];
  }

  try {
    return await findPushSubscriptionsByPhoneFromSheet(phone);
  } catch (error) {
    console.error("[PUSH] Unable to look up subscriptions by phone:", error);
    return [];
  }
}
