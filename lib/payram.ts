import { Payram } from "payram";
import type { SupabaseClient } from "@supabase/supabase-js";

let _client: Payram | null = null;

function payramConfigOptions(baseUrl: string) {
  const isInsecure = baseUrl.startsWith("http://");
  return {
    timeoutMs: 15_000,
    maxRetries: 2,
    retryPolicy: "safe" as const,
    allowInsecureHttp: isInsecure,
  };
}

/** One PayRam SDK client for a specific API key + base URL (per merchant project). */
export function createPayramClient(apiKey: string, baseUrl: string): Payram {
  const key = apiKey.trim();
  const url = baseUrl.trim();
  if (!key || !url) {
    throw new Error("PayRam API key and base URL are required.");
  }
  return new Payram({
    apiKey: key,
    baseUrl: url,
    config: payramConfigOptions(url),
  });
}

export function getPayramClient(): Payram {
  if (_client) return _client;

  const apiKey = process.env["PAYRAM_API_KEY"];
  const baseUrl = process.env["PAYRAM_API_URL"];

  if (!apiKey || !baseUrl) {
    throw new Error(
      "Card payment provider API credentials (key and base URL) must be set in environment variables."
    );
  }

  _client = createPayramClient(apiKey, baseUrl);
  return _client;
}

/**
 * PayRam SDK client for checkout / status polling for one merchant.
 *
 * **Isolation:** Loads `merchant_payram_credentials` with `.eq("merchant_id", merchantId)` only.
 * The merchant never supplies this secret in API calls — checkout resolves `merchant_id` from
 * their publishable `api_keys` row first, then loads credentials for that same id.
 *
 * By default there is **no** fallback to `PAYRAM_API_KEY` (so two merchants never share one
 * processor project by accident). Set `PAYRAM_USE_GLOBAL_CLIENT_FOR_MERCHANTS=true` only for
 * legacy single-tenant setups.
 */
export async function getPayramClientForMerchant(
  supabase: SupabaseClient,
  merchantId: string
): Promise<Payram> {
  const { data } = await supabase
    .from("merchant_payram_credentials")
    .select("api_key, payram_base_url")
    .eq("merchant_id", merchantId)
    .maybeSingle();

  if (data?.api_key) {
    const base =
      (data.payram_base_url && String(data.payram_base_url).trim()) ||
      process.env["PAYRAM_API_URL"];
    if (!base) {
      throw new Error(
        "PAYRAM_API_URL must be set when a merchant uses a custom PayRam API key without a stored base URL."
      );
    }
    return createPayramClient(String(data.api_key), base);
  }

  if (process.env["PAYRAM_USE_GLOBAL_CLIENT_FOR_MERCHANTS"] === "true") {
    return getPayramClient();
  }

  throw new Error(
    "No PayRam project API key is stored for this merchant. Add it in Admin → Merchants (each merchant uses only their own key)."
  );
}

/** Webhook verification: PayRam signs with the project API key. */
export async function getPayramWebhookApiKeyForMerchant(
  supabase: SupabaseClient,
  merchantId: string
): Promise<string | null> {
  const { data } = await supabase
    .from("merchant_payram_credentials")
    .select("api_key")
    .eq("merchant_id", merchantId)
    .maybeSingle();

  if (data?.api_key) {
    return String(data.api_key);
  }

  const global = process.env["PAYRAM_API_KEY"];
  return global && global.length > 0 ? global : null;
}

export function mapPayramStatusToInternal(
  payramState: string
): "completed" | "failed" | "pending" {
  switch (payramState) {
    case "FILLED":
    case "OVER_FILLED":
      return "completed";
    case "CANCELLED":
      return "failed";
    case "OPEN":
    case "PARTIALLY_FILLED":
    default:
      return "pending";
  }
}
