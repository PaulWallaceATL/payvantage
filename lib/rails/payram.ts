import { getPayramClient, mapPayramStatusToInternal } from "@/lib/payram";
import type {
  RailProvider,
  CreatePaymentParams,
  CreatePaymentResult,
} from "./types";

export const payramProvider: RailProvider = {
  name: "payram",

  async createPayment(params: CreatePaymentParams): Promise<CreatePaymentResult> {
    const payram = getPayramClient();
    const response = await payram.payments.initiatePayment({
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
    const payram = getPayramClient();
    const status = await payram.payments.getPaymentRequest(providerOrderId);
    return mapPayramStatusToInternal(status.paymentState ?? "OPEN");
  },
};
