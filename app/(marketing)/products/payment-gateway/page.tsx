import { ProductHero } from "@/components/product-hero";
import { createMetadata } from "@/lib/metadata";
import { Tags } from "lucide-react";
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
    <main id="main-content" className="flex-1">
      <ProductHero
        badge="Payments"
        badgeMuted="Visa · Mastercard · Apple Pay · Google Pay"
        title="Accept the wallets your customers already use"
        description={
          <>
            <p>
              PayVantage lets shoppers pay with Visa, Mastercard, Apple Pay,
              and Google Pay. Behind the scenes, funds can route into our
              card-to-crypto flow so you avoid the slow holds and dispute
              patterns common with legacy high-risk stacks.
            </p>
            <p>
              Whether you use payment links or a full ecommerce integration, the
              checkout experience stays familiar while you decide where funds
              settle on your side.
            </p>
          </>
        }
        creditCard={{
          cardNumber: "4532123456789010",
          cardholderName: "MERCHANT ACCOUNT",
          expirationDate: "08/27",
          cvv: "042",
          background:
            "linear-gradient(135deg, #0f2942 0%, #1e5a8e 45%, #2a7cc7 100%)",
          textColor: "#ffffff",
          scale: 1.28,
          borderRadius: 20,
          rotationIntensity: 1.05,
          parallaxIntensity: 1.05,
          scaleOnHover: 1.04,
        }}
        primaryCta={{ href: "/book-demo", label: "Apply / Book a demo" }}
        secondaryCta={{
          href: "/pricing",
          label: "See pricing",
          icon: Tags,
        }}
        social={{
          emphasis: "One gateway,",
          rest: "multiple familiar payment methods with stablecoin settlement options.",
        }}
      />
    </main>
  );
}
