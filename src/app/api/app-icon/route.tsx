import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

import SolarBadgeMark from "@/components/graphics/SolarBadgeMark";

export const runtime = "edge";

function readRequestedSize(request: NextRequest) {
  const rawValue = Number(request.nextUrl.searchParams.get("size") || "512");

  if (!Number.isFinite(rawValue)) {
    return 512;
  }

  return Math.min(512, Math.max(96, Math.round(rawValue)));
}

export async function GET(request: NextRequest) {
  const size = readRequestedSize(request);
  const variant = request.nextUrl.searchParams.get("variant");
  const isBadge = variant === "badge";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: isBadge
            ? "#F8F7F2"
            : "linear-gradient(135deg, #1B4332 0%, #2D6A4F 55%, #0F2419 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "82%",
            width: "82%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: size * 0.05,
            borderRadius: size * 0.22,
            background: isBadge ? "transparent" : "rgba(255, 255, 255, 0.12)",
            boxShadow: isBadge
              ? "none"
              : "0 24px 64px rgba(9, 24, 16, 0.24)",
          }}
        >
          <SolarBadgeMark
            tone={isBadge ? "badge" : "light"}
            style={{
              height: `${Math.round(size * (isBadge ? 0.58 : 0.48))}px`,
              width: `${Math.round(size * (isBadge ? 0.58 : 0.48))}px`,
            }}
          />

          {!isBadge ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "#F8F7F2",
                lineHeight: 1.05,
              }}
            >
              <span
                style={{
                  fontSize: size * 0.11,
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                }}
              >
                Maa Sharda
              </span>
              <span
                style={{
                  marginTop: size * 0.01,
                  fontSize: size * 0.07,
                  color: "#F8C15D",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Solar App
              </span>
            </div>
          ) : null}
        </div>
      </div>
    ),
    {
      width: size,
      height: size,
    }
  );
}
