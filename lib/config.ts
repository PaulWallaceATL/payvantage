/**
 * ============================================================================
 * SITE CONFIGURATION
 * ============================================================================
 */

export const siteConfig = {
  name: "PayVantage",
  tagline: "The High-Risk Payment Gateway Powered by Stablecoins",
  description:
    "Accept payments without underwriting delays, chargebacks, or rolling reserves. PayVantage uses card-to-crypto onramping and stablecoin settlement for instant, irreversible payments.",
  url: "https://payvantage.io",
  twitter: "@payvantage",

  nav: {
    cta: {
      text: "Get Started",
      href: "/signup",
    },
    signIn: {
      text: "Sign in",
      href: "/login",
    },
  },
} as const;

export const heroConfig = {
  headline: {
    line1: "Payments that",
    line2: "just work",
  },
  description:
    "The high-risk payment gateway powered by stablecoins. No underwriting, instant settlement, zero chargebacks.",
  cta: {
    primary: {
      text: "Start Accepting Payments",
      href: "/signup",
    },
    secondary: {
      text: "Book a Demo",
      href: "/book-demo",
    },
  },
} as const;

export const trustedByConfig = {
  title: "Built for merchants other processors turn away",
} as const;

export const featureCardsConfig = {
  title: "The new standard",
  subtitle: "for high-risk payments",
} as const;

export const featureHighlightConfig = {
  features: [
    {
      icon: "trending-up",
      text: "Real-time settlement tracking and stablecoin balance monitoring.",
    },
    {
      icon: "message-square",
      text: "Instant webhook notifications for every payment event.",
    },
  ],
} as const;

export const principlesConfig = {
  title: "Built on principles that matter",
} as const;

export const pricingConfig = {
  title: "Simple, transparent pricing",
  trustBadge: "Rates discussed honestly on a short call",
} as const;

export const faqConfig = {
  title: "Frequently Asked Questions",
  contact: {
    text: "Still have questions?",
    cta: {
      text: "Contact Support",
      href: "mailto:support@payvantage.io",
    },
  },
} as const;

export const blogConfig = {
  title: "Latest from our blog",
  description:
    "Insights on high-risk payments, stablecoin settlement, and merchant growth strategies.",
  cta: {
    text: "Setup & docs",
    href: "/docs",
  },
} as const;

export const finalCtaConfig = {
  headline: "Ready to accept payments without limits?",
  description:
    "See whether card-to-crypto settlement or a traditional processing path fits your business—we will be direct about what we can do today.",
  cta: {
    text: "Get Started Free",
    href: "/signup",
  },
} as const;

export const footerConfig = {
  description:
    "The high-risk payment gateway built on stablecoins. Instant settlement, zero chargebacks, and no rolling reserves.",
  cta: {
    text: "Start Accepting Payments",
    href: "/signup",
  },
  links: {
    product: [
      { label: "Payment gateway", href: "/products/payment-gateway" },
      { label: "Chargeback shield", href: "/products/chargeback-shield" },
      { label: "Instant settlement", href: "/products/instant-settlement" },
      { label: "Setup & docs", href: "/docs" },
    ],
    company: [
      { label: "Book a demo", href: "/book-demo" },
      { label: "Careers", href: "mailto:hello@payvantage.io?subject=Careers" },
      { label: "Contact", href: "mailto:hello@payvantage.io" },
    ],
    legal: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
  contact: {
    location: "Miami",
    address: "1395 Brickell Ave, Suite 800\nMiami, FL 33131",
    hours: "Mon-Fri 9:00 am - 6:00 pm (EST)",
    email: "hello@payvantage.io",
  },
  copyright: `© ${new Date().getFullYear()} PayVantage Inc. All rights reserved.`,
} as const;

/**
 * ============================================================================
 * FEATURE FLAGS
 * ============================================================================
 */
export const features = {
  smoothScroll: true,
  darkMode: true,
  statsSection: true,
  blogSection: false,
  testimonialsSection: false,
} as const;

/**
 * ============================================================================
 * THEME CONFIGURATION
 * ============================================================================
 */
export const themeConfig = {
  defaultTheme: "system" as "light" | "dark" | "system",
  enableSystemTheme: true,
} as const;
