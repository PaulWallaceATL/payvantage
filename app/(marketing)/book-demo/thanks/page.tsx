import { getBookingHref, getCalendlyBookingUrl } from "@/lib/booking";
import { createMetadata } from "@/lib/metadata";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Thanks — next step",
  description: "Schedule your PayVantage call.",
  path: "/book-demo/thanks",
});

export default function BookDemoThanksPage(): ReactNode {
  const calendly = getCalendlyBookingUrl();
  return (
    <main id="main-content" className="flex-1 px-6 pt-28 pb-20 sm:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="font-serif text-3xl font-medium text-foreground sm:text-4xl">
          You are all set
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Thanks—we received your details. Pick a time that works for you, or
          reach out directly if you prefer.
        </p>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          {calendly ? (
            <a
              href={calendly}
              className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              Schedule on Calendly
            </a>
          ) : (
            <a
              href={getBookingHref()}
              className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              Email us to schedule
            </a>
          )}
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-full border border-border px-8 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
