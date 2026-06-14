import type { NextConfig } from "next";

// Build-time env check (logs presence only — never logs secrets)
import { logSupabaseEnvStatus } from "./src/lib/supabase/env";
logSupabaseEnvStatus("build");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

let exportedConfig: NextConfig = nextConfig;

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { withSentryConfig } = require("@sentry/nextjs");
  exportedConfig = withSentryConfig(nextConfig, {
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
    silent: !process.env.CI,
    widenClientFileUpload: true,
    disableLogger: true,
    automaticVercelMonitors: true,
  });
}

export default exportedConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
