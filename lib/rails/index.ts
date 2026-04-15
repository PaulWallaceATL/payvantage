import type { RailName, RailProvider } from "./types";
import { payramProvider } from "./payram";
import { inqudProvider } from "./inqud";
import { alchemyPayProvider } from "./alchemy-pay";

export type { RailName, RailProvider, CreatePaymentParams, CreatePaymentResult } from "./types";

const providers: Record<RailName, RailProvider> = {
  payram: payramProvider,
  inqud: inqudProvider,
  alchemypay: alchemyPayProvider,
};

export function getRailProvider(rail: RailName): RailProvider {
  const provider = providers[rail];
  if (!provider) {
    throw new Error(`Unknown payment rail: ${rail}`);
  }
  return provider;
}

export function isValidRail(rail: string): rail is RailName {
  return rail === "payram" || rail === "inqud" || rail === "alchemypay";
}

/**
 * Returns the webhook callback URL for a given rail, based on the app's public URL.
 */
export function getWebhookUrl(rail: RailName): string {
  const base =
    process.env["NEXT_PUBLIC_APP_URL"] ??
    process.env["VERCEL_URL"] ??
    "http://localhost:3000";
  const origin = base.startsWith("http") ? base : `https://${base}`;
  return `${origin}/api/webhooks/${rail === "alchemypay" ? "alchemy-pay" : rail}`;
}
