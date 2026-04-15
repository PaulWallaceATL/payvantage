"use client";

import { type ReactNode } from "react";
import {
  Sparkles,
  Layers,
  Zap,
  Plug,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

type PrincipleCard = {
  icon: ReactNode;
  title: string;
  body: string;
};

const principles: PrincipleCard[] = [
  {
    icon: <Layers className="h-10 w-10" strokeWidth={1} />,
    title: "Multiple Processing Options",
    body: "Traditional card processing or USDC settlement. We match you with the right solution.",
  },
  {
    icon: <Zap className="h-10 w-10" strokeWidth={1} />,
    title: "Fast Approvals",
    body: "Traditional accounts approved in 1–2 weeks. USDC accounts go live same day.",
  },
  {
    icon: <Plug className="h-10 w-10" strokeWidth={1} />,
    title: "WooCommerce & Shopify",
    body: "WooCommerce is live today. Shopify is on the roadmap — same simple setup philosophy.",
  },
  {
    icon: <BarChart3 className="h-10 w-10" strokeWidth={1} />,
    title: "Real-time Dashboard",
    body: "Track volume, settlements, and transaction health from one place.",
  },
];

export function Principles(): ReactNode {
  return (
    <section className="relative w-full bg-muted py-24 text-foreground sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
              className="mb-6 flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Why PayVantage?</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="font-serif text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl"
            >
              Built for merchants{" "}
              <span className="italic">banks won&apos;t serve</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
              className="mt-6 max-w-lg leading-relaxed text-foreground/70"
            >
              Traditional processors reject high-risk merchants or bury them in
              fees and reserves. PayVantage gives you options — traditional card
              processing through our banking network, or instant USDC settlement
              with zero chargebacks. Either way, you get a dedicated partner who
              understands your industry.
            </motion.p>

            <motion.a
              href="/signup"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease }}
              className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              Get started free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </motion.a>
          </div>

          <div className="grid max-w-lg grid-cols-1 gap-3 sm:grid-cols-2 lg:ml-auto lg:max-w-none">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index, ease }}
                className="flex min-h-[200px] flex-col rounded-sm border border-border/60 bg-background/60 p-6"
              >
                <div className="mb-4 text-foreground/80">{principle.icon}</div>
                <p className="text-sm font-semibold text-foreground">
                  {principle.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                  {principle.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
