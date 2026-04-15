import type {
  RailProvider,
  CreatePaymentParams,
  CreatePaymentResult,
} from "./types";

const INQUD_BASE = "https://api.inqud.com/v1/user/crypto-acquiring";

function getInqudConfig() {
  const tokenId = process.env["INQUD_API_TOKEN_ID"];
  const tokenSecret = process.env["INQUD_API_TOKEN_SECRET"];
  const projectId = process.env["INQUD_PROJECT_ID"];

  if (!tokenId || !tokenSecret || !projectId) {
    throw new Error(
      "INQUD_API_TOKEN_ID, INQUD_API_TOKEN_SECRET, and INQUD_PROJECT_ID must be set"
    );
  }

  return { tokenId, tokenSecret, projectId };
}

export function mapInqudStatusToInternal(
  status: string
): "completed" | "failed" | "pending" {
  switch (status) {
    case "COMPLETED":
      return "completed";
    case "EXPIRED":
    case "CANCELLED":
      return "failed";
    case "NEW":
    case "WAITING_PAYMENT":
    case "PARTIALLY_PAID":
    default:
      return "pending";
  }
}

async function inqudFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const { tokenId, tokenSecret, projectId } = getInqudConfig();
  const url = `${INQUD_BASE}/${projectId}${path}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-Token-API-Id": tokenId,
      "X-Token-API-Secret": tokenSecret,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Inqud API error ${response.status}: ${body}`);
  }

  return response.json() as Promise<T>;
}

interface InqudCheckoutResponse {
  id: string;
  projectId: string;
  clientOrderId: string;
  status: string;
  acquiringUrl: string;
  createdAt: string;
  expiresAt: string;
}

export const inqudProvider: RailProvider = {
  name: "inqud",

  async createPayment(
    params: CreatePaymentParams
  ): Promise<CreatePaymentResult> {
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();

    const response = await inqudFetch<InqudCheckoutResponse>("/checkouts", {
      method: "POST",
      body: JSON.stringify({
        clientOrderId: params.orderId,
        expiresAt,
        fixedAmount: {
          amount: params.amount,
          currency: params.currency,
        },
        returnUrl: params.returnUrl,
        name: `Payment ${params.orderId}`,
        type: "FIXED_PRICE",
      }),
    });

    return {
      paymentUrl: response.acquiringUrl,
      providerOrderId: response.id,
      rawResponse: response,
    };
  },

  async getPaymentStatus(providerOrderId: string): Promise<string> {
    const response = await inqudFetch<{ status: string }>(
      `/checkouts/${providerOrderId}`
    );
    return mapInqudStatusToInternal(response.status);
  },
};
