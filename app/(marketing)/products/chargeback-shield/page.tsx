import { createMetadata } from "@/lib/metadata";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Chargeback shield",
  description:
    "Crypto settlement on Polygon (USDC) removes traditional chargeback exposure: on-chain transfers are final.",
  path: "/products/chargeback-shield",
});

export default function ChargebackShieldPage(): ReactNode {
  return (
    <main id="main-content" className="flex-1 px-6 pt-28 pb-24 sm:px-8">
      <article className="mx-auto max-w-2xl">
        <h1 className="font-serif text-3xl font-medium text-foreground sm:text-4xl lg:text-5xl">
          Chargeback shield
        </h1>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>
            When checkout is connected to crypto settlement, customer funds move
            into USDC on Polygon. Blockchain transfers do not support card-style
            chargebacks: once a transaction is confirmed, it is final and
            irreversible by design.
          </p>
          <p>
            That means you are not exposed to the same dispute-and-reversal
            mechanics that dominate traditional card processing for
            high-risk categories. Customer support and refunds remain under your
            policies—without network pullbacks.
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
