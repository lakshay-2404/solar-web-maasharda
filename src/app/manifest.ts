import type { MetadataRoute } from "next";

import {
  APP_BACKGROUND_COLOR,
  APP_NAME,
  APP_THEME_COLOR,
} from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: APP_NAME,
    short_name: APP_NAME,
    description:
      "Solar planning, subsidy paperwork, net metering support, installation guidance aur fast contact access for Haryana homes and businesses.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: APP_BACKGROUND_COLOR,
    theme_color: APP_THEME_COLOR,
    lang: "hi-IN",
    categories: ["business", "productivity", "utilities"],
    icons: [
      {
        src: "/api/app-icon?size=192",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/api/app-icon?size=512",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
