import { NextRequest, NextResponse } from "next/server";

import { deactivatePushSubscriptionWithProviders } from "@/lib/providers/push";

interface UnsubscribeRequestBody {
  endpoint?: string;
  subscription?: {
    endpoint?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as UnsubscribeRequestBody;
    const endpoint = body.endpoint || body.subscription?.endpoint;

    if (!endpoint) {
      return NextResponse.json(
        {
          success: false,
          message: "Subscription endpoint is required.",
        },
        { status: 400 }
      );
    }

    const result = await deactivatePushSubscriptionWithProviders(endpoint);

    if (result.successCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Notification opt-out save nahi ho paya.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Notifications disabled.",
    });
  } catch (error) {
    console.error("[PUSH] Unsubscribe failed:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Notification opt-out save nahi ho paya.",
      },
      { status: 500 }
    );
  }
}
