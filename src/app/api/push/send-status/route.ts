import { NextRequest, NextResponse } from "next/server";

import { sendPushNotificationBatch } from "@/lib/push";
import { isProtectedAutomationRequest } from "@/lib/protected-api";
import { findPushSubscriptionsByPhone } from "@/lib/providers/push";
import type { PushSendRequest } from "@/types/push";

interface StatusSendRequest extends PushSendRequest {
  status?: string;
  name?: string;
}

function buildStatusBody(body: StatusSendRequest) {
  if (body.body?.trim()) {
    return body.body.trim();
  }

  if (body.status?.trim()) {
    const customerName = body.name?.trim() ? `${body.name.trim()} ji, ` : "";
    return `${customerName}aapki solar enquiry ab "${body.status.trim()}" stage mein hai.`;
  }

  return "Aapki solar enquiry par naya update available hai.";
}

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

    const body = (await request.json()) as StatusSendRequest;
    const subscriptions = body.subscriptions?.length
      ? body.subscriptions
      : body.phone
        ? await findPushSubscriptionsByPhone(body.phone)
        : [];

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
      title: body.title?.trim() || "Maa Sharda update",
      body: buildStatusBody(body),
      url: body.url || "/#lead-capture",
      tag: body.tag || "maa-sharda-status",
      data: {
        type: "lead_status",
        status: body.status,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Lead status update sent.",
      ...result,
    });
  } catch (error) {
    console.error("[PUSH] Lead status send failed:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Lead status send failed.",
      },
      { status: 500 }
    );
  }
}
