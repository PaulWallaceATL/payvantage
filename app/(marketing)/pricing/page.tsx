import { FAQ } from "@/components/faq";
import { FinalCTA } from "@/components/final-cta";
import { Pricing } from "@/components/pricing";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Pricing",
  description:
    "PayVantage pricing: 6% flat for typical high-risk supplement categories, or lower than 6% for standard merchants based on industry and volume. No monthly fees or setup costs.",
  path: "/pricing",
});

export default function PricingPage(): ReactNode {
  return (
    <main id="main-content" className="flex-1 pt-20">
      <Pricing />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
