import { BookDemoForm } from "@/components/book-demo-form";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Book a demo",
  description:
    "Tell us about your business, then pick a time to meet the PayVantage team.",
  path: "/book-demo",
});

export default function BookDemoPage(): ReactNode {
  return (
    <main id="main-content" className="flex-1 px-6 pt-28 pb-20 sm:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="font-serif text-3xl font-medium text-foreground sm:text-4xl">
          Book a demo
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Share a few details so we know how to help, then continue to the
          calendar to pick a time. Your answers can also be forwarded to Zapier
          or another webhook when your team configures that in hosting
          settings.
        </p>
      </div>
      <div className="mx-auto mt-12 max-w-lg">
        <BookDemoForm />
      </div>
    </main>
  );
}
