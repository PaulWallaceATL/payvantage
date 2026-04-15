/**
 * Calendly and booking-related URLs for marketing CTAs.
 * Set NEXT_PUBLIC_CALENDLY_URL when the booking link is available.
 */

const FALLBACK_BOOKING_EMAIL =
  "mailto:hwayner@vantagecapitalinsights.com?subject=Book%20a%20demo%20%E2%80%94%20PayVantage";

export function getCalendlyBookingUrl(): string {
  const url = process.env["NEXT_PUBLIC_CALENDLY_URL"];
  if (typeof url === "string" && url.trim().length > 0) {
    return url.trim();
  }
  return "";
}

/** Prefer Calendly; otherwise a mailto fallback so CTAs always work. */
export function getBookingHref(): string {
  return getCalendlyBookingUrl() || FALLBACK_BOOKING_EMAIL;
}

export const BOOK_DEMO_PATH = "/book-demo" as const;
