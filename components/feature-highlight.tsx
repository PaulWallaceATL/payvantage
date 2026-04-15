"use client";

import { type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

const traditionalPoints = [
  "Direct deposits to your business bank account",
  "Visa, Mastercard, Amex, Discover",
  "Competitive rates starting at 3.5%",
  "Dedicated account manager",
];

const usdcPoints = [
  "Instant settlement to your Polygon wallet",
  "Zero chargebacks, no rolling reserves",
  "Go live in minutes, no underwriting",
  "Real-time dashboard tracking",
];

function TraditionalDepositPreview(): ReactNode {
  return (
    <div className="relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-md border border-border bg-muted/30 px-6 pt-6">
      <div className="relative mx-auto w-full max-w-xs flex-1">
        <div className="rounded-t-xl border border-border bg-background p-5 shadow-sm">
          <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            Bank deposit
          </p>
          <p className="text-2xl font-semibold tracking-tight text-foreground">
            $4,128.40
          </p>
          <p className="mb-5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            ACH · Settled
          </p>
          <div className="space-y-3 rounded-lg border border-border bg-muted/40 p-3">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-muted-foreground">To account</span>
              <span className="font-medium text-foreground">Business · ****4821</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-muted-foreground">Timeline</span>
              <span className="text-foreground">T+2 business days</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-muted-foreground">Methods</span>
              <span className="text-foreground">Visa · MC · Amex</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
            <span className="text-[10px] text-muted-foreground">Last batch</span>
            <span className="text-[10px] font-medium text-foreground">Posted · 6:00 AM</span>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-16 bg-linear-to-t from-muted/30 to-transparent" />
    </div>
  );
}

function DashboardPreview(): ReactNode {
  return (
    <div className="relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-md border border-accent/10 bg-accent/5 px-6 pt-6">
      <div className="relative mx-auto w-full max-w-xs flex-1">
        <div className="rounded-t-xl border border-border bg-background p-5">
          <p className="mb-1 text-[10px] text-muted-foreground">
            Today&apos;s Volume
          </p>
          <p className="mb-1 text-2xl font-semibold tracking-tight text-foreground">
            $8,421.00
          </p>
          <p className="mb-5 text-xs font-medium text-emerald-500">
            +$2,180.00 vs yesterday
          </p>

          <div className="mb-4 flex h-16 items-end justify-between gap-1.5">
            {[0.2, 0.35, 0.5, 0.45, 0.6, 0.75, 0.65, 0.8, 0.9, 1.0].map(
              (h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-accent/60"
                  style={{ height: `${h * 100}%` }}
                />
              ),
            )}
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10">
                  <span className="text-xs text-emerald-500">&#x2713;</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground">
                    USDC Settled
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    3 min ago
                  </p>
                </div>
              </div>
              <p className="text-xs font-medium text-foreground">+$249.99</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/10">
                  <span className="text-xs text-amber-500">&#x25CF;</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground">
                    Pending
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Just now
                  </p>
                </div>
              </div>
              <p className="text-xs font-medium text-foreground">$89.00</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-16 bg-linear-to-t from-accent/5 to-transparent" />
    </div>
  );
}

function BulletList({ items }: { items: string[] }): ReactNode {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((text) => (
        <li
          key={text}
          className="flex gap-3 text-sm leading-relaxed text-foreground/80"
        >
          <span
            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
            aria-hidden
          />
          {text}
        </li>
      ))}
    </ul>
  );
}

export function FeatureHighlight(): ReactNode {
  return (
    <section className="relative w-full overflow-hidden bg-background pb-24 sm:pb-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="mb-14 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="font-serif text-3xl font-medium leading-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Get paid your way
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08, ease }}
            className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/70"
          >
            Choose the settlement method that works for your business
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease }}
            className="flex flex-col"
          >
            <h3 className="text-lg font-semibold text-foreground">
              Traditional settlement
            </h3>
            <BulletList items={traditionalPoints} />
            <Link
              href="/book-demo"
              className="group mt-8 inline-flex h-12 w-fit items-center justify-center rounded-full bg-foreground px-7 text-sm font-semibold text-background transition-colors hover:bg-foreground/90"
            >
              Apply for traditional processing
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <div className="mt-10 flex flex-1">
              <TraditionalDepositPreview />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08, ease }}
            className="flex flex-col"
          >
            <h3 className="text-lg font-semibold text-foreground">
              USDC settlement
            </h3>
            <BulletList items={usdcPoints} />
            <Link
              href="/signup"
              className="group mt-8 inline-flex h-12 w-fit items-center justify-center rounded-full border border-border bg-background px-7 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Start accepting USDC
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <div className="mt-10 flex flex-1 justify-center lg:justify-end">
              <div className="w-full max-w-md lg:max-w-none">
                <DashboardPreview />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
