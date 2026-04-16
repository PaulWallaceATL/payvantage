import type { Payram } from "payram";
import { mapPayramStatusToInternal } from "@/lib/payram";
import type {
  RailProvider,
  CreatePaymentParams,
  CreatePaymentResult,
} from "./types";

export function createPayramProvider(client: Payram): RailProvider {
  return {
    name: "payram",

    async createPayment(
      params: CreatePaymentParams
    ): Promise<CreatePaymentResult> {
      const response = await client.payments.initiatePayment({
        customerEmail: params.customerEmail,
        customerId: params.customerId,
        amountInUSD: params.amount,
      });

      return {
        paymentUrl: response.url,
        providerOrderId: response.reference_id,
        rawResponse: response,
      };
    },

    async getPaymentStatus(providerOrderId: string): Promise<string> {
      const status = await client.payments.getPaymentRequest(
        providerOrderId
      );
      return mapPayramStatusToInternal(status.paymentState ?? "OPEN");
    },
  };
}
