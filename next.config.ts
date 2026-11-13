import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const TURNSTILE_ORIGIN = "https://challenges.cloudflare.com";

// Pages are prerendered (Cache Components / PPR), which rules out per-request
// nonces, so inline scripts are allowed for Next's hydration payload. The site
// renders no user-supplied HTML, and everything else stays locked to 'self'.
function contentSecurityPolicy(isDev: boolean, turnstile: boolean) {
  const extra = turnstile ? ` ${TURNSTILE_ORIGIN}` : "";
  return [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}${extra}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    `connect-src 'self'${extra}`,
    `frame-src ${turnstile ? TURNSTILE_ORIGIN : "'none'"}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "manifest-src 'self'",
    "worker-src 'self' blob:",
    ...(isDev ? [] : ["upgrade-insecure-requests"]),
  ].join("; ");
}

function securityHeaders(isDev: boolean) {
  return [
    {
      key: "Content-Security-Policy",
      value: contentSecurityPolicy(isDev, Boolean(process.env.TURNSTILE_SITE_KEY)),
    },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
      key: "Permissions-Policy",
      value:
        "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
    },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
    { key: "X-DNS-Prefetch-Control", value: "off" },
    ...(isDev
      ? []
      : [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ]),
  ];
}

export default function config(phase: string): NextConfig {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const allowedOrigins = process.env.SERVER_ACTIONS_ALLOWED_ORIGINS?.split(",")
    .map((o) => o.trim())
    .filter(Boolean);

  return {
    // The dev server only trusts `localhost`; without these, opening it via
    // 127.0.0.1 or a LAN IP (phone testing) blocks HMR and the page never hydrates.
    allowedDevOrigins: ["127.0.0.1", "192.168.*.*", "10.*.*.*"],
    poweredByHeader: false,
    reactStrictMode: true,
    experimental: {
      agentFeedback: true,
      serverActions: {
        bodySizeLimit: "64kb",
        ...(allowedOrigins?.length && { allowedOrigins }),
      },
    },
    cacheComponents: true,
    partialPrefetching: true,
    images: {
      formats: ["image/avif", "image/webp"],
    },
    async headers() {
      return [
        { source: "/:path*", headers: securityHeaders(isDev) },
        {
          source: "/.well-known/security.txt",
          headers: [{ key: "Content-Type", value: "text/plain; charset=utf-8" }],
        },
      ];
    },
    turbopack: {
      rules: {
        "*.css": {
          loaders: ["@tailwindcss/turbopack"],
          as: "*.css",
        },
      },
    },
  };
}
