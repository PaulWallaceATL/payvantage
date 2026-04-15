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
        creditCard={{
          cardNumber: "5425233430109903",
          cardholderName: "FINAL SETTLEMENT",
          expirationDate: "04/29",
          cvv: "881",
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 40%, #2d2d2d 100%)",
          textColor: "#f4d03f",
          scale: 1.28,
          borderRadius: 20,
          hasTextShadow: true,
          rotationIntensity: 1.1,
          parallaxIntensity: 1.1,
          scaleOnHover: 1.05,
        }}
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
