import { CreditCard, type CreditCardProps } from "@/components/credit-card";
import Link from "next/link";
import type { ComponentType, ReactNode, SVGProps } from "react";

export type ProductHeroProps = {
  badge: string;
  badgeMuted?: string;
  title: string;
  description: ReactNode;
  /** Props forwarded to the interactive [React Bits Pro–style](https://pro.reactbits.dev/docs/components/credit-card) credit card. */
  creditCard: Partial<CreditCardProps>;
  primaryCta: { href: string; label: string };
  secondaryCta?: {
    href: string;
    label: string;
    icon?: ComponentType<SVGProps<SVGSVGElement>>;
  };
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
  creditCard,
  primaryCta,
  secondaryCta,
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

        <div
          className="pv-product-hero-native-cursor relative mx-auto flex w-full max-w-lg items-center justify-center lg:mx-0 lg:max-w-none"
          data-pv-native-cursor="true"
        >
          <CreditCard
            rotationIntensity={1}
            parallaxIntensity={1}
            borderRadius={18}
            {...creditCard}
          />
        </div>
      </div>
    </section>
  );
}
