"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { LogoLoop, type LogoItem } from "@/components/logo-loop";

const ease = [0.16, 1, 0.3, 1] as const;

const logos: LogoItem[] = [
  {
    node: (
      <Image
        src="/mock-logos/acmecorp.svg"
        alt="Acme Corp"
        width={120}
        height={32}
        className="h-[1em] w-auto dark:invert"
      />
    ),
  },
  {
    node: (
      <Image
        src="/mock-logos/altshift.svg"
        alt="Altshift"
        width={120}
        height={32}
        className="h-[1em] w-auto dark:invert"
      />
    ),
  },
  {
    node: (
      <Image
        src="/mock-logos/globalbank.svg"
        alt="Global Bank"
        width={120}
        height={32}
        className="h-[1em] w-auto dark:invert"
      />
    ),
  },
  {
    node: (
      <Image
        src="/mock-logos/boltshift.svg"
        alt="Boltshift"
        width={120}
        height={32}
        className="h-[1em] w-auto dark:invert"
      />
    ),
  },
  {
    node: (
      <Image
        src="/mock-logos/capsule.svg"
        alt="Capsule"
        width={120}
        height={32}
        className="h-[1em] w-auto dark:invert"
      />
    ),
  },
  {
    node: (
      <Image
        src="/mock-logos/catalog.svg"
        alt="Catalog"
        width={120}
        height={32}
        className="h-[1em] w-auto dark:invert"
      />
    ),
  },
  {
    node: (
      <Image
        src="/mock-logos/commandr.svg"
        alt="Commandr"
        width={120}
        height={32}
        className="h-[1em] w-auto dark:invert"
      />
    ),
  },
  {
    node: (
      <Image
        src="/mock-logos/interlock.svg"
        alt="Interlock"
        width={120}
        height={32}
        className="h-[1em] w-auto dark:invert"
      />
    ),
  },
];

export function TrustedBy(): ReactNode {
  return (
    <section className="relative w-full bg-background py-16 sm:py-20">
      <div className="flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="mx-auto mb-10 max-w-xl px-4 text-center text-lg font-serif italic leading-snug text-foreground/85 sm:text-xl"
        >
          Built for high-risk merchants who have been turned away everywhere
          else
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="w-full"
        >
          <LogoLoop logos={logos} speed={50} logoHeight={36} gap={80} />
        </motion.div>
      </div>
    </section>
  );
}
