"use client";

import { CircleCheck, Shield, Wallet, Zap } from "lucide-react";
import { motion } from "motion/react";
import { type ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const pillars: { icon: typeof Shield; title: string; body: string }[] = [
  {
    icon: Shield,
    title: "Zero chargebacks on the crypto rail",
    body: "Card-to-crypto settlement in USDC on Polygon is final by design—no card-network reversals.",
  },
  {
    icon: Wallet,
    title: "Liquidity where you control it",
    body: "Funds land in the wallet you specify so you can move, hold, or convert on your timeline.",
  },
  {
    icon: Zap,
    title: "Settlement at the speed of the chain",
    body: "Stop waiting on multi-day batches when each payment can settle as USDC when it clears.",
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
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease }}
          className="mx-auto mb-12 max-w-2xl text-center font-serif text-xl font-medium leading-snug text-foreground sm:text-2xl"
        >
          Credibility through clarity: irreversible settlement, instant USDC to
          your Polygon wallet, and messaging you can stand behind.
        </motion.p>
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
