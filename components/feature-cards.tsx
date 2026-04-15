"use client";

import { type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

type FeatureCard = {
  title: string;
  description: string;
  href: string;
  visual: "comparison" | "chart" | "code";
};

const featuresList: FeatureCard[] = [
  {
    title: "Traditional card processing",
    description:
      "We place qualified merchants with our network of high-risk acquiring banks. Full Visa, Mastercard, Amex support with competitive rates and fast approvals.",
    href: "/products/payment-gateway",
    visual: "comparison",
  },
  {
    title: "Instant USDC settlement",
    description:
      "For merchants who can't get traditional approval, accept card payments and settle instantly in USDC to your Polygon wallet. No chargebacks, no rolling reserves, no waiting.",
    href: "/products/instant-settlement",
    visual: "chart",
  },
  {
    title: "Simple integration",
    description:
      "WooCommerce plugin installs in minutes. Shopify and custom API coming soon. One Merchant ID, no crypto knowledge required.",
    href: "/products/woocommerce",
    visual: "code",
  },
];

function ComparisonVisual(): ReactNode {
  const rows = [
    {
      name: "PayVantage",
      approval: "1–2 weeks",
      reserves: "Competitive terms",
      highlight: true,
    },
    {
      name: "Industry average",
      approval: "30–60 days",
      reserves: "Heavy reserves common",
      highlight: false,
    },
  ];

  return (
    <div className="flex h-full w-full items-end justify-center p-6">
      <div className="w-full max-w-xs">
        <div className="grid grid-cols-3 border-b border-border pb-2 text-xs text-muted-foreground">
          <div />
          <div className="text-center">Approval time</div>
          <div className="text-center">Reserves</div>
        </div>
        {rows.map((row, i) => (
          <motion.div
            key={row.name}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1, ease }}
            className={`grid grid-cols-3 py-3 text-sm ${i < rows.length - 1 ? "border-b border-border" : ""} ${row.highlight ? "" : "text-muted-foreground"}`}
          >
            <div className={row.highlight ? "flex items-center gap-2" : ""}>
              {row.highlight && (
                <div className="h-4 w-4 rounded-full bg-foreground" />
              )}
              <span
                className={
                  row.highlight ? "font-medium text-foreground" : ""
                }
              >
                {row.name}
              </span>
            </div>
            <div
              className={`text-center ${row.highlight ? "text-accent" : ""}`}
            >
              {row.approval}
            </div>
            <div
              className={`text-center text-xs sm:text-sm ${row.highlight ? "text-accent" : ""}`}
            >
              {row.reserves}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ChartVisual(): ReactNode {
  return (
    <div className="flex h-full w-full items-center justify-center p-8 sm:p-6">
      <div className="relative w-full max-w-xs">
        <div className="mb-3">
          <div className="text-xs text-muted-foreground">Settlement</div>
          <div className="text-xl font-semibold text-accent sm:text-2xl">
            Per txn
          </div>
        </div>
        <div className="flex h-24 items-end justify-between gap-2 sm:h-32">
          {[0.3, 0.45, 0.55, 0.5, 0.65, 0.7, 0.75, 0.85, 0.9, 1].map(
            (height, i) => (
              <motion.div
                key={i}
                className="flex-1 origin-bottom rounded-t bg-linear-to-t from-accent/80 to-accent/40"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05, ease }}
                style={{ height: `${height * 100}%` }}
              />
            ),
          )}
        </div>
        <div className="mt-3 flex items-center justify-end gap-1">
          <span className="text-xs text-muted-foreground">
            vs traditional
          </span>
          <span className="text-xs text-accent">30 days</span>
        </div>
      </div>
    </div>
  );
}

function CodeVisual(): ReactNode {
  const codeLines = [
    { text: "POST /api/checkout", style: "text-muted-foreground" },
    { text: "{", style: "text-muted-foreground" },
    { text: '  "amount": 99.00,', style: "text-accent" },
    { text: '  "currency": "USD",', style: "text-accent" },
    { text: '  "merchant_id": "pv_live_...",', style: "text-accent" },
    { text: '  "webhook": "/hooks"', style: "text-accent" },
    { text: "}", style: "text-muted-foreground" },
    { text: "→ 200 checkout_url", style: "text-accent" },
  ];

  return (
    <div className="flex h-full w-full items-center justify-start overflow-hidden p-6">
      <pre className="font-mono text-xs leading-relaxed sm:text-sm">
        <code>
          {codeLines.map((line, i) => (
            <motion.span
              key={i}
              className={`block ${line.style}`}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05, ease }}
            >
              {line.text}
            </motion.span>
          ))}
        </code>
      </pre>
    </div>
  );
}

function FeatureCardItem({
  card,
  index,
}: {
  card: FeatureCard;
  index: number;
}): ReactNode {
  const router = useRouter();
  const headingId = `feature-card-${index}-title`;

  function go(): void {
    router.push(card.href);
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease }}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-sm border border-border bg-muted/50 transition-[border-color,box-shadow] hover:border-foreground/20 hover:shadow-lg"
      aria-labelledby={headingId}
      onClick={go}
    >
      <div className="relative h-56 bg-background sm:h-64">
        {card.visual === "comparison" && <ComparisonVisual />}
        {card.visual === "chart" && <ChartVisual />}
        {card.visual === "code" && <CodeVisual />}
      </div>
      <div className="flex flex-col p-6 pb-4">
        <h3
          id={headingId}
          className="font-serif text-lg font-medium text-foreground"
        >
          {card.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {card.description}
        </p>
      </div>
      <div className="px-6 pb-6">
        <Link
          href={card.href}
          className="inline-flex w-fit items-center gap-1 rounded-full border border-transparent px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-border hover:bg-muted/60 hover:text-foreground"
          onClick={(e) => e.stopPropagation()}
        >
          Learn more
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.article>
  );
}

export function FeatureCards(): ReactNode {
  return (
    <section className="relative w-full bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="mb-16 flex max-w-3xl flex-col">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="font-serif text-3xl font-medium leading-tight text-foreground sm:text-4xl md:text-5xl"
          >
            Two rails. One platform.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.18, ease }}
            className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            We match your business with the right processing solution
          </motion.p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {featuresList.map((card, index) => (
            <FeatureCardItem key={card.title} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
