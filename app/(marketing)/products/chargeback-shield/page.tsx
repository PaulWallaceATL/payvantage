import { ProductHero } from "@/components/product-hero";
import { createMetadata } from "@/lib/metadata";
import { BookOpen } from "lucide-react";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Chargeback shield",
  description:
    "Crypto settlement on Polygon (USDC) removes traditional chargeback exposure: on-chain transfers are final.",
  path: "/products/chargeback-shield",
});

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1400&q=80";

export default function ChargebackShieldPage(): ReactNode {
  return (
    <main id="main-content" className="flex-1">
      <ProductHero
        badge="Shield"
        badgeMuted="Final settlement · USDC on Polygon"
        title="Chargebacks are not part of the on-chain story"
        description={
          <>
            <p>
              When checkout is tied to crypto settlement, customer funds move
              into USDC on Polygon. On-chain transfers do not behave like
              card-network chargebacks: once a transaction confirms, it is
              final and irreversible by design.
            </p>
            <p>
              You are not exposed to the same reversal mechanics that dominate
              traditional high-risk processing. Refunds and support stay under
              your policies—without issuer pullbacks.
            </p>
          </>
        }
        imageSrc={HERO_IMAGE}
        imageAlt="Abstract representation of secure digital payments"
        primaryCta={{ href: "/book-demo", label: "Apply / Book a demo" }}
        secondaryCta={{
          href: "/docs",
          label: "Setup & requirements",
          icon: BookOpen,
        }}
        social={{
          emphasis: "Finality,",
          rest: "built in—so you can plan cash flow without surprise reversals.",
        }}
      />
    </main>
  );
}
