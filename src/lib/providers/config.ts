const PLACEHOLDER_VALUES = new Set(["xxxxx", "...", "your-value-here"]);

export type LeadStorageProviderName = "sheets" | "webhook";
export type PushStorageProviderName = "sheets" | "webhook";

function isSupportedProvider<T extends string>(
  value: string,
  supportedProviders: readonly T[]
): value is T {
  return supportedProviders.includes(value as T);
}

export function isPlaceholder(value?: string | null) {
  if (!value) {
    return true;
  }

  return PLACEHOLDER_VALUES.has(value) || value.includes("your-");
}

function readProviderList<T extends string>(
  value: string | undefined,
  fallback: readonly T[],
  supportedProviders: readonly T[]
) {
  const source = value?.trim() ? value : fallback.join(",");

  return source
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter((item): item is T => isSupportedProvider(item, supportedProviders))
    .filter((item, index, allItems) => allItems.indexOf(item) === index);
}

export function getLeadStorageProviders() {
  return readProviderList<LeadStorageProviderName>(
    process.env.LEAD_STORAGE_PROVIDERS,
    ["sheets"],
    ["sheets", "webhook"]
  );
}

export function getPushStorageProviders() {
  return readProviderList<PushStorageProviderName>(
    process.env.PUSH_STORAGE_PROVIDERS,
    ["sheets"],
    ["sheets", "webhook"]
  );
}

export function getLeadWebhookUrl() {
  const value = process.env.LEAD_WEBHOOK_URL;
  return isPlaceholder(value) ? null : value ?? null;
}

export function getPushWebhookUrl() {
  const value = process.env.PUSH_WEBHOOK_URL;
  return isPlaceholder(value) ? null : value ?? null;
}

export function getAutomationWebhookSecret() {
  const value = process.env.AUTOMATION_WEBHOOK_SECRET;
  return isPlaceholder(value) ? null : value ?? null;
}

export function getAutomationApiSecret() {
  const value = process.env.AUTOMATION_API_SECRET;
  return isPlaceholder(value) ? null : value ?? null;
}

export function getWebPushSubject() {
  const value = process.env.WEB_PUSH_SUBJECT;
  return isPlaceholder(value) ? null : value ?? null;
}

export function getWebPushPrivateKey() {
  const value = process.env.WEB_PUSH_PRIVATE_KEY;
  return isPlaceholder(value) ? null : value ?? null;
}

export function getWebPushPublicKey() {
  const value = process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY;
  return isPlaceholder(value) ? null : value ?? null;
}
