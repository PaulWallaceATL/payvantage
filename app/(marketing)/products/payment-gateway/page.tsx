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

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=80";

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
        imageSrc={HERO_IMAGE}
        imageAlt="Customer completing a card payment at checkout"
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
