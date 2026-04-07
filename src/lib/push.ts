import webPush from "web-push";

import type {
  PushNotificationPayload,
  PushSubscriptionPayload,
  StoredPushSubscription,
} from "@/types/push";

import { deactivatePushSubscriptionWithProviders } from "./providers/push";
import {
  getWebPushPrivateKey,
  getWebPushPublicKey,
  getWebPushSubject,
} from "./providers/config";

const DEFAULT_PUSH_ICON = "/api/app-icon?size=192";
const DEFAULT_PUSH_BADGE = "/api/app-icon?size=96&variant=badge";

function toWebPushSubscription(
  subscription: PushSubscriptionPayload | StoredPushSubscription
) {
  if ("p256dh" in subscription) {
    return {
      endpoint: subscription.endpoint,
      keys: {
        auth: subscription.auth,
        p256dh: subscription.p256dh,
      },
    };
  }

  if (!subscription.keys?.auth || !subscription.keys?.p256dh) {
    throw new Error("Push subscription keys are missing.");
  }

  return {
    endpoint: subscription.endpoint,
    keys: {
      auth: subscription.keys.auth,
      p256dh: subscription.keys.p256dh,
    },
  };
}

function ensureWebPushConfigured() {
  const subject = getWebPushSubject();
  const publicKey = getWebPushPublicKey();
  const privateKey = getWebPushPrivateKey();

  if (!subject || !publicKey || !privateKey) {
    throw new Error("Web push is not configured.");
  }

  webPush.setVapidDetails(subject, publicKey, privateKey);
}

export function isWebPushConfigured() {
  return Boolean(
    getWebPushSubject() &&
      getWebPushPublicKey() &&
      getWebPushPrivateKey()
  );
}

export function buildPushPayload(payload: PushNotificationPayload) {
  return JSON.stringify({
    ...payload,
    icon: payload.icon || DEFAULT_PUSH_ICON,
    badge: payload.badge || DEFAULT_PUSH_BADGE,
    data: {
      ...(payload.data || {}),
      url: payload.url || payload.data?.url || "/",
    },
  });
}

interface SendPushBatchResult {
  sentCount: number;
  failedCount: number;
  invalidatedCount: number;
}

export async function sendPushNotificationBatch(
  subscriptions: Array<PushSubscriptionPayload | StoredPushSubscription>,
  payload: PushNotificationPayload
): Promise<SendPushBatchResult> {
  ensureWebPushConfigured();

  const deduplicatedSubscriptions = Array.from(
    new Map(
      subscriptions.map((subscription) => [subscription.endpoint, subscription])
    ).values()
  );
  const invalidatedEndpoints: string[] = [];

  const settledResults = await Promise.allSettled(
    deduplicatedSubscriptions.map(async (subscription) => {
      try {
        await webPush.sendNotification(
          toWebPushSubscription(subscription),
          buildPushPayload(payload),
          {
            TTL: 60 * 60,
            urgency: "high",
            topic: payload.tag,
          }
        );
      } catch (error) {
        const statusCode =
          typeof error === "object" && error !== null && "statusCode" in error
            ? Number(error.statusCode)
            : undefined;

        if (statusCode === 404 || statusCode === 410) {
          invalidatedEndpoints.push(subscription.endpoint);
        }

        throw error;
      }
    })
  );

  if (invalidatedEndpoints.length) {
    await Promise.allSettled(
      invalidatedEndpoints.map((endpoint) =>
        deactivatePushSubscriptionWithProviders(endpoint)
      )
    );
  }

  return {
    sentCount: settledResults.filter((result) => result.status === "fulfilled")
      .length,
    failedCount: settledResults.filter((result) => result.status === "rejected")
      .length,
    invalidatedCount: invalidatedEndpoints.length,
  };
}
