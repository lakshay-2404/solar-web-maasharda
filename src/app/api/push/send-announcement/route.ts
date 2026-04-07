import { NextRequest, NextResponse } from "next/server";

import { sendPushNotificationBatch } from "@/lib/push";
import { isProtectedAutomationRequest } from "@/lib/protected-api";
import {
  findPushSubscriptionsByPhone,
  listActivePushSubscriptions,
} from "@/lib/providers/push";
import type { PushSendRequest } from "@/types/push";

export async function POST(request: NextRequest) {
  try {
    if (!isProtectedAutomationRequest(request)) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }

    const body = (await request.json()) as PushSendRequest;

    if (!body.title?.trim() || !body.body?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Title and body are required.",
        },
        { status: 400 }
      );
    }

    const subscriptions = body.subscriptions?.length
      ? body.subscriptions
      : body.phone
        ? await findPushSubscriptionsByPhone(body.phone)
        : await listActivePushSubscriptions();

    if (!subscriptions.length) {
      return NextResponse.json(
        {
          success: false,
          message: "No matching push subscriptions were found.",
        },
        { status: 404 }
      );
    }

    const result = await sendPushNotificationBatch(subscriptions, {
      title: body.title.trim(),
      body: body.body.trim(),
      url: body.url,
      tag: body.tag || "maa-sharda-announcement",
      data: {
        type: "announcement",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Announcement sent.",
      ...result,
    });
  } catch (error) {
    console.error("[PUSH] Announcement send failed:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Announcement send failed.",
      },
      { status: 500 }
    );
  }
}
