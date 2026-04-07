import type { NextRequest } from "next/server";

import { getAutomationApiSecret } from "./providers/config";

export function isProtectedAutomationRequest(request: NextRequest) {
  const expectedSecret = getAutomationApiSecret();

  if (!expectedSecret) {
    return false;
  }

  const authorizationHeader = request.headers.get("authorization");
  const bearerToken = authorizationHeader?.replace(/^Bearer\s+/i, "").trim();
  const directSecret = request.headers.get("x-automation-secret")?.trim();

  return bearerToken === expectedSecret || directSecret === expectedSecret;
}
