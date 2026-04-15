import { ProductHero } from "@/components/product-hero";
import { createMetadata } from "@/lib/metadata";
import { Tags } from "lucide-react";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Instant settlement",
  description:
    "Merchants receive USDC to a Polygon wallet as transactions complete—no multi-day settlement wait.",
  path: "/products/instant-settlement",
});

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80";

export default function InstantSettlementPage(): ReactNode {
  return (
    <main id="main-content" className="flex-1">
      <ProductHero
        badge="Settlement"
        badgeMuted="USDC · Polygon · Per transaction"
        title="Liquidity hits your wallet as sales clear"
        description={
          <>
            <p>
              With PayVantage&apos;s card-to-crypto rail, each successful sale
              can settle as USDC directly to the Polygon wallet you provide.
              There is no batch file or T+N delay in the traditional sense:
              funds move on-chain as the payment completes.
            </p>
            <p>
              That gives you predictable runway for inventory, ads, and
              payroll—especially in categories where processors otherwise hold
              balances for weeks.
            </p>
          </>
        }
        imageSrc={HERO_IMAGE}
        imageAlt="Business analytics and operations on a laptop"
        primaryCta={{ href: "/book-demo", label: "Apply / Book a demo" }}
        secondaryCta={{
          href: "/pricing",
          label: "See pricing",
          icon: Tags,
        }}
        social={{
          emphasis: "On-chain speed,",
          rest: "without the multi-day settlement windows you are used to.",
        }}
      />
    </main>
  );
}
