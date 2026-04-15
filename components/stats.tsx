"use client";

import { CircleCheck, Shield, Wallet, Zap } from "lucide-react";
import { motion } from "motion/react";
import { type ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const pillars: { icon: typeof Shield; title: string; body: string }[] = [
  {
    icon: Shield,
    title: "High-risk expertise",
    body: "Peptides, supplements, nutraceuticals, and more. We know your industry and we know how to get you approved.",
  },
  {
    icon: Wallet,
    title: "Your funds, your way",
    body: "Settle to your bank account through traditional processing, or to your crypto wallet via USDC. You choose.",
  },
  {
    icon: Zap,
    title: "Fast onboarding",
    body: "Traditional accounts approved in 48–72 hours. USDC accounts go live the same day. No month-long waiting games.",
  },
  {
    icon: CircleCheck,
    title: "Built for honest expectations",
    body: "We focus on what the product does today for high-risk merchants—not inflated volume claims.",
  },
];

export function Stats(): ReactNode {
  return (
    <section className="relative w-full overflow-hidden bg-muted pb-20 pt-12 sm:pb-24 sm:pt-16">
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease }}
            className="font-serif text-2xl font-medium leading-snug text-foreground sm:text-3xl md:text-4xl"
          >
            Why merchants trust PayVantage
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.06, ease }}
            className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            We specialize in industries other processors won&apos;t touch —
            and we give you real options, not one-size-fits-all.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:gap-14">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 * index, ease }}
              className="flex gap-4"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-background">
                <pillar.icon
                  className="h-5 w-5 text-foreground/80"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {pillar.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
