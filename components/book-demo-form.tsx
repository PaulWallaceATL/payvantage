"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getCalendlyBookingUrl } from "@/lib/booking";

const schema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email("Valid email required"),
  businessName: z.string().min(1, "Required"),
  monthlyVolume: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function BookDemoForm(): ReactNode {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues): Promise<void> {
    setServerError(null);
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "book_demo",
        name: values.name,
        email: values.email,
        businessName: values.businessName,
        monthlyVolume: values.monthlyVolume?.trim() || undefined,
      }),
    });
    if (!res.ok) {
      setServerError("Something went wrong. Please try again or email us.");
      return;
    }
    const calendly = getCalendlyBookingUrl();
    if (calendly) {
      window.location.assign(calendly);
      return;
    }
    router.push("/book-demo/thanks");
  }

  return (
    <form
      onSubmit={(e) => void handleSubmit(onSubmit)(e)}
      className="mx-auto max-w-md space-y-5"
    >
      {serverError && (
        <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {serverError}
        </p>
      )}
      <div>
        <label
          htmlFor="bd-name"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Name
        </label>
        <input
          id="bd-name"
          type="text"
          autoComplete="name"
          className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
          placeholder="Jane Merchant"
          {...register("name")}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="bd-email"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Email
        </label>
        <input
          id="bd-email"
          type="email"
          autoComplete="email"
          className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
          placeholder="you@company.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="bd-business"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Business name
        </label>
        <input
          id="bd-business"
          type="text"
          autoComplete="organization"
          className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
          placeholder="Acme Supplements LLC"
          {...register("businessName")}
        />
        {errors.businessName && (
          <p className="mt-1 text-xs text-red-600">
            {errors.businessName.message}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="bd-volume"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Approx. monthly processing volume (optional)
        </label>
        <input
          id="bd-volume"
          type="text"
          className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
          placeholder="e.g. $50k–$100k"
          {...register("monthlyVolume")}
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-full bg-foreground text-sm font-medium text-background transition-colors hover:bg-foreground/90 disabled:opacity-50"
      >
        {isSubmitting ? "Saving…" : "Continue to schedule"}
      </button>
      <p className="text-center text-xs text-muted-foreground">
        Prefer to self-serve?{" "}
        {getCalendlyBookingUrl() ? (
          <a
            href={getCalendlyBookingUrl()}
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Open scheduling
          </a>
        ) : (
          <Link
            href="/signup"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Create an account
          </Link>
        )}
      </p>
    </form>
  );
}
