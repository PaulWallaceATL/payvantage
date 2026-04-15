import { createMetadata } from "@/lib/metadata";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Instant settlement",
  description:
    "Merchants receive USDC to a Polygon wallet as transactions complete—no multi-day settlement wait.",
  path: "/products/instant-settlement",
});

export default function InstantSettlementPage(): ReactNode {
  return (
    <main id="main-content" className="flex-1 px-6 pt-28 pb-24 sm:px-8">
      <article className="mx-auto max-w-2xl">
        <h1 className="font-serif text-3xl font-medium text-foreground sm:text-4xl lg:text-5xl">
          Instant settlement
        </h1>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>
            With PayVantage&apos;s card-to-crypto rail, each successful sale can
            settle as USDC directly to the Polygon wallet you provide. There is no
            batch file or T+N delay in the traditional sense: funds move on-chain
            as the payment completes.
          </p>
          <p>
            That gives you predictable liquidity for inventory, ads, and
            payroll—especially in categories where processors otherwise hold
            balances for weeks.
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
