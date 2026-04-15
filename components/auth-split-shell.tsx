"use client";

import Link from "next/link";
import { type ReactNode } from "react";

const WHY_BULLETS = [
  "High-risk specialists — peptides, supplements, nutraceuticals",
  "Traditional processing or instant USDC settlement",
  "Approvals in 48–72 hours, not weeks",
  "No monthly minimums, no setup fees",
  "Dedicated support from people who know your industry",
];

function WhyMerchantsPanel(): ReactNode {
  return (
    <div className="relative hidden min-h-0 flex-col justify-center bg-muted/25 lg:flex dark:bg-muted/10">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, var(--border) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
        aria-hidden
      />
      <div className="relative flex flex-col justify-center px-10 py-14 xl:px-14">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Why merchants choose PayVantage
        </h2>
        <ul className="mt-8 max-w-md space-y-4 text-sm leading-relaxed text-foreground/85">
          {WHY_BULLETS.map((line) => (
            <li key={line} className="flex gap-3">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                aria-hidden
              />
              {line}
            </li>
          ))}
        </ul>
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
        <WhyMerchantsPanel />
      </div>
    </div>
  );
}
