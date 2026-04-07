export interface PushSubscriptionPayload {
  endpoint: string;
  expirationTime?: number | null;
  keys?: {
    p256dh?: string;
    auth?: string;
  };
}

export interface StoredPushSubscription {
  endpoint: string;
  p256dh: string;
  auth: string;
  phone?: string;
  locale?: string;
  source?: string;
  consentContext?: string;
  userAgent?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PushSubscriptionRequest {
  subscription: PushSubscriptionPayload;
  phone?: string;
  locale?: string;
  source?: string;
  consentContext?: string;
  userAgent?: string;
}

export interface PushNotificationPayload {
  title: string;
  body: string;
  url?: string;
  tag?: string;
  icon?: string;
  badge?: string;
  data?: Record<string, boolean | number | string | null | undefined>;
}

export interface PushSendRequest extends PushNotificationPayload {
  phone?: string;
  broadcast?: boolean;
  subscriptions?: PushSubscriptionPayload[];
}
