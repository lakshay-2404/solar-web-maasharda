import { appendLeadToSheet } from "@/lib/sheets";
import type { LeadFormData } from "@/types/lead";

import { getLeadStorageProviders, type LeadStorageProviderName } from "./config";
import { mirrorLeadToWebhook } from "./webhook";

export interface ProviderWriteResult<TProvider extends string> {
  provider: TProvider;
  success: boolean;
  error?: string;
}

export interface ProviderWriteSummary<TProvider extends string> {
  successCount: number;
  failureCount: number;
  results: ProviderWriteResult<TProvider>[];
}

const leadProviderHandlers: Record<
  LeadStorageProviderName,
  (lead: LeadFormData) => Promise<void>
> = {
  sheets: appendLeadToSheet,
  webhook: mirrorLeadToWebhook,
};

export async function storeLeadWithProviders(
  lead: LeadFormData
): Promise<ProviderWriteSummary<LeadStorageProviderName>> {
  const providers = getLeadStorageProviders();

  if (!providers.length) {
    throw new Error("No lead storage providers are enabled.");
  }

  const settledResults = await Promise.allSettled(
    providers.map(async (provider) => {
      await leadProviderHandlers[provider](lead);
      return provider;
    })
  );

  const results = settledResults.map((result, index) => {
    const provider = providers[index];

    if (result.status === "fulfilled") {
      return {
        provider,
        success: true,
      } satisfies ProviderWriteResult<LeadStorageProviderName>;
    }

    return {
      provider,
      success: false,
      error:
        result.reason instanceof Error
          ? result.reason.message
          : "Unknown provider error",
    } satisfies ProviderWriteResult<LeadStorageProviderName>;
  });

  return {
    successCount: results.filter((result) => result.success).length,
    failureCount: results.filter((result) => !result.success).length,
    results,
  };
}
