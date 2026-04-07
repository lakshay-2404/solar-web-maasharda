import { NextRequest, NextResponse } from "next/server";

import { isWebPushConfigured } from "@/lib/push";
import { storePushSubscriptionWithProviders } from "@/lib/providers/push";
import type { PushSubscriptionRequest } from "@/types/push";

export async function POST(request: NextRequest) {
  try {
    if (!isWebPushConfigured()) {
      return NextResponse.json(
        {
          success: false,
          message: "Notifications are not configured on this deployment.",
        },
        { status: 503 }
      );
    }

    const body = (await request.json()) as PushSubscriptionRequest;
    const result = await storePushSubscriptionWithProviders({
      ...body,
      locale: body.locale || request.headers.get("accept-language") || "hi-IN",
      source: body.source || "web-app",
      consentContext: body.consentContext || "manual_opt_in",
      userAgent: body.userAgent || request.headers.get("user-agent") || undefined,
    });

    if (result.successCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Notification opt-in save nahi ho paya.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Notifications enabled.",
    });
  } catch (error) {
    console.error("[PUSH] Subscribe failed:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Notification opt-in save nahi ho paya.",
      },
      { status: 500 }
    );
  }
}
