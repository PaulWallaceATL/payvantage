import { createHmac } from "crypto";

/**
 * Generate Alchemy Pay API signature.
 *
 * Signature string = timestamp + httpMethod + requestPath + bodyString
 * Then HMAC-SHA256 with appSecret and base64-encode.
 */
export function generateAlchemyPaySign(
  timestamp: string,
  httpMethod: string,
  requestPath: string,
  bodyString: string,
  appSecret: string
): string {
  const content =
    timestamp + httpMethod.toUpperCase() + requestPath + bodyString;
  return createHmac("sha256", appSecret).update(content).digest("base64");
}

/**
 * Verify an Alchemy Pay webhook signature.
 *
 * Webhook params marked Sign: Y are concatenated alphabetically by key,
 * then signed with HMAC-SHA256(appSecret) -> uppercase hex.
 */
export function verifyAlchemyPayWebhookSign(
  params: Record<string, string>,
  signature: string,
  appSecret: string
): boolean {
  const signableKeys = Object.keys(params)
    .filter(
      (k) =>
        k !== "sign" &&
        params[k] !== undefined &&
        params[k] !== null &&
        params[k] !== ""
    )
    .sort();

  const content = signableKeys.map((k) => `${k}=${params[k]}`).join("&");
  const expected = createHmac("sha256", appSecret)
    .update(content)
    .digest("hex")
    .toUpperCase();

  return expected === signature.toUpperCase();
}
