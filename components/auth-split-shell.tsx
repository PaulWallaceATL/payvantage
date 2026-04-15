"use client";

import Link from "next/link";
import { type ReactNode } from "react";

/** Fictional, on-brand copy for layout only — not real merchant endorsements. */
const MARQUEE_ITEMS = [
  {
    quote:
      "We needed card checkout without another 45-day reserve story. Card-to-crypto settlement finally matched how we actually run inventory.",
    name: "Jordan M.",
    title: "Nutraceutical brand",
    initials: "JM",
  },
  {
    quote:
      "Polygon USDC hitting our wallet when a sale clears beats waiting on batch files. Our finance team stopped guessing when cash would land.",
    name: "Samira K.",
    title: "E-commerce lead",
    initials: "SK",
  },
  {
    quote:
      "High-risk categories get ghosted by processors. PayVantage framed the rail honestly—no fake volume stats, just what the product does today.",
    name: "Alex R.",
    title: "Supplements operator",
    initials: "AR",
  },
  {
    quote:
      "Chargebacks were eating margin on our legacy stack. Final on-chain settlement is a different conversation with our customers and our bank.",
    name: "Chris T.",
    title: "Peptides retail",
    initials: "CT",
  },
  {
    quote:
      "Payment links for campaigns plus a path to real integration mattered. One team, clear docs, and a calendly-style onboarding flow worked for us.",
    name: "Priya N.",
    title: "Growth marketer",
    initials: "PN",
  },
];

function MarqueeCard({
  item,
}: {
  item: (typeof MARQUEE_ITEMS)[number];
}): ReactNode {
  return (
    <article className="shrink-0 rounded-2xl border border-border/70 bg-background/90 p-5 shadow-sm backdrop-blur-sm dark:bg-background/70">
      <p className="text-sm leading-relaxed text-foreground/90">&ldquo;{item.quote}&rdquo;</p>
      <div className="mt-4 flex items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground"
          aria-hidden
        >
          {item.initials}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.title}</p>
        </div>
      </div>
    </article>
  );
}

function AuthMarqueePanel(): ReactNode {
  const loop = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="relative hidden min-h-0 overflow-hidden bg-muted/25 lg:flex lg:flex-col dark:bg-muted/10">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, var(--border) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
        aria-hidden
      />
      <div className="relative flex flex-1 flex-col justify-center overflow-hidden py-10">
        <p className="mb-6 px-8 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Why teams explore PayVantage
        </p>
        <div className="relative h-[min(640px,calc(100vh-8rem))] overflow-hidden">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-14 bg-linear-to-b from-background to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-linear-to-t from-background to-transparent"
            aria-hidden
          />
          <div className="animate-auth-marquee flex flex-col gap-4 px-8">
            {loop.map((item, i) => (
              <MarqueeCard key={`${item.name}-${i}`} item={item} />
            ))}
          </div>
        </div>
        <p className="mt-6 px-8 text-center text-[11px] leading-snug text-muted-foreground">
          Illustrative scenarios for product context only — not verified
          customer testimonials.
        </p>
      </div>
    </div>
  );
}

export function AuthSplitShell({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactNode {
  return (
    <div className="min-h-dvh w-full bg-background text-foreground">
      <div className="mx-auto grid min-h-dvh w-full max-w-[1600px] lg:grid-cols-2">
        <div className="flex flex-col justify-center border-border px-6 py-12 sm:px-10 lg:border-r lg:px-14 xl:px-20">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2.5 self-start transition-opacity hover:opacity-80"
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background"
              aria-hidden
            />
            <span className="text-lg font-semibold tracking-tight">
              PayVantage
            </span>
          </Link>
          {children}
        </div>
        <AuthMarqueePanel />
      </div>
    </div>
  );
}
