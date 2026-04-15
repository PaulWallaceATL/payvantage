import { createMetadata } from "@/lib/metadata";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Payment gateway",
  description:
    "Accept Visa, Mastercard, Apple Pay, and Google Pay through PayVantage with settlement options that fit high-risk businesses.",
  path: "/products/payment-gateway",
});

export default function PaymentGatewayPage(): ReactNode {
  return (
    <main id="main-content" className="flex-1 px-6 pt-28 pb-24 sm:px-8">
      <article className="mx-auto max-w-2xl">
        <h1 className="font-serif text-3xl font-medium text-foreground sm:text-4xl lg:text-5xl">
          Payment gateway
        </h1>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>
            PayVantage lets your customers check out with the payment methods
            they already use: Visa, Mastercard, Apple Pay, and Google Pay. Behind
            the scenes, funds can be routed into our card-to-crypto settlement
            flow so you are not stuck on slow holds or card-network disputes in
            the same way as legacy high-risk stacks.
          </p>
          <p>
            Whether you run payment links or a full ecommerce integration, the
            experience for shoppers stays familiar while you control where and
            how funds land on your side.
          </p>
        </div>
        <div className="mt-10">
          <Link
            href="/book-demo"
            className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
          >
            Apply / Book a demo
          </Link>
        </div>
      </article>
    </main>
  );
}
