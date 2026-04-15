import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ComponentType, ReactNode, SVGProps } from "react";

export type ProductHeroProps = {
  badge: string;
  badgeMuted?: string;
  title: string;
  description: ReactNode;
  imageSrc: string;
  imageAlt: string;
  primaryCta: { href: string; label: string };
  secondaryCta?: {
    href: string;
    label: string;
    icon?: ComponentType<SVGProps<SVGSVGElement>>;
  };
  /** Optional FAB on the image (e.g. book demo). */
  imageHref?: string;
  imageHrefLabel?: string;
  social?: {
    emphasis: string;
    rest: string;
  };
};

export function ProductHero({
  badge,
  badgeMuted,
  title,
  description,
  imageSrc,
  imageAlt,
  primaryCta,
  secondaryCta,
  imageHref = "/book-demo",
  imageHrefLabel = "Book a demo",
  social = {
    emphasis: "USDC · Polygon",
    rest: "Settlement designed for high-risk categories.",
  },
}: ProductHeroProps): ReactNode {
  const SecondaryIcon = secondaryCta?.icon;

  return (
    <section
      className="border-b border-border bg-background px-6 pt-24 pb-16 sm:px-8 sm:pt-28 md:pb-20 lg:pt-32 lg:pb-24"
      aria-labelledby="product-hero-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16 xl:max-w-7xl">
        <div className="flex flex-col justify-center">
          <div className="mb-6 flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="inline-flex items-center rounded-full bg-foreground px-3 py-1 text-xs font-semibold tracking-wide text-background">
              {badge}
            </span>
            {badgeMuted ? (
              <span className="text-sm text-muted-foreground">{badgeMuted}</span>
            ) : null}
          </div>

          <h1
            id="product-hero-heading"
            className="font-sans text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.06]"
          >
            {title}
          </h1>

          <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-muted-foreground sm:text-[1.05rem] sm:leading-relaxed">
            {description}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href={primaryCta.href}
              className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-sm font-semibold text-background transition-colors hover:bg-foreground/90 active:scale-[0.98]"
            >
              {primaryCta.label}
            </Link>
            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-background px-8 text-sm font-semibold text-foreground transition-colors hover:bg-muted active:scale-[0.98]"
              >
                {SecondaryIcon ? (
                  <SecondaryIcon className="h-4 w-4 shrink-0" aria-hidden />
                ) : null}
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>

          <div className="mt-12 flex max-w-md items-center gap-4 border-t border-border pt-10">
            <div className="flex -space-x-2.5" aria-hidden="true">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-foreground text-xs font-bold text-background">
                PV
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-muted" />
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-foreground/15" />
            </div>
            <p className="text-sm leading-snug text-muted-foreground">
              <span className="font-semibold text-foreground">
                {social.emphasis}
              </span>{" "}
              {social.rest}
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] bg-muted shadow-sm ring-1 ring-border sm:rounded-[2rem]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              className="object-cover grayscale contrast-[1.02]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/20 to-transparent" />
          </div>
          <Link
            href={imageHref}
            className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-xl bg-foreground text-background shadow-lg transition-transform hover:scale-105 active:scale-95 sm:bottom-5 sm:right-5"
            aria-label={imageHrefLabel}
          >
            <ArrowUpRight className="h-5 w-5" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
