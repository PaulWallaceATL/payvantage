import { ProductHero } from "@/components/product-hero";
import { createMetadata } from "@/lib/metadata";
import { Tags } from "lucide-react";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "WooCommerce plugin",
  description:
    "Install the PayVantage WooCommerce plugin, add your Merchant ID, and start accepting payments in minutes — traditional or USDC settlement.",
  path: "/products/woocommerce",
});

export default function WooCommerceProductPage(): ReactNode {
  return (
    <main id="main-content" className="flex-1">
      <ProductHero
        badge="Integrations"
        badgeMuted="WooCommerce · One Merchant ID"
        title="Sell from your store in minutes"
        description={
          <>
            <p>
              Install our official WooCommerce extension, paste your PayVantage
              Merchant ID, and turn on checkout without touching crypto
              plumbing. Shoppers see familiar card fields; you choose traditional
              settlement or instant USDC to your Polygon wallet on the back end.
            </p>
            <p>
              Shopify and a full custom API are on the roadmap — same account,
              same support team as we expand storefront options.
            </p>
          </>
        }
        creditCard={{
          cardNumber: "5412 7601 2300 0042",
          cardholderName: "WOOCOMMERCE STORE",
          expirationDate: "09/28",
          cvv: "811",
          background:
            "linear-gradient(135deg, #1a1033 0%, #3d2a6b 45%, #5c3d9e 100%)",
          textColor: "#ffffff",
          scale: 1.22,
          borderRadius: 20,
          rotationIntensity: 1,
          parallaxIntensity: 1,
          scaleOnHover: 1.03,
        }}
        primaryCta={{ href: "/docs", label: "Setup & docs" }}
        secondaryCta={{
          href: "/pricing",
          label: "See pricing",
          icon: Tags,
        }}
        social={{
          emphasis: "Plugin-first,",
          rest: "no crypto expertise required on your team.",
        }}
      />
    </main>
  );
}
